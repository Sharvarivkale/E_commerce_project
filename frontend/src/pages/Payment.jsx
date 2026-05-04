import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart_context";
import { useAuth } from "../context/auth_context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price calculation
  const totalAmount = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const amount = totalAmount();
      if (amount <= 0) {
        toast.error("Cart is empty");
        setLoading(false);
        return;
      }

      // 1. Get Razorpay Key
      const { data: { key } } = await axios.get("/payment/getkey");
      console.log("Razorpay Key:", key);

      // 2. Create Order
      const { data: { order } } = await axios.post(
        "/payment/checkout",
        { amount }
      );
      console.log("Razorpay Order:", order);

      if (!order) {
        toast.error("Failed to create order");
        setLoading(false);
        return;
      }

      // 3. Open Razorpay Checkout
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "E-commerce Project",
        description: "Payment for your order",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          console.log("Razorpay Response:", response);
          try {
            // 4. Verify Payment
            const { data } = await axios.post(
              "/payment/payment-verification",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                products: cart,
                amount: amount,
              }
            );

            if (data.success) {
              setCart([]);
              localStorage.removeItem("cart");
              toast.success("Payment Successful! Order Placed.");
              navigate("/dashboard/user/order");
            }
          } catch (error) {
            console.log(error);
            toast.error("Payment Verification Failed");
          }
        },
        prefill: {
          name: auth?.user?.name,
          email: auth?.user?.email,
          contact: auth?.user?.phone,
        },
        notes: {
          address: auth?.user?.address,
        },
        theme: {
          color: "#6366f1",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Payment - E-commerce"}>
      <div className="container py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="glass-card p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Payment Summary</h1>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-300">
              <span>Total Items:</span>
              <span className="font-bold">{cart?.length}</span>
            </div>
            <div className="flex justify-between text-white text-xl border-t border-[#374151] pt-4">
              <span>Total Amount:</span>
              <span className="font-bold text-[#6366f1]">₹{totalAmount()}</span>
            </div>
          </div>
          <button
            className="btn btn-primary w-full py-3 text-lg font-bold"
            onClick={handlePayment}
            disabled={loading || cart?.length === 0}
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>
          <button
            className="btn btn-outline-secondary w-full mt-4"
            onClick={() => navigate("/cart")}
          >
            Back to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
