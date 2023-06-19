import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../utils/firebase";

const ProfileNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const signOutOfApp = () => {
    dispatch(logout);
    auth.signOut();
    window.location.reload(false);

    if (user) {
      auth.signOut();
    }
    navigate("/");
  };
  return (
    <main>
      <section className="bg-[#C1224F] px-5 py-4 rounded-md min-h-[75vh] flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5">
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/")}
          >
            Update Profile
          </p>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/")}
          >
            View Profile
          </p>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/")}
          >
            Submit Project
          </p>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/")}
          >
            Submit Idea
          </p>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/")}
          >
            Specialization
          </p>
        </div>
        <div>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/")}
          >
            Log Out
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProfileNav;
