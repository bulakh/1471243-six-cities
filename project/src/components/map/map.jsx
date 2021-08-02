import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map.jsx';
import OffersProp from '../property/offers.prop.js';
import {getSelectedPointId} from '../../store/navigation/selectors.js';

const defaultIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [15, 30],
});

const currentIcon = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [15, 30],
});


function Map({currentOffer, points, changedPin}) {
  const city = currentOffer.city;
  const selectedPointId = useSelector(getSelectedPointId);
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
          icon: (point.id === parseInt(selectedPointId, 10) && changedPin)
            ? currentIcon
            : defaultIcon,
        }).bindPopup(point.title);
        layerGroup.addLayer(marker);
      });

      const markerCurrent = L.marker({
        lat: currentOffer.location.latitude,
        lng: currentOffer.location.longitude,
      }, {
        icon: currentIcon,
      }).bindPopup(currentOffer.title);

      !changedPin && layerGroup.addLayer(markerCurrent);

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

  }, [map, currentOffer, points, selectedPointId, changedPin]);

  return (
    <div
      id="map"
      style={{height: '100%'}}
      ref={mapRef}
      data-testid="map"
    >
    </div>
  );
}

Map.propTypes = {
  currentOffer: OffersProp,
  points: PropTypes.arrayOf(OffersProp),
  changedPin: PropTypes.bool.isRequired,
};

export default Map;
