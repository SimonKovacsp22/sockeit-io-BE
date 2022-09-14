import express from "express";
import { createServer} from "http";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { Server } from 'socket.io'
import cors from "cors";
import { newConnectionHandler } from "./socket/socket.js";

const server = express();

const port = process.env.PORT || 3001;

const httpServer = createServer(server);

const io = new Server(httpServer);

io.on("connection", newConnectionHandler)



server.use(cors)

mongoose.connect(process.env.MONGO_CONNECTION_URL);

mongoose.connection.on("connected", () =>
  httpServer.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is listening on port: ${port}`);
  })
);
