import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../../app';

let mongoServer: MongoMemoryServer;
let adminToken: string;
let userToken: string;
let superAdminToken:string;
let productId: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  await mongoose.connect(mongoUri);

  await request(app).post('/api/users/register').send({
    username: "admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin"
  });

  await request(app).post('/api/users/register').send({
    username: "user",
    email: "user@gmail.com",
    password: "user123",
    role: "user"
  });

  await request(app).post('/api/users/register').send({
    username: "superadmin",
    email: "superadmin@gmail.com",
    password: "superadmin123",
    role: "super-admin"
  });

  const adminLoginResponse = await request(app).post('/api/users/login').send({
    email: "admin@gmail.com",
    password: "admin123"
  });
  adminToken = adminLoginResponse.body.token;

  const userLoginResponse = await request(app).post('/api/users/login').send({
    email: "user@gmail.com",
    password: "user123"
  });
  userToken = userLoginResponse.body.token;

  const superAdminLoginResponse = await request(app).post('/api/users/login').send({
    email: "superadmin@gmail.com",
    password: "superadmin123"
  });
  superAdminToken = superAdminLoginResponse.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Product API Integration Test', () => {

  const productData = {
    name: "Test Product",
    brand: "Test Brand",
    image: {
      fname: "test.jpg",
      type: "image/jpeg",
      data: Buffer.from("testImageData").toString("base64"),
    },
    category: "Electronics",
    description: "This is a test product",
    rating: 4.5,
    price: 100,
  };

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).post('/api/admin/add').send(productData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "No token provided");
  });

  it('should return 403 if user role is not authorized', async () => {
    const response = await request(app)
      .post('/api/admin/add')
      .set("Authorization", `Bearer ${userToken}`) 
      .send(productData);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Access Denied");
  });

  it('should create a new product if the user is an admin', async () => {
    const response = await request(app)
      .post('/api/admin/add')
      .set("Authorization", `Bearer ${adminToken}`) 
      .send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Product added successfully");

    productId = response.body.product._id;

  });

  it('should return all products details',async()=>{
    const response=await request(app)
    .get('/api/users/get_products')
    .set("Authorization", `Bearer ${userToken}`)
    .send()

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Get product details");
  })

  it('should update a product if the user is an admin', async () => {
    const updatedData = { name: "Updated Test Product", price: 150 };
    const response = await request(app)
      .put(`/api/admin/edit_product/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Product updated successfully");
    expect(response.body.product).toHaveProperty("name", "Updated Test Product");
    expect(response.body.product).toHaveProperty("price", 150);
  });

  it('should delete a product if the user is super admin', async () => {
    const response = await request(app)
      .delete(`/api/admin/delete_product/${productId}`)
      .set("Authorization", `Bearer ${superAdminToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Product deleted successfully");
  });
});
