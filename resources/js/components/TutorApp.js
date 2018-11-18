// resources/assets/js/components/TutorApp.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewTutor from "./NewTutor";
import DataList from "./DataList";

class App extends Component {
	render () {
		return (
			<BrowserRouter>
					<Switch>
						<Route path='/apply' component={NewTutor} />
						<Route path='/data' component={DataList} />
					</Switch>
			</BrowserRouter>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('howard'))