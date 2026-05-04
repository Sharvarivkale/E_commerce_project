import React from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart_context";
import { useAuth } from "../context/auth_context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Your Cart - E-commerce"}>
      <div className="container py-8">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center text-4xl font-bold mb-2 text-white">
              {`Hello ${auth?.token && auth?.user?.name ? auth.user.name : "Guest"}`}
            </h1>
            <p className="text-center text-gray-400 text-lg mb-8">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "(Please login to checkout)"
                  }`
                : "Your cart is currently empty"}
            </p>
          </div>
        </div>
        <div className="row mt-4 gap-4 md:gap-0">
          <div className="col-md-8">
            <div className="space-y-4">
              {cart?.map((p) => (
                <div className="glass-card p-4 flex gap-6" key={p._id}>
                  <div className="w-1/3">
                    <img
                      src={`${import.meta.env.VITE_APP}/product/get_product_photo/${p._id}`}
                      className="rounded-lg w-full h-32 object-cover border border-[#374151]"
                      alt={p.name}
                    />
                  </div>
                  <div className="w-2/3 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xl font-bold text-white mb-1">{p.name}</h5>
                      <p className="text-gray-400 text-sm mb-2">
                        {p.description.substring(0, 60)}...
                      </p>
                      <p className="text-[#6366f1] font-bold text-lg">Price: ${p.price}</p>
                    </div>
                    <button
                      className="btn btn-outline-danger w-fit px-4"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card sticky top-4">
              <h2 className="text-2xl font-bold mb-4 text-[#6366f1] border-b border-[#374151] pb-2 text-center">Cart Summary</h2>
              <div className="space-y-4 text-center">
                <p className="text-gray-400">Total | Checkout | Payment</p>
                <div className="text-3xl font-bold text-white">
                  Total: {totalPrice()}
                </div>
                
                <div className="border-t border-[#374151] pt-4 mt-4 text-left">
                  {auth?.user?.address ? (
                    <>
                      <h4 className="font-semibold text-gray-300 mb-2">Delivery Address</h4>
                      <p className="text-white mb-4 italic">"{auth?.user?.address}"</p>
                      <div className="flex flex-col gap-3">
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                        <button
                          className="btn btn-primary py-3 text-lg font-bold"
                          onClick={() => {
                            setCart([]);
                            localStorage.removeItem("cart");
                            navigate("/dashboard/user/order");
                            toast.success("Order Placed Successfully");
                          }}
                          disabled={!auth?.user?.address}
                        >
                          Place Order
                        </button>
                        <button
                          className="btn btn-outline-info py-3 text-lg font-bold"
                          onClick={() => navigate("/payment")}
                          disabled={!auth?.user?.address}
                        >
                          Make Payment
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      {auth?.token ? (
                        <button
                          className="btn btn-primary w-full"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Add Address to Checkout
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-indigo w-full"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Login to Checkout
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
