"""
API calls method for the HR Central app flask react application.
"""
from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from HR_Central_App import app
import HR_Central_App.flask_app.database_model as dbModel
import pyodbc
import urllib
import requests
import HR_Central_App.flask_app.email_config as email_config
import sendgrid
import os
from sendgrid.helpers.mail import *


#Access Email API key
sg = sendgrid.SendGridAPIClient(email_config.send_grid_api_key)

print('Trying to connect to database..')  	
conn_string = urllib.parse.quote_plus('Driver={SQL Server};''Server=KGS-VDI-00415\SQLEXPRESS;''Database=HR-Central_WebApp;''Trusted_Connection=yes;')
sql_engine = create_engine("mssql+pyodbc:///?odbc_connect=%s" % conn_string)
print('Connection to database has been established succesfully..')


@app.route('/api/getAccessRoles/',methods=['GET'])
def getAccessRoles():
    getAccessRolesData = "Select * from [dbo].[TblDimAccessRoles]"
    roles_list = sql_engine.execute(getAccessRolesData)
    jsonRolesData = dbModel.get_dim_access_roles_schema.dump(roles_list)
    return jsonify(jsonRolesData)

@app.route('/api/getShiftAllowanceStatus/',methods=['GET'])
def getShiftAllowanceStatus():
    getShiftAllowanceStatusData = "SELECT *  FROM [dbo].[TblDimShiftAllowanceStatus]"
    allowance_list = sql_engine.execute(getShiftAllowanceStatusData)
    jsonAllowanceData = dbModel.get_dim_shift_allowance_status_schema.dump(allowance_list)
    return jsonify(jsonAllowanceData)

@app.route('/api/getShiftMonths/',methods=['GET'])
def getShiftMonths():
    getShiftMonthsData = "SELECT *  FROM [dbo].[TblDimShiftMonth]"
    months_list = sql_engine.execute(getShiftMonthsData)
    jsonMonthsData = get_services_values_schema.dump(months_list)
    return jsonify(jsonMonthsData)

@app.route('/api/getShiftTypes/',methods=['GET'])
def getShiftTypes():
    getShiftTypesData = "SELECT *  FROM [dbo].[TblDimShiftType]"
    shift_types_list = sql_engine.execute(getShiftTypesData)
    jsonShiftTypesData = get_services_values_schema.dump(shift_types_list)
    return jsonify(jsonShiftTypesData)

@app.route('/api/getShiftYears/',methods=['GET'])
def getShiftYears():
    getShiftYearsData = "SELECT *  FROM [dbo].[TblDimShiftYear]"
    shift_years_list = sql_engine.execute(getShiftYearsData)
    jsonShiftYearsData = get_services_values_schema.dump(shift_years_list)
    return jsonify(jsonShiftYearsData)

@app.route('/api/getEmployeeDetails/',methods=['POST'])
def getEmployeeDetails():
    extractQuerParams = request.get_json()
    email_id = extractQuerParams['email']
    getEmpoyeeDetailsData = 'SELECT *  FROM [dbo].[TblEmployee] where EmployeeEmailId = ?'
    employees_list = sql_engine.execute(getEmpoyeeDetailsData,email_id)
    jsonEmployeeData = dbModel.get_employee_schema.dump(employees_list)
    return jsonify(jsonEmployeeData)

@app.route('/api/getEmpoyeeShiftAllowance/',methods=['GET'])
def getEmpoyeeShiftAllowance():
    getEmpoyeeShiftAllowanceData = "SELECT *  FROM [dbo].[TblFactEmployeeShiftAllowance]"
    shift_allowance_list = sql_engine.execute(getEmpoyeeShiftAllowanceData)
    jsonAllowanceData = get_services_values_schema.dump(shift_allowance_list)
    return jsonify(jsonAllowanceData)

@app.route('/api/getEmpoyeeShiftAllowanceSummary/',methods=['GET'])
def getEmpoyeeShiftAllowanceSummary():
    getEmpoyeeShiftAllowanceSummaryData = "SELECT *  FROM [dbo].[TblFactEmployeeShiftAllowanceSummary]"
    allowance_summary_list = sql_engine.execute(getEmpoyeeShiftAllowanceSummaryData)
    jsonSummaryData = get_services_values_schema.dump(allowance_summary_list)
    return jsonify(jsonSummaryData)

