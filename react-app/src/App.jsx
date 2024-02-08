import './App.css';
import Button from './components/Button/Button';
import CartButton from './components/CartButton/CartButton';
import JournalItem from './components/JournalItem/journalitem';

function App() {
	const data = [
		{
			title: 'Подготовка к обновлению курса',
			text: 'пупупу',
			date: new Date()
		},
		{
			title: 'Поход в горы',
			text: 'Думал что очень много времени',
			date: new Date()
		}
	];
	return (
		<>
			<h1>Заголовок</h1>
			<p>Какой-то текст</p>
			<Button></Button>
			<CartButton>
        + Новое воспоминание
			</CartButton>
			<CartButton>
				<JournalItem
					title={data[0].title}
					text={data[0].text}
					date={data[0].date}/>
			</CartButton>
			<CartButton><JournalItem
				title={data[1].title}
				text={data[1].text}
				date={data[1].date}/>
			</CartButton>
		</>
	);
}

export default App;
