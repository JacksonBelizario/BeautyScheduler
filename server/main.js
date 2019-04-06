import { Meteor } from 'meteor/meteor';
import { makeExecutableSchema } from 'graphql-tools';
import { getSchema, load } from 'graphql-load';
import { setup } from 'meteor/swydo:ddp-apollo';
import {UserTypeDefs} from "../app/User/data/UserSchema";
import {UserResolver} from "../app/User/data/UserResolvers";


load({
  typeDefs: [UserTypeDefs],
  resolvers: [UserResolver],
});

const schema = makeExecutableSchema(getSchema());

setup({
  schema,
});

Meteor.startup(() => {
  // Todo
});
