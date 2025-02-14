import { Application } from 'express';
import users from './users';
import admin from './admin';

export default (app: Application): void => {
    app.use('/api/users', users);
    app.use('/api/admin', admin);
};
