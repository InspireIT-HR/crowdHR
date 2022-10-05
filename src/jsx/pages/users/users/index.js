import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "../../../../store/withReducer";
import reducer from "./store";

import DefaultTable from "../../../components/table/DefaultTable";
import { getUsers, selectUsers, setFilterField,updateUserRequest,removeUserRequest } from "./store/usersSlice";
import { getCompanies, selectCompanies } from "./store/companiesSlice";
import Select from "react-select";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import ConfirmModal from '../../../components/ConfirmModal';

const Users = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectUsers);
  const companies = useSelector(selectCompanies);
  const filters = useSelector(({ userApp }) => userApp.users.filters);
  const [filteredData, setFilteredData] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [initialValues, setInitialValues] = useState();
  const handleClose = () => setShowEdit(false);
  const handleShow = (data) => {setShowEdit(true); setInitialValues({
    firstname:data.firstname,
    lastname:data.lastname,
    email:data.email,
    linkedinPage:data.linkedinPage,
    description:data.role.description,
    password:''
  }) };
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');
  const schema = yup.object().shape({
    firstname: yup.string()
      .required('Please enter a firstname'),
  });
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCompanies());
    var arr = [];
    arr.push({ value: null, label: "All" });
    companies.forEach((item) => {
      arr.push({ value: item.id, label: item.name });
    });
    setCompanyFilter(arr);
  }, [dispatch]);
  
  // useEffect(() => {
  //   console.log(selectedCompany);
  // }, [selectedCompany]);

  useEffect(() => {
    const newData = [];
    data.forEach((d) => {
      if (filters.name.selectedValue) {
        if (
          d.fullname.toLowerCase().indexOf(filters.name.selectedValue) === -1
        ) {
          return;
        }
      }

      if (filters.role.selectedValue) {
        if (d.role.description !== filters.role.selectedValue) {
          return;
        }
      }
      if (selectedCompany !== null) {
        if (d.customerId !== selectedCompany.value) {
          return;
        }
      }
      newData.push(d);
    });

    setFilteredData(newData);
  }, [
    data,
    filters.name.selectedValue,
    filters.role.selectedValue,
    selectedCompany,
  ]);
  const sendPasswordReset = (data) => {
    dispatch(updateUserRequest(data))
}
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstname",
        sortable: true,
      },
      {
        Header: "Last Name",
        accessor: "lastname",
        sortable: true,
      },
      {
        Header: "Email",
        accessor: "email",
        sortable: true,
      },
      {
        Header: "Linkedin Page",
        accessor: "linkedinPage",
        sortable: true,
      },
      {
        Header: "Role",
        accessor: "role.description",
        sortable: true,
      },
      {
        Header: "Actions",
        accessor: "",
        sortable: true,
        Cell: (props) => {
          return (
            <>
              <button
              type="button"
              
                className="btn btn-primary shadow btn-xs sharp me-1"
                // onClick={() => dispatch(openEditAttachmentTypeModal(props.row.original))}
                // onClick={() => {}}
                onClick={()=>handleShow(props.row.original)}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="btn btn-danger shadow btn-xs sharp"
                onClick={() => {
                  setConfirmModalData(props.row.original.id);
                  setShowConfirmModal(true);
                }}
              >
                <i className="fa fa-trash"></i>
              </button>
              <button
                className="btn btn-danger shadow btn-xs sharp"
                onClick={() => {
                  sendPasswordReset(props.row.original.id)
                }}
              >
                <i className="fa fa-paper-plane"></i>
              </button>
            </>
          );
        },
      },
    ],
    []
  );
  const handleOnSubmit = (data) => {
      dispatch(updateUserRequest(data))
  }
  const handleRemove = (data) => {
    dispatch(removeUserRequest(data));
  }
  const customFilter = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <label htmlFor="filter-name">Name:</label>
        <input
          id="filter-name"
          className="input-search form-control"
          onChange={(ev) =>
            dispatch(
              setFilterField({ field: "name", value: ev.target.value || "" })
            )
          }
          value={filters.name.selectedValue}
        />
      </div>
      <div className="mx-4" style={{ minWidth: "200px" }}>
        <label htmlFor="filter-role">Role:</label>
        <Select
          defaultValue={""}
          onChange={(value) =>
            dispatch(
              setFilterField({ field: "role", value: value.description })
            )
          }
          options={filters.role.values}
          getOptionLabel={(o) => o.displayValue}
          getOptionValue={(o) => o.description}
          value={filters.role.values.find(
            (r) => r.id === filters.role.selectedValue
          )}
        />
      </div>
      <div className="mx-4" style={{ minWidth: "200px" }}>
        <label htmlFor="filter-company">Company:</label>
        <Select
          // defaultValue={companyFilter[0]}
          onChange={(value) => setSelectedCompany(value)}
          options={companyFilter}
          // getOptionLabel={(o) => o.displayValue}
          // getOptionValue={(o) => o.indexOf}
          // value={selectedCompany}
        />
      </div>
    </div>
  );

  return (
    <div>
      <DefaultTable
        data={filteredData}
        columns={columns}
        motherMenu="sidebar.users.user"
        activeMenu="sidebar.users.userList"
        usePageTitle
        customFilter={customFilter}
      />
      {/* Modal */}
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleOnSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid
        }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div
                className={`form-group mb-1 ${values.description
                  ? errors.description
                    ? 'is-invalid'
                    : 'is-valid'
                  : ''
                  }`}
              >
                <label className="text-label">Description</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-text-height" />{" "}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="val-firstname"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                  <div
                    id="val-description-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.firstname && errors.firstname}
                  </div>

                  <div
                    id="val-description-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    id="val-lastname"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                  <input
                    type="text"
                    className="form-control"
                    id="val-email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <input
                    type="text"
                    className="form-control"
                    id="val-linkedinPage"
                    name="linkedinPage"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.linkedinPage}
                  />
                  <input
                    type="text"
                    className="form-control"
                    id="val-description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <input
                    type="password"
                    className="form-control"
                    id="val-password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
              </div>
            </Modal.Body>

          </form>
        )}
      </Formik>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/*Confirm model*/}
      <ConfirmModal
        title="Deleting User"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </div>
  );
};

export default withReducer("userApp", reducer)(Users);
