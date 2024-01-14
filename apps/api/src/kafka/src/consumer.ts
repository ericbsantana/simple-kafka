import kafkaClient from "../config/client";

const consumer = kafkaClient.consumer({ groupId: "test-group" });

const initializeConsumer = async () => {
  await consumer.connect();
};

const disconnect = async () => {
  await consumer.disconnect();
};

const subscribe = async () => {
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
};

const run = async () => {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value?.toString(),
      });
    },
  });
};

export { initializeConsumer, disconnect, subscribe, run };
