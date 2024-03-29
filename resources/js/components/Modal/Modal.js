import React, {Component} from 'react';

// gray background
const backdropStyle = {
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	backgroundColor: 'rgba(0,0,0,0.3)',
	padding: 50
}

const modalStyle = {
	backgroundColor: '#fff',
	borderRadius: 5,
	maxWidth: 500,
	minHeight: 300,
	margin: '0 auto',
	padding: 30,
	position: "relative"
};

const footerStyle = {
	position: "absolute",
	bottom: 8,
	right: 16
};

class Modal extends Component {

	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
	}

	onClose(e) {
		this.props.onClose && this.props.onClose(e);
	}

	render() {

		if (!this.props.show) {
			return null;
		}

		return (
			<div style={backdropStyle}>
				<div style={modalStyle}>
					{this.props.children}
					<div>
						<div style={footerStyle}>
							<button type="button" className="btn btn-primary" onClick={(e) => {this.onClose(e)}}>Primary
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Modal