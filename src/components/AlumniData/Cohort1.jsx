import React, { useState, useEffect } from "react";
import { db } from "../../utils/firebase";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Cohort1 = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesCollectionRef = db
        .collection("usersProfiles")
        .where("cohort", "==", "Cohort 3");
      const snapshot = await profilesCollectionRef.get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfiles(data);
    };

    fetchProfiles();
  }, []);

  return (
    <main>
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
                <div class="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12"
                    >
                      <div class="text-center">
                        <img
                          class="rounded-full w-24 h-24 mx-auto"
                          src={profile.imageUrl}
                          alt="Image Description"
                        />
                        <div class="mt-2 sm:mt-4">
                          <h3 class="font-medium text-gray-800">
                            {profile.fName}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div class="mt-12 flex justify-center">
                    <div class="border border-gray-200 p-1.5 pl-5 rounded-full">
                      <div class="flex items-center gap-x-3">
                        <span class="text-sm text-gray-500">
                          Want to learn with us?
                        </span>
                        <a
                          class="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-gray-300 text-sm text-[#C1224F] hover:text-[#13ABC4] font-medium hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 "
                          href="#"
                        >
                          Join Next Cohort
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
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-x-2 py-3 px-4 border-t">
                <button
                  type="button"
                  className="hs-dropdown-toggle py-3 px-6 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm "
                  data-hs-overlay="#hs-static-backdrop-modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cohort1;
