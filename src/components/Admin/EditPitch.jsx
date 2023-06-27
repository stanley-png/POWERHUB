import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../utils/firebase";
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
const EditPitch = () => {
  return <div>EditPitch</div>;
};

export default EditPitch;
