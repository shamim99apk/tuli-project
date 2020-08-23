const express = require("express");
const router = express.Router();
const { HotelModel } = require("../models/HotelModel");
const multer = require("multer");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "hotelUpload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var HotelUpload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/uploadHotelImage", auth, (req, res) => {
  HotelUpload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});
router.post("/uploadHotel", auth, (req, res) => {
  //save all the data we got from the client into the DB
  const hotel = new HotelModel(req.body);

  hotel.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getHotel", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};

  HotelModel.find(findArgs)
    .populate("writer")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, hotels) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, hotels, postSize: hotels.length });
    });
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get("/hotels_by_id", (req, res) => {
  let type = req.query.type;
  let hotelId = req.query.id;

  console.log("req.query.id", req.query.id);

  if (type === "array") {
    let ids = req.query.id.split(",");
    hotelId = [];
    hotelId = ids.map((item) => {
      return item;
    });
  }

  console.log("groceryId", hotelId);

  //we need to find the product information that belong to product Id

  HotelModel.find({ _id: { $in: hotelId } })
    .populate("writer")
    .exec((err, hotel) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(hotel);
    });
});

module.exports = router;
