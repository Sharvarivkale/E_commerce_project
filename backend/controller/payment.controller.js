const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentModel = require("../models/paymentmodel");
const dotenv = require("dotenv");

dotenv.config();

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID ? "Found" : "Missing");
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "Found" : "Missing");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
const checkoutController = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Number(amount * 100), // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Checkout",
      error,
    });
  }
};

// PAYMENT VERIFICATION
const paymentVerificationController = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, products, amount } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database logic
      await new paymentModel({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        user: req.user._id,
        products,
        amount,
      }).save();

      res.status(200).send({
        success: true,
        message: "Payment Verified Successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid Signature",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Payment Verification",
      error,
    });
  }
};

module.exports = { checkoutController, paymentVerificationController };
