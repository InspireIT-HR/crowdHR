import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import withReducer from "../../../../store/withReducer";
import reducer from './store';

import DefaultTable from "../../../components/table/DefaultTable";
import { addJobTypeRequest, closeJobTypeModal, getJobTypes, openEditJobTypeModal, openNewJobTypeModal, removeJobType, selectJobTypes, updateJobTypeRequest } from "./store/jobTypeSlice";
import { Button } from "react-bootstrap";
import OnlyDescriptionModal from "../../../components/OnlyDescriptionModal";
import ConfirmModal from "../../../components/ConfirmModal";

const JobTypes = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectJobTypes);
  const modal = useSelector(({ jobTypeApp }) => jobTypeApp.jobTypes.modal);
  const isSubmitting = useSelector(({ jobTypeApp }) => jobTypeApp.jobTypes.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getJobTypes());
  }, [dispatch]);

  const columns = useMemo(() => [
    {
      Header: 'Id',
      accessor: 'id',
      sortable: true,
    },
    {
      Header: 'Description',
      accessor: 'description',
      sortable: true,
    },
    {
      Header: 'Actions',
      accessor: '',
      sortable: false,
      Cell: (props) => {
        return (
          <>
            <button 
              className="btn btn-primary shadow btn-xs sharp me-1"
              onClick={() => dispatch(openEditJobTypeModal(props.row.original))}
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
        )
      }
    }
  ], [dispatch]);

  const handleRemove = (data) => {
    dispatch(removeJobType(data));
  }

  const handleCreate = (data) => {
    dispatch(openNewJobTypeModal());
  }

  const rightButtons = (
    <button className="btn add_button" onClick={handleCreate}>
      <i className="bi bi-plus-circle add_icon"></i>
    </button>
  )

  return (
    <Fragment>
      <DefaultTable
        data={data}
        columns={columns}
        motherMenu="sidebar.definitions.def"
        activeMenu="sidebar.definitions.jobTypes"
        usePageTitle
        useFilter
        rightButtons={rightButtons}
      />
      <OnlyDescriptionModal
        header="Job Type"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addJobTypeRequest(data))}
        update={(data) => dispatch(updateJobTypeRequest(data))}
        closeModal={() => dispatch(closeJobTypeModal())}
      />
      <ConfirmModal
        title="Deleting Job Type"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default withReducer('jobTypeApp', reducer)(JobTypes);