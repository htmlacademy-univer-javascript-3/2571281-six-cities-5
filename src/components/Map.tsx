import { useEffect, useRef } from 'react';
import L, { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../types';

interface MapProps {
  offers: Offer[];
  hoveredOfferId?: string | null;
  centerCoordinates: [number, number];
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

function Map({ offers, hoveredOfferId, centerCoordinates }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    const map = L.map(mapRef.current, {
      center: centerCoordinates,
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
  }, [offers, hoveredOfferId, centerCoordinates]);

  return <div className="cities__map" ref={mapRef} style={{ height: '100%' }} />;
}

export default Map;
