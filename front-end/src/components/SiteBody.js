import React, { Component } from 'react';
import '../component-css/SiteBody.css';
import DisplayArea from './DisplayArea'
import SearchArea from './SearchArea'

class SiteBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: null,
			filterList: null,
			activeFilters: [],
			filterState: '',
			jobList: []
		};
	}

	componentWillMount() {
		this.setState({
			filterList: ['A', 'B', 'C', 'D']
		})
	}

	errorCheckSearch(e) {
		// Error Checks Search Areas Before 
		// 	The Search Terms are Submitted to the server
		e.preventDefault()
		const term = this.state.searchTerm
		if (!term) {
			console.log("You need to put something in the search bar")
			return null
		} else {
			this.handleSearch(e)
		}
	}

	urlTheTerms(terms) {
		return terms.split(' ').join('-');
	}

	handleSearch() {
		// This is where searches are sent to backend API
		// 		currently in construction.
	
		const terms = this.state.searchTerm;
		// const filter = this.state.activeFilters;
		// console.log("Search Term:", term, "Filter:", filter)
		const keywords = this.urlTheTerms(terms);
		fetch(`/api/jobs?keywords=${keywords}`)
			.then(response => {
				return response.json();
			})
			.then(res => {
				this.setState({
					jobList: res
				})
			})
			.then(null, console.error);
	}

	handleTerm(e) {
		this.setState({searchTerm: e.target.value})
	}

	handleFilterButtonClick(e) {
		const val = e.target.value
		const activeFilters = this.state.activeFilters;
		if (activeFilters.includes(val)) {
			let index = activeFilters.indexOf(val)
			activeFilters.splice(index, 1);
		} else {
			activeFilters.push(val)
		}
		this.setState({
			activeFilters: activeFilters
		})
	}

	handleFilterClick() {
		const filterState = this.state.filterState
		this.setState({filterState: (filterState === '') ? 'active' : ''})
	}

	render() {
		return (
			<div className="site-body">
				<SearchArea
					onFormSubmit={(e) => this.errorCheckSearch(e)}
					filterState={this.state.filterState}
					onFilterClick={() => this.handleFilterClick()} 
					activeFilters={this.state.activeFilters}
					filterList={this.state.filterList}
					onFilterButtonClick={(e) => this.handleFilterButtonClick(e)}
					onSearchChange={(e) => this.handleTerm(e)} 

				/>
				<div className="display-wrapper">
					<DisplayArea jobList={this.state.jobList} filterList={this.state.activeFilters}/>
				</div>
			</div>
		)
	}
}

export default SiteBody