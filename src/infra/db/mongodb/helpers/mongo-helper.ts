import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: MongoClient,

  async connect(uri: string): Promise<void> {
    uri;

    this.client = await MongoClient.connect(String(process.env.MONGO_URL));
  },

  async close(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },
};
