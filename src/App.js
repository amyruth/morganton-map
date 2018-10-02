import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Navigation from './components/Navigation';
import Header from './components/Header';

class App extends Component {
	state = {
		initialCenter: {
            lat: 35.7454071,
            lng:-81.68481880000002
		},
		myVenues: [],
		filteredList: [],
		searchQuery: '',
		markers: [],
		listItems: [],
	}

	listClickHandler = (item) => {
		console.log('item clicked');
		console.log(item);
		console.log(item.venue.name)
		this.state.markers.forEach(marker => {
			if(item.venue.id === marker.key) {
				window.google.maps.event.trigger(marker, 'click');
					
			}
		})
	}

	setQuery = (e) => {
		this.setState({searchQuery: e});
		console.log(e);
		this.filterMarkers(e);
	}

	filterMarkers = (query) => {
		// grab all list items
		// convert query and venue name .toLowerCase()
		// compare them
		// if not a match add hidden class to list item	
		// if no match AND class hidden is not present
		let listings = document.querySelectorAll('.listing');
		let copyMarkers = this.state.markers.map( marker => marker)

		if(query) {
			query = query.toLowerCase();
			listings.forEach( listing => {
				
				if((listing.innerText.toLowerCase().includes(query) === false) && (listing.classList.contains('hidden') === false)) {
					listing.classList.add('hidden');	
					console.log(listing.key)				
				}
			})
		}
		
		}
	


	loadMap = () => {
		loadScript('https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS&callback=initMap');
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
		let infoWindow = new window.google.maps.InfoWindow();
		let markers = [];
		let copyVenues = this.state.myVenues.map(venue => venue);
		
		//create markers
		copyVenues.forEach(function(myVenue) {
			let marker = new window.google.maps.Marker({
				position: {
					lat: myVenue.venue.location.lat,
					lng: myVenue.venue.location.lng
				},
				map: map,
				animation: window.google.maps.Animation.DROP,
				title: myVenue.venue.name,
				key: myVenue.venue.id
			})
			
			
			bounds.extend(marker.position);
			
			

		window.google.maps.event.addListener(marker, 'click', function() {
			infoWindow.setContent(`	
				<div class='infoWin'>
					<p class='infoTitle'>${myVenue.venue.name}</p>
					<p>${myVenue.venue.location.formattedAddress[0]}</p>
					<p>${myVenue.venue.location.formattedAddress[1]}</p>
					<p>Type: ${myVenue.venue.categories[0].shortName}</p>
				</div>
			`);
			infoWindow.open(map, marker);
		});	

			myVenue.marker = marker;
			markers.push(marker);
		})
		
		this.setState({myVenues: copyVenues});
		this.setState({filteredList: copyVenues});
		this.setState({ markers: markers });
}


	componentDidMount() {
		this.getPlaces();
	}

getPlaces = () => {
	const endpoint = 'https://api.foursquare.com/v2/venues/explore';
	console.log('grabbing locations');
	axios.get(endpoint, {
		params: {
			client_id: '4SQUARE',
			client_secret: '4SQUARE',
			v: 20180922,
			ll: '35.7454,-81.6848',
			section: 'food',
			near: 'Morganton'
		}			
	})
	.then((res) => {
		console.log("Response from server: " + res.status);
		console.log('locations retrieved');
		// console.log(res.data.response.groups[0].items);
		this.setState({myVenues: res.data.response.groups[0].items});
		// console.log(this.state.myVenues);
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
			<Navigation 
				listClickHandler={this.listClickHandler}
				myVenues={this.state.myVenues}
				markers={this.state.markers}
				searchQuery={this.state.searchQuery}
				setQuery={this.setQuery}
				value={this.state.searchQuery}
				filterMarkers={this.filterMarkers}
				listItems={this.state.listItems}
			/>
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
