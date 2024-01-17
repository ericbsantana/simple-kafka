import { Server } from "socket.io";
import kafkaClient from "./kafka/config/client";
import { randomUUID } from "crypto";

const io = new Server(2999, { cors: { allowedHeaders: "*", origin: "*" } });
const consumer = kafkaClient.consumer({ groupId: "chat-group" });
const producer = kafkaClient.producer();

io.on("connection", async (socket) => {
  console.log("connected to socket");

  await producer.connect();

  socket.on("message", async (message) => {
    const value = {
      message,
    };
    if (message) {
      await producer.send({
        messages: [{ value: JSON.stringify(value), key: randomUUID() }],
        topic: "chat",
      });
    }
  });
});

(async () => {
  await consumer.subscribe({ topic: "chat" });
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      if (!message.value) return;

      const parsedMessage = JSON.parse(message.value?.toString());
      callSockets(io, parsedMessage);
      console.log({
        key: message.key?.toString(),
        value: parsedMessage,
        headers: message?.headers,
      });
    },
  });
})();

function callSockets(io: Server, message: string) {
  console.log({ socketMessage: message });
  io.sockets.emit("message", message);
}

io.listen(3000);