@app.route('/api/getEmpoyeeDetailsByEmail/',methods=['POST'])
def getEmpoyeeDetailsByEmail():
    extractQuerParams = request.get_json()
    email_id = extractQuerParams['email']
    getEmpoyeeDetailsByEmail = "EXEC spGetEmployeeDetailsbyEmail @email=?"
    emp_list = sql_engine.execute(getEmpoyeeDetailsByEmail,email_id)
    jsonEmpData = dbModel.get_employee_schema.dump(emp_list)
    return jsonify(jsonEmpData)

@app.route('/api/getShiftDays/',methods=['GET'])
def getShiftDays():
    getShiftDays = "Select * from [dbo].[TblDimShiftDays]"
    days_list = sql_engine.execute(getShiftDays)
    jsonDaysData = dbModel.get_dim_shift_days_schema.dump(days_list)
    return jsonify(jsonDaysData)

@app.route('/api/getShiftMonth/',methods=['GET'])
def getShiftMonth():
    getShiftMonth = "EXEC spGetTblDimShiftMonth"
    month_list = sql_engine.execute(getShiftMonth)
    jsonMonthData = dbModel.get_dim_shift_month_schema.dump(month_list)
    return jsonify(jsonMonthData)

@app.route('/api/getShiftYear/',methods=['GET'])
def getShiftYear():
    getShiftYear = "EXEC spGetTblDimShiftYear"
    year_list = sql_engine.execute(getShiftYear)
    jsonYearData = dbModel.get_dim_shift_year_schema.dump(year_list)
    return jsonify(jsonYearData)

@app.route('/api/getShiftType/',methods=['GET'])
def getShiftType():
    getShiftType = "EXEC spGetTblDimShiftType"
    type_list = sql_engine.execute(getShiftType)
    jsonTypeData = dbModel.get_dim_shift_type_schema.dump(type_list)
    return jsonify(jsonTypeData)

@app.route('/api/saveNewShiftAllowance/',methods=['POST'])
def saveNewShiftAllowance():
    print('Trying to connect to database..')  	
    conn_string = pyodbc.connect(email_config.connection_string,autocommit=True)
    print('Connection to database has been established succesfully..')
    cursor = conn_string.cursor()
    
    extractQuerParams = request.get_json()
    print(extractQuerParams)
    employee_email_id = extractQuerParams['EmployeeEmailId']
    manager_email_id = extractQuerParams['ManagerEmailId']
    hr_email_id = extractQuerParams['HrEmailId']
    shift_month = extractQuerParams['ShiftMonth']
    shift_year = extractQuerParams['ShiftYear']
    shift_type_id = extractQuerParams['DimShiftTypeId']
    no_of_days = extractQuerParams['NoOfDaysWorked']
    total_amount = extractQuerParams['TotalAmount']
    status_id = extractQuerParams['DimShiftAllowanceStatusId']
    rejection_comments = extractQuerParams['ShiftAllowanceRejectionComments']
    created_by = extractQuerParams['TargetRecordCreatedBy']
    saveNewShiftAllowance = '''EXEC dbo.spInsertUpdateTblFactEmployeeShiftAllowanceAndSummary
        @EmployeeEmailId =?,
        @ManagerEmailId =?,
        @HrEmailId =?,
        @ShiftMonth =?,
        @ShiftYear =?,
        @DimShiftTypeId =?,
        @NoOfDaysWorked =?,
        @TotalShiftAllowance =?,
        @DimShiftAllowanceStatusId =?,
        @ShiftAllowanceRejectionComments=?,
        @TargetRecordCreatedBy=?'''

    emp_list = cursor.execute(saveNewShiftAllowance,employee_email_id,manager_email_id,hr_email_id,shift_month,shift_year,shift_type_id,
                                no_of_days,total_amount,status_id,rejection_comments,created_by)
   
    jsonEmpData = dbModel.insert_new_shift_allowance_summary_schema.dump(emp_list)
    cursor.close()
    #trigger_email_process(employee_email_id,manager_email_id,hr_email_id,shift_month,shift_year,shift_type_id,
    #                            no_of_days,total_amount,status_id,rejection_comments)
    return str(jsonEmpData)

