import { useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import DefaultTable from '../../../components/table/DefaultTable';
import { getCandidateStatuses, selectCandidateStatuses } from './store/candidateStatusSlice';


const CandidateStatuses = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCandidateStatuses);


  useEffect(() => {
    dispatch(getCandidateStatuses());
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
            <button className="btn btn-primary shadow btn-xs sharp me-1">
            <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="btn btn-danger shadow btn-xs sharp">
            <i className="fa fa-trash"></i>
            </button>
          </>
        )
      }
    }
  ], []);

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
  
  )
}


export default withReducer('candidateStatusApp', reducer)(CandidateStatuses);