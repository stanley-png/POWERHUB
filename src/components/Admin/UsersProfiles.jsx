import React from "react";
import AdminNav from "./AdminNav";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const UsersProfiles = () => {
  const user = useSelector(selectUser);

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
              </header>
              <section className="mt-5 flex flex-wrap gap-10">
                <div className="rounded-md border border-gray-500 p-3 shadow-md">
                  <img src="" alt="" />
                  <h1 className="font-bold text-sm">Evans Mutuku</h1>
                  <p className="text-sm">Cohort 3</p>
                  <button className="mt-3 py-2 px-4 text-white">
                    View Profile
                  </button>
                </div>
              </section>
            </section>
          </section>
        </>
      )}
    </main>
  );
};

export default UsersProfiles;
