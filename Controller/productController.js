const Product = require("../Models/productModels");

exports.addProduct = async (req, res) => {
  const { title, price, rating, image } = req.body;

  try {
    if (!title || !price || !rating || !image) {
      return res.status(400).json("All fields are required");
    }

    const newProduct = new Product({
      title,
      price,
      rating,
      image,
    });

    await newProduct.save();
    res.status(200).json(newProduct);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const all = await Product.find();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json("Product deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};




exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await Product.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (err) {
    return res.status(500).json({ message: "Error deleting product", error: err });
  }
};
