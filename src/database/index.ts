import connectToDB from './db'; 
import users from './models/users/users'; 
import products from './models/products/products';
import orders from './models/orders/order'

connectToDB();

export { users, products,orders };
