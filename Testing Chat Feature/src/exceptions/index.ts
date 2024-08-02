import { HttpStatus } from "@nestjs/common";

export * from "./user-not-found.exception";
export * from "./page-type.exception";
export * from "./file-not-image.exception";

export enum ResponseMessage {
  SUCCESS = "Success",
}

// some code enums for sending response code in api response
export enum ResponseCode {
  SUCCESS = 200,
  CREATED_SUCCESSFULLY = 201,
  INTERNAL_ERROR = 500,
  NOT_FOUND = 404,
  CONTENT_NOT_FOUND = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  ALREADY_EXIST = 409,
  FORBIDDEN = HttpStatus.FORBIDDEN,
}

export enum LoggerMessages {
  API_CALLED = `Api Has Been Called.`,
}

export const ErrorCodesMeta = {
  USER_ALREADY_EXISTS: {
    message: "User already exist with this email",
  },
  USER_ALREADY_EXISTS_PHONE: {
    message: "User already exist with this phone no.",
  },
  USER_ALREADY_EXISTS_WITH_USERNAME: {
    message: "User already exist with this userName",
  },
  USER_EMAIL_NOT_VERIFIED: {
    message: "User email is not verified!",
  },
  USER_ACCOUNT_BLOCKED: {
    message: "Your account has been blocked.",
  },
  USER_NOT_EXISTS_WITH_THIS_EMAIL: {
    message: "User not exist with this email or Otp is Invalid",
  },
  USER_NOT_EXISTS_WITH_THIS_REF_CODE: {
    message: "User not exist with this Reference Code!",
  },
  YOUR_PASSWORD_IS_INCORRECT: {
    message: "Your password is incorrect",
  },
  INVALID_CREDENTIALS: {
    message: "Invalid credentials",
  },
  INVALID_OTP: {
    message: "Invalid OTP",
  },
  BAD_REQUEST: {
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    message: "Unauthorized",
  },
  PAYMENT_REQUIRED: {
    message: "Payment Required",
  },
  FORBIDDEN: {
    message: "Forbidden",
  },
  NOT_FOUND: {
    message: "Not Found",
  },
  NOT_ALLOWED: {
    message: "Not Allowed",
  },
  CONFLICT: {
    message: "Conflict",
  },
  INTERNAL_SERVER_ERROR: {
    message: "Internal Server Error",
  },
  ERROR: {
    message: "Error",
  },
  QUESTION_REACHED_MAXIMUM_NUMBER_ANSWERS: {
    message: "Question Has Reached The Maximum Number Of Answers",
  },
  IMAGE_REQUIRED: {
    message: "image Required",
  },
  ROOM_NOT_AVAILABLE: {
    message: "Room is already booked between the given dates",
  },
  HOUSE_NOT_AVAILABLE: {
    message: "Place is already booked between the given dates",
  },
  REVIEW_SUBMITTED: {
    message: "You have already submitted a review.",
  },
  QUESTION_OR_ANSWER_NOT_FOUND: {
    message: "Question Or Answer Not Found",
  },
  PLEASE_CHOOSE_FILTER: {
    message: "Filter Is Required",
  },
  KEYWORD_REQUIRED: {
    message: "keyword Is Required",
  },
  PRICE_RANGE_REQUIRED: {
    message: "Price Range Is Required",
  },
  FAILED_TO_SEND_MESSAGE_TO_WEBSOCKET_SERVER: {
    message: "Failed To Send Message To WebSocket Server",
  },
};

export const REPUTATION_ERROR_MESSAGE = (minReputation: number) =>
  `Reputation Points Must Be At Least ${minReputation} To Create A Post`;
export const NOTIFICATION_MESSAGE = (
  userName: string,
  type: string,
  response: string
) => `${userName} ${type} to your ${response}`;
