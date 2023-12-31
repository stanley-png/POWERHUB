import React, { useState, useEffect } from "react";
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";

const ViewAlumniProfile = () => {
  const { slug } = useParams();
  const [alumniData, setAlumniData] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const snapshot = await db
          .collection("usersProfiles")
          .where("slug", "==", slug)
          .limit(1)
          .get();

        if (snapshot.empty) {
          console.log("No matching profile found");
          return;
        }

        // Get the article data from the snapshot
        const data = snapshot.docs[0].data();
        setAlumniData(data);
      } catch (error) {
        console.log("Error fetching article", error);
      }
    };

    fetchProfile();
  }, [slug]);

  return (
    <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <section className="flex justify-between flex-wrap">
        <div className="text-center flex flex-col items-center">
          <img
            src={alumniData?.imageUrl}
            alt=""
            className="h-28 w-28 rounded-full"
          />
          <h1 className="text-md font-semibold">{alumniData?.fName}</h1>
          <p className="text-xs">{alumniData?.currentActivity}</p>
          <p className="text-gray-500 mt-3 font-semibold">
            <span>44</span> Followers
          </p>
          <button className="py-2 px-7 mt-4 rounded-full text-white font-semibold bg-[#13ABC4] hover:bg-[#C1224F]">
            Follow
          </button>
        </div>
        <section className="bg-white rounded-md w-3/6 p-3 shadow-md">
          <h1 className="font-bold text-lg mb-2">Biography</h1>
          <p className="text-sm">{alumniData?.bio}</p>
        </section>
        <article className="md:w-1/6">
          {/* <p className="text-sm">{alumniData?.bio}</p> */}

          <h1 className="font-bold text-lg mb-1">Location</h1>
          <p className="text-sm">{alumniData?.country}</p>
          <br />
          <h1 className="font-bold text-lg mb-1">Cohort</h1>
          <p className="text-sm">{alumniData?.cohort}</p>
        </article>
      </section>
      {/* {alumniData?.fName} */}
    </main>
  );
};

export default ViewAlumniProfile;
