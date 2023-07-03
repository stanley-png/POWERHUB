import React, { useState } from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { db } from "../utils/firebase";

const Graduation = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  //   const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expertise, setExpertise] = useState("");
  const [cohort, setCohort] = useState("");
  const [hackCategory, setHackCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [city, setCity] = useState("");
  const [institution, setInstitution] = useState("");
  const [education, setEducation] = useState("");
  const [employment, setEmployment] = useState("");
  const [qualification, setQualification] = useState("");
  const [career, setCareer] = useState("");

  const validateInputs = () => {
    if (
      !fName.trim() ||
      //   !lName.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      //   !expertise.trim() ||
      !city.trim() ||
      !institution.trim() ||
      !education.trim() ||
      !employment.trim() ||
      !qualification.trim() ||
      !career.trim() ||
      !gender.trim() ||
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

      db.collection("postGraduation")
        .add({
          uid: user.uid,
          fName: fName,
          email: user.email,
          emailAddress: email,
          phoneNumber: phoneNumber,
          //   expertise: expertise,
          city: city,
          institution: institution,
          education: education,
          employment: employment,
          qualification: qualification,
          career: career,
          gender: gender,
          country: country,
          cohort: cohort,
          hackCategory: hackCategory,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          navigate("/success");
        })
        .catch((error) => {
          console.log("Error submitting registration", error);
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
                    Post Graduation Form
                  </h1>

                  <p className="mt-3 md:text-lg text-gray-800 "></p>

                  <div className="mt-6">
                    <h2 className="text-lg mb-4">
                      Congratulations on your learning progress.
                    </h2>
                    <h2 className=" text-gray-800 ">
                      We are glad that you graduated from the
                      <b> #1MillionDevs4Africa </b> program. We would love to
                      know what you are up to after this, to help us support you
                      through your journey as a software developer. Fill in the
                      details as indicated below.
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
                      Post Graduation Form
                    </h2>

                    <form>
                      <div className="mt-6 grid gap-4 lg:gap-6">
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
                        {/* <div>
                          <label className="block text-sm text-gray-700 font-medium ">
                            Areas of Expertise
                          </label>
                          <input
                            type="text"
                            required
                            autoComplete
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                            placeholder="Briefly tell us area of expertise eg, Web dev, Python"
                          />
                        </div> */}

                        <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                          <label className="block text-sm text-gray-700 font-medium ">
                            Employment Status
                          </label>
                          <select
                            className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                            value={employment}
                            onChange={(e) => setEmployment(e.target.value)}
                          >
                            <option value="" disabled>
                              Employment Status
                            </option>
                            <option value="Student">Student</option>
                            <option value="Employed">Employed</option>
                            <option value="Student Employee">
                              Student Employee
                            </option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                          <label className="block text-sm text-gray-700 font-medium ">
                            Level of Education
                          </label>
                          <select
                            className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                          >
                            <option value="" disabled>
                              Level of Education
                            </option>
                            <option value="Pre-Secondary">Pre-Secondary</option>
                            <option value="Secondary/High School">
                              Secondary/High School
                            </option>
                            <option value="College">College</option>
                            <option value="University">University</option>
                            <option value="Not Applicable">
                              Not Applicable
                            </option>
                          </select>
                        </div>

                        <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                          <label className="block text-sm text-gray-700 font-medium ">
                            Qualification
                          </label>
                          <select
                            className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Qualification
                            </option>
                            <option value="PhD">PhD</option>
                            <option value="Masters Degree">
                              Masters Degree
                            </option>
                            <option value="Graduate">Graduate</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Diploma">Diploma</option>
                            <option value="High School">High School</option>
                            <option value="Not Applicable">
                              Not Applicable
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 font-medium ">
                            Institution/College/University attend or currently
                            attending
                          </label>
                          <input
                            type="text"
                            required
                            autoComplete
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                            placeholder=""
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 font-medium ">
                            Tech career interest domain
                          </label>
                          <input
                            type="text"
                            required
                            autoComplete
                            value={career}
                            onChange={(e) => setCareer(e.target.value)}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                            placeholder="Web developer, ML Expert etc"
                          />
                        </div>

                        <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                          <label className="block text-sm text-gray-700 font-medium ">
                            Gender
                          </label>
                          <select
                            className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="None Binary">None Binary</option>
                            <option value="Other">Other</option>
                          </select>
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

                        <div>
                          <label className="block text-sm text-gray-700 font-medium ">
                            Nearest Town / city
                          </label>
                          <input
                            type="text"
                            required
                            autoComplete
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                            placeholder="eg, Nairobi, Lagos"
                          />
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

export default Graduation;
