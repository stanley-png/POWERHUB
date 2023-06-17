import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <main class="">
      <div class=" min-h-[50vh] mx-auto h-full">
        <div class="text-center mt-28 px-4 sm:px-6 lg:px-8">
          <h1 class="block text-7xl font-bold text-[#C1224F]  sm:text-9xl ">
            Success
          </h1>
          <h1 class="block text-2xl font-bold text-white"></h1>
        </div>
        <div className="flex justify-center">
          {/* <button
            onClick={() => navigate("/hackathon-groups")}
            type="button"
            className="py-3 px-4 mt-20  rounded-md bg-[#C1224F] border border-transparent font-semibold text-white hover:text-white hover:bg-[#13ABC4] text-sm "
          >
            Join or View Hackathon Group's
          </button> */}
        </div>
      </div>
    </main>
  );
};

export default SuccessPage;
