import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import ImageOverlayRotated from "./ImageOverlayRotated";
import { imagesUrls } from './imagesUrls';

const height = { height: "100vh" };
const center = { lat: 51.5, lng: 0.12 };
const url = imagesUrls[1];

// const topLeftCorner = L.latLng(40.522251, -3.776358),
//     topRightCorner = L.latLng(40.522251, -3.774176),
//     bottomLeftCorner = L.latLng(40.521027, -3.776358);

// location center
const topLeftCorner = L.latLng(37.9972071, 23.818674582788);
// y: same with above, x: +0.002
const topRightCorner = L.latLng(topLeftCorner.lat, topLeftCorner.lng + 0.0022);
//  x: same with center's x, y: -0.001
const bottomLeftCorner = L.latLng(topLeftCorner.lat - 0.0012, topLeftCorner.lng);

// insert marker icon manually
const customMarker = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const customMarkerOptions = {
    icon: customMarker,
    draggable: true
}

const topLeftMarker = L.marker(topLeftCorner, customMarkerOptions);
const topRightMarker = L.marker(topRightCorner, customMarkerOptions);
const bottomLeftMarker = L.marker(bottomLeftCorner, customMarkerOptions);

class MapExample extends Component {
    state = {
        opacity: 0.5,
        markersVisible: true
    };

    increase = () => {
        if (this.state.opacity.toFixed(1) > 0.99) return;
        this.setState({ opacity: this.state.opacity + 0.1 });
    };

    decrease = () => {
        if (this.state.opacity.toFixed(1) < 0.1) return;
        this.setState({ opacity: this.state.opacity - 0.1 });
    };

    toggleMarkers = () => {
        this.setState({ markersVisible: !this.state.markersVisible });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10">
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
                                corners={[
                                    topLeftCorner,
                                    topRightCorner,
                                    bottomLeftCorner
                                ]}
                                markers={[
                                    topLeftMarker,
                                    topRightMarker,
                                    bottomLeftMarker
                                ]}
                                opacity={this.state.opacity}
                                markersVisible={this.state.markersVisible}
                            />
                        </Map>
                    </div>
                    <div className="col-2 mt-2">
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.increase}>
                                + Opacity
                            </button>
                        </div>
                        <div className="form-group">
                            Opacity: {this.state.opacity.toFixed(1)}
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.decrease}>
                                - Opacity
                            </button>
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.toggleMarkers}>
                                Toggle Markers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapExample;
