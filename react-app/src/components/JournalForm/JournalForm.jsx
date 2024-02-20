import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({ onSubmit }) {

	const [formValidState, setFromValidState] =useState({
		title: true,
		post: true,
		date: true
	});

	const addJournalItem = (e) => {
		e.preventDefault();
		const fromData =new FormData(e.target);
		const formProps = Object.fromEntries(fromData);
		let isFormValid = true;
		if(!formProps.title?.trim().length){
			setFromValidState(state => ({...state, title: false}));
			isFormValid = false;
		} else{
			setFromValidState(state => ({...state, title: true}));
		}
		if(!formProps.post?.trim().length){
			setFromValidState(state => ({...state, post: false}));
			isFormValid = false;
		} else{
			setFromValidState(state => ({...state, post: true}));
		}
		if(!formProps.date){
			setFromValidState(state => ({...state, date: false}));
			isFormValid = false;
		} else{
			setFromValidState(state => ({...state, date: true}));
		}
		if(!isFormValid){
			return;
		}
		onSubmit(formProps);
	};
	//Первый способ применить стиль className={`${styles['input']} ${formValidState.title ? '' : styles['invalid']}`}`
	//Второй способ применить стиль style={{ border:  formValidState.date ? undefined : '1px solid red' }}
	//Первый более облегчённый 
	return(
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<input type='title' name='title' className={`${styles['input']} ${formValidState.title ? '' : styles['invalid']}`}/>
			<input type='date' name='date'className={`${styles['input']} ${formValidState.date ? '' : styles['invalid']}`}/>
			<input type='text' name='tag'/>
			<textarea name='post' id='' cols="30" rows="10" className={`${styles['input']} ${formValidState.post ? '' : styles['invalid']}`}></textarea>
			<Button text="Сохранить"/>
		</form>
	);
}

export default JournalForm;
