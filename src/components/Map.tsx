import { useEffect, useRef } from 'react';
import L, { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../types';

interface MapProps {
  offers: Offer[];
  centerCoordinates: [number, number];
  hoveredOfferId?: string;
  currentOfferId?: string;
}

const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const highlightedIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({
  offers,
  centerCoordinates,
  hoveredOfferId,
  currentOfferId,
}: MapProps) {
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
      const icon =
        offer.id === hoveredOfferId || offer.id === currentOfferId
          ? highlightedIcon
          : defaultIcon;
      new Marker([offer.location.latitude, offer.location.longitude])
        .setIcon(icon)
        .addTo(markersLayer);
    });
    return () => {
      map.remove();
    };
  }, [offers, centerCoordinates, hoveredOfferId, currentOfferId]);

  return <div ref={mapRef} style={{ height: '100%' }} />;
}

export default Map;
