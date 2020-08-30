import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';
// import qu from '../assets/images/qu.png';
export const NavBar = () => {
	const [ selectedBar, setSelectedBar ] = useState('qatar');
	return (
		<Navbar bg="light" expand="lg" className="p-0">
			<div className="container align-items-baseline">
				<Navbar.Brand>
					<Link to="/" className="nav-text" style={{ fontWeight: 'bold' }}>
						QU COVID-19 Dashboard
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link
							to="/"
							className={`nav-text nav-links ${selectedBar === 'qatar' ? 'nav-active' : null}  `}
							onClick={() => {
								setSelectedBar('qatar');
							}}
						>
							Country Situation
						</Link>
						<Link
							to="/gcc"
							className={`nav-text nav-links ${selectedBar === 'gcc' ? 'nav-active' : null}  `}
							onClick={() => {
								setSelectedBar('gcc');
							}}
						>
							GCC Summary
						</Link>
						<Link
							to="/prediction"
							className={`nav-text nav-links ${selectedBar === 'prediction' ? 'nav-active' : null}  `}
							onClick={() => {
								setSelectedBar('prediction');
							}}
						>
							What-If Analysis
						</Link>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
};
