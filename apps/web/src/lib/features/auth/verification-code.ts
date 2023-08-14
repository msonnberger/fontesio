import { db } from '$lib/server/db';
import { email_verification_codes } from '$lib/server/db/schema';
import { resend } from '$lib/server/resend';
import { generate_uuid_v7 } from '$lib/utils/uuid';
import { eq } from 'drizzle-orm';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';

export async function generate_verification_code(user_id: string) {
	const code = generateRandomString(6, '0123456789');

	await db.transaction(async (tx) => {
		await tx.delete(email_verification_codes).where(eq(email_verification_codes.user_id, user_id));

		await tx.insert(email_verification_codes).values({
			id: generate_uuid_v7(),
			code,
			expires: Date.now() + 1000 * 60 * 5, // 5 minutes
			user_id,
		});
	});

	return code;
}

export async function validate_verification_code(user_id: string, code: string) {
	const stored_code = await db.transaction(async (tx) => {
		const [stored_code] = await tx
			.select()
			.from(email_verification_codes)
			.where(eq(email_verification_codes.user_id, user_id));

		if (!stored_code || stored_code.code !== code) {
			throw new Error('Invalid verification code');
		}

		await tx
			.delete(email_verification_codes)
			.where(eq(email_verification_codes.id, stored_code.id));

		return stored_code;
	});

	if (!isWithinExpiration(stored_code.expires)) {
		throw new Error('Verification code is expired');
	}

	return stored_code.user_id;
}

export async function send_verification_code(email: string, code: string) {
	try {
		await resend.emails.send({
			from: 'Fontesio <verify@mail.fontesio.com>',
			to: [email],
			subject: `Fontesio verification code: ${code}`,
			html: email_template.replaceAll('{VERIFICATION_CODE}', code),
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
                <td><p style="background-color:#1e1b4b;border-radius:6px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;line-height:100%;max-width:100%;padding:11px 23px"><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#1e1b4b;border-radius:6px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:8.25px">{VERIFICATION_CODE}</span><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></p></td>
              </tr>
            </tbody>
          </table>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" /><a target="_blank" style="color:#b4becc;text-decoration:none;font-size:14px" href="https://fontesio.com">Fontesio</a>
        </td>
      </tr>
    </table>
  </body>
</html>`;
