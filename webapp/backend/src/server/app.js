const express = require("express");
const passport = require("passport");
const setPayed = require("./utils/setPayed");

const bodyParser = require("body-parser");

const { spawnSync } = require("child_process");

const router = require("./routes/routes");
const adminRouter = require("./routes/adminRoutes");

var app = require("./app-preferences");

app.use("/colorsserver/public", express.static("public"));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

const { Server } = require("socket.io");

module.exports = (ctx) => {
  app.use("/colorsserver/api", router(ctx));
  app.use("/colorsserver/api/admin", adminRouter(ctx));

  app.post("/colorsserver/api/postback", async (req, res) => {
    console.log(req.body);

    if (!req.body) return res.send();

    const { Fee, OutSum, IncCurrLabel, InvId } = req.body;

    if (!InvId) return res.send();

    console.log("success", req.body);

    setPayed(InvId, OutSum, SignatureValue, ctx);

    return res.send();
  });

  app.use(function (req, res, next) {
    const err = new Error("Страница не найдена!");
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });

  const host = "127.0.0.1";
  const port = process.env.PORT ?? 3006;
  let server = app.listen(port, host, () =>
    console.log(`Server listens http://${host}:${port}`)
  );

  const io = new Server(server, {
    cors: {
      origin: [
        "http://127.0.0.1:8080",
        "http://localhost:8080",
        "http://192.168.0.102:8080",
        "https://fotodesire.ru",
      ],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
  });

  global.io = io;

  server.on("error", (err) => {
    console.log("err", err);

    const child = spawnSync("sudo", ["killall", "-9", "node"]);
    if (child.error) console.log(child.error);
  });
};
/*
var fs = require("fs");
var path = require("path");
const webp = require("webp-converter");
webp.grant_permission();

var getFiles = function (dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(files[i]);
    }
  }
  return files_;
};

function getPreviewLink(link) {
  const parts = link.match(/\.([^.]+)$|$/);
  if (!parts?.[1]) return;
  return link?.split(".").slice(0, -1).join(".") + "_preview." + parts[1];
}

(async () => {
  const fileNames = getFiles("public/pics");

  console.log(fileNames);

  for (let name of fileNames) {
    await webp
      .cwebp(
        `public/pics/${name}`,
        `public/pics/${getPreviewLink(name)}`,
        "-q 90 -resize 480 0"
      )
      .then(() => console.log(name))
      .catch((e) => console.log(e));
  }
})();
*/
