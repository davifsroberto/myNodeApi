import { Collection, MongoClient, ObjectId } from 'mongodb';
import { AccountModel } from '../../../../domain/models/account';

export type AccountModelInserted = AccountModel & { _id: ObjectId };

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;

    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client?.close();
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    const connected = !this.client?.isConnected;

    connected && (await this.client.connect(this.uri));

    return this.client.db().collection(name);
  },

  mapAccount<T, R>(collection: { _id: ObjectId } & T): R {
    const { _id, ...accountWithoutId } = collection;
    const collectionReturn = { id: _id, ...accountWithoutId } as R;

    return collectionReturn;
  },
};
