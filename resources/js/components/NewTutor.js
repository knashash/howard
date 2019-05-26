// resources/assets/js/components/NewTutor.js
import axios from 'axios'
import React, { Component } from 'react'
import {Form, FormGroup, Label, Input, FormText, Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import confirm from 'reactstrap-confirm';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class NewTutor extends Component {
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
			active: 1,
			notes: '',
			errors: [],
			selectedProfile: [],
			submit_text: 'Add Tutor',
			profile_picture: false
		}
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handleFileChange = this.handleFileChange.bind(this)
		this.handleCreateNewTutor = this.handleCreateNewTutor.bind(this)
		this.hasErrorFor = this.hasErrorFor.bind(this)
		this.renderErrorFor = this.renderErrorFor.bind(this)
		this.populateTutorData = this.populateTutorData.bind(this);
		this.setDOB = this.setDOB.bind(this);
		this.setDateEntry = this.setDateEntry.bind(this);
		this.setDateExit = this.setDateExit.bind(this);
	}


	handleFieldChange (event) {
		this.setState({
			[event.target.name]: event.target.value

		}, function () {
			console.log(this.state.last_name);
		})
	}

	handleFileChange (e) {
		let files = e.target.files;
		let reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload=(e)=>{
			this.setState({
				profile_picture: e.target.result
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

	async handleCreateNewTutor (event) {

		event.preventDefault()

		const { history } = this.props

		const tutor = this.state.selectedProfile

		const tutor_updated = {
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
			profile_picture: this.state.profile_picture
		}

		if (tutor.id)
		{
			try {
				let response = await confirm({
					message: "Update This Tutor?",
				});

				if (response)
				{
					var self = this
					axios.put(`/api/tutors/${tutor.id}`, tutor_updated)
						.then(function (response) {
							// redirect to the homepage
							//history.push('/')
							console.log('calling the test func');
							self.props.setTutorListData();
						})
						.catch(function (error) {
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
					message: "Create This New Tutor?",
				});

				if (response)
				{
					var self = this
					axios.post('/api/tutors', tutor_updated)
						.then(function (response) {
							// redirect to the homepage
							//history.push('/')
							console.log('calling the test func');
							self.props.setTutorListData();
						})
						.catch(function (error) {
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
			this.populateTutorData(this.props.selectedProfile)

		}
	}

	populateTutorData(e) {

		this.setState({selectedProfile: e}, function () {
		});

		let submitTextState;
		submitTextState = e.id ? "Update Tutor" : "Add Tutor";

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
			submit_text: submitTextState
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

		return (

			<Container>
				<Form>
					<Row>
						<Col sm="6">
							<FormGroup>
									<Label for="exampleFile">File</Label>
									<Input type="file" name="file" id="exampleFile" onChange={this.handleFileChange} />
									<FormText color="muted">
										This is some placeholder block-level help text for the above input.
										It's a bit lighter and easily wraps to a new line.
									</FormText>
							</FormGroup>
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

					<Row>
						<Col sm="12" md={{ size: 6, offset: 5 }} style={buttonRow}>
							<Button color="primary" onClick={this.handleCreateNewTutor}>{this.state.submit_text}</Button>{' '}
						</Col>
					</Row>

				</Form>
			</Container>
		)
	}
}

export default NewTutor