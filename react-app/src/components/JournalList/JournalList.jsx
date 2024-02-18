import './JournalList.css';
import JournalItem from '../JournalItem/journalitem';
import CartButton from '../CartButton/CartButton';



function JournalList({ items }) {

	if(items.length === 0){
		return <p>Создайте своё первое воспоминание!</p>;
	}
	const sortItem = (a,b) =>{
		if (a.date < b.date){
			return 1;
		}
		else{
			return -1;
		}
	};

	return <>
		{items.sort(sortItem).map(el => (
			<CartButton key={(el.id)}>
				<JournalItem
					title={el.title}
					text={el.text}
					date={el.date}/>
			</CartButton>))}</>;
}

export default JournalList;
