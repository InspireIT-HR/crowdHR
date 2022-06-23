import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import EditIconSvg from '../../../../svg/edit-icon';
import TrashIconSvg from '../../../../svg/trash-icon';
import DefaultTable from '../../../components/table/DefaultTable';
import reducer from './store';
import { getJobStatuses, selectJobStatuses } from './store/jobStatusSlice';

const JobStatuses = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectJobStatuses);

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
            <button className="btn btn-secondary btn-icon light mr-2 p-2">
              <EditIconSvg />
            </button>
            <button className="btn btn-danger btn-icon light mr-2 p-2">
              <TrashIconSvg />
            </button>
          </>
        )
      }
    }
  ], []);

  return <DefaultTable
    data={data}
    columns={columns}
    motherMenu="sidebar.definitions.def"
    activeMenu="sidebar.definitions.jobStatuses"
    usePageTitle
    useFilter
  />
}

export default withReducer('jobStatusApp', reducer)(JobStatuses);
