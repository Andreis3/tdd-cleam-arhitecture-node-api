export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api-db',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'FBEJWFNONFOWNEOFNDOGN6544',
};
