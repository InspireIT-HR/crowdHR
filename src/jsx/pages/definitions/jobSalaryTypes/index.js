import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import EditIconSvg from '../../../../svg/edit-icon';
import TrashIconSvg from '../../../../svg/trash-icon';
import DefaultTable from '../../../components/table/DefaultTable';
import { getJobSalaryTypes, selectJobSalaryTypes } from './store/jobSalaryTypeSlice';

const JobSalaryTypes = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectJobSalaryTypes);

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

  return <DefaultTable
    data={data}
    columns={columns}
    motherMenu="sidebar.definitions.def"
    activeMenu="sidebar.definitions.jobSalaryTypes"
    usePageTitle
    useFilter
  />
}

export default withReducer('jobSalaryTypeApp', reducer)(JobSalaryTypes);
