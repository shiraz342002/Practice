import { Injectable } from "@nestjs/common";
import type { MongooseModuleOptions } from "@nestjs/mongoose";

@Injectable()
export class ConfigurationService {
  get mongooseConfig(): MongooseModuleOptions {
    return {
      uri: process.env.MONGODB_URI,
    };
  }
  get authConfig() {
    return {
      privateKey: process.env.JWT_PRIVATE_KEY,
      publicKey: process.env.JWT_PUBLIC_KEY || "boilerplat",
      // jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || '86400',
    };
  }

  get documentationEnabled() {
    return process.env.ENABLE_DOCUMENTATION;
  }

  get userReputationConfig() {
    return {
      upVote: process.env.USER_REPUTATION_UPVOTE,
      downVote: process.env.USER_REPUTATION_DOWNVOTE,
      updateUpVote: process.env.USER_REPUTATION_UPDATEUPVOTE,
      updateDownVote: process.env.USER_REPUTATION_UPDATEDOWNVOTE,
    };
  }

  get firebaseServerKeyConfig() {
    return {
      firebaseServerKey: process.env.FIREBASE_SERVER_KEY,
    };
  }

  get appConfig() {
    return {
      port: process.env.PORT || 3000,
    };
  }
  get sendGridConfig() {
    return {
      host: process.env.SEND_GRID_HOST || "smtp.sendgrid.net",
      secure: process.env.SEND_GRID_SECURE || false,
      port: process.env.SEND_GRID_PORT || 587,
      user: process.env.SEND_GRID_USER || "apikey",
      password:
        process.env.SEND_GRID_PASS ||
        "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",
      email: process.env.SEND_GRID_EMAIL || "afaq.ahmad.developer@gmail.com",
    };
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === "development";
  }

  get isProduction(): boolean {
    return this.nodeEnv === "production";
  }

  get isTest(): boolean {
    return this.nodeEnv === "test";
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || "development";
  }
}
