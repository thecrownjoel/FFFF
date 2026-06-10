/**
 * FFFF — Quote Rotator block (editor).
 *
 * Quotes are managed globally on the FFFF admin page, so the block itself has
 * no settings — it just previews the rendered output. This is a dynamic block:
 * save() returns null and render.php produces the front-end markup.
 *
 * No build step: uses the WordPress packages on `window.wp`.
 */
( function ( blocks, element, blockEditor, serverSideRender, i18n ) {
	'use strict';

	var el = element.createElement;
	var useBlockProps = blockEditor.useBlockProps;
	var ServerSideRender = serverSideRender;
	var __ = i18n.__;

	blocks.registerBlockType( 'ffff/quote-rotator', {
		edit: function () {
			var blockProps = useBlockProps();

			return el(
				'div',
				blockProps,
				el( ServerSideRender, {
					block: 'ffff/quote-rotator',
					EmptyResponsePlaceholder: function () {
						return el(
							'p',
							{ className: 'ffff-empty-preview' },
							__(
								'No quotes yet — add some in the FFFF menu in your admin sidebar.',
								'ffff'
							)
						);
					},
				} )
			);
		},

		// Dynamic block: front-end markup comes from render.php.
		save: function () {
			return null;
		},
	} );
} )(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.serverSideRender,
	window.wp.i18n
);
