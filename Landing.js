import React, { Component } from 'react';
import _ from 'underscore';
import data from './jsonData.json'

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.filteredData = data;
		this.debounceWrapper = _.debounce(this.debounceWrapper.bind(this), 500)
	}
	render() {
		debugger
		var self = this;
		return (
			<div className="container">
				<div className="input-container">
					<input type="text" placeholder="First Name" onChange={this.onFilterhange.bind(this,"fNameFilter")} />
					<input type="text" placeholder="Last Name" onChange={this.onFilterhange.bind(this,"lNameFilter")} />
					<input type="text" placeholder="Email" onChange={this.onFilterhange.bind(this,"emailFilter")} />
					<input type="text" placeholder="Agency" onChange={this.onFilterhange.bind(this,"agencyFilter")} />
				</div>
				<table>
					<tbody>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Agency</th>
						</tr>
						{this.filteredData.map(function (item, i) {
							return <tr key={i}>
								<td>{item.firstname}</td>
								<td>{item.lastname}</td>
								<td>{item.email}</td>
								<td>{item.agency_name}</td>
							</tr>
						})}
					</tbody>
				</table>
			</div>
		);
	}
	filterData(obj) {
		let { fNameFilter, lNameFilter, emailFilter, agencyFilter } = _.extend({}, this.state, obj);
		this.filteredData = _.filter(data, function (item) {
			return (item.firstname && fNameFilter && item.firstname.toLowerCase().includes(fNameFilter)) ||
				(item.lastname && lNameFilter && item.lastname.toLowerCase().includes(lNameFilter)) ||
				(item.email && emailFilter && item.email.toLowerCase().includes(emailFilter)) ||
				(item.agency_name && agencyFilter && item.agency_name.toString().toLowerCase().includes(agencyFilter))
		});
		if(!this.filteredData.length && !fNameFilter && !lNameFilter && !emailFilter && !agencyFilter){
			this.filteredData = data;
		}
		this.setState(obj)
	}
	onFilterhange(filter,e) {
		var obj = { [filter]: e.target.value.toLowerCase() };
		this.debounceWrapper(obj)
	}
	debounceWrapper(obj) {
		this.filterData(obj)
	}
}

export default Landing;