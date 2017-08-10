import React from 'react';
import '../component-css/FilterButton.css';

function FilterButton(props) {
	const text = props.text;
	const classes = `filter-button ${props.color} ${props.active}`

	return (
		<input type="button" className={classes} onClick={props.onClick} value={text}/>
	);
}

export default FilterButton