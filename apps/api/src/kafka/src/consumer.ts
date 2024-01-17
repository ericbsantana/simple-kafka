import kafkaClient from "../config/client";

const consumer = kafkaClient.consumer({ groupId: "chat-group" });

const initializeConsumer = async () => {
  await consumer.connect();
};

const disconnect = async () => {
  await consumer.disconnect();
};

const subscribe = async () => {
  await consumer.subscribe({ topic: "chat", fromBeginning: true });
};

const run = async () => {
  const messages: string[] = [];
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ batata: message });
      if (message.value) {
        messages.push(message.value?.toString());
      }
    },
  });
  return messages;
};

export { initializeConsumer, disconnect, subscribe, run, consumer };
