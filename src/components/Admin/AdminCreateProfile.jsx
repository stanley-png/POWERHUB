import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const AdminCreateProfile = () => {
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
  return (
    <section>
      <button
        type="button"
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#C1224F] text-white hover:bg-[#13ABC4] transition-all text-sm "
        data-hs-overlay={`#hs-static-backdrop-modal-4`}
      >
        Create Profile
      </button>
    </section>
  );
};

export default AdminCreateProfile;
