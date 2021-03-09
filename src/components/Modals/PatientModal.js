import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'reactstrap';
import PatientInfo from '../Views/PatientInfo';
import getAge from '../../utils/getAge';

const PatientModal = ({ open, toggler, patient }) => {
	return (
		<Modal
			className='modal-dialog-centered'
			toggle={toggler}
			isOpen={open}
			centered={true}
			trapFocus={true}
			size='lg'
		>
			<div className='modal-header align-items-center'>
				<h1 className='modal-title' id='modal-title-default'>
					{`${patient.firstName} ${patient.lastName}`}
					<span className='text-muted'>, {getAge(patient.DOB)}</span>
				</h1>
				<div>
					<Button
						className='ml-4'
						color='primary'
						size='md'
						tag={Link}
						to={`/connect/doctor/${patient.id}`}
					>
						<i className='fas fa-video mr-2' />
						Start Session
					</Button>
				</div>
				<button
					aria-label='Close'
					className='close'
					data-dismiss='modal'
					type='button'
					onClick={toggler}
				>
					<span aria-hidden={true}>×</span>
				</button>
			</div>
			<PatientInfo patient={patient} />
			<div className='modal-footer'>
				<Button
					color='primary'
					size='md'
					tag={Link}
					to={`/connect/doctor/${patient.id}`}
				>
					<i className='fas fa-video mr-2' />
					Start Session
				</Button>
				<Button
					className='ml-auto'
					color='link'
					data-dismiss='modal'
					type='button'
					onClick={toggler}
				>
					Close
				</Button>
			</div>
		</Modal>
	);
};

export default PatientModal;
