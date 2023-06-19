import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Cohort1 from "../AlumniData/Cohort1";

const Alumni = () => {
  return (
    <main>
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 class="text-2xl font-bold md:text-4xl md:leading-tight ">
            Our Alumni
          </h2>
          <p class="mt-1 text-gray-600 ">Creative people</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="flex flex-col rounded-xl p-4 md:p-6 bg-white border border-gray-200 ">
            <div class="flex items-center gap-x-4">
              <img
                class="rounded-full w-20 h-20"
                src="https://powerlearnproject.org/_next/image?url=%2Fassets%2FdevelopSkills.jpeg&w=1080&q=75"
                alt="Image Description"
              />
              <div class="grow">
                <h3 class="font-medium text-gray-800 dark:text-gray-200">
                  Dedan Okware
                </h3>
                <p class="text-xs uppercase text-gray-500">Data Scientist</p>
              </div>
            </div>

            <p class="mt-3 text-gray-500">
              I am an ambitious workaholic, but apart from that, pretty simple
              person.
            </p>

            <div class="mt-3 space-x-1">
              <a
                class="inline-flex justify-center items-center text-gray-500 border border-gray-200 w-8 h-8 rounded-md hover:text-gray-800 hover:shadow-sm "
                href="#"
              >
                <svg
                  class="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a>
              <a
                class="inline-flex justify-center items-center text-gray-500 border border-gray-200 w-8 h-8 rounded-md hover:text-gray-800 hover:shadow-sm"
                href="#"
              >
                <svg
                  class="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
          </div>

          <div class="flex flex-col rounded-xl p-4 md:p-6 bg-white border border-gray-200 ">
            <div class="flex items-center gap-x-4">
              <img
                class="rounded-full w-20 h-20"
                src="https://powerlearnproject.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d5479260.png&w=640&q=75"
                alt="Image Description"
              />
              <div class="grow">
                <h3 class="font-medium text-gray-800 ">Univer Omoro</h3>
                <p class="text-xs uppercase text-gray-500">UI/UX Designer</p>
              </div>
            </div>

            <p class="mt-3 text-gray-500">
              I am an ambitious workaholic, but apart from that, pretty simple
              person.
            </p>

            <div class="mt-3 space-x-1">
              <a
                class="inline-flex justify-center items-center text-gray-500 border border-gray-200 w-8 h-8 rounded-md hover:text-gray-800 hover:shadow-sm"
                href="#"
              >
                <svg
                  class="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </a>
              <a
                class="inline-flex justify-center items-center text-gray-500 border border-gray-200 w-8 h-8 rounded-md hover:text-gray-800 hover:shadow-sm "
                href="#"
              >
                <svg
                  class="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
          </div>

          <a
            class="col-span-full lg:col-span-1 group flex flex-col justify-center text-center rounded-xl p-4 md:p-6 border border-dashed border-gray-200 hover:shadow-sm"
            href="#"
          >
            <h3 class="text-lg text-gray-800">Join PLP Academy</h3>
            <div>
              <span class="inline-flex items-center gap-x-2 text-[#C1224F] group-hover:text-[#13ABC4]">
                Join the next cohort
                <svg
                  class="w-2.5 h-2.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </div>
          </a>
        </div>

        <div className="mt-12 grid gap-5 w-full sm:inline-flex justify-center">
          {/* <p className="inline-flex justify-center items-center gap-x-3 text-center bg-[#C1224F] hover:bg-[#a5153e] border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 cursor-pointer">
            Cohort 1 Alumni
          </p>
          <p className="inline-flex justify-center items-center gap-x-3 text-center bg-[#C1224F] hover:bg-[#a5153e] border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 cursor-pointer">
            Cohort 2 Alumni
          </p>
          <p className="inline-flex justify-center items-center gap-x-3 text-center bg-[#C1224F] hover:bg-[#a5153e] border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 cursor-pointer">
            Cohort 3 Alumni
          </p> */}

          <section>
            <button
              type="button"
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#C1224F] text-white hover:bg-[#13ABC4] transition-all text-sm "
              data-hs-overlay="#hs-static-backdrop-modal"
            >
              Cohort 1 Alumni
            </button>

            <div
              id="hs-static-backdrop-modal"
              className="hs-overlay hidden w-full h-full fixed top-0 left-0 overflow-x-hidden overflow-y-auto [--overlay-backdrop:static] bg-[#13ABC4] bg-opacity-20 backdrop-blur-xs"
              data-hs-overlay-keyboard="false"
            >
              <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 md:mt-24 opacity-100 ease-out transition-all sm:max-w-4xl w-full m-3 mx-auto ">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                  <div className="flex justify-between items-center py-3 px-4 border-b">
                    <h3 className="font-bold text-gray-800">Cohort 1 Alumni</h3>
                    <button
                      type="button"
                      className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 transition-all text-sm"
                      data-hs-overlay="#hs-static-backdrop-modal"
                    >
                      <CloseOutlinedIcon />
                    </button>
                  </div>
                  <div className="p-4 overflow-y-auto">
                    <Cohort1 />
                  </div>

                  <div className="flex justify-between items-center gap-x-2 py-3 px-4 border-t">
                    <button
                      type="button"
                      className="hs-dropdown-toggle py-3 px-6 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm "
                      data-hs-overlay="#hs-static-backdrop-modal"
                    >
                      Cancel
                    </button>
                    {/* <a className="py-3 px-6 inline-flex justify-center items-center gap-2 cursor-pointer rounded-md border border-transparent font-semibold bg-[#C1224F] text-white hover:bg-[#13ABC4] transition-all text-sm">
                      Save
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Alumni;
