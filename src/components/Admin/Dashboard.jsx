import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import AdminNav from "./AdminNav";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const [totalCoursesCount, setTotalCoursesCount] = useState(0);
  const [publishedBlogsCount, setPublishedBlogsCount] = useState(0);
  const [ideasCount, setIdeasCount] = useState(0);
  const [pitchCount, setPitchCount] = useState(0);
  const [profilesCount, setProfilesCount] = useState(0);

  useEffect(() => {
    const fetchTotalCoursesCount = async () => {
      try {
        const blogsSnapshot = await db.collection("projects").get();
        const totalCoursesCount = blogsSnapshot.size;
        setTotalCoursesCount(totalCoursesCount);
      } catch (error) {
        console.log("Error fetching published blogs count", error);
      }
    };

    const fetchTotalIdeasCount = async () => {
      try {
        const ideasSnapshot = await db.collection("projectIdeas").get();
        const totalIdeasCount = ideasSnapshot.size;
        setIdeasCount(totalIdeasCount);
      } catch (error) {
        console.log("Error fetching published ideas count", error);
      }
    };

    const fetchPublishedBlogsCount = async () => {
      try {
        const blogsSnapshot = await db.collection("specialization").get();
        const publishedBlogsCount = blogsSnapshot.size;
        setPublishedBlogsCount(publishedBlogsCount);
      } catch (error) {
        console.log("Error fetching published blogs count", error);
      }
    };

    const fetchPitchDecksForIncubationCount = async () => {
      try {
        const pitchSnapshot = await db.collection("projectsPitches").get();
        const allPitchDeckCount = pitchSnapshot.size;
        setPitchCount(allPitchDeckCount);
      } catch (error) {
        console.log("Error fetching pitch deck count", error);
      }
    };
    const fetchLearnersProfiles = async () => {
      try {
        const profilesSnapshot = await db.collection("usersProfiles").get();
        const profilesCount = profilesSnapshot.size;
        setProfilesCount(profilesCount);
      } catch (error) {
        console.log("Error fetching profiles count", error);
      }
    };

    fetchTotalCoursesCount();
    fetchPublishedBlogsCount();
    fetchTotalIdeasCount();
    fetchPitchDecksForIncubationCount();
    fetchLearnersProfiles();
  }, []);

  const authorizedEmails = [
    "evansnyamai98@gmail.com",
    "evansifysoftwares@gmail.com",
    "mungastan@gmail.com",
  ];
  return (
    <>
      {!authorizedEmails.includes(user.email) ? (
        <div className="flex justify-center flex-col text-center min-h-[55vh]">
          <h1 className="text-2xl font-semibold">
            You are not authorized to access this page.
          </h1>
        </div>
      ) : (
        <main>
          <AdminNav />
          <div class=" md:mt-16 px-4 sm:px-6 md:mx-8 lg:pl-72">
            <header className="max-w-7xl">
              <p class="mb-2 text-sm font-semibold text-[#C1224F]">
                Admin Dashboard & Statistics
              </p>
              <h1 class="block text-2xl font-bold text-gray-800 sm:text-3xl mt-4">
                Hello, {user.displayName}
              </h1>
            </header>

            <div class="max-w-7xl md:px-1  sm:px-6 mt-10">
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
                  <div class="inline-flex justify-center items-center">
                    <span class="w-2 h-2 inline-block bg-gray-500 rounded-full mr-2"></span>
                    <span class="text-xs font-semibold uppercase text-gray-600">
                      Project Submissions
                    </span>
                  </div>

                  <div class="text-center">
                    <h3 class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 ">
                      {totalCoursesCount}
                    </h3>
                  </div>
                </div>

                <div class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
                  <div class="inline-flex justify-center items-center">
                    <span class="w-2 h-2 inline-block bg-green-500 rounded-full mr-2"></span>
                    <span class="text-xs font-semibold uppercase text-gray-600">
                      Project Ideas
                    </span>
                  </div>

                  <div class="text-center">
                    <h3 class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 ">
                      {ideasCount}
                    </h3>
                  </div>
                </div>

                <div class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
                  <div class="inline-flex justify-center items-center">
                    <span class="w-2 h-2 inline-block bg-[#C1224F] rounded-full mr-2"></span>
                    <span class="text-xs font-semibold uppercase text-gray-600">
                      Submitted Specializations
                    </span>
                  </div>

                  <div class="text-center">
                    <h3 class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 ">
                      {publishedBlogsCount}
                    </h3>
                  </div>
                </div>
                <div class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
                  <div class="inline-flex justify-center items-center">
                    <span class="w-2 h-2 inline-block bg-[#C1224F] rounded-full mr-2"></span>
                    <span class="text-xs font-semibold uppercase text-gray-600">
                      Pitch Decks
                    </span>
                  </div>

                  <div class="text-center">
                    <h3 class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 ">
                      {pitchCount}
                    </h3>
                  </div>
                </div>
                <div class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
                  <div class="inline-flex justify-center items-center">
                    <span class="w-2 h-2 inline-block bg-[#C1224F] rounded-full mr-2"></span>
                    <span class="text-xs font-semibold uppercase text-gray-600">
                      Profiles
                    </span>
                  </div>

                  <div class="text-center">
                    <h3 class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 ">
                      {profilesCount}
                    </h3>
                  </div>
                </div>
                <div class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
                  <div class="inline-flex justify-center items-center">
                    <span class="w-2 h-2 inline-block bg-[#C1224F] rounded-full mr-2"></span>
                    <span class="text-xs font-semibold uppercase text-gray-600">
                      Canva Reports
                    </span>
                  </div>

                  <div>
                    <a
                      href="https://canva.com"
                      target="_blank"
                      className="flex items-center justify-center gap-x-3.5 py-2 px-2.5 font-semibold text-sm text-white rounded-md bg-[#C1224F] hover:bg-[#13ABC4] cursor-pointer"
                    >
                      Post Graduation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Dashboard;
