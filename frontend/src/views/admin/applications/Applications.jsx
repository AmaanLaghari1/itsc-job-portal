import { useNavigate } from "react-router-dom"
import DynamicDataTable from "../../../components/data_table/DynamicDataTable"
import { useEffect, useMemo, useState } from "react";
import { getDeptWithAnnouncement } from "../../../api/UtilRequest.js";
import { formatDate, mapOptions } from "../../../helper";
import CustomSelect from "../../../components/CustomSelect.jsx";
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDeptId, setSelectedAnnouncementId } from "../../../slicers/applicationFilterSlice.js";
import { getAnnouncement } from "../../../api/AnnouncementRequest.js";
import { getApplicationByAnnouncementId } from "../../../api/ApplicationRequest.js";

const Applications = () => {
    const [applications, setApplications] = useState([])
    const navigate = useNavigate()
    const [deptData, setDeptData] = useState([])
    const [announcement, setAnnouncements] = useState([])


    const getAllAnnouncements = async () => {
      try {
        const response = await getAnnouncement()
        setAnnouncements(response.data?.data)
      } catch (error) {
        
      }
    }

    const dispatch = useDispatch();

    const selectedDeptId = useSelector(
      (state) => state.applicationFilter.selectedDeptId
    );
    const selectedAnnouncementId = useSelector(
      (state) => state.applicationFilter.selectedAnnouncementId
    );


  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        const response = await getDeptWithAnnouncement();
        setDeptData(response.data);

        if (selectedDeptId) {
          const selectedDept = response.data.find(item => item.DEPT_ID == selectedDeptId);
          if (selectedDept) {
            setAnnouncements(selectedDept.announcements);

            if (selectedAnnouncementId) {
              const selectedAnnouncement = selectedDept.announcements.find(
                (a) => a.ANNOUNCEMENT_ID == selectedAnnouncementId
              );
              if (selectedAnnouncement) {
                setApplications(selectedAnnouncement.applications);
              }
            }
          }
        }

      } catch (error) {
        console.error('Error loading dept/announcement data', error);
      }
    };

    fetchAndSet();
    getAllAnnouncements()
  }, []);

    
  const deptOptions = useMemo(() =>
    mapOptions(deptData, 'DEPT_ID', 'DEPT_NAME')
  )
    
  const announcementOptions = useMemo(() =>
    mapOptions(announcement, 'ANNOUNCEMENT_ID', 'ANNOUNCEMENT_TITLE')
  )
  // console.log(announcement)

  const columns = [
    {
      name: "ID",
      selector: (row) => row.APPLICATION_ID,
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
      name: "Paid Amount",
      selector: (row) => row.PAID_AMOUNT??'-',
      sortable: true,
      width: "130px",
    },
    {
      name: "Apply Date",
      selector: (row) => row.APPLY_DATE??'-',
      sortable: true,
      style: {
        minWidth: "100px",
      },
    },
    {
      name: "Paid Date",
      selector: (row) => row.PAID_DATE ? formatDate(row.PAID_DATE) :'-',
      sortable: true,
      width: "130px",
    },
    {
      name: "Status",
      selector: (row) => row.APPLICATION_STATUS == 1? 'Applied' : (row.APPLICATION_STATUS == 2 ? 'Unpaid' : (row.APPLICATION_STATUS == 4 ? 'Shortlisted' : (row.APPLICATION_STATUS == 3 ? 'Recieved' : 'Rejected'))),
      sortable: true,
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex align-items-center flex-wrap gap-1">
          <button className="btn btn-outline-warning btn-sm"
          onClick={() => {
            navigate('/admin/application/edit',
              {
                state: {
                  prevData: row,
                  announcement: announcement.filter(item => item.ANNOUNCEMENT_ID === row.ANNOUNCEMENT_ID),
                }
              }

            )
          }}
          >
            View
          </button>
          <button className="btn btn-outline-success btn-sm"
          onClick={() => {
            navigate('/admin/application/update-user',
              {
                state: {
                  prevData: row
                }
              }
            )
          }}
          >
            Update User
          </button>
          <button className="btn btn-outline-danger btn-sm">Delete</button>
        </div>
      ),
      ignoreRowClick: true,
      width: "220px",
    },
  ];

  const handleDeptChange = (selectedOption, setFieldValue) => {
    setFieldValue('dept_id', selectedOption?.key || '')
    const deptId = selectedOption?.key || '';
    const selectedDept = deptData.filter(item => item.DEPT_ID == selectedOption.key)
    dispatch(setSelectedDeptId(deptId));
    setAnnouncements(selectedDept[0].announcements)
  }
  
  const handleAnnouncementChange = async (selectedOption, setFieldValue) => {
  setFieldValue('announcement_id', selectedOption?.key || '')
  const announcementId = selectedOption?.key || '';
  const selectedAnnouncement = announcement.find(
    item => item.ANNOUNCEMENT_ID == selectedOption?.key
  );
  dispatch(setSelectedAnnouncementId(announcementId));
  try {
    const response = await getApplicationByAnnouncementId(announcementId)
    // console.log(response)
    setApplications(response.data)
  } catch (error) {
    
  }

  // if (selectedAnnouncement && selectedAnnouncement.applications) {
  //   setApplications(selectedAnnouncement.applications);
  // } else {
  //   // setApplications([]); // fallback to empty array
  // }
};

const filteredData = Array.isArray(applications) ? applications.map(item => item) : [];

  
  return (
    <div className="admin-dashboard">
      <Formik
        enableReinitialize
        initialValues={{
          dept_id: selectedDeptId,
          announcement_id: selectedAnnouncementId
        }}
        validationSchema={Yup.object({})}
      >

        {
          ({setFieldValue}) => (
            <Form>
              <div className="row">
                <div className="form-group col-6 my-2">
                  <CustomSelect
                  className="form-control bg-primary text-light"
                  label="Select Department"
                  name="dept_id"
                  options={deptOptions} // Options should be dynamically loaded if using async
                  onChange={(selectedOption) => {
                    handleDeptChange(selectedOption, setFieldValue)
                    
                  }}
                  required={true}
                  />
                </div>
                <div className="form-group col-6 my-2">
                  <CustomSelect
                  className="form-control bg-primary text-light"
                  label="Select Announcement"
                  name="announcement_id"
                  options={announcementOptions || []} // Options should be dynamically loaded if using async
                  onChange={(selectedOption) => {
                    handleAnnouncementChange(selectedOption, setFieldValue)
                  }}
                  required={true}
                  />
                </div>
              </div>
            </Form>
          )
        }

      </Formik>

      <DynamicDataTable
        title="Applications"
        columns={columns}
        data={filteredData}
      />
    </div>
  )
}

export default Applications