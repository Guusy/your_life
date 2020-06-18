import * as mongo from 'mongodb';

const host = 'localhost';
const port = '27017';
const DBName = 'your_life';
const usersCollection = 'users';
const url = `mongodb://${host}:${port}`;

export class Mongo {
  public static client: mongo.MongoClient;

  public static usersCollection: mongo.Collection<any>;

  public static connect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongo.MongoClient.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (error, client: mongo.MongoClient) => {
          if (error) {
            console.error('Error while connecting to Mongodb server.', error);
            return reject(error);
          }
          Mongo.client = client;
          Mongo.usersCollection = client.db(DBName).collection(usersCollection);
          resolve(client);
        }
      );
    });
  }

  public static disconnect(): void {
    if (Mongo.client) {
      Mongo.client.close();
    }
  }
}
