import React from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import useSWR from 'swr';
import { useAuthContext } from '../../context/auth';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const InfoHeader = () => {
	const { user, fetching } = useAuthContext();
	const loggedIn = !fetching && user;

	const { data: recordNum } = useSWR(
		loggedIn
			? `/records/count?doctor.id=${user.userObject[0].doctor.id}`
			: null,
		fetcher
	);

	const { data: patientNum } = useSWR(
		loggedIn
			? `/patients/count?doctors.id=${user.userObject[0].doctor.id}`
			: null,
		fetcher
	);

	return (
		<>
			<div className='header bg-gradient-info pb-8 pt-5 pt-md-8'>
				<Container fluid>
					<div className='header-body'>
						{/* Card stats */}
						<Row>
							<Col lg='6'>
								<Card className='card-stats mb-4 mb-xl-0'>
									<CardBody>
										<Row>
											<div className='col'>
												<CardTitle
													tag='h5'
													className='text-uppercase text-muted mb-0'
												>
													Patients
												</CardTitle>
												<span className='h2 font-weight-bold mb-0'>
													{patientNum || '-/-'}
												</span>
											</div>
											<Col className='col-auto'>
												<div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
													<i className='fas fa-users' />
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>
							</Col>
							<Col lg='6'>
								<Card className='card-stats mb-4 mb-xl-0'>
									<CardBody>
										<Row>
											<div className='col'>
												<CardTitle
													tag='h5'
													className='text-uppercase text-muted mb-0'
												>
													Reports
												</CardTitle>
												<span className='h2 font-weight-bold mb-0'>
													{recordNum || '-/-'}
												</span>
											</div>
											<Col className='col-auto'>
												<div className='icon icon-shape bg-warning text-white rounded-circle shadow'>
													<i className='fas fa-chart-bar' />
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</>
	);
};

export default InfoHeader;
