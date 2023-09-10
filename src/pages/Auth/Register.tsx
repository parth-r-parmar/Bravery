import * as Yup from "yup";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Field, Formik} from "formik";
import {Form} from "react-bootstrap";
import {toast} from "react-toastify";
import {register} from "../../interaction/apiIntegration";
import {setUserData} from "../../util/util";
import {useUser} from "../../contexts/UserProvider";

const Register = () => {
  let navigate = useNavigate();
  const {dispatch} = useUser();
  const [selectedImage, setSelectedImage] = useState("");

  const registerSchema = Yup.object().shape({
    avatar: Yup.mixed()
      .nullable()
      .required("Required")
      .test(
        "fileSize",
        "File is too large",
        (value: any) => !value || (value && value.size <= 1024 * 1024),
      )
      .test(
        "fileType",
        "Invalid file type. Supported file types: .jpg , .jpeg, .png",
        (value: any) =>
          !value || (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)),
      ),
    name: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    dateOfBirth: Yup.date().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .max(10, "10 digit required.")
      .min(8, "10 digit required."),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), ""], "Passwords must match"),
  });

  return (
    <div className='loginSection'>
      <div className='loginContainer p-5 bg-white shadow-lg rounded'>
        <div className='mb-5'>
          <div className='text-2xl'>Register</div>
        </div>
        <Formik
          initialValues={{
            name: "",
            gender: "",
            email: "",
            dateOfBirth: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            avatar: "",
          }}
          validationSchema={registerSchema}
          onSubmit={async (values) => {
            // same shape as initial values
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("gender", values.gender);
            formData.append("email", values.email);
            formData.append("dateOfBirth", values.dateOfBirth);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("password", values.password);
            formData.append("avatar", values.avatar);

            const data = await register(formData);
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
          {({errors, touched, handleSubmit, isSubmitting, setFieldValue}) => (
            <Form
              onSubmit={handleSubmit}
              className='sm:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2'
            >
              <div className='control-group flex justify-center'>
                <div className='profile-pic-div'>
                  <img
                    src={`${selectedImage || require("../../Assets/imgs/User.jpg")}`}
                    id='photo'
                    alt='avatar'
                  />
                  <input
                    accept='image/*'
                    type='file'
                    name='avatar'
                    id='avatar'
                    onChange={(event: any) => {
                      const choosedFile = event.currentTarget.files[0];
                      if (choosedFile) {
                        const reader: any = new FileReader();
                        reader.addEventListener("load", function () {
                          setSelectedImage(reader.result);
                        });
                        reader.readAsDataURL(choosedFile);
                      }
                      setFieldValue("avatar", event.currentTarget.files[0]);
                    }}
                  />
                  <label htmlFor='avatar'>Choose Photo</label>
                </div>
                {errors.avatar && touched.avatar ? (
                  <div className='text-red-500'>{errors.avatar}</div>
                ) : null}
              </div>

              <div>
                <label className='block'>
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Name
                  </span>
                  <Field
                    name='name'
                    id='name'
                    className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
                  />
                  {errors.name && touched.name ? (
                    <div className='text-red-500'>{errors.name}</div>
                  ) : null}
                </label>

                <div role='group' aria-labelledby='Gender'>
                  <div id='gender' className='form-group'>
                    Gender
                  </div>
                  <label className='me-5'>
                    <Field type='radio' name='gender' value='Male' className='me-1' />
                    Male
                  </label>
                  <label>
                    <Field type='radio' name='gender' value='Female' className='me-1' />
                    Female
                  </label>
                  {errors.gender && touched.gender ? (
                    <div className='text-red-500'>{errors.gender}</div>
                  ) : null}
                </div>

                <label className='block'>
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Date Of Birth
                  </span>
                  <Field
                    name='dateOfBirth'
                    id='dateOfBirth'
                    type='date'
                    className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
                  />
                  {errors.dateOfBirth && touched.dateOfBirth ? (
                    <div className='text-red-500'>{errors.dateOfBirth}</div>
                  ) : null}
                </label>
              </div>

              <label className='block'>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Phone Number
                </span>
                <Field
                  name='phoneNumber'
                  id='phoneNumber'
                  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className='text-red-500'>{errors.phoneNumber}</div>
                ) : null}
              </label>

              <label className='block'>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Email
                </span>
                <Field
                  name='email'
                  id='email'
                  type='email'
                  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
                />
                {errors.email && touched.email ? (
                  <div className='text-red-500'>{errors.email}</div>
                ) : null}
              </label>

              <label className='block'>
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

              <label className='block'>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Confirm Password
                </span>
                <Field
                  name='confirmPassword'
                  id='confirmPassword'
                  type='password'
                  className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className='text-red-500'>{errors.confirmPassword}</div>
                ) : null}
              </label>

              <button
                type='submit'
                className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 col-span-2'
                disabled={isSubmitting}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
