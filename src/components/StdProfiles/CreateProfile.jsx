import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db, storage } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProfile = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [cohort, setCohort] = useState("");
  const [website, setWebsite] = useState("");
  const [currentActivity, setCurrentActivity] = useState("");
  const [employment, setEmployment] = useState("");
  const [career, setCareer] = useState("");

  const [articleImage, setArticleImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setArticleImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleCreateProfile = (e) => {
    e.preventDefault();
    db.collection("usersProfiles")
      .where("email", "==", user.email)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          setErrorMessage("You can't create more than one Profile");
        } else {
          try {
            const uploadTask = storage
              .ref(`usersProfilesImages/${articleImage.name}`)
              .put(articleImage);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log("Upload progress: ", progress);
              },
              (error) => {
                console.log("Error uploading image: ", error);
              },
              () => {
                storage
                  .ref("usersProfilesImages")
                  .child(articleImage.name)
                  .getDownloadURL()
                  .then((imageUrl) => {
                    const usersCollection = db.collection("usersProfiles");

                    const blogData = {
                      fName,
                      slug: fName.replace(/\s/g, "-"),
                      gender,
                      country,
                      phoneNumber,
                      bio,
                      cohort,
                      website,
                      currentActivity,
                      employment,
                      career,
                      imageUrl,
                      email: user?.email,
                      uid: user.uid,
                      displayName: user.displayName,
                      timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    };

                    usersCollection
                      .add(blogData)
                      .then(() => {
                        setFName("");
                        setPhoneNumber("");
                        setBio("");
                        setCareer("");
                        setWebsite("");
                        setCurrentActivity("");
                        setArticleImage(null);
                        setImagePreview(null);
                        toast.success("Profile Created successfully!", {
                          position: "top-center",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      })
                      .catch((error) => {
                        console.log("Error creating blog post: ", error);
                      });
                  })
                  .catch((error) => {
                    console.log("Error retrieving image URL: ", error);
                  });
              }
            );
          } catch (error) {
            console.log("Error creating blog post: ", error);
          }
        }
      });
  };

  return (
    <section>
      <button
        type="button"
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#C1224F] text-white hover:bg-[#13ABC4] transition-all text-sm "
        data-hs-overlay="#hs-static-backdrop-modal"
      >
        Edit Profile
      </button>
      <ToastContainer />

      <div
        id="hs-static-backdrop-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 overflow-x-hidden overflow-y-auto [--overlay-backdrop:static] bg-[#13ABC4] bg-opacity-20 backdrop-blur-xs"
        data-hs-overlay-keyboard="false"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 md:mt-24 opacity-100 ease-out transition-all sm:max-w-4xl w-full m-3 mx-auto ">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-800">Create Profile</h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 transition-all text-sm"
                data-hs-overlay="#hs-static-backdrop-modal"
              >
                <CloseOutlinedIcon />
              </button>
            </div>
            {errorMessage && (
              <p className="px-4 mb-1 font-semibold text-[#C1224F]">
                {errorMessage}
              </p>
            )}
            <div className="p-4 overflow-y-auto">
              <div className="mb-5">
                <label className="font-semibold">Add Cover Image</label>
                <input
                  type="file"
                  onChange={handleImagePreview}
                  className="block cursor-pointer w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
            file:bg-[#13ABC4] file:text-white
            hover:file:bg-[#C1224F] "
                  accept="image/*"
                />
                <div className="mt-4 max-w-[300px]">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      style={{ maxWidth: "400px", maxHeight: "200px" }}
                      className="rounded-md h-[250px] w-full"
                    />
                  )}
                </div>
              </div>
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
                </div>

                <div>
                  <label className="block text-sm text-gray-700 font-medium ">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium mt-3">
                  Bio
                </label>
                <textarea
                  type="text"
                  required
                  autoComplete
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  cols={10}
                  rows={5}
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                  placeholder="Bio"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-3">
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
                    <option value="Student Employee">Student Employee</option>
                    <option value="Other">Other</option>
                  </select>
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
                <div>
                  <label className="block text-sm text-gray-700 font-medium ">
                    Website
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                    placeholder="https://... or github link"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 font-medium ">
                    Current Activity
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete
                    value={currentActivity}
                    onChange={(e) => setCurrentActivity(e.target.value)}
                    className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                    placeholder="What are you currently working on"
                  />
                </div>
              </div>
            </div>
            {errorMessage && (
              <p className="px-4 mb-1 font-semibold text-[#C1224F]">
                {errorMessage}
              </p>
            )}

            <div className="flex justify-between items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                className="hs-dropdown-toggle py-3 px-6 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm "
                data-hs-overlay="#hs-static-backdrop-modal"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProfile}
                className="py-3 px-6 inline-flex justify-center items-center gap-2 cursor-pointer rounded-md border border-transparent font-semibold bg-[#C1224F] text-white hover:bg-[#13ABC4] transition-all text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProfile;
