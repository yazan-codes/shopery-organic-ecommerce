import { Link } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import FormField from "../../Components/Forms/FormField";
import { shoperyIcons } from "../../data/data";
import "../../styles/content-pages.css";
import "./Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Context";

function Login() {
  const EyeIcon = shoperyIcons.quickView;

  let {
    login,
    fieldErrors,
    setFieldErrors,
    errorUser,
    setErrorUser,
    loadingUser,
  } = useContext(AuthContext);




  let [dataUser, setDataUser] = useState({ email: "", password: "" });



  function handleDataLogin(tipe,value){
    setErrorUser(false);
      return setDataUser({ ...dataUser, [tipe]: value });
  } 


 function handleSubmitLogin(e){
  e.preventDefault();
    if(!dataUser.email || !dataUser.password){
      console.log("please fill all fields");
      setFieldErrors(true)
      } else {
        login(dataUser);
      }
 }



  return (
    <div>
      <main className="shopery-content-page login-page">
        <Breadcrumb
          items={[{ label: "Account", to: "/login" }, { label: "Login" }]}
        />
        <section
          className="login-page__content container d-flex justify-content-center"
          aria-labelledby="login-title"
        >
          <form
            className="login-panel w-100"
            onSubmit={(e) => {
              handleSubmitLogin(e);
            }}
          >
            <h1 id="login-title" className="login-panel__title text-center">
              Sign In
            </h1>
            <div className="login-panel__fields d-flex flex-column">
              <div className="login-panel__field login-panel__field--email position-relative">
                <FormField
                  id="login-email"
                  label="Email"
                  hideLabel
                  type="email"
                  // required
                  placeholder="Email"
                  autoComplete="email"
                  aria-invalid={fieldErrors && !dataUser.email}
                  aria-describedby="login-email-error"
                  
                  onChange={
                    (e) => handleDataLogin("email", e.target.value)
                    // setDataUser({ ...dataUser, email: e.target.value })
                  }
                />
              </div>
              <p
                id="login-email-error"
                className="login-panel__email-error invalid-feedback"
                role="alert"
              >
                <span className="login-panel__email-required">
                  Please enter your email.
                </span>
              </p>
              <div className="login-panel__field login-panel__field--password position-relative">
                <FormField
                  id="login-password"
                  label="Password"
                  hideLabel
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  // Set aria-invalid from your validation state when it is ready.
                  aria-invalid={fieldErrors && !dataUser.password}
                  aria-describedby="login-password-error"
                  onChange={(e) => handleDataLogin("password", e.target.value)}
                />
                <button
                  type="button"
                  className="login-panel__eye position-absolute d-inline-flex align-items-center justify-content-center p-0"
                  aria-label="Show password"
                >
                  <EyeIcon aria-hidden="true" />
                </button>
              </div>
              <p
                id="login-password-error"
                className="login-panel__password-error invalid-feedback"
                role="alert"
              >
                <span className="login-panel__password-required">
                  Please enter your password.
                </span>
              </p>
            </div>
            <div className="login-panel__options d-flex align-items-center justify-content-between flex-wrap">
              <div className="form-check mb-0">
                <input
                  id="login-checkbox"
                  name="login-checkbox"
                  className="form-check-input mt-0"
                  type="checkbox"
                />
                <label className="form-check-label" htmlFor="login-checkbox">
                  Remember me
                </label>
              </div>
              <button className="login-panel__secondary p-0" type="button">
                Forget Password
              </button>
            </div>
            {/* User Error Message */}
            {errorUser && (
              <p role="alert">Incorrect email or password. Please try again.</p>
            )}
            {/* Submit Button */}
            <button
              className="shopery-button login-panel__button w-100"
              type="submit"
              disabled={loadingUser}
            >
              {loadingUser ? "Logging in..." : "Login"}
            </button>
            <p className="login-panel__switch text-center">
              Don’t have account? <Link to="/register">Register</Link>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Login;
