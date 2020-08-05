import './scss/index.scss'
import { Router } from '@core/routes/Router'
import { DashboardPage } from '@root/pages/DashboardPage'
import { ExcelPage } from '@root/pages/ExcelPage'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
