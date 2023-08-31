import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { register } from "../../interaction/apiIntegration";
import { setUserData } from "../../util/util";
import { useUser } from "../../contexts/UserProvider";

const Register = () => {
  let navigate = useNavigate();
  const { dispatch } = useUser();
  const [selectedImage, setSelectedImage] = useState("");

  const registerSchema = Yup.object().shape({
    avatar: Yup.mixed()
      .nullable()
      .required("Required")
      .test(
        "fileSize",
        "File is too large",
        (value) => !value || (value && value.size <= 1024 * 1024)
      )
      .test(
        "fileType",
        "Invalid file type. Supported file types: .jpg , .jpeg, .png",
        (value) =>
          !value ||
          (value &&
            ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
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
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <div className="loginSection">
      <div className="loginContainer p-5 bg-white shadow-lg rounded">
        <div className="mb-5">
          <h1>Register</h1>
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
          {({ errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
            <Form onSubmit={handleSubmit} className="row">
              <div className="control-group d-flex justify-content-center col-lg-6 col-md-6 col-sm-12">
                <div className="profile-pic-div">
                  <img
                    src={`${
                      selectedImage || require("../../Assets/imgs/User.jpg")
                    }`}
                    id="photo"
                    alt="avatar"
                  />
                  <input
                    accept="image/*"
                    type="file"
                    name="avatar"
                    id="avatar"
                    file-input="files"
                    onChange={(event) => {
                      const choosedFile = event.currentTarget.files[0];
                      if (choosedFile) {
                        const reader = new FileReader();
                        reader.addEventListener("load", function () {
                          setSelectedImage(reader.result);
                        });
                        reader.readAsDataURL(choosedFile);
                      }
                      setFieldValue("avatar", event.currentTarget.files[0]);
                    }}
                  />
                  <label htmlFor="avatar">Choose Photo</label>
                </div>
                {errors.avatar && touched.avatar ? (
                  <div className="text-danger">{errors.avatar}</div>
                ) : null}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group mt-2">
                  <label htmlFor="name">Name</label>
                  <Field name="name" id="name" className="form-control" />
                  {errors.name && touched.name ? (
                    <div className="text-danger">{errors.name}</div>
                  ) : null}
                </div>

                <div role="group" aria-labelledby="Gender" className=" mt-2">
                  <div id="gender" className="form-group">
                    Gender
                  </div>
                  <label className="me-5">
                    <Field
                      type="radio"
                      name="gender"
                      value="Male"
                      className="me-1"
                    />
                    Male
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="gender"
                      value="Female"
                      className="me-1"
                    />
                    Female
                  </label>
                  {errors.gender && touched.gender ? (
                    <div className="text-danger">{errors.gender}</div>
                  ) : null}
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="dateOfBirth">Date Of Birth</label>
                  <Field
                    name="dateOfBirth"
                    id="dateOfBirth"
                    type="date"
                    className="form-control"
                  />
                  {errors.dateOfBirth && touched.dateOfBirth ? (
                    <div className="text-danger">{errors.dateOfBirth}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-group mt-2 col-lg-6 col-md-6 col-sm-12">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  name="phoneNumber"
                  id="phoneNumber"
                  className="form-control"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="text-danger">{errors.phoneNumber}</div>
                ) : null}
              </div>

              <div className="form-group mt-2 col-lg-6 col-md-6 col-sm-12">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  className="form-control"
                />
                {errors.email && touched.email ? (
                  <div className="text-danger">{errors.email}</div>
                ) : null}
              </div>

              <div className="form-group mt-2 col-lg-6 col-md-6 col-sm-12">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  id="password"
                  type="password"
                  className="form-control"
                />
                {errors.password && touched.password ? (
                  <div className="text-danger">{errors.password}</div>
                ) : null}
              </div>

              <div className="form-group mt-2 col-lg-6 col-md-6 col-sm-12">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  className="form-control"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="text-danger">{errors.confirmPassword}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-2"
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
