"use client";

import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { DUBAI_CENTER, POPULAR_AREAS, type ServiceArea } from "@/data/service-areas";

/** Zoom level from which every pin shows its name (below it, only popular + selected do). */
const ALL_LABELS_ZOOM = 12.5;
/** When this few areas are visible (region tab / search), always show every name. */
const ALL_LABELS_MAX_AREAS = 20;

interface AreasMapProps {
  areas: ServiceArea[];
  selected: string | null;
  onSelect: (name: string) => void;
}

/** Brand-coloured pin as plain HTML — no image assets needed. */
const pinIcon = (active: boolean) =>
  L.divIcon({
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    tooltipAnchor: [0, -26],
    html: `<span class="area-pin${active ? " area-pin--active" : ""}"><span></span></span>`,
  });

/** Keeps the view in sync: fly to the selected area, otherwise fit all visible pins. */
function ViewController({ areas, selected }: { areas: ServiceArea[]; selected: string | null }) {
  const map = useMap();

  useEffect(() => {
    const hit = selected && areas.find((a) => a.name === selected);
    if (hit) {
      map.flyTo(hit.position, 14, { duration: 1.2 });
    } else if (areas.length === 1) {
      map.flyTo(areas[0].position, 14, { duration: 1.2 });
    } else if (areas.length > 1) {
      map.flyToBounds(L.latLngBounds(areas.map((a) => a.position)), { padding: [40, 40], duration: 1.2 });
    }
  }, [map, areas, selected]);

  return null;
}

function ZoomWatcher({ onZoom }: { onZoom: (z: number) => void }) {
  const map = useMapEvents({ zoomend: () => onZoom(map.getZoom()) });
  useEffect(() => onZoom(map.getZoom()), [map, onZoom]);
  return null;
}

export default function AreasMap({ areas, selected, onSelect }: AreasMapProps) {
  const icons = useMemo(() => ({ normal: pinIcon(false), active: pinIcon(true) }), []);
  const [zoom, setZoom] = useState(11);
  const showAll = zoom >= ALL_LABELS_ZOOM || areas.length <= ALL_LABELS_MAX_AREAS;

  return (
    <MapContainer
      center={DUBAI_CENTER}
      zoom={11}
      minZoom={9}
      maxZoom={17}
      scrollWheelZoom={false}
      className="areas-map h-full w-full"
      attributionControl
    >
      {/* OpenStreetMap tiles: free, no API key. For high traffic, switch to a paid tile provider. */}
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />

      {areas.map((a) => {
        const active = a.name === selected;
        return (
          <Marker
            key={a.name}
            position={a.position}
            icon={active ? icons.active : icons.normal}
            zIndexOffset={active ? 1000 : 0}
            eventHandlers={{ click: () => onSelect(a.name) }}
            title={a.name}
            alt={a.name}
          >
            <Tooltip
              // key forces Leaflet to rebuild the tooltip when it switches between permanent and hover-only
              key={String(showAll || active || POPULAR_AREAS.includes(a.name))}
              permanent={showAll || active || POPULAR_AREAS.includes(a.name)}
              direction="top"
              className={`area-label${active ? " area-label--active" : ""}`}
            >
              {a.name}
            </Tooltip>
          </Marker>
        );
      })}

      <ViewController areas={areas} selected={selected} />
      <ZoomWatcher onZoom={setZoom} />
    </MapContainer>
  );
}
