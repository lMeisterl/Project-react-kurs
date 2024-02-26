import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer, useRef} from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../input/input';

function JournalForm({ onSubmit }) {
	const [formState, dispathForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	//фокус на не заполненое поле
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	
	const focusError = (isValid) => {
		switch(true){
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;

		}
	};

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispathForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect (() => {
		if (isFormReadyToSubmit){
			onSubmit(values);
			dispathForm({ type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	const onChange = (e) => {
		dispathForm({ type: 'SET_VALUE', payload: {[e.target.name]:e.target.value}});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		const fromData =new FormData(e.target);
		const formProps = Object.fromEntries(fromData);
		dispathForm({ type: 'SUBMIT', payload: formProps});
	};
	//Первый способ применить стиль className={`${styles['input']} ${formValidState.title ? '' : styles['invalid']}`}`
	//Второй способ применить стиль style={{ border:  formValidState.date ? undefined : '1px solid red' }}
	//Первый более облегчённый 
	// Третий способ с использование библиотеки classNames 
	//className={cn(styles['input'],{
	// 	[styles['invalid']] : !formValidState.title
	// })}
	return(
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input type='title' onChange={onChange} ref={titleRef} isValid = {isValid.title} value={values.title} name='title' appearence = "title" />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-labels']}>
					<img src="/calendar1.png" alt="Иконка календарь" />
					<span>Дата</span>
				</label>
				<Input type='date' ref = {dateRef} onChange={onChange} isValid = {isValid.date} name='date' id='date' value={values.date} />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-labels']}>
					<img src="/folder1.png" alt="Иконка папки" />
					<span>Метки</span>
				</label>
				<Input type='text'onChange={onChange} name='tag' value={values.text} id='tag' />
			</div>
			<textarea name='post' ref={postRef} onChange={onChange} value={values.post} id='' cols="30" rows="10" className={cn(styles['input'],{
				[styles['invalid']] : !isValid.post
			})}></textarea>
			<Button text="Сохранить"/>
		</form>
	);
}

export default JournalForm;
