import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import { useAppContext } from "../context/AppContext.jsx";

import SuccessModal from "../components/SuccessModal.jsx";
import InputModal from "../components/InputModal.jsx";

import CvsuLogo from "../assets/cvsu-logo.png";
import BacoorCampus from "../assets/bacoor-campus.png";
import HidePasswordTertiary from "../assets/hide-password-tertiary.svg";
import HidePasswordPrimary from "../assets/hide-password-primary.svg";
import ShowPasswordTertiary from "../assets/show-password-tertiary.svg";
import ShowPasswordPrimary from "../assets/show-password-primary.svg";
import ArrowRightTertiary from "../assets/arrow-right-tertiary.svg";
import ArrowRightPrimary from "../assets/arrow-right-primary.svg";

AuthPage.propTypes = {
  setUserId: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default function AuthPage({ setUserId, setIsLoggedIn }) {
  const { navigate, api } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCredentialsValid, setIsCredentialsValid] = useState(true);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    <>
      Sign in credentials
      <br />
      doesn&apos;t match anyone in
      <br />
      our system.
    </>,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIcon, setModalIcon] = useState("");

  function testEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
  }

  async function registerAccount() {
    if (!testEmail()) {
      setIsCredentialsValid(false);
      setModalMessage(
        <>
          Invalid email address.
          <br />
          Please enter a valid email.
        </>,
      );

      return;
    } else if (password !== confirmPassword) {
      setIsCredentialsValid(false);
      setModalMessage(
        <>
          The passwords do not match.
          <br />
          Please try again.
        </>,
      );

      return;
    }

    try {
      const res = await api.post("/auth/register-student-account", {
        email,
        password,
      });
      setIsModalOpen(true);
      setModalMessage("Your account has been successfully registered.");
      setModalIcon("Checkmark");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      console.log({ status: res.status, message: res.data.message });
    } catch (err) {
      setIsCredentialsValid(false);
      setModalMessage(
        <>
          Email is already in use.
          <br />
          Please try a different one.
        </>,
      );

      console.error({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  }

  async function signIn() {
    if (!testEmail()) {
      setIsCredentialsValid(false);
      setModalMessage(
        <>
          Invalid email address.
          <br />
          Please enter a valid email.
        </>,
      );
      return;
    }

    try {
      const res = await api.post("/auth/sign-in", {
        email,
        password,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      setUserId(res.data.userId);

      setIsModalOpen(true);
      setModalMessage("You have successfully signed in!");
      setModalIcon("Checkmark");
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");

      console.log({ status: res.status, message: res.data.message });
    } catch (err) {
      setIsCredentialsValid(false);
      setModalMessage(
        <>
          Sign in credentials
          <br />
          doesn&apos;t match anyone in
          <br />
          our system.
        </>,
      );

      console.error({
        status: err.response.status,
        error: err.response.data.error,
      });
    }
  }

  useEffect(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, [isRegistering]);

  return (
    <div className="relative flex flex-row overflow-hidden font-montserrat">
      <AnimatePresence initial={false} mode="wait">
        {isModalOpen && (
          <SuccessModal
            handleClose={() => {
              setIsModalOpen(false);
              navigate("/admission");
            }}
            title={"Registration Successful!"}
            message={<>{modalMessage}</>}
            modalIcon={modalIcon}
          />
        )}
      </AnimatePresence>
      <div className="relative z-10 flex h-screen w-full flex-col p-4 q-w-5-12 md:p-0">
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-primary md:rounded-none">
          <div className="flex w-10/12 items-center justify-center gap-4 q-mb-10">
            <img className="q-h-16" src={CvsuLogo} />
            <h1 className="text-nowrap font-helvetica-compressed text-highlight q-text-4xl q-leading-8">
              CAVITE STATE UNIVERSITY
              <br />
              BACOOR CAMPUS
            </h1>
          </div>
          <div className="flex w-9/12 flex-col items-center q-gap-5">
            <h1 className="font-bold text-tertiary q-mb-6 q-text-2xl">
              {isRegistering ? "Register Account" : "Account Sign-in"}
            </h1>
            {/* login form */}
            <div className="relative flex w-full flex-col items-center q-gap-5">
              {/* modal */}
              <AnimatePresence initial={false} mode="wait">
                {!isCredentialsValid && <InputModal message={modalMessage} />}
              </AnimatePresence>
              {/* modal */}
              {!isRegistering && (
                <>
                  <div className="flex w-full flex-col">
                    <label className="mb-1 ml-1 font-bold text-tertiary q-text-sm">
                      Email Address / Student Number
                    </label>
                    <input
                      className={`w-full p-4 text-tertiary q-h-12 q-text-sm q-rounded-xl focus:bg-primary ${
                        isCredentialsValid
                          ? "bg-secondary"
                          : "border-2 border-red-600 bg-red-200 px-3.5"
                      }`}
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onClick={() => setIsCredentialsValid(true)}
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <label className="mb-1 ml-1 font-bold text-tertiary q-text-sm">
                      Password
                    </label>
                    <div className="flex gap-1">
                      <input
                        className={`w-full rounded-r p-4 text-tertiary q-h-12 q-text-sm q-rounded-l-xl focus:bg-primary ${
                          isCredentialsValid
                            ? "bg-secondary"
                            : "border-2 border-red-600 bg-red-200 px-3.5"
                        }`}
                        type={isPasswordShown ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onClick={() => setIsCredentialsValid(true)}
                      />
                      <button
                        className="group rounded-l bg-secondary px-5 pt-0.5 q-rounded-r-xl hover:bg-highlight"
                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                      >
                        <img
                          className="q-w-5 group-hover:hidden"
                          src={
                            isPasswordShown
                              ? ShowPasswordTertiary
                              : HidePasswordTertiary
                          }
                        />
                        <img
                          className="hidden q-w-5 group-hover:block"
                          src={
                            isPasswordShown
                              ? ShowPasswordPrimary
                              : HidePasswordPrimary
                          }
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
              {isRegistering && (
                <>
                  <div className="flex w-full flex-col">
                    <label className="mb-1 ml-1 font-bold text-tertiary q-text-sm">
                      Email Address
                    </label>
                    <input
                      className={`w-full p-4 text-tertiary q-h-12 q-text-sm q-rounded-xl focus:bg-primary ${
                        isCredentialsValid
                          ? "bg-secondary"
                          : "border-2 border-red-600 bg-red-200 px-3.5"
                      }`}
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onClick={() => setIsCredentialsValid(true)}
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <label className="mb-1 ml-1 font-bold text-tertiary q-text-sm">
                      Password
                    </label>
                    <div className="flex gap-1">
                      <input
                        className={`w-full rounded-r p-4 text-tertiary q-h-12 q-text-sm q-rounded-l-xl focus:bg-primary ${
                          isCredentialsValid
                            ? "bg-secondary"
                            : "border-2 border-red-600 bg-red-200 px-3.5"
                        }`}
                        type={isPasswordShown ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onClick={() => setIsCredentialsValid(true)}
                      />
                      <button
                        className="group rounded-l bg-secondary px-5 pt-0.5 q-rounded-r-xl hover:bg-highlight"
                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                      >
                        <img
                          className="q-w-5 group-hover:hidden"
                          src={
                            isPasswordShown
                              ? ShowPasswordTertiary
                              : HidePasswordTertiary
                          }
                        />
                        <img
                          className="hidden q-w-5 group-hover:block"
                          src={
                            isPasswordShown
                              ? ShowPasswordPrimary
                              : HidePasswordPrimary
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex w-full flex-col">
                    <label className="mb-1 ml-1 font-bold text-tertiary q-text-sm">
                      Confirm Password
                    </label>
                    <div className="flex gap-1">
                      <input
                        className={`w-full rounded-r p-4 text-tertiary q-h-12 q-text-sm q-rounded-l-xl focus:bg-primary ${
                          isCredentialsValid
                            ? "bg-secondary"
                            : "border-2 border-red-600 bg-red-200 px-3.5"
                        }`}
                        type={isPasswordShown ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onClick={() => setIsCredentialsValid(true)}
                      />
                      <button
                        className="group rounded-l bg-secondary px-5 pt-0.5 q-rounded-r-xl hover:bg-highlight"
                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                      >
                        <img
                          className="q-w-5 group-hover:hidden"
                          src={
                            isPasswordShown
                              ? ShowPasswordTertiary
                              : HidePasswordTertiary
                          }
                        />
                        <img
                          className="hidden q-w-5 group-hover:block"
                          src={
                            isPasswordShown
                              ? ShowPasswordPrimary
                              : HidePasswordPrimary
                          }
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* login input */}
            {/* sign in button */}
            {!isRegistering && (
              <>
                <button
                  className="group mt-7 flex w-full items-center justify-center bg-highlight q-h-12 q-gap-5 q-rounded-xl hover:bg-highlight-light disabled:bg-secondary"
                  disabled={!(email.length > 0 && password.length > 0)}
                  onClick={signIn}
                >
                  <p className="font-bold text-primary q-text-sm group-disabled:text-tertiary">
                    Sign In
                  </p>
                  <img
                    className="group-disabled:hidden"
                    src={ArrowRightPrimary}
                  />
                  <img
                    className="hidden group-disabled:block"
                    src={ArrowRightTertiary}
                  />
                </button>
                {/* sign in button */}
                <div className="my-4 flex w-full flex-col items-center q-gap-12">
                  <button
                    className="text-tertiary q-text-sm hover:text-highlight"
                    onClick={() => setIsCredentialsValid(!isCredentialsValid)}
                  >
                    Forgot Password?
                  </button>
                  <div className="h-0.5 w-full rounded bg-tertiary"></div>
                  <p className="text-tertiary q-text-sm">
                    New Student of CvSU Bacoor?
                  </p>
                </div>
                <button
                  className="w-7/12 bg-highlight font-bold text-primary q-h-12 q-text-sm q-rounded-xl hover:bg-highlight-light"
                  onClick={() => setIsRegistering(true)}
                >
                  Register
                </button>
              </>
            )}
            {isRegistering && (
              <>
                <button
                  className="group mb-4 mt-7 flex w-full items-center justify-center bg-highlight q-h-12 q-gap-5 q-rounded-xl hover:bg-highlight-light disabled:bg-secondary"
                  disabled={!(email.length > 0 && password.length > 0)}
                  onClick={registerAccount}
                >
                  <p className="font-bold text-primary q-text-sm group-disabled:text-tertiary">
                    Register
                  </p>
                  <img
                    className="group-disabled:hidden"
                    src={ArrowRightPrimary}
                  />
                  <img
                    className="hidden group-disabled:block"
                    src={ArrowRightTertiary}
                  />
                </button>
                <div className="my-4 flex w-full flex-col items-center q-gap-12">
                  <div className="h-0.5 w-full rounded bg-tertiary"></div>
                  <p className="text-tertiary q-text-sm">
                    Already a Student of CvSU Bacoor?
                  </p>
                </div>
                <button
                  className="w-7/12 bg-highlight font-bold text-primary q-h-12 q-text-sm q-rounded-xl hover:bg-highlight-light"
                  onClick={() => setIsRegistering(false)}
                >
                  Sign In Instead
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="absolute z-0 flex h-screen w-screen items-end justify-end overflow-hidden md:static">
        <div className="absolute h-20 w-full bg-gradient-to-b from-transparent to-black opacity-90" />
        <div className="absolute z-10 h-full w-full bg-highlight opacity-20" />
        <img
          className="relative z-0 h-screen w-full object-cover"
          src={BacoorCampus}
        />
        <img
          className="absolute z-10 m-10 hidden w-36 md:block"
          src={CvsuLogo}
        />
      </div>
    </div>
  );
}
