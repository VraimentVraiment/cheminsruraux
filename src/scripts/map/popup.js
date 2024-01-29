import MapboxInspect from 'mapbox-gl-inspect';

import __ from "@/scripts/map/i18n";

export function createPopup(mapboxgl, layers) {

  return new MapboxInspect({

    popup: new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    }),

    showInspectButton: false,
    showMapPopup: true,
    selectThreshold: 3,

    queryParameters: {
      layers
    },

    renderPopup(features) {
      return htmlFeature(features[0]);
    }
  });
}

function htmlFeature(feature) {

  const properties = Object.entries(feature.properties)
    .filter(filterFeatureProperty)
    .map(htmlFeatureProperty)

  const title = htmlFeatureTitle(feature, properties);

  return [
    title,
    ...properties
  ].join('');
}

function htmlFeatureTitle(feature, properties) {
  const title = __(feature.properties.class);
  return `<h3>${properties?.length ? title : `${title} non qualifié`}</h3>`;
}

function filterFeatureProperty([key, value]) {
  return (
    key !== "class" &&
    value !== "unknown"
  );
}

function htmlFeatureProperty([key, value]) {
  return `<p><span class="key">${__(key)}</span>: <span class="value">${__(value)}</span></p>`;
}