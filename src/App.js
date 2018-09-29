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
		myPlaces: []
	}

	
	loadMap = () => {
		loadScript('https://maps.googleapis.com/maps/api/js?key=***REMOVED***&callback=initMap');
			window.initMap = this.initMap;
	}

	initMap = () => {
		let map = new window.google.maps.Map(document.getElementById('map'), {
			center: this.state.initialCenter,
			zoom: 13,
		})
		console.log('map is loaded');

		let infoWindow = new window.google.maps.InfoWindow();
		
		this.state.myPlaces.forEach(function(myPlace, index, array) {
			let marker = new window.google.maps.Marker({
				position: {
					lat: myPlace.venue.location.lat,
					lng: myPlace.venue.location.lng
				},
				map: map,
				animation: window.google.maps.Animation.DROP,
				title: myPlace.venue.name
			})
			
			//repopulates InfoWindow with clicked marker info
			window.google.maps.event.addListener(marker, 'click', function() {
				
				infoWindow.setContent(`	
					<div class='infoWin'>
						<strong>${myPlace.venue.name}</strong>
						<p>${myPlace.venue.location.formattedAddress[0]}</p>
						<p>${myPlace.venue.location.formattedAddress[1]}</p>
					</div>
				`);
				infoWindow.open(map, marker);
			})	
		})
		
		
		
		

		// this.state.myPlaces.map( myPlace => {
		// 	this.marker = new window.google.maps.Marker({
		// 		position: {
		// 			lat: myPlace.location.lat,
		// 			lng: myPlace.location.lng
		// 		},
		// 		map: map,
		// 		title: myPlace.name,
		// 		radius: 20
		// 	})
		// })
	}

	
	componentDidMount() {
		this.getPlaces();
	}

getPlaces = () => {
	const endpoint = 'https://api.foursquare.com/v2/venues/explore';
	const endpoint2 = 'https://api.foursquare.com/v2/venues/search';
	console.log('grabbing locations');
	axios.get(endpoint, {
		params: {
			client_id:'***REMOVED***',
			client_secret: '***REMOVED***',
			v: 20180922,
			ll: '35.7454,-81.6848',
			section: 'food',
			// query: 'coffee',
			near: 'Morganton'
		}			
	})
	.then((res) => {
		if(res.status === 200) {
			console.log(res.status);
			console.log('locations retrieved');
			console.log(res.data.response.groups[0].items);
			// this.setState({myPlaces: res.data.response.venues});
			this.setState({myPlaces: res.data.response.groups[0].items});
			console.log(this.state.myPlaces);
		}
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
			<ListSection />
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
