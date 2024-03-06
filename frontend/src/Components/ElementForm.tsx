import { json, useNavigate, useParams } from 'react-router-dom';

import { Element } from '../types/element';
import classes from './ElementForm.module.css';
import { useState } from 'react';

interface ElementFormProps {
	method: any;
	elementData?: Element;
	cancelHandler: () => void;
	children?: React.ReactNode;
}

const ElementForm: React.FC<ElementFormProps> = (props) => {
	const [formErrors, setFormErrors] = useState({
		name: '',
		value: '',
		description: '',
	});
	const navigate = useNavigate();
	const params = useParams();

	const validateFormInputs = (FormData: any) => {
		FormData.name === ''
			? setFormErrors((prev) => ({ ...prev, name: 'Name is required!' }))
			: setFormErrors((prev) => ({ ...prev, name: '' }));

		FormData.value === ''
			? setFormErrors((prev) => ({ ...prev, value: 'Value is required!' }))
			: setFormErrors((prev) => ({ ...prev, value: '' }));

		FormData.description === ''
			? setFormErrors((prev) => ({
					...prev,
					description: 'Description is required!',
			  }))
			: setFormErrors((prev) => ({ ...prev, description: '' }));
	};

	const submitHandler = async (event: any) => {
		event.preventDefault();

		const FormData = {
			name: event.target.name.value,
			value: event.target.value.value,
			description: event.target.description.value,
		};

		validateFormInputs(FormData);

		if (
			FormData.name !== '' &&
			FormData.value !== '' &&
			FormData.description !== ''
		) {
			let url = 'http://localhost:8080/elements';
			if (props.method === 'PATCH') {
				const id = params.id;
				url = 'http://localhost:8080/elements/' + id;
			}
			const response = await fetch(url, {
				method: props.method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(FormData),
			});
			const resObj: any = await response.json();

			if (!response.ok) {
				throw json({ message: resObj.message }, { status: resObj.status });
			}
			props.cancelHandler();
			if (props.method === 'POST') {
				console.log(resObj);
				navigate('/elements/' + resObj.element._id);
			} else {
				navigate('/elements/' + params.id);
			}
		}
	};

	return (
		<div className={classes.card_container}>
			<span className={classes.card_close} onClick={props.cancelHandler}>
				X
			</span>
			<p className={classes.paragraph}>Define your element</p>
			<form
				method={props.method}
				className={classes.form}
				onSubmit={submitHandler}
			>
				<p style={{ color: 'orange' }}>{formErrors.name}</p>
				<p>
					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						name='name'
						id='name'
						defaultValue={props.elementData ? props.elementData.name : ''}
					/>
				</p>
				<p style={{ color: 'orange' }}>{formErrors.value}</p>
				<p>
					<label htmlFor='value'>Value:</label>
					<input
						type='text'
						name='value'
						id='value'
						defaultValue={props.elementData ? props.elementData.value : ''}
					/>
				</p>
				<p style={{ color: 'orange' }}>{formErrors.description}</p>
				<p>
					<label htmlFor='description'>Description:</label>
					<textarea
						name='description'
						id='description'
						placeholder='Describe the usage of this element'
						cols={30}
						rows={3}
						defaultValue={
							props.elementData ? props.elementData.description : ''
						}
					/>
				</p>
				<div className={classes.actions}>
					<button type='button' onClick={props.cancelHandler}>
						Cancel
					</button>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default ElementForm;
