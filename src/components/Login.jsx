import React, { useEffect } from "react";
import googleIcon from "../assets/google-icon.png";
import { auth, gitProvider, provider } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomePage from "./StaticPages/HomePage";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  // Google SignIn
  const googleSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            displayName: result.user.displayName,
            email: result.user.email,
          })
        );
      })
      .then(() => {
        navigate("/submitProject");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const githubSignUp = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(gitProvider)
      .then((result) => {
        dispatch(
          login({
            displayName: result.user.displayName,
            email: result.user.email,
          })
        );
      })
      .then(() => {
        navigate("/submitProject");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout);
      }
    });
  }, [dispatch]);
  return (
    <>
      {!user ? (
        <main className="h-full w-full pt-24 flex items-center py-16">
          <section className="mt-7 border border-[#C1224F] rounded-xl shadow-sm w-full max-w-xl mx-auto p-6 ">
            <h1 className="block text-xl md:text-3xl font-bold text-[#C1224F] text-center">
              Sign in
            </h1>

            <section className="border-lg md:w-full mx-auto mt-5 sm:p-5 md:p-5 lg:p-6 index-50  space-y-10 rounded-md">
              <span
                onClick={googleSignIn}
                className="flex items-center justify-center mx-auto font-semibold w-full  text-[#C1224F] border border-[#C1224F] hover:bg-[#13ABC4] hover:text-white rounded-full cursor-pointer mt-4"
              >
                <img src={googleIcon} className="w-12" alt="" />
                <h3 className=" ">Continue with Google </h3>
              </span>
              <span
                onClick={githubSignUp}
                className="flex items-center justify-center mx-auto font-semibold w-full  text-[#C1224F] border border-[#C1224F] hover:bg-[#13ABC4] hover:text-white rounded-full cursor-pointer mt-4 py-3"
              >
                <GitHubIcon className="w-24 h-24 text-black" />
                <h3 className="ml-3 ">Continue with Github </h3>
              </span>
            </section>
          </section>
        </main>
      ) : (
        <HomePage />
      )}
    </>
  );
};

export default Login;
