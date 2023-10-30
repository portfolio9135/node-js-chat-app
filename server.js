//"express"というパッケージ（Expressフレームワーク）をインポートして「espress変数」に代入
const express = require("express");

//express関数を呼び出してそのインスタンスを「app変数」に代入
const app = express();

//node.jsのモジュールである「http」をインポートして「http変数」に代入
const http = require("http");

//「http変数」のcreateServerメソッドを使用して
//「app変数」をリクエストバンドラとするHTTPサーバーを作成し「server変数」に代入
const server = http.createServer(app);

//socket.ioライブラリを使用してWebSocket通信を有効にするためのサーバーを作成する
//「server変数」を引数に設定してWebSocket通信をサポートしたサーバーを作成して「io変数」に代入
const io = require("socket.io")(server);

//サーバーがリッスン(クライアントからの受付待ち)するポート番号を3000に指定する
const port = 3000;

//HTTP GETリクエストがルートパス("/")に対して送信されたときに「Hello World」というテキストをレスポンスとして返す
app.get("/", (req, res)=>  {
  res.sendFile(__dirname + "/index.html");
})


io.on("connection", (socket)=>  {
  console.log("ユーザーが接続しましたーーー");

  socket.on("chat message", (msg)=>  {
    console.log(`メッセージ : ${msg}`);
    io.emit("chat message", msg)
  })
})

//作ったサーバーを起動して3000ポートでリクエストを待ってサーバーが起動したらコンソールにメッセージを表示する
server.listen(port, ()=> {
  console.log("サーバーが起動しましたー");
});


