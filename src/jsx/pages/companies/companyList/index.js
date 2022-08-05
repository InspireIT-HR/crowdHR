import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultTable from "../../../components/table/DefaultTable";
import {
  getCompanies,
  selectCompanies,
  selectCompanyById,
  //   addAttachmentTypeRequest,
  //   closeAttachmentTypeModal,
  //   getAttachmentTypes,
  //   openEditAttachmentTypeModal,
  //   openNewAttachmentTypeModal,
  //   removeAttachmentTypeRequest,
  //   selectAttachmentTypes,
  //   updateAttachmentTypeRequest
} from "./companyListSlice";
import OnlyDescriptionModal from "../../../components/OnlyDescriptionModal";
import ConfirmModal from "../../../components/ConfirmModal";
import AccordionTable from "../../../components/table/AccordionTable";
import CustomerResponsiblesTable from "../companyResponsibles/index";

const CompanyList = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCompanies);
  // const modal = useSelector(({ definitions }) => definitions.attachmentType.modal);
  // const isSubmitting = useSelector(({ definitions }) => definitions.attachmentType.isSubmitting);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Logo",
        accessor: "logoPath",
        sortable: false,
        Cell: (props) => {
          return (
            <img
              width="70"
              height="30"
              src={`https://77.79.108.34:63748/CustomerLogos/${props.value}`}
              alt="company_logo"
            />
          );
        },
      },
      {
        Header: "Name",
        accessor: "name",
        sortable: true,
      },
      {
        Header: "Industry",
        accessor: "industry.description",
        sortable: true,
      },
      {
        Header: "Website",
        accessor: "website",
        sortable: true,
      },
      {
        Header: "Primary Internal Recruiter",
        accessor: "primaryInternalRecruiter.fullname",
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
                // onClick={() => dispatch(openEditAttachmentTypeModal(props.row.original))}
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

  return (
    <AccordionTable
      data={data}
      columns={columns}
      motherMenu="sidebar.companies.companies"
      activeMenu="sidebar.companies.companyList"
      usePageTitle
      useFilter
      accordionBody={CustomerResponsiblesTable}
    />
  );
};

export default CompanyList;
