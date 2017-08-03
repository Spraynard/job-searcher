import React, { Component } from 'react';
import '../component-css/DisplayArea.css';
import Job from './Job.js';
import Breadcrumb from './Breadcrumb.js';

class DisplayArea extends Component {
	// This is the area that jobs are displayed in.
	constructor(props) {
		super(props)
		this.state = {
			displayIndex: null,
			amtPerPage: null,
			jobActive: false
		};
	}

	componentWillMount() {
		this.setState({
			displayIndex: 0,
			amtPerPage: 15
		})
	}

	renderJob(id, _obj, index) {
		// Summary: returns a job object with given parameters
		// Input: `id` - 
		return (
			<Job 
				key={id} 
				data={_obj}
				onClick={() => this.toggleJobActive()}
				anotherActive={this.state.jobActive}
			/>
		)
	}

	setDisplayIndex(e) {
		const displayIndex = this.state.displayIndex;
		const value = e.target.getAttribute('value');
		const displayAmt = this.state.amtPerPage;
		if (((value - 1) * displayAmt) === displayIndex) {
			return null;
		}
		let newIndex = ((value - 1) * displayAmt)//(value === 1) ? 0 : (((value - 1) * displayAmt))
		this.setState({
			displayIndex: newIndex
		})
	}

	toggleJobActive() {
		this.setState({
			jobActive: this.state.jobActive ? false : true
		});
	}

	renderBreadcrumb(id, index) {
		return (
			<Breadcrumb key={id}
				onClick = {(e) => this.setDisplayIndex(e)}
				number = {index}
			/>
		) 
	}

	render() {
		let jobBucket = [];
		let breadCrumbBucket = [];
		let activeFilterList = this.props.filterList;
		let jobList = this.props.jobList

		// Building the breadcrumb bucket.
		for (var i = 0; i < Math.ceil(jobList.length/this.state.amtPerPage); i++) {
			let id = `breadcrumb-page-${i + 1}`
			breadCrumbBucket.push(this.renderBreadcrumb(id, i + 1))
		}
		// Builing the jobBucket
		let reducedJobList = this.props.jobList.slice(this.state.displayIndex, (this.state.displayIndex + this.state.amtPerPage))
		reducedJobList.map((value, index) => {
			let id = `job-info-${index}`
			return jobBucket.push(this.renderJob(id, value, index))
		})
		return (
			<div className="display-area">
				<div className="filter-list">
					{activeFilterList}
				</div>
				<div className="job-display-area">
					{jobBucket}
				</div>
				<div className="breadcrumbs-wrapper">
					{breadCrumbBucket}
				</div>
			</div>
		)
	}
}

export default DisplayArea
