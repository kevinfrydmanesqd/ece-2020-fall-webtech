import React from 'react';

const styles = {
	header: {
		height: 60,
		backgroundColor: 'rgba(255,255,255,.3)',
		flexShrink: 0
	},
	headerLogIn: {
		backgroundColor: 'red'
	},
	headerLogOut: {
		backgroundColor: 'blue'
	},
};

const Header = () => (
	<header className="app-header" style={styles.header}>
		<h1>header</h1>
	</header>
);

export default Header;
