import React, { useEffect, useState } from 'react';
import {
	Button,
	Card,
	CardHeader,
	Table,
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
} from 'reactstrap';
import Header from '../components/Headers/InfoHeader';
import { useAuthContext } from '../context/auth';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PatientModal from '../components/Modals/PatientModal';

const patientFetcher = (url) => axios.get(url).then((res) => res.data);

const Index = (props) => {
	const { user, fetching } = useAuthContext();
	const loggedIn = !fetching && user;

	const { data: patients, error: patientsError } = useSWR(
		loggedIn ? `/patients?doctors.id=${user.userObject[0].doctor.id}` : null,
		patientFetcher
	);

	let patientsToShow = patients;

	const [modalState, setModalState] = useState({
		open: false,
		patientId: null,
	});

	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		if (patientsError)
			toast.error('Error in fetching patients!', {
				position: 'top-right',
				autoClose: 2500,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: false,
			});
	}, [patientsError]);

	if (patients) {
		patientsToShow = patients.filter((patient) => {
			return (
				`${patient.firstName} ${patient.lastName}`
					.toLowerCase()
					.includes(searchInput.toLowerCase()) ||
				patient.email.toLowerCase().includes(searchInput.toLowerCase())
			);
		});
	}

	return (
		<>
			<ToastContainer />
			<Header />
			{/* Page content */}
			<Container className='mt-5' fluid>
				<Form
					autoCorrect='off'
					className='form-inline navbar-search navbar-search'
				>
					<FormGroup className='mb-0 ml-auto'>
						<InputGroup className='input-group-alternative'>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>
									<i className='fas fa-search' />
								</InputGroupText>
							</InputGroupAddon>
							<Input
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								placeholder='Search Your Patients'
								type='text'
							/>
						</InputGroup>
					</FormGroup>
				</Form>
				<Row className='my-5'>
					<Col xl='12'>
						<Card className='shadow'>
							<CardHeader className='border-0'>
								<Row className='align-items-center'>
									<div className='col'>
										<h3 className='mb-0'>Your Patients</h3>
									</div>
									{/* <div className='col text-right'>
										<Button
											color='primary'
											href='#pablo'
											onClick={(e) => e.preventDefault()}
											size='sm'
										>
											See all
										</Button>
									</div> */}
								</Row>
							</CardHeader>
							<Table className='align-items-center table-flush' responsive>
								<thead className='thead-light'>
									<tr>
										<th scope='col'>Profile</th>
										<th scope='col'>Name</th>
										<th scope='col'>Email</th>
										<th scope='col'>Number</th>
										<th scope='col'>Reports</th>
									</tr>
								</thead>
								<tbody>
									{patientsToShow
										? patientsToShow.map((patient, key) => {
												return (
													<tr key={key}>
														<td>
															<Button
																color='primary'
																size='sm'
																onClick={() =>
																	setModalState({ open: true, patientId: key })
																}
															>
																View
															</Button>
														</td>
														<th scope='row'>{`${patient.firstName} ${patient.lastName}`}</th>
														<td>{patient.email}</td>
														<td>{patient.phoneNumber}</td>
														<td>
															<span className='pl-2'>
																{patient.reports.length}
															</span>
														</td>
													</tr>
												);
										  })
										: [...Array(5)].map((key) => {
												return (
													<tr key={key}>
														<td>
															<Skeleton />
														</td>
														<td>
															<Skeleton />
														</td>
														<td>
															<Skeleton />
														</td>
														<td>
															<Skeleton />
														</td>
														<td>
															<Skeleton />
														</td>
													</tr>
												);
										  })}
								</tbody>
							</Table>
						</Card>
					</Col>
				</Row>
			</Container>
			<PatientModal
				open={modalState.open}
				patient={
					modalState.patientId !== null
						? patientsToShow[modalState.patientId]
						: {}
				}
				toggler={() =>
					setModalState((prevState) => {
						return { ...prevState, open: false };
					})
				}
			/>
		</>
	);
};

export default Index;
