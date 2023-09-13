const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/mydb';

function connectMongooseDb(mongoose) {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to ' + MONGODB_URI);
    });
    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
}

module.exports = connectMongooseDb;