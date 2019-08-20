import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Card, Button, Row, Col} from 'reactstrap';
import ModalProfile from './ModalProfile';
import TutorProfile from "./TutorProfile";
import NewTutor from "./NewTutor";
import { CSVLink, CSVDownload } from "react-csv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TutorList extends Component {

	constructor(props, context) {
		super(props, context);

		this.reactTable = React.createRef();
		this.toggle = this.toggle.bind(this);
		this.newTutor = this.newTutor.bind(this);
		this.state = {
			activeTab: '1',
			profile_data: [],
			data: tutor_data,
			modal_comp: 'profile',
			modal_title: 'Add New Tutor',
			show: false,
			collapsed: true,
			dropdownOpen: false,
			isOpen: false,
			dataToDownload: [],
			columns: []
		};
		this.setTutorListData = this.setTutorListData.bind(this);
		this.toggle_nav = this.toggle_nav.bind(this);
		this.download = this.download.bind(this);
	}

	toggle_nav() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	download(event) {
		const currentRecords = this.reactTable.getResolvedState().sortedData;
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

	notify = (message) => {

		if (message.type == 'success') toast.success(message.text);
		else toast.error(message.text);
	}

	setTutorListData() {
		this.updateTutorData()
		this._modal.toggle();
	}

	componentWillMount () {
		this.updateTutorData();
	}

	updateTutorData = () => {
	var self = this
	axios.get('/api/tutors').then(function (response) {
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
				Header: 'Email',
				accessor: 'email'
			},
			{
				Header: 'Phone (cell)',
				accessor: 'phone_cell'
			},
			{
				Header: 'Gender',
				accessor: 'gender'
			},
			{
				Header: 'Student(s)',
				accessor: 'student_list'
			},
			{
				Header: 'Entry Date',
				accessor: 'date_entry'
			},
			{
				Header: 'Exit Date',
				accessor: 'date_exit'
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
}

	handleRemoveMeetingDetails = idx => () => {
		this.setState({
			match_meeting_details: this.state.match_meeting_details.filter((s, sidx) => idx !== sidx)
		});
	};

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	newTutor() {
		this.setState({
			modal_comp : 'tutor',
			profile_data : undefined,
			modal_title: 'Add New Tutor',
		})

		this._modal.toggle();
		this._modal.setState({modal_size:'lg'});

	}

	handleEdit(row) {
		this.setState({
			modal_comp : 'tutor',
			modal_title: 'Edit Tutor Data',
			profile_data : row
		})

		this._modal.toggle();
		this._modal.setState({modal_size:'lg'});
	}

	render() {

		const iconStyle = {
			marginRight: '10px'
		}

		const actionButton = {
			bgColor: 'green'
		}

		const columns= [{
			Header: 'First Name',
			accessor: 'first_name'
		},{
			Header: 'Last Name',
			accessor: 'last_name'
		},
			{
				Header: 'Email',
				accessor: 'email'
			},
			{
				Header: 'Phone (cell)',
				accessor: 'phone_cell'
			},
			{
				Header: 'Gender',
				accessor: 'gender'
			},
			{
				Header: 'Student(s)',
				accessor: 'student_list'
			},
			{
				Header: 'Entry Date',
				accessor: 'date_entry'
			},
			{
				Header: 'Exit Date',
				accessor: 'date_exit'
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
					<Col ><Button size="sm" color="primary" onClick={this.newTutor}>New Tutor</Button>{' '} <Button size="sm" color="primary" onClick={this.download}>Export</Button>{' '}</Col>
				</Row>

				<div>
					<CSVLink
						data={this.state.dataToDownload}
						filename="tutors.csv"
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
								case "tutor": return <NewTutor
									setTutorListData={this.setTutorListData}
									selectedProfile={this.state.profile_data}
									notify = {this.notify}
								></NewTutor>
								default:      return <TutorProfile selectedProfile={this.state.profile_data}/>
							}
						})()}
					</ModalProfile>

				</div>
			</div>
		);
	}
}

export default TutorList;