import React from 'react';
import {Button} from 'react-bootstrap'

export const GlobalFilter = ( {filter, setFilter,openModal,display} ) =>{
	return(
		<div>
	
				
				<div style={{"float":"left"}}>
			Search : {' '}
			<input className="ml-2 input-search form-control"
				value={filter || ''}  onChange={e => setFilter(e.target.value)} 
            />
			</div>
			<div style={{"float":"right"}} className="mt-3">
			<Button className="me-2" variant="warning" onClick={openModal} style={{"display":{display}}}>
                  Add new
            </Button>
			</div>
			
	
			
			
		</div>
	)
} 