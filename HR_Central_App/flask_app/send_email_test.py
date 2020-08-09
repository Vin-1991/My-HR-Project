import sendgrid
import os
from sendgrid.helpers.mail import *
import HR_Central_App.flask_app.email_config as email_config

#Access Email API key
sg = sendgrid.SendGridAPIClient(email_config.send_grid_api_key)


USER = '''
    <h5>Dear {username},</h5>

    <div>Your shift allowance <strong> {shiftId} </strong> for the period <strong>{period}</strong>
    is <strong>{status}</strong> with your <strong>{approver} - {manager}</strong>.</div>

    <h5>Regards,</h5>
    <h5>HR Team</h5>
    '''

Manager = '''
    <h4>Dear {username},</h4>\n

    Your shift allowance <strong> {shiftId} </strong> for the period <strong>{period}</strong>
    is <strong>{status}</strong> by your <strong>{approver}-{manager}</strong> and sent to <strong>HR - {hr}</strong> for next approval.

    <h5>Regards,</h5>
    <h5>HR Team</h5>
    
    '''

HR = '''
    <h4>Dear {username},</h4>\n

    Your shift allowance <strong> {shiftId} </strong> for the period <strong>{period}</strong> is
    <strong>{status}</strong> by your <strong>{approver} - {hr}</strong> & it will be processed 
    with the salary as per the Shift Allowance Policy.
    
    <h5>Regards,</h5>
    <h5>HR Team</h5>
    
    '''

def createEmailTemplate():
    multiline_string = USER
    return multiline_string

def sendEmail():
    content = createEmailTemplate()
    from_email = Email("vinayaggarwal5204@gmail.com")
    to_email = To("vinay.aggarwal@kpmg.co.uk")


    subject = 'New Shift Allowance has raised - {shiftId}'
    content = Content('text/html',content.format(shiftId=12345, username="Vin",period='July-Aug-20', status="pending",approver = "PM",manager="Joe"))

    mail = Mail(from_email, to_email, subject, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    print(response.status_code)
    print(response.body)
    print(response.headers)

sendEmail()

