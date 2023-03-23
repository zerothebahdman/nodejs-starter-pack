const PASSWORD_RESET_EMAIL = (fullName: string, otp: string) => `
	  <div style="background-color: #f5f5f5; padding: 20px;">
	  			<div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
		  <div style="text-align: center;">
			<img src="https://res.cloudinary.com/ezecodes/image/upload/v1624788065/logo_ezecodes.png" alt="EzeCodes Logo" width="200" height="200" />
		  </div>
		  <p style="font-size: 16px; font-family: sans-serif; color: #333;">Hi ${fullName},</p>
		  <p style="font-size: 16px; font-family: sans-serif; color: #333;">Your OTP for password reset is <b>${otp}</b></p>
		  <p style="font-size: 16px; font-family: sans-serif; color: #333;">If you did not request for password reset, please ignore this email.</p>
		  <p style="font-size: 16px; font-family: sans-serif; color: #333;">Regards,</p>
		  <p style="font-size: 16px; font-family: sans-serif; color: #333;">EzeCodes Team.</p>
		</div>
	  </div>
`;

export default PASSWORD_RESET_EMAIL;
