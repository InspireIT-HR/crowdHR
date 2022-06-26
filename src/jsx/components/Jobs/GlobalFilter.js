import React from 'react';

export const GlobalFilter = ( {filter, setFilter, onCreateButtonClick} ) =>{
	return(
		<div>
			Search : {' '}
			<input 
				className="ml-2 input-search form-control"
				value={filter || ''}  
				onChange={e => setFilter(e.target.value)}
			/>
		</div>
	)
} 