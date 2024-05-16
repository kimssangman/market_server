const path = require("path");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV.trim() === "production") {
    require("dotenv").config({ path: path.join(__dirname, "/env/prod.env") });
} else if (process.env.NODE_ENV.trim() === "development") {
    require("dotenv").config({ path: path.join(__dirname, "/env/dev.env") });
}

//port//
let port = normalizePort(process.env.PORT);
app.set("port", port);

const mongoApp = require("./database/mongoDB");
app.use("/api/v1", require("./routes/api/v1"));

// static
app.use("/", express.static(path.join(__dirname, "/market")));
app.use("/logo_img", express.static(path.join(__dirname, "/logo_img")));

const httpServer = http.createServer(app).listen(app.get("port"), () => {
    console.log(
        `
+-------------------------------------------+
|
|       [Market Server]
|       - Version : `,
        process.env.VERSION,
        `
|       - Mode: ${process.env.MODE}
|       - Server is running on port ${app.get("port")}
|
+-------------------------------------------+
    `
    );
    mongoApp.appSetObjectId(app);
});

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }

    return false;
}

/////////////////////////////////////////////////////////////
//소켓통신
const SocketIO = require("socket.io");
const wsServer = SocketIO(httpServer);

/*---------------------------
*  Namespace1
----------------------------*/
const socketNameSpace = wsServer.of("/socket");

/*-----------------------------------------------
*  소켓 이벤트 핸들러
-----------------------------------------------*/
const socketHandler = require("./socket/socketHandler");

socketNameSpace.on("connection", (socket) => {
    socketHandler(socketNameSpace, socket, app);
});
/////////////////////////////////////////////////////////////

app.use(function (req, res) {
    console.log(`
    ============================================
		>>>>>> Invalid Request! <<<<<<

		Req: "${req.url}"
		=> Redirect to 'index.html'
    ============================================`);
    res.sendFile(__dirname + "/dist/kimchiClient/index.html");
});
