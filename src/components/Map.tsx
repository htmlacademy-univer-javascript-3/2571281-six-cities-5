import { useEffect, useRef } from 'react';
import L, { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../types';

interface MapProps {
  offers: Offer[];
  hoveredOfferId?: string | null;
}

const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ offers, hoveredOfferId }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = L.map(mapRef.current, {
      center: [52.38333, 4.9],
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const markersLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const icon = offer.id === hoveredOfferId ? activeIcon : defaultIcon;
      new Marker([offer.location.latitude, offer.location.longitude])
        .setIcon(icon)
        .addTo(markersLayer);
    });

    return () => {
      map.remove();
    };
  }, [offers, hoveredOfferId]);

  return <div className="cities__map" ref={mapRef} style={{ height: '100%' }}></div>;
}

export default Map;
