import sendgrid
import os
from sendgrid.helpers.mail import *
import csv
import pyodbc
import json
import collections
import base64
import glob
import time
import datetime

#Access Email API key
send_grid_api_key = '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'
sg = sendgrid.SendGridAPIClient(send_grid_api_key)

csv_file_path = 'C:/Users/vinayaggarwal/source/repos/HR_Central/HR_Central_App/csvfiles/'
csv_file_name = 'Shift_Allowance_Data_'

connection_string = 'Driver={SQL Server};Server=KGS-VDI-00415\SQLEXPRESS;Database=HR-Central_WebApp;Trusted_Connection=yes;'
#Create Connection
print('Trying to connect to database..')  	
conn_string = pyodbc.connect(connection_string)
print('Connection to database has been established succesfully..')


#Email template
HR = '<h4>Dear HR,</h4>' + \
        '<div>Please find attached <strong>Shift Allowance Report</strong>' + \
        ' for the period <strong>Jul-Aug.</strong></div>' + \
        '<h5>Regards,</h5>' + \
        '<h5>HR Central Team</h5>'
    
    

#Create Email Template
def createEmailTemplate():
    multiline_string = HR
    return multiline_string

#Send Email to all the HR's
def sendEmail():
    content = createEmailTemplate()
    from_email_address = 'vinayaggarwal5204@gmail.com'
    from_email = Email(from_email_address)

    to_email = To("vinaywildfire@gmail.com")#Dynamic email id

    subject = 'New Shift Allowances report for Jul-Aug period.'
    content = Content('text/html',content.format(shiftId=12345, username="Vin",period='July-Aug-20', status="pending",approver = "PM",hr="Joe"))

    mail = Mail(from_email, to_email, subject, content)

    get_latest_file = get_the_latest_file()
    with open(get_latest_file['latestFile'] , 'rb') as fd:
        file_data = base64.b64encode(fd.read())
        fd.close()
    encoded = base64.b64encode(file_data).decode()
    attachment = Attachment()
    attachment.file_content = FileContent(str(file_data,'utf-8'))
    attachment.file_type = FileType('text/csv')
    attachment.file_name = FileName(get_latest_file['fileName'])
    mail.add_attachment(attachment)
    response = sg.client.mail.send.post(request_body=mail.get())

    print(response.status_code)
    print(response.body)
    print(response.headers)

#Fetch the deatils from db table
def getEmpoyeeDetails():
    cursor = conn_string.cursor()
    cursor.execute('SELECT *  FROM [dbo].[TblEmployee]')
    data = cursor.fetchall()
    _list = []
    for record in data:
        collection_Data = collections.OrderedDict()
        collection_Data['EmployeeName'] = record[0]
        collection_Data['EmployeeEmailId'] = record[1]
        collection_Data['EmployeeNumber'] = record[2]
        collection_Data['ManagerName'] = record[3]
        collection_Data['Designation'] = record[4]
        collection_Data['Location'] = record[5]
        collection_Data['CostCenter'] = record[6]
        collection_Data['EmpGeo'] = record[7]
        collection_Data['ManagerEmailId'] = record[8]
        collection_Data['HrEmailID'] = record[9]
        _list.append(collection_Data)
    conn_string.commit()
    return _list

def start_dumping_data():
    extracted_data = getEmpoyeeDetails()
    getTimeStamp = create_TimeStamp()
    headers = ['Employee Name','Employee EmailId','Employee Number','Manager Name','Designation',
                   'Location','Cost Center','Emp Geo','Manager EmailId','HR EmailID'] 
    with open(csv_file_path + csv_file_name + getTimeStamp + '.csv','a+') as dataCSV:
        csvwriter = csv.DictWriter(dataCSV, delimiter=',', lineterminator='\n',fieldnames=headers)  
        print('Writing CSV header now in csv file...')
        csvwriter.writeheader() 
        for features in extracted_data:
                csvwriter.writerow({'Employee Name':features['EmployeeName'],
                                    'Employee EmailId':features['EmployeeEmailId'],
                                    'Employee Number':features['EmployeeNumber'],
                                    'Manager Name':features['ManagerName'],
                                    'Designation':features['Designation'],
                                    'Location':features['Location'],
                                    'Cost Center':features['CostCenter'],
                                    'Emp Geo':features['EmpGeo'],
                                    'Manager EmailId':features['ManagerEmailId'],
                                    'HR EmailID':features['HrEmailID'],
                                    })

        print("-" * 100)

#Helper functions
def get_the_latest_file():
    list_of_files = glob.glob(csv_file_path + '*')
    latest_file = max(list_of_files, key=os.path.getctime)
    file_name = os.path.basename(latest_file)
    latest_file_details = {'latestFile':latest_file,'fileName':file_name}
    return latest_file_details

# Function to create timestamp and return
def create_TimeStamp():
    getTime = time.time()   # Get the current time
    getDateTime = datetime.datetime.fromtimestamp(getTime).strftime('%Y-%m-%d_%H-%M-%S') # Get the date and create a date with timestamp
    return getDateTime


# Main function to initialize the execution process
def main():
    print("-" * 100) 
    start_dumping_data()
    print("-" * 100)
    sendEmail()

####################################################################################################################
if '__main__' == __name__:
    main()
####################################################################################################################