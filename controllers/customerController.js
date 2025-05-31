const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, totalSpend, visits, tags } = req.body;

    const customer = await Customer.create({
      userId: req.user.sub, 
      name,
      email,
      phone,
      totalSpend,
      visits,
      tags,
    });

    res.status(201).json(customer);
  } catch (err) {
    console.error("❌ Error saving customer:", err);
    res.status(500).json({ message: "Failed to create customer" });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user.sub }); 
    res.json(customers);
  } catch (err) {
    console.error("❌ Error fetching customers:", err);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};

module.exports = { createCustomer, getCustomers };
