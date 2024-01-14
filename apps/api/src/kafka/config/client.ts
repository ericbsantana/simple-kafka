import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
  clientId: "simple-kafka",
  brokers: ["localhost:9092"],
});

export default kafkaClient;
