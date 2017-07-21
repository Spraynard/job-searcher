import React, { Component } from 'react';
import '../component-css/FilterField.css';
import FilterButton from './FilterButton';

class FilterField extends Component {

	renderFilterButton(id, text, active) {
		return <FilterButton key={id} text={text} active={active} color={'normal'} onClick={this.props.onFilterButtonClick}/>
	}

	render() {
		const activeFilters = this.props.activeFilters
		const filterList = []
		this.props.filterList.map((value, index) => {
			const id=`f-b-${value}`
			const active = activeFilters.includes(value) ? 'active' : ''
			return filterList.push(this.renderFilterButton(id, value, active))
		})

		return (
			<div className={this.props.filterFieldClassList}>
				<label>Click on the available buttons to limit your seach to specified value</label>
				<div className="button-area">
					{filterList}
				</div>
			</div>
		)
	}
}

export default FilterField