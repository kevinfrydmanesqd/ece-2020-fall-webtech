import React from 'react';
import Message from './Message';

const Messages = ({messages}) => (
	<ul>
		{messages.map(message => (
			<Message key={message.id} message={message} />
		))}
	</ul>
);

export default Messages;
