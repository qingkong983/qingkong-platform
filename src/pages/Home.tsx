import React, {useEffect} from 'react'

import logoSvg from '../../assets/img/logo.svg'
import { Footer } from "antd/es/layout/layout";
import {CalendarService} from "../services/CalendarService";

export default () => {
    useEffect(()=>{
        CalendarService.listCalendar().then(res=>{
            console.log(res)
        })
    },[])
    return (
        <div className={'footer'}>
            <Footer style={{ textAlign: 'center' }}>qingkong ©2021 Created by tzhangm</Footer>
        </div>
    )
}
