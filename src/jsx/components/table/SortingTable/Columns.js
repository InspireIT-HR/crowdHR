export const COLUMNS = [
	{
		Header : 'Customer',
		Footer : 'Id',
		accessor: 'shortName'
	},
	{
		Header : 'Position',
		Footer : 'First Name',
		accessor: 'shortName'
	},
	{
		Header : 'Type',
		Footer : 'Type',
		accessor: 'jobType.description'
	},
	{
		Header : 'Status',
		Footer : 'Date of  Birth',
		accessor: 'status.description'
	},
	{
		Header : 'Location',
		Footer : 'Country',
		accessor: 'locationCity.description}',
	},
	{
		Header : 'Posted Date',
		Footer : 'Phone',
		accessor: 'job.createDate'
	},
	{
		Header : 'Actions',
		Footer : '',
		accessor: '',
	},
]

// export const COLUMNS = [
// 	{
// 		Header : 'Id',
// 		Footer : 'Id',
// 		accessor: 'id'
// 	},
// 	{
// 		Header : 'First Name',
// 		Footer : 'First Name',
// 		accessor: 'first_name'
// 	},
// 	{
// 		Header : 'Last Name',
// 		Footer : 'Last Name',
// 		accessor: 'last_name'
// 	},
// 	{
// 		Header : 'Date of  Birth',
// 		Footer : 'Date of  Birth',
// 		accessor: 'date_of_birth'
// 	},
// 	{
// 		Header : 'Country',
// 		Footer : 'Country',
// 		accessor: 'country',
// 	},
// 	{
// 		Header : 'Phone',
// 		Footer : 'Phone',
// 		accessor: 'phone'
// 	},
// 	{
// 		Header : 'Age',
// 		Footer : 'Phone',
// 		accessor: 'age',
// 	},
// ]


export const GROUPED_COLUMNS = [
	{
		Header : 'Id',
		Footer : 'Id',
		accessor: 'id'
	},
	{
		Header : 'Name',
		Footer : 'Name',
		columns: [
			{
				Header : 'First Name',
				Footer : 'First Name',
				accessor: 'first_name'
			},
			{
				Header : 'Last Name',
				Footer : 'Last Name',
				accessor: 'last_name'
			},
		]
	},
	{
		Header: 'Info',
		Footer: 'Info',
		columns: [
			{
				Header : 'Date of  Birth',
				Footer : 'Date of  Birth',
				accessor: 'date_of_birth'
			},
			{
				Header : 'Country',
				Footer : 'Country',
				accessor: 'country',
			},
			{
				Header : 'Phone',
				Footer : 'Phone',
				accessor: 'phone'
			},
		]
	},
]