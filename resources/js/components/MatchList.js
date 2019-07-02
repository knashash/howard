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
		};
		this.showModal = this.showModal.bind(this);
		this.newMatch = this.newMatch.bind(this);
		this.setMatchListData = this.setMatchListData.bind(this);
		this.toggle = this.toggle.bind(this);

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
	};


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
					<Col ><Button size="sm" color="primary" onClick={this.newMatch}>New Match</Button>{' '}</Col>
				</Row>

				<ReactTable
					noDataText="Oh Noes! No Data"
					data={this.state.data}
					columns={columns}
					defaultPageSize = {10}
					pageSizeOptions = {[10, 20]}
				/>

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