import React from 'react';
import {
	Button,
	FormGroup,
	Form,
	Input,
	FormFeedback,
	InputGroup,
	InputGroupText,
	InputGroupAddon,
} from 'reactstrap';
import className from 'classnames';
import { Field } from 'formik';

function LoginForm({ formik }) {
	return (
		<Form role='form' onSubmit={formik.handleSubmit}>
			<FormGroup className='mb-3'>
				<InputGroup className='input-group-alternative'>
					<InputGroupAddon addonType='prepend'>
						<InputGroupText>
							<i className='ni ni-email-83' />
						</InputGroupText>
					</InputGroupAddon>
					<Input
						className={className('form-control pl-3', {
							'is-invalid':
								formik.touched.identifier && formik.errors.identifier,
						})}
						id='identifier'
						autoComplete='identifier'
						placeholder='Email or Username'
						{...formik.getFieldProps('identifier')}
					/>
				</InputGroup>
				{formik.touched.identifier && formik.errors.identifier ? (
					<FormFeedback valid={false} className='d-block'>
						{formik.errors.identifier}
					</FormFeedback>
				) : null}
			</FormGroup>
			<FormGroup>
				<InputGroup className='input-group-alternative'>
					<InputGroupAddon addonType='prepend'>
						<InputGroupText>
							<i className='ni ni-lock-circle-open' />
						</InputGroupText>
					</InputGroupAddon>
					<Input
						className={className('form-control pl-3', {
							'is-invalid': formik.touched.password && formik.errors.password,
						})}
						id='password'
						type='password'
						autoComplete='password'
						placeholder='Password'
						{...formik.getFieldProps('password')}
					/>
				</InputGroup>
				{formik.touched.password && formik.errors.password ? (
					<FormFeedback valid={false} className='d-block'>
						{formik.errors.password}
					</FormFeedback>
				) : null}
			</FormGroup>
			<div className='custom-control custom-control-alternative custom-checkbox'>
				<Field
					id='rememberMe'
					className='custom-control-input'
					type='checkbox'
					name='rememberMe'
				/>
				<label className='custom-control-label' htmlFor='rememberMe'>
					<span className='text-muted'>keep me signed in</span>
				</label>
			</div>
			<div className='text-center'>
				<Button
					disabled={formik.isSubmitting || !formik.isValid}
					className='mt-4'
					color='primary'
					type='submit'
				>
					sign in
				</Button>
			</div>
		</Form>
	);
}

export default LoginForm;
