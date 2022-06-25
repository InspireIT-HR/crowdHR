import React from 'react';
import { Button } from 'react-bootstrap';

export const GlobalFilter = ( {filter, setFilter, onCreateButtonClick} ) =>{
	return(
		<div className="d-flex" style={{ justifyContent: 'space-between' }}>
			<div>
				Search : {' '}
				<input 
					className="ml-2 input-search form-control"
					value={filter || ''}  
					onChange={e => setFilter(e.target.value)}
				/>
			</div>
			<div style={{ display: 'flex', alignItems: 'flex-end' }}>
				{!!onCreateButtonClick && (
					<Button
						variant="primary"
						onClick={onCreateButtonClick}
					>
						Add New
					</Button>
				)}
			</div>
		</div>
	)
} 