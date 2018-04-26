import React, { Component } from 'react';
import _ from 'underscore';
import data from './jsonData.json'

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.filteredData = data;
		this.onFNameChange = this.onFNameChange.bind(this)
		this.onLNameChange = this.onLNameChange.bind(this)
		this.onEmailChange = this.onEmailChange.bind(this)
		this.onAgencyChange =this.onAgencyChange.bind(this)
	}
	render() {
		var self = this;
		return (
			<div className="container">
				<div className="input-container">
					<input type="text" placeholder="First Name" onChange={this.onFNameChange}/>
					<input type="text" placeholder="Last Name" onChange={this.onLNameChange}/>
					<input type="text" placeholder="Email" onChange={this.onEmailChange}/>
					<input type="text" placeholder="Agency" onChange={this.onAgencyChange}/>
				</div>
				<table>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Agency</th>
					</tr>
					{this.filteredData.map(function(item){
						return <tr>
							<td>{item.firstname}</td>
							<td>{item.lastname}</td>
							<td>{item.email}</td>
							<td>{item.agency_name}</td>
						</tr>
					})}
				</table>
			</div>
		);
	}
	filterData(obj){
		let {fNameFilter, lNameFilter, emailFilter, agencyFilter} = _.extend(this.state, obj);
		this.filteredData = _.filter(data, function(item){
			return (item.firstname && item.firstname.toLowerCase().includes(fNameFilter)) || 
					(item.lastname && item.lastname.toLowerCase().includes(lNameFilter)) ||
					(item.email && item.email.toLowerCase().includes(emailFilter)) || 
					(item.agency_name && item.agency_name.toString().toLowerCase().includes(agencyFilter))
		})
	}
	onFNameChange(e) {
		var obj = {fNameFilter:e.target.value.toLowerCase()};
		this.setState(obj)
		this.filterData(obj)
	}
	onLNameChange(e){
		var obj = {lNameFilter:e.target.value.toLowerCase()}
		this.setState(obj)
		this.filterData(obj)
	}
	onEmailChange(e){
		var obj = {emailFilter: e.target.value.toLowerCase()}
		this.setState(obj)
		this.filterData(obj)
	}
	onAgencyChange(e){
		var obj = {agencyFilter: e.target.value.toLowerCase()}
		this.setState(obj)
		this.filterData(obj)
	}
}

export default Landing;