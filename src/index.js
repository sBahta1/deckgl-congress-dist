import mapStyles from './map-styles';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { GeoJsonLayer } from '@deck.gl/layers';

const sourceData = './States/states.geojson';

const layer = () => new GeoJsonLayer({
  id: 'geojson-layer',
  data: sourceData,
  lineWidthScale: 20,
  lineWidthMinPixels: 2,
  getFillColor: [160, 160, 180, 200],
  pickable: true,
  onHover: ({ object, x, y }) => {
    const el = document.getElementById('tooltip');
    if (object) {
      const { name, num_dist } = object.geometry.properties;
      el.innerHTML = `<h1>${name} Num of Dist: ${num_dist}</h1>`
      el.style.display = 'block';
      el.style.opacity = 0.9;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    } else {
      el.style.opacity = 0.0;
    }
  },
})

window.initMap = () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.0, lng: -100.0 },
    zoom: 5,
    styles: mapStyles

  });
  // google.maps.event.addListener(map, 'mousemove', function (event) {
  //   displayCoordinates(event.latLng);
  //   console.log(event.latLng);
    
  // });

  // function displayCoordinates(pnt) {
  //   var lat = pnt.lat();
  //   lat = lat.toFixed(4);
  //   var lng = pnt.lng();
  //   lng = lng.toFixed(4);
  //   console.log("Latitude: " + lat + "  Longitude: " + lng);
  // };

  const overlay = new GoogleMapsOverlay({
    layers: [
      layer()
    ]
  });
  overlay.setMap(map)
}