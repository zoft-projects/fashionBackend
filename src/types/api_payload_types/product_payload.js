const createProductPayload = {
    _id: String, 
    name: String,
    brand: String,
    image: {
      fname: String,
      type: String,
      data: Buffer,
    },
    category: String,
    description: String,
    rating: Number,
    price: Number,
    createdAt: { type: Date, default: Date.now },  
    updatedAt: { type: Date, default: Date.now } 
  };
  
  const getProductPayload={
    _id: String, 
    name: String,
    brand: String,
    image: {
      fname: String,
      type: String,
      data: Buffer,
    },
    category: String,
    description: String,
    rating: Number,
    price: Number,
    createdAt: { type: Date, default: Date.now },  
    updatedAt: { type: Date, default: Date.now } 
  }

  const getAllProductsPayload=[
    {
        _id: String, 
        name: String,
        brand: String,
        image: {
          fname: String,
          type: String,
          data: Buffer,
        },
        category: String,
        description: String,
        rating: Number,
        price: Number,
        createdAt: { type: Date, default: Date.now },  
        updatedAt: { type: Date, default: Date.now }    
    }
  ]
  const updateProductPayload={
    _id: String, 
    name: String,
    brand: String,
    image: {
      fname: String,
      type: String,
      data: Buffer,
    },
    category: String,
    description: String,
    rating: Number,
    price: Number,
    createdAt: { type: Date, default: Date.now },  
    updatedAt: { type: Date, default: Date.now } 
  }

  module.exports = {
    createProductPayload,
    updateProductPayload,
    getProductPayload,
    getAllProductsPayload

  }
  