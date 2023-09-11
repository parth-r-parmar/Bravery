import * as Yup from "yup";
import {Field, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useUser} from "../../contexts/UserProvider";
import {login} from "../../interaction/apiIntegration";
import {setUserData} from "../../util/util";

const Login = () => {
  let navigate = useNavigate();
  const {dispatch} = useUser();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });

  return (
    <div className='loginSection'>
      <div className='loginContainer p-5 bg-white shadow-lg rounded'>
        <div className='mb-5'>
          <div className='text-2xl'>Login</div>
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
              navigate("/user/dashboard");
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
            <form onSubmit={handleSubmit}>
              <label className='block mt-2'>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Email
                </span>
                <Field
                  id='email'
                  type='email'
                  name='email'
                  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
                />
                {errors.email && touched.email ? (
                  <div className='text-red-500'>{errors.email}</div>
                ) : null}
              </label>

              <label className='block mt-2'>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Password
                </span>
                <Field
                  name='password'
                  id='password'
                  type='password'
                  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
                />
                {errors.password && touched.password ? (
                  <div className='text-red-500'>{errors.password}</div>
                ) : null}
              </label>

              <button
                type='submit'
                className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                disabled={isSubmitting}
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
