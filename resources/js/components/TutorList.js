import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from '../components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ModalExample from './ModalExample';
import TutorProfile from "./TutorProfile";

class TutorList extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {show: false};
		this.showModal = this.showModal.bind(this);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
			greeting_var: 'jumani'
		};

	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}


	handleEdit(row) {
		console.log(row);
		this.setState({
			greeting_var : row.first_name
		})
		this._modal.toggle();
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
											data={tutor_data}
											columns={columns}
											defaultPageSize = {3}
											pageSizeOptions = {[3, 6]}
										/>

										<div>

											<ModalExample ref={(modal) => { this._modal = modal; }}>
												<TutorProfile greeting={this.state.greeting_var}/>
											</ModalExample>

										</div>
									</div>






		);
	}
}

export default TutorList;