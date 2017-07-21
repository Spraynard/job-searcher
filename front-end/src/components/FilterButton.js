import React from 'react';
import '../component-css/FilterButton.css';

function FilterButton(props) {
	const text = props.text;
	const classes = `filter-button ${props.color} ${props.active}`

	return (
		<button type="button" key={props.id} className={classes} onClick={props.onClick} value={text}>
			{text}
		</button>
	);
}

export default FilterButton