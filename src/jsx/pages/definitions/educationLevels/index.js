import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import DefaultTable from '../../../components/table/DefaultTable';
import { 
  getEducationLevels, 
  openEditEducationLevelModal, 
  openNewEducationLevelModal, 
  removeEducationLevelRequest, 
  selectEducationLevels 
} from './store/educationLevelSlice';
import { Button } from 'react-bootstrap';
import EducationLevelModal from './educationLevelModal';
import ConfirmModal from '../../../components/ConfirmModal';

const EducationLevels = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectEducationLevels);
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
    <Button
      variant="primary"
      onClick={handleCreate}
    >
      Add New Education Level
    </Button>
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
      <EducationLevelModal />
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