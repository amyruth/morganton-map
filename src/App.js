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
		
		searchQuery: '',
		markers: [],
		listItems: []
	}

	setQuery = (e) => {
		this.setState({searchQuery: e});
		console.log(e);
		// this.filterMarkers(e);
	}

	filterMarkers = (searchTerm) => {
		// grab all list items
		// convert query and venue name .toLowerCase()
		// compare them
		// if not a match add hidden class to list item	
		
	}


	toggleBounce = () => {
		if(this.getAnimation() !== null){
			this.setAnimation(null);
		} else {
			this.setAnimation(window.google.maps.Animation.BOUNCE);
		}
	}

	loadMap = () => {
		loadScript('https://maps.googleapis.com/maps/api/js?key=***REMOVED***&callback=initMap');
			window.initMap = this.initMap;
	}

	makeMarkerIcon = (markerColor) =>  {
        var markerImage = new window.google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new window.google.maps.Size(21, 34),
          new window.google.maps.Point(0, 0),
          new window.google.maps.Point(10, 34),
          new window.google.maps.Size(21,34));
        return markerImage;
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
		let defaultIcon = this.makeMarkerIcon('0091ff');
		let highlightedIcon = this.makeMarkerIcon('FFFF24');
		let copyVenues = this.state.myVenues.map(venue => venue);

		copyVenues.forEach(function(myVenue) {
			let marker = new window.google.maps.Marker({
				position: {
					lat: myVenue.venue.location.lat,
					lng: myVenue.venue.location.lng
				},
				map: map,
				animation: window.google.maps.Animation.DROP,
				title: myVenue.venue.name,
				id: myVenue.venue.id,
				icon: defaultIcon
			})
			
			bounds.extend(marker.position);
			//populates InfoWindow with location info
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

		//bounce marker on hover
		window.google.maps.event.addListener(marker, 'mouseover', function() {
			marker.setAnimation(window.google.maps.Animation.BOUNCE)
		})

		window.google.maps.event.addListener(marker, 'mouseout', function() {
			marker.setAnimation(null)
		})
		
			myVenue.marker = marker;
			markers.push(marker);
		})
		
		this.setState({myVenues: copyVenues});
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
			<ListSection 
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
