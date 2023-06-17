import React, { useState } from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { db } from "../utils/firebase";

const Specialization = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cohort, setCohort] = useState("");
  const [hackCategory, setHackCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = () => {
    if (
      !fName.trim() ||
      !lName.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !country.trim() ||
      !cohort.trim() ||
      !hackCategory.trim()
    ) {
      setErrorMessage("Please fill in all the fields");
      return false;
    }

    // Additional validation logic can be added here

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateInputs();

    if (isValid) {
      // Check if user has already submitted
      db.collection("specialization")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            setErrorMessage("You have already registered for this event");
          } else {
            db.collection("specialization")
              .add({
                fName: fName,
                lName: lName,
                email: user.email,
                emailAddress: email,
                phoneNumber: phoneNumber,
                country: country,
                cohort: cohort,
                hackCategory: hackCategory,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                navigate("/submission-success");
              })
              .catch((error) => {
                console.log("Error submitting registration", error);
              });
          }
        })
        .catch((error) => {
          console.log("Error checking duplicate registration", error);
        });
    }
  };
  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <main>
          <div className="md:mt-24">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
              <div className="grid md:grid-cols-2  gap-12">
                <div>
                  <h1 className="mt-2 text-2xl font-bold text-gray-800 sm:text-4xl lg:text-4xl lg:leading-tight">
                    PowerHub Module Specialization
                  </h1>

                  <p className="mt-3 md:text-lg text-gray-800 "></p>

                  <div className="mt-6">
                    <h2 className="text-lg mb-4">Dear Learners,</h2>
                    <h2 className=" text-gray-800 ">
                      We hope this message finds you well and that you are
                      enjoying your learning journey with us. We greatly value
                      your creativity, innovation, and dedication to expanding
                      your knowledge and skills. Kindly submit your projects or
                      ideas for us to support you Thankyou
                    </h2>
                  </div>
                  <div className="mt-6">
                    <p className="mb-3 text-sm">
                      If You have not completed your project but have an idea,
                      kindly submit it here instead.
                    </p>
                    <button
                      onClick={() => navigate("/idea-submission")}
                      type="button"
                      className="py-3 px-4  mt-2 rounded-md bg-[#C1224F] border border-transparent font-semibold text-white hover:text-white hover:bg-[#13ABC4] text-sm "
                    >
                      Submit Idea Instead
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col border border-gray-300 rounded-xl p-4 sm:p-6 lg:p-10 ">
                    <h2 className="text-xl font-semibold text-gray-800 ">
                      Module Specialization Form.
                    </h2>

                    <form>
                      <div className="mt-6 grid gap-4 lg:gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label className="block text-sm text-gray-700 font-medium ">
                              Full Name
                            </label>
                            <input
                              required
                              value={fName}
                              onChange={(e) => setFName(e.target.value)}
                              type="text"
                              className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm  border border-1"
                            />
                            {errorMessage.fName && (
                              <p className="text-xs ml-1 text-red-500">
                                {errorMessage.fName}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm text-gray-700 font-medium ">
                              Last Name
                            </label>
                            <input
                              type="text"
                              required
                              value={lName}
                              onChange={(e) => setLName(e.target.value)}
                              className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 font-medium ">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            autoComplete
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 font-medium ">
                            Phone Number
                          </label>
                          <input
                            type="number"
                            required
                            autoComplete
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                          />
                        </div>

                        <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                          <label className="block text-sm text-gray-700 font-medium ">
                            Country
                          </label>
                          <select
                            className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Country
                            </option>
                            <option value="Kenya">Kenya</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                          <label className="block text-sm text-gray-700 font-medium ">
                            Cohort
                          </label>
                          <select
                            className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                            value={cohort}
                            onChange={(e) => setCohort(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Cohort
                            </option>
                            <option value="Cohort 1">Cohort 1</option>
                            <option value="Cohort 2">Cohort 2</option>
                            <option value="Cohort 3">Cohort 3</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                          <label className="block text-sm text-gray-700 font-medium ">
                            Module Of Specialization
                          </label>
                          <select
                            className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                            value={hackCategory}
                            onChange={(e) => setHackCategory(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Module Of Specialization
                            </option>
                            <option value="Web Development">
                              Web Development
                            </option>
                            <option value="Python & Django">
                              Python & Django
                            </option>
                            <option value="Dart & Flutter">
                              Dart & Flutter
                            </option>
                            <option value="Python & Web">
                              Python & Web Dev
                            </option>
                            <option value="Python & Dart">
                              {" "}
                              Python & Dart
                            </option>
                            <option value="Dart & Web">Dart & Web Dev</option>
                            <option value="All 3 Core Modules">
                              All the 3 core Modules
                            </option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {errorMessage && (
                          <p className="text-lg ml-1 font-bold text-red-500">
                            {errorMessage}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 grid">
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="inline-flex justify-center items-center gap-x-3 text-center bg-[#C1224F] hover:bg-[#13ABC4] border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1224F] focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 "
                        >
                          Submit
                        </button>
                      </div>
                      {/* <div className="mt-3 grid">
                        <p className="mb-3 text-sm">
                          If You have not completed your project but have an
                          idea, kindly submit it here instead.
                        </p>
                        <button
                          onClick={() => navigate("/idea-submission")}
                          type="button"
                          className="inline-flex justify-center items-center gap-x-3 text-center bg-[#C1224F] hover:bg-[#13ABC4] border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1224F] focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 "
                        >
                          Submit an Idea
                        </button>
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Specialization;
