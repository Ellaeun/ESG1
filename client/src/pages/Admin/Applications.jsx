import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useAppContext } from "../../context/AppContext.jsx";

import Table from "../../components/Table.jsx";
import Pagination from "../../components/Pagination.jsx";

Applications.propTypes = {

};

export default function Applications() {
  const { api } = useAppContext();
  const [data, setData] = useState([]);
  const [lastDate, setLastDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getApplications() {
      try {
        const res = await api.get("/application/get-applications", {
          params: {
            lastDate,
            limit: 10,
            page: page,
            sort: "asc",
          },
        });
  
        setData(res.data.payload);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error({
          status: err.response.status,
          error: err.response.data.error,
        });
      }
    }

    getApplications()
  }, [page])

  return (
    <>
      <Table
        columnNames={[
          "Full Name",
          "Applicant Type",
          "Applied Program",
          "Date Submitted",
          "Status",
        ]}
        data={data}
        skipFirst={true}
        compressedAt={null}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
}
