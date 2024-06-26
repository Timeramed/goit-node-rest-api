import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename(req, file, cb) {
    cb(null, `${req.user.id}_${file.originalname}`);
  },
});

export default multer({ storage });
