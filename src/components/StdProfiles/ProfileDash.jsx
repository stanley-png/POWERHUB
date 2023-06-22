import React from "react";
import ProfileNav from "./ProfileNav";
import CreateProfile from "./CreateProfile";

const ProfileDash = () => {
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
        </section>
      </section>
    </main>
  );
};

export default ProfileDash;
