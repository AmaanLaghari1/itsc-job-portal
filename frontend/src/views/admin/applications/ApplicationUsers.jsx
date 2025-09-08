import { Link } from "react-router-dom"
import DynamicDataTable from "../../../components/data_table/DynamicDataTable"
import { useEffect, useState } from "react";
import * as API from '../../../api/ApplicationRequest.js';
import { useSelector } from "react-redux";
import { formatDate } from "../../../helper";

const Applications = () => {
    const auth = useSelector(state => state.auth.authData)
    const [applications, setApplications] = useState([])
    // Fetch data from API
    async function fetchData() {
      try {
        const response = await API.getApplication(auth.user.USER_ID);
        setApplications(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchData();
    }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.USER_ID,
      sortable: true,
      width: "80px",
    },
    {
      name: "Candidate Name",
      selector: (row) => row.FIRST_NAME +' '+ row.LAST_NAME,
      sortable: true,
      width: "250px",
      style: {
        minWidth: "250px",
        maxWidth: "300px",
      },
    },
    {
      name: "CNIC No.",
      selector: (row) => row.CNIC_NO,
      sortable: true,
      wrap: true,
      style: {
        minWidth: "150px",
      },
    },
    {
      name: "Father's Name",
      selector: (row) => row.FNAME??'-',
      sortable: true,
      width: "150px",
    },
    {
      name: "CNIC Expiry Date",
      selector: (row) => row.APPLY_DATE??'-',
      sortable: true,
      style: {
        minWidth: "80px",
      },
    },
    {
      name: "Date of Birth",
      selector: (row) => row.DATE_OF_BIRTH ? formatDate(row.PAID_DATE) :'-',
      sortable: true,
      width: "130px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex align-items-center flex-wrap gap-1">
          <button className="btn btn-outline-success btn-sm"
          onClick={() => {
            navigate('/announcement-edit',
              {
                state: {
                  prevData: row
                }
              }
            )
          }}
          >
            Edit
          </button>
          <button className="btn btn-outline-danger btn-sm">Delete</button>
        </div>
      ),
      ignoreRowClick: true,
      width: "120px",
    },
  ];

  const filteredData = applications.map((item) =>
    // hasRole(item.ACCESS_ID)
    item
  );

  
  return (
    <div className="admin-dashboard">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-2">
        <Link to="/announcement-add" className="btn btn-primary btn-sm">
          Add New +
        </Link>
      </div>

      <DynamicDataTable
        title="Application Users"
        columns={columns}
        data={filteredData}
      />
    </div>
  )
}

export default Applications