// resources/assets/js/components/TutorApp.js

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewTutor from "./NewTutor";
import NewStudent from "./NewStudent";
import DataList from "./DataList";


class App extends Component {

	render () {
		return (
			<BrowserRouter>
					<Switch>
						<Route path='/apply' component={NewTutor} />
						<Route path='/data' component={DataList} />
						<Route path='/new-student' component={NewStudent} />
					</Switch>
			</BrowserRouter>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('howard'))