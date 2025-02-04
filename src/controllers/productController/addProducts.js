const { productService } = require("../../services");

exports.addProduct = async (req, res) => {

  console.log("Body=",req.body);
   
  try {
    const { name, brand,image, category, description, rating, price } = req.body;
    const imageBuffer=Buffer.from(image.data,"base64")

    const imageObject={
      fname: image.fname,
      type: image.type,
      data: imageBuffer
    }
    
    const productData={
      name,
      brand,
      image:imageObject,
      category,
      description,
      rating,
      price
    }
    const newProduct = await productService.addProduct(productData);

    const responsePayload = {
      _id: newProduct._id,
      name: newProduct.name,
      brand: newProduct.brand,
      image: newProduct.image,
      category: newProduct.category,
      description: newProduct.description,
      rating: newProduct.rating,
      price: newProduct.price,
      createdAt: newProduct.createdAt,
      updatedAt: newProduct.updatedAt,
    };

    res.status(201).json({ message: 'Product added successfully', product: responsePayload });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};

