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

const AddPitch = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [articleHeader, setArticleHeader] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleImage, setArticleImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const authorizedEmails = env.AUTHORIZED_EMAILS
    ? env.AUTHORIZED_EMAILS.split(",")
    : [];

  const handleBlogBodyChange = (value) => {
    setArticleBody(value);
  };

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

  const calculateReadingTime = () => {
    // Calculate the reading time based on your preferred logic
    // For example, you can estimate 200 words per minute
    const wordsPerMinute = 200;
    const words = articleBody
      .split(" ")
      .filter((word) => word.length > 0).length;
    const readingTime = Math.ceil(words / wordsPerMinute);

    return readingTime;
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();

    try {
      const uploadTask = storage
        .ref(`projectsImages/${articleImage.name}`)
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
          console.log("Error uploading blog image: ", error);
        },
        () => {
          storage
            .ref("projectsImages")
            .child(articleImage.name)
            .getDownloadURL()
            .then((imageUrl) => {
              const blogsCollection = db.collection("projectsPitches");

              const blogData = {
                articleHeader,
                slug: articleHeader.replace(/\s/g, "-"),
                articleBody,
                readingTime: calculateReadingTime(),
                imageUrl,
                displayName: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              };

              blogsCollection
                .add(blogData)
                .then(() => {
                  setArticleHeader("");
                  setArticleBody("");
                  setArticleImage(null);
                  setImagePreview(null);
                  toast.success("Content Updated successfully!", {
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
                  onClick={() => navigate("/ManageArticles")}
                  className="py-3 px-9 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#13ABC4]  text-white hover:bg-[#C1224F] text-sm "
                >
                  View Projects
                </button>
              </div>
            </header>

            <section className="max-w-7xl mt-10 border border-gray-600 rounded-md p-4">
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
                Project Title
              </label>
              <input
                value={articleHeader}
                onChange={(e) => setArticleHeader(e.target.value)}
                type="text"
                className="py-3 px-4 block w-full border-gray-400 border rounded-md text-sm focus:border-[#13ABC4] focus:ring-[#13ABC4] mb-3"
                placeholder="Event Title or Article Header"
              />{" "}
              <br />
              <label htmlFor="CatName" className="font-semibold">
                Project Content
              </label>
              <ReactQuill
                value={articleBody}
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
