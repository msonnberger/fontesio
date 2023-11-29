import { env } from '@fontesio/env/client';
import React from 'react';
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Text,
	Hr,
} from '@react-email/components';

const logo = {
	width: 42,
	height: 42,
};

const body = {
	backgroundColor: '#fff',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
	width: '560px',
};

const heading = {
	fontSize: '24px',
	lineHeight: '1.3',
	fontWeight: '400',
	color: '#030712',
	padding: '17px 0 0',
};

const paragraph = {
	margin: '15px 0',
	fontSize: '15px',
	lineHeight: '1.4',
	color: '#3c4149',
};

const reportLink = {
	fontSize: '14px',
	color: '#b4becc',
};

const hr = {
	borderColor: '#dfe1e4',
	margin: '42px 0 26px',
};

const code = {
	fontFamily: 'monospace',
	fontWeight: '700',
	padding: '6px 12px',
	backgroundColor: '#dfe1e4',
	letterSpacing: '0.3px',
	fontSize: '21px',
	borderRadius: '4px',
	color: '#3c4149',
	display: 'inline-block',
	margin: '20px 0',
};

interface VerifyEmailProps {
	verification_code: string;
}

export default function VerifyEmailTemplate({ verification_code }: VerifyEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Your verification code for Fontesio</Preview>
			<Body style={body}>
				<Container style={container}>
					<Img
						src={`${env.PUBLIC_WEBAPP_URL}/static/logo-icon.png`}
						width="42"
						height="42"
						alt="Fontesio Logo"
						style={logo}
					/>
					<Heading style={heading}>Your verification code for Fontesio</Heading>
					<code style={code}>{verification_code}</code>
					<Text style={paragraph}>
						Enter this code to complete your sign up with Fontesio. The code will only be valid for
						the next 5 minutes.
					</Text>
					<Hr style={hr} />
					<Link href="https://fontesio.com" style={reportLink}>
						Fontesio
					</Link>
				</Container>
			</Body>
		</Html>
	);
}
