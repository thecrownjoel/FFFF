<?php
/**
 * Plugin Name:       Quote Rotator — FFFF
 * Description:       A random quote rotator block. Manage a list of quotes from the FFFF admin menu; the Quote Rotator block shows one at random on each page load. Built for the block editor and Full Site Editing.
 * Version:           2.2.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Joel
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ffff
 *
 * @package FFFF
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

define( 'FFFF_VERSION', '2.2.0' );
define( 'FFFF_OPTION', 'ffff_quotes' );

/**
 * Register the Quote Rotator block (dynamic — rendered by render.php).
 */
function ffff_register_block() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'ffff_register_block' );

/**
 * Add the "FFFF" item to the left admin menu.
 */
function ffff_admin_menu() {
	add_menu_page(
		__( 'FFFF', 'ffff' ),            // Page title.
		__( 'FFFF', 'ffff' ),            // Menu label.
		'manage_options',                // Capability.
		'ffff',                          // Menu slug.
		'ffff_render_admin_page',         // Render callback.
		'dashicons-format-quote',         // Icon.
		81                                // Position.
	);
}
add_action( 'admin_menu', 'ffff_admin_menu' );

/**
 * Register the quotes option with the Settings API.
 */
function ffff_register_settings() {
	register_setting(
		'ffff_settings',
		FFFF_OPTION,
		array(
			'type'              => 'array',
			'sanitize_callback' => 'ffff_sanitize_quotes',
			'default'           => array(),
		)
	);
}
add_action( 'admin_init', 'ffff_register_settings' );

/**
 * Clean the submitted quote list: trim, drop empties, allow basic HTML only.
 *
 * @param mixed $input Raw submitted value.
 * @return array Sanitized list of quote strings.
 */
function ffff_sanitize_quotes( $input ) {
	$out = array();

	if ( is_array( $input ) ) {
		foreach ( $input as $quote ) {
			$quote = is_string( $quote ) ? trim( wp_kses_post( $quote ) ) : '';
			if ( '' !== $quote ) {
				$out[] = $quote;
			}
		}
	}

	return array_values( $out );
}

/**
 * Load admin assets only on the FFFF settings screen.
 *
 * @param string $hook Current admin page hook suffix.
 */
function ffff_admin_assets( $hook ) {
	if ( 'toplevel_page_ffff' !== $hook ) {
		return;
	}

	wp_enqueue_script( 'ffff-admin', plugins_url( 'admin.js', __FILE__ ), array(), FFFF_VERSION, true );
	wp_enqueue_style( 'ffff-admin', plugins_url( 'admin.css', __FILE__ ), array(), FFFF_VERSION );
}
add_action( 'admin_enqueue_scripts', 'ffff_admin_assets' );

/**
 * Output a single quote row (used for existing rows and the JS template).
 *
 * @param string $value Quote text.
 */
function ffff_render_quote_row( $value ) {
	?>
	<div class="ffff-quote-row">
		<input
			type="text"
			class="ffff-quote-field regular-text"
			name="<?php echo esc_attr( FFFF_OPTION ); ?>[]"
			value="<?php echo esc_attr( $value ); ?>"
			placeholder="<?php esc_attr_e( 'Enter a quote…', 'ffff' ); ?>"
		/>
		<button type="button" class="button ffff-add-row" aria-label="<?php esc_attr_e( 'Add a quote below', 'ffff' ); ?>">+</button>
		<button type="button" class="button ffff-remove-row" aria-label="<?php esc_attr_e( 'Remove this quote', 'ffff' ); ?>">&minus;</button>
	</div>
	<?php
}

/**
 * Render the FFFF admin page: a simple repeater of quote text fields.
 */
function ffff_render_admin_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$quotes = get_option( FFFF_OPTION, array() );
	if ( ! is_array( $quotes ) ) {
		$quotes = array();
	}
	?>
	<div class="wrap ffff-admin">
		<h1><?php esc_html_e( 'FFFF', 'ffff' ); ?></h1>
		<p class="description">
			<?php esc_html_e( 'Add the quotes you want to rotate. Every page using the "Quote Rotator" block shows one of these at random on each load. Put attribution right in the text, e.g. "Stay hungry." — Steve Jobs', 'ffff' ); ?>
		</p>

		<form method="post" action="options.php">
			<?php settings_fields( 'ffff_settings' ); ?>

			<div id="ffff-quotes" class="ffff-quotes">
				<?php
				if ( empty( $quotes ) ) {
					ffff_render_quote_row( '' );
				} else {
					foreach ( $quotes as $quote ) {
						ffff_render_quote_row( $quote );
					}
				}
				?>
			</div>

			<p>
				<button type="button" class="button" id="ffff-add">
					<?php esc_html_e( '+ Add quote', 'ffff' ); ?>
				</button>
			</p>

			<?php submit_button( __( 'Save quotes', 'ffff' ) ); ?>
		</form>

		<template id="ffff-row-template">
			<?php ffff_render_quote_row( '' ); ?>
		</template>
	</div>
	<?php
}
