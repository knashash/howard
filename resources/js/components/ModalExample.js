import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class ModalExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			backdrop: true
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
		return (
			<div>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
					<ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
					<ModalBody>
						{this.props.children}
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
						<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default ModalExample