// resources/assets/js/components/App.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import NewProject from './NewProject'
import ProjectsList from './ProjectsList'
import SingleProject from './SinglqeProject'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const App = () => {
	const alert = useAlert()
	const topRightAlert = useAlert(TopRightAlertContext)

	return (
		<div>


			<BrowserRouter>
				<div>
					<Header />
					<Switch>
						<Route exact path='/' component={ProjectsList} />
						<Route path='/create' component={NewProject} />
						<Route path='/:id' component={SingleProject} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>


	)
}

const Root = () => (
	<AlertProvider template={AlertTemplate}>
		<AlertProvider
			template={AlertTemplate}
			position={positions.TOP_RIGHT}
			context={TopRightAlertContext}
		>
			<App />
		</AlertProvider>
	</AlertProvider>
)




ReactDOM.render(<Root />, document.getElementById('app'))