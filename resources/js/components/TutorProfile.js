// resources/assets/js/components/NewTutor.js

import axios from 'axios'
import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardHeader, CardFooter, CardSubtitle, Button,Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SelectProfile from './SelectProfile';

class TutorProfile extends Component {

	constructor () {
		super()
		this.state = {
			profile: [],
			dropdownOpen: false,
			profiles: [],
			selectedProfile: [],
			profile_type: 'tutors',
			dropDownTitle: 'Select Tutor'
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

		return (


				<Card>
					<CardHeader>

					</CardHeader>

					<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />

					<CardBody>
						<CardTitle>
							<Row>
								<Col xs="auto">
									<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
										<DropdownToggle caret>
											{this.state.dropDownTitle}
										</DropdownToggle>
										<DropdownMenu>
											{this.state.profiles.map(function(e, i){
												return <DropdownItem
													key={i}
												>
													<div onClick={() => { this.changeProfile(e) }}>{[ e.first_name + ' ' + e.last_name]}</div>
												</DropdownItem>;
											}, this)}
										</DropdownMenu>
									</Dropdown>
								</Col>
							</Row>
						</CardTitle>
						<CardSubtitle>{profile.city}</CardSubtitle>
						<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
						<Button>Button</Button>
					</CardBody>
				</Card>



		);
	}
}

export default TutorProfile;