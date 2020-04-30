import { makeExecutableSchema } from "graphql-tools";

//typeDefinitions
import typeDefs from "./typeDefs/index";
//resolvers
import resolvers from "./resolvers/index";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
