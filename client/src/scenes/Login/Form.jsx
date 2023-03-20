import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";


const registerSchema = yup.object().shape({
  firstName: yup.string().required("*required"),
  lastName: yup.string().required("*required"),
  email: yup.string().email("*invalid email").required("*required"),
  password: yup.string().required("*required"),
  address:yup.string().required("*required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("*invalid email").required("*required"),
  password: yup.string().required("*required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [isWrong,setWrong] = useState(false);
  const[message,setMessage] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
   useEffect(()=>{
     setTimeout(handleWrong,2000)
   },[isWrong])
  const handleWrong = ()=>[
    setWrong(false)
  ]
  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
   

    const savedUserResponse = await fetch(
      "http://localhost:3002/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3002/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn.mes)
    onSubmitProps.resetForm();
    if (loggedIn.mes === "Wrong password"||loggedIn.mes === "User Not Found") {
      setWrong(true)
      setMessage(loggedIn.mes)
  }else{
    dispatch(
      setLogin({
        user: loggedIn.user,
        token: loggedIn.token,
      })
    );
    navigate("/home");
  }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("yo")
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form typeof="submit" onSubmit={handleSubmit} className="form" >
          
            {isRegister && (
              <>
              <div className="input">
              <input  type="firstName"
              name="firstName"
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="First Name"
              />
              <p>{errors.firstName && touched.firstName && errors.firstName}</p>
              </div>
              <div className="input">
                <input type="lastName"
                placeholder="Last Name"
                name="lastName"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                />
                <p>{errors.lastName && touched.lastName && errors.lastName}</p>
              </div>
              
              <div className="input">
              <input type="address"
              placeholder="Address"
              name="address"
              value={values.address}
              onBlur={handleBlur}
              onChange={handleChange}
              />
              <p>{errors.address && touched.address && errors.address}</p>
              </div>
              </>
              
            )}
            <div className="input">
            <input
              placeholder="Email"
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           <p>{errors.email && touched.email && errors.email}</p>
            </div>
            <div className="input">
            <input
           placeholder="Password"
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           <p>{errors.password && touched.password && errors.password}</p>
            </div>
        <button className="sub-btn" type="submit" onSubmit={handleSubmit}>{isLogin?"Login":"Register"}</button>
        <div className="bottom" onClick={()=>{
          setPageType(isLogin?"register":"login")
          resetForm()}
        }>{isLogin?"Create a new account! Register here":"Already have an account! Login"}</div>
        {isWrong && <div className="alertMessage">
               <h3>{message}</h3>
      </div>}
        </form>
      )}
      
    </Formik>
  );
};

export default Form;
