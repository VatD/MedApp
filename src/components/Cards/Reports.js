import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

const Reports = ({ reports }) => {
	return reports.map((report) => {
		const date = new Date(report.updatedAt);
		const parsedDate = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;
		return (
			<Card key={report.id}>
				<CardBody>
					<CardTitle>{parsedDate}</CardTitle>
					<CardText className='font-weight-normal'>{report.description}</CardText>
				</CardBody>
			</Card>
		);
	});
};

export default Reports;
