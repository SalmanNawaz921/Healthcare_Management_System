import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../../assets/vector.svg";
import Form from "../Form/Form";

export default function Login() {
  const formProps = {
    formType: "Login",
  };
  return (
    <>
      <div className="body lg:flex px-16 w-full lg:h-5/6 mt-2">
        <img
          src={Vector}
          alt="Graphics"
          className="lg:w-1/2 lg:my-auto lg:mx-auto mt-24"
        />
        <div className="lg:ml-auto lg:w-1/2 w-screen">
          <div className="bg-white flex flex-col justify-items-center items-center py-4 px-4 rounded shadow-md lg:w-3/4 w-full my-7 ml-auto ">
            <h1 className="text-3xl font-bold font-poppins text-primary py-5">
              Login
            </h1>
            <Form {...formProps} />
            <h1 className="font-poppins text-base pt-5 ">
              New User{" "}
              <Link to="/signup">
                <span className="text-blue-500">Sign Up</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
