import React, {useState} from 'react';

const styles = {
	form: {
		borderTop: '2px solid #373B44',
		padding: '.5rem',
		display: 'flex'
	},
	send: {
		backgroundColor: '#D6DDEC',
		padding: '.2rem .5rem',
		border: 'none',
		':hover': {
			backgroundColor: '#2A4B99',
			cursor: 'pointer',
			color: '#fff'
		}
	},
};

const MessageForm = ({addMessage}) => {
	const [content, setContent] = useState('');

	//You can improve this function with one hook (useCallback) :
	// https://fr.reactjs.org/docs/hooks-intro.html
	// https://fr.reactjs.org/docs/hooks-reference.html
	const onSubmit = (e) => {
		addMessage({
			content,
			author: 'david',
			creation: Date.now(),
		});

		setContent('');
	};

	//You can improve this function with one hook (useCallback) :
	const onChange = (e) => {
		setContent(e.target.value);
	};

	return (
		<div style={styles.form}>
            <textarea
				onChange={onChange}
				name="content"
				rows={5}
				style={styles.content}
				value={content}
			/>
			<button onClick={onSubmit} type="submit" style={styles.send}>
				Send
			</button>
		</div>
	)
};

export default MessageForm;
