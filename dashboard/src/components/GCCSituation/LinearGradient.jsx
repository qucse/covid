import React from 'react';
import PropTypes from 'prop-types';

const LinearGradient = (props) => {
	const { data } = props;
	const boxStyle = {
		width: 180,
		margin: 'auto',
		display: 'flex',
	};
	const gradientStyle = {
		backgroundImage: `linear-gradient(to right, ${data.fromColor} , ${data.toColor})`,
		height: 20
	};
	return (
		<div>
			<div style={boxStyle} className="display-flex">
				<span>{data.min}</span>
				<span className="fill" style={{ flex: 1 }} />
				<span>{data.max}</span>
			</div>
			<div style={{ ...boxStyle, ...gradientStyle }} className="mt8" />
		</div>
	);
};

LinearGradient.propTypes = {
	data: PropTypes.object.isRequired
};

export default LinearGradient;
