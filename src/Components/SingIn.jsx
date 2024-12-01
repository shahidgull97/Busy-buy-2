import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

// import { useDetails } from "../Context/userContext";
import { toast } from "react-toastify";
import { signInThunk } from "../Redux/Reducers/User.Reducer";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../Redux/Reducers/User.Reducer";

const SignInPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleSignIn = (formData) => {
    dispatch(signInThunk(formData))
      .unwrap()
      .then(() => {
        // Navigate after successful sign-in
        navigate("/");
      })
      .catch((error) => {
        toast.error(error); // Handle any error in the sign-in process
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen/2 flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-semibold text-center text-slate-800 mb-8">
          Sign In
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn(formData);
          }}
          className="space-y-4"
        >
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:border-transparent transition-all duration-200
                       bg-slate-50"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:border-transparent transition-all duration-200
                       bg-slate-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white mt-6 py-3 px-4 rounded-lg
                     hover:bg-purple-600 focus:outline-none focus:ring-2 
                     focus:ring-purple-500 focus:ring-offset-2 transition-colors
                     duration-200 font-medium"
          >
            Sign In
          </button>
        </form>
        <Link to={"/signup"}>
          <h3 className="font-bold text-blue-800 mt-6">or SignUp Instead</h3>
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
