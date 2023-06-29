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
            <section className="max-w-7xl min-h-[70vh]"></section>
          </section>
        </>
      )}
    </main>
  );
};

export default UsersProfiles;
