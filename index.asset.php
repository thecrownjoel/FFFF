<?php
/**
 * Dependency manifest for the editor script (index.js).
 *
 * Because this plugin ships without a build step, we declare the WordPress
 * script dependencies by hand so the editor APIs used in index.js are loaded.
 *
 * @package FFFF
 */

return array(
	'dependencies' => array(
		'wp-blocks',
		'wp-element',
		'wp-block-editor',
		'wp-components',
		'wp-i18n',
	),
	'version'      => '1.0.0',
);
