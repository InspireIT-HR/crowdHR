import { Fragment, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import ConfirmModal from '../../../components/ConfirmModal';
import OnlyDescriptionModal from '../../../components/OnlyDescriptionModal';

import DefaultTable from '../../../components/table/DefaultTable';
import reducer from './store';
import { addJobStatusRequest, closeJobStatusModal, getJobStatuses, openEditJobStatusModal, openNewJobStatusModal, removeJobStatusRequest, selectJobStatuses, updateJobStatusRequest } from './store/jobStatusSlice';

const JobStatuses = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectJobStatuses);
  const modal = useSelector(({ jobStatusApp }) => jobStatusApp.jobStatuses.modal);
  const isSubmitting = useSelector(({ jobStatusApp }) => jobStatusApp.jobStatuses.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getJobStatuses());
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
              onClick={() => dispatch(openEditJobStatusModal(props.row.original))}
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
    dispatch(removeJobStatusRequest(data));
  }

  const handleCreate = () => {
    dispatch(openNewJobStatusModal());
  }

  const rightButtons = (
    <Button
      variant="primary"
      onClick={handleCreate}
    >
      New Job Status
    </Button>
  )

  return (
    <Fragment>
      <DefaultTable
        data={data}
        columns={columns}
        motherMenu="sidebar.definitions.def"
        activeMenu="sidebar.definitions.jobStatuses"
        usePageTitle
        useFilter
        rightButtons={rightButtons}
      />
      <OnlyDescriptionModal
        header="Job Status"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addJobStatusRequest(data))}
        update={(data) => dispatch(updateJobStatusRequest(data))}
        closeModal={() => dispatch(closeJobStatusModal())}
      />
      <ConfirmModal
        title="Deleting Job Status"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default withReducer('jobStatusApp', reducer)(JobStatuses);
