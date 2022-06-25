<<<<<<< HEAD
import { useEffect, useMemo} from 'react';
=======
import { Fragment, useEffect, useMemo, useState } from 'react';
>>>>>>> 68458e0 (added question modal and add/update modals for candidate status with functions)
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
<<<<<<< HEAD
            <button className="btn btn-primary shadow btn-xs sharp me-1">
            <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="btn btn-danger shadow btn-xs sharp">
            <i className="fa fa-trash"></i>
=======
            <button 
              className="btn btn-secondary btn-icon light mr-2 p-2"
              onClick={() => dispatch(openEditCandidateStatusModal(props.row.original))}
            >
              <EditIconSvg />
            </button>
            <button 
              className="btn btn-danger btn-icon light mr-2 p-2"
              onClick={() => {
                setQuestionModalData(props.row.original.id);
                setShowQuestionModal(true);
              }}
            >
              <TrashIconSvg />
>>>>>>> 68458e0 (added question modal and add/update modals for candidate status with functions)
            </button>
          </>
        )
      }
    }
  ], [dispatch]);

<<<<<<< HEAD
  return (
    <div>

      <DefaultTable
          data={data}
          columns={columns}
          motherMenu="sidebar.definitions.def"
          activeMenu="sidebar.definitions.candidateStatuses"
          usePageTitle
          useFilter
          display='none'
        />
    </div>
  
=======
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
>>>>>>> 68458e0 (added question modal and add/update modals for candidate status with functions)
  )
}


export default withReducer('candidateStatusApp', reducer)(CandidateStatuses);