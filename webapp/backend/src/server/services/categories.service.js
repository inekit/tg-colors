const tOrmCon = require("../../db/connection");
const checkInputData = require("../utils/checkInputData");
const {
  HttpError,
  MySqlError,
  NotFoundError,
  NoInputDataError,
} = require("../utils/httpErrors");
const webp = require("webp-converter");
webp.grant_permission();
const fs = require("fs").promises;

class UsersService {
  constructor() {
    this.saveReturningFileName = this.saveReturningFileName.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
  }

  getAll({ page, take }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      connection
        .query(`select * from categories order by order_id desc`, [])
        .then(async (data) => {
          return res(data);
        })
        .catch((error) => rej(new MySqlError(error)));
    });
  }

  async saveReturningFileName(image, isPreview) {
    if (typeof image === String) return image;

    let fName = image?.name;
    console.log("1", image);

    let fNameFullPath;
    if (fName) {
      let fNameSplit = fName.split(".");
      const fileFormat = fNameSplit[fNameSplit.length - 1];
      fNameFullPath = image.md5 + "." + fileFormat;
      await image?.mv("public/pics/" + fNameFullPath);

      if (fileFormat !== "webp")
        await webp
          .cwebp(
            `public/pics/${fNameFullPath}`,
            `public/pics/${image.md5}.webp`,
            "-q 80"
          )
          .then(async (r) => {
            if (isPreview) {
              await webp
                .cwebp(
                  `public/pics/${fNameFullPath}`,
                  `public/pics/${image.md5}_preview.webp`,
                  "-q 90 -resize 480 0"
                )
                .catch((e) => console.log(e));
            }
            await fs.unlink(`public/pics/${fNameFullPath}`).catch((e) => {});
            fNameFullPath = image.md5 + ".webp";
            console.log("1", fNameFullPath);
          })
          .catch((e) => {
            console.log(e);
            console.log(22);
          });
    }
    return fNameFullPath;
  }

  add({ name, description, image, previewBinary, backside_available }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const fNameFullPath = await this.saveReturningFileName(
          previewBinary,
          true
        );

        const data = await queryRunner.manager.getRepository("Category").save({
          name,
          description,
          backside_available,
          preview: fNameFullPath,
        });

        await queryRunner.commitTransaction();

        res(data);
      } catch (error) {
        console.log(error);
        await queryRunner.rollbackTransaction();

        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }

  edit({
    name,
    old_name,
    description,
    image,
    previewBinary,
    backside_available,
    type,
    order_id,
  }) {
    return new Promise(async (res, rej) => {
      const fNameFullPath = await this.saveReturningFileName(
        previewBinary,
        true
      );

      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        let data;
        if (type === "up") {
          const concurent = (
            await queryRunner.query(
              `select * from categories where order_id >= $1 and name <> $2
              order by order_id limit 1;
              `,
              [order_id, name]
            )
          )?.[0];
          console.log(concurent);

          if (!concurent) data = { edit: false };
          else {
            await queryRunner.query(
              `update categories set order_id = $1 where name = $2`,
              [Math.max(concurent.order_id, order_id + 1), name]
            );
            await queryRunner.query(
              `update categories set order_id = $1 where name = $2`,
              [order_id, concurent.name]
            );
            data = { edit: true };
          }
        } else if (type === "down") {
          const concurent = (
            await queryRunner.query(
              `select * from categories where order_id <= $1 and name <> $2
              order by order_id DESC limit 1;
              `,
              [order_id, name]
            )
          )?.[0];

          if (!concurent) data = { edit: false };
          else {
            await queryRunner.query(
              `update categories set order_id = $1 where name = $2`,
              [Math.min(concurent.order_id, order_id - 1), name]
            );
            await queryRunner.query(
              `update categories set order_id = $1 where name = $2`,
              [order_id, concurent.name]
            );
            data = { edit: true };
          }
        } else
          data = await queryRunner.manager
            .getRepository("Category")
            .createQueryBuilder()
            .update({
              name,
              description,
              backside_available,
              preview: fNameFullPath,
            })
            .where({
              name: old_name,
            })
            .returning("*")
            .execute();

        await queryRunner.manager
          .getRepository("Item")
          .createQueryBuilder()
          .update({
            description,
          })
          .where({
            category_name: old_name,
          })
          .returning("*")
          .execute();

        await queryRunner.commitTransaction();

        res(data);
      } catch (error) {
        await queryRunner.rollbackTransaction();

        console.log(error);
        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }
}

module.exports = new UsersService();
