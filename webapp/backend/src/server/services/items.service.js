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
    this.getPosts = this.getPosts.bind(this);
    this.saveReturningFileName = this.saveReturningFileName.bind(this);
    this.add = this.add.bind(this);
    this.editPost = this.editPost.bind(this);
  }

  getPosts({
    id,
    page = 1,
    take = 10,
    searchQuery,
    sort = "default",
    category,
    size,
    material,
    user_id,
    item_option_id,
    mainside_id,
    backside_id,
    is_backside = null,
  }) {
    return new Promise(async (res, rej) => {
      const skip = (page - 1) * take;
      searchQuery = searchQuery ? `%${searchQuery}%` : null;
      category = category || null;
      user_id = user_id || null;

      const orderQueryPart =
        sort === "newing"
          ? "publication_date DESC"
          : sort === "ascending"
          ? "lower(title)"
          : sort === "descending"
          ? "lower(title) DESC"
          : "order_id DESC";

      console.log(orderQueryPart);

      const connection = await tOrmCon;

      if (mainside_id)
        connection
          .query(
            `select p.*,
          json_agg(DISTINCT jsonb_build_object('id', io.id, 'size', io.size, 'material', io.material, 'price', io.price, 'is_backside', io.is_backside))  options_array
          ,min(io.price) price, case when count(o.id) > 0 then true else false end as is_favorite
              from public.items p
              left join item_options io on p.id = io.item_id
              left join order_items oi on io.id = oi.item_option_id
              left join orders o on o.id = oi.order_id
              where oi.mainside_id = $1
              and o.user_id = $2
              and o.status = 'basket'
              group by p.id
              limit 1`,
            [mainside_id, user_id]
          )
          .then((data) => res(data))
          .catch((error) => rej(new MySqlError(error)));
      else if (backside_id)
        connection
          .query(
            `select p.*,
          json_agg(DISTINCT jsonb_build_object('id', io.id, 'size', io.size, 'material', io.material, 'price', io.price, 'is_backside', io.is_backside))  options_array
          ,min(io.price) price, case when count(o.id) > 0 then true else false end as is_favorite
              from public.items p
              left join item_options io on p.id = io.item_id
              left join order_items oi on io.id = oi.item_option_id
              left join orders o on o.id = oi.order_id
              left join order_items oi2 on oi2.mainside_id = io.id
              left join orders o2 on o2.id = oi2.order_id
              where oi2.item_option_id = $1
              and o2.user_id = $2
              and o2.status = 'basket'
              and io.id = $3
              group by p.id
              limit 1`,
            [backside_id, user_id, id]
          )
          .then((data) => res(data))
          .catch((error) => rej(new MySqlError(error)));
      else {
        const query = user_id
          ? `select p.*,json_agg(DISTINCT jsonb_build_object('id', io.id, 'size', io.size, 'material', io.material, 'price', io.price, 'is_backside', io.is_backside))  options_array
            ,min(io.price) price, 
            case when count(
              case when 
                o.user_id = $6 and o.status = 'basket' and oi.is_backside = false
              then 1 else NULL end
              ) > 0 then true else false end as is_favorite,
              backside_available

                from public.items p
                left join categories c on c.name = p.category_name
                left join item_options io on p.id = io.item_id
                left join order_items oi on io.id = oi.item_option_id
                left join orders o on o.id = oi.order_id
                where (lower(title) like lower($1) or $1 is NULL) 
                and (p.category_name = $2 or $2 is NULL)  
                and (p.id = $3 or $3 is NULL)  
                and (io.size = $7::varchar or $7::varchar is NULL)
                and (io.material = $8::varchar or $8::varchar is NULL)
                and (io.is_backside = $10::boolean or $10::boolean is NULL)
                and (oi.item_option_id = $9::int or $9::int is NULL)
                group by p.id,c.name
                order by ${orderQueryPart}
                LIMIT $4 OFFSET $5`
          : `select p.*,json_agg(DISTINCT jsonb_build_object('id', io.id, 'size', io.size, 'material', io.material, 'price', io.price, 'is_backside', io.is_backside))  options_array
                ,min(io.price) price
                    from public.items p
                    left join item_options io on p.id = io.item_id
                    where (lower(title) like lower($1) or $1 is NULL) 
                    and $6::int is NULL
                    and $7::varchar is NULL
                    and $8::varchar is NULL
                    and $9::int is NULL
                    and $10::boolean is NULL
                    and (p.category_name = $2 or $2 is NULL)  
                    and (p.id = $3 or $3 is NULL)  
                    group by p.id
                    order by ${orderQueryPart}
                    LIMIT $4 OFFSET $5`;
        connection
          .query(query, [
            searchQuery,
            category,
            id,
            take,
            skip,
            user_id,
            size,
            material,
            item_option_id,
            is_backside,
          ])
          .then((data) => res(data))
          .catch((error) => rej(new MySqlError(error)));
      }
    });
  }

  transformTagsArray(tagsArray) {
    let tagObjs;
    if (typeof tagsArray === "object") {
      tagObjs = tagsArray?.map((name) => {
        return {
          name,
        };
      });
    } else if (typeof tagsArray === "string") {
      tagObjs = [{ name: tagsArray }];
    } else tagObjs = [];

    return tagObjs;
  }

  async saveReturningFileName(image, isPreview) {
    if (typeof image === String) return image;

    let fName = image?.name;
    console.log(image);

    let fNameFullPath;
    if (fName) {
      let fNameSplit = fName.split(".");
      const fileFormat = fNameSplit[fNameSplit.length - 1];
      fNameFullPath = image.md5 + "." + fileFormat;
      await image?.mv("public/pics/" + fNameFullPath);

      console.log(image.mimetype.split("/")[0], "это превью", isPreview);

      if (fileFormat !== "webp" && image.mimetype.split("/")[0] === "image")
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
          })
          .catch((e) => {
            console.log(e);
          });
    }
    return fNameFullPath;
  }

  add({
    title,
    text,
    optionsObject,
    optionsObjectBackside,
    categoryName,
    previewsBinary,
    images,
    description,
  }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        let fNameFullPaths = Array.isArray(previewsBinary)
          ? await Promise.all(
              previewsBinary.map(
                async (preview, id) =>
                  await this.saveReturningFileName(preview, id === 0)
              )
            )
          : [await this.saveReturningFileName(previewsBinary, true)];
        const images_array = Array.isArray(images) ? images : [images];

        fNameFullPaths = [
          ...new Set([...fNameFullPaths, ...images_array]),
        ]?.filter((el) => el);

        const data = await queryRunner.manager.getRepository("Item").save({
          title,
          description,
          text,
          category_name: categoryName,
          image_list: fNameFullPaths,
        });

        const { id } = data;
        const oo = optionsObject && JSON.parse(optionsObject);
        for (let m in oo) {
          const sizes = oo[m];
          for (let s in sizes) {
            const price = sizes[s];
            if (price)
              await queryRunner.query(
                "insert into item_options (item_id,size,material,price) values ($1,$2,$3,$4)",
                [id, s, m, price]
              );
          }
        }
        const oob = optionsObjectBackside && JSON.parse(optionsObjectBackside);
        for (let m in oob) {
          const sizes = oob[m];
          for (let s in sizes) {
            const price = sizes[s];
            if (price)
              await queryRunner.query(
                "insert into item_options (item_id,size,material,price, is_backside) values ($1,$2,$3,$4,true)",
                [id, s, m, price]
              );
          }
        }

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

  editAllOptionsInCategory({ categoryName, oa_parsed, oa_parsed_backside }) {
    return new Promise(async (res, rej) => {
      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const categoryItems = await queryRunner.query(
          `select * from items where category_name = $1`,
          [categoryName]
        );

        console.log("started");

        for (let item of categoryItems) {
          let idArray = [];

          console.log(item);

          for (let optionIndex in oa_parsed) {
            const { material, size, price } = oa_parsed[optionIndex];

            let newId = (
              await queryRunner.query(
                `update item_options set price=$4 
              where size=$2 and material=$3 and is_backside = false and item_id = $1 returning id`,
                [item.id, size, material, price]
              )
            )?.[0]?.[0]?.id;

            console.log(newId);

            if (!newId) {
              newId = (
                await queryRunner.query(
                  `insert into item_options (item_id,size,material,price,is_backside) values ($1,$2,$3,$4, false) returning id`,
                  [item.id, size, material, price]
                )
              )?.[0]?.id;
            }

            idArray.push(newId);
          }

          for (let optionIndex in oa_parsed_backside) {
            const { material, size, price } = oa_parsed_backside[optionIndex];

            let newId = (
              await queryRunner.query(
                `update item_options set price=$4 
              where size=$2 and material=$3 and is_backside = true and item_id = $1 returning id`,
                [item.id, size, material, price]
              )
            )?.[0]?.[0]?.id;

            if (!newId) {
              newId = (
                await queryRunner.query(
                  `insert into item_options (item_id,size,material,price,is_backside) values ($1,$2,$3,$4, true) returning id`,
                  [item.id, size, material, price]
                )
              )?.[0]?.id;
            }

            idArray.push(newId);
          }

          await queryRunner.query(
            "delete from item_options where item_id = $1 and not (id = any($2))",
            [item.id, idArray]
          );
        }

        await queryRunner.commitTransaction();

        console.log("выполнено");
        res(1);
      } catch (error) {
        await queryRunner.rollbackTransaction();

        console.log(error);
        rej(new MySqlError(error));
      } finally {
        await queryRunner.release();
      }
    });
  }

  editPost({
    id,
    title,
    categoryName,
    description,
    images,
    previewsBinary,
    optionsArray,
    optionsArrayBackside,
    type,
    order_id,
    editAll,
  }) {
    return new Promise(async (res, rej) => {
      const images_array = Array.isArray(images) ? images : [images];

      let fNameFullPaths = Array.isArray(previewsBinary)
        ? await Promise.all(
            previewsBinary.map(
              async (preview, id) =>
                await this.saveReturningFileName(preview, id === 0)
            )
          )
        : [await this.saveReturningFileName(previewsBinary, true)];

      console.log(previewsBinary, images, fNameFullPaths);

      fNameFullPaths = [
        ...new Set([...images_array, ...fNameFullPaths]),
      ]?.filter((el) => el);

      const connection = await tOrmCon;

      const queryRunner = connection.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        let data;
        if (type === "up") {
          const concurent = (
            await queryRunner.query(
              `select * from items where order_id >= $1 and id <> $2
              order by order_id limit 1;
              `,
              [order_id, id]
            )
          )?.[0];
          if (!concurent) data = { edit: false };
          else {
            await queryRunner.query(
              `update items set order_id = $1 where id = $2`,
              [Math.max(concurent.order_id, order_id + 1), id]
            );
            await queryRunner.query(
              `update items set order_id = $1 where id = $2`,
              [order_id, concurent.id]
            );
            data = { edit: true };
          }
        } else if (type === "down") {
          const concurent = (
            await queryRunner.query(
              `select * from items where order_id <= $1 and id <> $2
              order by order_id DESC limit 1;
              `,
              [order_id, id]
            )
          )?.[0];

          if (!concurent) data = { edit: false };
          else {
            await queryRunner.query(
              `update items set order_id = $1 where id = $2`,
              [Math.min(concurent.order_id, order_id - 1), id]
            );
            await queryRunner.query(
              `update items set order_id = $1 where id = $2`,
              [order_id, concurent.id]
            );
            data = { edit: true };
          }
        } else {
          data = await queryRunner.manager
            .getRepository("Item")
            .createQueryBuilder()
            .update({
              title,
              category_name: categoryName ?? null,
              description,
              image_list: fNameFullPaths,
            })
            .where({
              id: id,
            })
            .returning("*")
            .execute();

          const oa_parsed = JSON.parse(optionsArray);

          let idArray = [];

          for (let optionIndex in oa_parsed) {
            const {
              material,
              size,
              price,
              id: editId,
            } = oa_parsed[optionIndex];

            if (editId) {
              idArray.push(editId);
              await queryRunner.query(
                "update item_options set item_id = $1, size=$2,material=$3,price=$4 where id = $5",
                [id, size, material, price, editId]
              );
            } else {
              const newId = (
                await queryRunner.query(
                  "insert into item_options (item_id,size,material,price,is_backside) values ($1,$2,$3,$4, false) returning id",
                  [id, size, material, price]
                )
              )?.[0]?.id;

              console.log(newId);

              idArray.push(newId);
            }
          }

          const oa_parsed_backside = JSON.parse(optionsArrayBackside);

          for (let optionIndex in oa_parsed_backside) {
            const {
              material,
              size,
              price,
              id: editId,
            } = oa_parsed_backside[optionIndex];

            if (editId) {
              idArray.push(editId);
              await queryRunner.query(
                "update item_options set item_id = $1, size=$2,material=$3,price=$4 where id = $5",
                [id, size, material, price, editId]
              );
            } else {
              const newId = (
                await queryRunner.query(
                  "insert into item_options (item_id,size,material,price,is_backside) values ($1,$2,$3,$4, true) returning id",
                  [id, size, material, price]
                )
              )?.[0]?.id;
              idArray.push(newId);
            }
          }

          await queryRunner.query(
            "delete from item_options where item_id = $1 and not (id = any($2))",
            [id, idArray]
          );

          console.log(editAll, !!editAll);
          if (editAll) {
            this.editAllOptionsInCategory({
              categoryName,
              oa_parsed,
              oa_parsed_backside,
            });

            const delay = (delayInms) => {
              return new Promise((resolve) => setTimeout(resolve, delayInms));
            };

            await delay(500);
          }

          console.log(idArray);
        }

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
