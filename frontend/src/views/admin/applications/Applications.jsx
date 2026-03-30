import { useNavigate } from "react-router-dom";
import DynamicDataTable from "../../../components/data_table/DynamicDataTable";
import { useEffect, useMemo, useState } from "react";
import { getDeptWithAnnouncement } from "../../../api/UtilRequest.js";
import { formatDate, mapOptions } from "../../../helper";
import CustomSelect from "../../../components/CustomSelect.jsx";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDeptId,
  setSelectedAnnouncementId,
} from "../../../slicers/applicationFilterSlice.js";
import { getApplicationByAnnouncementId } from "../../../api/ApplicationRequest.js";
import { getAnnouncement } from "../../../api/AnnouncementRequest.js";

const Applications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deptData, setDeptData] = useState([]);
  const [announcement, setAnnouncements] = useState([]);
  const [applications, setApplications] = useState([]);

  const selectedDeptId = useSelector(
    (state) => state.applicationFilter.selectedDeptId
  );
  const selectedAnnouncementId = useSelector(
    (state) => state.applicationFilter.selectedAnnouncementId
  );

  /* ----------------------------------
     Load departments once
  ---------------------------------- */
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDeptWithAnnouncement();
        setDeptData(response.data || []);
      } catch (error) {
        console.error("Error loading departments", error);
      }
    };

    const getAllAnnouncements = async () => { 
      try { 
        const response = await getAnnouncement() 
        setAnnouncements(response.data?.data) 
      } catch (error) {
        console.log(error)
      } 
  }

    fetchDepartments();
    getAllAnnouncements();
  }, []);

  /* ----------------------------------
     Load announcements when dept changes
  ---------------------------------- */
  useEffect(() => {
    if (!selectedDeptId || deptData.length === 0) return;

    const selectedDept = deptData.find(
      (d) => d.DEPT_ID == selectedDeptId
    );

    if (selectedDept) {
      setAnnouncements(selectedDept.announcements || []);
    } else {
      setAnnouncements([]);
    }
  }, [selectedDeptId, deptData]);

  /* ----------------------------------
     Load applications when announcement changes
  ---------------------------------- */
  useEffect(() => {
    if (!selectedAnnouncementId) return;

    const fetchApplications = async () => {
      try {
        const response = await getApplicationByAnnouncementId(
          selectedAnnouncementId
        );
        setApplications(response.data || []);
      } catch (error) {
        console.error("Error loading applications", error);
        setApplications([]);
      }
    };

    fetchApplications();
  }, [selectedAnnouncementId]);

  /* ----------------------------------
     Select options
  ---------------------------------- */
  const deptOptions = useMemo(
    () => mapOptions(deptData, "DEPT_ID", "DEPT_NAME"),
    [deptData]
  );

  const announcementOptions = useMemo(
    () =>
      mapOptions(
        announcement,
        "ANNOUNCEMENT_ID",
        "ANNOUNCEMENT_TITLE"
      ),
    [announcement]
  );

  /* ----------------------------------
     Table columns
  ---------------------------------- */
  const columns = [
    {
      name: "ID",
      selector: (row) => row.APPLICATION_ID,
      sortable: true,
      width: "80px",
    },
    {
      name: "Candidate Name",
      selector: (row) => `${row.FIRST_NAME} ${row.LAST_NAME}`,
      sortable: true,
      width: "250px",
    },
    {
      name: "CNIC No.",
      selector: (row) => row.CNIC_NO,
      sortable: true,
      width: "150px",
    },
    {
      name: "Paid Amount",
      selector: (row) => row.PAID_AMOUNT ?? "-",
      sortable: true,
      width: "130px",
    },
    {
      name: "Apply Date",
      selector: (row) => row.APPLY_DATE ?? "-",
      sortable: true,
    },
    {
      name: "Paid Date",
      selector: (row) =>
        row.PAID_DATE ? formatDate(row.PAID_DATE) : "-",
      sortable: true,
      width: "130px",
    },
    {
      name: "Status",
      selector: (row) =>
        row.APPLICATION_STATUS == 1
          ? "Applied"
          : row.APPLICATION_STATUS == 2
          ? "Unpaid"
          : row.APPLICATION_STATUS == 3
          ? "Received"
          : row.APPLICATION_STATUS == 4
          ? "Shortlisted"
          : "Rejected",
      sortable: true,
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={() =>
              navigate("/admin/application/edit", {
                state: { 
                  prevData: row,
                  announcement: announcement.filter(item => item.ANNOUNCEMENT_ID === row.ANNOUNCEMENT_ID)
                 },
              })
            }
          >
            View
          </button>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() =>
              navigate("/admin/application/update-user", {
                state: { prevData: row },
              })
            }
          >
            Update User
          </button>
        </div>
      ),
      ignoreRowClick: true,
      width: "220px",
    },
  ];

  /* ----------------------------------
     Handlers
  ---------------------------------- */
  const handleDeptChange = (selectedOption, setFieldValue) => {
    const deptId = selectedOption?.key || "";
    setFieldValue("dept_id", deptId);
    dispatch(setSelectedDeptId(deptId));
    dispatch(setSelectedAnnouncementId(""));
    setApplications([]);
  };

  const handleAnnouncementChange = (selectedOption, setFieldValue) => {
    const announcementId = selectedOption?.key || "";
    setFieldValue("announcement_id", announcementId);
    dispatch(setSelectedAnnouncementId(announcementId));
  };

  return (
    <div className="admin-dashboard">
      <Formik
        enableReinitialize
        initialValues={{
          dept_id: selectedDeptId || "",
          announcement_id: selectedAnnouncementId || "",
        }}
        validationSchema={Yup.object({})}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-6 my-2">
                <CustomSelect
                  label="Select Department"
                  name="dept_id"
                  options={deptOptions}
                  onChange={(opt) =>
                    handleDeptChange(opt, setFieldValue)
                  }
                />
              </div>

              <div className="col-6 my-2">
                <CustomSelect
                  label="Select Announcement"
                  name="announcement_id"
                  options={announcementOptions}
                  onChange={(opt) =>
                    handleAnnouncementChange(opt, setFieldValue)
                  }
                  required
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <DynamicDataTable
        title="Applications"
        columns={columns}
        data={Array.isArray(applications) ? applications : []}
      />
    </div>
  );
};

export default Applications;
