<?php
/**
 * Dependency manifest for the editor script (index.js).
 *
 * Declared by hand because this plugin ships without a build step.
 *
 * @package FFFF
 */

return array(
	'dependencies' => array(
		'wp-blocks',
		'wp-element',
		'wp-block-editor',
		'wp-server-side-render',
		'wp-i18n',
	),
	'version'      => '2.2.0',
);
