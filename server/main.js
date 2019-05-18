import { Meteor } from 'meteor/meteor';
import { makeExecutableSchema } from 'graphql-tools';
import { getSchema, load } from 'graphql-load';
import { setup } from 'meteor/swydo:ddp-apollo';
import { UserTypeDefs, UserResolver } from '../imports/api/users';
import { ServicesTypeDefs, ServicesResolver } from '../imports/api/services';


load({
  typeDefs: [UserTypeDefs, ServicesTypeDefs],
  resolvers: [UserResolver, ServicesResolver],
});

const schema = makeExecutableSchema(getSchema());

setup({
  schema,
});

Meteor.startup(() => {
  // Todo
});
