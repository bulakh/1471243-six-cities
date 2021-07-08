import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap.jsx';
import OffersProp from '../property/offers.prop.js';

const defaultIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const currentIcon = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function Map(props) {
  const {city, points, selectedPoint, changedPin} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const layerGroup = L.layerGroup();

    if (map) {
      points.forEach((point) => {
        const marker = L.marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        }, {
          icon: (point.id === selectedPoint.id && changedPin)
            ? currentIcon
            : defaultIcon,
        });
        layerGroup.addLayer(marker);
      });

      layerGroup.addTo(map);

      map.flyTo(
        [points[0].city.location.latitude, points[0].city.location.longitude],
        points[0].city.location.zoom,
      );
    }

    return () => {
      if (map) {
        layerGroup.remove();
      }
    };

  }, [map, points, selectedPoint, changedPin]);

  return (
    <div
      id="map"
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

Map.propTypes = {
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
  }).isRequired,
  points: PropTypes.arrayOf(OffersProp),
  selectedPoint: PropTypes.object.isRequired,
  changedPin: PropTypes.bool.isRequired,
};

export default Map;
