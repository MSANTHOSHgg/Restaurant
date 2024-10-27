const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { CustomerModel, ContactModel } = require("./models/Customer"); 

const app = express();
app.use(express.json());
app.use(cors());


mongoose
  .connect("mongodb://localhost:27017/CustomerInformation")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));


app.post("/customerdetails", (req, res) => {
  const { existingemail, existingpass } = req.body;
  console.log(req.body);

  CustomerModel.findOne({ email: existingemail })
    .then((user) => {
      if (user) {
        if (user.password === existingpass) {
          res.json("Success");
          console.log("Login attempt with email:", existingemail);
        } else {
          res.json("Password is incorrect");
          console.log(user.password);
          console.log("Failed login attempt with password:", existingpass);
        }
      } else {
        res.status(401).json("No Record is Existed");
      }
    })
    .catch((err) => res.status(500).json("Error occurred: " + err.message));
});


app.post("/newregister", (req, res) => {
  CustomerModel.create(req.body)
    .then((customer) => res.json(customer))
    .catch((err) => res.status(500).json("Error occurred: " + err.message));
});


app.post("/newfeedbacks", (req, res) => {
  ContactModel.create(req.body)
    .then((feedback) => res.json(feedback))
    .catch((err) => res.status(500).json("Error occurred: " + err.message));
});

app.put("/update-delivery", async (req, res) => {
  const { email, delivery } = req.body; // Email and delivery info from frontend
  try {
      const customer = await CustomerModel.findOneAndUpdate(
          { email }, // Find customer by email
          { delivery }, // Update delivery information
          { new: true, upsert: true } // Return updated doc or create if not found
      );

      if (customer) {
          res.status(200).json({ message: "Delivery information updated", customer });
      } else {
          res.status(404).json({ message: "Customer not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Error updating delivery information", error });
  }
});

app.get("/userdetails/:email", (req, res) => {
  const { email } = req.params;
  CustomerModel.findOne({ email })
      .then((user) => {
          if (user) {
              res.json(user);
          } else {
              res.status(404).json("User not found");
          }
      })
      .catch((err) => res.status(500).json("Error occurred: " + err.message));
});


app.listen(3001, () => {
  console.log("Server is running successfully on port 3001");
});
