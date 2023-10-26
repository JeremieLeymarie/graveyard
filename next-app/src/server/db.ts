import { MongoClient, ServerApiVersion } from "mongodb";

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const uri =
  process.env.MONGODB_URI ||
  `mongodb+srv://${username}:${password}@cluster0.ywtlo2w.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  //@ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export const getMongoDatabase = async () => {
  const db = await (await client.connect()).db("database");
  return db;
};
