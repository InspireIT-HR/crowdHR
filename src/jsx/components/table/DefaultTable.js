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
              {props.useFilter && <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />}
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultTable;