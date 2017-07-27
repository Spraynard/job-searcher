import React from 'react';
import '../component-css/Breadcrumb.css';

function Breadcrumb(props) {
	return (
		<div className="breadcrumb" onClick={props.onClick} value={props.number}>
			{props.number}
		</div>
	)
}

export default Breadcrumb