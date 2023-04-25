import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  ExclamationTriangleFill,
  EyeFill,
  EyeSlashFill,
} from "react-bootstrap-icons";

import { loginUrl } from "../../utils/apiUrl";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username Required"),
  password: Yup.string().required("Password Required"),
});

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const [visible, setVisibility] = useState(false);

  const togglePassword = () => {
    setVisibility(!visible);
  };
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ username, password }) => {
      return axios.post(loginUrl, {
        username: username,
        password: password,
      });
    },
  });

  if (loginMutation.isSuccess) {
    localStorage.setItem("userAuth", JSON.stringify(loginMutation.data.data));
    navigate("/");
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        loginMutation.mutate(values);
      }}
    >
      <Form>
        <div className="formWrapper">
          <h2>Welcome back...</h2>

          {loginMutation.isError && (
            <div className="errorMessage">
              <span>
                {" "}
                <ExclamationTriangleFill color="red" />
              </span>
              {loginMutation.error.response.data.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              type="text"
              placeholder="Enter Username"
              className="inputWrapper"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type={visible ? "text" : "password"}
              placeholder="Enter Password"
              className="inputWrapper"
            />
            <span type="button" onClick={togglePassword} className="eye">
              {visible ? <EyeSlashFill /> : <EyeFill />}
            </span>
            <ErrorMessage
              name="password"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default Login;
