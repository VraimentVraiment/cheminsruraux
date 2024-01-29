import mapboxgl from 'mapbox-gl';
import { createPopup } from '@/scripts/map/popup';

import * as CONFIG from "@/scripts/map/config";
import { ACCESS_TOKEN, STYLE_URL } from "@/scripts/map/config.secrets";

export function renderMap(container) {

  if (!container) {
    return;
  }

  mapboxgl.accessToken = ACCESS_TOKEN;

  const map = new mapboxgl.Map({
    container: container.id,
    style: STYLE_URL,
    center: CONFIG.START_CENTER,
    zoom: CONFIG.START_ZOOM,
    minZoom: CONFIG.MIN_ZOOM,
    maxZoom: CONFIG.MAX_ZOOM,
    maxBounds: CONFIG.MAX_BOUND
  });

  /*
   * Here we are monkey patching the mapbox-gl-inspect library,
   * which has not been updated for a long time.
   * It still uses map.style.sourceCaches method,
   * which was replaced by map.style._sourceCaches in recent mapbox-gl versions.
   */
  map.style.sourceCaches ??= map.style._sourceCaches;

  map.on("load", () => {
    map.addControl(createPopup(mapboxgl, CONFIG.INSPECT_LAYERS))
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.ScaleControl());
    map.addControl(new mapboxgl.NavigationControl(CONFIG.NAVIGATION_OPTIONS), 'top-right');

    let zoomLevel;
    map.on("zoom", () => {
      const mapZoomLevel = Math.floor(map.getZoom());

      if (mapZoomLevel !== zoomLevel) {
        zoomLevel = mapZoomLevel;
        container.dataset.zoomLevel = zoomLevel;
      }
    });
  });

  const flyTo = ({ lat, lon, zoom }) => {
    map.flyTo({ center: [lon, lat], zoom: parseFloat(zoom) });
  }

  return {
    flyTo
  }
}