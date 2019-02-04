import axios from 'axios'
import React, { Component } from 'react';
import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from 'classnames';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Container, Row, Col } from 'reactstrap';

class SelectProfile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dropdownOpen: false,
			profiles: [],
			selectedProfile: [],
			profile_type: 'tutors',
			dropDownTitle: 'Select Tutor'
		};

		this.toggle = this.toggle.bind(this);
		this.changeProfile = this.changeProfile.bind(this);
	}

	componentDidMount () {
		axios.get('/api/'+this.state.profile_type).then(response => {
			this.setState({
				profiles: response.data
			})
		})
	}

	changeProfile(e) {
		this.setState({selectedProfile: e}, function () {
		});

		this.setState({
			dropDownTitle: e.first_name + ' ' + e.last_name
		})
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));

	}

	render() {

		const stand = {
			width: 500
		}

		return (

			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={stand}>
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

		);
	}
}

export default SelectProfile;