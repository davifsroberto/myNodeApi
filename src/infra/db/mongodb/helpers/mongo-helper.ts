import { Collection, MongoClient, ObjectId } from 'mongodb';
import { AccountModel } from '../../../../domain/models/account';

export type AccountModelInserted = AccountModel & { _id: ObjectId };

export const MongoHelper = {
  client: MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async close(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  mapAccount<T, R>(collection: { _id: ObjectId } & T): R {
    const { _id, ...accountWithoutId } = collection;
    const collectionReturn = { id: _id, ...accountWithoutId } as R;

    return collectionReturn;
  },
};
