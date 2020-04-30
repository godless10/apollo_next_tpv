const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
import { GraphQLUpload } from "graphql-upload";
import { fireBucket } from "../../firebase/firebase";

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
// eslint-disable-next-line no-extend-native
Date.prototype.subtractDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

export const sharedResolvers = {
  FileUpload: GraphQLUpload,
  Query: {
    //////////////////////////////////////////////////////////DATE queries
    today: (_, __, ___) => {
      return new Date();
    },
    addDays: (_, { date, days }, ___) => {
      return date.addDays(days);
    },
    subtractDays: (_, { date, days }, ___) => {
      return date.subtractDays(days);
    },
    //////////////////////////////////////////////////////////UPLOAD FILE
    // uploads: (parent, args) => {},
  },
  Mutation: {
    singleUploadStream: async (parent, args) => {
      const file = await args.file;
      const shortid = require("shortid");
      //console.log(file);
      const { createReadStream, filename, mimetype } = file;
      //const fileStream = createReadStream();
      //nombre completo hasta el primer punto (ojala la extension)
      //reemplazando cualquier espacio en blanco con '_'
      const nombreFile = filename.split(".")[0].replace(/\s/g, "_");
      //nombre de la extension sin el punto
      const extensionFile = filename.split(".").pop();
      //creamos el nombre para subir al storage convirtiendo todo el string a minusculas
      const uploadName = `${nombreFile}_${shortid.generate()}.${extensionFile}`.toLowerCase();

      //console.log(uploadName);

      await new Promise((res) =>
        createReadStream()
          .pipe(
            fireBucket.file(`pictures/${uploadName}`).createWriteStream({
              resumable: false,
              gzip: true,
            })
          )
          .on("finish", res)
      );

      //console.log(await fireBucket.getFiles());
      return {
        URL: `https://storage.cloud.google.com/tpvtest-3909d.appspot.com/pictures/${uploadName}`,
      };
    },
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type using dayJS",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      //if we have more than 1 key it means we have a firebase
      //TimeStamp and we convert it to a readable format using
      //DATE JS
      if (Object.keys(value).length > 1) {
        return new Date(value.toDate());
      }
      //BUT if we have a DATE JS value
      //we simply convert it to String
      return new Date(value.getTime()); // value sent to the client
    },
    parseLiteral(ast) {
      //MOST OF THE TIME this is the value coming from the client
      //we check if the value is string and THEN we can parse the value
      //so it converts to DATE JS format
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};
