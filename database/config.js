const mongoose = require('mongoose');

const dbConnection = async() => {
  
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('dB ONLINE');
  } catch (error) {
    throw new Error('Error a la hora de iniciliazar db')
  }
}

module.exports = {
  dbConnection
}