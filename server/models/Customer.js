const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otpVerified: { type: Boolean, default: false },
  delivery: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    pinCode: String,
    country: String,
    phone: String,
  },
})

const CustomerModel = mongoose.model("customerdetails", CustomerSchema)

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const ContactModel = mongoose.model('feedbacks', ContactSchema);

const UserAddressSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
})


const AddressModel = mongoose.model('customeraddress', UserAddressSchema);

module.exports = {
  CustomerModel,
  ContactModel,
  AddressModel,
};