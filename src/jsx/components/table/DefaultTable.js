import { useMemo } from "react";
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import PageTitle from "../../layouts/PageTitle";
import { GlobalFilter } from "../Jobs/GlobalFilter";
import { useTranslation } from "react-i18next";

const DefaultTable = (props) => {
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data, [props.data]);
  const motherMenu = useMemo(() => props.motherMenu, [props.motherMenu]);
  const activeMenu = useMemo(() => props.activeMenu, [props.activeMenu]);
     
  const { t } = useTranslation();

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
      {props.usePageTitle && <PageTitle motherMenu={t(motherMenu)} activeMenu={t(activeMenu)} />}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <div className="dataTables_wrapper">
              <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                {props.useFilter && 
                  <GlobalFilter 
                    filter={globalFilter} 
                    setFilter={setGlobalFilter}
                  />
                }
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {props.rightButtons}
                </div>
              </div>
              <table {...getTableProps()} className="table  display">
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
                  {page.map((row) => {
                    prepareRow(row);

                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        })}
                      </tr>
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
                        { number + 1 }
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultTable;