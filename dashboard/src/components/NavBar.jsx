import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';
// import qu from '../assets/images/qu.png';
export const NavBar = () => {
	return (
		<Navbar bg="light" expand="lg">
			<div className="container align-items-baseline">
				<Navbar.Brand>
					<Link to="/" className="nav-text">
						COVID-19 Dashboard
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link to="/" className="nav-text nav-links">
							Qatar Situation
						</Link>
						<Link to="/gcc" className="nav-text nav-links">
							GCC Situation
						</Link>
						<Link to="/prediction" className="nav-text nav-links">
							What-If Analysis
						</Link>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
};
