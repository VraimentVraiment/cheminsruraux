<div class="entry-content">
  <div class="vv-post-container entry-content__left-column">
    <?php the_content( __( 'Continue reading', 'twentytwenty' ) ); ?>
  </div>
  <div class="vv-map-container entry-content__right-column">
    <h4 class="vv-map-title">État de la connaissance des chemins sur OpenStreetMap</h4>
    <div id="vv-map-mapbox-container"></div>
    <div class="vv-map-legend">
      <h5 class="legend-title">Légende</h5>
      <div class="legend-content">
        <p class="legend-line">
          <span class="legend-icon path-icon qualifie"></span>
          <span>Chemin probablement cyclable</span>
        </p>
        <p class="legend-line">
          <span class="legend-icon path-icon nonqualifie"></span>
          <span>Chemin sans qualification de la cyclabilité</span>
        </p>
        <p class="legend-line">
          <span class="legend-icon path-icon cyclable"></span>
          <span>Voie cyclable</span>
        </p>
      </div>
      <p class="legend-credits">Carte <a target="_blank" href="https://github.com/VraimentVraiment/cheminsruraux">réalisée par Vraiment Vraiment</a> avec tilemaker et mapboxgl.js,  <a target="_blank" href="https://download.geofabrik.de/europe/france.html">données OSM</a>
          Novembre 2022</p>
    </div>
  </div>
</div>