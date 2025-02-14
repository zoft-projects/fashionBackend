import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import connectToDB from './src/database/db';

const app: Application = express();
const server: http.Server = http.createServer(app);

const io: Server = new Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

app.locals.io = io;

app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }));

app.use(cors());

connectToDB();
import routes from './src/routes';
routes(app);

let cartCounts = new Map<string, number>();

io.on('connection', (socket) => {
    console.log('Connected to WebSocket.');
    cartCounts.set(socket.id, 0);

    socket.on('add-to-cart', (data: { quantity: number }) => {
        const currentCount = cartCounts.get(socket.id) || 0;
        const newCount = currentCount + data.quantity;
        cartCounts.set(socket.id, newCount);
        socket.emit('cart-updated', newCount);
    });

    socket.on('reset-cart', () => {
        cartCounts.set(socket.id, 0);
        socket.emit('cart-updated', 0);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket.');
        cartCounts.delete(socket.id);
    });
});

const PORT: number = parseInt(process.env.PORT || '8000', 10);

server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

export default app;
