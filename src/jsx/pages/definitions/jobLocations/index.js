import { useEffect, useMemo, useState } from 'react';
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
import PageTitle from '../../../layouts/PageTitle';
import { useTranslation } from "react-i18next";
import { 
  useFilters, 
  useGlobalFilter, 
  usePagination, 
  useSortBy, 
  useTable 
} from 'react-table';
import { GlobalFilter } from '../../../components/Jobs/GlobalFilter';
import CitiesTable from './citiesTable';
import { Accordion, Card } from 'react-bootstrap';

const JobLocations = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCountries);

  const { t } = useTranslation();

  const [activeAccordion, setActiveAccordion] = useState(0);

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

  const tableInstance = useTable({
    columns,
    data,
    initialState: {
      pageIndex: 0
    }
  },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <PageTitle 
        motherMenu={t('sidebar.definitions.def')} 
        activeMenu={t('sidebar.definitions.jobLocations')}
      />
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <div className="dataTables_wrapper">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
              <table {...getTableProps()} className="table display">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...(column.sortable ?
                          column.getHeaderProps(column.getSortByToggleProps()) :
                          column.getHeaderProps()
                        )}>
                          {column.render('Header')}

                          <span className="ml-1">
                            {column.isSorted ? (column.isSortedDesc ? <i className="fa fa-arrow-down" /> : <i className="fa fa-arrow-up" />) : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                    prepareRow(row);

                    return (
                      <tr 
                        {...row.getRowProps()} 
                        className={`accordion-header rounded-lg ${
                            activeAccordion === i ? '' : 'collapsed'
                          }`
                        }
                        eventKey={`${i}`}
                        onClick={() => setActiveAccordion(activeAccordion === i ? -1 : i)}
                      >
                        <td colSpan={3}>
                          <Accordion className="accordion accordion-primary">
                            <Accordion.Toggle
                              as={Card.Body}
                              eventKey={`${i}`}
                              className={`accordion-header rounded-lg ${
                                activeAccordion === i ? '' : 'collapsed'
                              }`}
                              onClick={() => setActiveAccordion(activeAccordion === i ? -1 : i)}
                            >
                              <table style={{ width: '100%' }}>
                                <tbody>
                                  <tr>
                                    {row.cells.map((cell, j) => {
                                      return (
                                        <td {...cell.getCellProps()}>
                                          {cell.render('Cell')}
                                        </td>
                                      )
                                    })}
                                  </tr>
                                </tbody>
                              </table>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={`${i}`}>
                              <CitiesTable country={row.original}/>
                            </Accordion.Collapse>
                          </Accordion>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withReducer('jobLocationApp', reducer)(JobLocations);
