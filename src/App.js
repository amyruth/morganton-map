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
		listItems: []
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

	
	toggleBounce = () => {
		if (this.marker.getAnimation() !== null) {
		 this.marker.setAnimation(null);
		} else {
		  this.marker.setAnimation(window.google.maps.Animation.BOUNCE);
		}
	}
	
	setQuery = (e) => {
		this.setState({searchQuery: e});
		console.log(e);
		this.filterResults(e);
	}

	filterResults = (query) => {
		let listings = document.querySelectorAll('.listing');
		let venues = this.state.myVenues.map(myVenue => myVenue);
		let copyMarkers = this.state.markers.map( marker => marker);
		query = query.toLowerCase();
		

		console.log('venues copied', venues);
		console.log('markers copied', copyMarkers);
		if(query === '') {
			listings.forEach( listing => {
				listing.classList.remove('hidden');
			})
			copyMarkers.forEach(marker => marker.setVisible(true));
			// console.table(copyMarkers);
		}

		if(query) {
			query = query.toLowerCase();
			listings.forEach( listing => {
				if((!listing.title.toLowerCase().includes(query)) ) {
					listing.classList.add('hidden');	
					console.log(listing.title);				
				} else{
					listing.classList.remove('hidden');
				}
			})
			
			copyMarkers.forEach(marker => marker.title.toLowerCase().includes(query) ? 
				marker.setVisible(true) :
				marker.setVisible(false)	
			)
		}
		this.setState({markers: copyMarkers});
		console.table(this.state.markers);
	}
	


	loadMap = () => {
		loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCc3E8DG6mm62v4R5R3DZFqCn7et6IgxUY&callback=initMap');
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
		let copyOfVenues = this.state.myVenues.map(venue => venue);

		//create markers
		copyOfVenues.forEach(function(myVenue) {
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
		

		window.google.maps.event.addListener(marker, 'click', () => {
			
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

		//This closes the infowindow if the user goes to the search input. It was floating unattached before and I couldn't figure out how to reference the infowindow outside of this function.
		window.google.maps.event.addListener(marker, 'visible_changed', () => {
			infoWindow.close();
		})
		
		myVenue.marker = marker;
		markers.push(marker);
	})
		this.setState({myVenues: copyOfVenues});
		// this.setState({filteredList: copyOfVenues});
		this.setState({ markers: markers });
	}
	
	getPlaces = () => {
		const endpoint = 'https://api.foursquare.com/v2/venues/explore';
		console.log('grabbing locations');
		axios.get(endpoint, {
			params: {
				client_id: 'HLAAAV43L3SOYXNORDN3HSWFR3ZDVSX4PT4HOQKJBW2PQF00',
				client_secret: 'T2GVYKXUO3HRINYCYFPMYAILORVV4T3LOOWY2N4O5QLERGBC',
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
			// console.log(this.state.myVenues);
		})
		.then( () => {
			this.loadMap();
		})
		.catch(error => console.log("Error " + error));
	}
	
	componentDidMount() {
		this.getPlaces();
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
				filterResults={this.filterResults}
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
