import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
	state = {
		hasError: false,
		errorMessage: ''
	}

	componentDidCatch = (error, info) => {
		this.setState({hasError: true, errorMessage: error});
	}

	render() {
		if(this.state.hasError){
			return (
				<div>
					<h1>Oops, something went wrong.</h1>
					<h2>{this.state.errorMessage}</h2>
				</div>
			);
		}else {
			return this.props.children;
		}
	}
}