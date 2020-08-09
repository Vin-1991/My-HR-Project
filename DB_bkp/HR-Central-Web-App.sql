USE [master]
GO
/****** Object:  Database [HR-Central_WebApp]    Script Date: 8/10/2020 1:19:13 AM ******/
CREATE DATABASE [HR-Central_WebApp]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'HR-Central_WebApp', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\HR-Central_WebApp.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'HR-Central_WebApp_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\HR-Central_WebApp_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [HR-Central_WebApp] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [HR-Central_WebApp].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [HR-Central_WebApp] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET ARITHABORT OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [HR-Central_WebApp] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [HR-Central_WebApp] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET  DISABLE_BROKER 
GO
ALTER DATABASE [HR-Central_WebApp] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [HR-Central_WebApp] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [HR-Central_WebApp] SET  MULTI_USER 
GO
ALTER DATABASE [HR-Central_WebApp] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [HR-Central_WebApp] SET DB_CHAINING OFF 
GO
ALTER DATABASE [HR-Central_WebApp] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [HR-Central_WebApp] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [HR-Central_WebApp] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [HR-Central_WebApp] SET QUERY_STORE = OFF
GO
USE [HR-Central_WebApp]
GO
/****** Object:  Table [dbo].[TblDimAccessRoles]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimAccessRoles](
	[DimAccessRolesId] [int] IDENTITY(1,1) NOT NULL,
	[DimAccessRoles] [varchar](200) NOT NULL,
	[isActive] [bit] NOT NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DimAccessRolesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDimCostCenter]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimCostCenter](
	[DimCostCenterId] [int] IDENTITY(1,1) NOT NULL,
	[DimCostCenter] [varchar](200) NULL,
	[isActive] [bit] NOT NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DimCostCenterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDimExpenseStatus]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimExpenseStatus](
	[DimExpenseStatusId] [int] IDENTITY(1,1) NOT NULL,
	[DimExpenseStatus] [varchar](200) NULL,
	[DimExpenseStatusDisplayStatus] [varchar](200) NULL,
	[AccessRole] [varchar](200) NULL,
	[isActive] [bit] NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DimExpenseStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDimHead]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimHead](
	[DimHeadId] [int] IDENTITY(1,1) NOT NULL,
	[DimHead] [varchar](200) NULL,
	[isActive] [bit] NOT NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DimHeadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDimRecruiterHrMapping]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimRecruiterHrMapping](
	[DimRecruiterHrMappingId] [int] IDENTITY(1,1) NOT NULL,
	[RecruiterEmailId] [varchar](200) NULL,
	[RecruiterName] [varchar](200) NULL,
	[HrEmailId] [varchar](200) NULL,
	[HrName] [varchar](200) NULL,
	[isActive] [bit] NOT NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DimRecruiterHrMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDimShiftAllowanceStatus]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimShiftAllowanceStatus](
	[DimShiftAllowanceStatusId] [int] IDENTITY(1,1) NOT NULL,
	[ShiftAllowanceStatus] [varchar](200) NULL,
	[ShiftAllowanceDisplayStatus] [varchar](200) NULL,
	[AccessRole] [varchar](200) NULL,
	[isActive] [bit] NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DimShiftAllowanceStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDimShiftDays]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimShiftDays](
	[Day] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDimShiftMonth]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimShiftMonth](
	[DimShiftMonthId] [int] IDENTITY(1,1) NOT NULL,
	[ShiftMonth] [varchar](200) NOT NULL,
	[isActive] [bit] NOT NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DimShiftMonthId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDimShiftType]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimShiftType](
	[DimShiftTypeId] [int] IDENTITY(1,1) NOT NULL,
	[ShiftType] [varchar](200) NOT NULL,
	[ShiftALlowancePerDay] [int] NOT NULL,
	[isActive] [bit] NOT NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DimShiftTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblDimShiftYear]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblDimShiftYear](
	[DimShiftYearId] [int] IDENTITY(1,1) NOT NULL,
	[ShiftYear] [int] NOT NULL,
	[isActive] [bit] NOT NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DimShiftYearId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblEmployee]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblEmployee](
	[EmployeeName] [varchar](200) NULL,
	[EmployeeEmailId] [varchar](200) NULL,
	[EmployeeNumber] [varchar](200) NULL,
	[ManagerName] [varchar](200) NULL,
	[Designation] [varchar](200) NULL,
	[Location] [varchar](200) NULL,
	[CostCenter] [varchar](200) NULL,
	[EmpGeo] [varchar](200) NULL,
	[ManagerEmailId] [varchar](100) NULL,
	[HrEmailID] [varchar](100) NULL,
	[HrName] [varchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblFactEmployeeShiftAllowance]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblFactEmployeeShiftAllowance](
	[FactEmployeeShiftAllowanceId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeEmailId] [varchar](200) NULL,
	[ManagerEmailId] [varchar](100) NULL,
	[HrEmailId] [varchar](100) NULL,
	[ShiftMonth] [varchar](100) NULL,
	[ShiftYear] [varchar](100) NULL,
	[DimShiftTypeId] [int] NULL,
	[NoOfDaysWorked] [int] NULL,
	[TotalShiftAllowance] [int] NULL,
	[DimShiftAllowanceStatusId] [int] NULL,
	[ShiftAllowanceRejectionComments] [varchar](max) NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblFactEmployeeShiftAllowanceSummary]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblFactEmployeeShiftAllowanceSummary](
	[TblFactEmployeeShiftAllowanceSummaryId] [int] IDENTITY(10000,1) NOT NULL,
	[EmployeeEmailId] [varchar](200) NULL,
	[ManagerEmailId] [varchar](100) NULL,
	[HrEmailId] [varchar](100) NULL,
	[ShiftMonth] [varchar](100) NULL,
	[ShiftYear] [varchar](100) NULL,
	[DimShiftTypeId] [int] NULL,
	[NoOfDaysWorked] [int] NULL,
	[TotalShiftAllowance] [int] NULL,
	[DimShiftAllowanceStatusId] [int] NULL,
	[ShiftAllowanceRejectionComments] [varchar](max) NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
	[TargetRecordModifiedDate] [datetime2](4) NOT NULL,
	[TargetRecordModifiedBy] [nvarchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TblFactNewJoineeExpenseInfo]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TblFactNewJoineeExpenseInfo](
	[FactNewJoineeExpenseInfoId] [int] IDENTITY(10000,1) NOT NULL,
	[RecruiterEmailId] [varchar](200) NULL,
	[HrEmailId] [varchar](200) NULL,
	[EmployeeNumber] [varchar](100) NULL,
	[EmployeeName] [varchar](200) NOT NULL,
	[DateofJoining] [date] NOT NULL,
	[DimCostCenterId] [int] NULL,
	[DimHeadId] [int] NULL,
	[ClawBackDurationInMonths] [int] NULL,
	[TotalExpense] [int] NULL,
	[DimExpenseStatusId] [int] NULL,
	[TargetRecordCreatedDate] [datetime2](4) NOT NULL,
	[TargetRecordCreatedBy] [nvarchar](50) NOT NULL,
	[TargetRecordModifiedDate] [datetime2](4) NOT NULL,
	[TargetRecordModifiedBy] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[TblDimAccessRoles] ON 

INSERT [dbo].[TblDimAccessRoles] ([DimAccessRolesId], [DimAccessRoles], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (1, N'User', 1, CAST(N'2020-08-08T13:18:09.7334000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimAccessRoles] ([DimAccessRolesId], [DimAccessRoles], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (2, N'Manager', 1, CAST(N'2020-08-08T13:18:09.7334000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimAccessRoles] ([DimAccessRolesId], [DimAccessRoles], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (3, N'HR', 1, CAST(N'2020-08-08T13:18:09.7334000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimAccessRoles] ([DimAccessRolesId], [DimAccessRoles], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (4, N'Recruiter', 1, CAST(N'2020-08-08T13:18:09.7334000' AS DateTime2), N'KTRAININD\vinayaggarwal')
SET IDENTITY_INSERT [dbo].[TblDimAccessRoles] OFF
SET IDENTITY_INSERT [dbo].[TblDimCostCenter] ON 

INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (1, N'Advisory Tech-Cloud Analytics', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (2, N'Data & Analytics', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (3, N'IT Advisory', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (4, N'KTech-ES', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (5, N'KTECH-RDC', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (6, N'MC- KBS D&A support', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (7, N'MC-App Support', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (8, N'MC-CH - Data & Analytics', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (9, N'MC-CH-Global D&A', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (10, N'MC-Data Science', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (11, N'MC-GDN-D&A', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (12, N'MC-IT Advisory-EIM', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (13, N'MC-IT Advisory-NLBI', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (14, N'MC-TE-Lighthouse', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (15, N'SGI-Blockchain-CoE-D&A', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (16, N'SGI-LH-CoE', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimCostCenter] ([DimCostCenterId], [DimCostCenter], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (17, N'Tech-DSS', 1, CAST(N'2020-08-09T12:31:03.8487000' AS DateTime2), N'KTRAININD\vinayaggarwal')
SET IDENTITY_INSERT [dbo].[TblDimCostCenter] OFF
SET IDENTITY_INSERT [dbo].[TblDimExpenseStatus] ON 

INSERT [dbo].[TblDimExpenseStatus] ([DimExpenseStatusId], [DimExpenseStatus], [DimExpenseStatusDisplayStatus], [AccessRole], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (1, N'Pending With HR', N'Submit', N'Recruiter', 1, CAST(N'2020-08-09T12:31:03.8827000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimExpenseStatus] ([DimExpenseStatusId], [DimExpenseStatus], [DimExpenseStatusDisplayStatus], [AccessRole], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (2, N'Disbursed', N'Pay', N'Hr', 1, CAST(N'2020-08-09T12:31:03.8827000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimExpenseStatus] ([DimExpenseStatusId], [DimExpenseStatus], [DimExpenseStatusDisplayStatus], [AccessRole], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (3, N'Rejected', N'Reject', N'Hr', 1, CAST(N'2020-08-09T12:31:03.8827000' AS DateTime2), N'KTRAININD\vinayaggarwal')
SET IDENTITY_INSERT [dbo].[TblDimExpenseStatus] OFF
SET IDENTITY_INSERT [dbo].[TblDimHead] ON 

INSERT [dbo].[TblDimHead] ([DimHeadId], [DimHead], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (1, N'Joining bonus', 1, CAST(N'2020-08-09T12:31:03.8597000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimHead] ([DimHeadId], [DimHead], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (2, N'Notice buyout', 1, CAST(N'2020-08-09T12:31:03.8597000' AS DateTime2), N'KTRAININD\vinayaggarwal')
SET IDENTITY_INSERT [dbo].[TblDimHead] OFF
SET IDENTITY_INSERT [dbo].[TblDimRecruiterHrMapping] ON 

INSERT [dbo].[TblDimRecruiterHrMapping] ([DimRecruiterHrMappingId], [RecruiterEmailId], [RecruiterName], [HrEmailId], [HrName], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (1, N'SonalSingh@kpmg.com', N'Singh,Sonal', N'PriyankaSingh@kpg.com', N'Singh, Priyanka', 1, CAST(N'2020-08-09T12:31:03.8417000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimRecruiterHrMapping] ([DimRecruiterHrMappingId], [RecruiterEmailId], [RecruiterName], [HrEmailId], [HrName], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (2, N'PriyaBansal@kpg.com', N'Bansal,Priya', N'PriyankaSingh@kpg.com', N'Singh, Priyanka', 1, CAST(N'2020-08-09T12:31:03.8427000' AS DateTime2), N'KTRAININD\vinayaggarwal')
SET IDENTITY_INSERT [dbo].[TblDimRecruiterHrMapping] OFF
SET IDENTITY_INSERT [dbo].[TblDimShiftAllowanceStatus] ON 

INSERT [dbo].[TblDimShiftAllowanceStatus] ([DimShiftAllowanceStatusId], [ShiftAllowanceStatus], [ShiftAllowanceDisplayStatus], [AccessRole], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (1, N'Pending With Manager', N'Submit', N'User', 1, CAST(N'2020-08-08T13:18:10.0264000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftAllowanceStatus] ([DimShiftAllowanceStatusId], [ShiftAllowanceStatus], [ShiftAllowanceDisplayStatus], [AccessRole], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (2, N'Approved by Manager', N'Approve', N'Manager', 1, CAST(N'2020-08-08T13:18:10.0264000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftAllowanceStatus] ([DimShiftAllowanceStatusId], [ShiftAllowanceStatus], [ShiftAllowanceDisplayStatus], [AccessRole], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (3, N'Rejected by Manager', N'Reject', N'Manager', 1, CAST(N'2020-08-08T13:18:10.0264000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftAllowanceStatus] ([DimShiftAllowanceStatusId], [ShiftAllowanceStatus], [ShiftAllowanceDisplayStatus], [AccessRole], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (4, N'Approved by HR', N'Approve', N'HR', 1, CAST(N'2020-08-08T13:18:10.0264000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftAllowanceStatus] ([DimShiftAllowanceStatusId], [ShiftAllowanceStatus], [ShiftAllowanceDisplayStatus], [AccessRole], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (5, N'Rejected by HR', N'Reject', N'HR', 1, CAST(N'2020-08-08T13:18:10.0264000' AS DateTime2), N'KTRAININD\vinayaggarwal')
SET IDENTITY_INSERT [dbo].[TblDimShiftAllowanceStatus] OFF
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (1, N'Day1')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (2, N'Day2')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (3, N'Day3')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (4, N'Day4')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (5, N'Day5')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (6, N'Day6')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (7, N'Day7')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (8, N'Day8')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (9, N'Day9')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (10, N'Day10')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (11, N'Day11')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (12, N'Day12')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (13, N'Day13')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (14, N'Day14')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (15, N'Day15')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (16, N'Day16')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (17, N'Day17')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (18, N'Day18')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (19, N'Day19')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (20, N'Day20')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (21, N'Day21')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (22, N'Day22')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (23, N'Day23')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (24, N'Day24')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (25, N'Day25')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (26, N'Day26')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (27, N'Day27')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (28, N'Day28')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (29, N'Day29')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (30, N'Day30')
INSERT [dbo].[TblDimShiftDays] ([Day], [Name]) VALUES (31, N'Day31')
SET IDENTITY_INSERT [dbo].[TblDimShiftMonth] ON 

INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (1, N'Jan-Feb', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (2, N'Feb-Mar', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (3, N'Mar-Apr', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (4, N'Apr-May', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (5, N'May-Jun', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (6, N'Jun-Jul', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (7, N'Jul-Aug', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (8, N'Aug-Sep', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (9, N'Sep-Oct', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (10, N'Oct-Nov', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (11, N'Nov-Dec', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftMonth] ([DimShiftMonthId], [ShiftMonth], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (12, N'Dec-Jan', 1, CAST(N'2020-08-08T13:18:09.7464000' AS DateTime2), N'KTRAININD\vinayaggarwal')
SET IDENTITY_INSERT [dbo].[TblDimShiftMonth] OFF
SET IDENTITY_INSERT [dbo].[TblDimShiftType] ON 

INSERT [dbo].[TblDimShiftType] ([DimShiftTypeId], [ShiftType], [ShiftALlowancePerDay], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (1, N'10:00PM - 07:00AM', 200, 1, CAST(N'2020-08-08T13:18:09.8910000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftType] ([DimShiftTypeId], [ShiftType], [ShiftALlowancePerDay], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (2, N'02:00PM - 10:30PM', 200, 1, CAST(N'2020-08-08T13:18:09.8910000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftType] ([DimShiftTypeId], [ShiftType], [ShiftALlowancePerDay], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (3, N'05:00PM - 01:30PM', 200, 1, CAST(N'2020-08-08T13:18:09.8910000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftType] ([DimShiftTypeId], [ShiftType], [ShiftALlowancePerDay], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (4, N'03:00PM - 11:30PM', 400, 1, CAST(N'2020-08-08T13:18:09.8910000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftType] ([DimShiftTypeId], [ShiftType], [ShiftALlowancePerDay], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (5, N'07:00AM - 03:30PM', 500, 1, CAST(N'2020-08-08T13:18:09.8910000' AS DateTime2), N'KTRAININD\vinayaggarwal')
SET IDENTITY_INSERT [dbo].[TblDimShiftType] OFF
SET IDENTITY_INSERT [dbo].[TblDimShiftYear] ON 

INSERT [dbo].[TblDimShiftYear] ([DimShiftYearId], [ShiftYear], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (1, 2020, 1, CAST(N'2020-08-08T13:18:09.8377000' AS DateTime2), N'KTRAININD\vinayaggarwal')
INSERT [dbo].[TblDimShiftYear] ([DimShiftYearId], [ShiftYear], [isActive], [TargetRecordCreatedDate], [TargetRecordCreatedBy]) VALUES (2, 2021, 1, CAST(N'2020-08-08T13:18:09.8377000' AS DateTime2), N'KTRAININD\vinayaggarwal')
SET IDENTITY_INSERT [dbo].[TblDimShiftYear] OFF
INSERT [dbo].[TblEmployee] ([EmployeeName], [EmployeeEmailId], [EmployeeNumber], [ManagerName], [Designation], [Location], [CostCenter], [EmpGeo], [ManagerEmailId], [HrEmailID], [HrName]) VALUES (N'Bhardwaj,Neeraj', N'NeerajBhardwaj@kpg.com', N'1234', N'Jain, Shradha', N'Consultant', N'BLR-1', N'Data & Analytics', N'US', N'ShradhaJain@kpg.com', N'PriyankaSingh@kpg.com', N'Singh, Priyanka')
INSERT [dbo].[TblEmployee] ([EmployeeName], [EmployeeEmailId], [EmployeeNumber], [ManagerName], [Designation], [Location], [CostCenter], [EmpGeo], [ManagerEmailId], [HrEmailID], [HrName]) VALUES (N'Goel,Vijay', N'VijayGoel@kpg.com', N'5678', N'Mahajan, Ajay', N'Associate Consultant', N'BLR-1', N'IT Advisory', N'UK', N'AjayMahajan@kpg.com', N'TwinkleSharma@kpg.com', N'Sharma, Twinkle')
INSERT [dbo].[TblEmployee] ([EmployeeName], [EmployeeEmailId], [EmployeeNumber], [ManagerName], [Designation], [Location], [CostCenter], [EmpGeo], [ManagerEmailId], [HrEmailID], [HrName]) VALUES (N'Jain, Shradha', N'ShradhaJain@kpg.com', N'8910', N'Smith, Peter', N'Manager', N'BLR-1', N'Data & Analytics', N'US', N'PeterSmith@kpg.com', N'PriyankaSingh@kpg.com', N'Singh, Priyanka')
INSERT [dbo].[TblEmployee] ([EmployeeName], [EmployeeEmailId], [EmployeeNumber], [ManagerName], [Designation], [Location], [CostCenter], [EmpGeo], [ManagerEmailId], [HrEmailID], [HrName]) VALUES (N'Mahajan, Ajay', N'AjayMahajan@kpg.com', N'1112', N'Taylor, George', N'Manager', N'BLR-1', N'IT Advisory', N'UK', N'GeorgeTaylor@kpg.com', N'TwinkleSharma@kpg.com', N'Sharma, Twinkle')
INSERT [dbo].[TblEmployee] ([EmployeeName], [EmployeeEmailId], [EmployeeNumber], [ManagerName], [Designation], [Location], [CostCenter], [EmpGeo], [ManagerEmailId], [HrEmailID], [HrName]) VALUES (N'Singh, Priyanka', N'PriyankaSingh@kpg.com', N'1314', N'Shah, Monica', N'HR', N'BLR-1', N'Data & Analytics', N'US', N'MonicaShah@kpg.com', N'RupaWalia@kpg.com', N'Walia, Rupa')
INSERT [dbo].[TblEmployee] ([EmployeeName], [EmployeeEmailId], [EmployeeNumber], [ManagerName], [Designation], [Location], [CostCenter], [EmpGeo], [ManagerEmailId], [HrEmailID], [HrName]) VALUES (N'Sharma, Twinkle', N'TwinkleSharma@kpg.com', N'1415', N'Gill, Shreya', N'HR', N'BLR-1', N'IT Advisory', N'UK', N'ShreyaGill@kpg.com', N'RupaWalia@kpg.com', N'Walia, Rupa')
ALTER TABLE [dbo].[TblDimAccessRoles] ADD  CONSTRAINT [DF_TblDimAccessRoles_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[TblDimAccessRoles] ADD  CONSTRAINT [DF_TblDimAccessRoles_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblDimAccessRoles] ADD  CONSTRAINT [DF_TblDimAccessRoles_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblDimCostCenter] ADD  CONSTRAINT [DF_DimCostCenter_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[TblDimCostCenter] ADD  CONSTRAINT [DF_TblDimCostCenter_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblDimCostCenter] ADD  CONSTRAINT [DF_TblDimCostCenter_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblDimExpenseStatus] ADD  CONSTRAINT [DF_TblDimExpenseStatus_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[TblDimExpenseStatus] ADD  CONSTRAINT [DF_TblDimExpenseStatus_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblDimExpenseStatus] ADD  CONSTRAINT [DF_TblDimExpenseStatus_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblDimHead] ADD  CONSTRAINT [DF_DimHead_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[TblDimHead] ADD  CONSTRAINT [DF_TblDimHead_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblDimHead] ADD  CONSTRAINT [DF_TblDimHead_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblDimRecruiterHrMapping] ADD  CONSTRAINT [DF_DimRecruiterHrMapping_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[TblDimRecruiterHrMapping] ADD  CONSTRAINT [DF_TblDimRecruiterHrMapping_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblDimRecruiterHrMapping] ADD  CONSTRAINT [DF_TblDimRecruiterHrMapping_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblDimShiftAllowanceStatus] ADD  CONSTRAINT [DF_TblDimShiftActionType_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[TblDimShiftAllowanceStatus] ADD  CONSTRAINT [DF_TblDimShiftAllowanceStatus_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblDimShiftAllowanceStatus] ADD  CONSTRAINT [DF_TblDimShiftAllowanceStatus_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblDimShiftMonth] ADD  CONSTRAINT [DF_TblDimShiftMonth_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[TblDimShiftMonth] ADD  CONSTRAINT [DF_TblDimShiftMonth_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblDimShiftMonth] ADD  CONSTRAINT [DF_TblDimShiftMonth_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblDimShiftType] ADD  CONSTRAINT [DF_TblDimShiftType_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[TblDimShiftType] ADD  CONSTRAINT [DF_TblDimShiftType_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblDimShiftType] ADD  CONSTRAINT [DF_TblDimShiftType_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblDimShiftYear] ADD  CONSTRAINT [DF_TblDimShiftYear_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[TblDimShiftYear] ADD  CONSTRAINT [DF_TblDimShiftYear_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblDimShiftYear] ADD  CONSTRAINT [DF_TblDimShiftYear_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowance] ADD  CONSTRAINT [DF_TblFactEmployeeShiftAllowance_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowance] ADD  CONSTRAINT [DF_TblFactEmployeeShiftAllowance_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowanceSummary] ADD  CONSTRAINT [DF_TblFactEmployeeShiftAllowanceSummary_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowanceSummary] ADD  CONSTRAINT [DF_TblFactEmployeeShiftAllowanceSummary_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowanceSummary] ADD  CONSTRAINT [DF_TblFactEmployeeShiftAllowanceSummary_TargetRecordModifiedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordModifiedDate]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowanceSummary] ADD  CONSTRAINT [DF_TblFactEmployeeShiftAllowanceSummary_TargetRecordModifiedBy]  DEFAULT (original_login()) FOR [TargetRecordModifiedBy]
GO
ALTER TABLE [dbo].[TblFactNewJoineeExpenseInfo] ADD  CONSTRAINT [DF_TblFactNewJoineeExpenseInfo_TargetRecordCreatedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordCreatedDate]
GO
ALTER TABLE [dbo].[TblFactNewJoineeExpenseInfo] ADD  CONSTRAINT [DF_TblFactNewJoineeExpenseInfo_TargetRecordCreatedBy]  DEFAULT (original_login()) FOR [TargetRecordCreatedBy]
GO
ALTER TABLE [dbo].[TblFactNewJoineeExpenseInfo] ADD  CONSTRAINT [DF_TblFactNewJoineeExpenseInfo_TargetRecordModifiedDate]  DEFAULT (sysdatetime()) FOR [TargetRecordModifiedDate]
GO
ALTER TABLE [dbo].[TblFactNewJoineeExpenseInfo] ADD  CONSTRAINT [DF_TblFactNewJoineeExpenseInfo_TargetRecordModifiedBy]  DEFAULT (original_login()) FOR [TargetRecordModifiedBy]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowance]  WITH CHECK ADD  CONSTRAINT [FK_TblFactEmployeeShiftAllowance_DimShiftAllowanceStatusId] FOREIGN KEY([DimShiftAllowanceStatusId])
REFERENCES [dbo].[TblDimShiftAllowanceStatus] ([DimShiftAllowanceStatusId])
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowance] CHECK CONSTRAINT [FK_TblFactEmployeeShiftAllowance_DimShiftAllowanceStatusId]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowance]  WITH CHECK ADD  CONSTRAINT [FK_TblFactEmployeeShiftAllowance_DimShiftTypeId] FOREIGN KEY([DimShiftTypeId])
REFERENCES [dbo].[TblDimShiftType] ([DimShiftTypeId])
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowance] CHECK CONSTRAINT [FK_TblFactEmployeeShiftAllowance_DimShiftTypeId]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowanceSummary]  WITH CHECK ADD  CONSTRAINT [FK_TblFactEmployeeShiftAllowanceSummary_DimShiftAllowanceStatusId] FOREIGN KEY([DimShiftAllowanceStatusId])
REFERENCES [dbo].[TblDimShiftAllowanceStatus] ([DimShiftAllowanceStatusId])
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowanceSummary] CHECK CONSTRAINT [FK_TblFactEmployeeShiftAllowanceSummary_DimShiftAllowanceStatusId]
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowanceSummary]  WITH CHECK ADD  CONSTRAINT [FK_TblFactEmployeeShiftAllowanceSummary_DimShiftTypeId] FOREIGN KEY([DimShiftTypeId])
REFERENCES [dbo].[TblDimShiftType] ([DimShiftTypeId])
GO
ALTER TABLE [dbo].[TblFactEmployeeShiftAllowanceSummary] CHECK CONSTRAINT [FK_TblFactEmployeeShiftAllowanceSummary_DimShiftTypeId]
GO
ALTER TABLE [dbo].[TblFactNewJoineeExpenseInfo]  WITH CHECK ADD  CONSTRAINT [FK_TblFactNewJoineeExpenseInfo_DimShiftTypeId] FOREIGN KEY([DimHeadId])
REFERENCES [dbo].[TblDimHead] ([DimHeadId])
GO
ALTER TABLE [dbo].[TblFactNewJoineeExpenseInfo] CHECK CONSTRAINT [FK_TblFactNewJoineeExpenseInfo_DimShiftTypeId]
GO
/****** Object:  StoredProcedure [dbo].[spGetBonusAndBuyoutKPIHR]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetBonusAndBuyoutKPIHR] (@EmployeeEmailId VARCHAR(200))
AS
   SET NOCOUNT ON;
   BEGIN
      DROP TABLE IF EXISTS #tempKPI;
      CREATE TABLE #tempKPI
      (
         EmployeeEmailId VARCHAR(200)
         , Pending INT
         , Approved INT
         , Rejected INT
         , AmountDisbursed INT
      );

         INSERT INTO #tempKPI (EmployeeEmailId, Pending, Approved, Rejected, AmountDisbursed)
         SELECT @EmployeeEmailId
            , (
                 SELECT COUNT( 1 )
                 FROM dbo.TblFactNewJoineeExpenseInfo AS summ1
                 WHERE summ1.HrEmailId = @EmployeeEmailId
                    AND summ1.DimExpenseStatusId = 1
              )
            , (
                 SELECT COUNT( 1 )
                 FROM dbo.TblFactNewJoineeExpenseInfo AS summ1
                 WHERE summ1.HrEmailId = @EmployeeEmailId
                    AND summ1.DimExpenseStatusId = 2
              )
            , (
                 SELECT COUNT( 1 )
                 FROM dbo.TblFactNewJoineeExpenseInfo AS summ1
                 WHERE summ1.HrEmailId = @EmployeeEmailId
                    AND summ1.DimExpenseStatusId =3
              )
            , ISNULL((
                        SELECT SUM( summ1.TotalExpense )
                        FROM dbo.TblFactNewJoineeExpenseInfo AS summ1
                        WHERE summ1.HrEmailId = @EmployeeEmailId
                           AND summ1.DimExpenseStatusId = 2
                     ), 0
                    );
 

      SELECT EmployeeEmailId, Pending, Approved, Rejected, AmountDisbursed
      FROM #tempKPI;

   END;
GO
/****** Object:  StoredProcedure [dbo].[spGetEmployeeDetailsbyEmail]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetEmployeeDetailsbyEmail] (@email VARCHAR(200))
AS


   SELECT DISTINCT emp.EmployeeName
      , emp.EmployeeEmailId
      , emp.EmployeeNumber
      , emp.ManagerName
      , emp.Designation
      , emp.Location
      , emp.CostCenter
      , emp.EmpGeo
      , emp.ManagerEmailId
      , emp.HrEmailID
      , emp.HrName
      , CASE
           WHEN Man.ManagerEmailId IS NOT NULL THEN 'Manager'
           WHEN Hr.HrEmailID IS NOT NULL THEN 'HR'
           ELSE 'User'
        END AS UserRole
   FROM dbo.TblEmployee AS emp
   LEFT JOIN dbo.TblEmployee AS Hr ON Hr.HrEmailID = emp.EmployeeEmailId
   LEFT JOIN dbo.TblEmployee AS Man ON Man.ManagerEmailId = emp.EmployeeEmailId
   WHERE emp.EmployeeEmailId = @email
  
   UNION ALL

   
   SELECT DISTINCT emp.RecruiterName AS EmployeeName
      , emp.RecruiterEmailId AS EmployeeEmailId
      , '' AS EmployeeNumber
      , '' AS ManagerName
      , '' AS Designation
      , '' AS Location
      , '' AS CostCenter
      , '' AS EmpGeo
      , '' AS ManagerEmailId
      , emp.HrEmailID
      , emp.HrName
      , 'Recruiter' AS UserRole
   FROM dbo.TblDimRecruiterHrMapping AS emp
   WHERE emp.RecruiterEmailId = @email
   ;
GO
/****** Object:  StoredProcedure [dbo].[spGetFactNewJoineeExpenseInfo]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetFactNewJoineeExpenseInfo]
(
   @RecruiterEmailId VARCHAR(200)
   , @HrEmailId VARCHAR(200)
   , @EmployeeNumber VARCHAR(100)
   , @EmployeeName VARCHAR(200)
   , @DateofJoining DATE
   , @DimCostCenterId INT
   , @DimHeadId INT
   , @ClawBackDurationInMonths INT
   , @TotalExpense INT
   , @DimExpenseStatusId INT
   , @TargetRecordCreatedBy NVARCHAR(50)
)
AS
   SET NOCOUNT ON;
   BEGIN
      SELECT summ.FactNewJoineeExpenseInfoId
         , summ.RecruiterEmailId
         , emp.RecruiterName
         , summ.HrEmailId
         , emp.HrName
         , summ.EmployeeNumber
         , summ.EmployeeName
         , summ.DateofJoining
         , dc.DimCostCenter
         , dimh.DimHead
         , summ.ClawBackDurationInMonths
         , summ.TotalExpense
         , dim.DimExpenseStatus
      FROM dbo.TblFactNewJoineeExpenseInfo AS summ
      INNER JOIN dbo.TblDimRecruiterHrMapping AS emp ON emp.HrEmailId = summ.HrEmailId
                                                        AND emp.RecruiterEmailId = summ.RecruiterEmailId
      INNER JOIN dbo.TblDimExpenseStatus AS dim ON summ.DimExpenseStatusId = dim.DimExpenseStatusId
      INNER JOIN dbo.TblDimHead AS dimh ON summ.DimHeadId = dimh.DimHeadId
      INNER JOIN dbo.TblDimCostCenter AS dc ON summ.DimCostCenterId = dc.DimCostCenterId
      WHERE summ.RecruiterEmailId = @RecruiterEmailId
         AND summ.HrEmailId = @HrEmailId
         AND summ.EmployeeNumber = @EmployeeNumber
         AND summ.EmployeeName = @EmployeeName
         AND summ.DateofJoining = @DateofJoining
         AND summ.DimCostCenterId = @DimCostCenterId
         AND summ.DimHeadId = @DimHeadId
         AND summ.ClawBackDurationInMonths = @ClawBackDurationInMonths
         AND summ.TotalExpense = @TotalExpense
         AND summ.DimExpenseStatusId = @DimExpenseStatusId;


   END;
GO
/****** Object:  StoredProcedure [dbo].[spGetHREmailForPendingShiftAllowance]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetHREmailForPendingShiftAllowance]
AS
   SET NOCOUNT ON;
   BEGIN

      SELECT DISTINCT summ.HrEmailId
      FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ
      WHERE summ.DimShiftAllowanceStatusId = 2;
   END;
GO
/****** Object:  StoredProcedure [dbo].[spGetRecordForMailFromTblFactEmployeeShiftAllowanceAndSummary]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetRecordForMailFromTblFactEmployeeShiftAllowanceAndSummary]
(
   @EmployeeEmailId VARCHAR(200)
   , @ManagerEmailId VARCHAR(100)
   , @HrEmailId VARCHAR(100)
   , @ShiftMonth VARCHAR(100)
   , @ShiftYear VARCHAR(100)
   , @DimShiftTypeId INT
   , @NoOfDaysWorked INT
   , @TotalShiftAllowance INT
   , @DimShiftAllowanceStatusId INT
   , @ShiftAllowanceRejectionComments VARCHAR(MAX)
)
AS
BEGIN

   SELECT summ.TblFactEmployeeShiftAllowanceSummaryId
      , summ.EmployeeEmailId
      , emp.EmployeeName
      , summ.ManagerEmailId
      , emp.ManagerName
      , summ.HrEmailId
      , emp.HrName
      , summ.ShiftMonth
      , summ.ShiftYear
      , dim.ShiftType
      , summ.NoOfDaysWorked
      , summ.TotalShiftAllowance
      , allow.ShiftAllowanceStatus
      , summ.ShiftAllowanceRejectionComments
   FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ
   INNER JOIN dbo.TblEmployee AS emp ON emp.EmployeeEmailId = summ.EmployeeEmailId
   INNER JOIN dbo.TblDimShiftType AS dim ON summ.DimShiftTypeId = dim.DimShiftTypeId
   INNER JOIN dbo.TblDimShiftAllowanceStatus AS allow ON allow.DimShiftAllowanceStatusId = summ.DimShiftAllowanceStatusId
   WHERE summ.EmployeeEmailId = @EmployeeEmailId
      AND summ.EmployeeEmailId = @EmployeeEmailId
      AND summ.ManagerEmailId = @ManagerEmailId
      AND summ.HrEmailId = @HrEmailId
      AND summ.ShiftMonth = @ShiftMonth
      AND summ.ShiftYear = @ShiftYear
      AND summ.DimShiftTypeId = @DimShiftTypeId
      AND summ.NoOfDaysWorked = @NoOfDaysWorked
      AND summ.TotalShiftAllowance = @TotalShiftAllowance
      AND summ.DimShiftAllowanceStatusId = @DimShiftAllowanceStatusId;

END;
GO
/****** Object:  StoredProcedure [dbo].[spGetShiftAllowanceKPIFromShiftAllowanceAndSummaryForManagerAndHR]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetShiftAllowanceKPIFromShiftAllowanceAndSummaryForManagerAndHR] (@EmployeeEmailId VARCHAR(200), @UserRole VARCHAR(200))
AS
SET NOCOUNT ON;
   BEGIN
      DROP TABLE IF EXISTS #tempKPI;
      CREATE TABLE #tempKPI
      (
         EmployeeEmailId VARCHAR(200)
         , Pending INT
         , Approved INT
         , Rejected INT
         , AmountDisbursed INT
      );
      IF (@UserRole = 'Manager')
      BEGIN
         INSERT INTO #tempKPI (EmployeeEmailId, Pending, Approved, Rejected, AmountDisbursed)
         SELECT @EmployeeEmailId
            , (
                 SELECT COUNT( 1 )
                 FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ1
                 WHERE summ1.ManagerEmailId = @EmployeeEmailId
                    AND summ1.DimShiftAllowanceStatusId = 1
              )
            , (
                 SELECT COUNT( 1 )
                 FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ1
                 WHERE summ1.ManagerEmailId = @EmployeeEmailId
                    AND summ1.DimShiftAllowanceStatusId in( 2,4)
              )
            , (
                 SELECT COUNT( 1 )
                 FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ1
                 WHERE summ1.ManagerEmailId = @EmployeeEmailId
                    AND summ1.DimShiftAllowanceStatusId = 3
              )
            , ISNULL((
                        SELECT SUM( summ1.TotalShiftAllowance )
                        FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ1
                        WHERE summ1.ManagerEmailId = @EmployeeEmailId
                           AND summ1.DimShiftAllowanceStatusId = 4
                     ), 0
                    );
      END;
      IF (@UserRole = 'HR')
      BEGIN
         INSERT INTO #tempKPI (EmployeeEmailId, Pending, Approved, Rejected, AmountDisbursed)
         SELECT @EmployeeEmailId
            , (
                 SELECT COUNT( 1 )
                 FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ1
                 WHERE summ1.HrEmailId = @EmployeeEmailId
                    AND summ1.DimShiftAllowanceStatusId = 2
              )
            , (
                 SELECT COUNT( 1 )
                 FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ1
                 WHERE summ1.HrEmailId = @EmployeeEmailId
                    AND summ1.DimShiftAllowanceStatusId = 4
              )
            , (
                 SELECT COUNT( 1 )
                 FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ1
                 WHERE summ1.HrEmailId = @EmployeeEmailId
                    AND summ1.DimShiftAllowanceStatusId = 5
              )
            , ISNULL((
                        SELECT SUM( summ1.TotalShiftAllowance )
                        FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ1
                        WHERE summ1.HrEmailId = @EmployeeEmailId
                           AND summ1.DimShiftAllowanceStatusId = 4
                     ), 0
                    );
      END;

      SELECT EmployeeEmailId, Pending, Approved, Rejected, AmountDisbursed
      FROM #tempKPI;

   END;

GO
/****** Object:  StoredProcedure [dbo].[spGetTblDimAccessRoles]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblDimAccessRoles]
AS
   SELECT DimAccessRolesId, DimAccessRoles
   FROM dbo.TblDimAccessRoles
   WHERE isActive = 1;
GO
/****** Object:  StoredProcedure [dbo].[spGetTblDimCostCenter]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblDimCostCenter]
AS
   SET NOCOUNT ON;
   SELECT DimCostCenterId, DimCostCenter
   FROM dbo.TblDimCostCenter
   WHERE isActive = 1;

GO
/****** Object:  StoredProcedure [dbo].[spGetTblDimExpenseStatus]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblDimExpenseStatus] (@AccessRole VARCHAR(200))
AS
   SET NOCOUNT ON;
   SELECT DimExpenseStatusId, DimExpenseStatus, DimExpenseStatusDisplayStatus
   FROM dbo.TblDimExpenseStatus
   WHERE isActive = 1
      AND AccessRole = @AccessRole;
GO
/****** Object:  StoredProcedure [dbo].[spGetTblDimHead]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblDimHead]
AS
   SET NOCOUNT ON;
   SELECT DimHeadId, DimHead
   FROM dbo.TblDimHead
   WHERE isActive = 1;

GO
/****** Object:  StoredProcedure [dbo].[spGetTblDimRecruiterHrMapping]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblDimRecruiterHrMapping]
AS
   SET NOCOUNT ON;
   SELECT DimRecruiterHrMappingId, RecruiterEmailId, RecruiterName, HrEmailId, HrName
   FROM dbo.TblDimRecruiterHrMapping
   WHERE isActive = 1;
GO
/****** Object:  StoredProcedure [dbo].[spGetTblDimShiftAllowanceStatus]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblDimShiftAllowanceStatus] (@AccessRole VARCHAR(200))
AS
   SELECT DimShiftAllowanceStatusId, ShiftAllowanceStatus
   FROM dbo.TblDimShiftAllowanceStatus
   WHERE isActive = 1
      AND AccessRole = @AccessRole;
GO
/****** Object:  StoredProcedure [dbo].[spGetTblDimShiftMonth]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblDimShiftMonth]
AS
   SELECT DimShiftMonthId, ShiftMonth
   FROM dbo.TblDimShiftMonth
   WHERE isActive = 1;
GO
/****** Object:  StoredProcedure [dbo].[spGetTblDimShiftType]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblDimShiftType]
AS
   SELECT DimShiftTypeId, ShiftType, ShiftALlowancePerDay
   FROM dbo.TblDimShiftType
   WHERE isActive = 1;
GO
/****** Object:  StoredProcedure [dbo].[spGetTblDimShiftYear]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblDimShiftYear]
AS
   SELECT DimShiftYearId, ShiftYear
   FROM dbo.TblDimShiftYear
   WHERE isActive = 1;
GO
/****** Object:  StoredProcedure [dbo].[spGetTblFactEmployeeShiftAllowanceAndSummary]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblFactEmployeeShiftAllowanceAndSummary] (@EmployeeEmailId VARCHAR(200))
AS
   BEGIN

      SELECT summ.TblFactEmployeeShiftAllowanceSummaryId
         , summ.EmployeeEmailId
         , emp.EmployeeName
         , summ.ManagerEmailId
         , emp.ManagerName
         , summ.HrEmailId
         , emp.HrName
         , summ.ShiftMonth
         , summ.ShiftYear
         , dim.ShiftType
         , summ.NoOfDaysWorked
         , summ.TotalShiftAllowance
         , allow.ShiftAllowanceStatus
         , summ.ShiftAllowanceRejectionComments
      FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ
      INNER JOIN dbo.TblEmployee AS emp ON emp.EmployeeEmailId = summ.EmployeeEmailId
      INNER JOIN dbo.TblDimShiftType AS dim ON summ.DimShiftTypeId = dim.DimShiftTypeId
      INNER JOIN dbo.TblDimShiftAllowanceStatus AS allow ON allow.DimShiftAllowanceStatusId = summ.DimShiftAllowanceStatusId
      WHERE summ.EmployeeEmailId = @EmployeeEmailId
      ORDER BY summ.TblFactEmployeeShiftAllowanceSummaryId DESC;
   END;

GO
/****** Object:  StoredProcedure [dbo].[spGetTblFactEmployeeShiftAllowanceAndSummaryForManagerAndHR]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblFactEmployeeShiftAllowanceAndSummaryForManagerAndHR] (@EmployeeEmailId VARCHAR(200))
AS
   BEGIN

      SELECT summ.TblFactEmployeeShiftAllowanceSummaryId
         , summ.EmployeeEmailId
         , emp.EmployeeName
         , summ.ManagerEmailId
         , emp.ManagerName
         , summ.HrEmailId
         , emp.HrName
         , summ.ShiftMonth
         , summ.ShiftYear
         , dim.ShiftType
         , summ.NoOfDaysWorked
         , summ.TotalShiftAllowance
         , CASE
              WHEN summ.ManagerEmailId = @EmployeeEmailId
                 AND allow.ShiftAllowanceStatus = 'Pending with Manager' THEN 'Pending with you'
		      WHEN summ.ManagerEmailId = @EmployeeEmailId
                 AND allow.ShiftAllowanceStatus = 'Rejected by Manager' THEN 'Rejected by you'
              WHEN summ.HrEmailId = @EmployeeEmailId
                 AND allow.ShiftAllowanceStatus = 'Approved by Manager' THEN 'Pending with you'
              WHEN summ.ManagerEmailId = @EmployeeEmailId
                 AND allow.ShiftAllowanceStatus = 'Approved by Manager' THEN 'Pending with HR'
			  WHEN summ.HrEmailId = @EmployeeEmailId
                 AND allow.ShiftAllowanceStatus = 'Rejected by HR' THEN 'Rejected by you'
              WHEN summ.HrEmailId = @EmployeeEmailId
                 AND allow.ShiftAllowanceStatus = 'Approved by HR' THEN 'Approved'
              ELSE allow.ShiftAllowanceStatus
           END AS ShiftAllowanceStatus
         , summ.ShiftAllowanceRejectionComments
      FROM dbo.TblFactEmployeeShiftAllowanceSummary AS summ
      INNER JOIN dbo.TblEmployee AS emp ON emp.EmployeeEmailId = summ.EmployeeEmailId
      INNER JOIN dbo.TblDimShiftType AS dim ON summ.DimShiftTypeId = dim.DimShiftTypeId
      INNER JOIN dbo.TblDimShiftAllowanceStatus AS allow ON allow.DimShiftAllowanceStatusId = summ.DimShiftAllowanceStatusId
      WHERE (summ.ManagerEmailId = @EmployeeEmailId OR summ.HrEmailId = @EmployeeEmailId)
      ORDER BY summ.TblFactEmployeeShiftAllowanceSummaryId DESC;
   END;

GO
/****** Object:  StoredProcedure [dbo].[spGetTblFactNewJoineeExpenseInfoForHR]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetTblFactNewJoineeExpenseInfoForHR] (@EmployeeEmailId VARCHAR(200))
AS
   SET NOCOUNT ON;
   BEGIN

      SELECT summ.FactNewJoineeExpenseInfoId
         , summ.RecruiterEmailId
         , emp.RecruiterName
         , summ.HrEmailId
         , emp.HrName
         , summ.DateofJoining
         , dc.DimCostCenter
         , summ.EmployeeNumber
         , summ.EmployeeName
         , summ.DimHeadId
         , summ.ClawBackDurationInMonths
         , summ.TotalExpense
         , dimh.Dimhead
         , CASE
              WHEN summ.HrEmailId = @EmployeeEmailId
                 AND dim.DimExpenseStatus = 'Pending with HR' THEN 'Pending with you'
              ELSE dim.DimExpenseStatus
           END AS DimExpenseStatus
      FROM dbo.TblFactNewJoineeExpenseInfo AS summ
      INNER JOIN dbo.TblDimRecruiterHrMapping AS emp ON emp.HrEmailId = summ.HrEmailId
                                                        AND emp.RecruiterEmailId = summ.RecruiterEmailId
                                                        AND (emp.HrEmailId = @EmployeeEmailId OR summ.RecruiterEmailId = @EmployeeEmailId)
      INNER JOIN dbo.TblDimExpenseStatus AS dim ON summ.DimExpenseStatusId = dim.DimExpenseStatusId
      INNER JOIN dbo.TblDimHead AS dimh ON summ.DimHeadId = dimh.DimHeadId
      INNER JOIN dbo.TblDimCostCenter AS dc ON summ.DimCostCenterId = dc.DimCostCenterId
      ORDER BY summ.FactNewJoineeExpenseInfoId DESC;
   END;


   /*******************************************************************/


