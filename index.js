/**
 * FFFF — Quote Rotator (editor + save).
 *
 * No build step: this uses the WordPress packages exposed on `window.wp`
 * (registered as dependencies in index.asset.php) instead of JSX/imports.
 */
( function ( blocks, element, blockEditor, components, i18n ) {
	'use strict';

	var el = element.createElement;
	var Fragment = element.Fragment;
	var useBlockProps = blockEditor.useBlockProps;
	var Button = components.Button;
	var __ = i18n.__;

	blocks.registerBlockType( 'ffff/quote-rotator', {
		/**
		 * Editor view: a compact, resizable list of quote inputs with
		 * per-row add (+) and remove (−) controls.
		 */
		edit: function ( props ) {
			var quotes = props.attributes.quotes || [];
			var blockProps = useBlockProps( {
				className: 'ffff-quote-rotator-editor',
			} );

			function update( next ) {
				props.setAttributes( { quotes: next } );
			}

			function setQuote( index, value ) {
				var next = quotes.slice();
				next[ index ] = value;
				update( next );
			}

			// Insert an empty quote after `index` (use -1 for the first one).
			function addQuote( index ) {
				var next = quotes.slice();
				next.splice( index + 1, 0, '' );
				update( next );
			}

			function removeQuote( index ) {
				var next = quotes.slice();
				next.splice( index, 1 );
				update( next );
			}

			var rows = quotes.map( function ( quote, index ) {
				return el(
					'div',
					{ className: 'ffff-quote-row', key: index },
					el( 'textarea', {
						className: 'ffff-quote-input',
						rows: 2,
						value: quote,
						placeholder: __( 'Enter a quote…', 'ffff' ),
						'aria-label':
							__( 'Quote', 'ffff' ) + ' ' + ( index + 1 ),
						onChange: function ( event ) {
							setQuote( index, event.target.value );
						},
					} ),
					el(
						'div',
						{ className: 'ffff-quote-actions' },
						el(
							Button,
							{
								className: 'ffff-quote-add',
								variant: 'secondary',
								label: __( 'Add a quote below', 'ffff' ),
								showTooltip: true,
								onClick: function () {
									addQuote( index );
								},
							},
							'+'
						),
						el(
							Button,
							{
								className: 'ffff-quote-remove',
								variant: 'secondary',
								isDestructive: true,
								label: __( 'Remove this quote', 'ffff' ),
								showTooltip: true,
								onClick: function () {
									removeQuote( index );
								},
							},
							'−' // minus sign
						)
					)
				);
			} );

			var footer =
				quotes.length === 0
					? el(
							Button,
							{
								variant: 'primary',
								onClick: function () {
									addQuote( -1 );
								},
							},
							__( 'Add your first quote', 'ffff' )
					  )
					: el(
							Button,
							{
								className: 'ffff-quote-add-footer',
								variant: 'secondary',
								onClick: function () {
									addQuote( quotes.length - 1 );
								},
							},
							__( '+ Add quote', 'ffff' )
					  );

			return el(
				'div',
				blockProps,
				el(
					'p',
					{ className: 'ffff-quote-rotator-title' },
					__( 'Quote Rotator', 'ffff' )
				),
				el(
					'p',
					{ className: 'ffff-quote-rotator-help' },
					__(
						'A random quote from this list shows on each page load.',
						'ffff'
					)
				),
				el( Fragment, null, rows ),
				footer
			);
		},

		/**
		 * Saved markup: every non-empty quote is written into the page.
		 * style.css hides all but the first as a no-JS fallback; view.js
		 * picks a random one to show when JavaScript is available.
		 */
		save: function ( props ) {
			var quotes = props.attributes.quotes || [];
			var blockProps = useBlockProps.save( {
				className: 'ffff-quote-rotator',
			} );

			var items = quotes
				.filter( function ( quote ) {
					return quote && quote.trim() !== '';
				} )
				.map( function ( quote, index ) {
					return el(
						'blockquote',
						{ className: 'ffff-quote-item', key: index },
						quote
					);
				} );

			return el( 'div', blockProps, items );
		},
	} );
} )(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.components,
	window.wp.i18n
);
