import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import {
  getAssignedAnnouncements,
} from "../../../api/AnnouncementRequest";

import {
  getApplicationByAnnouncementId,
} from "../../../api/ApplicationRequest";

import { formatDate, mapOptions } from "../../../helper";

import CustomSelect from "../../../components/CustomSelect";
import DynamicDataTable from "../../../components/data_table/DynamicDataTable";
import ScrutinyTable from "./ScrutinyTable";

const STORAGE_KEYS = {
  ANNOUNCEMENTS: "scrutiny_announcements",
  APPLICATIONS: "scrutiny_applications",
  SELECTED: "scrutiny_selected_announcement",
};

const ApplicationsScrutiny = () => {
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.authData.user
  );

  const [announcements, setAnnouncements] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState("");

  const fetchAssignedAnnouncements = async () => {
    try {
      const cached = sessionStorage.getItem(
        STORAGE_KEYS.ANNOUNCEMENTS
      );

      const response = await getAssignedAnnouncements({
        user_id: user.USER_ID,
      });

      // console.log(response)

      setAnnouncements(response.data || []);

      sessionStorage.setItem(
        STORAGE_KEYS.ANNOUNCEMENTS,
        JSON.stringify(response.data || [])
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = useCallback(async (announcementId) => {
    try {
      const { data } =
        await getApplicationByAnnouncementId(
          announcementId
        );

      const filtered =
        data?.filter(
          (item) =>
            Number(item.APPLICATION_STATUS) === 1
        ) || [];

      setApplications(filtered);

      sessionStorage.setItem(
        STORAGE_KEYS.APPLICATIONS,
        JSON.stringify(filtered)
      );

      sessionStorage.setItem(
        STORAGE_KEYS.SELECTED,
        announcementId
      );
    } catch (error) {
      console.error(error);
      setApplications([]);
    }
  }, []);

  useEffect(() => {
    fetchAssignedAnnouncements();

    const cachedApps = sessionStorage.getItem(
      STORAGE_KEYS.APPLICATIONS
    );

    const cachedSelected = sessionStorage.getItem(
      STORAGE_KEYS.SELECTED
    );

    if (cachedApps) {
      setApplications(JSON.parse(cachedApps));
    }

    if (cachedSelected) {
      setSelectedAnnouncement(cachedSelected);
    }
  }, []);

  const announcementOptions = useMemo(
    () =>
      mapOptions(
        announcements,
        "ANNOUNCEMENT_ID",
        "ANNOUNCEMENT_TITLE"
      ),
    [announcements]
  );

  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.APPLICATION_ID,
        sortable: true,
        width: "80px",
      },
      {
        name: "Candidate Name",
        selector: (row) =>
          `${row.FIRST_NAME} ${row.LAST_NAME}`,
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
          row.PAID_DATE
            ? formatDate(row.PAID_DATE)
            : "-",
        sortable: true,
        width: "130px",
      },
      {
        name: "Status",
        selector: (row) => {
          const statuses = {
            1: "Applied",
            2: "Unpaid",
            3: "Received",
            4: "Shortlisted",
          };

          return (
            statuses[row.APPLICATION_STATUS] ||
            "Rejected"
          );
        },
        sortable: true,
        width: "120px",
      },
      {
        name: "Actions",
        cell: (row) => {
          const announcement = announcements.find(
            (item) =>
              item.ANNOUNCEMENT_ID ===
              row.ANNOUNCEMENT_ID
          );

          return (
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={() =>
                navigate(
                  "/admin/scrutiny/application_review",
                  {
                    state: {
                      prevData: row,
                      announcement,
                    },
                  }
                )
              }
            >
              View
            </button>
          );
        },
        ignoreRowClick: true,
      },
    ],
    [announcements, navigate]
  );

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          announcement_id: selectedAnnouncement || "",
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <CustomSelect
              label="Select Announcement"
              name="announcement_id"
              options={announcementOptions}
              onChange={(option) => {
                setFieldValue("announcement_id", option.key);

                setSelectedAnnouncement(option.key);

                sessionStorage.setItem(
                  "selected_announcement",
                  option.key
                );

                fetchApplications(option.key);
              }}
            />
          </Form>
        )}
      </Formik>

      <DynamicDataTable
        title="Applied Applicants"
        columns={columns}
        data={applications}
      />

      <ScrutinyTable announcement={selectedAnnouncement} columns={columns} />
    </div>
  );
};

export default React.memo(ApplicationsScrutiny);