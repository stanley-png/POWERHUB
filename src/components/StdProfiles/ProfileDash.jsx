import React, { useEffect, useState } from "react";
import ProfileNav from "./ProfileNav";
import CreateProfile from "./CreateProfile";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import EditProfile from "./EditProfile";

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
                      <div className="rounded-full ring-2 ring-[#C1224F]">
                        <img
                          className="rounded-full w-28 h-28 "
                          src={userData.imageUrl}
                          alt=""
                        />
                      </div>

                      <div className="ml-10">
                        <h1 className="text-md md:text-2xl font-bold">
                          {userData.fName}
                        </h1>
                        <p className="font-semibold text-xs">
                          {userData?.email}
                        </p>
                        <p className="font-semibold">
                          {userData?.currentActivity}
                        </p>
                      </div>
                    </article>
                    <article className="mt-6 w-4/6 p-4 border bg-[#e5fdf8] rounded-md shadow-sm">
                      <div className=" mb-4 mt-3 flex justify-between">
                        <div>
                          <h1 className="font-bold ">Country</h1>
                          <p className="text-sm text-center">
                            {" "}
                            {userData?.country}
                          </p>
                        </div>
                        <div>
                          <h1 className="font-bold">Cohort</h1>
                          <p className="text-sm text-center">
                            {" "}
                            {userData?.cohort}
                          </p>
                        </div>
                        <div>
                          <h1 className="font-bold">Phone Number</h1>
                          <p className="text-sm text-center">
                            {" "}
                            {userData?.phoneNumber}
                          </p>
                        </div>
                        <div>
                          <h1 className="font-bold">Employment</h1>
                          <p className="text-sm text-center">
                            {" "}
                            {userData?.employment}
                          </p>
                        </div>
                      </div>
                      <div className=" mb-4 mt-6 ">
                        <div className="mb-2">
                          <h1 className="font-bold">Career</h1>
                          <p className="text-sm"> {userData?.career}</p>
                        </div>
                        <div className="mb-2">
                          <h1 className="font-bold">Gender</h1>
                          <p className="text-sm"> {userData?.gender}</p>
                        </div>
                        <div className="mb-2">
                          <h1 className="font-bold">Website</h1>
                          <a
                            href={userData?.website}
                            target="_blank"
                            className="text-blue-400 text-sm"
                          >
                            {" "}
                            {userData?.website}
                          </a>
                        </div>
                      </div>
                      <div className=" mb-4 mt-3">
                        <h1 className="font-bold text-2xl mb-3">About</h1>
                        <p className="text-sm"> {userData?.bio}</p>
                      </div>
                      <EditProfile
                        id={userData?.id}
                        editCurrentActivity={userData?.currentActivity}
                        editFName={userData?.fName}
                        editPhoneNumber={userData.phoneNumber}
                        editGender={userData.gender}
                        editBio={userData.bio}
                        editCountry={userData.country}
                        editCareer={userData.career}
                        editEmployment={userData.employment}
                        editWebsite={userData.website}
                        editEmail={userData.email}
                        editCohort={userData.cohort}
                        // editProfileImage={userData.cohort}
                        editImagePreview={userData.imageUrl}
                      />
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
