import { useContext, useState } from "react";
import FormField from "../../../Components/Forms/FormField";
import { shoperyIcons } from "../../../data/data";
import "../../../styles/content-pages.css";
import "./Setting.css";
import { AuthContext } from "../../../context/Context";

function Setting() {
  const EyeIcon = shoperyIcons.quickView;
  const DeleteIcon = shoperyIcons.delete;

  const { user, setUser, handleLogout } = useContext(AuthContext);

  // منطق تغيير بيانات المستخدم

  const [formDataUser, setFormDataUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });
  const [errorServerSaveChange, setErrorServerSaveChange] = useState();
  const [lodingSaveChange, setLodingSaveChange] = useState(false);
  function handleFromDataUser(input, value) {
    setFormDataUser({ ...formDataUser, [input]: value });
  }
  // console.log(user)

  async function handleSubmitSaveChange(e) {
    e.preventDefault();
    // console.log(formDataUser);
    setLodingSaveChange(true);
    setErrorServerSaveChange("");
    try {
      let response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formDataUser }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      console.log(updatedUser);
    } catch (errorServerSaveChange) {
      setErrorServerSaveChange(errorServerSaveChange.message);
    } finally {
      setLodingSaveChange(false);
    }
  }

  // منطق تغيير كلمة المرور

  const [passwordChangeDataForm, setpasswordChangeDataForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [wrongPassword, setWrongPassword] = useState(false);
  const [PasswordMismatchError, setPasswordMismatchError] = useState(false);
  const [errorServerChangePassword, setErrorServerChangePassword] =
    useState("");
  const [lodingChangePassword, setLodingChangePassword] = useState(false);
  const [passwordChangeSubmitted, setPasswordChangeSubmitted] = useState(false);

  const currentPasswordError =
    passwordChangeSubmitted && !passwordChangeDataForm.oldPassword
      ? "Enter your current password."
      : wrongPassword
        ? "Your current password is incorrect."
        : "";
  const newPasswordError =
    passwordChangeSubmitted && !passwordChangeDataForm.newPassword
      ? "Enter a new password."
      : "";
  const confirmPasswordError =
    passwordChangeSubmitted && !passwordChangeDataForm.confirmPassword
      ? "Confirm your new password."
      : PasswordMismatchError
        ? "The new password and confirmation do not match."
        : "";

  function handlepasswordChangeDataForm(input, value) {
    setpasswordChangeDataForm((previousData) => ({
      ...previousData,
      [input]: value,
    }));

    if (input === "oldPassword") setWrongPassword(false);
    if (input === "newPassword" || input === "confirmPassword") {
      setPasswordMismatchError(false);
    }
    setErrorServerChangePassword("");
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    if (lodingChangePassword) return;

    setPasswordChangeSubmitted(true);
    setWrongPassword(false);
    setPasswordMismatchError(false);
    setErrorServerChangePassword("");
    if (
      !passwordChangeDataForm.oldPassword ||
      !passwordChangeDataForm.newPassword ||
      !passwordChangeDataForm.confirmPassword
    ) {
      return;
    }
    if (passwordChangeDataForm.oldPassword !== user.password) {
      setWrongPassword(true);
    } else if (
      passwordChangeDataForm.newPassword !==
      passwordChangeDataForm.confirmPassword
    ) {
      setPasswordMismatchError(true);
    } else {
      setLodingChangePassword(true);
      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: passwordChangeDataForm.newPassword,
          }),
        });
        if (!response.ok) {
          throw new Error("Unable to change your password. Please try again.");
        }
        const updatedPasswordUser = await response.json();
        console.log(updatedPasswordUser);
        setUser(updatedPasswordUser);
      } catch (error) {
        setErrorServerChangePassword(
          error instanceof TypeError
            ? "Unable to connect to the server. Please try again."
            : error.message,
        );
      } finally {
        setLodingChangePassword(false);
      }
    }
  }

  // منطق حذف الحساب
  let [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  let [errorServerDeleteAccount, setErrorServerDeleteAccount] = useState("");
  let [lodingDeleteAccount, setLodingDeleteAccount] = useState(false);

  async function handleDeleteAccount() {
    if (lodingDeleteAccount) return;

    setErrorServerDeleteAccount("");
    setLodingDeleteAccount(true);
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Unable to delete your account. Please try again.");
      }
      handleLogout();
    } catch (error) {
      setErrorServerDeleteAccount(
        error instanceof TypeError
          ? "Unable to connect to the server. Please try again."
          : error.message,
      );
    } finally {
      setLodingDeleteAccount(false);
    }
  }

  return (
    <div className="account-settings shopery-content-page d-flex flex-column gap-4">
      {/*  بيانات المستخدم */}
      
      <section
        className="account-settings__panel"
        aria-labelledby="account-settings-title"
      >
        <header className="account-settings__header">
          Format
          <h1 id="account-settings-title">Account Settings</h1>
        </header>
        <div className="account-settings__body">
          <form
            className="row g-4 align-items-center"
            onSubmit={handleSubmitSaveChange}
          >
            <div className="col-12 col-md-7">
              <div
                className="d-flex flex-column gap-3"
                role="group"
                aria-label="Account details"
              >
                <FormField
                  id="settings-first-name"
                  label="First name"
                  type="text"
                  value={formDataUser.firstName}
                  placeholder="First name"
                  autoComplete="given-name"
                  onChange={(e) =>
                    handleFromDataUser("firstName", e.target.value)
                  }
                />
                <FormField
                  id="settings-last-name"
                  label="Last Name"
                  type="text"
                  value={formDataUser.lastName}
                  placeholder="Last name"
                  autoComplete="family-name"
                  onChange={(e) =>
                    handleFromDataUser("lastName", e.target.value)
                  }
                />
                <FormField
                  id="settings-email"
                  label="Email"
                  type="email"
                  value={formDataUser.email}
                  placeholder="Email"
                  autoComplete="email"
                  onChange={(e) => handleFromDataUser("email", e.target.value)}
                />
                <FormField
                  id="settings-phone"
                  label="Phone Number"
                  type="tel"
                  value={formDataUser.phone}
                  placeholder="Phone number"
                  autoComplete="tel"
                  onChange={(e) => handleFromDataUser("phone", e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="account-settings__button shopery-button mt-4"
                disabled={lodingSaveChange}
              >
                {lodingSaveChange ? "Saving..." : "Save Changes"}
              </button>
              {errorServerSaveChange && (
                <p className="text-danger" role="alert">
                  {errorServerSaveChange}
                </p>
              )}
            </div>
            <div className="col-12 col-md-5">
              <div className="d-flex flex-column align-items-center gap-3">
                <img
                  className="account-settings__avatar rounded-circle"
                  src="/images/male-portrait-curly-hair.jpg"
                  alt="Profile photo preview"
                  width="224"
                  height="224"
                />
                <button
                  type="button"
                  className="account-settings__button account-settings__image-button shopery-button shopery-button--outline"
                >
                  Choose Image
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* تغيير كلمة المرور */}
      <section
        className="account-settings__panel"
        aria-labelledby="change-password-title"
      >
        <header className="account-settings__header">
          <h2 id="change-password-title">Change Password</h2>
        </header>
        <div className="account-settings__body">
          <form
            className="row g-3"
            role="group"
            id="change-password-group"
            noValidate
            onSubmit={(e) => {
              handleChangePassword(e);
            }}
          >
            <div className="col-12">
              <div className="account-settings__password position-relative">
                <FormField
                  id="settings-current-password"
                  label="Current Password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  disabled={lodingChangePassword}
                  className={
                    currentPasswordError
                      ? "account-settings__field--invalid"
                      : ""
                  }
                  onChange={(e) =>
                    handlepasswordChangeDataForm("oldPassword", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="account-settings__eye d-inline-flex align-items-center justify-content-center"
                  aria-label="Show current password"
                >
                  <EyeIcon aria-hidden="true" />
                </button>
              </div>
              {currentPasswordError && (
                <p className="account-settings__error mt-2 mb-0">
                  {currentPasswordError}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6">
              <div className="account-settings__password position-relative">
                <FormField
                  id="settings-new-password"
                  label="New Password"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  required
                  disabled={lodingChangePassword}
                  className={
                    newPasswordError ? "account-settings__field--invalid" : ""
                  }
                  onChange={(e) =>
                    handlepasswordChangeDataForm("newPassword", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="account-settings__eye d-inline-flex align-items-center justify-content-center"
                  aria-label="Show new password"
                >
                  <EyeIcon aria-hidden="true" />
                </button>
              </div>
              {newPasswordError && (
                <p className="account-settings__error mt-2 mb-0">
                  {newPasswordError}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6">
              <div className="account-settings__password position-relative">
                <FormField
                  id="settings-confirm-password"
                  label="Confirm Password"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  required
                  disabled={lodingChangePassword}
                  className={
                    confirmPasswordError
                      ? "account-settings__field--invalid"
                      : ""
                  }
                  onChange={(e) =>
                    handlepasswordChangeDataForm(
                      "confirmPassword",
                      e.target.value,
                    )
                  }
                />
                <button
                  type="button"
                  className="account-settings__eye d-inline-flex align-items-center justify-content-center"
                  aria-label="Show confirm password"
                >
                  <EyeIcon aria-hidden="true" />
                </button>
              </div>
              {confirmPasswordError && (
                <p className="account-settings__error mt-2 mb-0">
                  {confirmPasswordError}
                </p>
              )}
            </div>
          </form>
          <button
            type="submit"
            form="change-password-group"
            className="account-settings__button shopery-button mt-4"
            disabled={lodingChangePassword}
          >
            {lodingChangePassword ? "Changing password..." : "Change Password"}
          </button>
          {errorServerChangePassword && (
            <p className="account-settings__error mt-3 mb-0">
              {errorServerChangePassword}
            </p>
          )}
        </div>
      </section>
      {/* حذف الحساب */}
      <section
        className="account-settings__delete"
        aria-labelledby="delete-account-title"
      >
        <h2 id="delete-account-title">Delete Account</h2>
        <p className="mt-3">Would you like to delete your account?</p>
        <p className="mt-2">
          Deleting your account will remove all the order details associated
          with it.
        </p>
        <button
          type="button"
          className="account-settings__delete-button mt-3"
          disabled={lodingDeleteAccount}
          onClick={() => {
            setErrorServerDeleteAccount("");
            setShowDeleteConfirmation(true);
          }}
        >
          I want to delete my account
        </button>
        {showDeleteConfirmation && <div className="modal-backdrop show" />}
        <div
          className={`account-settings__confirmation-modal modal
             ${showDeleteConfirmation ? "d-block" : "d-none"}`}
          onClick={(e) => {
            if (e.target === e.currentTarget && !lodingDeleteAccount) {
              setShowDeleteConfirmation(false);
              setErrorServerDeleteAccount("");
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="account-settings__delete-confirmation modal-content">
              <div className="d-flex align-items-start gap-3">
                <div className="account-settings__delete-confirmation-icon d-flex align-items-center justify-content-center flex-shrink-0">
                  <DeleteIcon />
                </div>
                <div>
                  <h3>Delete your account?</h3>
                  <p className="account-settings__delete-confirmation-description mt-2">
                    Are you sure you want to delete your account? You will no
                    longer be able to sign in with this account.
                  </p>
                </div>
              </div>
              <p className="account-settings__delete-confirmation-warning mt-3 mb-0">
                This action cannot be undone.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-sm-end gap-3 mt-4">
                <button
                  type="button"
                  className="account-settings__confirmation-cancel"
                  disabled={lodingDeleteAccount}
                  onClick={() => {
                    setErrorServerDeleteAccount("");
                    setShowDeleteConfirmation(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="account-settings__delete-button account-settings__delete-button--confirm"
                  disabled={lodingDeleteAccount}
                  onClick={handleDeleteAccount}
                >
                  {lodingDeleteAccount
                    ? "Deleting..."
                    : "Yes, delete my account"}
                </button>
              </div>
              {errorServerDeleteAccount && (
                <p className="account-settings__error mt-3 mb-0">
                  {errorServerDeleteAccount}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Setting;
