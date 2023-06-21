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
      <section className="bg-[#C1224F] px-10 py-4 rounded-md min-h-[75vh] flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5">
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/update-profile")}
          >
            Update Profile
          </p>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/update-profile")}
          >
            View Profile
          </p>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/submitProject")}
          >
            Submit Project
          </p>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/idea-submission")}
          >
            Submit Idea
          </p>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={() => navigate("/specialization")}
          >
            Specialization
          </p>
        </div>
        <div>
          <p
            className="text-white text-sm cursor-pointer hover:text-gray-300 font-semibold"
            onClick={signOutOfApp}
          >
            Log Out
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProfileNav;
