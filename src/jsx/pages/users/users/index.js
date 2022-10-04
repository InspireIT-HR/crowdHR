import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "../../../../store/withReducer";
import reducer from "./store";

import DefaultTable from "../../../components/table/DefaultTable";
import { getUsers, selectUsers, setFilterField } from "./store/usersSlice";
import { getCompanies, selectCompanies } from "./store/companiesSlice";
import Select from "react-select";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Users = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectUsers);
  const companies = useSelector(selectCompanies);
  const filters = useSelector(({ userApp }) => userApp.users.filters);
  const [filteredData, setFilteredData] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShowEdit(false);
  const handleShow = (data) => {setShowEdit(true); console.log(data)};
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
                // onClick={() => {
                //   setConfirmModalData(props.row.original.id);
                //   setShowConfirmModal(true);
                // }}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          );
        },
      },
    ],
    []
  );

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
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withReducer("userApp", reducer)(Users);
