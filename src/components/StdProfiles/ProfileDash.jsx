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
      .collection("usersProfiles")
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

          <section className="w-full ml-0 mt-5">
            {userProfileDetails &&
              userProfileDetails.map((userData) => {
                return (
                  <>
                    <article className="flex items-center">
                      <img
                        className="rounded-full w-28 h-28"
                        src={userData.imageUrl}
                        alt=""
                      />

                      <div className="ml-10">
                        <h1 className="text-md md:text-2xl font-bold">
                          {user.displayName}
                        </h1>
                        <p className="font-semibold text-xs">
                          {userData?.email}
                        </p>
                        <p className="font-semibold">
                          {userData?.currentActivity}
                        </p>
                      </div>
                    </article>
                    <article className="mt-6 w-4/6 p-2 border bg-[#e5fdf8] rounded-md shadow-sm">
                      <div className=" mb-4 mt-3 flex justify-between">
                        <div>
                          <h1 className="font-bold ">Country</h1>
                          <p> {userData?.country}</p>
                        </div>
                        <div>
                          <h1 className="font-bold">Cohort</h1>
                          <p> {userData?.cohort}</p>
                        </div>
                        <div>
                          <h1 className="font-bold">Phone Number</h1>
                          <p> {userData?.phoneNumber}</p>
                        </div>
                        <div>
                          <h1 className="font-bold">Employment</h1>
                          <p> {userData?.employment}</p>
                        </div>
                      </div>
                      <div className=" mb-4 mt-6 ">
                        <div>
                          <h1 className="font-bold">Career</h1>
                          <p> {userData?.career}</p>
                        </div>
                        <div>
                          <h1 className="font-bold">Gender</h1>
                          <p> {userData?.gender}</p>
                        </div>
                        <div>
                          <h1 className="font-bold">Website</h1>
                          <a
                            href={userData?.website}
                            target="_blank"
                            className="text-blue-400"
                          >
                            {" "}
                            {userData?.website}
                          </a>
                        </div>
                      </div>
                      <div className=" mb-4 mt-3">
                        <h1 className="font-bold text-2xl mb-3">About</h1>
                        <p> {userData?.bio}</p>
                      </div>
                    </article>
                  </>
                );
              })}
          </section>
        </section>
      </section>
    </main>
  );
};

export default ProfileDash;
