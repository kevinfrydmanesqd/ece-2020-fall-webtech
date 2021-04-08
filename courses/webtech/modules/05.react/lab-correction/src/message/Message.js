import React from 'react';
import moment from 'moment';

//Permet d'inserer un retour à la ligne
//https://github.com/yosuke-furukawa/react-nl2br#readme
const nl2br = require('react-nl2br');

const styles = {
	message: {
		margin: '.2rem',
		padding: '.2rem',
		// backgroundColor: '#66728E',
		':hover': {
			backgroundColor: 'rgba(255,255,255,.2)'
		}
	},
};

const Messages = ({message}) => (
	<li style={styles.message}>
		<p>
			<span>{message.author}</span>
			{' '}
			<span>{moment(message.creation).fromNow()}</span>
		</p>
		<div>
			{nl2br(message.content)}
		</div>
	</li>
);

export default Messages;
