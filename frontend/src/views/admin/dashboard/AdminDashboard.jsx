import { useEffect, useState } from "react";
import * as API from '../../../api/AnnouncementRequest.js';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helper.js";
import DynamicDataTable from "../../../components/data_table/DynamicDataTable.jsx";
import AlertConfirm from "../../../components/AlertConfirm.js";
import Alert from "../../../components/Alert.js";
import { CButton } from "@coreui/react";
// import './Data-table.css';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CIcon from "@coreui/icons-react";
import { cilArrowThickBottom, cilPlus } from "@coreui/icons";

const AdminDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.roles.selectedRole);
  const [selectableRows, setSelectedRows] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch data from API
  async function fetchData() {
    const response = await API.getAnnouncement();
    setAnnouncements(response.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);


  const generateReport = async () => {
    try {
      if (selectableRows.length === 0) {
        Alert({
          status: false,
          text: "Please select at least one announcement to generate a report.",
        });
        return;
      }

      const announcementIds = selectableRows.map((row) => row.ANNOUNCEMENT_ID);

      const response = await API.getReport({ announcement_ids: announcementIds });
      const reportData = response.data?.data || [];

      if (reportData.length === 0) {
        Alert({
          status: false,
          text: "No data found for the selected announcements.",
        });
        return;
      }

      const doc = new jsPDF();

      doc.setFontSize(12);
      doc.text("USindh Careers Report", 14, 12);

      // Headers
      const headers = Object.keys(reportData[0]).map((key) => ({
        header: key,
        dataKey: key,
      }));

      // Body rows
      const body = reportData.map(row => headers.map(h => row[h.dataKey]));

      // ---------------------------
      // Calculate totals for numeric columns
      // ---------------------------
      const totals = headers.map((h, index) => {
        const values = reportData.map(d => Number(d[h.dataKey]));
        const isNumeric = values.every(v => !isNaN(v));

        if (index === 0) return "SUM TOTAL";     // First column label
        if (!isNumeric) return "";            // Non-numeric fields → blank

        const sum = values.reduce((a, b) => a + b, 0);
        return sum;
      });

      // Add totals row to body
      body.push(totals);

      // Generate table
      autoTable(doc, {
        startY: 20,
        head: [headers.map(h => h.header)],
        body,
        styles: { fontSize: 8 },
        headStyles: { fontSize: 8, fillColor: [0, 102, 204] },
        columnStyles: { fontSize: 8 },
        didParseCell: (data) => {
          // Make totals row bold
          if (data.row.index === body.length - 1) {
            data.cell.styles.fontStyle = "bold";
          }
        }
      });

      doc.save("announcement_report.pdf");

    } catch (error) {
      console.error(error);
      Alert({
        status: false,
        text: "Failed to generate PDF report.",
      });
    }
  };


  const generateApplicationsReport = async () => {
    setLoading(true)
    try {
      if (selectableRows.length === 0) {
        Alert({
          status: false,
          text: "Please select at least one announcement to generate a report.",
        });
        setLoading(false)
        return;
      }

      // Extract selected announcement IDs
      const announcementIds = selectableRows.map(r => r.ANNOUNCEMENT_ID);

      // Request PDF from backend
      const response = await API.downloadApplicationsReport({
        announcement_ids: announcementIds
      });

      // Create PDF blob
      const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      // Trigger download
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "applications_report.pdf";
      link.click();
      link.remove();

    } catch (error) {
      console.error(error);
      Alert({
        status: false,
        text: "Failed to download applications report.",
      });
    }
    setLoading(false)
  };

  const generateCandidatesReport = async () => {
    setLoading(true)
    try {
      if (selectableRows.length === 0) {
        Alert({
          status: false,
          text: "Please select at least one announcement to generate a report.",
        });
        setLoading(false)
        return;
      }

      // Extract selected announcement IDs
      const announcementIds = selectableRows.map(r => r.ANNOUNCEMENT_ID);

      // Request PDF from backend
      const response = await API.downloadCandidatesReport({
        announcement_ids: announcementIds
      });

      // Create PDF blob
      const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      // Trigger download
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "candidates_report.pdf";
      link.click();
      link.remove();

    } catch (error) {
      console.error(error);
      Alert({
        status: false,
        text: "Failed to download candidates report.",
      });
    }
    setLoading(false)
  };

  const generateApplicationExperienceReport = async () => {
    setLoading(true)
    try {
      if (selectableRows.length === 0) {
        Alert({
          status: false,
          text: "Please select at least one announcement to generate a report.",
        });
        setLoading(false)
        return;
      }

      // Extract selected announcement IDs
      const announcementIds = selectableRows.map(r => r.ANNOUNCEMENT_ID);

      // Request PDF from backend
      const response = await API.downloadApplicationExperienceReport({
        announcement_ids: announcementIds
      });

      // Create PDF blob
      const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      // Trigger download
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "applications_experience_report.pdf";
      link.click();
      link.remove();

    } catch (error) {
      console.error(error);
      Alert({
        status: false,
        text: "Failed to download experience report.",
      });
    }
    setLoading(false)
  };

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
      <Link to="/admin/announcement/add" className="btn btn-primary btn-sm me-2">
        Add New <CIcon icon={cilPlus} />
      </Link>
      <CButton
        size="sm"
        variant="secondary"
        onClick={() => generateReport()}
      >
        Application Statistics <CIcon icon={cilArrowThickBottom}  />
      </CButton>
      <CButton
        size="sm"
        variant="secondary"
        disabled={loading}
        className="mx-2 text-light"
        onClick={() => generateApplicationsReport()}
      >
        Scrutiny Report <CIcon icon={cilArrowThickBottom}  />
      </CButton>
      <CButton
        size="sm"
        variant="secondary"
        disabled={loading}
        className="text-light"
        onClick={() => generateApplicationExperienceReport()}
      >
        Experience Report <CIcon icon={cilArrowThickBottom}  />
      </CButton>

      <CButton
        size="sm"
        variant="secondary"
        disabled={loading}
        className="mx-2 text-light"
        onClick={() => generateCandidatesReport()}
      >
        Candidates Report <CIcon icon={cilArrowThickBottom}  />
      </CButton>

      <DynamicDataTable
        title="Announcements"
        columns={columns}
        data={filteredData}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
      />

    </div>
  );
};

export default AdminDashboard;
