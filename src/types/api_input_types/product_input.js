
const createProductInput = {
  name: "string",          
  brand: "string",        
  image: {
    fname: "string",     
    type: "string",        
    data: "Buffer"        
  },
  category: "string",      
  description: "string",  
  rating: "number",     
  price: "number"          
};

const getProductInput={
    productId:"string"
}

const updateProductInput={
  name: "string",          
  brand: "string",        
  image: {
    fname: "string",     
    type: "string",        
    data: "Buffer"        
  },
  category: "string",      
  description: "string",  
  rating: "number",     
  price: "number"
}
module.exports = {
  createProductInput,
  updateProductInput,
  getProductInput
};
