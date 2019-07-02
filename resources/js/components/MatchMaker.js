import axios from 'axios'
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardImg, CardText, CardBody, CardTitle, CardHeader, CardFooter, CardSubtitle, Form, FormGroup, Label, Input, FormText, Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import TutorProfile from "./TutorProfile";
import StudentProfile from "./StudentProfile";
import confirm from 'reactstrap-confirm';

class MatchMaker extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {show: false};

		this.state = {
			activeTab: '1',
			tutor_profile_data: undefined,
			tutor_id: 0,
			student_id: 0,
			student_profile_data: undefined,
			selectedMatch: undefined,
			match_meeting_details: [],
			match_locations: [],
			modal_comp: 'profile',
			test_prop: 'karim',
			submit_text: 'Create Match',
		};

		this.setTutorProfile = this.setTutorProfile.bind(this)
		this.setStudentProfile = this.setStudentProfile.bind(this)
		this.handleCreateNewMatch = this.handleCreateNewMatch.bind(this)
		this.populateMatchData = this.populateMatchData.bind(this)
		this.testFunc = this.testFunc.bind(this)
		this.hasErrorFor = this.hasErrorFor.bind(this)
	}

	componentWillMount () {

		axios.get('/api/match_locations').then(response => {
			this.setState({
				match_locations: response.data
			})
		})

		if (this.props.selectedMatch !== undefined) {
			this.populateMatchData(this.props.selectedMatch)

		}
	}

	hasErrorFor (field) {
		return !!this.state.errors[field]
	}

	handleFieldChange = idx => evt => {
		this.setState({
			[evt.target.name]: evt.target.value

		}, function () {
			console.log(evt.target.value);
		})

		console.log('test');
	}

	handleMeetingDetailsChange = idx => evt => {

		let match_location_id;
		let meeting_time;
		let day;
		const newMatchMeetingDetails = this.state.match_meeting_details.map((match_meeting_detail, sidx) => {

			match_location_id = match_meeting_detail.match_location_id
			day = match_meeting_detail.day
			meeting_time = match_meeting_detail.meeting_time

			if (sidx == idx)
			{
				if (evt.target.name == 'location')  match_location_id = evt.target.value
				if (evt.target.name == 'day')  day = evt.target.value
				if (evt.target.name == 'time')  meeting_time = evt.target.value
				return { ...match_meeting_detail, id:idx, match_location_id: match_location_id, day:day,meeting_time:meeting_time }
			}
			else
			{
				return { ...match_meeting_detail, id:sidx, match_location_id: match_location_id, day:day,meeting_time:meeting_time }
			}
		});

		this.setState({ match_meeting_details: newMatchMeetingDetails });
	};

	handleAddMeetingDetails = () => {
		this.setState({
			match_meeting_details: this.state.match_meeting_details.concat([{ match_location_id: 1, meeting_time:"", day:"" }])
		});
	};

	handleRemoveMeetingDetails = idx => () => {
		this.setState({
			match_meeting_details: this.state.match_meeting_details.filter((s, sidx) => idx !== sidx)
		});
	};

	populateMatchData(e) {

		this.setState({selectedMatch: e}, function () {
		});

		let submitTextState;
		submitTextState = e.id ? "Update Match" : "Add Match";
		this.setState({
			tutor_profile_data: e.tutor,
			student_profile_data: e.student,
			match_meeting_details: e.match_meeting_details,
			submit_text: submitTextState
		})

	}

	async handleCreateNewMatch (event) {

		event.preventDefault()
		const notify_obj = [];

		if (this.state.tutor_profile_data == undefined || this.state.student_profile_data == undefined )
		{
			notify_obj.text = 'Please Select A Tutor and a Student To Create A Match';
			notify_obj.type = 'error';

			this.props.notify(notify_obj);
			return;
		}

			const match_data = {
				tutor_id: this.state.tutor_profile_data.id,
				student_id: this.state.student_profile_data.id,
				match_meeting_details: this.state.match_meeting_details
			}

		if (this.state.selectedMatch !== undefined)
		{
			try {
				let response = await confirm({
					message: "Update This Mactch?",
				});

				if (response)
				{
					var self = this
					axios.put(`/api/matches/${this.state.selectedMatch.id}`, match_data)
						.then(function (response) {
							self.props.setMatchListData();
							notify_obj.type = 'success';
							notify_obj.text = response.data;
							self.props.notify(notify_obj);
						})
						.catch(function (error) {
							notify_obj.text = 'Error Updating Match! '+error.response.data.message;
							notify_obj.type = 'error';
							self.props.notify(notify_obj);
							self.setState({
								errors: error.response.data.errors
							})
						})
				}

			} catch (err) {

			}
		}
		else
		{
			try {
				let response = await confirm({
					message: "Create This Mactch?",
				});

				if (response)
				{
					var self = this
					axios.post('/api/matches', match_data)
						.then(function (response) {
							notify_obj.type = 'success';
							notify_obj.text = response.data;
							self.props.notify(notify_obj);
							self.props.setMatchListData();
						})
						.catch(function (response) {
							notify_obj.text = 'Error Creating Session! '+response;
							console.log(response.data);
							notify_obj.type = 'error';
							self.props.notify(notify_obj);
						})
				}

			} catch (err) {

				console.log('error caught');
				console.error(err)
			}
		}
	}

	testFunc() {
		console.log('please work');
	}

	setTutorProfile(e) {
		this.setState({tutor_profile_data: e}, function () {
		});
	}

	setStudentProfile(e) {
		this.setState({student_profile_data: e}, function () {
		});
	}

	render() {

		const buttonRow = {
			marginTop: '10px'
		};

		return (
			<Container>
				<Form>
				<Row>
					<Col sm="6">
						<TutorProfile
							selectedProfile={this.state.tutor_profile_data}
							setProfile={this.setTutorProfile}
						/>
					</Col>
					<Col sm="6">
						<StudentProfile
							selectedProfile={this.state.student_profile_data}
							setProfile={this.setStudentProfile}
						/>
					</Col>
				</Row>

					<Row>
						<Col>
							<div>
								<Card>
									<CardBody>
										<CardTitle>Match Meeting Details</CardTitle>
										{this.state.match_meeting_details.map((meeting_details, idx) => (


											<FormGroup row key={meeting_details.id}>
												<label htmlFor={"location_" + idx}>Location</label>
												<Col sm={3}>
													<Input type="select"
															 name="location"
															 id={"location_" + idx}
															 onChange={this.handleMeetingDetailsChange(idx)}
															 value={meeting_details.match_location_id}>
														{this.state.match_locations.map(function(e, i){
															return <option value={e.id} key={e.id}>{[ e.name]}</option>
														}, this)}
													</Input>
												</Col>

												<label htmlFor={"day_" + idx}>Day</label>
												<Col sm={2}>
													<Input type="select"
															 name="day"
															 id={"day_" + idx}
															 onChange={this.handleMeetingDetailsChange(idx)}
															 value={meeting_details.day}>
														<option></option>
														<option>Sun</option>
														<option>Mon</option>
														<option>Tues</option>
														<option>Wed</option>
														<option>Thur</option>
														<option>Fri</option>
														<option>Sat</option>
													</Input>
												</Col>

												<label htmlFor={"time_" + idx}>Time</label>
												<Col sm={2}>
													<Input type="text"
															 name="time"
															 id={"time_" + idx}
															 onChange={this.handleMeetingDetailsChange(idx)}
															 value={meeting_details.meeting_time}>
													</Input>
												</Col>

												<Col sm={1}>
													<span><i className="fa fa-times" aria-hidden="true" onClick={this.handleRemoveMeetingDetails(idx)}></i></span>
												</Col>

											</FormGroup>


										))}

										<FormGroup row>
											<Col sm={{ size: 5 }}>
												<Button size="sm" onClick={this.handleAddMeetingDetails}>Add Meeting Details</Button>
											</Col>
										</FormGroup>
									</CardBody>
								</Card>
							</div>
						</Col>
					</Row>



				<Row>
					<Col sm="12" md={{ size: 6, offset: 5 }} style={buttonRow}>
						<Button color="primary" onClick={this.handleCreateNewMatch}>{this.state.submit_text}</Button>{' '}
					</Col>
				</Row>
				</Form>
			</Container>
		);
	}
}

export default MatchMaker;