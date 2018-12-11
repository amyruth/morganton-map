// Mogranton Meal Map by Amy Rutherford
// 1st submission: October 14, 2018

// Resources used:
// Elharony's 3rd party library-free start to this project: https://www.youtube.com/playlist?list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1
// Ryan Waite's Walktrhough https://www.youtube.com/watch?v=LvQe7xrUh7I&t=2013s
// w3 on how to implement a menu button https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/examples/button/js/button.js
// https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton

// wanted to use gm_authFailure for map loading error but default google maps error page keeps the rest of the app from loading in an elegant way IMO so I left it out. Trying to do a custom error page looked less clean to me.

import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import axios from "axios";
import Map from "./components/Map";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import "./responsive.css";

export default class App extends Component {
<<<<<<< HEAD
  state = {
    initialCenter: {
      lat: 35.7454071,
      lng: -81.68481880000002
    },
    myVenues: [],
    searchQuery: "",
    markers: [],
    placesLoaded: false,
    isLoading: true,
    hasError: null,
    errorMsg: null
  };

  listClickHandler = item => {
    // console.log('item clicked');
    // console.log(item);
    this.state.markers.forEach(marker => {
      if (item.venue.id === marker.key) {
        window.google.maps.event.trigger(marker, "click");
      }
    });
  };

  listKbHandler = (e, item) => {
    // console.log(e.currentTarget);
    // console.log(e.currentTarget.nextSibling);
    if (e.type === "keydown") {
      if (e.keyCode === 13) {
        this.listClickHandler(item);
      }
    }
  };

  escapeMenu = e => {
    if (e.keyCode === 27) {
      this.toggleMenu();
      document.getElementById("nav-icon").focus();
    }
  };
  toggleMenu = () => {
    let sidebar = document.querySelector(".sidebar");
    let search = document.querySelector("#searchbar");
    // console.log('open/close event');

    sidebar.classList.toggle("hide");
    sidebar.classList.toggle("open");

    sidebar.getAttribute("aria-hidden") === "true"
      ? sidebar.setAttribute("aria-hidden", "false")
      : sidebar.setAttribute("aria-hidden", "true");

    sidebar.getAttribute("aria-expanded") === "false"
      ? sidebar.setAttribute("aria-expanded", "true")
      : sidebar.setAttribute("aria-expanded", "false");

    search.focus();
  };

  setQuery = e => {
    this.setState({ searchQuery: e });
    // console.log(e);
    this.filterResults(e);
  };

  filterResults = query => {
    let listings = document.querySelectorAll(".listing");
    let copyMarkers = this.state.markers.map(marker => marker);
    query = query.toLowerCase();

    // console.log('venues copied', venues);
    // console.log('markers copied', copyMarkers);
    if (query === "") {
      listings.forEach(listing => {
        listing.classList.remove("hidden");
      });
      copyMarkers.forEach(marker => marker.setVisible(true));
    }

    if (query) {
      query = query.toLowerCase();
      listings.forEach(listing => {
        if (!listing.title.toLowerCase().includes(query)) {
          listing.classList.add("hidden");
          // console.log(listing.title);
        } else {
          listing.classList.remove("hidden");
        }
      });

      copyMarkers.forEach(marker =>
        marker.title.toLowerCase().includes(query)
          ? marker.setVisible(true)
          : marker.setVisible(false)
      );
    }
    this.setState({ markers: copyMarkers });
    // console.table(this.state.markers);
  };

  loadMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCc3E8DG6mm62v4R5R3DZFqCn7et6IgxUY&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: this.state.initialCenter,
      zoom: 13,
      gestureHandling: "greedy"
    });

    let bounds = new window.google.maps.LatLngBounds();
    let infoWindow = new window.google.maps.InfoWindow();
    let markers = [];
    let copyOfVenues = this.state.myVenues.map(venue => venue);
    let url =
      "https://maps.googleapis.com/maps/api/streetview?size=125x125&location=";
    let key = "&key=AIzaSyCc3E8DG6mm62v4R5R3DZFqCn7et6IgxUY";

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
      });

      bounds.extend(marker.getPosition());

      window.google.maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(
          `<div class='infoWin'>
||||||| merged common ancestors
	state = {
		initialCenter: {
            lat: 35.7454071,
            lng:-81.68481880000002
		},
		myVenues: [],
		searchQuery: '',
		markers: [],
		placesLoaded: false,
		isLoading: true,
		hasError: null,
		errorMsg: null,
		
	}

	listClickHandler = (item) => {
		// console.log('item clicked');
		// console.log(item);
		this.state.markers.forEach(marker => {
			if(item.venue.id === marker.key) {
				window.google.maps.event.trigger(marker, 'click');
			}
		})
	}

	listKbHandler = (e, item) => {
		// console.log(e.currentTarget);
		// console.log(e.currentTarget.nextSibling);
		if(e.type === 'keydown') {
			if(e.keyCode === 13) {
				this.listClickHandler(item);
			}
		}
	}

	escapeMenu = (e) => {
		if (e.keyCode === 27) {
			this.toggleMenu();
			document.getElementById('nav-icon').focus();
		}
	}
	toggleMenu = () => {
		let sidebar = document.querySelector('.sidebar');
		let search = document.querySelector('#searchbar');
		// console.log('open/close event');
	
		sidebar.classList.toggle('hide');
		sidebar.classList.toggle('open');

		sidebar.getAttribute('aria-hidden') === 'true' ?
		sidebar.setAttribute('aria-hidden', 'false') :
		sidebar.setAttribute('aria-hidden', 'true');

		sidebar.getAttribute('aria-expanded') === 'false' ?
		sidebar.setAttribute('aria-expanded', 'true') :
		sidebar.setAttribute('aria-expanded', 'false');

		search.focus();	
	}

	setQuery = (e) => {
		this.setState({searchQuery: e});
		// console.log(e);
		this.filterResults(e);
	}

	filterResults = (query) => {
		let listings = document.querySelectorAll('.listing');
		let copyMarkers = this.state.markers.map( marker => marker);
		query = query.toLowerCase();

		// console.log('venues copied', venues);
		// console.log('markers copied', copyMarkers);
		if(query === '') {
			listings.forEach( listing => {
				listing.classList.remove('hidden');
			})
			copyMarkers.forEach(marker => marker.setVisible(true));
		}

		if(query) {
			query = query.toLowerCase();
			listings.forEach( listing => {
				if((!listing.title.toLowerCase().includes(query)) ) {
					listing.classList.add('hidden');
					// console.log(listing.title);
				} else{
					listing.classList.remove('hidden');
				}
			})

			copyMarkers.forEach(marker => marker.title.toLowerCase().includes(query) ?
				marker.setVisible(true) : marker.setVisible(false)
			)
		}
		this.setState({markers: copyMarkers});
		// console.table(this.state.markers);
	}

	loadMap = () => {
		loadScript('https://maps.googleapis.com/maps/api/js?key=GOOGLEAPI&callback=initMap');
			window.initMap = this.initMap;
	}

	initMap = () => {
		let map = new window.google.maps.Map(document.getElementById('map'), {
			center: this.state.initialCenter,
			zoom: 13,
			gestureHandling: 'greedy'
		})
		// console.log('map is loaded');

		let bounds = new window.google.maps.LatLngBounds();
		let infoWindow = new window.google.maps.InfoWindow();
		let markers = [];
		let copyOfVenues = this.state.myVenues.map(venue => venue);
		let url = 'https://maps.googleapis.com/maps/api/streetview?size=125x125&location=';
		let key = '&key=GOOGLEAPI';

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

			bounds.extend(marker.getPosition());

		window.google.maps.event.addListener(marker, 'click', () => {

			infoWindow.setContent(
				`<div class='infoWin'>
=======
	state = {
		initialCenter: {
            lat: 35.7454071,
            lng:-81.68481880000002
		},
		myVenues: [],
		searchQuery: '',
		markers: [],
		placesLoaded: false,
		isLoading: true,
		hasError: null,
		errorMsg: null,
		
	}

	listClickHandler = (item) => {
		// console.log('item clicked');
		// console.log(item);
		this.state.markers.forEach(marker => {
			if(item.venue.id === marker.key) {
				window.google.maps.event.trigger(marker, 'click');
			}
		})
	}

	listKbHandler = (e, item) => {
		// console.log(e.currentTarget);
		// console.log(e.currentTarget.nextSibling);
		if(e.type === 'keydown') {
			if(e.keyCode === 13) {
				this.listClickHandler(item);
			}
		}
	}

	escapeMenu = (e) => {
		if (e.keyCode === 27) {
			this.toggleMenu();
			document.getElementById('nav-icon').focus();
		}
	}
	toggleMenu = () => {
		let sidebar = document.querySelector('.sidebar');
		let search = document.querySelector('#searchbar');
		// console.log('open/close event');
	
		sidebar.classList.toggle('hide');
		sidebar.classList.toggle('open');

		sidebar.getAttribute('aria-hidden') === 'true' ?
		sidebar.setAttribute('aria-hidden', 'false') :
		sidebar.setAttribute('aria-hidden', 'true');

		sidebar.getAttribute('aria-expanded') === 'false' ?
		sidebar.setAttribute('aria-expanded', 'true') :
		sidebar.setAttribute('aria-expanded', 'false');

		search.focus();	
	}

	setQuery = (e) => {
		this.setState({searchQuery: e});
		// console.log(e);
		this.filterResults(e);
	}

	filterResults = (query) => {
		let listings = document.querySelectorAll('.listing');
		let copyMarkers = this.state.markers.map( marker => marker);
		query = query.toLowerCase();

		// console.log('venues copied', venues);
		// console.log('markers copied', copyMarkers);
		if(query === '') {
			listings.forEach( listing => {
				listing.classList.remove('hidden');
			})
			copyMarkers.forEach(marker => marker.setVisible(true));
		}

		if(query) {
			query = query.toLowerCase();
			listings.forEach( listing => {
				if((!listing.title.toLowerCase().includes(query)) ) {
					listing.classList.add('hidden');
					// console.log(listing.title);
				} else{
					listing.classList.remove('hidden');
				}
			})

			copyMarkers.forEach(marker => marker.title.toLowerCase().includes(query) ?
				marker.setVisible(true) : marker.setVisible(false)
			)
		}
		this.setState({markers: copyMarkers});
		// console.table(this.state.markers);
	}

	loadMap = () => {
		loadScript('https://maps.googleapis.com/maps/api/js?key=GOOGLEAPI&callback=initMap');
			window.initMap = this.initMap;
	}

	initMap = () => {
		let map = new window.google.maps.Map(document.getElementById('map'), {
			center: this.state.initialCenter,
			zoom: 13,
			gestureHandling: 'greedy'
		})

		let bounds = new window.google.maps.LatLngBounds();
		let infoWindow = new window.google.maps.InfoWindow();
		let markers = [];
		let copyOfVenues = this.state.myVenues.map(venue => venue);
		let url = 'https://maps.googleapis.com/maps/api/streetview?size=125x125&location=';
		let key = '&key=GOOGLEAPI';

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

			bounds.extend(marker.getPosition());

		window.google.maps.event.addListener(marker, 'click', () => {

			infoWindow.setContent(
				`<div class='infoWin'>
>>>>>>> 86ea29033269d3202f1ed36c09b15f568e7bdd69
					<p class='infoTitle'>${myVenue.venue.name}</p>
					<p>${myVenue.venue.location.formattedAddress[0]}</p>
					<p>${myVenue.venue.location.formattedAddress[1]}</p>
					<img src=${url}${myVenue.venue.location.lat},${
            myVenue.venue.location.lng
          }${key} alt='${myVenue.venue.name}' />
					<p>Category: ${myVenue.venue.categories[0].shortName}</p>
					<a target='_blank' href=https://foursquare.com/v/${
            myVenue.venue.id
          }>Get details at Foursquare</a>
				</div>`
        );

        map.panTo(marker.getPosition());
        infoWindow.open(map, marker);
        marker.getAnimation() !== null
          ? marker.setAnimation(null)
          : marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 1000);
      });

      //This closes the infowindow if the marker is not visible. If I went to the search bar the infowindow was left floating, so I added this to correct the issue.
      window.google.maps.event.addListener(marker, "visible_changed", () => {
        infoWindow.close();
      });

      myVenue.marker = marker;
      markers.push(marker);
    });

    //recenters map (experimental)
    //adjusts zoom to fit all markers on screen
    window.google.maps.event.addDomListener(window, "resize", () => {
      // map.setCenter(this.state.initialCenter);
      map.fitBounds(bounds);
    });

    //adjust zoom to fit marker bounds on map load (in case you start on a phone screen)
    // window.google.maps.event.addListener(map, 'tilesloaded', () => map.fitBounds(bounds));

    this.setState({ markers: markers });
    this.setState({ myVenues: copyOfVenues });

    // console.log('updated markers');
  };

  // Map only loads if Foursquare call works
  getPlaces = () => {
    const endpoint = "https://api.foursquare.com/v2/venues/explore";
    // console.log('grabbing locations');
    axios
      .get(endpoint, {
        params: {
          client_id: "HLAAAV43L3SOYXNORDN3HSWFR3ZDVSX4PT4HOQKJBW2PQF00",
          client_secret: "T2GVYKXUO3HRINYCYFPMYAILORVV4T3LOOWY2N4O5QLERGBC",
          v: 20180922,
          ll: "35.7454,-81.6848",
          section: "food",
          near: "Morganton"
        }
      })
      .then(res => {
        console.log("Response from 4square server: " + res.status);
        // console.log('locations retrieved');
        if (res.status === 200) {
          this.setState({ myVenues: res.data.response.groups[0].items });
        }
      })
      .then(() => {
        this.loadMap();
      })
      .catch(error => {
        // console.log(error);
        this.setState({ hasError: true, errorMsg: error });
      });
  };

  componentDidMount() {
    this.getPlaces();
  }

  render() {
    const { hasError, myVenues, markers, searchQuery } = this.state;
    if (hasError) {
      return (
        <div className="errorPage">
          <h1 className="oops">Oops! :(</h1>
          <h1>Something went wrong.</h1>
          <h3>Please try again later.</h3>
          <p>{"Error: " + this.state.errorMsg.message}</p>
        </div>
      );
    }

    return (
      <div className="App">
        <Header
          toggleMenu={this.toggleMenu}
          menuKeyPress={this.menuKeyPress}
          openMenuKey={this.openMenuKey}
        />

        <div className="main" role="main">
          <Navigation
            toggleMenu={this.toggleMenu}
            listKbHandler={this.listKbHandler}
            listClickHandler={this.listClickHandler}
            myVenues={myVenues}
            markers={markers}
            searchQuery={searchQuery}
            setQuery={this.setQuery}
            value={searchQuery}
            filterResults={this.filterResults}
            escapeMenu={this.escapeMenu}
          />

          <Map />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  myVenues: PropTypes.arrayOf(PropTypes.object),
  markers: PropTypes.arrayOf(PropTypes.object),
  searchQuery: PropTypes.string
};

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
