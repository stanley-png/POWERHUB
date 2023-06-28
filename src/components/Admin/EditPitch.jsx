import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import { db } from "../../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import ReactQuill from "react-quill";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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
const formats = [
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "list",
  "bullet",
  "align",
  "video",
  "code-block",
  "blockquote",
  "strike",
];
const EditPitch = ({
  id,
  editPitchTitle,
  editPitchBody,
  editCohort,
  editIncubation,
  editImagePreview,
  editPitchImage,
}) => {
  const [pitchTitle, setArticleHeader] = useState(editPitchTitle);
  const [pitchBody, setArticleBody] = useState(editPitchBody);
  const [cohort, setCohort] = useState(editCohort);
  const [incubation, setIncubation] = useState(editIncubation);
  const [pitchImage, setPitchImage] = useState(editPitchImage);
  const [imagePreview, setImagePreview] = useState(editImagePreview);

  const handleChange = (value) => {
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

  const updatePitch = async (e) => {
    e.preventDefault();
    // await
  };
  return (
    <section>
      <ToastContainer />
      <button
        type="button"
        className="py-2 px-6 rounded-md font-semibold hover:bg-[#0f94a8] text-white bg-[#13ABC4]"
        data-hs-overlay={`#hs-static-backdrop-modal-3-${id}`}
      >
        Edit
      </button>
      <div
        id={`hs-static-backdrop-modal-3-${id}`}
        className="hs-overlay hidden w-full z-[100] h-full fixed top-0 left-0 overflow-x-hidden overflow-y-auto [--overlay-backdrop:static] bg-[#13ABC4] bg-opacity-20 backdrop-blur-xs"
        data-hs-overlay-keyboard="false"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 md:mt-24 opacity-100 ease-out transition-all sm:max-w-4xl w-full m-3 mx-auto ">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-800">Edit Project</h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 transition-all text-sm"
                data-hs-overlay={`#hs-static-backdrop-modal-3-${id}`}
              >
                <CloseOutlinedIcon />
              </button>
            </div>

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
              </div>
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
              <br />
              <div className="flex flex-col mb-3">
                <label className="font-semibold">Edit Title</label>
                <input
                  value={pitchTitle}
                  onChange={(e) => setArticleHeader(e.target.value)}
                  type="text"
                  className=" py-3 px-4 block w-full border border-gray-300 rounded-md text-sm focus:border-[#C1224F] focus:ring-[#C1224F]"
                  placeholder="Lesson Title"
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
              <br />
              <div className="flex flex-col w-full mx-wd2 mx-auto rounded-lg">
                <label className="block text-sm text-gray-700 font-medium ">
                  Ready For Incubation
                </label>
                <select
                  className=" p-2 cursor-pointer bg-white border rounded-md shadow-sm outline-none "
                  value={incubation}
                  onChange={(e) => setIncubation(e.target.value)}
                >
                  <option value="" disabled>
                    Select Yes or No
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <br />
              <div>
                <label className="font-semibold">Edit Content</label>
                <div className="">
                  <ReactQuill
                    value={pitchBody}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    placeholder="Write Your Article.."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                className="hs-dropdown-toggle py-3 px-6 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm "
                data-hs-overlay={`#hs-static-backdrop-modal-3-${id}`}
              >
                Cancel
              </button>
              <button
                // onClick={handleUpdate}
                className="py-3 px-6 inline-flex justify-center items-center gap-2 cursor-pointer rounded-md border border-transparent font-semibold bg-[#C1224F] text-white hover:bg-[#13ABC4] transition-all text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditPitch;
