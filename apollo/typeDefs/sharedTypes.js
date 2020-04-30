import gql from "graphql-tag";

const shared = gql`
  type Telefono {
    cel: String
    whatsapp: Boolean
    fijo: String
  }
  input TelefonoInput {
    cel: String
    whatsapp: Boolean
    fijo: String
  }

  scalar Date

  scalar FileUpload

  extend type Query {
    today: Date!
    addDays(date: Date!, days: Int!): Date!
    subtractDays(date: Date!, days: Int!): Date!
    # uploads: [FileType]
  }

  type File {
    filename: String
    mimetype: String
    encoding: String
  }
  # type FileType {
  #   filename: String
  #   path: String
  #   mimetype: String
  # }

  # input UploadFileInput {
  #   files: [Upload]
  #   name: String
  # }
  type UploadResponse {
    URL: String
  }

  extend type Mutation {
    #   singleUpload(file: Upload!): FileType
    #   singleUpload(file: Upload!): File
    singleUploadStream(file: FileUpload!): UploadResponse
    #   uploadFile(input: UploadFileInput!): UploadResponse
  }
`;

module.exports = shared;
