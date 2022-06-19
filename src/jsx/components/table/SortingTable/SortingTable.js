import React,{ useMemo } from 'react';
import {Link} from 'react-router-dom';
import { useTable,useFilters,useGlobalFilter, useSortBy } from 'react-table';
import PageTitle from "../../../layouts/PageTitle";
import MOCK_DATA from './MOCK_DATA_4.json';
import { GlobalFilter } from './GlobalFilter'; 
//import './table.css';

export const SortingTable = () => {
	
	const columns = useMemo( () => [
		{
			Header : 'Customer',
			accessor: 'customer.logoPath',
			Cell: props => {
				return <img width="70" height="30" src={`https://77.79.108.34:63748/CustomerLogos/${props.value}`} alt="company_logo"/>
			  }
		},
		{
			Header : 'Position',
			accessor: 'shortName'
		},
		{
			Header : 'Type',
			accessor: 'jobType.description'
		},
		{
			Header : 'Status',
			accessor: 'status.description'
		},
		{
			Header : 'Location',
			accessor: 'locationCity.description',
		},
		{
			Header : 'Posted Date',
			accessor: 'createDate',
			Cell: props => {
				return new Date(props.value).toLocaleDateString('tr-TR', { year: 'numeric', month: 'numeric', day: 'numeric' })
			  }
		},
		{
			Header : 'Actions',
			accessor: '',
			Cell:props=>{
				return(
					<div className="action-buttons d-flex ">
						<Link to={"#"} className="btn btn-success light mr-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="svg-main-icon" width="24px" height="24px" viewBox="0 0 32 32" x="0px" y="0px"><g data-name="Layer 21">
								<path d="M29,14.47A15,15,0,0,0,3,14.47a3.07,3.07,0,0,0,0,3.06,15,15,0,0,0,26,0A3.07,3.07,0,0,0,29,14.47ZM16,21a5,5,0,1,1,5-5A5,5,0,0,1,16,21Z" fill="#000000" fillRule="nonzero"></path><circle cx="16" cy="16" r="3" fill="#000000" fillRule="nonzero"></circle></g>
							</svg>
						</Link> 
						<Link to={"#"} className="btn btn-secondary light mr-2"
							
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
								<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
									<rect x="0" y="0" width="24" height="24"></rect>
									<path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fillRule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "></path>
									<rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"></rect>
								</g>
							</svg>
						</Link>
						<Link to={"#"} className="btn btn-danger light"
							
						>
							<svg xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
								<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
									<rect x="0" y="0" width="24" height="24"></rect>
									<path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fillRule="nonzero"></path>
									<path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
								</g>
							</svg>
						</Link>
					</div>
				)
			}
		},
	], [] )
	const data = useMemo( () => MOCK_DATA, [] )
	
	const tableInstance = useTable({columns,data},
		useFilters,
		useGlobalFilter,
		useSortBy
	)
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups,
		rows, 
		state,
		setGlobalFilter,
		prepareRow,
	} = tableInstance
	const {globalFilter} = state;
	return(
		<>	
			<PageTitle activeMenu="Sorting" motherMenu="Table" />
			<div className="card">
				<div className="card-header">
					<h4 className="card-title">Table Sorting</h4>
				</div>
				<div className="card-body">
					<div className="table-responsive">
						<div className="dataTables_wrapper">
						<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
							<table {...getTableProps()} className="table dataTable display">
								<thead>
								   {headerGroups.map(headerGroup => (
										<tr {...headerGroup.getHeaderGroupProps()}>
											{headerGroup.headers.map(column => (
												<th {...column.getHeaderProps(column.getSortByToggleProps())}>
													{column.render('Header')}
											
													<span className="ml-1">
														{column.isSorted ? (column.isSortedDesc ?  <i className="fa fa-arrow-down" /> :  <i className="fa fa-arrow-up" /> ) : '' }
													</span>
												</th>
											))}
										</tr>
								   ))}
								</thead> 
								<tbody {...getTableBodyProps()}>
								
									{rows.map((row) => {
										prepareRow(row)
										return(
											<tr {...row.getRowProps()}>
												{row.cells.map((cell) => {
													return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
												})}
												
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
export default SortingTable;