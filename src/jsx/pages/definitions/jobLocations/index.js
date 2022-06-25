import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import EditIconSvg from '../../../../svg/edit-icon';
import TrashIconSvg from '../../../../svg/trash-icon';
import { 
  getCountries, 
  selectCountries, 
} from './store/countriesSlice';
import { getCities } from './store/citiesSlice';
import CitiesTable from './citiesTable';
import AccordionTable from '../../../components/table/AccordionTable';

const JobLocations = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCountries);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCities());
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

  return <AccordionTable
    data={data}
    columns={columns}
    motherMenu="sidebar.customers.cus"
    activeMenu="sidebar.customers.customerList"
    usePageTitle
    useFilter
    accordionBody={CitiesTable}
  />
}

export default withReducer('jobLocationApp', reducer)(JobLocations);
