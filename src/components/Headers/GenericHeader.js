import React from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

const GenericHeader = ({ title, desc }) => {
	return (
		<>
			<div className='header bg-gradient-info pb-5 pt-5 d-none d-md-block'>
				<Container fluid>
					<div className='header-body'>
						<Row>
							<Col lg='12'>
								<h1 className='display-1 text-white'>{title}</h1>
								<p className='text-white mt-0 mb-2'>{desc}</p>
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</>
	);
};

export default GenericHeader;
