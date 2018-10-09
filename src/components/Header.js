import React from 'react';
import './Header.css';

const Header = (props) => {
	return (
		<header role='banner'>
			<h1>
				the morganton meal map
			</h1>
			{/* <span className='subtitle'>(aka "mmm")</span> */}
				
			{/* <a href='#main-menu'> */}
			
			
		
				<div id='nav-icon' role='button'
					aria-pressed='false'
					aria-expanded='false'
					aria-controls='main-menu'
					aria-label='Open and close main menu' 
					onClick={props.openMenu} 
					onKeyPress={props.openMenu}
				>
					Menu
					{/* <div className='hamburger-icon bar1'></div>
					<div className='hamburger-icon bar2'></div>
					<div className='hamburger-icon bar3'></div> */}
				</div>
			{/* </a> */}
		

		
		</header>
	);
};

export default Header;