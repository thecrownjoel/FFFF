/**
 * FFFF — admin repeater for the quotes list.
 *
 * Handles the global "+ Add quote" button, the per-row + / − buttons, and
 * keeps at least one row on screen. Vanilla JS, no build step.
 */
( function () {
	'use strict';

	function ready( fn ) {
		if ( document.readyState === 'loading' ) {
			document.addEventListener( 'DOMContentLoaded', fn );
		} else {
			fn();
		}
	}

	ready( function () {
		var container = document.getElementById( 'ffff-quotes' );
		var template = document.getElementById( 'ffff-row-template' );
		var addButton = document.getElementById( 'ffff-add' );

		if ( ! container || ! template ) {
			return;
		}

		function makeRow() {
			var fragment = template.content.cloneNode( true );
			return fragment.querySelector( '.ffff-quote-row' );
		}

		function focusRow( row ) {
			var field = row.querySelector( '.ffff-quote-field' );
			if ( field ) {
				field.focus();
			}
		}

		if ( addButton ) {
			addButton.addEventListener( 'click', function () {
				var row = makeRow();
				container.appendChild( row );
				focusRow( row );
			} );
		}

		container.addEventListener( 'click', function ( event ) {
			var target = event.target;

			if ( target.classList.contains( 'ffff-add-row' ) ) {
				var current = target.closest( '.ffff-quote-row' );
				var row = makeRow();
				current.parentNode.insertBefore( row, current.nextSibling );
				focusRow( row );
				return;
			}

			if ( target.classList.contains( 'ffff-remove-row' ) ) {
				var rows = container.querySelectorAll( '.ffff-quote-row' );
				var toRemove = target.closest( '.ffff-quote-row' );

				if ( rows.length > 1 ) {
					toRemove.parentNode.removeChild( toRemove );
				} else {
					// Keep one row — just clear it.
					var field = toRemove.querySelector( '.ffff-quote-field' );
					if ( field ) {
						field.value = '';
						field.focus();
					}
				}
			}
		} );
	} );
} )();
