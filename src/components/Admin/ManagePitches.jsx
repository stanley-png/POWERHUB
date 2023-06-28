import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import AdminNav from "./AdminNav";
import { db } from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditPitch from "./EditPitch";

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
    if (window.confirm("Are you sure you want to delete this Project?")) {
      const topicRef = db.collection("projectsPitches").doc(id);

      topicRef
        .delete()
        .then(() => {
          toast.success("Project Deleted successfully!", {
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
            <article className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pitches &&
                pitches.map((pitch) => (
                  <section
                    key={pitch.id}
                    className="group  rounded-xl shadow-md transition-all "
                  >
                    <article className="rounded-xl">
                      <img
                        src={pitch.imageUrl}
                        className="w-full rounded-t-xl"
                        alt=""
                      />
                      <div className="p-2">
                        <h1 className="font-bold text-lg mb-3 text-[#C1224F]">
                          {pitch.pitchTitle}
                        </h1>
                        <p className=" text-md  font-semibold">
                          Cohort : {pitch.cohort}
                        </p>
                        <p className=" text-md mb-3 font-semibold">
                          For Incubation : {pitch.type || pitch.incubation}
                        </p>
                        <p className=" text-md mb-3 font-semibold">
                          Incubated by : {pitch?.member1}
                        </p>
                        <p
                          dangerouslySetInnerHTML={{ __html: pitch.pitchBody }}
                        />
                      </div>
                      <div className="flex justify-between mt-4 px-2 py-2">
                        <EditPitch
                          id={pitch.id}
                          editPitchTitle={pitch.pitchTitle}
                          editPitchBody={pitch.pitchBody}
                          editCohort={pitch.cohort}
                          editIncubation={pitch.incubation}
                          editImagePreview={pitch.imageUrl}
                        />
                        <button
                          onClick={() => handleDelete(pitch.id)}
                          className="py-2 px-9 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#C1224F]  text-white hover:bg-[#C1224F] text-sm "
                        >
                          Delete
                        </button>
                      </div>
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
