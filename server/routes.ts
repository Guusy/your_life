import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './graphql/resolvers';
import config from '../config';
import { Mongo } from './db/mongo';

const typeDefs = readFileSync(
  join(__dirname, 'graphql', 'schema.graphql'),
  'utf-8'
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = (app: any, server: any) => {
  if (config.enviroment !== 'production') {
    server.use(morgan('dev'));
  }
  server.use(cookieParser());
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Create an express server and a GraphQL endpoint
  server.use(
    '/api/graphql',
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true
    })
  );

  Mongo.connect().then(() => console.log('Mongo instance is ok'));
};
