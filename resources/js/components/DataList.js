import React, { Component } from 'react';
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import TutorList from './TutorList';
import StudentList from './StudentList';
import MatchList from './MatchList';
import SessionList from './SessionList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

class DataList extends Component {

	constructor(props) {
		super(props);
		this.state = {show: false};
		this.showModal = this.showModal.bind(this);
		this.match_tab = React.createRef();
		this.tutor_tab = React.createRef();

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
			match_tab_data: []
		};
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
		if (tab == 3) this.match_tab.current.reloadMatchData()
		if (tab == 1) this.tutor_tab.current.updateTutorData()
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

		const toastBar = {
			width: '75%'
		};

		return (
			<div>
				<ToastContainer position={toast.POSITION.TOP_LEFT} style={toastBar}/>
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
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === '3' })}
								onClick={() => { this.toggle('3'); }}
							>
								Matches
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === '4' })}
								onClick={() => { this.toggle('4'), console.log('test'); }}
							>
								Sessions
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<Row>
								<Col sm="12">
									<TutorList ref={this.tutor_tab}/>
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
						<TabPane tabId="3">
							<Row>
								<Col sm="12">
									<MatchList ref={this.match_tab}/>
								</Col>
							</Row>
						</TabPane>
						<TabPane tabId="4">
							<Row>
								<Col sm="12">
									<SessionList />
								</Col>
							</Row>
						</TabPane>
					</TabContent>
				</div>

			</div>
		);
	}
}

export default DataList;