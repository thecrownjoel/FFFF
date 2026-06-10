<?php
/**
 * Server-side render for the Quote Rotator block.
 *
 * Outputs every saved quote from the global FFFF list. style.css hides all but
 * the first (no-JS fallback); view.js reveals a random one when JS is available.
 *
 * @package FFFF
 */

$ffff_quotes = get_option( FFFF_OPTION, array() );
if ( ! is_array( $ffff_quotes ) ) {
	$ffff_quotes = array();
}

// Trim and drop any empties.
$ffff_quotes = array_values(
	array_filter(
		array_map( 'trim', $ffff_quotes ),
		static function ( $quote ) {
			return '' !== $quote;
		}
	)
);

if ( empty( $ffff_quotes ) ) {
	return; // Nothing to display.
}

$ffff_wrapper = get_block_wrapper_attributes( array( 'class' => 'ffff-quote-rotator' ) );
?>
<div <?php echo $ffff_wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped by core. ?>>
	<?php foreach ( $ffff_quotes as $ffff_quote ) : ?>
		<blockquote class="ffff-quote-item"><?php echo wp_kses_post( $ffff_quote ); ?></blockquote>
	<?php endforeach; ?>
</div>
