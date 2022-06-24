import { Fragment, useEffect, useMemo, useState } from 'react';
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
import { Accordion, useAccordionToggle } from 'react-bootstrap';

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

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      setActiveAccordion(activeAccordion === eventKey ? -1 : eventKey),
    );

    return (
      <tr className={`accordion-header rounded-lg ${activeAccordion === eventKey ? '' : 'collapsed'}`} onClick={decoratedOnClick}>
        {children}
      </tr>
    );
  }

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
              <Accordion className="accordion accordion-primary">
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
                        <Fragment key={i}>
                          {/* Appearantly eventKey param must be a string, otherwise it just dont want to work :/ */}
                          <CustomToggle eventKey={'' + i}>
                            {row.cells.map((cell, j) => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render('Cell')}
                                </td>
                              )
                            })}
                          </CustomToggle>
                          <tr 
                            {...row.getRowProps()}
                          >
                            <td colSpan={3}>
                              <Accordion.Collapse eventKey={`${i}`}>
                                <CitiesTable country={row.original}/>
                              </Accordion.Collapse>
                            </td>
                          </tr>
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between">
                  <span>
                    Page{' '}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{''}
                  </span>
                  <span className="table-index">
                    Go to page : {' '}
                    <input
                      type="number"
                      className="ml-2"
                      defaultValue={pageIndex + 1}
                      onChange={(e) => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(pageNumber);
                      }}
                    />
                  </span>
                </div>
                <div className="text-center">
                  <div className="filter-pagination mt-3">
                    <button className="previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                      {'<<'}
                    </button>

                    <button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                      Previous
                    </button>

                    <button className="previous-button" onClick={() => nextPage()} disabled={!canNextPage}>
                      Next
                    </button>

                    <button className="previous-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                      {'>>'}
                    </button>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withReducer('jobLocationApp', reducer)(JobLocations);
