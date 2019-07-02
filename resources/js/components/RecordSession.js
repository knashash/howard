import axios from 'axios'
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, FormGroup, Label, Input, FormText, Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import confirm from 'reactstrap-confirm';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class RecordSession extends Component {

	constructor(props, context) {
		super(props, context);

		let offset = -5;

		this.state = {
			inputs: ['input-0'],
			tutors: [],
			students: [],
			session_categories: [],
			dropdownOpen: false,
			tutor_list: [],
			student_list: [],
			sessionDate: moment().format('YYYY-MM-DD'),
			session_category: 1,
			inClass: false,
			sessionMins: 0,
			sessionHours: 0,
			sessionNotes: '',
			selectedSession: undefined,
			submit_text: 'Add Session'
		};

		this.setSessionDate = this.setSessionDate.bind(this);
		this.appendInput = this.appendInput.bind(this)
		this.toggle = this.toggle.bind(this);
		this.updateSessionList = this.updateSessionList.bind(this);
		this.handleSessionCategoryChange = this.handleSessionCategoryChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCreateNewSession = this.handleCreateNewSession.bind(this);
		this.handleInClassChange = this.handleInClassChange.bind(this);
		this.populateSessionData = this.populateSessionData.bind(this);
	}

	handleInClassChange (e) {
		this.setState({inClass: e.target.checked});
	}

	handleSessionCategoryChange (e) {
		console.log(e.target.value)
		this.setState({session_category: e.target.value});
	}

	handleChange(e) {
		if (e.target.checked != undefined && e.target.checked) e.target.value = 1;
		this.setState({ [e.target.name]: e.target.value })
	}

	componentDidMount () {
		axios.get('/api/tutors').then(response => {
			this.setState({
				tutors: response.data
			})
		})

		axios.get('/api/students').then(response => {
			this.setState({
				students: response.data
			})
		})

		axios.get('/api/session_categories').then(response => {
			this.setState({
				session_categories: response.data
			})
		})

		if (this.props.selectedSession !== undefined) {
			this.setState({selectedSession: this.props.selectedSession}, function () {
				this.populateSessionData();
			});
		}

	}

	populateSessionData() {


		const tutorIds = []
		const studentIds = []
		this.state.selectedSession.matches.forEach(function (match) {

			if(tutorIds.indexOf(match.tutor_id) === -1) {
				tutorIds.push(match.tutor_id);
			}
			if(studentIds.indexOf(match.student_id) === -1) {
				studentIds.push(match.student_id);
			}
		});

		const sessionDate = moment(this.state.selectedSession.session_date).toDate()

		this.setState({
			submit_text: 'Update Session',
			session_category: this.state.selectedSession.category_id,
			inClass: this.state.selectedSession.in_class,
			sessionNotes: this.state.selectedSession.notes ? this.state.selectedSession.notes : '',
			sessionHours: this.state.selectedSession.hours,
			sessionMins: this.state.selectedSession.mins,
			sessionDate: sessionDate,
			tutor_list: tutorIds,
			student_list: studentIds
		})
	}

	setSessionDate (date) {
		this.setState({
			sessionDate: date
		});
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));

	}

	updateSessionList(e) {

		let options = e.target.options;
		let value = [];
		for (let i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				value.push(options[i].value);
			}
		}

		this.setState({[e.target.name]: value}, function () {
			console.log(this.state.tutor_list)
			console.log(this.state.student_list)
		});
	}

	async handleCreateNewSession (event) {

		const notify_obj = [];

		event.preventDefault();

		const session = this.state.selectedSession

		const session_data = {
			student_list: this.state.student_list,
			tutor_list: this.state.tutor_list,
			category_id: this.state.session_category,
			notes: this.state.sessionNotes,
			in_class: this.state.inClass,
			session_date: this.state.sessionDate,
			session_mins: this.state.sessionMins,
			session_hours: this.state.sessionHours
		};

		if (session !== undefined)
		{
			try {
				let response = await confirm({
					message: "Update This Session?",
				});

				if (response)
				{
					var self = this
					axios.put(`/api/sessions/${session.id}`, session_data)
						.then(function (response) {
							self.props.setSessionListData();
							notify_obj.type = 'success';
							notify_obj.text = response.data;
							self.props.notify(notify_obj);
						})
						.catch(function (response) {
							notify_obj.text = 'Error Updating Session! '+response;
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
		else {
			try {
				let response = await confirm({
					message: "Create This Session?",
				});

				if (response)
				{
					var self = this

					axios.post('/api/sessions', session_data)
						.then(function (response) {
							notify_obj.type = 'success';
							notify_obj.text = response.data;
							self.props.notify(notify_obj);
							self.props.setSessionListData();
						})
						.catch(function (response) {
							notify_obj.text = 'Error Creating Session! '+response;
							console.log(response.data);
							notify_obj.type = 'error';
							self.props.notify(notify_obj);
						})
				}

			} catch (err) {
				console.error(err)
			}
		}
	}

	appendInput() {
		var newInput = `input-${this.state.inputs.length}`;
		this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
	}

	render() {


		var hourList = [];
		var minList = [];

		for (var i=0; i<13; i++) {
			hourList.push(<option key={i}>{i}</option>);
		}

		for (var i=0; i<=60; i+=5) {
			minList.push(<option key={i}>{i}</option>);
		}

		const buttonRow = {
			marginTop: '10px'
		};


		return (
			<Container>
				<Form>
					<Row>
						<Col sm="4">
							<FormGroup>
								<Label for="sessionCategory">Category:</Label>
								<Input type="select" name="sessionCategory" id="sessionCategory" value={this.state.session_category} onChange={this.handleSessionCategoryChange} >
									{this.state.session_categories.map(function(e, i){
										return <option value={e.id} key={e.id}>{[ e.name]}</option>
									}, this)}
								</Input>
							</FormGroup>
						</Col>

						<Col sm="4">
							<FormGroup check>
								<Label check>
									<Input type="checkbox" name="inClass" checked={this.state.inClass} onChange={this.handleInClassChange}/>{' '}
									In-Class
								</Label>
							</FormGroup>
						</Col>

						<Col sm="4">
							<FormGroup>
								<Label for="sessionNotes">Notes</Label>
								<Input type="textarea" name="sessionNotes" id="sessionNotes" value={this.state.sessionNotes} onChange={this.handleChange}/>
							</FormGroup>
						</Col>

					</Row>
					<Row>
						<Col sm="4">
							<FormGroup>
								<Label for="sessionDate">Date:</Label>
								<br/>
								<DatePicker
									selected={this.state.sessionDate}
									onChange={this.setSessionDate}
									name="sessionDate"
								/>
							</FormGroup>
						</Col>

						<Col sm="4">
							<FormGroup>
								<Label for="sessionHours">Hours</Label>
								<Input type="select" name="sessionHours" id="sessionHours" value={this.state.sessionHours} onChange={this.handleChange} >
									{hourList}
								</Input>
							</FormGroup>
						</Col>

						<Col sm="4">
							<FormGroup>
								<Label for="sessionMins">Minutes</Label>
								<Input type="select" name="sessionMins" id="sessionMins" value={this.state.sessionMins} onChange={this.handleChange} >
									{minList}
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col sm="6">

							<FormGroup>
								<Label for="tutorSelect">Select Tutor(s)</Label>
								<Input type="select" name="tutor_list" id="tutorSelect" value={this.state.tutor_list} onChange={this.updateSessionList} multiple>
									{this.state.tutors.map(function(e, i){
										return <option value={e.id} key={i}>{[ e.last_name + ', ' +e.first_name]}</option>
									}, this)}
								</Input>
							</FormGroup>

						</Col>

						<Col sm="6">
							<FormGroup>
								<Label for="studentSelect">Select Student(s)</Label>
								<Input type="select" name="student_list" id="studentSelect" value={this.state.student_list} onChange={this.updateSessionList} multiple>
									{this.state.students.map(function(e, i){
										return <option value={e.id} key={i}>{[ e.last_name + ', ' +e.first_name]}</option>
									}, this)}
								</Input>
							</FormGroup>

						</Col>

					</Row>

					<Row>
						<Col sm="12" md={{ size: 6, offset: 5 }} style={buttonRow}>
							<Button color="primary" onClick={this.handleCreateNewSession}>{this.state.submit_text}</Button>{' '}
						</Col>
					</Row>
				</Form>
			</Container>
		);
	}
}

export default RecordSession;