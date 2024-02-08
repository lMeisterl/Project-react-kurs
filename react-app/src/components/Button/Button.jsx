import './Button.css';
import { useState } from 'react';

function Button() {
	// let text = 'Сохранить';
	const [text, setText] = useState('Сохранить');
	const ckicked = () => {
		// text = 'Закрыть';
		setText(t => t + '!');
		console.log(text);
	};
	
	return (
		<button onClick={ckicked} className='button accent'>{text}</button>
	);
}

export default Button;
