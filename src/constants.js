import L from 'leaflet';

const height = { height: '100vh' };

const center = { lat: 51.5, lng: 0.12 };

const centers = [
    L.latLng(51.5073219, -0.1276474), // london
    L.latLng(41.894802, 12.4853384), // rome,
    L.latLng(40.4167047, -3.7035825), // madrid,
    L.latLng(34.0536834, -118.2427669), // madrid
    L.latLng(55.7507178, 37.6176606) // moscow
];

const imagesUrls = [
    'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
    'https://pbs.twimg.com/profile_images/492243151755542528/SczvOopQ_400x400.jpeg',
    'https://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/557234-istock-503488234.jpg?itok=empSJXDv&resize=1100x1100',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/250px-Gatto_europeo4.jpg',
    'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ffd88d450-fb0b-11e7-9a34-94e1b34681c3.jpg?crop=5314%2C2989%2C0%2C277&resize=685',
    'http://paulryan.com.au/wp-content/uploads/2015/01/high-resolution-wallpapers-25.jpg'
];

// insert marker icon manually
const customMarker = new L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

export { height, center, centers, imagesUrls, customMarker };
