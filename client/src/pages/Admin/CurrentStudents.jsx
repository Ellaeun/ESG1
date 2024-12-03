import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useAppContext } from "../../context/AppContext.jsx";

import Table from "../../components/Table.jsx";
import Pagination from "../../components/Pagination.jsx";

CurrentStudents.propTypes = {};

export default function CurrentStudents() {
  const { api } = useAppContext();
  const [data, setData] = useState([
    {
      fullName: "John Doe",
      academicStatus: "Good Standing",
      course: "Computer Science",
      yearStanding: "Freshman",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Jane Smith",
      academicStatus: "Probation",
      course: "Mechanical Engineering",
      yearStanding: "Sophomore",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Michael Johnson",
      academicStatus: "Good Standing",
      course: "Business Administration",
      yearStanding: "Junior",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Emily Brown",
      academicStatus: "Suspended",
      course: "Nursing",
      yearStanding: "Senior",
      enrollmentStatus: "Not Enrolled",
    },
    {
      fullName: "David Williams",
      academicStatus: "Good Standing",
      course: "Electrical Engineering",
      yearStanding: "Freshman",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Sarah Davis",
      academicStatus: "Good Standing",
      course: "Psychology",
      yearStanding: "Sophomore",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "James Martinez",
      academicStatus: "Probation",
      course: "Mathematics",
      yearStanding: "Junior",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Patricia Taylor",
      academicStatus: "Good Standing",
      course: "Architecture",
      yearStanding: "Senior",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Robert Anderson",
      academicStatus: "Good Standing",
      course: "Law",
      yearStanding: "Freshman",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Linda Thomas",
      academicStatus: "Suspended",
      course: "Biology",
      yearStanding: "Sophomore",
      enrollmentStatus: "Not Enrolled",
    },
    {
      fullName: "Charles Moore",
      academicStatus: "Good Standing",
      course: "Physics",
      yearStanding: "Junior",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Jennifer Jackson",
      academicStatus: "Good Standing",
      course: "History",
      yearStanding: "Senior",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "William White",
      academicStatus: "Probation",
      course: "Economics",
      yearStanding: "Freshman",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Elizabeth Harris",
      academicStatus: "Good Standing",
      course: "Sociology",
      yearStanding: "Sophomore",
      enrollmentStatus: "Enrolled",
    },
    {
      fullName: "Thomas Clark",
      academicStatus: "Suspended",
      course: "Chemistry",
      yearStanding: "Senior",
      enrollmentStatus: "Not Enrolled",
    },
  ]);
  const [lastDate, setLastDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   async function getApplications() {
  //     try {
  //       const res = await api.get("/application/get-applications", {
  //         params: {
  //           lastDate,
  //           limit: 10,
  //           page: page,
  //           sort: "asc",
  //         },
  //       });

  //       setData(res.data.payload);
  //       setTotalPages(res.data.totalPages);
  //     } catch (err) {
  //       console.error({
  //         status: err.response.status,
  //         error: err.response.data.error,
  //       });
  //     }
  //   }

  //   getApplications();
  // }, [page]);

  return (
    <>
      <Table
        columnNames={[
          "Full Name",
          "Academic Status",
          "Program",
          "Year Standing",
          "Enrollment Status",
        ]}
        data={data}
				skipFirst={true}
        compressedAt={null}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
}
