import axios from 'axios'
import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from '../components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import TutorList from './TutorList';
import StudentList from './StudentList';
import TutorProfile from './TutorProfile';
import ModalExample from './ModalExample';

class DataList extends Component {

	constructor(props) {
		super(props);
		this.state = {show: false};
		this.showModal = this.showModal.bind(this);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1'
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
	}

	showModal() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {

		const greeting = 'hello';

		return (
			<div>
				<div>
					<Nav tabs>
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === '1' })}
								onClick={() => { this.toggle('1'); }}
							>
								Tutors
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === '2' })}
								onClick={() => { this.toggle('2'); }}
							>
								Students
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<Row>
								<Col sm="12">
									<TutorList />
								</Col>
							</Row>
						</TabPane>
						<TabPane tabId="2">
							<Row>
								<Col sm="12">
									<StudentList />
								</Col>
							</Row>
						</TabPane>
					</TabContent>
				</div>


				<div>

					<button onClick={() => this._modal.toggle()}>click</button>
					<ModalExample ref={(modal) => { this._modal = modal; }}>
						<TutorProfile greeting={greeting}/>
					</ModalExample>

				</div>


			</div>
		);
	}
}

export default DataList;