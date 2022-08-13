import { useEffect, useMemo, useState } from "react";
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { GlobalFilter } from "../Jobs/GlobalFilter";
// import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DragDropTable = (props) => {
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data, [props.data]);
  const [isDataOrderChanged, setIsDataOrderChanged] = useState(false);
  
  const [itemList, setItemList] = useState([]);
  const [defaultData, setDefaultData] = useState([]);

  useEffect(() => {
    const newArr = [...data];
    const sortedArr = newArr.sort((a, b) => {
      if (a.viewOrder > b.viewOrder) {
        return 1;
      } else if (a.viewOrder < b.viewOrder) {
        return -1;
      }

      return 0;
    });
    setItemList(sortedArr);
    setDefaultData(sortedArr);
  }, [data]);

  // const { t } = useTranslation();

  const tableInstance = useTable({
    columns,
    data: itemList,
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

  const handleDrop = (droppedItem) => {
    
    if (!droppedItem.destination) return;
    
    var updatedList = [...itemList];
    
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

    const newList = updatedList.map((listItem, index) => {
      return {
        ...listItem,
        viewOrder: index
      }
    });

    setIsDataOrderChanged(true);
    setItemList(newList);
  };

  const resetDataOrder = () => {
    setItemList(defaultData);
    setIsDataOrderChanged(false);
  }

  const handleButtonClick = () => {
    if (props.onButtonClick) {
      props.onButtonClick({
        ...props.row,
        candidateStatuses: itemList
      });
      setIsDataOrderChanged(false);
    }
  }

  return (
    <>
      <div className="d-flex">
        {props.rightButtons}
        <button
          className="btn btn-primary btn-sm"
          onClick={handleButtonClick}
          disabled={!isDataOrderChanged}
        >
          Update Order
        </button>
        <button 
          className="btn btn-warning btn-sm"
          onClick={resetDataOrder} 
          disabled={!isDataOrderChanged}
          style={{ visibility: !isDataOrderChanged ? 'hidden' : 'visible'}}
        >Reset To Default</button>
      </div>
      <div className="card">
        <div className="card-body" style={{ minHeight: props.customFilter ? '400px' : '' }}>
          <div className="table-responsive" style={{ minHeight: props.customFilter ? '350px' : '' }}>
            <div className="dataTables_wrapper">
              <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                {props.useFilter &&
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                }
                {props.customFilter}
              </div>
              <DragDropContext onDragEnd={handleDrop}>
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
                              {column.isSorted ? 
                                (column.isSortedDesc ? 
                                  <i className="fa fa-arrow-down" /> : 
                                  <i className="fa fa-arrow-up" />) 
                                : ''}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <Droppable droppableId="list-container">
                    {(provided) => (
                      <tbody 
                        {...getTableBodyProps()}
                        className="list-container"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {page.map((row, index) => {
                          prepareRow(row);

                          return (
                            <Draggable 
                              key={index}
                              draggableId={index + ''}
                              index={index}
                            >
                              {(provided) => (
                                <tr
                                  {...row.getRowProps()}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className="item-container"
                                >
                                  {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>
                                      {cell.render('Cell')}
                                    </td>
                                  })}
                                </tr>
                              )}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </tbody>
                    )}
                  </Droppable>
                </table>
              </DragDropContext>
              {itemList && itemList.length > 0 && (
                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {itemList.length >= 10 ? '10' : itemList.length} data of {itemList.length} entries over {pageCount} pages
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
              )}
              {(!itemList || !itemList.length) && (
                <h5>No data available</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DragDropTable;