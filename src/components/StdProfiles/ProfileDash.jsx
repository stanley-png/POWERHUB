import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import CreateProfile from "./CreateProfile";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";

const ProfileDash = () => {
  const user = useSelector(selectUser);
  const [userProfileDetails, setUserProfileDetails] = useState([]);
  const fetchUserProfileDetails = async () => {
    await db
      .collection("Users")
      .where("uid", "==", user?.uid)
      .onSnapshot((snapshot) => {
        setUserProfileDetails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  };
  useEffect(() => {
    fetchUserProfileDetails();
  }, []);
  return (
    <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <section className="flex gap-24">
        <ProfileNav />

        {/* <div className="text-center mt-24">
          <h1 className="text-gray-400 font-extrabold text-5xl mb-10">
            In development
          </h1>
          <p>A Student will be able to update their profile here...</p>

          <h3 className="mt-10 text-[#13ABC4] font-semibold">
            This Feature will be released in the next few hours
          </h3>
        </div> */}

        <section className="w-full ">
          <div className="w-full bg-white rounded-md border shadow-sm py-3 px-3 flex justify-between items-center">
            <h1 className="font-extrabold text-xl text-gray-500 ">
              My Profile
            </h1>
            <CreateProfile />
          </div>
          {userProfileDetails ? (
            <div className="text-xl font-extrabold text-gray-500  mt-10">
              No Profile Created
            </div>
          ) : (
            <section className="w-full ml-0 md:ml-20 bg-white">
              {userProfileDetails.map((userData) => {
                return (
                  <>
                    <article className="flex items-top">
                      <img
                        className="rounded-md w-52 h-52"
                        src={userData.profileImage}
                        alt=""
                      />

                      <div className="ml-12">
                        <h1 className="text-md md:text-2xl">
                          {user.displayName}
                        </h1>
                        <p className="font-semibold">
                          {userData?.workExperience}
                        </p>
                        <p className="text-purple-600 font-semibold mt-4 flex items-center">
                          #{userData?.tagName}
                        </p>
                      </div>
                    </article>
                    <article className="mt-16 w-4/6 p-2">
                      <h1>About</h1>
                      <div className="flex justify-between gap-28 mb-4 mt-3">
                        <div className="flex flex-col gap-6 mb-4">
                          <span className="font-semibold">User ID</span>
                          <span className="font-semibold">Name</span>
                          {/* <span className="font-semibold">Email</span> */}
                          <span className="font-semibold">Website</span>
                          <span className="font-semibold">Location</span>
                          <span className="font-semibold">Work</span>
                          <span className="font-semibold">Skills</span>
                          <span className="font-semibold">Bio</span>
                        </div>

                        <div className="flex flex-col gap-6 mb-4">
                          <p>{userData.uid}</p>
                          <p>{user.displayName}</p>
                          {/* <p>{userData.emailAddress}</p> */}
                          <a
                            href="https://melbite.com"
                            className="text-purple-500 underlined"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {userData.website}
                          </a>
                          <p>{userData.location}</p>
                          <p>{userData.workExperience}</p>
                          <p>{userData.skills}</p>
                          <p>{userData.biography}</p>
                        </div>
                      </div>
                    </article>
                  </>
                );
              })}
            </section>
          )}
        </section>
      </section>
    </main>
  );
};

export default ProfileDash;
