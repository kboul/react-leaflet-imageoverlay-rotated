import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import ImageOverlayRotated from './ImageOverlayRotated';

import { height, center, centers, imagesUrls, customMarker } from './constants';

// const topLeftCorner = L.latLng(40.52256691873593, -3.7743186950683594),
//     topRightCorner = L.latLng(40.5210255066156, -3.7734764814376835),
//     bottomLeftCorner = L.latLng(40.52180437272552, -3.7768453359603886);

// location center
const topLeftCorner = centers[0];
// y: same with above, x: +0.002  0.00084
const topRightCorner = L.latLng(topLeftCorner.lat, topLeftCorner.lng + 0.002);
//  x: same with center's x, y: -0.001  0.00076
const bottomLeftCorner = L.latLng(topLeftCorner.lat - 0.001, topLeftCorner.lng);

const customMarkerOptions = {
    icon: customMarker,
    draggable: true
};

const topLeftMarker = L.marker(topLeftCorner, customMarkerOptions);
const topRightMarker = L.marker(topRightCorner, customMarkerOptions);
const bottomLeftMarker = L.marker(bottomLeftCorner, customMarkerOptions);

class MapExample extends Component {
    state = {
        markersVisible: true,
        opacity: 0.5,
        url: imagesUrls[1]
    };

    handleOpacityIncrease = () => {
        const { opacity } = this.state;
        if (opacity.toFixed(1) > 0.99) return;
        this.setState({ opacity: opacity + 0.1 });
    };

    handleOpacityDecrease = () => {
        const { opacity } = this.state;
        if (opacity.toFixed(1) < 0.1) return;
        this.setState({ opacity: opacity - 0.1 });
    };

    handleMarkersToggle = () => {
        const { markersVisible } = this.state;
        this.setState({ markersVisible: !markersVisible });
    };

    handleUrlChange = () => {
        this.setState({ url: imagesUrls[0] });
    };

    render() {
        const { opacity, markersVisible, url } = this.state;
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
                            }}>
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
                                opacity={opacity}
                                markersVisible={markersVisible}
                            />
                        </Map>
                    </div>
                    <div className="col-2 mt-2">
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.handleOpacityIncrease}>
                                + Opacity
                            </button>
                        </div>
                        <div className="form-group">
                            Opacity: {opacity.toFixed(1)}
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.handleOpacityDecrease}>
                                - Opacity
                            </button>
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.handleMarkersToggle}>
                                Toggle Markers
                            </button>
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.handleUrlChange}>
                                Change Url
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapExample;
