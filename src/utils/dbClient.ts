import { MongoClient } from "mongodb";

let cachedClient: MongoClient | null = null;

export async function getDatabase() {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  console.log("MONGODB_DB_NAME:", process.env.MONGODB_DB_NAME);

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB_NAME) {
    throw new Error("Missing environment variables for MongoDB");
  }
  console.log("Getting database");
  if (!cachedClient) {
    console.log("Creating new client", process.env.MONGODB_URI);
    const client = new MongoClient(process.env.MONGODB_URI);
    console.log("Connecting to client");
    await client.connect();
    console.log("Connected to client");
    cachedClient = client;
  }
  console.log("Returning database", process.env.MONGODB_DB_NAME);
  return cachedClient.db(process.env.MONGODB_DB_NAME);
}
