import axios from 'axios'
import React, { Component } from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, CardHeader, CardFooter, CardSubtitle, Form, FormGroup, Label, Input, FormText, Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap';
import confirm from 'reactstrap-confirm';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

class StudentAddUpdate extends Component {
	constructor (props) {
		super(props)
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			address: '',
			city: '',
			state: 'IL',
			zip: '',
			dob: '',
			ethnic_group: '',
			gender: '',
			phone_cell: '',
			phone_home: '',
			date_entry: '',
			date_exit: '',
			test_date: '',
			active: 1,
			notes: '',
			errors: [],
			selectedProfile: [],
			test_results: [],
			submit_text: 'Add Student',
			profile_image: false,
			image_url: profile_image_placeholder
		}
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handleFileChange = this.handleFileChange.bind(this)
		this.handleCreateNewStudent = this.handleCreateNewStudent.bind(this)
		this.hasErrorFor = this.hasErrorFor.bind(this)
		this.renderErrorFor = this.renderErrorFor.bind(this)
		this.populateStudentData = this.populateStudentData.bind(this);
		this.setDOB = this.setDOB.bind(this);
		this.setDateEntry = this.setDateEntry.bind(this);
		this.setDateExit = this.setDateExit.bind(this);
		this.setTestDate = this.setTestDate.bind(this);
	}

	handleFieldChange (event) {
		this.setState({
			[event.target.name]: event.target.value

		}, function () {
			console.log(this.state.last_name);
		})
	}

	handleAddTestResults = () => {
		this.setState({
			test_results: this.state.test_results.concat([{ test_date:"", test_type:"", test_score:"", test_group:""
				, test_num:"", test_letter:"", test_subject:""}])
		});
	};

	handleRemoveTestResults = idx => () => {
		this.setState({
			test_results: this.state.test_results.filter((s, sidx) => idx !== sidx)
		});
	};

	handleTestResultsChange = idx => evt => {

		let test_date;
		let test_type;
		let test_score;
		let test_group;
		let test_num;
		let test_letter;
		let test_subject;

		const newTestResults = this.state.test_results.map((test_result, sidx) => {

			test_date = test_result.test_date
			test_score = test_result.test_score
			test_type = test_result.test_type
			test_group = test_result.test_group
			test_num = test_result.test_num
			test_letter = test_result.test_letter
			test_subject = test_result.test_subject

			if (sidx == idx)
			{
				if (evt instanceof Date)
				{
					test_date = evt
				}
				else
				{
					if (evt.target.name == 'test_score')  test_score = evt.target.value
					if (evt.target.name == 'test_type')  test_type = evt.target.value
					if (evt.target.name == 'test_group')  test_group = evt.target.value
					if (evt.target.name == 'test_num')  test_num = evt.target.value
					if (evt.target.name == 'test_letter')  test_letter = evt.target.value
					if (evt.target.name == 'test_subject')  test_subject = evt.target.value
				}

				return { ...test_result, id:idx, test_date: test_date, test_score: test_score, test_type: test_type,
					test_group: test_group, test_num: test_num, test_letter: test_letter, test_subject: test_subject,
				}
			}
			else
			{
				return { ...test_result, id:sidx, test_date: test_date, test_score: test_score, test_type: test_type,
					test_group: test_group, test_num: test_num, test_letter: test_letter, test_subject: test_subject,
				}
			}
		});


		this.setState({ test_results: newTestResults }, function () {
			console.log(this.state.test_results);
		})
	};

	handleFileChange (e) {
		let files = e.target.files;
		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload=(e)=>{
			this.setState({
				profile_image: e.target.result,
				image_url: e.target.result
			});
		}
	}

	setDOB (date) {
		this.setState({
			dob: date
		});
	}
	setDateEntry (date) {
		this.setState({
			date_entry: date
		});
	}
	setDateExit (date) {
		this.setState({
			date_exit: date
		});
	}
	setTestDate (date) {
		this.setState({
			test_date: date
		});

		this.setState({ test_date: date }, function () {
			console.log(this.state.test_date);
		})
	}

	async handleCreateNewStudent (event) {

		event.preventDefault()

		const { history } = this.props
		const notify_obj = [];

		const student = this.state.selectedProfile

		const student_updated = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip,
			dob: this.state.dob,
			ethnic_group: this.state.ethnic_group,
			gender: this.state.gender,
			phone_cell: this.state.phone_cell,
			phone_home: this.state.phone_home,
			date_entry: this.state.date_entry,
			date_exit: this.state.date_exit,
			active: this.state.active,
			notes: this.state.notes,
			profile_image: this.state.profile_image,
			student_tests: this.state.test_results
		}

		if (student.id)
		{
			try {
				let response = await confirm({
					message: "Update This Student?",
				});

				if (response)
				{
					var self = this
					axios.put(`/api/students/${student.id}`, student_updated)
						.then(function (response) {
							notify_obj.type = 'success';
							notify_obj.text = response.data;
							self.props.notify(notify_obj);
							self.props.setStudentListData();
						})
						.catch(function (error) {
							notify_obj.text = 'Error Updating Student! '+error.response.data.message;
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
					message: "Create This New Student?",
				});

				if (response)
				{
					var self = this
					axios.post('/api/students', student_updated)
						.then(function (response) {
							notify_obj.type = 'success';
							notify_obj.text = response.data;
							self.props.notify(notify_obj);
							self.props.setStudentListData();
						})
						.catch(function (error) {
							notify_obj.text = 'Error Creating Student! '+error.response.data.message;
							notify_obj.type = 'error';
							self.setState({
								errors: error.response.data.errors
							})
						})
				}

			} catch (err) {

			}
		}


	}

	componentDidMount () {
		if (this.props.selectedProfile !== undefined) {
			this.populateStudentData(this.props.selectedProfile)

		}
	}

	populateStudentData(e) {

		this.setState({selectedProfile: e}, function () {
		});

		let submitTextState;
		submitTextState = e.id ? "Update Student" : "Add Student";

		let state;
		state = e.state ? e.state : "IL";

		this.setState({
			first_name: e.first_name,
			last_name: e.last_name,
			email: e.email,
			address: e.address,
			city: e.city,
			state: e.state,
			zip: e.zip,
			dob: e.dob,
			ethnic_group: e.ethnic_group,
			gender: e.gender,
			phone_cell: e.phone_cell,
			phone_home: e.phone_home,
			date_entry: e.date_entry,
			date_exit: e.date_exit,
			active: e.active,
			notes: e.notes,
			submit_text: submitTextState,
			image_url: e.image_url,
			test_results: e.test_results
		})

	}

	hasErrorFor (field) {
		return !!this.state.errors[field]
	}

	renderErrorFor (field) {
		if (this.hasErrorFor(field)) {
			return (
				<span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
			)
		}
	}

	render () {

		const buttonRow = {
			marginTop: '10px'
		};

		const testResultsStyle = {
			fontSize: '10px',
			width:'70px',
		};

		const testLetterStyle = {
			fontSize: '10px',
			width:'70px',
		};

		const datePickStyle = {
			size:'10'
		};

		const profileImgStyle = {
			maxHeight: '128px',
			maxWidth: '128px'
		};

		const removeStyle = {
			color: 'white',
		};
		const removeStyle2 = {
			marginTop: '30px',
		};

		const testingDivStyle = {
			marginTop: '20px'
		}

		return (

			<Container>
				<Form>
					<Row>
						<Col sm="12">

							<Media>
								<Media left href="#">
									<Media object style={profileImgStyle} src={this.state.image_url} alt="Generic placeholder image" />
								</Media>
								<Media body>
									<FormGroup>
										<Input size="sm" type="file" name="profile_image" id="profile_image" label="Yo, pick a file!" onChange={this.handleFileChange} />
										<FormText color="muted">
											Upload an image to update the profile picture
										</FormText>
									</FormGroup>
								</Media>
							</Media>
						</Col>
					</Row>
					<Row>
						<Col sm="12">
							<hr/>
						</Col>
					</Row>
					<Row>
						<Col sm="3">
							<FormGroup>
								<label htmlFor="first_name">First Name</label>
								<Input type="text"
										 className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
										 id="first_name"
										 value={this.state.first_name}
										 onChange={this.handleFieldChange}
										 name='first_name'
										 placeholder=""/>
								{this.renderErrorFor('first_name')}
							</FormGroup>
						</Col>

						<Col sm="4">
							<FormGroup>
								<label htmlFor="last_name">Last Name</label>
								<Input type="text"
										 className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
										 id="last_name"
										 value={this.state.last_name}
										 name='last_name'
										 onChange={this.handleFieldChange}
										 placeholder=""/>
								{this.renderErrorFor('last_name')}
							</FormGroup>
						</Col>

						<Col sm="4">
							<FormGroup>
								<label htmlFor="email">Email</label>
								<Input type="email"
										 className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
										 id="email"
										 value={this.state.email}
										 name='email'
										 onChange={this.handleFieldChange}
										 placeholder=""/>
								{this.renderErrorFor('email')}
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col sm="10">
							<FormGroup>
								<label htmlFor="address">Address</label>
								<Input type="text"
										 className={`form-control ${this.hasErrorFor('address') ? 'is-invalid' : ''}`}
										 id="address"
										 value={this.state.address}
										 name='address'
										 onChange={this.handleFieldChange}
										 placeholder=""/>
								{this.renderErrorFor('address')}
							</FormGroup>
						</Col>
					</Row>


					<Row>
						<Col sm="5">
							<FormGroup>
								<label htmlFor="city">City</label>
								<Input type="text"
										 className={`form-control ${this.hasErrorFor('city') ? 'is-invalid' : ''}`}
										 id="city"
										 value={this.state.city}
										 name='city'
										 onChange={this.handleFieldChange}
										 placeholder=""/>
								{this.renderErrorFor('city')}
							</FormGroup>
						</Col>

						<Col sm="4">
							<FormGroup>
								<label htmlFor="state">State</label>
								<Input type="select" name="state" id="state" onChange={this.handleFieldChange} value={this.state.state}>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
									<option value="AZ">Arizona</option>
									<option value="AR">Arkansas</option>
									<option value="CA">California</option>
									<option value="CO">Colorado</option>
									<option value="CT">Connecticut</option>
									<option value="DE">Delaware</option>
									<option value="DC">District Of Columbia</option>
									<option value="FL">Florida</option>
									<option value="GA">Georgia</option>
									<option value="HI">Hawaii</option>
									<option value="ID">Idaho</option>
									<option value="IL">Illinois</option>
									<option value="IN">Indiana</option>
									<option value="IA">Iowa</option>
									<option value="KS">Kansas</option>
									<option value="KY">Kentucky</option>
									<option value="LA">Louisiana</option>
									<option value="ME">Maine</option>
									<option value="MD">Maryland</option>
									<option value="MA">Massachusetts</option>
									<option value="MI">Michigan</option>
									<option value="MN">Minnesota</option>
									<option value="MS">Mississippi</option>
									<option value="MO">Missouri</option>
									<option value="MT">Montana</option>
									<option value="NE">Nebraska</option>
									<option value="NV">Nevada</option>
									<option value="NH">New Hampshire</option>
									<option value="NJ">New Jersey</option>
									<option value="NM">New Mexico</option>
									<option value="NY">New York</option>
									<option value="NC">North Carolina</option>
									<option value="ND">North Dakota</option>
									<option value="OH">Ohio</option>
									<option value="OK">Oklahoma</option>
									<option value="OR">Oregon</option>
									<option value="PA">Pennsylvania</option>
									<option value="RI">Rhode Island</option>
									<option value="SC">South Carolina</option>
									<option value="SD">South Dakota</option>
									<option value="TN">Tennessee</option>
									<option value="TX">Texas</option>
									<option value="UT">Utah</option>
									<option value="VT">Vermont</option>
									<option value="VA">Virginia</option>
									<option value="WA">Washington</option>
									<option value="WV">West Virginia</option>
									<option value="WI">Wisconsin</option>
									<option value="WY">Wyoming</option>
								</Input>
								{this.renderErrorFor('state')}
							</FormGroup>
						</Col>

						<Col sm="2">
							<FormGroup>
								<label htmlFor="zip">Zipcode</label>
								<Input type="zip"
										 className={`form-control ${this.hasErrorFor('zip') ? 'is-invalid' : ''}`}
										 id="zip"
										 value={this.state.zip}
										 name='zip'
										 onChange={this.handleFieldChange}
										 placeholder=""/>
								{this.renderErrorFor('zip')}
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col sm="3">
							<FormGroup>
								<label htmlFor="dob">DOB</label>
								<br/>
								<DatePicker
									selected={this.state.dob}
									onChange={this.setDOB}
									name="dob"
									id="dob"
								/>
							</FormGroup>
						</Col>

						<Col sm="3">
							<FormGroup>
								<label htmlFor="gender">Gender</label>
								<Input type="select" name="gender" id="gender" onChange={this.handleFieldChange} value={this.state.gender}>
									<option></option>
									<option value="M">Male</option>
									<option value="F">Female</option>
								</Input>
								{this.renderErrorFor('gender')}
							</FormGroup>
						</Col>

						<Col sm="3">
							<FormGroup>
								<label htmlFor="phone_cell">Phone (Cell)</label>
								<Input type="text"
										 className={`form-control ${this.hasErrorFor('phone_cell') ? 'is-invalid' : ''}`}
										 id="phone_cell"
										 value={this.state.phone_cell}
										 name='phone_cell'
										 onChange={this.handleFieldChange}
										 placeholder=""/>
								{this.renderErrorFor('phone_cell')}
							</FormGroup>
						</Col>

						<Col sm="3">
							<FormGroup>
								<label htmlFor="phone_home">Phone (Home)</label>
								<Input type="text"
										 className={`form-control ${this.hasErrorFor('phone_home') ? 'is-invalid' : ''}`}
										 id="phone_home"
										 value={this.state.phone_home}
										 name='phone_home'
										 onChange={this.handleFieldChange}
										 placeholder=""/>
								{this.renderErrorFor('phone_home')}
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col sm="3">
							<FormGroup>
								<label htmlFor="ethnic_group">Ethnic Group</label>
								<Input type="select" name="ethnic_group" id="ethnic_group" onChange={this.handleFieldChange} value={this.state.ethnic_group}>
									<option></option>
									<option>Black</option>
									<option>White</option>
									<option>Hispanic</option>
									<option>Asian</option>
									<option>Indigenous</option>
									<option>Other</option>
								</Input>
								{this.renderErrorFor('ethnic_group')}
							</FormGroup>
						</Col>

						<Col sm="3">
							<FormGroup>
								<label htmlFor="date_entry">Date Entry</label>
								<br/>
								<DatePicker
									selected={this.state.date_entry}
									onChange={this.setDateEntry}
									name="date_entry"
									id="date_entry"
								/>
								{this.renderErrorFor('date_entry')}
							</FormGroup>
						</Col>

						<Col sm="3">
							<FormGroup>
								<label htmlFor="date_exit">Date Exit</label>
								<br/>
								<DatePicker
									selected={this.state.date_exit}
									onChange={this.setDateExit}
									name="date_entry"
									id="date_entry"
								/>
								{this.renderErrorFor('date_exit')}
							</FormGroup>
						</Col>

						<Col sm="3">
							<FormGroup>
								<label htmlFor="active">Status</label>
								<Input type="select" name="active" id="active" onChange={this.handleFieldChange} value={this.state.active}>
									<option value="1">Active</option>
									<option value="0">Inactive</option>
								</Input>
								{this.renderErrorFor('active')}
							</FormGroup>
						</Col>
					</Row>

					<Row>
						<Col sm="12">
							<label htmlFor="notes">Notes</label>
							<Input type="textarea"
									 className={`form-control ${this.hasErrorFor('notes') ? 'is-invalid' : ''}`}
									 id="notes"
									 value={this.state.notes}
									 name='notes'
									 onChange={this.handleFieldChange}
									 placeholder=""/>
							{this.renderErrorFor('notes')}
						</Col>
					</Row>

					<Row noGutters>
						<Col>
							<div style={testingDivStyle}>
								<Card>
									<CardBody>
										<CardTitle>Test Results</CardTitle>
										{this.state.test_results.map((test_details, idx) => (


											<Row noGutters>

												<Col>
													<FormGroup style={testResultsStyle}>
														<label htmlFor={"test_date_" + idx}>Date</label>
														<br/>
														<DatePicker className='testDate'
															selected={test_details.test_date}
																		onChange={this.handleTestResultsChange(idx)}
																		name="test_date"
																		id={"test_date_" + idx}
														/>
													</FormGroup>
												</Col>

												<Col>
													<FormGroup style={testResultsStyle}>
														<label htmlFor={"test_type_" + idx}>Type</label>
														<Input type="select"
																 name="test_type"
																 id={"test_type_" + idx}
																 onChange={this.handleTestResultsChange(idx)}
																 value={test_details.test_type}
																 bsSize="small"
																 style={testResultsStyle}>
															<option></option>
															<option>Pre</option>
															<option>Post</option>
														</Input>
													</FormGroup>
												</Col>

												<Col>
													<FormGroup style={testResultsStyle}>
														<label htmlFor={"test_score_" + idx}>Score</label>
														<Input type="text"
																 name="test_score"
																 id={"test_score_" + idx}
																 onChange={this.handleTestResultsChange(idx)}
																 value={test_details.test_score}
																 bsSize="small"
																 style={testResultsStyle}>
														</Input>
													</FormGroup>
												</Col>

												<Col>
													<FormGroup style={testResultsStyle}>
														<label htmlFor={"test_group_" + idx}>Group</label>
														<Input type="select"
																 name="test_group"
																 id={"test_group_" + idx}
																 onChange={this.handleTestResultsChange(idx)}
																 value={test_details.test_group}
																 bsSize="small"
																 style={testResultsStyle}>
															<option></option>
															<option>Best Plus</option>
															<option>Best Lit</option>
															<option>Tabe</option>
															<option>Sort</option>
														</Input>
													</FormGroup>
												</Col>

												<Col>
													<FormGroup style={testResultsStyle}>
														<label htmlFor={"num_" + idx}>Num</label>
														<Input type="select"
																 name="test_num"
																 id={"test_num_" + idx}
																 onChange={this.handleTestResultsChange(idx)}
																 value={test_details.test_num}
																 bsSize="small"
																 style={testResultsStyle}>
															<option></option>
															<option>9</option>
															<option>10</option>
															<option>11</option>
														</Input>
													</FormGroup>
												</Col>

												<Col>
													<FormGroup style={testResultsStyle}>
														<label htmlFor={"test_letter_" + idx}>Letter</label>
														<Input type="select"
																 name="test_letter"
																 id={"test_letter_" + idx}
																 onChange={this.handleTestResultsChange(idx)}
																 value={test_details.test_letter}
																 bsSize="small"
																 style={testResultsStyle}>
															<option></option>
															<option>A</option>
															<option>D</option>
															<option>E</option>
															<option>M</option>
														</Input>
													</FormGroup>
												</Col>

												<Col>
													<FormGroup style={testResultsStyle}>
														<label htmlFor={"test_subject_" + idx}>Subject</label>
														<Input type="select"
																 name="test_subject"
																 id={"test_subject_" + idx}
																 onChange={this.handleTestResultsChange(idx)}
																 value={test_details.test_subject}
																 bsSize="small"
																 style={testResultsStyle}>
															<option></option>
															<option>Reading</option>
															<option>Math</option>
														</Input>
													</FormGroup>
												</Col>

												<Col sm={1}>
													<FormGroup style={testResultsStyle}>
														<label htmlFor={"remove" + idx} style={removeStyle}>Remove</label>
														<span name="remove"><i className="fa fa-times" style={removeStyle2} aria-hidden="true" onClick={this.handleRemoveTestResults(idx)}></i></span>
													</FormGroup>

												</Col>
											</Row>


										))}

										<FormGroup row>
											<Col sm={{ size: 5 }}>
												<Button size="sm" onClick={this.handleAddTestResults}>Add Result</Button>
											</Col>
										</FormGroup>
									</CardBody>
								</Card>
							</div>
						</Col>
					</Row>


					<Row>
						<Col sm="12" md={{ size: 6, offset: 5 }} style={buttonRow}>
							<Button color="primary" onClick={this.handleCreateNewStudent}>{this.state.submit_text}</Button>{' '}
						</Col>
					</Row>

				</Form>
			</Container>
		)
	}
}

export default StudentAddUpdate