@app.route('/api/getShiftAllowanceAndSummary/',methods=['POST'])
def getShiftAllowanceAndSummary():
    extractQueryParams = request.get_json()
    emp_email_id = extractQueryParams['email']
    getShiftAllowanceAndSummary = 'Exec spGetTblFactEmployeeShiftAllowanceAndSummary @EmployeeEmailId = ?'
    shift_list = sql_engine.execute(getShiftAllowanceAndSummary,emp_email_id)
    jsonShiftData = dbModel.sp_get_fact_employee_shift_allowance_and_summary_schema.dump(shift_list)
    return jsonify(jsonShiftData)

@app.route('/api/getLatestStatus/',methods=['POST'])
def getLatestStatus():
    extractQueryParams = request.get_json()
    emp_email_id = extractQueryParams['email']
    getLatestStatus = '''SELECT TOP 1 DimShiftAllowanceStatusId  FROM TblFactEmployeeShiftAllowanceSummary where EmployeeEmailId = ?
    order by TblFactEmployeeShiftAllowanceSummaryId desc'''
    current_status = sql_engine.execute(getLatestStatus,emp_email_id)
    jsonCurentData = dbModel.get_fact_employee_shift_allowance_summary_schema.dump(current_status)
    return jsonify(jsonCurentData)

@app.route('/api/getAllRaisedShiftAllowance/',methods=['POST'])
def getAllRaisedShiftAllowance():
    extractQueryParams = request.get_json()
    emp_email_id = extractQueryParams['email']
    getAllRaisedShiftAllowance = 'Exec spGetTblFactEmployeeShiftAllowanceAndSummaryForManagerAndHR @EmployeeEmailId = ?'
    manager_approval_list = sql_engine.execute(getAllRaisedShiftAllowance,emp_email_id)
    jsonApprovalData = dbModel.sp_get_fact_employee_shift_allowance_and_summary_schema.dump(manager_approval_list)
    return jsonify(jsonApprovalData)

@app.route('/api/getAllKPIValues/',methods=['POST'])
def getAllKPIValues():
    extractQueryParams = request.get_json()
    emp_email_id = extractQueryParams['email']
    user_role = extractQueryParams['userRole']
    getAllKPIValues = 'Exec spGetShiftAllowanceKPIFromShiftAllowanceAndSummaryForManagerAndHR @EmployeeEmailId = ?,@UserRole =?'
    kpi_values = sql_engine.execute(getAllKPIValues,emp_email_id,user_role)
    jsonKPIData = dbModel.get_shift_allowance_KPI_values_schema.dump(kpi_values)
    return jsonify(jsonKPIData)


def trigger_email_process(employee_email_id,manager_email_id,hr_email_id,shift_month,shift_year,shift_type_id,
                                no_of_days,total_amount,status_id,rejection_comments):
    print('Im in tigger email fnction')
    shiftAllowanceDetails = '''Exec spGetRecordForMailFromTblFactEmployeeShiftAllowanceAndSummary
        @EmployeeEmailId =?,
        @ManagerEmailId =?,
        @HrEmailId =?,
        @ShiftMonth =?,
        @ShiftYear =?,
        @DimShiftTypeId =?,
        @NoOfDaysWorked =?,
        @TotalShiftAllowance =?,
        @DimShiftAllowanceStatusId =?,
        @ShiftAllowanceRejectionComments=?
        '''
    shift_details = sql_engine.execute(shiftAllowanceDetails,employee_email_id,manager_email_id,hr_email_id,shift_month,shift_year,shift_type_id,
                                no_of_days,total_amount,status_id,rejection_comments)
   
    jsonShiftDetailsData = dbModel.get_record_for_email_schema.dump(shift_details)
    data_to_prepare_email = jsonify(jsonShiftDetailsData)
    prepare_and_send_email(data_to_prepare_email,status_id)



