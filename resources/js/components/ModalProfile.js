import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class ModalProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			backdrop: true,
			modal_title: 'Modal Title',
			modal_size: 'lg'
		};

		this.toggle = this.toggle.bind(this);
		this.changeBackdrop = this.changeBackdrop.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	changeBackdrop(e) {
		let value = e.target.value;
		if (value !== 'static') {
			value = JSON.parse(value);
		}
		this.setState({ backdrop: value });
	}

	render() {

		const modal_style = {
			width: 200
		};

		return (
			<div>
				<Modal size={this.state.modal_size} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
					<ModalHeader toggle={this.toggle}>{this.props.modal_title}</ModalHeader>
					<ModalBody>
						{this.props.children}
					</ModalBody>

					<ModalFooter>
						<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default ModalProfile