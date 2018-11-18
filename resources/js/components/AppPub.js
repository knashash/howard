// resources/assets/js/components/TutorApp.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewTutor from "./NewTutor";

class App extends Component {
	render () {
		return (
			<BrowserRouter>
					<Switch>
						<Route path='/apply' component={NewTutor} />
					</Switch>
			</BrowserRouter>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('howard-pub'))