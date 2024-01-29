<?php
/**
 * Plugin Name: VV custom maps
 * Description: VV custom maps
 * Version:     0.0.1
 * Author:      Vraiment Vraiment
 * Author URI:  https://vraimentvraiment.com
 * Text Domain: vv-map
 * License:     GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 */

defined( 'ABSPATH' ) || exit;

define('VVMAP_VER', '0.0.1');
define('VVMAP_URL', plugin_dir_url(__FILE__));
define('VVMAP_PATH', plugin_dir_path(__FILE__));
define('VVMAP_TEMPLATE_NAME', 'vvmap_page_template');
define('VVMAP_TEMPLATE_LABEL', 'Cartographie chemins VV');

/**
 * Make our template available in the page template dropdown
 */
add_filter( 'template_include', function ($template) {
  if ( get_post_meta( get_the_ID(), '_wp_page_template', true ) === VVMAP_TEMPLATE_NAME ) {
    $template = VVMAP_PATH . 'template.php';
  }
  return $template;
});

$post_types = get_post_types();
if( !empty($post_types) ){
  foreach ($post_types as $post_type){
    add_filter( "theme_{$post_type}_templates", function ($templates) {
      $templates[VVMAP_TEMPLATE_NAME] = VVMAP_TEMPLATE_LABEL;
      return $templates;
    });
  }
}

/**
 * If we're on a page using our template, enqueue our assets
 */
add_action('wp_enqueue_scripts', function () {
  if ( get_post_meta( get_the_ID(), '_wp_page_template', true ) === VVMAP_TEMPLATE_NAME ) {

    $manifest = json_decode(file_get_contents(VVMAP_PATH . 'dist/.vite/manifest.json'), true);
    $entry = $manifest['scripts/wp-plugin.js'];

    $stylesheet = VVMAP_URL . 'dist/' . $entry['css'][0];
    wp_enqueue_style('vv-map-style', $stylesheet, null, VVMAP_VER, 'all');

    $script = $entry['file'];
    wp_enqueue_script('vv-map-script', VVMAP_URL . 'dist/' .  $script, null, VVMAP_VER, true);
  }
});

/**
 * Add our shortcodes
 */
add_shortcode('vv-map-spot', function ($atts) {
  $atts = shortcode_atts(array(
    "lat" => "",
    "lon" => "",
    'label' => 'Voir sur lacarte',
    'zoom' => '12',
  ), $atts, 'vv-map-spot');

  $lat = $atts['lat'];
  $lon = $atts['lon'];
  $label = $atts['label'];
  $zoom = $atts['zoom'];

  return "<button class='vv-map-spot-link' data-lat='$lat' data-lon='$lon' data-zoom='$zoom' >$label</button>";
});

add_shortcode('vv-map-topmark', function ($atts) {
  return "<div class='vv-map__top-mark'></div>";
});

add_shortcode('vv-map-teleportmark', function ($atts) {
  return "<div class='vv-map__teleport-mark'></div>";
});
