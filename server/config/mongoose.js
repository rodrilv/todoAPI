import mongoose from "mongoose";

export function db(){
    const optionsForDatabase = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 1, // Maintain up to 10 socket connections
        family: 4, // Use IPv4, skip trying IPv6
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    mongoose.connect(process.env.DEV_DB, optionsForDatabase)
    .then(() => console.log('Connected to DB'))
    .catch(error => console.log('Couldnt connect to DB', error));
}