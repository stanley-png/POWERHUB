import React from "react";
import ProfileNav from "./ProfileNav";

const ProfileDash = () => {
  return (
    // <div className="text-center mt-24">
    //   <h1 className="text-gray-400 font-extrabold text-5xl mb-10">
    //     In development
    //   </h1>
    //   <p>A Student will be able to update their profile here...</p>

    //   <h3 className="mt-10 text-[#13ABC4] font-semibold">
    //     This Feature will be released in the next few hours
    //   </h3>
    // </div>
    <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <section className="flex">
        <ProfileNav />
        <article></article>
      </section>
    </main>
  );
};

export default ProfileDash;
