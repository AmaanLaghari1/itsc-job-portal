import { useNavigate } from "react-router-dom"
import DynamicDataTable from "../../../components/data_table/DynamicDataTable"
import { useEffect, useState } from "react";
import { getUser } from "../../../api/UserRequest.js";
import { getFullname } from "../../../helper";
import { Formik, Form } from "formik";
import * as Yup from 'yup'
import Modal from "../../../components/Modal.jsx";
import AssignRole from "./AssignRole.jsx";
import { CBadge } from "@coreui/react";
import FormControl from "../../../components/FormControl.jsx";
import { useSelector } from "react-redux";

const UsersAll = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedRowData, setSelectedRowData] = useState({})
  const [visible, setVisible] = useState(false)
  const currentRole = useSelector(state => state.roles.selectedRole)

  const handleView = (item) => {
    setVisible(true)
    setSelectedRowData(item)
  }

  const handleCloseModal = () => {
      setVisible(false);
  };

  const fetchData = async () => {
    try {
      const response = await getUser()
      setUsers(response.data.data)
      setFilteredUsers(response.data.data)
    } catch (error) {

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
      name: "Name",
      selector: (row) => getFullname(row.FIRST_NAME, row.LAST_NAME),
      sortable: true,
      width: "250px",
    },
    {
      name: "Father's Name",
      selector: (row) => row.FNAME,
      sortable: true,
      width: "250px",
    },
    {
      name: "CNIC No.",
      selector: (row) => row.CNIC_NO,
      sortable: true,
      style: {
      width: "50px",
      },
    },
    {
      name: "Roles",
      selector: (row) => (
        row.user_roles.map(item =>
            <CBadge className="m-1 text-dark" color='warning' key={item.role.ROLE_ID}>{item.role.ROLE_NAME}</CBadge>
        )
      ),
      sortable: true,
      wrap: true,
      style: {
      width: "50px",
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        currentRole == 1 ?
        <div className="d-flex align-items-center flex-wrap gap-1">
          <button className="btn btn-outline-success btn-sm"
            onClick={() => { handleView(row) }}
          >
            Edit Role
          </button>
        </div>
        : '-'
      ),
      ignoreRowClick: true,
      width: "150px",
    },
  ];

  const handleRoleChange = (selectedOption, setFieldValue) => {
    const selectedOpt = selectedOption.target.value
    setFieldValue('role_id', selectedOpt || '');

    if (selectedOpt != 5) {
      const filtered = users.filter(user =>
        user.user_roles?.some(role => role.ROLE_ID == selectedOpt)
      );

      setFilteredUsers(filtered); // Don't overwrite the original user list
    }
    else {
      setFilteredUsers(users)
    }
  };

  return (
    <div className="admin-dashboard">
      <Formik
        initialValues={{
          role_id: 5
        }}
        validationSchema={Yup.object({})}
      >
        {
          ({ setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="form-group col-3 my-2">
                  <FormControl
                    control='select'
                    className="form-control"
                    name="role_id"
                    id="role_id"
                    label=""
                    options={[
                      {
                        key: 5,
                        value: "All"
                      },
                      {
                        key: 1,
                        value: "Super Admin"
                      },
                      {
                        key: 2,
                        value: "Admin"
                      },
                      {
                        key: 3,
                        value: "Operator"
                      },
                      {
                        key: 4,
                        value: "Primary"
                      },
                    ]} // Options should be dynamically loaded if using async
                    onChange={(selectedOption) => {
                      handleRoleChange(selectedOption, setFieldValue)
                    }}
                  />
                </div>
              </div>
            </Form>
          )
        }

      </Formik>

      <DynamicDataTable
        title="Users"
        columns={columns}
        data={filteredUsers}
      />

      <Modal
        setVisible={setVisible}
        visible={visible}
        size={'md'}
        position='center'
        onClose={handleCloseModal}
      >
        <AssignRole user={selectedRowData} onRoleUpdate={() => {
          fetchData()
        }} />
      </Modal>
    </div>
  )
}

export default UsersAll