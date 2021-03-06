import React, { useState } from 'react';
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	Container,
	Row,
	Col,
	FormFeedback,
	InputGroup,
	InputGroupText,
} from 'reactstrap';
import className from 'classnames';
import DatePicker from 'reactstrap-date-picker';

function AddPatientForm({ formik }) {
	return (
		<Form onSubmit={formik.handleSubmit}>
			<h6 className='heading-small text-muted mb-4'>General Information</h6>
			<div className='pl-lg-4'>
				<Row>
					<Col lg='6'>
						<FormGroup>
							<label className='form-control-label' htmlFor='firstName'>
								First Name *
							</label>
							<Input
								className={className('form-control', {
									'is-invalid':
										formik.touched.firstName && formik.errors.firstName,
								})}
								id='fistName'
								type='text'
								{...formik.getFieldProps('firstName')}
							/>
							{formik.touched.firstName && formik.errors.firstName ? (
								<FormFeedback valid={false} className='d-block'>
									{formik.errors.firstName}
								</FormFeedback>
							) : null}
						</FormGroup>
					</Col>
					<Col lg='6'>
						<FormGroup>
							<label className='form-control-label' htmlFor='lastName'>
								Last Name *
							</label>
							<Input
								className={className('form-control', {
									'is-invalid':
										formik.touched.lastName && formik.errors.lastName,
								})}
								id='lastName'
								type='text'
								{...formik.getFieldProps('lastName')}
							/>
							{formik.touched.lastName && formik.errors.lastName ? (
								<FormFeedback valid={false} className='d-block'>
									{formik.errors.lastName}
								</FormFeedback>
							) : null}
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col lg='4'>
						<FormGroup>
							<label className='form-control-label' htmlFor='DOB'>
								DOB *
							</label>
							<div
								onBlurCapture={() => formik.setFieldTouched('DOB', true, true)}
							>
								<DatePicker
									className={className('form-control', {
										'is-invalid': formik.touched.DOB && formik.errors.DOB,
									})}
									name='DOB'
									id='DOB'
									dateFormat='DD-MM-YYYY'
									invalid={formik.touched.DOB && formik.errors.DOB}
									value={formik.values.DOB}
									autoFocus={false}
									onChange={(value, formattedValue) => {
										formik.setFieldValue('DOB', value);
									}}
								/>
							</div>
							{formik.errors.DOB && formik.touched.DOB ? (
								<FormFeedback valid={false} className='d-block'>
									{formik.errors.DOB}
								</FormFeedback>
							) : null}
						</FormGroup>
					</Col>
					<Col lg={4}>
						<FormGroup>
							<label className='form-control-label' htmlFor='sex'>
								Sex *
							</label>
							<Input
								className={className('form-control', {
									'is-invalid': formik.touched.sex && formik.errors.sex,
								})}
								id='sex'
								type='select'
								{...formik.getFieldProps('sex')}
							>
								<option label=' '></option>
								<option value='M'>Male</option>
								<option value='F'>Female</option>
								<option value='O'>Other</option>
							</Input>
							{formik.touched.sex && formik.errors.sex ? (
								<FormFeedback valid={false} className='d-block'>
									{formik.errors.sex}
								</FormFeedback>
							) : null}
						</FormGroup>
					</Col>
					<Col lg={4}>
						<FormGroup>
							<label className='form-control-label' htmlFor='maritalStatus'>
								Marital Status *
							</label>
							<Input
								className={className('form-control', {
									'is-invalid':
										formik.touched.maritalStatus && formik.errors.maritalStatus,
								})}
								id='maritalStatus'
								type='select'
								{...formik.getFieldProps('maritalStatus')}
							>
								<option label=' '></option>
								<option value='single'>Single</option>
								<option value='married'>Married</option>
							</Input>
							{formik.touched.maritalStatus && formik.errors.maritalStatus ? (
								<FormFeedback valid={false} className='d-block'>
									{formik.errors.maritalStatus}
								</FormFeedback>
							) : null}
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col lg='6'>
						<FormGroup>
							<label className='form-control-label' htmlFor='height'>
								Height
							</label>
							<InputGroup>
								<Input
									className={className('form-control', {
										'is-invalid': formik.touched.height && formik.errors.height,
									})}
									id='height'
									type='number'
									{...formik.getFieldProps('height')}
								/>
								<InputGroupText>mts</InputGroupText>
							</InputGroup>
							{formik.touched.height && formik.errors.height ? (
								<FormFeedback valid={false} className='d-block'>
									{formik.errors.height}
								</FormFeedback>
							) : null}
						</FormGroup>
					</Col>
					<Col lg='6'>
						<FormGroup>
							<label className='form-control-label' htmlFor='weight'>
								Weight
							</label>
							<InputGroup>
								<Input
									className={className('form-control', {
										'is-invalid': formik.touched.weight && formik.errors.weight,
									})}
									id='weight'
									type='number'
									{...formik.getFieldProps('weight')}
								/>
								<InputGroupText>kgs</InputGroupText>
							</InputGroup>
							{formik.touched.weight && formik.errors.weight ? (
								<FormFeedback valid={false} className='d-block'>
									{formik.errors.weight}
								</FormFeedback>
							) : null}
						</FormGroup>
					</Col>
				</Row>
			</div>
			<hr className='my-4' />
			<h6 className='heading-small text-muted mb-4'>Contact information</h6>
			<div className='pl-lg-4'>
				<Row>
					<Col lg='6'>
						<FormGroup>
							<label className='form-control-label' htmlFor='email'>
								Email *
							</label>
							<Input
								className={className('form-control', {
									'is-invalid': formik.touched.email && formik.errors.email,
								})}
								id='email'
								type='email'
								{...formik.getFieldProps('email')}
							/>
							{formik.touched.email && formik.errors.email ? (
								<FormFeedback valid={false} className='d-block'>
									{formik.errors.email}
								</FormFeedback>
							) : null}
						</FormGroup>
					</Col>
					<Col lg='6'>
						<FormGroup>
							<label className='form-control-label' htmlFor='phoneNumber'>
								Phone Number *
							</label>
							<Input
								className={className('form-control', {
									'is-invalid':
										formik.touched.phoneNumber && formik.errors.phoneNumber,
								})}
								id='phoneNumber'
								type='text'
								{...formik.getFieldProps('phoneNumber')}
							/>
							{formik.touched.phoneNumber && formik.errors.phoneNumber ? (
								<FormFeedback valid={false} className='d-block'>
									{formik.errors.phoneNumber}
								</FormFeedback>
							) : null}
						</FormGroup>
					</Col>
				</Row>
			</div>
			<hr className='my-4' />
			<h6 className='heading-small text-muted mb-4'>Medical Information</h6>
			<div className='pl-lg-4'>
				<FormGroup>
					<label htmlFor='ailments' className='form-control-label'>
						Ailments
					</label>
					<Input
						id='ailments'
						className={className('form-control', {
							'is-invalid': formik.touched.ailments && formik.errors.ailments,
						})}
						placeholder='Medical User History of Patient'
						rows='5'
						type='textarea'
						{...formik.getFieldProps('ailments')}
					/>
					{formik.touched.ailments && formik.errors.ailments ? (
						<FormFeedback valid={false} className='d-block'>
							{formik.errors.ailments}
						</FormFeedback>
					) : null}
				</FormGroup>
			</div>
			<div className='pl-lg-4'>
				<FormGroup>
					<label htmlFor='medicines' className='form-control-label'>
						Medicines
					</label>
					<Input
						id='medicines'
						className={className('form-control', {
							'is-invalid': formik.touched.medicines && formik.errors.medicines,
						})}
						placeholder='Suggest Medicines'
						rows='5'
						type='textarea'
						{...formik.getFieldProps('medicines')}
					/>
					{formik.touched.medicines && formik.errors.medicines ? (
						<FormFeedback valid={false} className='d-block'>
							{formik.errors.medicines}
						</FormFeedback>
					) : null}
				</FormGroup>
			</div>
			<Button
				disabled={formik.isSubmitting || !formik.isValid}
				color='primary'
				type='submit'
				className='mt-3'
				size='md'
			>
				Save
			</Button>
		</Form>
	);
}

export default AddPatientForm;
