const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const settingsRoute = require('./routes/settings');
const statusRoute = require('./routes/status');
const storeRoute = require('./routes/store');
const branchRoute = require('./routes/branch');
const colorRoute = require('./routes/color');
const userRoute = require('./routes/user')

const multer = require('multer');

const dbConnect = require('./config/connection');
dbConnect();

app.use(cors());
app.use(bodyParser.json());

const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const categoryUpload = multer({ storage: categoryStorage });


const settingsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/settings/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const settingsUpload = multer({ storage: settingsStorage });


const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/product/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const productUpload = multer({ storage: productStorage });

const storeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/store/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const storeUpload = multer({ storage: storeStorage });


app.use('/api/category', categoryUpload.single('image'), categoryRoute);
app.use('/api/product', productUpload.array('images', 5), productRoute);
app.use('/api/store', storeUpload.single('image'), storeRoute);
app.use('/api/settings', settingsUpload.single('aboutImage'), settingsRoute);
app.use('/api/status', statusRoute);
app.use('/api/branch', branchRoute);
app.use('/api/color', colorRoute);
app.use('/api/user', userRoute);

app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});