#####################################################################################################################################################
#############  Email Section Shift Allowance #############
#####################################################################################################################################################
def createEmailTemplate(statusId,current_status,shift_allowance_id,emp_name,shift_month,shift_year,shift_type,emp_manager_name,emp_hr_name,
                        total_amount,rejection_comments):
    print('Im in template fnction')
    multiline_string = ''
    splitted_emp_name = emp_name.strip().split(',')
    splitted_emp_manager_name = emp_manager_name.strip().split(',')
    splitted_emp_hr_name = emp_hr_name.strip().split(',')
    if statusId == 1:
        multiline_string = '<h4>Dear ' + str(splitted_emp_name[1]) + ' ' + str(splitted_emp_name[0]) + ',</h4>' + \
                            '<div>Your shift allowance <strong>' + str(shift_allowance_id) + ' - ' + str(shift_type) + '</strong>' + \
                            ' for the period <strong>' + str(shift_month) + ' - ' + str(shift_year) + '</strong> amounting ₹<strong>' + str(total_amount) + '</strong>' + \
                            ' is <strong>submitted</strong> and <strong>' + str(current_status) + '</strong> <strong> - ' + str(splitted_emp_manager_name[1]) + ' ' + str(splitted_emp_manager_name[0]) + \
                            '</strong>.</div>' + \
                            '<h5>Regards,</h5>' + \
                            '<h5>HR Central Team</h5>'

    elif statusId == 2:
         multiline_string = '<h4>Dear ' + str(splitted_emp_name[1]) + ' ' + str(splitted_emp_name[0]) + ',</h4>' + \
                            '<div>Your shift allowance <strong>' + str(shift_allowance_id) + ' - ' + str(shift_type) + '</strong>' + \
                            ' for the period <strong>' + str(shift_month) + ' - ' + str(shift_year) + '</strong> amounting ₹<strong>' + str(total_amount) + '</strong>' + \
                            ' is <strong>' + str(current_status) + '</strong> <strong> - ' + str(splitted_emp_manager_name[1]) + ' ' + str(splitted_emp_manager_name[0]) + \
                            '</strong>.</div>' + \
                            '<h5>Regards,</h5>' + \
                            '<h5>HR Central Team</h5>'

    elif statusId == 3:
         multiline_string = '<h4>Dear ' + str(splitted_emp_name[1]) + ' ' + str(splitted_emp_name[0]) + ',</h4>' + \
                            '<div>Your shift allowance <strong>' + str(shift_allowance_id) + ' - ' + str(shift_type) + '</strong>' + \
                            ' for the period <strong>' + str(shift_month) + ' - ' + str(shift_year) + '</strong> amounting ₹<strong>' + str(total_amount) + '</strong>' + \
                            ' is <strong>' + str(current_status) + '</strong> <strong> - ' + str(splitted_emp_manager_name[1]) + ' ' + str(splitted_emp_manager_name[0]) + \
                            '</strong>.</div>' + \
                            '<strong>Rejection reason or comments</strong>: ' + str(rejection_comments) + \
                            '<h5>Regards,</h5>' + \
                            '<h5>HR Central Team</h5>'

    elif statusId == 4:
         multiline_string = '<h4>Dear ' + str(splitted_emp_name[1]) + ' ' + str(splitted_emp_name[0]) + ',</h4>' + \
                            '<div>Your shift allowance <strong>' + str(shift_allowance_id) + ' - ' + str(shift_type) + '</strong>' + \
                            ' for the period <strong>' + str(shift_month) + ' - ' + str(shift_year) + '</strong> amounting ₹<strong>' + str(total_amount) + '</strong>' + \
                            ' is <strong>' + str(current_status) + '</strong> <strong> - ' + str(splitted_emp_hr_name[1]) + ' ' + str(splitted_emp_hr_name[0]) + \
                            '</strong> & it will be processed with salary as per the Shift Allowance Policy.</div>' + \
                            '<h5>Regards,</h5>' + \
                            '<h5>HR Central Team</h5>'
         
    elif statusId == 5:
         multiline_string = '<h4>Dear ' + str(splitted_emp_name[1]) + ' ' + str(splitted_emp_name[0]) + ',</h4>' + \
                            '<div>Your shift allowance <strong>' + str(shift_allowance_id) + ' - ' + str(shift_type) + '</strong>' + \
                            ' for the period <strong>' + str(shift_month) + ' - ' + str(shift_year) + '</strong> amounting ₹<strong>' + str(total_amount) + '</strong>' + \
                            ' is <strong>' + str(current_status) + '</strong> <strong> - ' + str(splitted_emp_hr_name[1]) + ' ' + str(splitted_emp_hr_name[0]) + \
                            '</strong></div>' + \
                            '<strong>Rejection reason or comments</strong>: ' + str(rejection_comments) + \
                            '<h5>Regards,</h5>' + \
                            '<h5>HR Central Team</h5>'

    return multiline_string

