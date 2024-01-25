import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else
        ({ error: "Unsupported file format. Upload only JPEG/JPG or PNG" }, false);
};

export const upload = multer({
    storage,
    limits: { fieldSize: 1024 * 1024 },
    fileFilter,
})