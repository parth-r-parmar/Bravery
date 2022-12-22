import React from "react";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Header from "../Components/Header/Header";
import {GlobalContext} from "../contexts/userContext";
import {login} from "../interaction/apiIntegration";
import {authRoutes} from "../NavRoutes/authRoutes";
import {setUserData} from "../util/util";
import * as Yup from "yup";
import {Field, Formik} from "formik";
import {Form} from "react-bootstrap";

const Login = () => {
  let navigate = useNavigate();
  const {dispatch} = useContext(GlobalContext);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });

  return (
    <>
      <Header routes={authRoutes} />
      <div
        style={{
          height: "90vh",
        }}
        className='d-flex flex-column align-items-center justify-content-center '
      >
        <div className='w-50 p-5 bg-white shadow-lg rounded'>
          <div className='mb-5'>
            <h1>Login</h1>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              // same shape as initial values

              const data = await login(values);
              if (data.code === 200) {
                dispatch({
                  type: "SET_USER",
                  payload: data.user,
                });
                setUserData(data.user);
                navigate("/dashboard");
              } else {
                toast.error(data.data.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  theme: "colored",
                  autoClose: 3000,
                });
              }
            }}
          >
            {({errors, touched, handleSubmit, isSubmitting}) => (
              <Form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <Field name='email' id='email' type='email' className='form-control' />
                  {errors.email && touched.email ? (
                    <div className='text-danger'>{errors.email}</div>
                  ) : null}
                </div>

                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <Field name='password' id='password' type='password' className='form-control' />
                  {errors.password && touched.password ? (
                    <div className='text-danger'>{errors.password}</div>
                  ) : null}
                </div>

                <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
