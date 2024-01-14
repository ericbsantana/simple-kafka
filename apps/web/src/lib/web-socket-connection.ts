import ioClient from "socket.io-client";
const ENDPOINT = "http://localhost:2999";

const socket = ioClient(ENDPOINT);

export const io = socket;
