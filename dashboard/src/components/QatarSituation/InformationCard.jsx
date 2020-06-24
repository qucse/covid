import React from 'react';
import './InformationCard.css';
import { FiTrendingUp } from 'react-icons/fi';

export const InformationCard = ({ data, newData, title, subtitle, color, subcolor,image }) => {
	return (
		<div className="card" style={{ backgroundColor: color }}>
			<div className="card-container">
				<p className="title">
					<img src={image} alt={'logo'} style={{height: 40, marginRight: 5}} />
					{title}
				</p>
				<p className="data">{data}</p>
				<p className="subData align-items-baseline" style={{ backgroundColor: subcolor }}>
					{newData > 0 ? <FiTrendingUp /> : null} {newData} {subtitle}
				</p>
			</div>
		</div>
	);
};
