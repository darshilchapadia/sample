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
		var self = this;
		return (
			<div className="container">
				<div className="input-container">
					<input type="text" placeholder="Filter" onChange={this.onFilterhange.bind(this, "filter")} />
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
		let { filter } = _.extend({}, this.state, obj);
		this.filteredData = _.filter(data, function (item) {
			return _.some(item, function (dataItem) { 
							var test;
							try{
								test = dataItem && dataItem.toString().toLowerCase().includes(filter)								
							}
							catch(e){
								debugger
							}
							return test
						})
		});
		if (!this.filteredData.length && !filter) {
			this.filteredData = data;
		}
		this.setState(obj)
	}
	onFilterhange(filter, e) {
		var obj = { filter: e.target.value.toLowerCase() };
		this.debounceWrapper(obj)
	}
	debounceWrapper(obj) {
		this.filterData(obj)
	}
}

export default Landing;