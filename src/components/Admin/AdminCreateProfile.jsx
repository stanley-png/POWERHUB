import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [email, setEmail] = useState("");
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
                      email,
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
                        setEmail("");
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
        data-hs-overlay={`#hs-static-backdrop-modal-4`}
      >
        Create Profile
      </button>
    </section>
  );
};

export default AdminCreateProfile;
