import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
export const AppConfig = {
  bucketName: process.env.BUCKET_NAME,
  mongooseConfig: {
    uri: process.env.MONGODB_URI,
  },
  authConfig: {
    privateKey: process.env.JWT_PRIVATE_KEY,
    publicKey: process.env.JWT_PUBLIC_KEY || "boilerplat",
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || "86400",
  },
  documentationEnabled: process.env.ENABLE_DOCUMENTATION,

  userReputationConfig: {
    upVote: process.env.USER_REPUTATION_UPVOTE,
    downVote: process.env.USER_REPUTATION_DOWNVOTE,
    updateUpVote: process.env.USER_REPUTATION_UPDATEUPVOTE,
    updateDownVote: process.env.USER_REPUTATION_UPDATEDOWNVOTE,
  },

  firebaseServerKeyConfig: {
    firebaseServerKey: process.env.FIREBASE_SERVER_KEY,
  },

  appConfig: {
    port: process.env.PORT || 1234,
    version: process.env.API_VERSION || "v1.0.0",
  },
  sendGridConfig: {
    host: process.env.SEND_GRID_HOST || "smtp.sendgrid.net",
    secure: process.env.SEND_GRID_SECURE || false,
    port: process.env.SEND_GRID_PORT || 587,
    user: process.env.SEND_GRID_USER || "apikey",
    password:
      process.env.SEND_GRID_PASS ||
      "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",
    email: process.env.SEND_GRID_EMAIL || "afaq.ahmad.developer@gmail.com",
  },

  isDevelopment: process.env.NODE_ENV || "development",

  isProduction: process.env.NODE_ENV || "production",

  isTest: process.env.NODE_ENV || "test",

  nodeEnv: process.env.NODE_ENV || "development",
};
