/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import icons from './icons';
import Gist from './gist';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { PlainText } = wp.editor;
const { withState } = wp.components;

/**
 * Block edit function
 */
export default withState( { preview: false } ) ( class GistBlock extends Component {

	constructor() {
		super( ...arguments );
		this.updateURL = this.updateURL.bind( this );
	}

	componentDidMount() {
		if ( this.props.attributes.url ) {
			this.props.setState( { preview: true } )
		}
	}

	updateURL( newURL ) {

		this.props.setAttributes( { url: newURL } );

		if ( ! this.props.attributes.url ) {
			this.props.setState( { preview: true } )
		}
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			preview,
			setAttributes,
			setState,
			toggleSelection,
		} = this.props;

		const {
			url,
			file,
			meta,
		} = attributes;

		return [
			// Only show inspector controls if selected.
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),
			// Only show block controls if there's an ID.
			( url && url.length > 0 && isSelected ) && (
				<Controls
					{ ...this.props }
				/>
			),
			preview ? (
				url && (
					<div
						className={ classnames(
							className,
							meta ? null : `${ className }--no-meta`,
						) }
					>
						<Gist
							url={ url }
							file={ file }
						/>
					</div>
				)
			) : (
				<div
					className={ classnames(
						className,
						'wp-block-shortcode',
					) }
				>
					<label>
						{ icons.github }
						{ __( 'Gist URL' ) }
					</label>
					<PlainText
						className="input-control"
						value={ url }
						placeholder={ __( 'Add GitHub Gist URL here…' ) }
						onChange={ this.updateURL }
					/>
				</div>
			)
		];
	}
} );