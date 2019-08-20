import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import StudentAddUpdate from "./StudentAddUpdate";
import ModalProfile from "./ModalProfile";
import StudentProfile from "./StudentProfile";
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink, CSVDownload } from "react-csv";
import 'react-toastify/dist/ReactToastify.css';

class StudentList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeTab: '1',
			profile_data: [],
			data: [],
			modal_comp: 'profile',
			modal_title: 'New Student Form',
			show: false,
			dataToDownload: [],
			columns: []
		};
		this.showModal = this.showModal.bind(this);
		this.setStudentListData = this.setStudentListData.bind(this);
		this.toggle = this.toggle.bind(this);
		this.newStudent = this.newStudent.bind(this);
		this.download = this.download.bind(this);
	}

	setStudentListData() {
		this.reloadStudentData()
		this._modal.toggle();
	}

	download(event) {
		const currentRecords = this.reactTable.getResolvedState().sortedData;

		console.log(currentRecords.length)
		var data_to_download = []
		console.log('Column Length ' + this.state.columns.length)
		for (var index = 0; index < currentRecords.length; index++) {
			let record_to_download = {}
			for(var colIndex = 0; colIndex < this.state.columns.length-1 ; colIndex ++) {
				console.log(this.state.columns[colIndex])
				record_to_download[this.state.columns[colIndex].Header] = currentRecords[index][this.state.columns[colIndex].accessor]
			}
			data_to_download.push(record_to_download)

		}
		this.setState({ dataToDownload: data_to_download }, () => {
			// click the CSVLink component to trigger the CSV download
			this.csvLink.link.click()
		})
	}

	componentWillMount () {
		this.reloadStudentData()
	}

	reloadStudentData = () => {
		var self = this
		axios.get('/api/students').then(function (response) {
			self.setState({
				data: response.data
			})
		})
			.catch(function (error) {
				console.log(error);
			});

		let columns= [{
			Header: 'First Name',
			accessor: 'first_name'
		},{
			Header: 'Last Name',
			accessor: 'last_name'
		},
			{
				Header: 'Dob',
				accessor: 'dob'
			},
			{
				Header: 'Age',
				accessor: 'age'
			},
			{
				Header: 'Gender',
				accessor: 'gender'
			},
			{
				Header: 'Ethnic Group',
				accessor: 'ethnic_group'
			},
			{
				Header: 'First Language',
				accessor: 'first_language'
			},
			{
				Header: 'Country of Origin',
				accessor: 'country_of_origin'
			},
			{
				Header: 'Employment Status',
				accessor: 'employment_status'
			},
			{
				Header: 'Tests',
				accessor: 'tests',
				style:{ 'white-space': 'unset'}
			},
			{
				Header: 'Status',
				accessor: 'status'
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

		this.setState({
			columns: columns
		})
	};

	notify = (message) => {

		if (message.type == 'success') toast.success(message.text);
		else toast.error(message.text);
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
				Header: 'Dob',
				accessor: 'dob'
			},
			{
				Header: 'Age',
				accessor: 'age'
			},
			{
				Header: 'Gender',
				accessor: 'gender'
			},
			{
				Header: 'Ethnic Group',
				accessor: 'ethnic_group'
			},
			{
				Header: 'First Language',
				accessor: 'first_language'
			},
			{
				Header: 'Country of Origin',
				accessor: 'country_of_origin'
			},
			{
				Header: 'Employment Status',
				accessor: 'employment_status'
			},
			{
				Header: 'Tests',
				accessor: 'tests',
				style:{ 'white-space': 'unset'}
			},
			{
				Header: 'Status',
				accessor: 'status'
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

				<Row style={{backgroundColor: '#f1f1f1', textAlign:'Right', paddingRight: '10px'}}>
					<Col ><Button size="sm" color="primary" onClick={this.newStudent}>New Student</Button>{' '} <Button size="sm" color="primary" onClick={this.download}>Export</Button>{' '}</Col>
				</Row>

				<div>
					<CSVLink
						data={this.state.dataToDownload}
						filename="students.csv"
						className="hidden"
						ref={(r) => this.csvLink = r}
						target="_blank"/>

				</div>

				<div>
					<ReactTable ref={(r) => this.reactTable = r}
									data={this.state.data} columns={columns}
									defaultPageSize = {-1}
									showPagination={false}
					/>
				</div>

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
					notify = {this.notify}
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