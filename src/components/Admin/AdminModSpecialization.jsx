import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AdminModSpecialization = () => {
  const user = useSelector(selectUser);

  const [specializations, setSpecializations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [assignmentsPerPage] = useState(10);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  useEffect(() => {
    // Fetch all submitted specializations from Firestore
    const fetchAssignments = async () => {
      try {
        const assignmentsSnapshot = await db
          .collectionGroup("specialization")
          .get();
        const assignmentsData = assignmentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSpecializations(assignmentsData);
      } catch (error) {
        console.log("Error fetching specializations", error);
      }
    };

    const fetchTotalSubmissions = async () => {
      try {
        const submissionsSnapshot = await db
          .collectionGroup("specialization")
          .get();
        const totalSubmissions = submissionsSnapshot.size;
        setTotalSubmissions(totalSubmissions);
      } catch (error) {
        console.log("Error fetching specializations", error);
      }
    };
    fetchAssignments();
    fetchTotalSubmissions();
  }, []);

  const handleDownloadAll = () => {
    // Create a CSV string with all the users data
    const csvData = specializations.reduce((csv, user) => {
      return (
        csv +
        `${user.id},${user.fName + " " + user.lName},${user.email},${
          user.country
        }, ${user.phoneNumber},${user.gender},${user.cohort},${
          user.hackCategory
        }, ${user.expertise}\n`
      );
    }, `id,${"fName + lName"},email,country,phoneNumber,gender,cohort,hackCategory,expertise,\n`);

    // Generate a downloadable link for the CSV file
    const encodedData = encodeURI(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", `data:text/csv;charset=utf-8,${encodedData}`);
    link.setAttribute("download", "SpecializationData.csv");
    link.click();
  };

  const handleDownloadSingle = (userId) => {
    // Find the selected user's data
    const user = specializations.find((user) => user.id === userId);

    if (user) {
      // Create a CSV string with the user's data
      const csvData = `id,${"fName + lName"},email,country,phoneNumber,gender,cohort,hackCategory,expertise\n$${
        user.id
      },${user.fName + " " + user.lName},${user.email},${user.country}, ${
        user.phoneNumber
      },${user.gender},${user.cohort},${user.hackCategory}, ${user.expertise}`;

      // Generate a downloadable link for the CSV file
      const encodedData = encodeURI(csvData);
      const link = document.createElement("a");
      link.setAttribute("href", `data:text/csv;charset=utf-8,${encodedData}`);
      link.setAttribute("download", `SpecializationData_${user?.fName}.csv`);
      link.click();
    }
  };

  // Pagination

  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = specializations.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const authorizedEmails = [
    "evansnyamai98@gmail.com",
    "evansifysoftwares@gmail.com",
    "mungastan@gmail.com",
  ];
  return (
    <main>
      {!user || !authorizedEmails ? (
        <div className="flex justify-center flex-col text-center min-h-[55vh]">
          <h1 className="text-2xl font-semibold">
            You are not authorized to access this page.
          </h1>
        </div>
      ) : (
        <>
          <AdminNav />
          <section className="md:mt-16 px-4 sm:px-6 md:mx-8 lg:pl-72">
            <section className="max-w-7xl min-h-[70vh]">
              <h1 className="text-2xl font-bold">Module Specializations</h1>
              <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto mt-10">
                  <div className="flex justify-between my-5">
                    <p className="m-1 font-semibold">
                      {totalSubmissions} Submissions{" "}
                    </p>
                    <button
                      className="py-3 px-4 rounded-md border border-transparent font-semibold bg-[#C1224F] text-white hover:bg-[#13ABC4] transition-all text-sm "
                      onClick={handleDownloadAll}
                    >
                      Download All Data
                    </button>
                  </div>
                  <div class="p-1.5 min-w-full inline-block align-middle border-gray-400 border rounded-md ">
                    <div class="overflow-hidden ">
                      <table className="min-w-full divide-y divide-gray-400">
                        <thead>
                          <tr>
                            <th className="py-3 text-left text-xs  font-bold uppercase tracking-wider">
                              Student Name
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Gender
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Mobile No
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Country
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Student Email Address
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Cohort
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Expertise
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Download
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentAssignments.map((assignment) => (
                            <tr className="border-b" key={assignment.id}>
                              <td className="px-6 pl-0 pr-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.fName} {assignment.lName}
                              </td>
                              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.timestamp
                                  .toDate()
                                  .toLocaleDateString()}
                              </td> */}
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.gender}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.phoneNumber}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.country}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.cohort}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.hackCategory}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.hackCategory}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  className="py-1 px-2 rounded-md border border-transparent font-semibold bg-[#C1224F] text-white hover:bg-[#13ABC4] transition-all text-sm "
                                  onClick={() =>
                                    handleDownloadSingle(assignment.id)
                                  }
                                >
                                  Download
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 ">
                {specializations.length > assignmentsPerPage && (
                  <div className="flex-1 flex justify-center gap-4">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={classNames(
                        "px-2 py-1 rounded-md text-sm font-medium",
                        currentPage === 1
                          ? "bg-gray-600 text-white px-5 py-2 cursor-not-allowed"
                          : "bg-[#13ABC4] hover:bg-[#C1224F] text-white px-5 py-2 rounded-md"
                      )}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={indexOfLastAssignment >= specializations.length}
                      className={classNames(
                        "px-2 py-1 rounded-md text-sm font-medium",
                        indexOfLastAssignment >= specializations.length
                          ? "bg-gray-600 text-white px-5 py-2 cursor-not-allowed"
                          : "bg-[#13ABC4] hover:bg-[#C1224F] text-white px-5 py-2 rounded-md"
                      )}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </section>
          </section>
        </>
      )}
    </main>
  );
};

export default AdminModSpecialization;
