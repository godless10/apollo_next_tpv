import {
    viewerFunction,
    signInFunction,
    signOutFunction,
    signUpFunction,
  } from "../Functions/authFunctions";
  
  export const authResolver = {
    Query: {
      viewer: async (_parent, _args, context, _info) => {
        //console.log(context.req.headers.cookie);
        return await viewerFunction(context);
      },
    },
    Mutation: {
      signUp: async (_parent, args, _context, _info) => {
        return await signUpFunction(args);
      },
  
      signIn: async (_parent, args, context, _info) => {
        return await signInFunction(args, context);
      },
      signOut: async (_parent, _args, context, _info) => {
        return await signOutFunction(context);
      },
    },
  };