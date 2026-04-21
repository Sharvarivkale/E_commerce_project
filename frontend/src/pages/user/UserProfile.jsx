import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import UserMenu from "../../components/layout/usermenu";
import { useAuth } from "../../context/auth_context";
import { toast } from "react-toastify";
import axios from "axios";

const UserProfile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user || {};
    setName(name || "");
    setPhone(phone || "");
    setAddress(address || "");
    setEmail(email || "");
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/auth/profile", {
        name,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        setIsUpdate(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {!isUpdate ? (
              <div className="card w-75 p-4 bg-dark text-white border-secondary">
                <h1 className="mb-4">USER PROFILE</h1>
                <div className="user-info">
                  <p><strong>Name:</strong> {auth?.user?.name}</p>
                  <p><strong>Email:</strong> {auth?.user?.email}</p>
                  <p><strong>Phone:</strong> {auth?.user?.phone}</p>
                  <p><strong>Address:</strong> {auth?.user?.address}</p>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => setIsUpdate(true)}
                  >
                    UPDATE PROFILE
                  </button>
                </div>
              </div>
            ) : (
              <div className="form-container" style={{ marginTop: "-40px" }}>
                <form onSubmit={handleSubmit}>
                  <h4 className="title text-white">UPDATE PROFILE</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Name"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Email "
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Phone"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Address"
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      UPDATE
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setIsUpdate(false)}
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
