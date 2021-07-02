import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './useMap.jsx';
import OffersProp from '../property/offers.prop.js';

const defaultIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const currentIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function Map(props) {
  const {city, points, selectedPoint, changedPin} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    map && points.map((point) =>
      leaflet
        .marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        }, {
          icon: (point.id === selectedPoint.id && changedPin)
            ? currentIcon
            : defaultIcon,
        })
        .addTo(map),
    );
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
