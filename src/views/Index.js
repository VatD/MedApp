import React, { useEffect } from 'react';
// import classnames from 'classnames';
// import Chart from 'chart.js';
// import { Line, Bar } from 'react-chartjs-2';
import {
	Button,
	Card,
	CardHeader,
	// CardBody,
	// NavItem,
	// NavLink,
	// Nav,
	// Progress,
	Table,
	Container,
	Row,
	Col,
} from 'reactstrap';
// import {
// 	chartOptions,
// 	parseOptions,
// 	chartExample1,
// 	chartExample2,
// } from '../variables/charts.js';
import Header from '../components/Headers/InfoHeader';
import { useAuthContext } from '../context/auth';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const patientFetcher = (url) => axios.get(url).then((res) => res.data);

const Index = (props) => {
	// const [activeNav, setActiveNav] = useState(1);
	// const [chartExample1Data, setChartExample1Data] = useState('data1');

	// if (window.Chart) {
	// 	parseOptions(Chart, chartOptions());
	// }

	// const toggleNavs = (e, index) => {
	// 	e.preventDefault();
	// 	setActiveNav(index);
	// 	setChartExample1Data('data' + index);
	// };

	const { user, fetching } = useAuthContext();
	const loggedIn = !fetching && user;

	const { data: patients, error: patientsError } = useSWR(
		loggedIn ? `/patients?doctors.id=${user.userObject[0].doctor.id}` : null,
		patientFetcher
	);

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

	return (
		<>
			<ToastContainer />
			<Header />
			{/* Page content */}
			<Container className='mt--7' fluid>
				{/* <Row>
					<Col className='mb-5 mb-xl-0' xl='8'>
						<Card className='bg-gradient-default shadow'>
							<CardHeader className='bg-transparent'>
								<Row className='align-items-center'>
									<div className='col'>
										<h6 className='text-uppercase text-light ls-1 mb-1'>
											Overview
										</h6>
										<h2 className='text-white mb-0'>Sales value</h2>
									</div>
									<div className='col'>
										<Nav className='justify-content-end' pills>
											<NavItem>
												<NavLink
													className={classnames('py-2 px-3', {
														active: activeNav === 1,
													})}
													href='#pablo'
													onClick={(e) => toggleNavs(e, 1)}
												>
													<span className='d-none d-md-block'>Month</span>
													<span className='d-md-none'>M</span>
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													className={classnames('py-2 px-3', {
														active: activeNav === 2,
													})}
													data-toggle='tab'
													href='#pablo'
													onClick={(e) => toggleNavs(e, 2)}
												>
													<span className='d-none d-md-block'>Week</span>
													<span className='d-md-none'>W</span>
												</NavLink>
											</NavItem>
										</Nav>
									</div>
								</Row>
							</CardHeader>
							<CardBody>
								<div className='chart'>
									<Line
										data={chartExample1[chartExample1Data]}
										options={chartExample1.options}
										getDatasetAtEvent={(e) => console.log(e)}
									/>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl='4'>
						<Card className='shadow'>
							<CardHeader className='bg-transparent'>
								<Row className='align-items-center'>
									<div className='col'>
										<h6 className='text-uppercase text-muted ls-1 mb-1'>
											Performance
										</h6>
										<h2 className='mb-0'>Total orders</h2>
									</div>
								</Row>
							</CardHeader>
							<CardBody>
								<div className='chart'>
									<Bar
										data={chartExample2.data}
										options={chartExample2.options}
									/>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row> */}
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
									{patients
										? patients.map((patient, key) => {
												return (
													<tr key={key}>
														<td>
															<Button
																color='primary'
																size='sm'
																onClick={() => console.log(key)}
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
														<td><Skeleton /></td>
														<td><Skeleton /></td>
														<td><Skeleton /></td>
														<td><Skeleton /></td>
														<td><Skeleton /></td>
													</tr>
												);
										  })}
								</tbody>
							</Table>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Index;
