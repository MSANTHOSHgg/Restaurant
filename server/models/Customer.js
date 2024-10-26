const mongoose = require("mongoose")

const CustomerSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    delivery: {
      firstName: String,
      lastName: String,
      street: String,
      city: String,
      state: String,
      pinCode: String,
      country: String,
      phone: String,
  },
})

const CustomerModel = mongoose.model("customerdetails",CustomerSchema)

// contact schema
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
  });

  const ContactModel = mongoose.model('feedbacks',ContactSchema );

  module.exports = {
    CustomerModel,
    ContactModel,
  };