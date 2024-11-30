import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useAppContext } from "../../context/AppContext.jsx";

import Table from "../../components/Table.jsx";
import Pagination from "../../components/Pagination.jsx";

AcademicRecord.propTypes = {};

export default function AcademicRecord() {
  const { api } = useAppContext();
  const [data, setData] = useState([
    {
      courseCode: "CS101",
      courseTitle: "Introduction to Computer Science",
      yearSemTaken: "2023-1",
      finalGrade: "1.0",
      instructor: "Dr. John Doe",
    },
    {
      courseCode: "MATH202",
      courseTitle: "Calculus II",
      yearSemTaken: "2023-1",
      finalGrade: "1.5",
      instructor: "Prof. Sarah Lee",
    },
    {
      courseCode: "ENG101",
      courseTitle: "English Literature",
      yearSemTaken: "2023-2",
      finalGrade: "2.0",
      instructor: "Dr. James Miller",
    },
    {
      courseCode: "PHY101",
      courseTitle: "Physics I",
      yearSemTaken: "2023-2",
      finalGrade: "2.5",
      instructor: "Prof. Michael Smith",
    },
    {
      courseCode: "CHEM101",
      courseTitle: "Chemistry I",
      yearSemTaken: "2023-1",
      finalGrade: "2.7",
      instructor: "Dr. Linda Harris",
    },
    {
      courseCode: "BIO102",
      courseTitle: "Biology I",
      yearSemTaken: "2023-1",
      finalGrade: "1.0",
      instructor: "Prof. David Clark",
    },
    {
      courseCode: "CS201",
      courseTitle: "Data Structures",
      yearSemTaken: "2023-2",
      finalGrade: "1.0",
      instructor: "Dr. Robert White",
    },
    {
      courseCode: "MATH203",
      courseTitle: "Linear Algebra",
      yearSemTaken: "2023-1",
      finalGrade: "2.5",
      instructor: "Prof. Emily Thomas",
    },
    {
      courseCode: "SOC101",
      courseTitle: "Introduction to Sociology",
      yearSemTaken: "2023-2",
      finalGrade: "1.7",
      instructor: "Dr. Patricia Green",
    },
    {
      courseCode: "HIST101",
      courseTitle: "World History",
      yearSemTaken: "2023-1",
      finalGrade: "3.0",
      instructor: "Prof. Charles Brown",
    },
    {
      courseCode: "PSY101",
      courseTitle: "Psychology Basics",
      yearSemTaken: "2023-2",
      finalGrade: "1.5",
      instructor: "Dr. Jennifer Wilson",
    },
    {
      courseCode: "ECON201",
      courseTitle: "Microeconomics",
      yearSemTaken: "2023-2",
      finalGrade: "1.0",
      instructor: "Prof. William Moore",
    },
    {
      courseCode: "ART101",
      courseTitle: "Art History",
      yearSemTaken: "2023-1",
      finalGrade: "2.7",
      instructor: "Dr. Karen Davis",
    },
    {
      courseCode: "CS301",
      courseTitle: "Algorithms",
      yearSemTaken: "2023-2",
      finalGrade: "1.0",
      instructor: "Prof. Christopher Jackson",
    },
    {
      courseCode: "STAT101",
      courseTitle: "Statistics for Engineers",
      yearSemTaken: "2023-1",
      finalGrade: "2.0",
      instructor: "Dr. Laura Wilson",
    },
  ]);
  const [lastDate, setLastDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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

  //   getApplications()
  // }, [page])

  return (
    <div className="w-full">
      <Table
        columnNames={[
          "Course Code",
          "Course Title",
          "Year & Sem Taken",
          "Final Grade",
          "Instructor",
        ]}
        data={data}
        skipFirst={false}
        compressedAt={2}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
