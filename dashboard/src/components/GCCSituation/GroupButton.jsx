import React from 'react';

export const GroupButton = ({ onChange, choice, name }) => {
	return (
		<div className="btn-group btn-group-sm mb-1 mt-1" role="group" style={{ width: '100%' }}>
			<label className="btn btn-info">
				<input
					type="radio"
					name={name}
					defaultChecked={choice === 'active' ? true : false}
					value={'active'}
					onClick={(event) => {
						onChange(event.target.value);
					}}
				/>
				{' Active'}
			</label>
			<label className="btn btn-info">
				<input
					type="radio"
					name={name}
					defaultChecked={choice === 'confirmed' ? true : false}
					value={'confirmed'}
					onClick={(event) => {
						onChange(event.target.value);
					}}
				/>
				{' Confirmed'}
			</label>
			<label className="btn btn-info">
				<input
					type="radio"
					name={name}
					defaultChecked={choice === 'recovered' ? true : false}
					value={'recovered'}
					onClick={(event) => {
						onChange(event.target.value);
					}}
				/>
				{' Recovered'}
			</label>
			<label className="btn btn-info">
				<input
					type="radio"
					name={name}
					defaultChecked={choice === 'deaths' ? true : false}
					value={'deaths'}
					onClick={(event) => {
						onChange(event.target.value);
					}}
				/>
				{' Deaths'}
			</label>
		</div>
	);
};