def prepare_subject(statusId,shift_allowance_id):
    print('Im in subject fnction')
    subject = ''
    if statusId == 1:
        subject = str(shift_allowance_id) + ' - New Shift Allowance has raised'
    elif statusId == 2:
        subject = str(shift_allowance_id) + ' - Shift Allowance has been approved by your manager'
    elif statusId == 3:             
        subject = str(shift_allowance_id) + ' - Shift Allowance has been rejected by your manager'
    elif statusId == 4:             
        subject = str(shift_allowance_id) + ' - Shift Allowance has been approved by your HR'
    elif statusId == 5:             
        subject = str(shift_allowance_id) + ' - Shift Allowance has been rejected by your HR'
    return subject

def prepare_content(statusId,current_status,shift_allowance_id,emp_name,shift_month,shift_year,shift_type,emp_manager_name,emp_hr_name,total_amount,
                    rejection_comments):
    print('Im in body contecnt fnction')
    body_content = ''    
    content = createEmailTemplate(statusId,current_status,shift_allowance_id,emp_name,shift_month,
                                  shift_year,shift_type,emp_manager_name,emp_hr_name,total_amount,rejection_comments)
    if statusId == 1 or statusId == 2:
        body_content = content.format(status = {current_status},shiftId={shift_allowance_id},username={emp_name}
                                                 ,month={shift_month},year={shift_year},type={shift_type},manager = {emp_manager_name}
                                                 ,hr = {emp_hr_name},amount = {total_amount})
    elif statusId == 3 :
        body_content = content.format(status = {current_status},shiftId={shift_allowance_id},username={emp_name}
                                                 ,month={shift_month},year={shift_year},type={shift_type},manager = {emp_manager_name}
                                                 ,hr = {emp_hr_name},amount = {total_amount},rejection={rejection_comments})
    elif statusId == 4:
        body_content = content.format(status = {current_status},shiftId={shift_allowance_id},username={emp_name}
                                                 ,month={shift_month},year={shift_year},type={shift_type},hr = {emp_hr_name}
                                                 ,amount = {total_amount})
    elif statusId == 5:
        body_content = content.format(status = {current_status},shiftId={shift_allowance_id},username={emp_name}
                                                 ,month={shift_month},year={shift_year},type={shift_type},hr = {emp_hr_name}
                                                 ,amount = {total_amount},rejection={rejection_comments})
    return body_content

def prepare_and_send_email(emailData,statusId):
    print('Im in send email fnction')
    from_email = Email("vinayaggarwal5204@gmail.com")
    to_email = To("vinaywildfire@gmail.com")
    statusId = int(statusId)
    shift_allowance_id = emailData.json[0]['TblFactEmployeeShiftAllowanceSummaryId']
    emp_id = emailData.json[0]['EmployeeEmailId']
    emp_name = emailData.json[0]['EmployeeName']
    emp_manager_id = emailData.json[0]['ManagerEmailId']
    emp_manager_name = emailData.json[0]['ManagerName']
    emp_hr_id = emailData.json[0]['HrEmailId']
    emp_hr_name = emailData.json[0]['HrName']
    shift_month = emailData.json[0]['ShiftMonth']
    shift_year = emailData.json[0]['ShiftYear']
    shift_type = emailData.json[0]['ShiftType']
    days_worked = emailData.json[0]['NoOfDaysWorked']
    total_amount = emailData.json[0]['TotalShiftAllowance']
    current_status = emailData.json[0]['ShiftAllowanceStatus']
    rejection_comments = emailData.json[0]['ShiftAllowanceRejectionComments']

    fetch_subject = prepare_subject(statusId,shift_allowance_id)
    fetch_content = prepare_content(statusId,current_status,shift_allowance_id,emp_name,shift_month,shift_year
                                    ,shift_type,emp_manager_name,emp_hr_name,total_amount,rejection_comments)

    content = Content('text/html',fetch_content)

    mail = Mail(from_email, to_email, fetch_subject, content)
    print('After Mail call')
    response = sg.client.mail.send.post(request_body=mail.get())
    print('sent mail')
    print(response.status_code)
    print(response.body)
    print(response.headers)


#####################################################################################################################################################
#############  Recruiter Section #############
#####################################################################################################################################################
@app.route('/api/getCostCenter/',methods=['GET'])
def getCostCenter():
    getCostCenter = "SELECT *  FROM TblDimCostCenter"
    cc_list = sql_engine.execute(getCostCenter)
    jsonCCData = dbModel.get_cost_center_schema.dump(cc_list)
    return jsonify(jsonCCData)

