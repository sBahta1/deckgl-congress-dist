import mapStyles from './map-styles';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { GeoJsonLayer } from '@deck.gl/layers';

const sourceData = './pa-dist.geojson';

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
  const overlay = new GoogleMapsOverlay({
    layers: [
      layer()
    ]
  });
  overlay.setMap(map)
}