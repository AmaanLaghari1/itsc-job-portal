import DynamicDataTable from "../../../components/data_table/DynamicDataTable";
import { useEffect, useState } from "react";
import { getUser } from "../../../api/UserRequest.js";
import { getFullname } from "../../../helper.js";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import Modal from "../../../components/Modal.jsx";
import AssignRole from "./AssignRole.jsx";
import { CBadge, CSpinner } from "@coreui/react";
import FormControl from "../../../components/FormControl.jsx";
import { useSelector } from "react-redux";
import AlertConfirm from "../../../components/AlertConfirm.js";
import { updateUserPassword } from "../../../api/AuthRequest.js";
import Alert from "../../../components/Alert.js";

const UsersAll = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState(""); // For toggling between "role" and "password"
  const currentRole = useSelector(state => state.roles.selectedRole);

  const handleView = (item, actionType) => {
    setVisible(true);
    setSelectedRowData(item);
    setAction(actionType); // Set the action to either 'role' or 'password'
  };

  const handleCloseModal = () => {
    setVisible(false);
    setAction(""); // Reset action when modal is closed
  };

  const fetchData = async () => {
    try {
      const response = await getUser();
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      // Handle error
    }
  };

  const handleChangePwd = async (user) => {
    const confirm = await AlertConfirm({
      title: 'Update Password',
      text: "Are you sure you want to update the password for this user?",
    });

    if (!confirm) return;

    setLoading(true);

    try {
      const response = await updateUserPassword(user.USER_ID);

      if (response?.data?.new_password) {
        const updatedUser = { ...user, new_password: response.data.new_password };

        setSelectedRowData(updatedUser);
        setAction('password');
        setVisible(true);
      } else {
        // throw new Error('Password not returned from server.');
      }
    } catch (error) {
      // console.error(error);
      Alert({ status: false, text: 'Failed to update the password.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { name: "ID", selector: (row) => row.USER_ID, sortable: true, width: "80px" },
    { name: "Name", selector: (row) => getFullname(row.FIRST_NAME, row.LAST_NAME), sortable: true, width: "250px" },
    { name: "Father's Name", selector: (row) => row.FNAME, sortable: true, width: "250px" },
    { name: "CNIC No.", selector: (row) => row.CNIC_NO, sortable: true, style: { width: "180px" } },
    {
      name: "Roles",
      selector: (row) => (
        row.user_roles.map(item => (
          <CBadge className="m-1 text-dark" color='warning' key={item.role.ROLE_ID}>
            {item.role.ROLE_NAME}
          </CBadge>
        ))
      ),
      sortable: true,
      wrap: true,
      style: { width: "50px" },
    },
    {
      name: "Actions",
      cell: (row) => (
        currentRole === 1 || currentRole === 2 ? (
          <div className="d-flex align-items-center flex-wrap gap-1">
            <button className="btn btn-outline-success btn-sm" onClick={() => handleView(row, 'role')}>
              Edit Role
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => handleChangePwd(row)}
              disabled={loading}
            >
              Update Password
            </button>
          </div>
        ) : '-'
      ),
      ignoreRowClick: true,
      width: "220px",
    },
  ];

  const handleRoleChange = (selectedOption, setFieldValue) => {
    const selectedOpt = selectedOption.target.value;
    setFieldValue('role_id', selectedOpt || '');
    if (selectedOpt !== 5) {
      const filtered = users.filter(user => user.user_roles?.some(role => role.ROLE_ID == selectedOpt));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className={`position-relative`}>
        {/* Blur effect overlay */}
        {loading && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-50 backdrop-blur-sm"
            style={{ zIndex: 999 }}
          />
        )}
      </div>
      <Formik
        initialValues={{ role_id: 5 }}
        validationSchema={Yup.object({})}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="form-group col-3 my-2">
                <FormControl
                  control="select"
                  className="form-control"
                  name="role_id"
                  id="role_id"
                  label=""
                  options={[
                    { key: 5, value: "All" },
                    { key: 1, value: "Super Admin" },
                    { key: 2, value: "Admin" },
                    { key: 3, value: "Operator" },
                    { key: 4, value: "Primary" },
                  ]}
                  onChange={(selectedOption) => handleRoleChange(selectedOption, setFieldValue)}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <DynamicDataTable
        title="Users"
        columns={columns}
        data={filteredUsers}
      />

      <Modal
        setVisible={setVisible}
        visible={visible}
        size="md"
        position="center"
        onClose={handleCloseModal}
      >
        {action === 'role' && (
          <>
            <h3>Edit User Role</h3>
            <AssignRole
              user={selectedRowData}
              onRoleUpdate={() => fetchData()}
            />
          </>
        )}
        {action === 'password' && (
          <>
            <h3>Password Successfully Updated</h3>
            <p className="lead">
              The password for <strong>{getFullname(selectedRowData.FIRST_NAME, selectedRowData.LAST_NAME)}</strong> has been successfully updated.
            </p>
            <p>
              The new password is: <strong className="text-primary">{selectedRowData.new_password}</strong>
            </p>
            <p>
              An email containing the new password has been sent to <strong>{selectedRowData.EMAIL}</strong>. Please advise the user to check their inbox or spam folder.
            </p>
          </>

        )}
      </Modal>
      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-50"
          style={{
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 1050,
          }}
        >
          <div className="text-center">
            <CSpinner color="primary" />
            <div className="mt-2 display-6">Updating password...</div>
          </div>
        </div>
      )}
    </div>




  );
};

export default UsersAll;
