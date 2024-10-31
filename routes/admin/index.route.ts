import { systemConfig } from '../../config/config'
import {dashboardRoutes} from './dashboard.route'
import {Express} from "express"
const adminRoutes=(app:Express)=>{
    const PATH_ADMIN=systemConfig.prefixAdmin
    app.use(`/${PATH_ADMIN}/dashboard`, dashboardRoutes)
}

export default adminRoutes