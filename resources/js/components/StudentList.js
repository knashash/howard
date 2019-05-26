import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from '../components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import StudentAddUpdate from "./StudentAddUpdate";
import ModalProfile from "./ModalProfile";
import StudentProfile from "./StudentProfile";

class StudentList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeTab: '1',
			profile_data: [],
			data: student_data,
			modal_comp: 'profile',
			modal_title: 'New Student Form',
			show: false,
		};
		this.showModal = this.showModal.bind(this);
		this.setStudentListData = this.setStudentListData.bind(this);
		this.toggle = this.toggle.bind(this);
		this.newStudent = this.newStudent.bind(this);
	}

	setStudentListData() {

		var self = this
		axios.get('/api/students').then(function (response) {
			self.setState({
				data: response.data
			})
		})
			.catch(function (error) {
				console.log(error);
			});

		this._modal.toggle();
	}

	newStudent() {
		this.setState({
			modal_comp : 'student',
			profile_data : undefined
		})

		this._modal.toggle();
		this._modal.setState({modal_size:'lg'});

	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	handleEdit(row) {
		this.setState({
			modal_comp : 'student',
			modal_title: 'Edit Student Data',
			profile_data : row
		})

		this._modal.toggle();
		this._modal.setState({modal_size:'lg'});
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
			<Row>
			<Col sm="8" md={{ size: 2, offset: 10 }}><Button color="primary" onClick={this.newStudent}>New Student</Button>{' '}</Col>
		</Row>

		<Row>
			<Col>
				<ReactTable
					noDataText="Oh Noes! No Data"
					data={this.state.data}
					columns={columns}
					defaultPageSize = {15}
					pageSizeOptions = {[3, 6]}
				/>
			</Col>
		</Row>

		<div>

		<ModalProfile
		ref={(modal) => { this._modal = modal; }}
		modal_title = {this.state.modal_title}
	>
		{(() => {
			switch (this.state.modal_comp) {
				case "student": return <StudentAddUpdate
					setStudentListData={this.setStudentListData}
					selectedProfile={this.state.profile_data}
				></StudentAddUpdate>
				default:      return <StudentProfile selectedProfile={this.state.profile_data}/>
			}
		})()}
	</ModalProfile>

	</div>
	</div>


		);
	}
}

export default StudentList;