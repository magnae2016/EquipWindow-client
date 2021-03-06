import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import 'moment/locale/ko'
import axios from 'axios'
import './ScreenTime.css'
import ScreenTimeCard from '@/components/UI/organisms/ScreenTimeCard'
import MostUsedCard from '@/components/UI/organisms/MostUsedCard'
import NotificationsCard from '@/components/UI/organisms/NotificationsCard'

function ScreenTime(params) {
    const [currentDate, setCurrentDate] = useState(
        moment().local().format('YYYY-MM-DD')
    )
    const [errors, setErrors] = useState([])
    const [downs, setDowns] = useState([])
    const [updatedAt, setUpdatedAt] = useState('')
    const [dates, setDates] = useState([])
    const subtract7days = moment(currentDate, 'YYYY-MM-DD')
        .subtract(13, 'days')
        .format('YYYY-MM-DD')

    function handleChangeCurrentDate(date) {
        setCurrentDate(date)
    }

    const promise1 = axios.get('/api/v1/alarms/error', {
        params: {
            startDate: subtract7days,
        },
    })

    const promise2 = axios.get('/api/v1/alarms/down', {
        params: {
            startDate: subtract7days,
        },
    })

    useEffect(() => {
        async function fetchData() {
            const [response1, response2] = await Promise.all([
                promise1,
                promise2,
            ])
            setErrors(response1.data.datas)
            setDowns(response2.data.datas)
            setUpdatedAt(response1.data.last_update_time)
            setDates(response1.data.datas.map((element) => element['DATE']))
        }
        fetchData()
    }, [])

    return (
        <div className="page">
            <div className="navbars">
                <div className="navbar navbar-current hide">
                    <div className="appbar">
                        <div className="appbar-inner">
                            <div className="left">
                                <a className="link back">
                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                    <span className="if-not-md">
                                        ????????? ??????
                                    </span>
                                </a>
                            </div>
                            <div className="title">?????? ??????</div>
                        </div>
                    </div>
                    <div className="navbar-bg">
                        <div className="navbar-inner">
                            <div className="left">
                                <a className="link back">
                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                </a>
                            </div>
                            <div className="title">
                                {moment(currentDate).format('M??? D??? dddd')}
                            </div>
                            <div className="right">
                                <a className="link after">
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar">
                    <div className="appbar">
                        <div className="appbar-inner">
                            <div className="title">?????? ????????????</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block">
                <div className="page-content">
                    <div className="subnavbar">
                        <div className="subnavbar-inner">
                            <div className="segmented">
                                <a href="#tab1" className="button tab-link">
                                    ???
                                </a>
                                <a
                                    href="#tab2"
                                    className="button tab-link tab-link-active"
                                >
                                    ???
                                </a>
                            </div>
                        </div>
                    </div>
                    <ScreenTimeCard
                        errors={errors}
                        downs={downs}
                        updatedAt={updatedAt}
                        dates={dates}
                        currentDate={currentDate}
                        onChangeCurrentDate={handleChangeCurrentDate}
                    />
                    <MostUsedCard currentDate={currentDate} />
                    <NotificationsCard
                        error={errors}
                        down={downs}
                        currentDate={currentDate}
                    />
                </div>
            </div>
        </div>
    )
}

export default ScreenTime
