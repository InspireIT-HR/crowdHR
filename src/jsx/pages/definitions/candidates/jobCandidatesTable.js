import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../../../components/ConfirmModal';

import DragDropTable from '../../../components/table/DragDropTable';
import { updateCandidateStageWithStatusRequest } from './candidateStageSlice';
import { 
  openEditCandidateStatusModal, 
  openNewCandidateStatusModal,
  removeCandidateStatusRequest,
} from './candidateStatusSlice';

const JobCandidatesTable = (props) => {
  const [jobCandidates, setJobCandidates] = useState([]);
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    if (props.row) {  
      setJobCandidates(props.row.candidateStatuses);
    }
  }, [props.row]);
  
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
      Header: 'View Order',
      accessor: 'viewOrder',
      sortable: false,
    },
    {
      Header: 'Actions',
      accessor: '',
      sortable: false,
      Cell: (props) => {
        return (
          <>
          {/* props.row.original */}
            <button 
              className="btn btn-secondary btn-icon light mr-2 p-2" 
              onClick={() => dispatch(openEditCandidateStatusModal(props.row.original))}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button 
              className="btn btn-danger btn-icon light mr-2 p-2"
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
    dispatch(removeCandidateStatusRequest(data));
  }

  const handleCreate = () => {
    dispatch(openNewCandidateStatusModal(props.row.id));
  }

  const rightButtons = (
    <Fragment>
      <button className="btn add_button" onClick={handleCreate}>
        <i className="bi bi-plus-circle add_icon"></i>
      </button>
    </Fragment>
  )

  return (
    <Fragment>
      <DragDropTable
        data={jobCandidates}
        row={props.row}
        columns={columns}
        onButtonClick={(data) => dispatch(updateCandidateStageWithStatusRequest(data))}
        rightButtons={rightButtons}
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
  )
}

export default JobCandidatesTable;
