import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ModalProfile from './ModalProfile';
import TutorProfile from "./TutorProfile";
import MatchMaker from "./MatchMaker";

class TutorList extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {show: false};

		this.toggle = this.toggle.bind(this);
		this.newMatch = this.newMatch.bind(this);
		this.state = {
			activeTab: '1',
			profile_data: [],
			modal_comp: 'profile'
		};
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	newMatch() {
		this.setState({
			modal_comp : 'match'
		})

		this._modal.toggle();
		this._modal.setState({modal_size:'lg'});
	}


	handleEdit(row) {
		this.setState({
			modal_comp : 'profile'
		})

		this.setState({
			profile_data : row
		})

		this._modal.toggle();
		this._modal.setState({modal_size:'sm'});
	}

	render() {

		const iconStyle = {
			marginRight: '10px'
		}

		const columns2 = Object.keys({tutor_data}).map((key, id)=>{
			return {
				Header: id,
				accessor: id
			}
		})

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
											data={tutor_data}
											columns={columns}
											defaultPageSize = {3}
											pageSizeOptions = {[3, 6]}
										/>

										<div>

											<ModalProfile
												ref={(modal) => { this._modal = modal; }}
												modal_title = {this.state.profile_data.first_name + " " + this.state.profile_data.last_name}
											>
												{(() => {
													switch (this.state.modal_comp) {
														case "match": return <MatchMaker></MatchMaker>
														default:      return <TutorProfile selectedProfile={this.state.profile_data}/>
													}
												})()}
											</ModalProfile>

										</div>


										<div>
											<Button color="primary" onClick={this.newMatch}>primary</Button>{' '}
										</div>
									</div>






		);
	}
}

export default TutorList;