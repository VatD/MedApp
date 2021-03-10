import React from 'react';
import { Row, Col } from 'reactstrap';
import Reports from '../Cards/Reports';

const PatientInfo = ({ patient }) => {
	return (
		<div className='modal-body'>
			<h2 className='text-uppercase text-muted'>General Information</h2>
			<hr className='mt-1 mb-3' />
			<Row className='my-3'>
				<Col sm={6}>
					<span className='h3 mb-0 text-muted mr-1'>First Name : </span>
					<span className='font-weight-bold'>{patient.firstName}</span>
				</Col>
				<Col sm={6}>
					<span className='h3 mb-0 text-muted mr-1'>Last Name : </span>
					<span className='font-weight-bold'>{patient.lastName}</span>
				</Col>
			</Row>
			<Row className='my-3'>
				<Col sm={6}>
					<span className='h3 mb-0 text-muted mr-1'>DOB : </span>
					<span className='font-weight-bold'>{patient.DOB}</span>
				</Col>
				<Col sm={6}>
					<span className='h3 mb-0 text-muted mr-1'>Sex : </span>
					<span className='font-weight-bold'>{patient.sex}</span>
				</Col>
			</Row>
			<Row className='my-3'>
				<Col sm={6}>
					<span className='h3 mb-0 text-muted mr-1'>Marital Status : </span>
					<span className='font-weight-bold text-capitalize'>
						{patient.maritalStatus}
					</span>
				</Col>
			</Row>
			<Row className='my-3'>
				<Col sm={6}>
					<span className='h3 mb-0 text-muted mr-1'>Height : </span>
					<span className='font-weight-bold'>{patient.height} cms</span>
				</Col>
				<Col sm={6}>
					<span className='h3 mb-0 text-muted mr-1'>Weight : </span>
					<span className='font-weight-bold'>{patient.weight} kgs</span>
				</Col>
			</Row>
			<h2 className='text-uppercase text-muted mt-5'>Contact Information</h2>
			<hr className='mt-1 mb-3' />
			<Row className='my-3'>
				<Col sm={6}>
					<span className='h3 mb-0 text-muted mr-1'>Email : </span>
					<span className='font-weight-bold'>{patient.email}</span>
				</Col>
				<Col sm={6}>
					<span className='h3 mb-0 text-muted mr-1'>Phone Number : </span>
					<span className='font-weight-bold'>{patient.phoneNumber}</span>
				</Col>
			</Row>
			<h2 className='text-uppercase text-muted mt-5'>Medical Information</h2>
			<hr className='mt-1 mb-3' />
			<Row className='my-3'>
				<Col sm={12}>
					<h3 className='mb-0'>Ailments</h3>
					<p className='border font-weight-normal p-3 rounded rounded-3'>
						{patient.ailments}
					</p>
				</Col>
				{patient.recommendations?.length > 0 ? (
					<Col sm={12}>
						<h3 className='mb-1'>Auto Medical Diagnosis</h3>
						{patient.recommendations.map((rec, i) => {
							return (
								<p key={i} className='mb-0 font-weight-normal'>
									{rec}
								</p>
							);
						})}
						<div className='py-2'></div>
					</Col>
				) : null}
				<Col sm={12}>
					<h3 className='mb-0'>Medicines</h3>
					<p className='border font-weight-normal p-3 rounded rounded-3'>
						{patient.medicines}
					</p>
				</Col>
			</Row>
			{patient.reports.length ? (
				<>
					<h2 className='text-uppercase text-muted mt-5'>Reports</h2>
					<hr className='mt-1 mb-3' />
				</>
			) : null}
			<Reports reports={patient.reports} />
		</div>
	);
};

export default PatientInfo;
