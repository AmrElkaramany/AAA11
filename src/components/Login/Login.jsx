import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UserContext } from "../../Context/UserContext";


export default function Login() {
  const {setToken} = useContext(UserContext)
    const [Isloading, setIsLoading] = useState(false)
  
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/)
      .required("password is required"),
  });

  const handelLogin = async (userValues) => {
    console.log(userValues);
    setIsLoading(true)
    try {
      const { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signin`,
        userValues
      );
      console.log(data);
      Swal.fire({
        title: "success",
        text: data.msg,
        icon: "success",
        confirmButtonText: "Ok",
      }).then(navigate("/"));
      setToken(data.token)
      localStorage.setItem('userToken' , data.token)

    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
      Swal.fire({
        title: "Error!",
        text: error.response.data.msg,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    finally{
      setIsLoading(false)
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handelLogin,
    validationSchema,
  });

  const formFields = [
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" },

  ];

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
        {formFields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {field.label}
            </label>
            <input
              value={formik.values[field.id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={field.type}
              id={field.id}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors[field.id] && formik.touched[field.id] && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors[field.id]}
              </div>
            )}
          </div>
        ))}

        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="flex justify-center w-full my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {Isloading? <AiOutlineLoading3Quarters className="animate-spin"/> : "Submit"}
        </button>

        <button
          disabled={!(formik.isValid && formik.dirty)}
          onClick={formik.handleReset}
          type="reset"
          className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Clear Inputs
        </button>

        <p className="text-start my-2">
          Already have an account{" "}
          <span className="text-blue-500">
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </form>
    </>
  );
}
