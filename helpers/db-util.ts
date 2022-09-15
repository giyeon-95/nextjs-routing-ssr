import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:admin@cluster0.pmf8r.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(
  client: any,
  collection: any,
  document: any
) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(
  client: any,
  collection: any,
  sort: any,
  filter = {} //filter specific event
) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
