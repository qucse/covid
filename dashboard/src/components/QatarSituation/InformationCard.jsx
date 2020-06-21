import React from 'react';
import './InformationCard.css';
import { FaArrowCircleUp } from 'react-icons/fa';

export const InformationCard = ({ data, newData, title, subtitle }) => {
	return (
		<div className="card">
			<div className="card-container">
				<p className='title' >{title}</p>
				<p className="data">{data}</p>
				<p className='subData align-items-baseline' >
					<FaArrowCircleUp /> {newData} {subtitle}
				</p>
			</div>

		</div>
	);
};
