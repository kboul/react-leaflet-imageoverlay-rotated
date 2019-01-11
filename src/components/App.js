import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import ImageOverlayRotated from "./ImageOverlayRotated";

const height = { height: "97.8vh" };
const center = { lat: 51.5, lng: 0.12 };
const url = "https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg";

const point1 = L.latLng(40.52256691873593, -3.7743186950683594),
    point2 = L.latLng(40.5210255066156, -3.7734764814376835),
    point3 = L.latLng(40.52180437272552, -3.7768453359603886);

// insert marker icon manually
const customMarker = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const marker1 = L.marker(point1, {
    icon: customMarker,
    draggable: true
});

const marker2 = L.marker(point2, {
    icon: customMarker,
    draggable: true
});

const marker3 = L.marker(point3, {
    icon: customMarker,
    draggable: true
});

class MapExample extends Component {
    state = {
        opacity: 0.5,
        markersVisible: true
    };

    increase = () => {
        this.setState({ opacity: this.state.opacity + 0.1 });
    };

    decrease = () => {
        this.setState({ opacity: this.state.opacity - 0.1 });
    };

    toggleMarkers = () => {
        this.setState({ markersVisible: !this.state.markersVisible });
    };

    render() {
        return (
            <React.Fragment>
                <div style={{ display: 'inline-block' }}>
                    <button onClick={this.increase}>Increase Opacity</button>
                    <span style={{ padding: '0px 5px 0px 5px' }}> Opacity: {this.state.opacity.toFixed(1)}</span>
                </div>
                <button onClick={this.decrease}>Decrease Opacity</button>
                <button onClick={this.toggleMarkers}>Toggle Markers</button>

                <Map
                    style={height}
                    center={center}
                    zoom={18}
                    ref={m => {
                        this.map = m;
                    }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <ImageOverlayRotated
                        url={url}
                        corners={[point1, point2, point3]}
                        markers={[marker1, marker2, marker3]}
                        opacity={this.state.opacity}
                        markersVisible={this.state.markersVisible}
                    />
                </Map>
            </React.Fragment >
        );
    }
}

export default MapExample;
