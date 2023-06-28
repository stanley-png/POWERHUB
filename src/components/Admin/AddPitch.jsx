import React, { useState } from "react";
import AdminNav from "./AdminNav";
import ReactQuill from "react-quill";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import firebase from "firebase/compat/app";
// import { db, storage } from "../../../utils/firebase";
import { useSelector } from "react-redux";
// import { selectUser } from "../../../features/userSlice";
import env from "dotenv";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { db, storage } from "../../utils/firebase";
import Select from "react-select";

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },

  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video", "code-block", "blockquote", "strike"],
    ["clean"],
  ],
};

const options = [
  { value: "No", label: "No" },
  { value: "Yes", label: "Yes" },
];

const AddPitch = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [pitchTitle, setArticleHeader] = useState("");
  const [pitchBody, setArticleBody] = useState("");
  const [pitchImage, setPitchImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [cohort, setCohort] = useState("");
  const [incubation, setIncubation] = useState(false);
  const [incubationCompany, setIncubationCompany] = useState("");

  const handleOptionChange = (option) => {
    setIncubation(option);
  };

  const handleGroupMembersChange = (event) => {
    const { name, value } = event.target;
    setIncubationCompany((prevMembers) => ({
      ...prevMembers,
      [name]: value,
    }));
  };

  const authorizedEmails = env.AUTHORIZED_EMAILS
    ? env.AUTHORIZED_EMAILS.split(",")
    : [];

  const handleBlogBodyChange = (value) => {
    setArticleBody(value);
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setPitchImage(file);

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

  const calculateReadingTime = () => {
    // Calculate the reading time based on your preferred logic
    // For example, you can estimate 200 words per minute
    const wordsPerMinute = 200;
    const words = pitchBody.split(" ").filter((word) => word.length > 0).length;
    const readingTime = Math.ceil(words / wordsPerMinute);

    return readingTime;
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();

    try {
      const uploadTask = storage
        .ref(`projectsImages/${pitchImage.name}`)
        .put(pitchImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload progress: ", progress);
        },
        (error) => {
          console.log("Error uploading pitch image: ", error);
        },
        () => {
          storage
            .ref("projectsImages")
            .child(pitchImage.name)
            .getDownloadURL()
            .then((imageUrl) => {
              const pitchCollection = db.collection("projectsPitches");

              const pitchData = {
                pitchTitle,
                slug: pitchTitle.replace(/\s/g, "-"),
                pitchBody,
                readingTime: calculateReadingTime(),
                imageUrl,
                cohort,
                incubation,
                incubationCompany: incubation ? incubationCompany : "",
                displayName: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              };

              pitchCollection
                .add(pitchData)
                .then(() => {
                  setArticleHeader("");
                  setArticleBody("");
                  setCohort("");
                  setIncubation(false);
                  setIncubationCompany("");
                  setPitchImage(null);
                  setImagePreview(null);
                  toast.success("Pitch Project Added successfully!", {
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
                  console.log("Error creating pitch: ", error);
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
  };
  return (
    <main>
      {!user || !authorizedEmails ? (
        <div className="flex justify-center flex-col text-center min-h-[55vh]">
          <h1 className="text-2xl font-semibold">
            You are not authorized to access this page.
          </h1>
        </div>
      ) : (
        <main>
          <AdminNav />
          <section className="md:mt-16 px-4 sm:px-6 md:mx-8 lg:pl-72">
            <header className="max-w-7xl mb-6 flex justify-between">
              <div>
                <h1 class="block text-2xl font-bold text-gray-800 sm:text-3xl">
                  +Add Project
                </h1>
                <p class="mt-2 text-lg text-gray-800 ">
                  Make sure you fill all the sections and add image.
                </p>
              </div>
              <div>
                <button
                  onClick={() => navigate("/ManagePitches")}
                  className="py-3 px-9 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#13ABC4]  text-white hover:bg-[#C1224F] text-sm "
                >
                  View Projects
                </button>
              </div>
            </header>

            <section className="max-w-7xl mt-10 border border-gray-600 rounded-md p-4">
              <ToastContainer />
              <div>
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
                <div className="mt-4 max-w-[400px] border border-3 ">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      style={{ maxWidth: "400px" }}
                      className="rounded-md h-[250px] w-full"
                    />
                  )}
                </div>
              </div>
              <br />
              <label htmlFor="title" className="font-semibold">
                Project Title or Name
              </label>
              <input
                value={pitchTitle}
                onChange={(e) => setArticleHeader(e.target.value)}
                type="text"
                className="py-3 px-4 block w-full border-gray-400 border rounded-md text-sm focus:border-[#13ABC4] focus:ring-[#13ABC4] mb-3"
                placeholder="Event Title or Article Header"
              />{" "}
              <br />
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
              <br />
              <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                <label className="block text-sm text-gray-700 font-medium ">
                  Project Incubation
                </label>
                <select
                  className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                  value={incubation}
                  onChange={(e) => setIncubation(e.target.value === "Yes")}
                  required
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                {incubation && (
                  <div>
                    <label className="block text-sm text-gray-700 font-medium mt-2">
                      Incubation Company:
                    </label>
                    <textarea
                      rows="3"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                      value={incubationCompany}
                      onChange={(e) => setIncubationCompany(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* <Select
                  className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                  value={incubation}
                  options={options}
                  onChange={handleOptionChange}
                /> */}
              </div>
              {incubation && incubation.value === "Yes" && (
                <div>
                  <label className="block text-sm text-gray-700 font-medium mt-2">
                    Company Incubating
                  </label>
                  <textarea
                    required
                    className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border border-1"
                    type="text"
                    rows="5"
                    name="member1"
                    value={incubationCompany.member1 || ""}
                    onChange={handleGroupMembersChange}
                    placeholder="Enter the name of the company incubating this project "
                  />
                </div>
              )}
              <br />
              <label htmlFor="CatName" className="font-semibold">
                Project Content
              </label>
              <ReactQuill
                value={pitchBody}
                onChange={handleBlogBodyChange}
                modules={modules}
                theme="snow"
                placeholder="Write Your Article.."
              />
              <div className="mt-5">
                <button
                  onClick={handleCreateBlog}
                  className="py-3 px-6 inline-flex justify-center items-center gap-2 cursor-pointer rounded-md border border-transparent font-semibold bg-[#C1224F] text-white hover:bg-[#13ABC4] transition-all text-sm"
                >
                  Save
                </button>
              </div>
            </section>
          </section>
        </main>
      )}
    </main>
  );
};

export default AddPitch;
