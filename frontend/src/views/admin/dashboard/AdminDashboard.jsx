import React, { useEffect, useState } from "react";
import * as API from '../../../api/AnnouncementRequest.js';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helper.js";
import DynamicDataTable from "../../../components/data_table/DynamicDataTable.jsx";
import AlertConfirm from "../../../components/AlertConfirm.js";
import Alert from "../../../components/Alert.js";
// import './Data-table.css';

const AdminDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.roles.selectedRole);

  // Fetch data from API
  async function fetchData() {
    const response = await API.getAnnouncement();
    setAnnouncements(response.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.ANNOUNCEMENT_ID,
      sortable: true,
      width: "80px",
    },
    {
      name: "Title",
      selector: (row) => row.ANNOUNCEMENT_TITLE,
      sortable: true,
      style: {
        minWidth: "200px",
        maxWidth: "300px",
      },
    },
    {
      name: "Position Name",
      selector: (row) => row.POSITION_NAME,
      sortable: true,
      wrap: true,
      style: {
        minWidth: "150px",
      },
    },
    {
      name: "Department",
      selector: (row) => row.department.DEPT_NAME,
      sortable: true,
      style: {
        minWidth: "150px",
      },
    },
    {
      name: "Start Date",
      selector: (row) => formatDate(row.START_DATE),
      sortable: true,
      width: "130px",
    },
    {
      name: "End Date",
      selector: (row) => formatDate(row.END_DATE),
      sortable: true,
      width: "130px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex align-items-center flex-wrap gap-1">
          <button className="btn btn-outline-success btn-sm"
          onClick={() => {
            navigate('/admin/announcement/edit',
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
          <button className="btn btn-outline-danger btn-sm"
          onClick={async () => {
                const confirmed = await AlertConfirm({
                  title: 'Delete item?',
                  text: 'This action cannot be undone.',
                });
                
                if (confirmed) {
                  try {
                    const response = await API.deleteAnnouncement(row.ANNOUNCEMENT_ID)
                    Alert({
                      status: true,
                      text: response.data?.message || 'Announcement deleted successfully'
                    })
                    setAnnouncements((prev) =>
                      prev.filter((item) => item.ANNOUNCEMENT_ID !== row.ANNOUNCEMENT_ID)
                    );
                  } catch (error) {
                    Alert({
                      status: false,
                      text: error.data?.message || 'Error deleting announcement'
                    })
                  }
                }
              }
            }
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      width: "120px",
    },
  ];

  const filteredData = (userRole == 1 || userRole == 2)
  ? announcements
  : announcements.filter(item => item.ACCESS_ID == userRole);

  return (
    <div className="admin-dashboard">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-2">
        <Link to="/admin/announcement/add" className="btn btn-primary btn-sm">
          Add New +
        </Link>
      </div>

      <DynamicDataTable
        title="Announcements"
        columns={columns}
        data={filteredData}
      />
    </div>
  );
};

export default AdminDashboard;
