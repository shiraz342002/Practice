// import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// export const s3Config = {
//   s3: new AWS.S3({
//     region: process.env.AWS_REGION,
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   }),
//   bucketName: process.env.BUCKET_NAME,
// };
