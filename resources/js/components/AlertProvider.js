import React from 'react'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App'

// optional cofiguration
const options = {
	position: 'bottom center',
	timeout: 5000,
	offset: '30px',
	transition: 'scale'
}

const AlertProvider = () => (
	<AlertProvider template={AlertTemplate} {...options}>
		<App />
	</AlertProvider>
)

export default AlertProvider
