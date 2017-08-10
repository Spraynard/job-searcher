import React, { Component } from 'react';
import '../component-css/Job.css';

function Compensation(props) {
	let max = props.max;
	let min = props.min;
	let rate = props.rate;
	let salary = props.salary;
	let comp_string = null;
  	let salary_icon_url = 'https://dl.dropboxusercontent.com/s/gtxnbl54ptyfv8s/salary_icon.svg?dl=0'
	
	if (max && min && rate) {
		comp_string = `$${min} - $${max} ${rate}`;
	} else if (salary) {
		comp_string = `${salary}`;
	} else {
		return null
	}

	return (
		<div className="jComp">
      <div className="jComp-salary-icon">
        <img src={salary_icon_url} alt="Job Salary"/>
      </div>
			{comp_string}
		</div>
	)
}


function Dates(props) {
	let s_date = props.sDate;
	let e_date = props.eDate;
  	let date_icon_url = 'https://dl.dropboxusercontent.com/s/ms4t9bjiwa3rnin/dates_icon.svg?dl=0'

	return (
		<div className="jDates">
      <div className="jDates-icon">
        <img src={date_icon_url} alt="Job Post and End Dates"/>
      </div>
			<span className="date-header">Posted: </span><span className="date-string">{s_date} </span>
			{e_date &&
				<span>
					<span className="date-header">Ends: </span><span className="date-string">{e_date}</span>
				</span>
			}
		</div>
	)
}

function Description(props) {
	return (
		<div className="jDescription">
      <div className="tiny-spacer"></div>
      <div className="jDescription-content" dangerouslySetInnerHTML={{__html: props.text}}></div>
      <div className="spacer"></div>
		</div>
	)
}

class Job extends Component {

  constructor(props) {
    super();
    this.state = ({
      isActive: false
    })
  }
  
  toggleActiveState() {
//     This will toggle the state of the 'job' object, making it active or inactive. Active state causes it to be in `large-view' mode. Non-active state will just revert back to regular job placement.
    this.setState({
      isActive: this.state.isActive ? false : true
    })
//     Activates the Display's toggle to have another active job
  }
  
  toggleStateMaster() {
    if (this.props.anotherActive && !this.state.isActive) {
      alert("There is already a job with its description open! Please close it to look at another description.");
      return null
    } else {
      this.props.onClick()
    }
    this.toggleActiveState();
  }

  render() {

    let jData = this.props.data;
    let	remote = jData.remote;
    let remoteImg; /*getImgLink(jData.remote)*/
    let	title = jData.title;
    let title_link = jData.titleLink
    let start_date = jData.startDate
    let end_date = jData.endDate
    let	company = jData.company;   
    let	description = jData.description;
    let	ext_website = jData.extWebsite;
    let loc_name = jData.location.name;
    let loc_lat = jData.location.latitude;
    let loc_lng = jData.location.longitude;
    let	comp_max = jData.compensation.maximum;
    let	comp_min = jData.compensation.minimum;
    let	comp_rate = jData.compensation.rate;
    let	comp_salary = jData.compensation.salary;
    let location_icon_url = 'https://dl.dropboxusercontent.com/s/pxgmptu6e4zmeyl/location_icon.svg?dl=0'
    let display_type = (ext_website) ? 'full' : 'partial'
    let dynamicDisplayColumn = `body-column-2 ${display_type}`
    let jobClasses = `job-entry ${this.state.isActive ? 'active' : ''}`
    let viewMoreInfoButtonText = this.state.isActive ? 'CLOSE' : 'MORE INFO'
    let viewChangeButtonText = this.state.isActive ?  'SMALL VIEW' : 'LARGE VIEW'
    let remoteText = `Job Obtained From ${remote}`

    return (
      <div className={jobClasses}>
          <div className="jHeader">
            <div className="jHeader-content">
              <div className="jRemote">
                <img src={remoteImg} alt={remoteText}/>
              </div>
              <div className="jTitle">
                {title}
              </div>
              <div className="jCompany">
                {company}
              </div>
              <div className="jLocation">
                <div className="jLocation-icon">
                  <img src={location_icon_url} alt="Job Location"/>
                </div>
                {loc_name}
              </div>
              <Compensation 
                max={comp_max}
                min={comp_min}
                rate={comp_rate}
                salary={comp_salary}
              />
              <Dates
                sDate={start_date}
                eDate={end_date}
              />
              <div className="small-screen-activate">
                <input type='button' onClick={() => this.toggleStateMaster()} value={viewMoreInfoButtonText}/>
              </div>
            </div>
        </div>
          <div className="jBody">
            <div className="body-column-1">
              <Description
                text={description}
              />
            </div>
            <div className={dynamicDisplayColumn}>
              <div>
                <input type="button" value={viewChangeButtonText} onClick={() => this.toggleStateMaster()}/>
              </div>
              { ext_website &&
                <div>
                  <a href={ext_website}>
                    <input type="button" value="WEBSITE" disabled="true"/>
                  </a>
                </div>
              }
              <div>
                <a href={title_link}>
                  <input type="button" value="APPLY"/>
                </a>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Job;