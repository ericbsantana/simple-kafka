import kafkaClient from "../config/client";

const producer = kafkaClient.producer();

const initializeProducer = async () => {
  await producer.connect();
};

const sendMessage = async (message: string) => {
  await producer.send({
    topic: "chat",
    messages: [{ value: message }],
  });
};

const disconnect = async () => {
  await producer.disconnect();
};

export { initializeProducer, sendMessage, disconnect };
