// resources/assets/js/components/NewTutor.js

import axios from 'axios'
import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardHeader, CardFooter, CardSubtitle, Button,Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Media } from 'reactstrap';

class TutorProfile extends Component {

	constructor () {
		super()
		this.state = {
			profile: [],
			dropdownOpen: false,
			profiles: [],
			selectedProfile: undefined,
			profile_type: 'tutors',
			dropDownTitle: 'Select Tutor',
			profile_image: profile_image_placeholder
		}

		this.toggle = this.toggle.bind(this);
		this.changeProfile = this.changeProfile.bind(this);
	}

	componentDidMount () {
		axios.get('/api/'+this.state.profile_type).then(response => {
			this.setState({
				profiles: response.data
			})
		})

		if (this.props.selectedProfile) {
			this.changeProfile(this.props.selectedProfile)
		}
	}

	changeProfile(e) {

		console.log(e)

		this.setState({selectedProfile: e}, function () {
		});

		this.setState({
			dropDownTitle: e.first_name + ' ' + e.last_name
		})

		this.setState({
			profile: e
		})

		if (this.props.setProfile){
			this.props.setProfile(e)
		}
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));

	}

	render() {
		const greeting = 'Welcome to React';
		let profile = {...this.state.selectedProfile};

		let profile_address = ''

		if (this.state.selectedProfile == undefined)
		{
			profile.email =''
			profile.state = ''
			profile.city = ''
			profile.address = ''
			profile.image_url = this.state.profile_image
		}
		else
		{
			profile_address = profile.address+" "+profile.city+", "+profile.state
		}

		const profileImgStyle = {
			maxHeight: '200px',
			maxWidth: '200px'
		};

		return (


				<Card>
					<CardHeader>
							Tutor Profile
					</CardHeader>

					<Row>
						<Col sm="12" style={{height:200}}>

							<Media>

									<Media object style={profileImgStyle} src={profile.image_url} alt="Generic placeholder image" />

							</Media>
						</Col>
					</Row>

					<CardBody>
						<CardTitle>
							<Row>
								<Col xs="auto">
									<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
										<DropdownToggle caret>
											{this.state.dropDownTitle}
										</DropdownToggle>
										<DropdownMenu
											modifiers={{
												setMaxHeight: {
													enabled: true,
													order: 890,
													fn: (data) => {
														return {
															...data,
															styles: {
																...data.styles,
																overflow: 'auto',
																maxHeight: 200,
															},
														};
													},
												},
											}}
										>
											{this.state.profiles.map(function(e, i){
												return <DropdownItem
													key={i}
												>
													<div onClick={() => { this.changeProfile(e) }}>{[ e.last_name + ', ' +e.first_name]}</div>
												</DropdownItem>;
											}, this)}
										</DropdownMenu>
									</Dropdown>
								</Col>
							</Row>
						</CardTitle>
						{/*
						<CardText>{profile.email}</CardText>
						<CardText>{profile_address}</CardText>
						*/}

					</CardBody>
				</Card>



		);
	}
}

export default TutorProfile;