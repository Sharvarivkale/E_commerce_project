const express = require("express");
const {
  checkoutController,
  paymentVerificationController,
  getOrdersController,
  getAllOrdersController,
} = require("../controller/payment.controller");
const { requiresignIn, isadmin } = require("../middleware/auth.middleware");
const router = express.Router();

// CHECKOUT
router.post("/checkout", requiresignIn, checkoutController);

// PAYMENT VERIFICATION
router.post("/payment-verification", requiresignIn, paymentVerificationController);

// GET RAZORPAY KEY
router.get("/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

// ORDERS
router.get("/orders", requiresignIn, getOrdersController);

// ALL ORDERS
router.get("/all-orders", requiresignIn, isadmin, getAllOrdersController);

module.exports = router;
