import React, {useState, useEffect, useCallback} from 'react';

import axios from 'axios';

const styles = {
	channels: {
		minWidth: 200
	},
};

const Channels = ({handleClick}) => {
	const [channels, setChannels] = useState([]); //Initialiser à vide avant de pouvoir les récuperer

	useEffect(() => {
		axios.get('http:://localhost:8000/api/v1/channels').then(response => {
			setChannels(response.data);
		})
	}, []); //tableau vide pour qu'on rentre qu'ici uniquement au chargement du composant

	const onSelectChannel = useCallback(
		channel => handleClick(channel),
		[],
	);

	return (
		<div style={styles.channels}>
			{channels.map(channel => (
				<div key={channel.id} onClick={() => onSelectChannel(channel)}>
					{channel.name}
				</div>
			))}
		</div>
	);
}

export default Channels;
