import React, { useState } from "react";
import { auth, db } from "../Config/firebasedb";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // This is function to sign up user on firestore
  const signUp = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        ...formData, // Additional fields like name, phone, etc.
        createdAt: new Date(),
      });
      navigate("/signin");
      toast.success("SignUn Successfull");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // This is to handle the change in data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen/2 flex flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bolder text-center text-slate-800 mb-8">
          Sign Up
        </h1>

        <form onSubmit={signUp} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:border-transparent transition-all duration-200
                       bg-slate-50"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
