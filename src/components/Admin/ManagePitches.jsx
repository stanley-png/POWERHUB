import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import AdminNav from "./AdminNav";
import { db } from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagePitches = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [pitches, setPitches] = React.useState([]);

  const authorizedEmails = [
    "evansnyamai98@gmail.com",
    "evansifysoftwares@gmail.com",
    "mungastan@gmail.com",
  ];

  React.useEffect(() => {
    // Fetch all blogs from Firestore
    const fetchArticles = async () => {
      try {
        const pitchCollection = db.collection("projectsPitches");
        const snapshot = await pitchCollection.get();

        const pitchData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPitches(pitchData);
      } catch (error) {
        console.log("Error fetching blogs: ", error);
      }
    };

    fetchArticles();
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      const topicRef = db.collection("blogArticles").doc(id);

      topicRef
        .delete()
        .then(() => {
          toast.success("Article Deleted successfully!", {
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
          console.log(error);
          // showToast('Error deleting topic', 'red');
        });
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
        <section>
          <AdminNav />
          <section className="md:mt-16 px-4 sm:px-6 md:mx-8 lg:pl-72">
            <header className="max-w-7xl mb-6 flex justify-between">
              <div>
                <h1 class="block text-2xl font-bold text-gray-800 sm:text-3xl">
                  All Pitch Decks
                </h1>
              </div>
              <div>
                <button
                  onClick={() => navigate("/Add-Pitch")}
                  className="py-3 px-9 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#13ABC4]  text-white hover:bg-[#C1224F] text-sm "
                >
                  Add Project
                </button>
              </div>
            </header>
            <article className="mt-10 max-w-7xl flex flex-col gap-3 flex justify-between">
              {pitches &&
                pitches.map((pitch) => (
                  <section key={pitch.id} className="flex w-full bg-red-500">
                    <article className="w-64 bg-yellow-300">
                      <img src={pitch.imageUrl} className="w-full" alt="" />
                      <h1>{pitch.pitchTitle}</h1>
                      <p
                        dangerouslySetInnerHTML={{ __html: pitch.pitchBody }}
                      />
                    </article>
                  </section>
                ))}
            </article>
          </section>
        </section>
      )}
    </main>
  );
};

export default ManagePitches;
