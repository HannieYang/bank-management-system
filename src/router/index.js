import { createRouter, createWebHashHistory } from 'vue-router'
import UserLoginView from '../views/UserLoginView.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import EmployeeLoginView from '../views/EmployeeLoginView.vue'
import UserSystemView from '../views/UserSystemView.vue'
import OpenAccountsView from '../views/user_system/OpenAccountsView.vue'
import CloseAccountsView from '../views/user_system/CloseAccountsView.vue'
import ExchangeView from '../views/user_system/ExchangeView.vue'
import ManageOperatorsView from '../views/user_system/ManageOperatorsView.vue'
import SaveMoneyView from '../views/user_system/SaveMoneyView.vue'
import SearchView from '../views/user_system/SearchView.vue'
import WithdrawMoneyView from '../views/user_system/WithdrawMoneyView.vue'
import ModifyPasswordView from '../views/user_system/ModifyPasswordView.vue'
import EmployeeSystemView from '../views/EmployeeSystemView.vue'
import EOpenAccountsView from '../views/employee_system/EOpenAccountsView.vue'
import ECloseAccountsView from '../views/employee_system/ECloseAccountsView.vue'
import EExchangeView from '../views/employee_system/EExchangeView.vue'
import ESaveMoneyView from '../views/employee_system/ESaveMoneyView.vue'
import ESearchView from '../views/employee_system/ESearchView.vue'
import EWithdrawMoneyView from '../views/employee_system/EWithdrawMoneyView.vue'
import AccountManagementView from '../views/employee_system/AccountManagementView.vue'
import BussinessManagemeView from '../views/employee_system/BussinessManagemeView.vue'
import DailyPosterView from '../views/employee_system/DailyPosterView.vue'
import CheckView from '../views/employee_system/CheckView.vue'
import OperationReportView from '../views/employee_system/OperationReportView.vue'
import ReportView from '../views/employee_system/ReportView.vue'
import SectionManagementView from '../views/employee_system/SectionManagementView.vue'
import EmployeeManagementView from '../views/employee_system/EmployeeManagementView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
        path: '/userlogin',
        name: 'userLogin',
        component: UserLoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/employeelogin',
      name: 'employeeLogin',
      component: EmployeeLoginView,
    },
    {
      path: '/usersystem',
      name: 'userSystem',
      component: UserSystemView,
      children:[{
        path: '/usersystem/openaccounts',
        name: 'openAccounts',
        component: OpenAccountsView,
      },{
        path: '/usersystem/closeaccounts',
        name: 'closeAccounts',
        component: CloseAccountsView,
      },{
        path: '/usersystem/exchange',
        name: 'exchange',
        component: ExchangeView,
      },{
        path: '/usersystem/manageoperators',
        name: 'manageOperators',
        component: ManageOperatorsView,
      },{
        path: '/usersystem/savemoney',
        name: 'saveMoney',
        component: SaveMoneyView,
      },{
        path: '/usersystem/search',
        name: 'search',
        component: SearchView,
      },{
        path: '/usersystem/withdrawmoney',
        name: 'withdrawMoney',
        component: WithdrawMoneyView,
      },{
        path: '/usersystem/modifypassword',
        name: 'modifyPassword',
        component: ModifyPasswordView,
      }]
    },
    {
      path: '/employeesystem',
      name: 'employeeSystem',
      component: EmployeeSystemView,
      children:[{
        path: '/employeesystem/openaccounts',
        name: 'eopenAccounts',
        component: EOpenAccountsView,
      },{
        path: '/employeesystem/closeaccounts',
        name: 'ecloseAccounts',
        component: ECloseAccountsView,
      },{
        path: '/employeesystem/exchange',
        name: 'eexchange',
        component: EExchangeView,
      },{
        path: '/employeesystem/savemoney',
        name: 'esaveMoney',
        component: ESaveMoneyView,
      },{
        path: '/employeesystem/search',
        name: 'esearch',
        component: ESearchView,
      },{
        path: '/employeesystem/withdrawmoney',
        name: 'ewithdrawMoney',
        component: EWithdrawMoneyView,
      },{
        path: '/employeesystem/accountmanagement',
        name: 'accountmanagement',
        component: AccountManagementView,
      },{
        path: '/employeesystem/dailyposter',
        name: 'dailyposter',
        component: DailyPosterView,
      },{
        path: '/employeesystem/sectionmanagement',
        name: 'sectionmanagement',
        component: SectionManagementView,
      },{
        path: '/employeesystem/businessmanagement',
        name: 'businessmanagement',
        component: BussinessManagemeView,
      },{
        path: '/employeesystem/employeemanagement',
        name: 'employeemanagement',
        component: EmployeeManagementView,
      },{
        path: '/employeesystem/check',
        name: 'check',
        component: CheckView,
      },{
        path: '/employeesystem/report',
        name: 'report',
        component: ReportView,
      },{
        path: '/employeesystem/operationreport',
        name: 'operationreport',
        component: OperationReportView,
      }]
    },
  ]
})

export default router
