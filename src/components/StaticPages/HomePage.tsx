import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <main className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 md:mt-24 min-h-[65vh]">
      <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-8 xl:gap-20 md:items-center">
        <div className="mt-12 md:mt-0">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight">
            Showcase your project with{" "}
            <span className="bg-clip-text bg-gradient-to-tr from-[#13ABC4] to-[#C1224F] text-transparent">
              PowerHub
            </span>
          </h1>
          <p className="md:mt-10 text-lg text-gray-800 mt-10">
            Be part or the team that make a change in the tech market.
          </p>
          <p className="text-lg text-gray-800  mt-3 pr-3">
            Who are we? PowerHub is a platform for plp alumni, current learners
            and future learners to showcase their skills project that
            organizations and investors would be interested in, plans and brings
            investors from different institutions to invest in your project.
          </p>

          <div className="mt-7 grid gap-5 w-full sm:inline-flex">
            <p
              className="inline-flex justify-center items-center gap-x-3 text-center bg-[#C1224F] hover:bg-[#a5153e] border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 cursor-pointer"
              onClick={() => navigate("/submitProject")}
            >
              Submit Project
              <svg
                className="w-2.5 h-2.5"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </p>
            <p
              className="inline-flex justify-center items-center gap-x-3 text-center bg-[#C1224F] hover:bg-[#a5153e] border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 cursor-pointer"
              onClick={() => navigate("/idea-submission")}
            >
              Submit Idea
              <svg
                className="w-2.5 h-2.5"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </p>
            <p
              className="inline-flex justify-center items-center gap-x-3.5 text-sm text-[#C1224F] lg:text-base text-center border border-[#C1224F] hover:border-[#C1224F] shadow-sm font-medium rounded-md focus:outline-none transition py-3 px-5 hover:bg-[#C1224F] hover:text-white cursor-pointer"
              onClick={() => navigate("/contact-us")}
            >
              Contact Us
            </p>
          </div>
        </div>

        <div className="">
          <img
            className=" min-w-[500px] min-h-[400px] rounded-md"
            src="https://powerlearnproject.org/_next/image?url=%2Fassets%2Fnetwork.jpeg&w=1080&q=75"
            alt="Image Description"
          />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
