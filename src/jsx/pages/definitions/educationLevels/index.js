import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import DefaultTable from '../../../components/table/DefaultTable';
import { 
  addEducationLevelRequest,
  closeEducationLevelModal,
  getEducationLevels,
  openEditEducationLevelModal,
  openNewEducationLevelModal,
  removeEducationLevelRequest,
  selectEducationLevels,
  updateEducationLevelRequest
} from './store/educationLevelSlice';
import { Button } from 'react-bootstrap';
import ConfirmModal from '../../../components/ConfirmModal';
import OnlyDescriptionModal from '../../../components/OnlyDescriptionModal';

const EducationLevels = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectEducationLevels);
  const modal = useSelector(({ educationLevelApp }) => educationLevelApp.educationLevels.modal);
  const isSubmitting = useSelector(({ educationLevelApp }) => educationLevelApp.educationLevels.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getEducationLevels());
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
              onClick={() => dispatch(openEditEducationLevelModal(props.row.original))}
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
    dispatch(removeEducationLevelRequest(data));
  }

  const handleCreate = () => {
    dispatch(openNewEducationLevelModal());
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
        activeMenu="sidebar.definitions.educationLevels"
        usePageTitle
        useFilter
        rightButtons={rightButtons}
      />
      <OnlyDescriptionModal
        header="Education Level"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addEducationLevelRequest(data))}
        update={(data) => dispatch(updateEducationLevelRequest(data))}
        closeModal={() => dispatch(closeEducationLevelModal())}
      />
      <ConfirmModal
        title="Deleting Education Level"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default withReducer('educationLevelApp', reducer)(EducationLevels);