import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { useFormik } from "formik";

export default function Login() {

  const {sendDataToLogin,setToken}= useContext(userContext)
  const navigate=useNavigate()
  
  const [isLoading,setIsLoading]=useState(false)
   
  async function userLogin(values){

    setIsLoading(true);
  let response = await sendDataToLogin(values);

  if(response.msg==="done"){
    setToken(response.token);
    localStorage.setItem("token",`3b8ny__${response.token}`);
    toast.success("user logged in successfully");
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  else{
    toast.error(response.data.msg)
  }

  setIsLoading(false)
}
  
  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: userLogin,
  });
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form className="col-md-4 d-flex flex-column justify-content-center px-5" onSubmit={signInForm.handleSubmit}>
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onChange={signInForm.handleChange}
              value={signInForm.values.email}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onChange={signInForm.handleChange}
              value={signInForm.values.password}
            />

            <button type="submit" className="btn btn-main">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
            <p>
              You don't have account yet ?
              <Link to="/signup" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
