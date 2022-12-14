import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

let color = "#4ade80";
let font = "Nunito";

io.on("connection", (socket) => {
  socket.emit("color", color);
  socket.emit("font", font);

  socket.on("emoji", (emoji) => {
    socket.broadcast.emit("emoji", emoji);
  });

  socket.on("color", (selectedColor) => {
    color = selectedColor;
    socket.broadcast.emit("color", selectedColor);
  });

  // socket.on("font", (selectedFont) => {
  //   font = selectedFont;
  //   socket.broadcast.emit("font", selectedFont);
  // });

  socket.on("refresh", () => {
    io.emit("refresh");
  });

});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./views" });
});

app.get("/display", (req, res) => {
  res.sendFile("display.html", { root: "./views" });
});

app.get("/qrcode.png", (req, res) => {
	res.sendFile("qrcode.png", { root: "/" })
})

server.listen(3000, () => {
  console.log("listening on *:3000");
});
