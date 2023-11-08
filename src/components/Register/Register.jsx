import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";

export default function Register() {
  const { sendDataToRegister } = useContext(userContext);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("username is required")
      .min(5, "username must be more than 5 characters")
      .max(8, "username must be less than 8 characters"),
    email: Yup.string()
      .required("email is required")
      .matches(/^\S+@\S+\.\S+$/, "please enter a valid email"),
      age:Yup.number().required("age is required").min(18,"you must be at least 18 years old").max(60,"you can't be more than 60 years old"),
      password:Yup.string().required("password is required").matches(/^[A-Z]/,"password must start with uppercase letter"),
      phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}/,"please enter a valid Egyptian number")
  });
  async function registerUser(values) {
    let response = await sendDataToRegister(values);
    if (response.msg === "done") {
      toast.success("user registered successfully");

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else {
      toast.error(response.data.msg);
    }
  }
  const signUpForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerUser,
  });
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form
          className="col-md-4 d-flex flex-column justify-content-center px-5"
          onSubmit={signUpForm.handleSubmit}
        >
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              id="name"
              value={signUpForm.values.name}
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
            />

            {signUpForm.touched.name && signUpForm.errors.name ? <div className="error">{signUpForm.errors.name}</div>:""}
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              value={signUpForm.values.email}
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
            />

            {signUpForm.touched.email && signUpForm.errors.email ? <div className="error">{signUpForm.errors.email}</div>:""}
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              value={signUpForm.values.password}
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
            />
             {signUpForm.touched.password && signUpForm.errors.password ? <div className="error">{signUpForm.errors.password}</div>:""}
            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              value={signUpForm.values.age}
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
            />
             {signUpForm.touched.age && signUpForm.errors.age ? <div className="error">{signUpForm.errors.age}</div>:""}
            <input
              type="tel"
              inputMode="numeric"
              className="form-control"
              placeholder="phone"
              name="phone"
              id="phone"
              value={signUpForm.values.phone}
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
            />
             {signUpForm.touched.phone && signUpForm.errors.phone ? <div className="error">{signUpForm.errors.phone}</div>:""}

           {signUpForm.dirty && signUpForm.isValid ?  <button type="submit" className="btn btn-main" >
              Create account
            </button>: <button type="submit" className="btn btn-main" disabled>
              Create account
            </button>}
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>

      <Toaster />
    </section>
  );
}
