import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ListSection from './components/ListSection';

class App extends Component {
	state = {
		initialCenter: {
            lat: 35.7454071,
            lng:-81.68481880000002
		},
		myPlaces: []
	}

	loadMap = () => {
		loadScript('https://maps.googleapis.com/maps/api/js?key=***REMOVED***&callback=initMap');
			window.initMap = this.initMap;
	}

	initMap = () => {
		let map = new window.google.maps.Map(document.getElementById('map'), {
			center: this.state.initialCenter,
			zoom: 15,
		})
		console.log('map is loaded');

		// this.state.myPlaces.map( myPlace => {

		// 	 this.marker = new window.google.maps.Marker({
		// 		position: {
		// 			lat: myPlace.venue.location.lat,
		// 			lng: myPlace.venue.location.lng
		// 		},
		// 		map: map,
		// 		title: myPlace.venue.name
		// 	})
		// 	return this.marker
		// })

		this.state.myPlaces.map( myPlace => {
			this.marker = new window.google.maps.Marker({
				position: {
					lat: myPlace.location.lat,
					lng: myPlace.location.lng
				},
				map: map,
				title: myPlace.name,
				radius: 20
			})
		})
	}

	componentDidMount() {
		this.getPlaces();
	}

getPlaces = () => {
	const endpoint = 'https://api.foursquare.com/v2/venues/explore';
	const endpoint2 = 'https://api.foursquare.com/v2/venues/search';
	
	axios.get(endpoint2, {
		params: {
			client_id:'***REMOVED***',
			client_secret: '***REMOVED***',
			v: 20180922,
			ll: '35.7454,-81.6848',
			// section: 'coffee',
			query: 'cafe',
			near: '28655'
		}			
	})
	.then((res) => {
		console.log(res.status);
		console.log('places got');
		this.setState({myPlaces: res.data.response.venues});
		console.log(this.state.myPlaces);
	})
	.then( () => {
		this.loadMap();
	})
	.catch(error => console.log("Error " + error));
}

	
	
  render() {
	 
    return (
      <div className="App">

	  	<ListSection />
		<div id='map'></div>

      </div>
    );
  }
}

function loadScript(url) {
	let index = window.document.getElementsByTagName('script')[0];
	let script = window.document.createElement('script');
	script.src = url;
	script.async = true;
	script.defer = true;
	index.parentNode.insertBefore(script, index)
}

export default App;
