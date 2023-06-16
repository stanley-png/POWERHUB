import React, { useEffect } from "react";
import googleIcon from "../assets/google-icon.png";
import { auth, gitProvider, provider } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

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
        navigate("/complete-details");
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
        navigate("/complete-details");
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
  return <div>Login</div>;
};

export default Login;
