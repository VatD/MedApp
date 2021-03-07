import React from 'react';
import {useAuthContext} from '../../context/auth';
import { Button, Container, Row, Col } from 'reactstrap';

const UserHeader = () => {
	const {user} = useAuthContext();

	return (
		<>
			<div
				className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
				style={{
					minHeight: '600px',
					backgroundImage:
						'url(' +
						require('../../assets/img/theme/ThAOKju.jpg').default +
						')',
					backgroundSize: 'cover',
					backgroundPosition: 'center top',
				}}
			>
				{/* Mask */}
				<span className='mask bg-gradient-default opacity-6' />
				{/* Header container */}
				<Container className='d-flex align-items-center' fluid>
					<Row>
						<Col lg='12'>
							<h1 className='display-1 text-white'>Hello {user.username}</h1>
							<p className='text-white mt-0 mb-5'>
								Welcome doctor! View your profile here.
							</p>
							<Button
								color='info'
								href='#profile'
							>
								<div >View profile</div>
								{/* style="text-decoration: none; color: inherit;" */}
								
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default UserHeader;
