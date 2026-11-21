import { Link, useNavigate } from "react-router";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import FormField from "../../Components/Forms/FormField";
import { shoperyIcons } from "../../data/data";
import "../../styles/content-pages.css";
import "./Register.css";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Register() {
  const EyeIcon = shoperyIcons.quickView;

  let [registerData,setRegisterData] = useState(() => ({
    id:uuidv4(),
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
  }));

  const [errorServerRegister, seterrorServerRegister] = useState(false);
  const [loadingRegister, setloadingRegister] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isFieldsComplete, setisFieldsComplete] = useState(false);

  const [DuplicateAcount, setDuplicateAcount] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

 let navigate = useNavigate();

  const submitting = useRef(false);

  const nameMissing = isFieldsComplete && !registerData.name.trim();
  const emailMissing = isFieldsComplete && !registerData.email.trim();
  const passwordMissing = isFieldsComplete && !registerData.password;
  const confirmPasswordMissing = isFieldsComplete && !registerData.confirmPassword;
  const passwordMismatch = isFieldsComplete && registerData.confirmPassword &&
    registerData.password !== registerData.confirmPassword;
  const termsMissing = isFieldsComplete && !acceptedTerms;

  function handleChange(inputName,inputValue){
    if (inputName === "email") setDuplicateAcount(false);
    seterrorServerRegister(false);
    setRegisterSuccess(false);
    return setRegisterData((registterData)=> {
      return { ...registterData, [inputName]: inputValue };
    })
  }



  async function register({id,firstName,lastName,email,password}) {
    if (submitting.current) return;
    submitting.current = true;
    setloadingRegister(true);
    seterrorServerRegister(false);
    setDuplicateAcount(false);
    setRegisterSuccess(false);
    try {
      // Mock API only: the real backend must enforce uniqueness when saving.
      const usersResponse = await fetch("http://localhost:3000/users");
      if (!usersResponse.ok) throw new Error("Failed to check email");
      const users = await usersResponse.json();
      if (!Array.isArray(users)) throw new Error("Invalid users response");
      const emailExists = users.some((user) =>
        typeof user.email === "string" &&
        user.email.trim().toLowerCase() === email.toLowerCase()
      );
      if (emailExists) {
        setDuplicateAcount(true);
        return;
      }

      let response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });

      if (response.status === 409) {
        setDuplicateAcount(true);
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      setRegisterSuccess(true);
      setRegisterData({
        id: uuidv4(),
        firstName,
        lastName,
        email: "",
        password: "",
        confirmPassword: "",
      });
      setAcceptedTerms(false);
      setisFieldsComplete(false);
      navigate("/login")
    } catch {
      seterrorServerRegister(true);
    } finally {
      submitting.current = false;
      setloadingRegister(false);
    }
  }


  function handleSubmitRegster(e){
    e.preventDefault();
    if (submitting.current) return;
    setisFieldsComplete(true);
    setRegisterSuccess(false);
    seterrorServerRegister(false);
    if (!registerData.name.trim() || !registerData.email.trim() ||
        !registerData.password || !registerData.confirmPassword ||
        !acceptedTerms || registerData.password !== registerData.confirmPassword) return;

    register({ ...registerData,firstName : registerData.name.trim(),lastName: registerData.lastName.trim(), email: registerData.email.trim() });
  }

    return (
      <div>
        <main className="shopery-content-page register-page">
          <Breadcrumb
            items={[
              { label: "Account", to: "/login" },
              { label: "Create Account" },
            ]}
          />
          <section className="register-page__content container d-flex justify-content-center">
            <form
              className="register-panel w-100"
              onSubmit={(e) => {
                handleSubmitRegster(e);
              }}
            >
              <h1
                id="register-title"
                className="register-panel__title text-center"
              >
                Create Account
              </h1>
              <div className="register-panel__fields d-flex flex-column">
                <div className="register-panel__field register-panel__field--name position-relative">
                  <FormField
                    id="register-name"
                    label="Name"
                    hideLabel
                    type="text"
                    placeholder="First Name"
                    autoComplete="firstName"
                    value={registerData.name}
                    disabled={loadingRegister}
                    data-invalid={nameMissing}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />

                  {nameMissing && (
                    <p
                      id="register-name-error"
                      className="register-panel__error"
                    >
                      Please enter your First Name.
                    </p>
                  )}
                </div>
                <div className="register-panel__field register-panel__field--name position-relative">
                  <FormField
                    id="register-name"
                    label="Name"
                    hideLabel
                    type="text"
                    placeholder="Last Name"
                    autoComplete="lastName"
                    value={registerData.lastName}
                    disabled={loadingRegister}
                    data-invalid={nameMissing}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                  {nameMissing && (
                    <p
                      id="register-name-error"
                      className="register-panel__error"
                    >
                      Please enter your Last Name.
                    </p>
                  )}
                </div>
                <div className="register-panel__field position-relative">
                  <FormField
                    id="register-email"
                    label="Email"
                    hideLabel
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={registerData.email}
                    disabled={loadingRegister}
                    data-invalid={emailMissing || DuplicateAcount}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {(emailMissing || DuplicateAcount) && (
                    <p
                      id="register-email-error"
                      className="register-panel__error"
                    >
                      {emailMissing
                        ? "Please enter your email."
                        : "This email is already registered. Use another email or log in."}
                    </p>
                  )}
                </div>
                <div className="register-panel__field register-panel__field--password position-relative">
                  <FormField
                    id="register-password"
                    label="Password"
                    hideLabel
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={registerData.password}
                    disabled={loadingRegister}
                    data-invalid={passwordMissing}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <button
                    type="button"
                    className="register-panel__eye position-absolute d-inline-flex align-items-center justify-content-center p-0"
                  >
                    <EyeIcon />
                  </button>
                  {passwordMissing && (
                    <p
                      id="register-password-error"
                      className="register-panel__error"
                    >
                      Please enter your password.
                    </p>
                  )}
                </div>
                <div className="register-panel__field register-panel__field--password position-relative">
                  <FormField
                    id="register-confirm-password"
                    label="Confirm Password"
                    hideLabel
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    value={registerData.confirmPassword}
                    disabled={loadingRegister}
                    data-invalid={Boolean(
                      confirmPasswordMissing || passwordMismatch,
                    )}
                    onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="register-panel__eye position-absolute d-inline-flex align-items-center justify-content-center p-0"
                  >
                    <EyeIcon />
                  </button>
                  {(confirmPasswordMissing || passwordMismatch) && (
                    <p
                      id="register-confirm-password-error"
                      className="register-panel__error"
                    >
                      {confirmPasswordMissing
                        ? "Please confirm your password."
                        : "Passwords do not match."}
                    </p>
                  )}
                </div>
              </div>
              <div className="register-panel__options d-flex align-items-center justify-content-between flex-wrap">
                <div className="form-check mb-0">
                  <input
                    id="register-checkbox"
                    name="register-checkbox"
                    className="form-check-input mt-0"
                    type="checkbox"
                    checked={acceptedTerms}
                    disabled={loadingRegister}
                    data-invalid={termsMissing}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="register-checkbox"
                  >
                    Accept all terms &amp; Conditions
                  </label>
                  {termsMissing && (
                    <p
                      id="register-terms-error"
                      className="register-panel__error"
                    >
                      Please accept the terms and conditions.
                    </p>
                  )}
                </div>
              </div>
              {errorServerRegister && (
                <p className="register-panel__error mb-3">
                  We could not complete registration. Please check your
                  connection and try again.
                </p>
              )}
              {registerSuccess && (
                <p className="mb-3">
                  Account created successfully.{" "}
                  <Link to="/login">Log in to your account.</Link>
                </p>
              )}
              <button
                className="shopery-button register-panel__button w-100"
                type="submit"
                disabled={loadingRegister}
              >
                {loadingRegister ? "Creating account..." : "Create Account"}
              </button>
              <p className="register-panel__switch text-center">
                Already have account <Link to="/login">Login</Link>
              </p>
            </form>
          </section>
        </main>
      </div>
    );
}

export default Register;
