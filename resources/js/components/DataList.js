import React, { Component } from 'react';
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import TutorList from './TutorList';
import StudentList from './StudentList';
import MatchList from './MatchList';
import SelectProfile from './SelectProfile';


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
						<NavItem>
							<NavLink
								className={classnames({ active: this.state.activeTab === '3' })}
								onClick={() => { this.toggle('3'); }}
							>
								Matches
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
						<TabPane tabId="3">
							<Row>
								<Col sm="12">
									<MatchList />
								</Col>
							</Row>
						</TabPane>
					</TabContent>
				</div>


				<div>

					<SelectProfile/>

				</div>


			</div>
		);
	}
}

export default DataList;