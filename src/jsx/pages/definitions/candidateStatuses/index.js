import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "../../../../store/withReducer";
import reducer from "./store";

import {
  addCandidateStatusRequest,
  closeCandidateStatusModal,
  getCandidateStatuses,
  openEditCandidateStatusModal,
  openNewCandidateStatusModal,
  removeCandidateStatusRequest,
  selectCandidateStatuses,
  updateCandidateStatusRequest,
} from "./store/candidateStatusSlice";
import ConfirmModal from "../../../components/ConfirmModal";
import OnlyDescriptionModal from "../../../components/OnlyDescriptionModal";
import AccordionTable from "../../../components/table/AccordionTable";
import JobCandidatesTable from "./jobCandidatesTable";

const CandidateStatuses = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCandidateStatuses);
  const modal = useSelector(
    ({ candidateStatusApp }) => candidateStatusApp.candidateStatuses.modal
  );
  const isSubmitting = useSelector(
    ({ candidateStatusApp }) =>
      candidateStatusApp.candidateStatuses.isSubmitting
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState("");

  useEffect(() => {
    dispatch(getCandidateStatuses());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        sortable: true,
      },
      {
        Header: "Description",
        accessor: "description",
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
                onClick={() =>
                  dispatch(openEditCandidateStatusModal(props.row.original))
                }
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
            </>
          );
        },
      },
    ],
    [dispatch]
  );

  const handleRemove = (data) => {
    dispatch(removeCandidateStatusRequest(data));
  };

  const handleCreate = () => {
    dispatch(openNewCandidateStatusModal());
  };

  const rightButtons = (
    <button className="btn add_button" onClick={handleCreate}>
      <i className="bi bi-plus-circle add_icon"></i>
    </button>
  );

  return (
    <Fragment>
      <AccordionTable
        data={data}
        columns={columns}
        motherMenu="sidebar.definitions.def"
        activeMenu="sidebar.definitions.candidateStatuses"
        usePageTitle
        useFilter
        accordionBody={JobCandidatesTable}
        rightButtons={rightButtons}
      />
      <OnlyDescriptionModal
        header="Candidate Status"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addCandidateStatusRequest(data))}
        update={(data) => dispatch(updateCandidateStatusRequest(data))}
        closeModal={() => dispatch(closeCandidateStatusModal())}
      />
      <ConfirmModal
        title="Deleting Candidate Status"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  );
};

export default withReducer("candidateStatusApp", reducer)(CandidateStatuses);