@app.route('/api/getExpenseStatus/',methods=['GET'])
def getExpenseStatus():
    getExpenseStatus = "SELECT *  FROM TblDimExpenseStatus"
    expense_list = sql_engine.execute(getExpenseStatus)
    jsonExpenseData = dbModel.get_expense_status_schema.dump(expense_list)
    return jsonify(jsonExpenseData)

@app.route('/api/getHead/',methods=['GET'])
def getHead():
    getHead = "SELECT *  FROM TblDimHead"
    head_list = sql_engine.execute(getHead)
    jsonHeadData = dbModel.get_Head_schema.dump(head_list)
    return jsonify(jsonHeadData)

@app.route('/api/getRecruiterHRMapping/',methods=['GET'])
def getRecruiterHRMapping():
    getRecruiterHRMapping = "SELECT *  FROM TblDimRecruiterHrMapping"
    hr_mapping_list = sql_engine.execute(getRecruiterHRMapping)
    jsonMappingData = dbModel.get_Recruiter_Hr_Mapping_schema.dump(hr_mapping_list)
    return jsonify(jsonMappingData)


@app.route('/api/getExpenseInfoHR/',methods=['POST'])
def getExpenseInfoHR():
    extractQueryParams = request.get_json()
    emp_email_id = extractQueryParams['email']
    getExpenseInfoHR = 'Exec spGetTblFactNewJoineeExpenseInfoForHR @EmployeeEmailId = ?'
    expense_hr_list = sql_engine.execute(getExpenseInfoHR,emp_email_id)
    jsonExpenseHRData = dbModel.sp_new_joinee_expense_info_hr_schema.dump(expense_hr_list)
    return jsonify(jsonExpenseHRData)

@app.route('/api/saveNewJoineeExpenseInfo/',methods=['POST'])
def saveNewJoineeExpenseInfo():
    print('Trying to connect to database..')  	
    conn_string = pyodbc.connect(email_config.connection_string,autocommit=True)
    print('Connection to database has been established succesfully..')
    cursor = conn_string.cursor()
    
    extractQuerParams = request.get_json()
    print(extractQuerParams)
    recruiter_email_id = extractQuerParams['RecruiterEmailId']
    hr_email_id = extractQuerParams['HrEmailId']
    emp_id = extractQuerParams['EmployeeNumber']
    emp_name = extractQuerParams['EmployeeName']
    doj = extractQuerParams['DateofJoining']
    cost_center_id = extractQuerParams['DimCostCenterId']
    head_id = extractQuerParams['DimHeadId']
    clawblack_duration = extractQuerParams['ClawBackDurationInMonths']
    total_expense = extractQuerParams['TotalExpense']
    expense_status_id = extractQuerParams['DimExpenseStatusId']
    created_by = extractQuerParams['TargetRecordCreatedBy']
    saveNewJoineeExpenseInfo = '''EXEC dbo.spInsertUpdateTblFactNewJoineeExpenseInfo
        @RecruiterEmailId =?,
        @HrEmailId =?,
        @EmployeeNumber =?,
        @EmployeeName =?,
        @DateofJoining =?,
        @DimCostCenterId=?,
        @DimHeadId =?,
        @ClawBackDurationInMonths =?,
        @TotalExpense =?,
        @DimExpenseStatusId =?,
        @TargetRecordCreatedBy=?
        '''

    info_list = cursor.execute(saveNewJoineeExpenseInfo,recruiter_email_id,hr_email_id,emp_id,emp_name,doj,cost_center_id,head_id,
                                clawblack_duration,total_expense,expense_status_id,created_by)
   
    jsonInfoData = dbModel.sp_insert_update_new_joinee_expense_info_schema.dump(info_list)
    cursor.close()
    #trigger_email_process_recruiter(recruiter_email_id,hr_email_id,emp_id,emp_name,doj,cost_center_id,head_id,
    #                            clawblack_duration,total_expense,expense_status_id,created_by)
    return str(jsonInfoData)


@app.route('/api/getJoiningBenefitsLatestStatus/',methods=['POST'])
def getJoiningBenefitsLatestStatus():
    extractQueryParams = request.get_json()
    emp_email_id = extractQueryParams['email']
    getJoiningBenefitsLatestStatus = '''SELECT TOP 1 DimExpenseStatusId  FROM TblFactNewJoineeExpenseInfo where RecruiterEmailId = ?
    order by FactNewJoineeExpenseInfoId desc'''
    current_status = sql_engine.execute(getJoiningBenefitsLatestStatus,emp_email_id)
    jsonCurentData = dbModel.sp_insert_update_new_joinee_expense_info_schema.dump(current_status)
    return jsonify(jsonCurentData)

