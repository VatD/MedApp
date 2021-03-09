import React from 'react';
import { useAuthContext } from '../../context/auth';

import {
	// Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	Container,
	Row,
	Col,
} from 'reactstrap';

import UserHeader from '../../components/Headers/UserHeader.js';

const Profile = () => {
	const { user } = useAuthContext();
	console.log(user);

	//const aboutPresent = user.userObject[0].doctor.about;
	// let about;
	// if (aboutPresent !== "") {
	//   about = <p>{user.userObject[0].doctor.about}</p>;
	// }
	const insPresent = user.userObject[0].doctor.hospital;
	let institute;
	if (insPresent !== '') {
		institute = (
			<div>
				<i className='ni education_hat mr-2' />
				{insPresent}
			</div>
		);
	}
	return (
		<>
			<UserHeader />
			<Container className='mt--7' fluid>
				<Row>
					<Col className='order-xl-2 mb-5 mb-xl-0' xl='4'>
						<Card className='card-profile shadow'>
							<Row className='justify-content-center'>
								<Col className='order-lg-2' lg='3'>
									<div className='card-profile-image'>
										<a
											href='#pablo'
											onClick={(e) => e.preventDefault()}
										>
											<img
												alt='...'
												className='rounded-circle'
												src={
													require('../../assets/img/user-tie-solid.svg')
														.default
												}
											/>
										</a>
									</div>
								</Col>
							</Row>
							<CardHeader className='text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'></CardHeader>
							<CardBody className='pt-0 pt-md-4'>
								<Row>
									<div className='col'>
									</div>
								</Row>
								<div className='text-center mt-6'>
									<h3>
										Dr. {user.userObject[0].doctor.firstName}{' '}
										{user.userObject[0].doctor.lastName}
										<span className='font-weight-light'>
											, {user.userObject[0].doctor.age}
										</span>
									</h3>
									<div className='h5 font-weight-300'>
										<i className='ni location_pin mr-2' />
										{user.userObject[0].doctor.address}
									</div>
									<div className='h5 mt-4'>
										<i className='ni business_briefcase-24 mr-2' />
										{user.userObject[0].doctor.department}
									</div>
									{institute}
									{/* <hr className='my-4' />
									{about}
									<p>
										Ryan — the name taken by Melbourne-raised, Brooklyn-based
										Nick Murphy — writes, performs and records all of his own
										music.
									</p>
									<a href='#pablo' onClick={(e) => e.preventDefault()}>
										Show more
									</a> */}
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col className='order-xl-1' xl='8'>
						<Card className='bg-secondary shadow'>
							<CardHeader className='bg-white border-0' id='profile'>
								<Row className='align-items-center'>
									<Col xs='8'>
										<h3 className='mb-0'>My account</h3>
									</Col>
								</Row>
							</CardHeader>
							<CardBody>
								<Form>
									<h6 className='heading-small text-muted mb-4'>
										User information
									</h6>
									<div className='pl-lg-4'>
										<Row>
											<Col lg='6'>
												<FormGroup>
													<label
														className='form-control-label'
														htmlFor='input-username'
													>
														User Name
													</label>
													<Input
														// className='form-control-alternative'
														// defaultValue={user.username}
														value={user.username}
														id='input-username'
														placeholder='Username'
														type='text'
														disabled
													/>
												</FormGroup>
											</Col>
											<Col lg='6'>
												<FormGroup>
													<label
														className='form-control-label'
														htmlFor='input-email'
													>
														Email address
													</label>
													<Input
														// className='form-control-alternative'
														id='input-email'
														value={
															user.userObject[0].doctor.email
														}
														placeholder='name@example.com'
														type='email'
														disabled
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col lg='6'>
												<FormGroup>
													<label
														className='form-control-label'
														htmlFor='input-first-name'
													>
														First name
													</label>
													<Input
														// className='form-control-alternative'
														// defaultValue='John'
														value={
															user.userObject[0].doctor.firstName
														}
														id='input-first-name'
														placeholder='First name'
														type='text'
														disabled
													/>
												</FormGroup>
											</Col>
											<Col lg='6'>
												<FormGroup>
													<label
														className='form-control-label'
														htmlFor='input-last-name'
													>
														Last name
													</label>
													<Input
														// className='form-control-alternative'
														// defaultValue='Doe'
														value={
															user.userObject[0].doctor.lastName
														}
														id='input-last-name'
														placeholder='Last name'
														type='text'
														disabled
													/>
												</FormGroup>
											</Col>
										</Row>
									</div>
									<hr className='my-4' />
									{/* Address */}
									<h6 className='heading-small text-muted mb-4'>
										Contact information
									</h6>
									<div className='pl-lg-4'>
										<Row>
											<Col md='12'>
												<FormGroup>
													<label
														className='form-control-label'
														htmlFor='input-address'
													>
														Address
													</label>
													<Input
														// className='form-control-alternative'
														// defaultValue='Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09'
														value={
															user.userObject[0].doctor.address
														}
														id='input-address'
														placeholder='Home Address'
														type='text'
														disabled
													/>
												</FormGroup>
											</Col>
										</Row>
										{/* <Row>
											<Col lg='4'>
												<FormGroup>
													<label
														className='form-control-label'
														htmlFor='input-city'
													>
														City
													</label>
													<Input
														// className='form-control-alternative'
														defaultValue='New York'
														id='input-city'
														placeholder='City'
														type='text'
														disabled
													/>
												</FormGroup>
											</Col>
											<Col lg='4'>
												<FormGroup>
													<label
														className='form-control-label'
														htmlFor='input-country'
													>
														Country
													</label>
													<Input
														// className='form-control-alternative'
														defaultValue='United States'
														id='input-country'
														placeholder='Country'
														type='text'
														disabled
													/>
												</FormGroup>
											</Col>
											<Col lg='4'>
												<FormGroup>
													<label
														className='form-control-label'
														htmlFor='input-country'
													>
														Postal code
													</label>
													<Input
														// className='form-control-alternative'
														id='input-postal-code'
														placeholder='Postal code'
														type='number'
														disabled
													/>
												</FormGroup>
											</Col>
										</Row> */}
									</div>
									{/* <hr className='my-4' />
									{/* Description 
									<h6 className='heading-small text-muted mb-4'>About me</h6>
									<div className='pl-lg-4'>
										<FormGroup>
											<label>About Me</label>
											<Input
												className='form-control-alternative'
												placeholder='A few words about you ...'
												rows='4'
												defaultValue='A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source.'
												type='textarea'
												disabled
											/>
										</FormGroup>
									</div> */}
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Profile;
