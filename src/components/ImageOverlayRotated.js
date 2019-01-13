import { withLeaflet, MapLayer } from "react-leaflet";
import "leaflet-imageoverlay-rotated";
import L from "leaflet";

class ImageOverlayRotated extends MapLayer {
    createLeafletElement() {
        const { url, corners, opacity, markers } = this.props;

        const { map } = this.props.leaflet;

        [markers[0], markers[1], markers[2]].forEach(el => el.addTo(map));

        const bounds = new L.LatLngBounds(corners[0], corners[1]).extend(
            corners[2]
        );
        map.fitBounds(bounds);

        const overlay = L.imageOverlay.rotated(
            url,
            corners[0],
            corners[1],
            corners[2],
            {
                opacity: opacity,
                interactive: true
            }
        );

        function repositionImage() {
            overlay.reposition(
                markers[0].getLatLng(),
                markers[1].getLatLng(),
                markers[2].getLatLng()
            );
        }

        markers[0].on("drag dragend", repositionImage);
        markers[1].on("drag dragend", repositionImage);
        markers[2].on("drag dragend", repositionImage);

        return overlay;
    }

    updateLeafletElement(fromProps, toProps) {
        // dynamically change the opacity from outside
        if (toProps.opacity !== fromProps.opacity) {
            this.leafletElement.setOpacity(toProps.opacity);
        }
        // dynamically toggle markers visibility from outside
        if (toProps.markersVisible !== fromProps.markersVisible) {
            console.log(this.props.corners);
            const map = this.leafletElement._map;
            const { markers } = this.props;
            const myGroup = L.layerGroup([markers[0], markers[1], markers[2]]);
            if (!toProps.markersVisible)
                myGroup.eachLayer(layer => map.removeLayer(layer));
            else myGroup.eachLayer(layer => map.addLayer(layer));
        }
    }

    componentDidMount() {
        const { map } = this.props.leaflet;
        this.leafletElement.addTo(map);
        // zoom out a bit to be more elegant presented
        setTimeout(() => map.setZoom(map.getZoom() - 1), 10)
    }
}

export default withLeaflet(ImageOverlayRotated);
