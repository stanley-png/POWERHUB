import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { selectUser } from "../../features/userSlice";
import { selectUser } from "../features/userSlice";
import { db } from "../utils/firebase";
import firebase from "firebase/compat/app";
import Login from "./Login";
import Select from "react-select";

const options = [
  { value: "individual", label: "Individual" },
  { value: "group", label: "Group" },
];

const SubmitProject = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [pitchDeck, setPitchDeck] = useState("");
  const [expertise, setExpertise] = useState("");
  const [projectCat, setProjectCat] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cohort, setCohort] = useState("");
  const [gender, setGender] = useState("");
  const [hackCategory, setHackCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleGroupMembersChange = (event) => {
    const { name, value } = event.target;
    setGroupMembers((prevMembers) => ({
      ...prevMembers,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    if (
      !fName.trim() ||
      !lName.trim() ||
      !email.trim() ||
      !githubLink.trim() ||
      !expertise.trim() ||
      !phoneNumber.trim() ||
      !projectCat.trim() ||
      !country.trim() ||
      !cohort.trim() ||
      !gender.trim() ||
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

      db.collection("projects")
        .add({
          uid: user.uid,
          fName: fName,
          lName: lName,
          email: user.email,
          emailAddress: email,
          githubLink: githubLink,
          pitchDeck: pitchDeck,
          phoneNumber: phoneNumber,
          expertise: expertise,
          projectCat: projectCat,
          country: country,
          cohort: cohort,
          gender: gender,
          hackCategory: hackCategory,
          type: selectedOption.value,
          groupMembers: selectedOption.value === "group" ? groupMembers : [],
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
                  <img
                    className="w-full mt-3 rounded-md max-h-[42vh]"
                    src="https://powerlearnproject.org/_next/image?url=%2Fassets%2Fperk2.jpeg&w=640&q=75"
                    alt=""
                  />
                  <h1 className="mt-2 text-2xl font-bold text-gray-800 sm:text-4xl lg:text-4xl lg:leading-tight">
                    Showcase your project with PowerHub
                  </h1>

                  <p className="mt-3 md:text-lg text-gray-800 "></p>

                  <div className="mt-6">
                    <h2 className="text-lg mb-4">Dear Learners,</h2>
                    <h2 className=" text-gray-800 ">
                      We hope this message finds you well and that you are
                      enjoying your learning journey with us. We greatly value
                      your creativity, innovation, and dedication to expanding
                      your knowledge and skills. Kindly submit your projects
                      here. Thank You
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
                      Fill in the form to submit your Project.
                    </h2>

                    <form>
                      <div className="mt-6 grid gap-4 lg:gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                          <div>
                            <label className="block text-sm text-gray-700 font-medium ">
                              First Name
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
                            Github Link
                          </label>
                          <input
                            type="text"
                            required
                            autoComplete
                            value={githubLink}
                            onChange={(e) => setGithubLink(e.target.value)}
                            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 font-medium ">
                            Pitch Deck Link
                          </label>
                          <input
                            type="text"
                            required
                            autoComplete
                            value={pitchDeck}
                            onChange={(e) => setPitchDeck(e.target.value)}
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
                        <div>
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
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 font-medium ">
                            Select Project Type:
                          </label>
                          <Select
                            options={options}
                            value={selectedOption}
                            onChange={handleOptionChange}
                          />
                        </div>

                        {selectedOption && selectedOption.value === "group" && (
                          <div>
                            <label className="block text-sm text-gray-700 font-medium ">
                              Members Names & Emails
                            </label>
                            <textarea
                              required
                              className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                              type="text"
                              rows="5"
                              name="member1"
                              value={groupMembers.member1 || ""}
                              onChange={handleGroupMembersChange}
                              placeholder="Member Details, Emails "
                            />
                            {/* Add more input fields for additional group members */}
                          </div>
                        )}

                        <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                          <label className="block text-sm text-gray-700 font-medium ">
                            Project Category
                          </label>
                          <select
                            className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                            value={projectCat}
                            onChange={(e) => setProjectCat(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            <option value="FINTECH">Financial Tech</option>
                            <option value="Agri Tech">Agri Tech</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="Climate">Climate</option>
                            <option value="EDUTECH">Education Tech</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Portfolio">Portfolio</option>
                            <option value="Communication">Communication</option>
                            <option value="Data-science">Data Science</option>
                            <option value="Machine Learning">
                              Machine Learning
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
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
                            Technology Used
                          </label>
                          <select
                            className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                            value={hackCategory}
                            onChange={(e) => setHackCategory(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Technology Used
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
                          Submit Project
                        </button>
                      </div>
                      <div className="mt-3 grid">
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
                      </div>
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

export default SubmitProject;
