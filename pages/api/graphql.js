import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    //console.log(ctx.req.headers);

    //////////////////////////////////////////////////////////AUTHENTICATION
    const token = ctx.req.headers["authApp"] || "";
    if (token) {
      try {
        //console.log(token);
        const usuario = jwt.verify(
          token.replace("Bearer ", ""),
          process.env.SECRETA
        );
        //console.log(usuario);
        //Objeto del context disponible en la APP
        return {
          usuario,
        };
      } catch (error) {
        console.log(error);
      }
    }

    if (ctx.req.filePayload) {
      //console.log(ctx.req);
      //console.log('A FILE IS BEING UPLOADED!!!!!!!!!!!!!!!!!!!!!!');
    }
    return ctx;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
