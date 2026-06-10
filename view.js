/**
 * FFFF — Quote Rotator (front end).
 *
 * On page load, pick one random quote per rotator and show only that one.
 * Without JavaScript, style.css leaves the first quote visible.
 */
( function () {
	'use strict';

	function showRandomQuote( rotator ) {
		var items = rotator.querySelectorAll( '.ffff-quote-item' );
		if ( ! items.length ) {
			return;
		}

		var chosen = Math.floor( Math.random() * items.length );

		for ( var i = 0; i < items.length; i++ ) {
			items[ i ].style.display = i === chosen ? 'block' : 'none';
		}
	}

	function init() {
		var rotators = document.querySelectorAll( '.ffff-quote-rotator' );
		for ( var i = 0; i < rotators.length; i++ ) {
			showRandomQuote( rotators[ i ] );
		}
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
