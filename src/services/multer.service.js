const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { responseModel } = require("../responses");

const fileFilter = (req, file, cb) => {
  try {
    const allowedFileTypes = [".jpg", ".png", ".jpeg", ".mp4"]; // Add more file types as needed
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(extname)) {
      return cb(null, true);
    } else {
      return cb(new Error(responseModel.validationError("Invalid Image Type")));
    }
  } catch (error) {
    return cb(new Error(responseModel.validationError("Something Went Wrong")));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationPath;
    switch (file.fieldname) {
      case "profilePic":
        destinationPath = path.join(__dirname, "../public/profilePics");
        break;
      case "product_image":
        destinationPath = path.join(__dirname, "../public/products");
        break;
      default:
        break;
    }

    // Check if the destination directory exists, create it if not
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(' ', '_'));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
