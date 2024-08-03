import React, { useEffect, useState } from "react";
import "./css/signin.css";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Background from "../components/OtherBG";
import { NavLink, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    minLength: false,
    uppercase: false,
    specialChar: false,
  });
  const storedPassword = localStorage.getItem("password");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setconfirmPasswordVisible] = useState(false);
  const [enterpasswordVisible, enterconfirmPasswordVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleSubmit = () => {
    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      !passwordValid.minLength ||
      !passwordValid.uppercase ||
      !passwordValid.specialChar
    ) {
      setError("Password does not meet the criteria");
      return;
    }

    localStorage.setItem("password", formData.password);

    toast.success("Password set successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // Directly navigate to "/pincode" screen after setting password
    navigate("/pincode");
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    // Check password criteria
    const minLengthValid = newPassword.length >= 8;
    const uppercaseValid = /[A-Z]/.test(newPassword);
    const specialCharValid = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      newPassword
    );

    setPasswordValid({
      minLength: minLengthValid,
      uppercase: uppercaseValid,
      specialChar: specialCharValid,
    });
  };

  const { minLength, uppercase, specialChar } = passwordValid;

  const handleSignIn = () => {
    if (formData.password === storedPassword) {
      // Proceed to next screen
      // Example: navigate to "/nextscreen"
      navigate("/pincode");
    } else {
      setError("Incorrect password");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleconfirmPasswordVisibility = () => {
    setconfirmPasswordVisible(!confirmpasswordVisible);
  };

  const ToggleenterPassword = () => {
    enterconfirmPasswordVisible(!enterpasswordVisible);
  };

  return (
    <div>
      <Background />
      <div className="container-fluid sign_in">
        <div className="container-xxl">
          <div className="row justify-content-center h-100vh align-items-center">
            <div className="col-12 col-lg-6 col-md-8  mt-4 mx-auto border-0">
              <div className="login-frm">
                {!storedPassword ? (
                  <>
                    <h3 className="col-12 text-center guideTitle">
                      {" "}
                      Set Password
                    </h3>
                    <div className="mt-4">
                      <div className="form-group">
                        <label htmlFor="name">Password</label>

                        <div className="input-group mb-3">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            className={`form-control borderRnone ${
                              minLength && uppercase && specialChar
                                ? "text-success"
                                : "text-danger"
                            }`}
                            onChange={handleChange}
                            value={formData.password}
                            name="password"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              id="basic-addon2"
                              onClick={togglePasswordVisibility}
                            >
                              <i
                                className={
                                  passwordVisible ? "bx bx-show" : "bx bx-hide"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>

                        {!minLength && (
                          <p className="text-danger">
                            Password must be at least 8 characters long
                          </p>
                        )}
                        {!uppercase && (
                          <p className="text-danger">
                            Password must contain at least one uppercase letter
                          </p>
                        )}
                        {!specialChar && (
                          <p className="text-danger">
                            Password must contain at least one special character
                          </p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="name">Confirm Password</label>
                        <div className="input-group mb-3">
                          <input
                            type={confirmpasswordVisible ? "text" : "password"}
                            className="form-control borderRnone"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            autoComplete="false"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              id="basic-addon2"
                              onClick={toggleconfirmPasswordVisibility}
                            >
                              <i
                                className={
                                  confirmpasswordVisible
                                    ? "bx bx-show"
                                    : "bx bx-hide"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      {error && <p className="text-danger">{error}</p>}
                      <div className="form-group col-12 d-flex justify-content-center">
                        <button
                          className="custbtn-primary mt-3"
                          onClick={handleSubmit}
                          disabled={!minLength || !uppercase || !specialChar}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="col-12 text-center guideTitle">
                      {" "}
                      Enter Password
                    </h3>
                    <div className="mt-4">
                      <div className="form-group">
                        <label htmlFor="name">Enter Password</label>
                        <div className="input-group mb-3">
                          <input
                            type={enterpasswordVisible ? "text" : "password"}
                            className="form-control borderRnone"
                            onChange={handleChange}
                            value={formData.password}
                            name="password"
                          />
                          <div className="input-group-append">
                            <span
                              className="input-group-text"
                              id="basic-addon2"
                              onClick={ToggleenterPassword}
                            >
                              <i
                                className={
                                  enterpasswordVisible
                                    ? "bx bx-show"
                                    : "bx bx-hide"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      {error && <p className="text-danger">{error}</p>}
                      <div className="form-group col-12 d-flex justify-content-center">
                        <button
                          className="custbtn-primary mt-2"
                          onClick={handleSignIn}
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
