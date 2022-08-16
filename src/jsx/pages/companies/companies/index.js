import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import EditIconSvg from '../../../../svg/edit-icon';
import TrashIconSvg from '../../../../svg/trash-icon';
import { getCustomers, selectCustomers } from './store/customersSlice';
import AccordionTable from '../../../components/table/AccordionTable';
import CompanyResponsiblesTable from './companyResponsiblesTable';

const Customers = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCustomers);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const columns = useMemo(() => [
    {
      Header: 'Logo',
      accessor: 'logoPath',
      sortable: false,
      Cell: props => {
        return <img width="70" height="30" src={`https://77.79.108.34:63748/CustomerLogos/${props.value}`} alt="company_logo" />
      }
    },
    {
      Header: 'Name',
      accessor: 'name',
      sortable: true,
    },
    {
      Header: 'Industry',
      accessor: 'industry.description',
      sortable: true,
    },
    {
      Header: 'Website',
      accessor: 'website',
      sortable: true,
    },
    {
      Header: 'Primary Internal Recruiter',
      accessor: 'primaryInternalRecruiter.fullname',
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

  return <AccordionTable
    data={data}
    columns={columns}
    motherMenu="sidebar.companies.companies"
    activeMenu="sidebar.companies.companyList"
    usePageTitle
    useFilter
    accordionBody={CompanyResponsiblesTable}
  />
}

export default withReducer('customerApp', reducer)(Customers);
