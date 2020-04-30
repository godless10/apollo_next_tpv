//merge library to join em all together
import { merge } from "lodash";
//individual resolvers
import { authResolver } from "./authResolvers";
import { sharedResolvers } from "./sharedResolvers";
import { categoriasResolver } from "./categoriasResolvers";
import { proveedoresResolver } from "./proveedoresResolvers";
import { productosResolver } from "./productosResolvers";

//Example of merged resolvers
//merge(resolvers, authorResolvers, bookResolvers)
const resolversMerged = merge(
  authResolver,
  sharedResolvers,
  categoriasResolver,
  proveedoresResolver,
  productosResolver
);

module.exports = resolversMerged;
