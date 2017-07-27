import React from 'react';
import '../component-css/Job.css';

function Job(props) {
	let jData = props.data;
	let	remote = jData.remote;
	let	title = jData.title;
	let	company = jData.company;   
	let	description = jData.description;
	let	extWebsite = jData.extWebsite;
	let	compMax = jData.compensation.maximum;
	let	compMin = jData.compensation.minimum;
	let	compRate = jData.compensation.rate;
	let	compSalary = jData.compensation.salary;


	return (
		<div className="job-entry">
			<div className="job-title">
				{title}
			</div>
			<div className="job-company">
				{company}
			</div>
		</div>
	)
}

export default Job;