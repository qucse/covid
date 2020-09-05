import React from 'react';
import './InformationCard.css';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

export const InformationCard = ({ data, newData, title, subtitle, color, subcolor, image, percent }) => {
	return (
		<div className="card" style={{ backgroundColor: color }}>
			<div className="card-container">
				<p className="title">
					<img src={image} alt={'logo'} style={{ height: 40, marginRight: 5 }} />
					{title}
				</p>
				{data > 0 ? (
					<React.Fragment>
						<p className="data">{data ? percent ? `${data}%` : data.toLocaleString('en') : 0}</p>
						<p className="subData align-items-baseline" style={{ backgroundColor: subcolor }}>
							{newData > 0 ? <FiTrendingUp /> : newData < 0 ? <FiTrendingDown /> : null}{' '}
							{newData ? percent ? `${Math.abs(newData)}%` : newData.toLocaleString('en') : 0} {subtitle}
						</p>
					</React.Fragment>
				) : (
					<p style={{ fontSize: '25px', fontWeight: 'bold' }}>Data is not Available</p>
				)}
			</div>
		</div>
	);
};
