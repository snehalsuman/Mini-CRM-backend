const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/database");
const CommunicationLog = require("./models/CommunicationLog");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Routes
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const segmentRoutes = require("./routes/segmentRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/delivery", require("./routes/deliveryRoutes"));

app.use("/api/vendor", require("./routes/vendorRoutes"));

app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/segments", segmentRoutes);
app.use("/api/campaigns", campaignRoutes);

// Vendor simulation endpoint
app.post("/api/vendor/send", async (req, res) => {
  const { campaignId, customerId, message } = req.body;
  const isSuccess = Math.random() < 0.9;
  const status = isSuccess ? "SENT" : "FAILED";

  await CommunicationLog.create({ campaignId, customerId, message, status });
  res.json({ status });
});

app.get("/", (req, res) => {
  res.send("🚀 Mini CRM Backend Running!");
});

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
