import fs from 'fs';
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "./static/images";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

export { upload }