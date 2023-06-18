import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../utils/firebase";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AdminProjectIdeas = () => {
  const user = useSelector(selectUser);

  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [assignmentsPerPage] = useState(10);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  useEffect(() => {
    // Fetch all submitted assignments from Firestore
    const fetchAssignments = async () => {
      try {
        const assignmentsSnapshot = await db
          .collectionGroup("projectIdeas")
          .get();
        const assignmentsData = assignmentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAssignments(assignmentsData);
      } catch (error) {
        console.log("Error fetching assignments", error);
      }
    };

    const fetchTotalSubmissions = async () => {
      try {
        const submissionsSnapshot = await db
          .collectionGroup("projectIdeas")
          .get();
        const totalSubmissions = submissionsSnapshot.size;
        setTotalSubmissions(totalSubmissions);
      } catch (error) {
        console.log("Error fetching assignments", error);
      }
    };
    fetchAssignments();
    fetchTotalSubmissions();
  }, []);

  // Pagination

  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = assignments.slice(
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
              <h1 className="text-2xl font-bold">Project Ideas Submissions</h1>
              <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto mt-10">
                  <p className="m-1 font-semibold">
                    {totalSubmissions} Submissions{" "}
                  </p>
                  <div class="p-1.5 min-w-full inline-block align-middle border-gray-400 border rounded-md ">
                    <div class="overflow-hidden ">
                      <table className="min-w-full divide-y divide-gray-400">
                        <thead>
                          <tr>
                            <th className="py-3 text-left text-xs  font-bold uppercase tracking-wider">
                              Student Name
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Submission date
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
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase w-[20px]">
                              GitHub Link
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Cohort
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                              Category
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentAssignments.map((assignment) => (
                            <tr className="border-b" key={assignment.id}>
                              <td className="px-6 pl-0 pr-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.fName} {assignment.lName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.timestamp
                                  .toDate()
                                  .toLocaleDateString()}
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
                                {assignment.githubLink}
                              </td>
                              <td className=" whitespace-nowrap text-sm w-24 text-gray-500">
                                {assignment.description}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.cohort}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {assignment.hackCategory}
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
                {assignments.length > assignmentsPerPage && (
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
                      disabled={indexOfLastAssignment >= assignments.length}
                      className={classNames(
                        "px-2 py-1 rounded-md text-sm font-medium",
                        indexOfLastAssignment >= assignments.length
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

export default AdminProjectIdeas;
