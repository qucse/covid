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
								<th scope="col">#</th>
								<th scope="col">Country Cases</th>
								<th scope="col">Confirmed Cases</th>
								<th scope="col">Recovered Cases</th>
								<th scope="col">Death Cases</th>
								<th scope="col">Active Cases</th>
							</tr>
						</thead>
						<tbody>
							{GCCData.map((element, index) => (
								<tr key={index}>
									<th scope="row">{++index}</th>
									<td className="case">{element.country}</td>
									<td>
										<span className="newPositiveCase">
											<FiTrendingUp /> {element.newConfirmed}
										</span>
										<span className="case">{element.confirmed}</span>
									</td>
									<td>
										<span className="newPositiveCase">
											<FiTrendingUp /> {element.newRecovered}
										</span>
										<span className="case">{element.recovered}</span>
									</td>
									<td>
										<span className="newPositiveCase ">
											<FiTrendingUp /> {element.newDeaths}
										</span>
										<span className="case">{element.deaths}</span>
									</td>
									<td>
										{element.newActive > 0 ? (
											<span className="newPositiveCase ">
												<FiTrendingUp /> {element.newActive}
											</span>
										) : (
											<span className="newNegativeCase ">
												<FiTrendingDown /> {Math.abs(element.newActive)}
											</span>
										)}
										<span className="case">{element.active}</span>
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
