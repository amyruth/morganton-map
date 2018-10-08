import React from 'react';
import './Header.css';

const Header = (props) => {
	return (
		<header>
			<h1>
				the morganton meal map
			</h1>
			{/* <span className='subtitle'>(aka "mmm")</span> */}
				
			<a href='#main-menu' 
			className='menu-toggle'
			role='button'
			id='main-menu-toggle'
			aria-expanded='false'
			aria-controls='main-menu'
			aria-label='Open main menu'
			>
				<div id='nav-icon' aria-hidden='true' onClick={props.openMenu}>
					<div className='hamburger-icon'></div>
					<div className='hamburger-icon'></div>
					<div className='hamburger-icon'></div>
				</div>
			</a>
		

		
		</header>
	);
};

export default Header;