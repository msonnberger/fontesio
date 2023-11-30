import { env } from '@fontesio/env/server';
import { render as react_email_render } from '@react-email/render';
import { createTransport } from 'nodemailer';
import React from 'react';

// biome-ignore lint/suspicious/noExplicitAny:
interface RenderOptions<Component extends React.ComponentType<any>> {
	template: Component;
	props?: React.ComponentProps<Component>;
	options?: {
		pretty?: boolean;
		plain_text?: boolean;
	};
}

// biome-ignore lint/suspicious/noExplicitAny:
export function render<Component extends React.ComponentType<any>>({
	template,
	props,
	options,
}: RenderOptions<Component>) {
	const element = React.createElement(template, props);
	return react_email_render(element, {
		pretty: options?.pretty,
		plainText: options?.plain_text,
	});
}

export const mailer = createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: env.SMTP_SECURE,
	auth: {
		user: env.SMTP_USERNAME,
		pass: env.SMTP_PASSWORD,
	},
});
