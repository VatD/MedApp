import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	Container,
	Row,
	Col,
	Alert,
} from 'reactstrap';

import AddPatientForm from '../../components/Forms/AddPatientForm';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createPatient } from '../../services/patient';
import { useAuthContext } from '../../context/auth';
import { useHistory } from 'react-router';

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

const AddPatient = () => {
	const { token } = useAuthContext();
	const history = useHistory();
	const [error, setError] = useState(null);

	return (
		<>
			<GenericHeader
				title='Add Patient'
				desc='Fill the form details below to add a new patient to records.'
			/>
			<Container className='mt-5'>
				<Row>
					<Col className='order-xl-1' xl='12'>
						<Card className='bg-secondary shadow'>
							<CardHeader className='bg-white border-0'>
								<Row className='align-items-center'>
									<Col xs='12'>
										<h3 className='mb-0'>Patient Details</h3>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Formik
									initialValues={{
										firstName: '',
										lastName: '',
										phoneNumber: '',
										email: '',
										medicines: '',
										ailments: '',
										DOB: '',
										sex: '',
										height: '',
										weight: '',
										maritalStatus: '',
									}}
									validationSchema={Yup.object({
										firstName: Yup.string().required('Required'),
										lastName: Yup.string().required('Required'),
										phoneNumber: Yup.string()
											.length(10, 'Length must be 10')
											.required('Required'),
										email: Yup.string()
											.email('Invalid email address')
											.required('Required'),
										medicines: Yup.string(),
										ailments: Yup.string(),
										DOB: Yup.date().required('Required'),
										sex: Yup.string()
											.oneOf(['M', 'F', 'O'])
											.required('Required'),
										maritalStatus: Yup.string()
											.oneOf(['married', 'single'])
											.required('Required'),
										height: Yup.number().nullable(),
										weight: Yup.number().nullable(),
									})}
									onSubmit={async (values, { setSubmitting, setErrors }) => {
										const newValues = { ...values };
										newValues.height = parseFloat(values.height) || null;
										newValues.weight = parseFloat(values.weight) || null;
										const { data, error } = await createPatient(
											newValues,
											token
										);
										setSubmitting(false);
										if (data) history.replace('/admin/index');
										if (error?.response?.data?.fieldErrors) {
											setErrors(error.response.data.fields);
											setError('Check your input data.');
											return;
										}
										setError('Please try again later.');
									}}
								>
									{(formik) => <AddPatientForm formik={formik} />}
								</Formik>
							</CardBody>
						</Card>
					</Col>
				</Row>
				{error ? (
					<FailureAlert message={error} cb={() => setError(null)} />
				) : null}
			</Container>
		</>
	);
};

export default AddPatient;
