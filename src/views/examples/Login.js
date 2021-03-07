import React from 'react';

import { Card, CardBody, Col, Alert } from 'reactstrap';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';

import LoginForm from '../../components/Forms/Login';
import { useMutateAuthContext } from '../../context/auth';
import { login } from '../../services/user';

const FailureAlert = ({ message, cb }) => {
	return (
		<Alert onClick={cb} className='mt-3' color='danger' fade={false}>
			<span className='alert-inner--icon'>
				<i className='fas fa-times' />
			</span>{' '}
			<span className='alert-inner--text'>
				<strong>Error!</strong> {message}
			</span>
		</Alert>
	);
};

const Login = () => {
	const history = useHistory();
	const [error, setError] = React.useState(null);
	const { updateAuthState, setRememberMe } = useMutateAuthContext();

	return (
		<>
			<Col lg='5' md='7'>
				<Card className='bg-secondary mt-3 shadow border-0'>
					{/* <CardHeader className='bg-transparent pb-5'>
						<div className='text-muted text-center mt-2 mb-3'>
							<small>Sign in with</small>
						</div>
						<div className='btn-wrapper text-center'>
							<Button
								className='btn-neutral btn-icon'
								color='default'
								href='#pablo'
								onClick={(e) => e.preventDefault()}
							>
								<span className='btn-inner--icon'>
									<img
										alt='...'
										src={
											require('../../assets/img/icons/common/github.svg')
												.default
										}
									/>
								</span>
								<span className='btn-inner--text'>Github</span>
							</Button>
							<Button
								className='btn-neutral btn-icon'
								color='default'
								href='#pablo'
								onClick={(e) => e.preventDefault()}
							>
								<span className='btn-inner--icon'>
									<img
										alt='...'
										src={
											require('../../assets/img/icons/common/google.svg')
												.default
										}
									/>
								</span>
								<span className='btn-inner--text'>Google</span>
							</Button>
						</div>
					</CardHeader> */}
					<CardBody className='px-lg-5 py-lg-5'>
						<h2 className='text-center text-muted mb-4'>sign in</h2>
						<Formik
							initialValues={{
								password: '',
								identifier: '',
								rememberMe: true,
							}}
							validationSchema={Yup.object({
								identifier: Yup.string()
									.min(3, 'Length must be atleast 3')
									.required('Required'),
								password: Yup.string()
									.min(6, 'Length must be atleast 6')
									.required('Required'),
								rememberMe: Yup.bool().required('Required'),
							})}
							onSubmit={async (values, { setSubmitting }) => {
								setRememberMe(values.rememberMe);
								const { user, error } = await login({
									identifier: values.identifier,
									password: values.password,
								});
								setSubmitting(false);
								if (user) {
									updateAuthState(
										{ user: user.user, token: user.jwt },
										values.rememberMe
									);
									history.replace('/admin/index');
									return;
								}
								if (error) {
									if (
										error.response?.data?.data[0]?.messages[0]?.id ===
										'Auth.form.error.invalid'
									) {
										setError('invalid identifier or password');
										return;
									}
									setError('internal server error');
								}
							}}
						>
							{(formik) => <LoginForm formik={formik} />}
						</Formik>
					</CardBody>
				</Card>
				{error ? (
					<FailureAlert
						message={error}
						cb={() => {
							setError(null);
						}}
					/>
				) : null}
				{/* <Row className='mt-3'>
					<Col xs='6'>
						<a
							className='text-light'
							href='#pablo'
							onClick={(e) => e.preventDefault()}
						>
							<small>Forgot password?</small>
						</a>
					</Col>
					<Col className='text-right' xs='6'>
						<a
							className='text-light'
							href='#pablo'
							onClick={(e) => e.preventDefault()}
						>
							<small>Create new account</small>
						</a>
					</Col>
				</Row> */}
			</Col>
		</>
	);
};

export default Login;
