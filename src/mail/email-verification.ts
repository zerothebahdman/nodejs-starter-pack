const EMAIL_VERIFICATION = (name: string, code: string) =>
  `<!DOCTYPE html>
<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width,initial-scale=1" name="viewport" />
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
        * {
            box-sizing: border-box
        }

        body {
            margin: 0;
            padding: 0
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0;
            overflow: hidden
        }

        @media (max-width:520px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important
            }

            .icons-inner {
                text-align: center
            }

            .icons-inner td {
                margin: 0 auto
            }

            .row-content {
                width: 100% !important
            }

            .mobile_hide {
                display: none
            }

            .stack .column {
                width: 100%;
                display: block
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important
            }

            .row-1 .column-1 .block-5.paragraph_block td.pad {
                padding: 20px 30px 20px 25px !important
            }

            .row-1 .column-1 .block-1.image_block td.pad {
                padding: 30px 0 0 !important
            }

            .row-1 .column-1 .block-7.paragraph_block td.pad {
                padding: 20px 30px 25px 25px !important
            }

            .row-1 .column-1 .block-8.paragraph_block td.pad {
                padding: 10px 30px 10px 25px !important
            }
        }
    </style>
</head>

<body style="background-color:#fff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
        style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:500px"
                                        width="500">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="100%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="image_block block-1" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="width:100%;padding-right:0;padding-left:0">
                                                                <div align="center" class="alignment"
                                                                    style="line-height:10px"><img
                                                                        src="https://res.cloudinary.com/dyhmtsvfz/image/upload/v1656576343/KOOPAY%20logo/Gradient_Name_2x_loef9k.png"
                                                                        style="display:block;height:auto;border:0;width:100px;max-width:100%"
                                                                        width="100" /></div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="divider_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px">
                                                                <div align="center" class="alignment">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0;mso-table-rspace:0"
                                                                        width="65%">
                                                                        <tr>
                                                                            <td class="divider_inner"
                                                                                style="font-size:1px;line-height:1px;border-top:1px solid #bbb">
                                                                                <span> </span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="image_block block-3" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="width:100%;padding-right:0;padding-left:0">
                                                                <div align="center" class="alignment"
                                                                    style="line-height:10px"><img
                                                                        src="https://res.cloudinary.com/dyhmtsvfz/image/upload/v1659008738/KOOPAY%20logo/Password_Monochromatic_r3ddze.png"
                                                                        style="display:block;height:auto;border:0;width:200px;max-width:100%"
                                                                        width="200" /></div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="heading_block block-4" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="width:100%;text-align:center;padding-right:45px;padding-left:45px">
                                                                <h1
                                                                    style="margin:0;color:#282828;font-size:25px;font-family:Montserrat,'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;line-height:200%;text-align:center;direction:ltr;font-weight:700;letter-spacing:normal;margin-top:0;margin-bottom:0">
                                                                    <strong><span class="tinyMce-placeholder">Email
                                                                            Verification</span></strong></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-5" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-top:20px;padding-right:40px;padding-bottom:20px;padding-left:40px">
                                                                <div
                                                                    style="color:#000;font-size:15px;font-family:Montserrat,'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;font-weight:400;line-height:150%;text-align:left;direction:ltr;letter-spacing:0;mso-line-height-alt:22.5px">
                                                                    <p style="margin:0">
                                                                        Hey ${name}, use this OTP verification code
                                                                        below to complete your registration on
                                                                        <strong>KOOPAY.</strong></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="paragraph_block block-6" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#000;font-size:30px;font-family:Montserrat,'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;font-weight:400;line-height:120%;text-align:center;direction:ltr;letter-spacing:0;mso-line-height-alt:36px">
                                                                    <p style="margin:0"><strong>${code}</strong></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-7" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-top:20px;padding-right:45px;padding-bottom:25px;padding-left:45px">
                                                                <div
                                                                    style="color:#000;font-size:14px;font-family:Montserrat,'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;mso-line-height-alt:16.8px">
                                                                    <p style="margin:0">
                                                                        If you didn’t make this request you can ignore
                                                                        this email or let us know</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-8" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-top:10px;padding-right:45px;padding-bottom:10px;padding-left:45px">
                                                                <div
                                                                    style="color:#000;font-size:14px;font-family:Montserrat,'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;font-weight:400;line-height:150%;text-align:left;direction:ltr;letter-spacing:0;mso-line-height-alt:21px">
                                                                    <p style="margin:0">Warm regards <br />KOOPAY Team
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-9" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-top:35px;padding-right:15px;padding-bottom:10px;padding-left:15px">
                                                                <div
                                                                    style="color:#7d7d7d;font-size:14px;font-family:Montserrat,'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;mso-line-height-alt:16.8px">
                                                                    <p style="margin:0">
                                                                        © ${new Date().getFullYear()} <strong>KOOPAY</strong>.
                                                                        All Rights Reserved.</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><!-- End -->
</body>

</html>`;

export default EMAIL_VERIFICATION;
