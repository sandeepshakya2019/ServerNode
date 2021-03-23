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