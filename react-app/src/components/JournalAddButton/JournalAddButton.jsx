import CartButton from '../CartButton/CartButton';
import './JournalAddButton.css';

function JournalAddButton() {
	return (
		<CartButton className = "journal-add">
			<img src="/plus1.png" alt="" />
			Новое воспоминание
		</CartButton>
	);
}

export default JournalAddButton;
