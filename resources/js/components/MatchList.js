import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import ModalProfile from "./ModalProfile";
import MatchMaker from "./MatchMaker";
import TutorProfile from "./TutorProfile";
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink, CSVDownload } from "react-csv";
import 'react-toastify/dist/ReactToastify.css';

class MatchList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: [],
			match_data: [],
			alert_msg: 'testing it out',
			modal_title: 'Create New Match',
			dataToDownload: [],
			columns: []
		};
		this.showModal = this.showModal.bind(this);
		this.newMatch = this.newMatch.bind(this);
		this.setMatchListData = this.setMatchListData.bind(this);
		this.toggle = this.toggle.bind(this);
		this.download = this.download.bind(this);

	}

	notify = (message) => {

		if (message.type == 'success') toast.success(message.text);
		else toast.error(message.text);
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	reloadMatchData = () => {
		var self = this
		axios.get('/api/matches').then(function (response) {
			self.setState({
				data: response.data
			})
			console.log(response.data);
		})
			.catch(function (error) {
				console.log(error);
			});

		let columns= [{
			Header: 'Tutor',
			accessor: 'tutor_name'
		},{
			Header: 'Student',
			accessor: 'student_name'
		},{
			Header: 'Last Session Date',
			accessor: 'latest_session'
		},{
			Header: 'Total Sessions',
			accessor: 'total_sessions'
		},{
			Header: 'Total Session Time',
			accessor: 'total_session_time'
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


	handleEdit(row) {
		this.setState({
			modal_comp : 'match',
			modal_title: 'Edit Match Details',
			match_data : row,
		})

		console.log();

		this._modal.toggle();
		this._modal.setState({modal_size:'lg'});
	}

	setMatchListData() {

		this.reloadMatchData()

		this.setState({
			//alert_msg: m
		})

		//this.notify_success()

		this._modal.toggle();
	}

	newMatch() {
		this.setState({
			modal_comp : 'match',
			match_data : undefined,
			modal_title: 'Create New Match',
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
			Header: 'Tutor',
			accessor: 'tutor_name'
		},{
			Header: 'Student',
			accessor: 'student_name'
		},{
			Header: 'Last Session Date',
			accessor: 'latest_session'
		},{
			Header: 'Total Sessions',
			accessor: 'total_sessions'
		},{
			Header: 'Total Session Time',
			accessor: 'total_session_time'
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
					<Col ><Button size="sm" color="primary" onClick={this.newMatch}>New Match</Button>{' '} <Button size="sm" color="primary" onClick={this.download}>Export</Button>{' '}</Col>
				</Row>

				<div>
					<CSVLink
						data={this.state.dataToDownload}
						filename="matches.csv"
						className="hidden"
						ref={(r) => this.csvLink = r}
						target="_blank"/>

				</div>
				<div>
					<ReactTable ref={(r) => this.reactTable = r}
									data={this.state.data} columns={columns}
									noDataText="Loading Data...."
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
								case "match": return <MatchMaker
									setMatchListData={this.setMatchListData}
									selectedMatch={this.state.match_data}
									notify ={this.notify}
								></MatchMaker>
								default:      return <TutorProfile selectedProfile={this.state.profile_data}/>
							}
						})()}
					</ModalProfile>

				</div>
			</div>
		);
	}
}

export default MatchList;