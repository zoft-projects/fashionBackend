const productSchemaType = {
    _id: "string",                  
    name: "string",                 
    brand: "string",               
    image: {
      fname: "string",              
      type: "string",            
      data: "buffer"             
    },
    category: "string",           
    description: "string",      
    rating: "number",             
    price: "number",               
    createdAt: "date",              
    updatedAt: "date"           
  };
  
  module.exports = {
    productSchemaType
  };
  