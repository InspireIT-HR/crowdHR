import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import EditIconSvg from "../../../../svg/edit-icon";
import TrashIconSvg from "../../../../svg/trash-icon";
import DefaultTable from "../../../components/table/DefaultTable";

const CompanyResponsiblesTable = (props) => {
  const [responsibles, setResponsibles] = useState([]);
  const allResponsibles = useSelector(
    ({ customerApp }) => customerApp.customerResponsibles
  );

  useEffect(() => {
    if (props.row) {
      if (
        allResponsibles[props.row.id] &&
        allResponsibles[props.row.id].length
      ) {
        setResponsibles(allResponsibles[props.row.id]);
      }
    }
  }, [allResponsibles, props.row]);

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
              <button className="btn btn-secondary btn-icon light mr-2 p-2">
                <EditIconSvg />
              </button>
              <button className="btn btn-danger btn-icon light mr-2 p-2">
                <TrashIconSvg />
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  return <DefaultTable data={responsibles} columns={columns} />;
};

export default CompanyResponsiblesTable;