@app.route('/api/getBonusAndBuyoutKPIHR/',methods = ['POST'])
def getBonusAndBuyoutKPIHR():
    extractQueryParams = request.get_json()
    emp_email_id = extractQueryParams['email']
    getBonusAndBuyoutKPIHR = '''Exec spGetBonusAndBuyoutKPIHR  @EmployeeEmailId =? '''
    kpi_values = sql_engine.execute(getBonusAndBuyoutKPIHR,emp_email_id)
    jsonKPIData = dbModel.sp_get_bonus_and_buyout_kpi_hr_schema.dump(kpi_values)
    return jsonify(jsonKPIData)


def trigger_email_process_recruiter(recruiter_email_id,hr_email_id,emp_id,emp_name,doj,cost_center_id,head_id,
                                clawblack_duration,total_expense,expense_status_id,created_by):
    print('Im in tigger email function')
    getNewJoineeExpenseInfo = '''EXEC dbo.[spGetFactNewJoineeExpenseInfo] 
        @RecruiterEmailId =?,
        @HrEmailId =?,
        @EmployeeNumber =?,
        @EmployeeName =?,
        @DateofJoining =?,
        @DimCostCenterId=?,
        @DimHeadId =?,
        @ClawBackDurationInMonths =?,
        @TotalExpense =?,
        @DimExpenseStatusId =?,
        @TargetRecordCreatedBy=?
        '''

    email_details = sql_engine.execute(getNewJoineeExpenseInfo,recruiter_email_id,hr_email_id,emp_id,emp_name,doj,cost_center_id,head_id,
                                clawblack_duration,total_expense,expense_status_id,created_by)

    jsonEmailDetailsData = dbModel.sp_get_fact_new_joinee_expense_info_schema.dump(email_details)
    data_to_prepare_email = jsonify(jsonEmailDetailsData)
    prepare_and_send_email_recruiter(data_to_prepare_email,expense_status_id)



#####################################################################################################################################################
#############  Email Section #############
#####################################################################################################################################################
def create_email_template_recruiter(statusId,emp_name,emp_id,clawback_duration,doj,cost_center,expense_status,
                                   head,expense_id,hr_name,recruiter_name,total_amount):
    print('Im in template fnction')
    multiline_string = ''
    splitted_hr_name = hr_name.strip().split(',')
    splitted_recruiter_name = recruiter_name.strip().split(',')
    if statusId == 1:
        multiline_string = '<h4>Dear ' + str(splitted_recruiter_name[1]) + ' ' + str(splitted_recruiter_name[0]) + ',</h4>' + \
                            '<div><strong>' + str(head) + '</strong> benefit <strong>' + str(expense_id) + '</strong>' + \
                            ' for candidate <strong> Emp ID (' + str(emp_id) + ') - Emp Name (' + str(emp_name) + ')</strong> amounting ₹<strong>' + str(total_amount) + '</strong>' + \
                            ' with the clawback duration of <strong>' + str(clawback_duration) + ' months allotted to ' + str(cost_center) + '</strong> Cost Center' + \
                            ' is <strong>submitted</strong> and <strong>' + str(expense_status) + '</strong> <strong> - ' + str(splitted_hr_name[1]) + ' ' + str(splitted_hr_name[0]) + \
                            '</strong>.</div>' + \
                            '<h5>Regards,</h5>' + \
                            '<h5>HR Central Team</h5>'

    elif statusId == 2:
         multiline_string = '<h4>Dear ' + str(splitted_recruiter_name[1]) + ' ' + str(splitted_recruiter_name[0]) + ',</h4>' + \
                            '<div><strong>' + str(head) + '</strong> benefit <strong>' + str(expense_id) + '</strong>' + \
                            ' for candidate <strong> Emp ID (' + str(emp_id) + ') - Emp Name (' + str(emp_name) + ')</strong> amounting ₹<strong>' + str(total_amount) + '</strong>' + \
                            ' with the clawback duration of <strong>' + str(clawback_duration) + ' months allotted to ' + str(cost_center) + '</strong> Cost Center' + \
                            ' is <strong>' + str(expense_status) + '</strong> by <strong> - ' + str(splitted_hr_name[1]) + ' ' + str(splitted_hr_name[0]) + \
                            '</strong>.</div>' + \
                            '<h5>Regards,</h5>' + \
                            '<h5>HR Central Team</h5>'

    elif statusId == 3:
         multiline_string = '<h4>Dear ' + str(splitted_recruiter_name[1]) + ' ' + str(splitted_recruiter_name[0]) + ',</h4>' + \
                            '<div><strong>' + str(head) + '</strong> benefit <strong>' + str(expense_id) + '</strong>' + \
                            ' for candidate <strong> Emp ID (' + str(emp_id) + ') - Emp Name (' + str(emp_name) + ')</strong> amounting ₹<strong>' + str(total_amount) + '</strong>' + \
                            ' with the clawback duration of <strong>' + str(clawback_duration) + ' months allotted to ' + str(cost_center) + '</strong> Cost Center' + \
                            ' is <strong>' + str(expense_status) + '</strong> by <strong> - ' + str(splitted_hr_name[1]) + ' ' + str(splitted_hr_name[0]) + \
                            '</strong>.</div>' + \
                            '<h5>Regards,</h5>' + \
                            '<h5>HR Central Team</h5>'

    return multiline_string

