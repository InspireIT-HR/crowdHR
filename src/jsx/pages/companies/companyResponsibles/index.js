import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIconSvg from "../../../../svg/edit-icon";
import TrashIconSvg from "../../../../svg/trash-icon";
import DefaultTable from "../../../components/table/DefaultTable";
import {
  getCompanyResponsibles,
  selectCompanyResponsibles,
} from "./companyResponsiblesSlice";

const CompanyResponsiblesTable = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCompanyResponsibles);
  const [responsibles, setResponsibles] = useState([]);
  // const allResponsibles = useSelector(
  //   ({ companies }) => companies.companyResponsibles
  // );

  // useEffect(() => {
  //   if (props.row.id) {
  //     setResponsibles(dispatch(getCompanyResponsibles(props.row.id)));
  //   }
  // }, [data, props.row.id, dispatch]);

    useEffect(() => {
    if (props.row.id) {
// dispatch(getCompanyResponsibles(props.row.id));
      setResponsibles(data.filter((c)=>c.customerId===props.row.id));
    }
  }, [data, props.row.id]);

  // useEffect(() => {
  //   if (props.row) {
  //     if (allResponsibles[props.row.id] && allResponsibles[props.row.id].length) {
  //       setResponsibles(allResponsibles[props.row.id]);
  //     }
  //   }
  // }, [allResponsibles, props.row]);

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
        Header: "Title",
        accessor: "title",
        sortable: true,
      },
      {
        Header: "Phone",
        accessor: "phone",
        sortable: true,
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        sortable: true,
      },
      {
        Header: "Actions",
        accessor: "",
        sortable: false,
        Cell: (props) => {
          return (
            <>
              <button
                className="btn btn-primary shadow btn-xs sharp me-1"
                // onClick={() => dispatch(openEditCountryModal(props.row.original))}
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
    [dispatch]
  );

  return <DefaultTable data={responsibles} columns={columns} />;
};

export default CompanyResponsiblesTable;
