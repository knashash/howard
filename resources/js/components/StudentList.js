import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from '../components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class StudentList extends Component {

	constructor(props) {
		super(props);
		this.state = {show: false};
		this.showModal = this.showModal.bind(this);
	}

	handleEdit() {
		console.log("The link was clicked");
	}

	showModal() {
		this.setState(state => ({
			show: !state.show
		}));
	}

	render() {

		const iconStyle = {
			marginRight: '10px'
		}

		const columns = [{
			Header: 'First Name',
			accessor: 'first_name'
		},{
			Header: 'Last Name',
			accessor: 'last_name'
		},
			{
				Header: '',
				Cell: row => (
					<div>
						<span style={iconStyle}><i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => this.handleEdit(row.original)}></i></span>
						<span><i className="fa fa-times" aria-hidden="true" onClick={() => handleDelete(row.original)}></i></span>
					</div>
				)
			}]

		return (
			<div>
				<ReactTable
					noDataText="Oh Noes! No Data"
					data={student_data}
					columns={columns}
					defaultPageSize = {3}
					pageSizeOptions = {[3, 6]}
				/>
			</div>
		);
	}
}

export default StudentList;