def prepare_subject_recruiter(statusId,expense_id,head):
    print('Im in subject fnction')
    subject = ''
    if statusId == 1:
        subject = str(expense_id) + ' ' + str(head) + ' - New Joining Benefit has raised'
    elif statusId == 2:
        subject = str(expense_id) + ' ' + str(head) + ' - Joining benefit has been approved by HR'
    elif statusId == 3:             
        subject = str(expense_id) + ' ' + str(head) + ' - Joining benefit  has been rejected by HR'
    return subject

def prepare_content_recruiter(statusId,emp_name,emp_id,clawback_duration,doj,cost_center,expense_status,
                                   head,expense_id,hr_name,recruiter_name,total_amount):
    print('Im in body contecnt fnction')
    body_content = ''    
    content = create_email_template_recruiter(statusId,emp_name,emp_id,clawback_duration,doj,cost_center,expense_status,
                                   head,expense_id,hr_name,recruiter_name,total_amount)
    if statusId == 1 or statusId == 2:
        body_content = content

    elif statusId == 3 :
        body_content = content

    return body_content

def prepare_and_send_email_recruiter(emailData,statusId):
    print('Im in send email fnction')
    from_email = Email("vinayaggarwal5204@gmail.com")
    to_email = To("vinaywildfire@gmail.com")
    statusId = int(statusId)


    emp_name = emailData.json[0]['EmployeeName']
    emp_id = emailData.json[0]['EmployeeNumber']
    clawback_duration = emailData.json[0]['ClawBackDurationInMonths']
    doj = emailData.json[0]['DateofJoining']
    cost_center = emailData.json[0]['DimCostCenter']
    expense_status = emailData.json[0]['DimExpenseStatus']
    head = emailData.json[0]['DimHead']
    expense_id = emailData.json[0]['FactNewJoineeExpenseInfoId']
    hr_name = emailData.json[0]['HrName']
    recruiter_name = emailData.json[0]['RecruiterName']
    total_amount = emailData.json[0]['TotalExpense']

    print(statusId,emp_name,emp_id,clawback_duration,doj,cost_center,expense_status,
                                   head,expense_id,hr_name,recruiter_name,total_amount)

    fetch_subject = prepare_subject_recruiter(statusId,expense_id,head)
    fetch_content = prepare_content_recruiter(statusId,emp_name,emp_id,clawback_duration,doj,cost_center,expense_status,
                                   head,expense_id,hr_name,recruiter_name,total_amount)

    content = Content('text/html',fetch_content)

    mail = Mail(from_email, to_email, fetch_subject, content)
    print('After Mail call')
    response = sg.client.mail.send.post(request_body=mail.get())
    print('sent mail')
    print(response.status_code)
    print(response.body)
    print(response.headers)



@app.route('/api/fileUpload/', methods=['POST'])
def fileUpload():
    target = 'C:/Users/vinayaggarwal/source/repos/HR_Central/HR_Central_App/csvfiles'
    file = request.files['PDFFile']
    print(file)
    filename = file.filename
    destination = "/".join([target, filename])
    file.save(destination)
    #session['uploadFilePath'] = destination
    response = "uploaded successfully!"
    return response