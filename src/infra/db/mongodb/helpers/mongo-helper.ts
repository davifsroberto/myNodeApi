import { MongoClient } from 'mongodb';

export const MongoHelper = {
  client: MongoClient,

  async connect(uri: string): Promise<void> {
    uri;

    this.client = await MongoClient.connect(String(process.env.MONGO_URL));
  },

  async disconnect(): Promise<void> {
    await this.client.disconnect();
  },
};
