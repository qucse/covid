import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

export const Table = ({ data }) => {
	return (
		<div className="row mt-4 mb-4">
			<div className="col-md-12">
				<div className="card p-4">
					<table class="table table-striped table-hover table-responsive-md">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Country</th>
								<th scope="col">Confirmed</th>
								<th scope="col">Recovered</th>
								<th scope="col">Active</th>
								<th scope="col">Deaths</th>
							</tr>
						</thead>
						<tbody>
							{data.map((element, index) => (
								<tr>
									<th scope="row">{++index}</th>
									<td className="case">{element.country}</td>
									<td>
										<span className="newCase">
											<FiTrendingUp /> {element.newConfirmed}
										</span>
										<span className="case">{element.confirmed}</span>
									</td>
									<td>
										<span className="newCase">
											<FiTrendingUp /> {element.newRecovered}
										</span>
										<span className="case">{element.recovered}</span>
									</td>
									<td className="case">{element.active}</td>
									<td>
										<span className="newCase">
											<FiTrendingUp /> {element.newDeaths}
										</span>
										<span className="case">{element.deaths}</span>
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
