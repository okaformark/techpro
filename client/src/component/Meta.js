import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description}></meta>
			<meta name='keyword' content={keywords}></meta>
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to TechPro Shop',
	keywords: 'electronic, iphone',
	description: 'Your one stp shop for electronics',
};
export default Meta;
