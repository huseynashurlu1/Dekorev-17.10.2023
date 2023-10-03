const mongoose = require('mongoose');
const URL = 'mongodb+srv://huseynashurlu:devlife85@cluster0.a06uvit.mongodb.net/?retryWrites=true&w=majority'

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(URL)
        console.log('Connected to Database');
    } catch (error) {
        console.log('Error occured while connecting to database');
    }
}

module.exports = dbConnect;