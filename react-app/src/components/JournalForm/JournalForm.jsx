import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer} from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
	const [formState, dispathForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			timerId = setTimeout(() => {
				console.log('Очистка формы');
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
	}, [isFormReadyToSubmit]);

	const onChange = (e) => {
		dispathForm({ type: 'SET_VALUE', payload: {[e.target.name]:[e.target.value]}});
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
				<input type='title'onChange={onChange} value={values.title} name='title'  className={cn(styles['input-title'],{
					[styles['invalid']] : !isValid.title
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-labels']}>
					<img src="/calendar1.png" alt="Иконка календарь" />
					<span>Дата</span>
				</label>
				<input type='date'onChange={onChange} name='date' id='date' value={values.date} className={cn(styles['input'],{
					[styles['invalid']] : !isValid.date
				})}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-labels']}>
					<img src="/folder1.png" alt="Иконка папки" />
					<span>Метки</span>
				</label>
				<input type='text'onChange={onChange} name='tag' value={values.text} id='tag' className={styles['input']}/>
			</div>
			<textarea name='post'onChange={onChange} value={values.post} id='' cols="30" rows="10" className={cn(styles['input'],{
				[styles['invalid']] : !isValid.post
			})}></textarea>
			<Button text="Сохранить"/>
		</form>
	);
}

export default JournalForm;
