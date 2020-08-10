"""
Database models for the HR Central app flask react application.
"""

from flask import Flask
from flask_marshmallow import Marshmallow
from HR_Central_App import app

marsh_mallow = Marshmallow(app)

class GetTblDimAccessRolesSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('DimAccessRolesId'
      ,'DimAccessRoles'
      ,'isActive'
      ,'TargetRecordCreatedDate'
      ,'TargetRecordCreatedBy')

get_dim_access_roles_schema = GetTblDimAccessRolesSchema(many=True)

class GetTblDimShiftAllowanceStatusSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('DimShiftAllowanceStatusId'
                  ,'ShiftAllowanceStatus'
                  ,'isActive'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_dim_shift_allowance_status_schema = GetTblDimShiftAllowanceStatusSchema(many=True)

class GetTblDimShiftDaysSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('Day','Name')

get_dim_shift_days_schema = GetTblDimShiftDaysSchema(many=True)

class GetTblDimShiftMonthSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('DimShiftMonthId'
                  ,'ShiftMonth'
                  ,'isActive'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_dim_shift_month_schema = GetTblDimShiftMonthSchema(many=True)

class GetTblDimShiftTypeSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('DimShiftTypeId'
                  ,'ShiftType'
                  ,'ShiftALlowancePerDay'
                  ,'isActive'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_dim_shift_type_schema = GetTblDimShiftTypeSchema(many=True)

class GetTblDimShiftYearSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('DimShiftYearId'
                  ,'ShiftYear'
                  ,'isActive'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_dim_shift_year_schema = GetTblDimShiftYearSchema(many=True)

class GetTblEmployeeSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('EmployeeName'
                  ,'EmployeeEmailId'
                  ,'EmployeeNumber'
                  ,'ManagerName'
                  ,'Designation'
                  ,'Location'
                  ,'CostCenter'
                  ,'EmpGeo'
                  ,'ManagerEmailId'
                  ,'HrEmailID'
                  ,'HrName'
                  ,'UserRole')

get_employee_schema = GetTblEmployeeSchema(many=True)

class GetTblFactEmployeeShiftAllowanceSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('FactEmployeeShiftAllowanceId'
                  ,'EmployeeEmailId'
                  ,'ManagerEmailId'
                  ,'HrEmailId'
                  ,'ShiftMonth'
                  ,'ShiftYear'
                  ,'DimShiftTypeId'
                  ,'NoOfDaysWorked'
                  ,'TotalShiftAllowance'
                  ,'DimShiftAllowanceStatusId'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_fact_employee_shift_allowance_schema = GetTblFactEmployeeShiftAllowanceSchema(many=True)

class GetTblFactEmployeeShiftAllowanceSummarySchema(marsh_mallow.Schema):
    class Meta:
        fields = ('TblFactEmployeeShiftAllowanceSummaryId'
                  ,'EmployeeEmailId'
                  ,'ManagerEmailId'
                  ,'HrEmailId'
                  ,'ShiftMonth'
                  ,'ShiftYear'
                  ,'DimShiftTypeId'
                  ,'NoOfDaysWorked'
                  ,'TotalAmount'
                  ,'DimShiftAllowanceStatusId'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_fact_employee_shift_allowance_summary_schema = GetTblFactEmployeeShiftAllowanceSummarySchema(many=True)


class InsertNewShiftAllowanceSummarySchema(marsh_mallow.Schema):
    class Meta:
        fields = ('EmployeeEmailId',
                'ManagerEmailId',
                'HrEmailId',
                'ShiftMonth',
                'ShiftYear',
                'DimShiftTypeId',
                'NoOfDaysWorked',
                'TotalShiftAllowance',
                'DimShiftAllowanceStatusId',
                'ShiftAllowanceRejectionComments'
                'TargetRecordCreatedBy')

insert_new_shift_allowance_summary_schema = InsertNewShiftAllowanceSummarySchema(many=True)


class SPGetFactEmployeeShiftAllowanceAndSummarySchema(marsh_mallow.Schema):
    class Meta:
        fields = ('TblFactEmployeeShiftAllowanceSummaryId'
                  ,'EmployeeEmailId'
                  ,'EmployeeName'
                  ,'ManagerEmailId'
                  ,'ManagerName'
                  ,'HrEmailId'
                  ,'HrName'
                  ,'ShiftMonth'
                  ,'ShiftYear'
                  ,'ShiftType'
                  ,'NoOfDaysWorked'
                  ,'TotalShiftAllowance'
                  ,'ShiftAllowanceStatus'
                  ,'ShiftAllowanceRejectionComments')

sp_get_fact_employee_shift_allowance_and_summary_schema = SPGetFactEmployeeShiftAllowanceAndSummarySchema(many=True)

class GetShiftAllowanceKPIValuesSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('EmployeeEmailId'
                  ,'UserRole'
                  ,'Pending'
                  ,'Approved'
                  ,'Rejected'
                  ,'AmountDisbursed')

get_shift_allowance_KPI_values_schema = GetShiftAllowanceKPIValuesSchema(many=True)


class SPGetRecordForMailFromTblFactEmployeeShiftAllowanceAndSummarySchema(marsh_mallow.Schema):
    class Meta:
        fields = ('TblFactEmployeeShiftAllowanceSummaryId'
                  ,'EmployeeEmailId'
                  ,'EmployeeName'
                  ,'ManagerEmailId'
                  ,'ManagerName'
                  ,'HrEmailId'
                  ,'HrName'
                  ,'ShiftMonth'
                  ,'ShiftYear'
                  ,'ShiftType'
                  ,'NoOfDaysWorked'
                  ,'TotalShiftAllowance'
                  ,'ShiftAllowanceStatus'
                  ,'ShiftAllowanceRejectionComments')

get_record_for_email_schema = SPGetRecordForMailFromTblFactEmployeeShiftAllowanceAndSummarySchema(many=True)

##########################################################################################################################################
#####################  Recruiter ####################
##########################################################################################################################################
class spGetTblDimCostCenterSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('DimCostCenterId'
                  ,'DimCostCenter'
                  ,'isActive'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_cost_center_schema = spGetTblDimCostCenterSchema(many=True)


class spGetTblDimExpenseStatusSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('DimExpenseStatusId'
                  ,'DimExpenseStatusDisplayStatus'
                  ,'DimExpenseStatus'
                  ,'AccessRole'
                  ,'isActive'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_expense_status_schema = spGetTblDimExpenseStatusSchema(many=True)


class spGetTblDimHeadSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('DimHeadId'
                  ,'DimHead'
                  ,'isActive'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_Head_schema = spGetTblDimHeadSchema(many=True)


class spGetTblDimRecruiterHrMappingSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('DimRecruiterHrMappingId'
                  ,'RecruiterEmailId'
                  ,'RecruiterName'
                  ,'HrEmailId'
                  ,'HrName'
                  ,'isActive'
                  ,'TargetRecordCreatedDate'
                  ,'TargetRecordCreatedBy')

get_Recruiter_Hr_Mapping_schema = spGetTblDimRecruiterHrMappingSchema(many=True)


class spGetTblFactNewJoineeExpenseInfoForHRSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('FactNewJoineeExpenseInfoId'
                  ,'RecruiterEmailId'
                  ,'RecruiterName'
                  ,'HrEmailId'
                  ,'HrName'
                  ,'DateofJoining'
                  ,'DimCostCenter'
                  ,'EmployeeNumber'
                  ,'EmployeeName'
                  ,'DimHeadId'
                  ,'Dimhead'
                  ,'ClawBackDurationInMonths'
                  ,'TotalExpense'
                  ,'DimExpenseStatus')

sp_new_joinee_expense_info_hr_schema = spGetTblFactNewJoineeExpenseInfoForHRSchema(many=True)


class spInsertUpdateTblFactNewJoineeExpenseInfoSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('RecruiterEmailId'
                  ,'HrEmailId'
                  ,'EmployeeNumber'
                  ,'EmployeeName'
                  ,'DateofJoining'
                  ,'DimCostCenterId'
                  ,'DimHeadId'
                  ,'ClawBackDurationInMonths'
                  ,'TotalExpense'
                  ,'DimExpenseStatus'
                  ,'DimExpenseStatusId'
                  ,'TargetRecordCreatedBy')


sp_insert_update_new_joinee_expense_info_schema = spInsertUpdateTblFactNewJoineeExpenseInfoSchema(many=True)


class spGetBonusAndBuyoutKPIHRSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('EmployeeEmailId'
                  ,'Pending'
                  ,'Approved'
                  ,'Rejected'
                  ,'AmountDisbursed')


sp_get_bonus_and_buyout_kpi_hr_schema = spGetBonusAndBuyoutKPIHRSchema(many=True)



class spGetFactNewJoineeExpenseInfoSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('FactNewJoineeExpenseInfoId'
                  ,'RecruiterEmailId'
                  ,'RecruiterName'
                  ,'HrEmailId'
                  ,'HrName'
                  ,'EmployeeNumber'
                  ,'EmployeeName'
                  ,'DateofJoining'
                  ,'DimCostCenter'
                  ,'DimCostCenterId'
                  ,'DimHead'
                  ,'DimHeadId'
                  ,'ClawBackDurationInMonths'
                  ,'TotalExpense'
                  ,'DimExpenseStatus'
                  ,'DimExpenseStatusId'
                  ,'TargetRecordCreatedBy')         
            

sp_get_fact_new_joinee_expense_info_schema = spGetFactNewJoineeExpenseInfoSchema(many=True)