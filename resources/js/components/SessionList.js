import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from '../components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ModalProfile from "./ModalProfile";
import RecordSession from "./RecordSession";
import TutorProfile from "./TutorProfile";
import { CSVLink, CSVDownload } from "react-csv";
import NewTutor from "./NewTutor";

class SessionList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: [],
			session_data: [],
			dataToDownload: [],
			columns: []
		};
		this.showModal = this.showModal.bind(this);
		this.newSession = this.newSession.bind(this);
		this.download = this.download.bind(this);
		this.setSessionListData = this.setSessionListData.bind(this);

	}

	handleEdit(row) {



		this.setState({
			modal_comp : 'session'
		})

		this.setState({
			session_data : row
		})

		this.setState({selectedSession: row}, function () {
			console.log(this.state.session_data)
		});


		this._modal.toggle();
		this._modal.setState({modal_size:'lg'});
	}

	setSessionListData() {

		var self = this
		axios.get('/api/sessions').then(function (response) {
			self.setState({
				data: response.data
			})
		})
			.catch(function (error) {
				console.log(error);
			});

		this._modal.toggle();
	}

	componentWillMount () {
		axios.get('/api/sessions').then(response => {
			this.setState({
				data: response.data
			})

			console.log(response.data);
		})

		let columns= [{
			Header: 'Date',
			accessor: 'session_date',
			show: true
		},{
			Header: 'Type',
			accessor: 'category_name'
		},{
			Header: 'Duration',
			accessor: 'duration'
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

	newSession() {
		this.setState({
			modal_comp : 'match'
		})

		this._modal.toggle();
		this._modal.setState({modal_size:'lg'});
	}

	showModal() {
		this.setState(state => ({
			show: !state.show
		}));
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
		})

		this.csvLink.link.click()

	}

	render() {

		const iconStyle = {
			marginRight: '10px'
		}

		const columns= [{
			Header: 'Date',
			accessor: 'session_date',
			show: true
		},{
			Header: 'Type',
			accessor: 'category_name'
		},{
			Header: 'Duration',
			accessor: 'duration'
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

				<div>

					<ModalProfile
						ref={(modal) => { this._modal = modal; }}
					>
						<RecordSession
							setSessionListData={this.setSessionListData}
							selectedSession={this.state.session_data}
						></RecordSession>
					</ModalProfile>

				</div>

				<Row>
					<Col sm="8" md={{ size: 2, offset: 10 }}><Button color="primary" onClick={this.newSession}>New Session</Button>{' '}</Col>
				</Row>

				<div>
					<button onClick={this.download}>
						Download
					</button>
				</div>
				<div>
					<CSVLink
						data={this.state.dataToDownload}
						filename="data.csv"
						className="hidden"
						ref={(r) => this.csvLink = r}
						target="_blank"/>

				</div>
				<div>
					<ReactTable ref={(r) => this.reactTable = r}
									data={this.state.data} columns={columns} filterable
									defaultFilterMethod={(filter, row) =>
										String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
					/>
				</div>
			</div>
		);
	}
}

export default SessionList;