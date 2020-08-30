import React, { useContext } from 'react';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { MdTrendingFlat } from 'react-icons/md';
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
								<th scope="col" style={{ textAlign: 'center' }}>
									Mortality Rate
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
										{element.newConfirmed > 0 ? (
											<span className="newPositiveCase ">
												<FiTrendingUp /> {element.newConfirmed}
											</span>
										) : element.newActive < 0 ? (
											<span className="newNegativeCase ">
												<FiTrendingDown /> {Math.abs(element.newConfirmed)}
											</span>
										) : (
											<span className="newZeroCase">
												<MdTrendingFlat /> {Math.abs(element.newConfirmed)}
											</span>
										)}
										<span className="case">{element.confirmed.toLocaleString('en')}</span>
									</td>
									<td style={{ textAlign: 'center' }}>
										{element.newRecovered > 0 ? (
											<span className="newPositiveCase ">
												<FiTrendingUp /> {element.newRecovered}
											</span>
										) : element.newActive < 0 ? (
											<span className="newNegativeCase ">
												<FiTrendingDown /> {Math.abs(element.newRecovered)}
											</span>
										) : (
											<span className="newZeroCase">
												<MdTrendingFlat /> {Math.abs(element.newRecovered)}
											</span>
										)}
										<span className="case">{element.recovered.toLocaleString('en')}</span>
									</td>
									<td style={{ textAlign: 'center' }}>
										{element.newDeaths > 0 ? (
											<span className="newPositiveCase ">
												<FiTrendingUp /> {element.newDeaths}
											</span>
										) : element.newActive < 0 ? (
											<span className="newNegativeCase ">
												<FiTrendingDown /> {Math.abs(element.newDeaths)}
											</span>
										) : (
											<span className="newZeroCase">
												<MdTrendingFlat /> {Math.abs(element.newDeaths)}
											</span>
										)}
										<span className="case">{element.deaths.toLocaleString('en')}</span>
									</td>
									<td style={{ textAlign: 'center' }}>
										{element.newActive > 0 ? (
											<span className="newPositiveCase ">
												<FiTrendingUp /> {element.newActive}
											</span>
										) : element.newActive < 0 ? (
											<span className="newNegativeCase ">
												<FiTrendingDown /> {Math.abs(element.newActive)}
											</span>
										) : (
											<span className="newZeroCase">
												<MdTrendingFlat /> {Math.abs(element.newActive)}
											</span>
										)}
										<span className="case">{element.active.toLocaleString('en')}</span>
									</td>
									<td style={{ textAlign: 'center' }}>
										<span className="case">{element.population.toLocaleString('en')}</span>
									</td>
									<td style={{ textAlign: 'center' }}>
										<span className="case">{element.mortality}%</span>
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
