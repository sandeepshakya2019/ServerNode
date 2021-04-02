const Tv = require("../Models/tv");
const Mobile = require("../Models/mobile");
const Laptop = require("../Models/laptop");
const Product = require("../Models/product");

const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: err.message });
    // res.status(400).send("Create Product Failed");
  }
};

exports.createPro = async (req, res) => {
  try {
    // console.log(req.body);
    req.body.slug = slugify(req.body.title);

    if (req.body.product === "laptop") {
      const newProduct = await new Laptop(req.body).save();
      res.json(newProduct);
    } else if (req.body.product === "tv") {
      const newProduct = await new Tv(req.body).save();
      res.json(newProduct);
    } else if (req.body.product === "mobile") {
      const newProduct = await new Mobile(req.body).save();
      res.json(newProduct);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: err.message });
    // res.status(400).send("Create Product Failed");
  }
};

exports.listAll = async (req, res) => {
  try {
    const product = await Product.find({})
      .limit(Number(req.params.count))
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("List Product Failed");
  }
};
exports.listAllLaptop = async (req, res) => {
  try {
    const product = await Laptop.find({})
      .limit(Number(req.params.count))
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("List Product Failed");
  }
};
exports.listAllMobile = async (req, res) => {
  try {
    const product = await Mobile.find({})
      .limit(Number(req.params.count))
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("List Product Failed");
  }
};
exports.listAllTv = async (req, res) => {
  try {
    const product = await Tv.find({})
      .limit(Number(req.params.count))
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("List Product Failed");
  }
};

// Without Pagination
exports.list = async (req, res) => {
  try {
    // sort created at === order desc/asec === limit count
    const { sort, order, limit } = req.body;
    const product = await Product.find({})
      .limit(Number(limit))
      .sort([[sort, order]])
      .exec();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("List Product Failed");
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  // console.log(total);
  // console.log(res);
  res.json(total);
  // return res.send(total);
};

exports.read = async (req, res) => {
  // console.log(req.params);
  const product = await Product.findOne({ slug: req.params.slug }).exec();
  // console.log(product);
  res.json(product);
};

exports.readv = async (req, res) => {
  // console.log(req.params);
  product = res.body.product;

  if (product === "mobile") {
    const product = await Mobile.findOne({ slug: req.params.slug }).exec();
    res.json(product);
  } else if (product === "laptop") {
    const product = await Laptop.findOne({ slug: req.params.slug }).exec();
    res.json(product);
  } else if (product === "tv") {
    const product = await Tv.findOne({ slug: req.params.slug }).exec();
    res.json(product);
  }

  // console.log(product);
};

exports.update = async (req, res) => {
  try {
    // req.body.slug = slugify(req.body.title);
    // console.log(req.body);
    // console.log(req.params);
    let newSlug = slugify(req.body.title);
    // console.log("New" + newSlug);
    const makeUpdate = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title: req.body.title,
        description: req.body.description,
        slug: newSlug,
        price: req.body.price,
        quantity: req.body.quantity,
        color: req.body.color,
        screensize: req.body.screensize,
        operatingsystem: req.body.operatingsystem,
        quality: req.body.quality,
        framerate: req.body.framerate,
      },
      { new: true }
    ).exec();
    res.json(makeUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).send("Update Failed");
  }
};

exports.remove = async (req, res) => {
  console.log(req.params.slug);
  try {
    const deletemake = await Product.findOneAndDelete({
      slug: req.params.slug,
    }).exec();

    res.json("Category Deleted");
  } catch (err) {
    console.log(err);
    res.status(400).send("Deltails Not Found Unable to Delete");
  }
};
