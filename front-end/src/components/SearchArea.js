import React from 'react';
import '../component-css/SearchArea.css';
import FilterField from './FilterField';
import FilterButton from './FilterButton';

function SearchArea(props) {
	let filterState = props.filterState
	let filterClasses = `filter ${filterState}`
	return (
		<div className="search-area">
			<form onSubmit={props.onFormSubmit}>
				<div className="search">
					<label>Search For Jobs<br/>
					<input type="text" name="search-bar" className="search-bar" onChange={props.onSearchChange}/>
					</label>
					<div className="submit-div">
						<input type="submit" value="Submit"/>
					</div>
					<div className="input-div">
						<FilterButton active={(filterState) ? 'active' : ''} color={'normal'} onClick={props.onFilterClick} text={'Filter Your Results!'} />				
					</div>
				</div>
			{/* This will be turned into a FilterField Class.
				This makes me think that I should probably
				break these down into more re-useable classes
			*/}
				<FilterField 
					filterList={props.filterList}
					filterFieldClassList={filterClasses}
					onFilterButtonClick={props.onFilterButtonClick}
					activeFilters={props.activeFilters}
				/>
			</form>
		</div>
	)
}

export default SearchArea