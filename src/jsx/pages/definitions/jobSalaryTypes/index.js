import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultTable from '../../../components/table/DefaultTable';
import { 
  addJobSalaryTypeRequest, 
  closeJobSalaryTypeModal, 
  getJobSalaryTypes, 
  openEditJobSalaryTypeModal, 
  openNewJobSalaryTypeModal, 
  removeJobSalaryTypeRequest, 
  selectJobSalaryTypes, 
  updateJobSalaryTypeRequest 
} from './jobSalaryTypeSlice';
import OnlyDescriptionModal from '../../../components/OnlyDescriptionModal';
import ConfirmModal from '../../../components/ConfirmModal';

const JobSalaryTypes = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectJobSalaryTypes);
  const modal = useSelector(({ definitions }) => definitions.jobSalaryType.modal);
  const isSubmitting = useSelector(({ definitions }) => definitions.jobSalaryType.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getJobSalaryTypes());
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
              onClick={() => dispatch(openEditJobSalaryTypeModal(props.row.original))}
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
    dispatch(removeJobSalaryTypeRequest(data));
  }

  const handleCreate = () => {
    dispatch(openNewJobSalaryTypeModal());
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
        activeMenu="sidebar.definitions.jobSalaryTypes"
        usePageTitle
        useFilter
        rightButtons={rightButtons}
      />
      <OnlyDescriptionModal
        header="Job Salary TYpe"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addJobSalaryTypeRequest(data))}
        update={(data) => dispatch(updateJobSalaryTypeRequest(data))}
        closeModal={() => dispatch(closeJobSalaryTypeModal())}
      />
      <ConfirmModal
        title="Deleting Job Salary Type"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default JobSalaryTypes;
