import { diskStorage } from "multer";
import { extname } from "path";
import { FileInterceptor } from "@nestjs/platform-express";

export function FileUpload(image: string, destination: string) {
  return FileInterceptor(image, {
    storage: diskStorage({
      destination: destination,
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join("");
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  });
}
