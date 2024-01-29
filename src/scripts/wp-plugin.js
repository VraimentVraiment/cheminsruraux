import '@/styles/wp-plugin/index.scss';

import { renderMap } from '@/scripts/map/';

window.addEventListener('load', () => {

  const container = document.querySelector('.entry-content');
  const mapContainer = document.querySelector('.vv-map-container');
  const mapboxContainer = document.getElementById('vv-map-mapbox-container');
  const postContainer = document.querySelector('.vv-post-container');
  const topMark = document.querySelector('.vv-map__top-mark');
  const teleportMarks = document.querySelectorAll('.vv-map__teleport-mark');
  const flyToButtons = document.querySelectorAll('.vv-map-spot-link');

  let currentTpMark = null;

  try {
    const { flyTo } = renderMap(mapboxContainer);
    flyToButtons.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const { lat, lon, zoom } = e.target.dataset;
        flyTo({ lat, lon, zoom });
      });
    });
  } catch (e) {
    console.error(e);
  }

  handleMapLayout();
  window.addEventListener('resize', handleMapLayout);
  window.addEventListener('scroll', handleMapLayout);

  function handleMapLayout() {
      if (window.innerWidth < 901) {
        teleportMark();
      } else {
        setMapFixed();
      }
  }

  function teleportMark() {

    const OFFSET = 100;
    const intersectingMark = Array.from(teleportMarks)
      .filter(mark => {
        const { top } = mark.getBoundingClientRect();
        return top - window.innerHeight - OFFSET < 0;
      })
      .pop();

    if (intersectingMark && intersectingMark !== currentTpMark) {
      currentTpMark = intersectingMark;
      currentTpMark.appendChild(mapContainer)
    }
  }

  function setMapFixed() {

    if (currentTpMark) {
      container.appendChild(mapContainer)
      currentTpMark = null;
    }

    const { top: postTop } = postContainer.getBoundingClientRect();
    const { bottom: mapBottom } = mapContainer.getBoundingClientRect();
    const { top: markTop } = topMark.getBoundingClientRect();

    const postBottom = window.innerHeight - postTop - postContainer.offsetHeight;
    const isMapBelowMark = mapBottom - markTop;

    if (isMapBelowMark < 0) {
      container.classList.add('--beforemark')
      container.classList.remove('--aftermark')
    } else {
      container.classList.remove('--beforemark')
      container.classList.add('--aftermark')
    }

    if (postBottom > 0) {
      container.classList.add('--align-end')
      container.classList.remove('--fixed')
    } else {
      container.classList.remove('--align-end')
      if (postTop < 0) {
        container.classList.add('--fixed')
      } else {
        container.classList.remove('--fixed')
      }
    }
  }
})