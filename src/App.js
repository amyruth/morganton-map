import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Navigation from './components/Navigation';
import Header from './components/Header';
import './responsive.css';

class App extends Component {
	state = {
		initialCenter: {
            lat: 35.7454071,
            lng:-81.68481880000002
		},
		myVenues: [],
		searchQuery: '',
		markers: [],
		listItems: []
	}
	
	listClickHandler = (item) => {
		console.log('item clicked');
		console.log(item);
		this.state.markers.forEach(marker => {
			if(item.venue.id === marker.key) {
				window.google.maps.event.trigger(marker, 'click');	
			}
		})
	}

	listKbHandler = (e, item) => {
		if(e.type === 'keydown') {
			if(e.keyCode === 13 || e.keyCode === 32) {
				this.listClickHandler(item);
			}
		}
	}
	
	openMenu = () => {
		let sidebar = document.querySelector('.sidebar');
		let search = document.getElementById('searchbar');
		console.log('nav clicked');
		sidebar.classList.toggle('open');

		sidebar.getAttribute('aria-hidden') === 'true' ?
		sidebar.setAttribute('aria-hidden', 'false') :
		sidebar.setAttribute('aria-hidden', 'true');

		sidebar.getAttribute('aria-expanded') === 'false' ?
		sidebar.setAttribute('aria-expanded', 'true') :
		sidebar.setAttribute('aria-expanded', 'false');
		search.focus();
	}
	
	openMenuKey = (e) => {
		if(e.type === 'keydown') {
			if(e.keyCode === 13 || e.keyCode === 32) {
				this.openMenu();
			}
		}
	}

	
	setQuery = (e) => {
		this.setState({searchQuery: e});
		// console.log(e);
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
				marker.setVisible(true) : marker.setVisible(false)	
			)
		}
		this.setState({markers: copyMarkers});
		console.table(this.state.markers);
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
				key: myVenue.venue.id,
				isSelected: false
			})
			
			bounds.extend(marker.position);
		

		window.google.maps.event.addListener(marker, 'click', () => {
			
			infoWindow.setContent(`	
				<div class='infoWin'>
					<p class='infoTitle'>${myVenue.venue.name}</p>
					<p>${myVenue.venue.location.formattedAddress[0]}</p>
					<p>${myVenue.venue.location.formattedAddress[1]}</p>
					<p>Category: ${myVenue.venue.categories[0].shortName}</p>			
					<a target='_blank' href=https://foursquare.com/v/${myVenue.venue.id}>Get details at Foursquare</a>	
				</div>
				`);

				infoWindow.open(map, marker);
				(marker.getAnimation() !== null) ? marker.setAnimation(null) : marker.setAnimation(window.google.maps.Animation.BOUNCE);
				setTimeout(marker.setAnimation(null), 1600);
				map.panTo(marker.getPosition());
			});	
			
			//This closes the infowindow if the marker is not visible. If I went to the search bar the infowindow was left behind.
			window.google.maps.event.addListener(marker, 'visible_changed', () => {
				infoWindow.close();
			})
			
			myVenue.marker = marker;
			markers.push(marker);
		})
		this.setState({ markers: markers });
		this.setState({myVenues: copyOfVenues});
		
		console.log('updated markers');
	}
	
	getPlaces = () => {
		const endpoint = 'https://api.foursquare.com/v2/venues/explore';
		console.log('grabbing locations');
		axios.get(endpoint, {
			params: {
				client_id: '***REMOVED***',
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
			// console.log(res.data.response.groups[0].items);
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
		<Header openMenu={this.openMenu}
		menuKeyPress={this.menuKeyPress}
		openMenuKey={this.openMenuKey} />
	
		<div className='main' role='main'>
			<Navigation
				openMenu={this.openMenu}
				listKbHandler={this.listKbHandler}
				listClickHandler={this.listClickHandler}
				myVenues={this.state.myVenues}
				markers={this.state.markers}
				searchQuery={this.state.searchQuery}
				setQuery={this.setQuery}
				value={this.state.searchQuery}
				filterResults={this.filterResults}
				listItems={this.state.listItems}
			/>
			<div id='map' role='application' aria-label='Neighborhood Map'></div>
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
