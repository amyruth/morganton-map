import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ListSection from './components/ListSection';
import Header from './components/Header';

class App extends Component {
	state = {
		initialCenter: {
            lat: 35.7454071,
            lng:-81.68481880000002
		},
		myVenues: [],
		filtered: null,
		query: '',
		markers: []
	}

	loadMap = () => {
		loadScript('https://maps.googleapis.com/maps/api/js?key=***REMOVED***&callback=initMap');
			window.initMap = this.initMap;
	}

	initMap = () => {
		let map = new window.google.maps.Map(document.getElementById('map'), {
			center: this.state.initialCenter,
			zoom: 13,
			gestureHandling: 'greedy'
		})
		console.log('map is loaded');

		let bounds = new window.google.maps.LatLngBounds();
		//create markers
		
		let infoWindow = new window.google.maps.InfoWindow();
		let markers = [];

		this.state.myVenues.forEach(function(myVenue, index, array) {
			let marker = new window.google.maps.Marker({
				position: {
					lat: myVenue.venue.location.lat,
					lng: myVenue.venue.location.lng
				},
				map: map,
				animation: window.google.maps.Animation.DROP,
				title: myVenue.venue.name,
				id: myVenue.venue.id
			})
			
			bounds.extend(marker.position);
			//populates InfoWindow with location info
		window.google.maps.event.addListener(marker, 'click', function() {
			
				infoWindow.setContent(`	
					<div class='infoWin'>
						<p class='infoTitle'>${myVenue.venue.name}</p>
						<p>${myVenue.venue.location.formattedAddress[0]}</p>
						<p>${myVenue.venue.location.formattedAddress[1]}</p>
						<p>${myVenue.venue.categories[0].name}</p>
					</div>
				`);
				infoWindow.open(map, marker);
			})	
			markers.push(marker);
			
			console.log(markers)
		})
		
		this.setState({markers: markers})
}

	

	componentDidMount() {
		this.getPlaces();
	}

getPlaces = () => {
	const endpoint = 'https://api.foursquare.com/v2/venues/explore';
	console.log('grabbing locations');
	axios.get(endpoint, {
		params: {
			client_id:'***REMOVED***',
			client_secret: '***REMOVED***',
			v: 20180922,
			ll: '35.7454,-81.6848',
			section: 'food',
			near: 'Morganton'
		}			
	})
	.then((res) => {
		console.log("Response from server: " + res.status);
		console.log('locations retrieved');
		console.log(res.data.response.groups[0].items);
		this.setState({myVenues: res.data.response.groups[0].items});
		console.log(this.state.myVenues);
	})
	.then( () => {
		this.loadMap();
	})
	.catch(error => console.log("Error " + error));
}


	
  render() {
	 
    return (
      <div className='App'>
		<Header />
	
		<div className='main'>
			<ListSection myVenues={this.state.myVenues} />
			<div id='map'></div>
		</div>

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
