import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultTable from '../../../components/table/DefaultTable';

import { 
  addJobIndustryRequest, 
  closeJobIndustryModal, 
  getJobIndustries, 
  openEditJobIndustryModal, 
  openNewJobIndustryModal, 
  removeJobIndustryRequest, 
  selectJobIndustries, 
  updateJobIndustryRequest 
} from './jobIndustriesSlice';
import OnlyDescriptionModal from '../../../components/OnlyDescriptionModal';
import ConfirmModal from '../../../components/ConfirmModal';

const JobIndustries = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectJobIndustries);
  const modal = useSelector(({ definitions }) => definitions.jobIndustry.modal);
  const isSubmitting = useSelector(({ definitions }) => definitions.jobIndustry.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getJobIndustries());
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
              onClick={() => dispatch(openEditJobIndustryModal(props.row.original))}
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
    dispatch(removeJobIndustryRequest(data));
  }

  const handleCreate = () => {
    dispatch(openNewJobIndustryModal());
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
        activeMenu="sidebar.definitions.jobIndustries"
        usePageTitle
        useFilter
        rightButtons={rightButtons}
      />
      <OnlyDescriptionModal
        header="Job Industry"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addJobIndustryRequest(data))}
        update={(data) => dispatch(updateJobIndustryRequest(data))}
        closeModal={() => dispatch(closeJobIndustryModal())}
      />
      <ConfirmModal
        title="Deleting Job Industry"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default JobIndustries;
