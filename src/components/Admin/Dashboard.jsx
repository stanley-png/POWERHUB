import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import AdminNav from "./AdminNav";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const [totalCoursesCount, setTotalCoursesCount] = useState(0);
  const [totalAdvancedCoursesCount, setTotalAdvancedCoursesCount] = useState(0);
  const [publishedBlogsCount, setPublishedBlogsCount] = useState(0);
  const [publishedBlogsCountPreviousWeek, setPublishedBlogsCountPreviousWeek] =
    useState(0);
  const [signedUpUsersCount, setSignedUpUsersCount] = useState(0);

  useEffect(() => {
    const fetchTotalCoursesCount = async () => {
      try {
        const blogsSnapshot = await db.collection("courses").get();
        const totalCoursesCount = blogsSnapshot.size;
        setTotalCoursesCount(totalCoursesCount);
      } catch (error) {
        console.log("Error fetching published blogs count", error);
      }
    };

    const fetchAdvancedTotalCoursesCount = async () => {
      try {
        const blogsSnapshot = await db
          .collection("courses")
          .where("categoryName", "==", "Advanced Courses")
          .get();
        const totalAdvancedCoursesCount = blogsSnapshot.size;
        setTotalAdvancedCoursesCount(totalAdvancedCoursesCount);
      } catch (error) {
        console.log("Error fetching courses", error);
      }
    };

    const fetchPublishedBlogsCount = async () => {
      try {
        const blogsSnapshot = await db.collection("blogArticles").get();
        const publishedBlogsCount = blogsSnapshot.size;
        setPublishedBlogsCount(publishedBlogsCount);
      } catch (error) {
        console.log("Error fetching published blogs count", error);
      }
    };

    const fetchPublishedBlogsCountPreviousWeek = async () => {
      try {
        const currentDate = new Date();
        const previousWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        );
        const blogsSnapshot = await db
          .collection("blogArticles")
          .where(
            "timestamp",
            ">=",
            firebase.firestore.Timestamp.fromDate(previousWeek)
          )
          .get();
        const publishedBlogsCountPreviousWeek = blogsSnapshot.size;
        setPublishedBlogsCountPreviousWeek(publishedBlogsCountPreviousWeek);
      } catch (error) {
        console.log(
          "Error fetching published blogs count from previous week",
          error
        );
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

    fetchAdvancedTotalCoursesCount();
    fetchTotalCoursesCount();
    fetchPublishedBlogsCount();
    fetchPublishedBlogsCountPreviousWeek();
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
          <p class="mt-2 text-lg text-gray-800 ">
            This are the statistics of all the activities in plp BootCamp. Make
            sure you perform every activity with control and on time.
          </p>
        </header>

        <div class="max-w-7xl md:px-1  sm:px-6 mt-10">
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
              <div class="inline-flex justify-center items-center">
                <span class="w-2 h-2 inline-block bg-gray-500 rounded-full mr-2"></span>
                <span class="text-xs font-semibold uppercase text-gray-600">
                  courses
                </span>
              </div>

              <div class="text-center">
                <h3 class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 ">
                  {totalCoursesCount}
                </h3>
              </div>

              <dl class="flex justify-center items-center divide-x divide-gray-200">
                {/* <dt class="pr-3">
              <span class="text-green-600">
                <svg
                  class="inline-block w-4 h-4 self-center"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                  />
                </svg>
                <span class="inline-block text-sm">4</span>
              </span>
              <span class="block text-sm text-gray-500">Basic</span>
            </dt> */}
                <dd class="flex items-center gap-1 text-left pl-3">
                  <span class="text-sm font-semibold text-gray-800 ">
                    {totalAdvancedCoursesCount}
                  </span>
                  <span class="block text-sm text-gray-500">Advanced</span>
                </dd>
              </dl>
            </div>

            <div class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
              <div class="inline-flex justify-center items-center">
                <span class="w-2 h-2 inline-block bg-green-500 rounded-full mr-2"></span>
                <span class="text-xs font-semibold uppercase text-gray-600">
                  Successful Learners
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
                {/* <dd class="text-left pl-3">
              <span class="text-sm font-semibold text-gray-800">
                7
              </span>
              <span class="block text-sm text-gray-500">last week</span>
            </dd> */}
              </dl>
            </div>

            <div class="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl">
              <div class="inline-flex justify-center items-center">
                <span class="w-2 h-2 inline-block bg-[#C1224F] rounded-full mr-2"></span>
                <span class="text-xs font-semibold uppercase text-gray-600">
                  Published Articles
                </span>
              </div>

              <div class="text-center">
                <h3 class="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 ">
                  {publishedBlogsCount}
                </h3>
              </div>

              <dl class="flex justify-center items-center divide-x divide-gray-200">
                <dd class="text-left flex gap-1 items-center">
                  <span class="text-sm font-semibold text-gray-800">
                    {publishedBlogsCountPreviousWeek}
                  </span>
                  <span class="block text-sm text-gray-500">last week</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
