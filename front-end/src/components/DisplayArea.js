import React, { Component } from 'react';
import '../component-css/DisplayArea.css';
import Job from './Job.js';

class DisplayArea extends Component {
	// This is the area that jobs are displayed in.
	renderJob() {
		return <Job />
	}

	render() {
		let jobBucket = [];
		let searchTerm = this.props.searchTerm
		let filterList = this.props.filterList
		this.props.jobList.map((value, index) => {
			return jobBucket.push(this.renderJob())
		})

		return (
			<div className="display-area">
				<div className="search-term">
					{searchTerm}
				</div>
				<div className="filter-list">
					{filterList}
				</div>
				<div className="job-list">
					{jobBucket}
				</div>
			</div>
		)
	}
}

export default DisplayArea
