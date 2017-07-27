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
		return <Job key={id} data={_obj} />
	}

	setDisplayIndex(e) {
		console.log(e.target.getAttribute('value'))
		console.log(`Hello it's a me! This is the value ${e.target.value}`)
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
		let filterList = this.props.filterList
		let jobList = this.props.jobList
		let breadcrumbs = "Yay Breadcrumbs!!!"

		// Building the breadcrumb bucket.
		for (var i = 0; i < Math.ceil(jobList.length/this.state.amtPerPage); i++) {
			let id = `breadcrumb-page-${i + 1}`
			breadCrumbBucket.push(this.renderBreadcrumb(id, i + 1))
		}
		// Builing the jobBucket
		let reducedJobList = this.props.jobList.slice(this.state.displayIndex, this.state.displayIndex + this.state.amtPerPage)
		reducedJobList.map((value, index) => {
			let id = `job-info-${index}`
			return jobBucket.push(this.renderJob(id, value, index))
		})

		return (
			<div className="display-area">
				<div className="filter-list">
					{filterList}
				</div>
				<div className="job-display-area">
					{jobBucket}
					<div className="breadcrumb-wrapper">
						{breadCrumbBucket}
					</div>
				</div>
			</div>
		)
	}
}

export default DisplayArea
