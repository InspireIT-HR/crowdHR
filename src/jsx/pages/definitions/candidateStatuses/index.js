import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import DefaultTable from '../../../components/table/DefaultTable';
import { 
  getCandidateStatuses, 
  openEditCandidateStatusModal, 
  openNewCandidateStatusModal, 
  removeCandidateStatusRequest, 
  selectCandidateStatuses 
} from './store/candidateStatusSlice';
import CandidateStatusModal from './candidateStatusModal';
import QuestionModal from '../../../components/QuestionModal';


const CandidateStatuses = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCandidateStatuses);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionModalData, setQuestionModalData] = useState('');


  useEffect(() => {
    dispatch(getCandidateStatuses());
  }, [dispatch]);

  const handleRemove = (data) => {
    dispatch(removeCandidateStatusRequest(data));
  }

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
          <button className="btn btn-primary shadow btn-xs sharp me-1" onClick={() => dispatch(openEditCandidateStatusModal(props.row.original))}>
            <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="btn btn-danger shadow btn-xs sharp" onClick={() => {
                setQuestionModalData(props.row.original.id);
                setShowQuestionModal(true);
              }}>
            <i className="fa fa-trash"></i>
            </button>
          </>
        )
      }
    }
  ], [dispatch]);

  const onCreateButtonClick = () => {
    dispatch(openNewCandidateStatusModal());
  }

  return (
    <Fragment>
      <DefaultTable
        data={data}
        columns={columns}
        motherMenu="sidebar.definitions.def"
        activeMenu="sidebar.definitions.candidateStatuses"
        usePageTitle
        useFilter
        onCreateButtonClick={onCreateButtonClick}
      />
      <CandidateStatusModal />
      <QuestionModal 
        title="Deleting Candidate Statuse"
        content="Are you sure about deleting?"
        handleAnswerYes={handleRemove}
        showModal={showQuestionModal}
        handleCloseModal={() => setShowQuestionModal(false)}
        data={questionModalData}
      />
    </Fragment>
  )
}


export default withReducer('candidateStatusApp', reducer)(CandidateStatuses);