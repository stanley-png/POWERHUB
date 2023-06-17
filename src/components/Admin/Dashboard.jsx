import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import AdminNav from "./AdminNav";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const [totalCoursesCount, setTotalCoursesCount] = useState(0);
  const [publishedBlogsCount, setPublishedBlogsCount] = useState(0);
  const [signedUpUsersCount, setSignedUpUsersCount] = useState(0);

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

    const fetchPublishedBlogsCount = async () => {
      try {
        const blogsSnapshot = await db.collection("specialization").get();
        const publishedBlogsCount = blogsSnapshot.size;
        setPublishedBlogsCount(publishedBlogsCount);
      } catch (error) {
        console.log("Error fetching published blogs count", error);
      }
    };

    const fetchSignedUpUsersCount = async () => {
      // Fetch the number of signed up users
      try {
        const usersSnapshot = await db.collection("usersDetails").get();
        const signedUpUsersCount = usersSnapshot.size;
        setSignedUpUsersCount(signedUpUsersCount);
      } catch (error) {
        console.log("Error fetching signed up users count", error);
      }
    };

    fetchTotalCoursesCount();
    fetchPublishedBlogsCount();
    fetchSignedUpUsersCount();
  }, []);
  return (
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
          {/* <p class="mt-2 text-lg text-gray-800 ">
            This are the statistics of all the activities in plp BootCamp. Make
            sure you perform every activity with control and on time.
          </p> */}
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
                  750+
                </h3>
              </div>

              <dl class="flex justify-center items-center divide-x divide-gray-200 ">
                <dt class="pr-3 flex items-center gap-1">
                  <span class="inline-block text-sm">{signedUpUsersCount}</span>
                  <span class="block text-sm text-gray-500">Profiles</span>
                </dt>
              </dl>
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
