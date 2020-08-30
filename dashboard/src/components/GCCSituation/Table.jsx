import React, { useContext } from 'react';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { Context } from '../../contexts/GCCContext';

export const Table = () => {
	const { state: { GCCData } } = useContext(Context);
	return (
		<div className="row mt-4 mb-4">
			<div className="col-md-12">
				<div className="card p-4">
					<table className="table table-striped table-hover table-responsive-md">
						<thead>
							<tr>
								<th scope="col" style={{ textAlign: 'center' }}>
									#
								</th>
								<th scope="col">Country</th>
								<th scope="col" style={{ textAlign: 'center' }}>
									Confirmed Cases
								</th>
								<th scope="col" style={{ textAlign: 'center' }}>
									Recovered Cases
								</th>
								<th scope="col" style={{ textAlign: 'center' }}>
									Death Cases
								</th>
								<th scope="col" style={{ textAlign: 'center' }}>
									Active Cases
								</th>
								<th scope="col" style={{ textAlign: 'center' }}>
									Population
								</th>
							</tr>
						</thead>
						<tbody>
							{GCCData.map((element, index) => (
								<tr key={index}>
									<th scope="row" style={{ textAlign: 'center' }}>
										{++index}
									</th>
									<td className="case">{element.country}</td>
									<td style={{ textAlign: 'center' }}>
										<span className="newPositiveCase">
											<FiTrendingUp /> {element.newConfirmed}
										</span>
										<span className="case">{element.confirmed.toLocaleString('en')}</span>
									</td>
									<td style={{ textAlign: 'center' }}>
										<span className="newPositiveCase">
											<FiTrendingUp /> {element.newRecovered}
										</span>
										<span className="case">{element.recovered.toLocaleString('en')}</span>
									</td>
									<td style={{ textAlign: 'center' }}>
										<span className="newPositiveCase ">
											<FiTrendingUp /> {element.newDeaths}
										</span>
										<span className="case">{element.deaths.toLocaleString('en')}</span>
									</td>
									<td style={{ textAlign: 'center' }}>
										{element.newActive >= 0 ? (
											<span className="newPositiveCase ">
												<FiTrendingUp /> {element.newActive}
											</span>
										) : (
											<span className="newNegativeCase ">
												<FiTrendingDown /> {Math.abs(element.newActive)}
											</span>
										)}
										<span className="case">{element.active.toLocaleString('en')}</span>
									</td>
									<td style={{ textAlign: 'center' }}>
										<span className="case">{element.population.toLocaleString('en')}</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
