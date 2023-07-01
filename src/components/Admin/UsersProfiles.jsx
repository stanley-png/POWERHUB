import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";

const UsersProfiles = () => {
  const user = useSelector(selectUser);

  const [profiles, setProfiles] = useState([]);
  const [totalProfiles, setTotalProfiles] = useState(0);

  useEffect(() => {
    // Fetch all submitted profiles from Firestore
    const fetchAssignments = async () => {
      try {
        const assignmentsSnapshot = await db
          .collectionGroup("usersProfiles")
          .get();
        const assignmentsData = assignmentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfiles(assignmentsData);
      } catch (error) {
        console.log("Error fetching profiles", error);
      }
    };

    const fetchTotalProfiles = async () => {
      try {
        const submissionsSnapshot = await db
          .collectionGroup("usersProfiles")
          .get();
        const totalProfiles = submissionsSnapshot.size;
        setTotalProfiles(totalProfiles);
      } catch (error) {
        console.log("Error fetching profiles", error);
      }
    };
    fetchAssignments();
    fetchTotalProfiles();
  }, []);

  const authorizedEmails = [
    "evansnyamai98@gmail.com",
    "evansifysoftwares@gmail.com",
    "mungastan@gmail.com",
  ];

  return (
    <main>
      {!user || !authorizedEmails ? (
        <div className="flex justify-center flex-col text-center min-h-[55vh]">
          <h1 className="text-2xl font-semibold">
            You are not authorized to access this page.
          </h1>
        </div>
      ) : (
        <>
          <AdminNav />
          <section className="md:mt-16 px-4 sm:px-6 md:mx-8 lg:pl-72">
            <section className="max-w-7xl min-h-[70vh]">
              <header>
                <h1 className="text-2xl font-bold">Students Profiles</h1>
                <div className="flex justify-between my-5">
                  <p className="m-1 font-semibold">{totalProfiles} Profile </p>
                </div>
              </header>
              <section className="mt-5 flex flex-wrap gap-10">
                {profiles &&
                  profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="rounded-md border border-[#13ABC4] p-3 shadow-md text-center flex flex-col items-center"
                    >
                      <img
                        src={profile.imageUrl}
                        alt=""
                        className="rounded-full ring-2 ring-[#C1224F] h-24 w-24"
                      />
                      <h1 className="font-bold text-sm mt-3">
                        {profile.fName}
                      </h1>
                      <p className="text">{profile.country}</p>
                      <p className="text-sm">{profile.cohort}</p>
                      <p className="text-sm">{profile.employment}</p>
                      <Link to={`/student/${profile.slug}`}>
                        <button className="mt-3 py-1 px-4 bg-[#13ABC4] text-white hover:bg-[#C1224F] rounded-md text-sm">
                          View Profile
                        </button>
                      </Link>
                      {/* <button className="mt-3 py-1 px-4 bg-[#C1224F]  text-white hover:bg-[#13ABC4] rounded-md text-sm">
                        Delete
                      </button> */}
                    </div>
                  ))}
              </section>
            </section>
          </section>
        </>
      )}
    </main>
  );
};

export default UsersProfiles;
