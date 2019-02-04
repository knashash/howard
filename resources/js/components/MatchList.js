import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from '../components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ModalProfile from "./ModalProfile";
import MatchMaker from "./MatchMaker";
import TutorProfile from "./TutorProfile";

class MatchList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: match_data
		};
		this.showModal = this.showModal.bind(this);
		this.newMatch = this.newMatch.bind(this);
		this.setMatchListDatas = this.setMatchListDatas.bind(this);

	}

	handleEdit() {
		console.log("The link was clicked");
	}

	setMatchListDatas() {

		console.log('im here johnny!')
		var self = this
		axios.get('/api/matches').then(function (response) {
			self.setState({
				data: response.data
			})
		})
			.catch(function (error) {
				console.log(error);
			});

		this._modal.toggle();
	}

	newMatch() {
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
						{(() => {
							switch (this.state.modal_comp) {
								case "match": return <MatchMaker
									setMatchListDatas={this.setMatchListDatas}
								></MatchMaker>
								default:      return <TutorProfile selectedProfile={this.state.profile_data}/>
							}
						})()}
					</ModalProfile>

				</div>


				<div>
					<Button color="primary" onClick={this.newMatch}>primary</Button>{' '}
				</div>

				<ReactTable
					noDataText="Oh Noes! No Data"
					data={this.state.data}
					columns={columns}
					defaultPageSize = {10}
					pageSizeOptions = {[10, 20]}
				/>
			</div>
		);
	}
}

export default MatchList;