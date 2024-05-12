import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../Form/Form";
import { users } from "../../constants/constants";
import Vector from "../../assets/vector.svg";
export default function SignUp(props) {
  const formProps = {
    formType: "Register",
  };
  return (
    <div className="body lg:flex px-16 w-full lg:h-5/6 mt-2">
      <img
        src={Vector}
        alt="Graphics"
        className="lg:w-1/2 lg:my-auto lg:mx-auto mt-24"
      />
      <div className="lg:ml-auto lg:w-1/2 w-screen">
        <div className="bg-white flex flex-col justify-items-center items-center py-4 px-4 rounded shadow-md lg:w-3/4 w-full my-7 ml-auto ">
          <h1 className="text-3xl font-bold font-poppins text-primary py-5">
            SignUp
          </h1>

          <Form {...formProps} />
          <h1 className="font-poppins text-base pt-5 ">
            Existing User{" "}
            <Link to="/login">
              <span className="text-blue-500">Login</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
