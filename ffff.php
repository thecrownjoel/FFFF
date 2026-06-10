<?php
/**
 * Plugin Name:       FFFF
 * Description:       A block that shows one random quote from your list on each page load.
 * Version:           1.0.0
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

/**
 * Register the Quote Rotator block from block.json.
 *
 * register_block_type() reads block.json in this directory and wires up the
 * editor script, view script, and styles declared there.
 */
function ffff_register_block() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'ffff_register_block' );
