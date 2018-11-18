// resources/assets/js/components/NewTutor.js

import axios from 'axios'
import React, { Component } from 'react'

class NewTutor extends Component {
	constructor (props) {
		super(props)
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			address: '',
			city: '',
			state: '',
			zip: '',
			errors: []
		}
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handleCreateNewTutor = this.handleCreateNewTutor.bind(this)
		this.hasErrorFor = this.hasErrorFor.bind(this)
		this.renderErrorFor = this.renderErrorFor.bind(this)
	}

	handleFieldChange (event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleCreateNewTutor (event) {

		event.preventDefault()

		const { history } = this.props

		const tutor = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			zip: this.state.zip
		}

		axios.post('/api/tutors', tutor)
			.then(response => {
				// redirect to the homepage
				history.push('/')
			})
			.catch(error => {
				this.setState({
					errors: error.response.data.errors
				})
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
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card">
							<div className="card-header">Tutor Application</div>

							<div className="card-body">
								<form className="form-horizontal" onSubmit={this.handleCreateNewTutor}>
									<div className="form-group">
										<div className="form-group row">
											<div className="col-md-4">
												<label htmlFor="first_name">First Name</label>
												<input type="text"
														 className={`form-control ${this.hasErrorFor('first_name') ? 'is-invalid' : ''}`}
														 id="first_name"
														 value={this.state.first_name}
														 name='first_name'
														 onChange={this.handleFieldChange}
														 placeholder=""/>
												{this.renderErrorFor('first_name')}
											</div>
											<div className="col-md-4">
												<label htmlFor="last_name">Last Name</label>
												<input type="text"
														 className={`form-control ${this.hasErrorFor('last_name') ? 'is-invalid' : ''}`}
														 id="last_name"
														 value={this.state.last_name}
														 name='last_name'
														 onChange={this.handleFieldChange}
														 placeholder=""/>
												{this.renderErrorFor('last_name')}
											</div>
											<div className="col-md-4">
												<label htmlFor="email">Email</label>
												<input type="email"
														 className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
														 id="email"
														 value={this.state.email}
														 name='email'
														 onChange={this.handleFieldChange}
														 placeholder=""/>
												{this.renderErrorFor('email')}
											</div>
										</div>
									</div>

									<div className="form-group">
										<label htmlFor="address">Address</label>
										<input type="text"
												 className={`form-control ${this.hasErrorFor('address') ? 'is-invalid' : ''}`}
												 id="address"
												 value={this.state.address}
												 name='address'
												 onChange={this.handleFieldChange}
												 placeholder=""/>
										{this.renderErrorFor('address')}
									</div>

									<div className="form-group">
										<div className="form-group row">
											<div className="col-md-6">
												<label htmlFor="city">City</label>
												<input type="text"
														 className={`form-control ${this.hasErrorFor('city') ? 'is-invalid' : ''}`}
														 id="city"
														 value={this.state.city}
														 name='city'
														 onChange={this.handleFieldChange}
														 placeholder=""/>
												{this.renderErrorFor('city')}
											</div>
											<div className="col-md-2">
												<label htmlFor="state">State</label>
												<input type="text"
														 className={`form-control ${this.hasErrorFor('state') ? 'is-invalid' : ''}`}
														 id="state"
														 value={this.state.state}
														 name='state'
														 onChange={this.handleFieldChange}
														 placeholder=""/>
												{this.renderErrorFor('state')}
											</div>
											<div className="col-md-4">
												<label htmlFor="zip">Zipcode</label>
												<input type="zip"
														 className={`form-control ${this.hasErrorFor('zip') ? 'is-invalid' : ''}`}
														 id="zip"
														 value={this.state.zip}
														 name='zip'
														 onChange={this.handleFieldChange}
														 placeholder=""/>
												{this.renderErrorFor('zip')}
											</div>
										</div>
									</div>

									<button type="submit" className="btn btn-default">Submit</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NewTutor