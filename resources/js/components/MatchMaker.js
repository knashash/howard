import axios from 'axios'
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'reactstrap';
import TutorProfile from "./TutorProfile";
import StudentProfile from "./StudentProfile";
import confirm from 'reactstrap-confirm';

class MatchMaker extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {show: false};

		this.state = {
			activeTab: '1',
			tutor_profile_data: [],
			tutor_id: 0,
			student_id: 0,
			student_profile_data: [],
			modal_comp: 'profile',
			test_prop: 'karim'
		};

		this.setTutorProfile = this.setTutorProfile.bind(this)
		this.setStudentProfile = this.setStudentProfile.bind(this)
		this.handleCreateNewMatch = this.handleCreateNewMatch.bind(this)
		this.testFunc = this.testFunc.bind(this)
	}

	async handleCreateNewMatch (event) {

		event.preventDefault()

			const match_data = {
				tutor_id: this.state.tutor_profile_data.id,
				student_id: this.state.student_profile_data.id
			}

		try {
			let response = await confirm();

			if (response)
			{
				var self = this
				axios.post('/api/matches', match_data)
					.then(function (response) {
						// redirect to the homepage
						//history.push('/')
						console.log('calling the test func');
						self.props.setMatchListDatas();
					})
					.catch(function (response) {

					})
			}

		} catch (err) {
			console.error(err)
		}


	}

	testFunc() {
		console.log('please work');
	}

	setTutorProfile(e) {

		this.setState({tutor_profile_data: e}, function () {
		});

		console.log('ok')
	}

	setStudentProfile(e) {

		this.setState({student_profile_data: e}, function () {
		});

		console.log('ok')
	}

	render() {

		const buttonRow = {
			marginTop: '10px'
		};

		return (
			<Container>
				<Row>
					<Col sm="6">
						<TutorProfile
							profile={this.state.tutor_profile_data}
							setProfile={this.setTutorProfile}
						/>
					</Col>
					<Col sm="6">
						<StudentProfile
							profile={this.state.student_profile_data}
							setProfile={this.setStudentProfile}
						/>
					</Col>
				</Row>

				<Row>
					<Col sm="12" md={{ size: 6, offset: 5 }} style={buttonRow}>
						<Button color="primary" onClick={this.handleCreateNewMatch}>Do Something</Button>{' '}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default MatchMaker;