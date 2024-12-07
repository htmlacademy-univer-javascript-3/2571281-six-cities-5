import { useEffect, useRef } from 'react';
import L, { Icon, layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../types';

type MapProps = {
  offers: Offer[];
};

const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map({ offers }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    const map = L.map(mapRef.current, {
      center: [52.38333, 4.9],
      zoom: 12
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    const markersLayer = layerGroup().addTo(map);
    offers.forEach((offer) => {
      new Marker([offer.latitude, offer.longitude])
        .setIcon(defaultIcon)
        .addTo(markersLayer);
    });

    return () => {
      map.remove();
    };
  }, [offers]);

  return <div className="cities__map" ref={mapRef} style={{ height: '100%' }}></div>;
}