GO
/****** Object:  StoredProcedure [dbo].[spInsertUpdateTblFactEmployeeShiftAllowanceAndSummary]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spInsertUpdateTblFactEmployeeShiftAllowanceAndSummary]
(
   @EmployeeEmailId VARCHAR(200)
   , @ManagerEmailId VARCHAR(100)
   , @HrEmailId VARCHAR(100)
   , @ShiftMonth VARCHAR(100)
   , @ShiftYear VARCHAR(100)
   , @DimShiftTypeId INT
   , @NoOfDaysWorked INT
   , @TotalShiftAllowance INT
   , @DimShiftAllowanceStatusId INT
   , @ShiftAllowanceRejectionComments VARCHAR(MAX)
   , @TargetRecordCreatedBy NVARCHAR(50)
)
AS
   SET NOCOUNT ON;
   BEGIN
      BEGIN TRY

         INSERT INTO dbo.TblFactEmployeeShiftAllowance
         (
            EmployeeEmailId
            , ManagerEmailId
            , HrEmailId
            , ShiftMonth
            , ShiftYear
            , DimShiftTypeId
            , NoOfDaysWorked
            , TotalShiftAllowance
            , DimShiftAllowanceStatusId
            , ShiftAllowanceRejectionComments
            , TargetRecordCreatedBy
            , TargetRecordCreatedDate
         )
         SELECT @EmployeeEmailId
            , @ManagerEmailId
            , @HrEmailId
            , @ShiftMonth
            , @ShiftYear
            , @DimShiftTypeId
            , @NoOfDaysWorked
            , @TotalShiftAllowance
            , @DimShiftAllowanceStatusId
            , @ShiftAllowanceRejectionComments
            , @TargetRecordCreatedBy
            , SYSDATETIME();

         IF NOT EXISTS
         (
            SELECT TOP 1 1
            FROM dbo.TblFactEmployeeShiftAllowanceSummary
            WHERE EmployeeEmailId = @EmployeeEmailId
               AND ShiftMonth = @ShiftMonth
               AND ShiftYear = @ShiftYear
               AND DimShiftTypeId = @DimShiftTypeId
         )
         BEGIN

            INSERT INTO dbo.TblFactEmployeeShiftAllowanceSummary
            (
               EmployeeEmailId
               , ManagerEmailId
               , HrEmailId
               , ShiftMonth
               , ShiftYear
               , DimShiftTypeId
               , NoOfDaysWorked
               , TotalShiftAllowance
               , DimShiftAllowanceStatusId
               , ShiftAllowanceRejectionComments
               , TargetRecordCreatedBy
               , TargetRecordCreatedDate
               , TargetRecordModifiedBy
               , TargetRecordModifiedDate
            )
            SELECT @EmployeeEmailId
               , @ManagerEmailId
               , @HrEmailId
               , @ShiftMonth
               , @ShiftYear
               , @DimShiftTypeId
               , @NoOfDaysWorked
               , @TotalShiftAllowance
               , @DimShiftAllowanceStatusId
               , @ShiftAllowanceRejectionComments
               , @TargetRecordCreatedBy
               , SYSDATETIME()
               , @TargetRecordCreatedBy
               , SYSDATETIME();

         END;
         ELSE
         BEGIN
            UPDATE dbo.TblFactEmployeeShiftAllowanceSummary
            SET NoOfDaysWorked = @NoOfDaysWorked
               , TotalShiftAllowance = @TotalShiftAllowance
               , DimShiftAllowanceStatusId = @DimShiftAllowanceStatusId
               , ShiftAllowanceRejectionComments = @ShiftAllowanceRejectionComments
               , TargetRecordModifiedBy = @TargetRecordCreatedBy
               , TargetRecordModifiedDate = SYSDATETIME()
            WHERE EmployeeEmailId = @EmployeeEmailId
               AND ShiftMonth = @ShiftMonth
               AND ShiftYear = @ShiftYear
               AND DimShiftTypeId = @DimShiftTypeId;


         END;
         SELECT @EmployeeEmailId AS EmployeeEmailId
            , @ManagerEmailId AS ManagerEmailId
            , @HrEmailId AS HrEmailId
            , @ShiftMonth AS ShiftMonth
            , @ShiftYear AS ShiftYear
            , @DimShiftTypeId AS DimShiftTypeId
            , @NoOfDaysWorked AS NoOfDaysWorked
            , @TotalShiftAllowance AS TotalShiftAllowance
            , @DimShiftAllowanceStatusId AS DimShiftAllowanceStatusId
            , @TargetRecordCreatedBy AS TargetRecordCreatedBy;

      END TRY
      BEGIN CATCH
         SELECT 0;
      END CATCH;
   END;

GO
/****** Object:  StoredProcedure [dbo].[spInsertUpdateTblFactNewJoineeExpenseInfo]    Script Date: 8/10/2020 1:19:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spInsertUpdateTblFactNewJoineeExpenseInfo]
(
   @RecruiterEmailId VARCHAR(200)
   , @HrEmailId VARCHAR(200)
   , @EmployeeNumber VARCHAR(100)
   , @EmployeeName VARCHAR(200)
   , @DateofJoining DATE
   , @DimCostCenterId INT
   , @DimHeadId INT
   , @ClawBackDurationInMonths INT
   , @TotalExpense INT
   , @DimExpenseStatusId INT
   , @TargetRecordCreatedBy NVARCHAR(50)
)
AS
   SET NOCOUNT ON;
   BEGIN
      BEGIN TRY

         IF NOT EXISTS
         (
            SELECT TOP 1 1
            FROM dbo.TblFactNewJoineeExpenseInfo
            WHERE EmployeeNumber = @EmployeeNumber
               AND EmployeeName = @EmployeeName
               AND DimHeadId = @DimHeadId
         )
         BEGIN

            INSERT INTO dbo.TblFactNewJoineeExpenseInfo
            (
               RecruiterEmailId
               , HrEmailId
               , EmployeeNumber
               , EmployeeName
               , DateofJoining
               , DimCostCenterId
               , DimHeadId
               , ClawBackDurationInMonths
               , TotalExpense
               , DimExpenseStatusId
               , TargetRecordCreatedDate
               , TargetRecordCreatedBy
               , TargetRecordModifiedDate
               , TargetRecordModifiedBy
            )
            SELECT @RecruiterEmailId
               , @HrEmailId
               , @EmployeeNumber
               , @EmployeeName
               , @DateofJoining
               , @DimCostCenterId
               , @DimHeadId
               , @ClawBackDurationInMonths
               , @TotalExpense
               , @DimExpenseStatusId
               , SYSDATETIME()
               , @TargetRecordCreatedBy
               , SYSDATETIME()
               , @TargetRecordCreatedBy;
         END;
         ELSE
         BEGIN
            UPDATE dbo.TblFactNewJoineeExpenseInfo
            SET RecruiterEmailId = @RecruiterEmailId
               , HrEmailId = @HrEmailId
               , DateofJoining = @DateofJoining
               , ClawBackDurationInMonths = @ClawBackDurationInMonths
               , TotalExpense = @TotalExpense
               , DimExpenseStatusId = @DimExpenseStatusId
               , DimCostCenterId = @DimCostCenterId
               , TargetRecordModifiedBy = @TargetRecordCreatedBy
               , TargetRecordModifiedDate = SYSDATETIME()
            WHERE EmployeeNumber = @EmployeeNumber
               AND EmployeeName = @EmployeeName
               AND DimHeadId = @DimHeadId;


         END;
         SELECT 1;

      END TRY
      BEGIN CATCH
         SELECT 0;
      END CATCH;
   END;




   SELECT *
   FROM dbo.TblFactNewJoineeExpenseInfo;
GO
USE [master]
GO
ALTER DATABASE [HR-Central_WebApp] SET  READ_WRITE 
GO
