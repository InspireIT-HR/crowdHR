import { Fragment, useMemo, useState } from "react";
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import PageTitle from "../../layouts/PageTitle";
import { GlobalFilter } from "../Jobs/GlobalFilter";
import { useTranslation } from "react-i18next";
import { Accordion, useAccordionToggle } from "react-bootstrap";

const AccordionTable = (props) => {
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data, [props.data]);
  const motherMenu = useMemo(() => props.motherMenu, [props.motherMenu]);
  const activeMenu = useMemo(() => props.activeMenu, [props.activeMenu]);
  const AccordionBody = useMemo(() => props.accordionBody, [props.accordionBody]);

  const { t } = useTranslation();

  const [activeAccordion, setActiveAccordion] = useState(0);

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

  function CustomToggle({ children, eventKey, rowCells }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      setActiveAccordion(activeAccordion === eventKey ? -1 : eventKey),
    );

    const cellsLength = useMemo(() => rowCells.length, [rowCells]);

    return (
      <tr 
        className={`accordion-header rounded-lg ${activeAccordion === eventKey ? '' : 'collapsed'}`} 
      >
        {rowCells.map((cell, i) => {
          if (i + 1 === cellsLength) {
            return (
              <td {...cell.getCellProps()}>
                {cell.render('Cell')}
              </td>
            )
          } else {
            return (
              <td 
                {...cell.getCellProps()}
                onClick={decoratedOnClick}
              >
                {cell.render('Cell')}
              </td>
            )
          }
        })}
      </tr>
    );
  }

  return (
    <>
      <PageTitle
        motherMenu={t(motherMenu)}
        activeMenu={t(activeMenu)}
      />
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <div className="dataTables_wrapper">
              <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
              </div>
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
                          <CustomToggle eventKey={'' + i} rowCells={row.cells}>
                          </CustomToggle>
                          <tr
                            {...row.getRowProps()}
                          >
                            <td colSpan={columns.length}>
                              <Accordion.Collapse eventKey={`${i}`}>
                                <AccordionBody row={row.original} />
                              </Accordion.Collapse>
                            </td>
                          </tr>
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>
                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {data.length >= 10 ? '10' : data.length} data of {data.length} entries over {pageCount} pages
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example5_paginate"
                  >
                    <button
                      className={`paginate_button previous ${!canPreviousPage ? 'disabled' : ''}`}
                      onClick={() => previousPage()} disabled={!canPreviousPage}
                    >
                      <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                    </button>
                    <span>
                      {pageOptions.map((number) => (
                        <button
                          className={`paginate_button  ${
                            // eslint-disable-next-line no-sequences
                            pageIndex === number ? "current" : "",
                            pageCount <= 1 ? 'disabled' : ''
                            } `}
                          key={number}
                          onClick={() => gotoPage(number)}
                        >
                          {number + 1}
                        </button>
                      ))}
                    </span>
                    <button
                      className={`paginate_button next ${!canNextPage ? 'disabled' : ''}`}
                      onClick={() => nextPage()} disabled={!canNextPage}
                    >
                      <i className="fa fa-angle-double-right" aria-hidden="true"></i>
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

export default AccordionTable;
