import { db } from '$lib/server/db';
import { email_verification_tokens } from '$lib/server/db/schema';
import { resend } from '$lib/server/resend';
import { WEBAPP_URL } from '$lib/utils/constants';
import { eq } from 'drizzle-orm';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export async function generate_verification_token(user_id: string) {
	const stored_user_tokens = await db
		.select()
		.from(email_verification_tokens)
		.where(eq(email_verification_tokens.user_id, user_id));

	if (stored_user_tokens.length > 0) {
		const reusable_stored_token = stored_user_tokens.find((token) =>
			isWithinExpiration(token.expires - EXPIRES_IN / 2),
		);

		if (reusable_stored_token) {
			return reusable_stored_token.id;
		}
	}

	const token = generateRandomString(64);
	await db.insert(email_verification_tokens).values({
		id: token,
		expires: Date.now() + EXPIRES_IN,
		user_id,
	});

	return token;
}

export async function validate_verification_token(token: string) {
	const stored_token = await db.transaction(async (tx) => {
		const [stored_token] = await tx
			.select()
			.from(email_verification_tokens)
			.where(eq(email_verification_tokens.id, token));

		if (!stored_token) {
			throw new Error('Invalid token');
		}

		await tx
			.delete(email_verification_tokens)
			.where(eq(email_verification_tokens.user_id, stored_token.user_id));

		return stored_token;
	});

	if (!isWithinExpiration(stored_token.expires)) {
		throw new Error('Token is expired');
	}

	return stored_token.user_id;
}

export async function send_verification_link(email: string, token: string) {
	try {
		const verification_link = `${WEBAPP_URL}/signup/verify-email/${token}`;
		await resend.emails.send({
			from: 'Fontesio <verify@mail.fontesio.com>',
			to: [email],
			subject: 'Please verify your email address',
			html: email_template.replaceAll('{VERIFICATION_LINK}', verification_link),
		});
	} catch {
		throw Error('Failed to send verification email');
	}
}

const email_template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">
  <head></head>
  <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:560px">
      <tr style="width:100%">
        <td>
          <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Welcome to Fontesio!</h1>
          <table style="padding:27px 0 27px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
            <tbody>
              <tr>
                <td><a href="{VERIFICATION_LINK}" target="_blank" style="background-color:#1e1b4b;border-radius:6px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;line-height:100%;max-width:100%;padding:11px 23px"><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#1e1b4b;border-radius:6px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:8.25px">Verify email</span><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">If you don't like clicking buttons, you can use the verification link directly: </p><a href="{VERIFICATION_LINK}">{VERIFICATION_LINK}</a>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" /><a target="_blank" style="color:#b4becc;text-decoration:none;font-size:14px" href="https://fontesio.com">Fontesio</a>
        </td>
      </tr>
    </table>
  </body>
</html>`;
