import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

import styles from './MapContainer.css';

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid #ccc`,
  width: `50%`,
  height: `32px`,
  marginTop: `8px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  color: `#555`,
  backgroundColor: '#fff'
};

/**
 * withGoogleMaps is a higher ordered component
 * takes a function as an input to render Google Maps
 * since GoogleMap cannot render on its own
 */
const GoogleMapsDefault = withGoogleMap(props =>
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    center={props.center}
    onClick={props.onMapClick}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Enter city"
      inputStyle={INPUT_STYLE}
    />

    <Marker {...props.marker} />

  </GoogleMap>
);

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      center: props.center,
      marker: {
        position: {
          lat: 48.2089381,
          lng: 16.3615127
        },
        key: `Vienna`,
        defaultAnimation: 2,
        title: 'Location'
      },
      circle: {
        lat: 48.2089381,
        lng: 16.3615127,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this._mapComponent,
        radius: 500
      }
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._mapComponent.getBounds()
      // center: this._mapComponent.getCenter()
    });
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // Not needed
    // Add a marker for each place returned from search bar
    /*const markers = places.map(place => ({
      position: place.geometry.location
    }));*/

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0
      ? markers[0].position
      : this.state.center;

    this.setState({
      center: mapCenter,
      marker: markers[0]
    });

    // forward coordinates to parent
    this.props.onChangeLocation(markers[0].position);
  }

  /*
   * This is called when you click on the map.
   */
  handleMapClick(event) {
    const newMarker = {
      position: event.latLng,
      defaultAnimation: 2,
      key: Date.now() // Add a key property for: http://fb.me/react-warning-keys
    };
    this.setState({
      marker: newMarker
    });

    // forward coordinates to parent
    this.props.onChangeLocation(newMarker.position);
  }

  render() {
    return (
      <div>
        <div id="map">
          <GoogleMapsDefault
            containerElement={<div style={{ height: '50vh', width: 'auto' }} />}
            mapElement={<div style={{ height: '50vh', width: 'auto' }} />}
            onMapLoad={this.handleMapLoad}
            onMapClick={this.handleMapClick}
            onSearchBoxMounted={this.handleSearchBoxMounted}
            onPlacesChanged={this.handlePlacesChanged}
            onBoundsChanged={this.handleBoundsChanged}
            marker={this.state.marker}
            circle={this.state.circle}
            center={this.state.center}
          />
        </div>
      </div>
    );
  }
}

export default MapContainer;
