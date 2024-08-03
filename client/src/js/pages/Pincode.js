import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Background from "../components/OtherBG";

function Pincode() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [storedPin, setStoredPin] = useState(localStorage.getItem("pincode"));
  const navigate = useNavigate();
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
    if (!/^\d{6}$/.test(pin)) {
      setError("Pin should be exactly 6 digits.");
      return;
    }
    if (pin !== confirmPin) {
      setError("Pin codes do not match. Please try again.");
      return;
    }
    localStorage.setItem("pincode", pin);
    navigate("/masternode");
  };

  const handleEnter = () => {
    if (!/^\d{6}$/.test(pin)) {
      setError("Pin should be exactly 6 digits.");
      return;
    }
    if (pin !== storedPin) {
      setError("Incorrect pin code. Please try again.");
      return;
    }
    navigate("/messaging");
  };

  const handleMainPinChange = (e) => {
    const input = e.target.value;
    // Check if the input contains only numbers
    if (/^\d*$/.test(input)) {
        setPin(input);
    }
  };

  const handleConfirmPinChange = (e) => {
    const input = e.target.value;
    // Check if the input contains only numbers
    if (/^\d*$/.test(input)) {
      setConfirmPin(input);
    }
  };

  const handleEnterPinChange = (e) => {
    const input = e.target.value;
    // Check if the input contains only numbers
    if (/^\d*$/.test(input)) {
        setPin(input);
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

  if (!storedPin) {
    return (
      <div>
        <Background />
        <div className="container-fluid sign_in" style={{ zIndex: "500" }}>
          <div className="container-xxl">
            <div className="row justify-content-center h-100vh align-items-center">
              <div className="col-12 col-lg-6 col-md-8  mt-4 mx-auto border-0">
                <div className="login-frm">
                  <h3 className="col-12 text-center guideTitle">Set Pin</h3>
                  <div className="mt-4">
                    <div className="form-group">
                      <label for="name">Pin</label>
                      <div className="input-group mb-3">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className="form-control borderRnone"
                          value={pin}
                          onChange={handleMainPinChange}
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
                    </div>
                    <div className="form-group">
                      <label for="name">Pin Confirm *</label>
                      <div className="input-group mb-3">
                        <input
                          type={confirmpasswordVisible ? "text" : "password"}
                          className="form-control borderRnone"
                          value={confirmPin}
                          onChange={handleConfirmPinChange}
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
                        className="custbtn-primary mt-2"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Background />
        <div className="container-fluid sign_in" style={{ zIndex: "500" }}>
          <div className="container-xxl">
            <div className="row justify-content-center h-100vh align-items-center">
              <div className="col-12 col-lg-6 col-md-8  mt-4 mx-auto border-0">
                <div className="login-frm">
                  <h3 className="col-12 text-center guideTitle">Enter Pin</h3>
                  <div className="mt-4">
                    <div className="form-group">
                      <label for="name">Pin *</label>
                      <div className="input-group mb-3">
                        <input
                          type={enterpasswordVisible ? "text" : "password"}
                          className="form-control borderRnone"
                          value={pin}
                          onChange={handleEnterPinChange}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text" id="basic-addon2" onClick={ToggleenterPassword}>
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
                        onClick={handleEnter}
                      >
                        Enter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pincode;
