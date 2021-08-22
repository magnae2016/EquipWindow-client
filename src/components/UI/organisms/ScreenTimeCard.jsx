import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/ko'
import axios from 'axios'
import ScreenTimeStackedBarChart from '@/components/UI/atoms/ScreenTimeStackedBarChart'
import BatteryPerformanceBarChart from '@/components/UI/atoms/BatteryPerformanceBarChart'

function ScreenTimeCard({ currentDate }) {
    const date = moment(currentDate)
    const [dates, setDates] = useState([])
    const [errors, setErrors] = useState([])
    const [downs, setDowns] = useState([])
    const [increment, setIncrement] = useState([])
    const [incrementSign, setIncrementSign] = useState([])
    const [updatedAt, setUpdatedAt] = useState('')
    const [activeIndex, setActiveIndex] = useState(undefined)
    const subtract7days = date.clone().subtract(6, 'days').format('YYYY-MM-DD')
    const formatString = 'M월 D일 dddd'
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

    const promise3 = axios.get('/api/v1/alarms/increment', {
        params: {
            startDate: date.format('YYYY-MM-DD'),
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

    const handleClick = useCallback(
        (entry, index) => {
            async function fetchData() {
                const response = await axios.get('/api/v1/alarms/increment', {
                    params: { startDate: dates[index] },
                })
                setIncrement(response.data)
                const df = response.data.map((element) => element['diff'])
                const av = df.reduce((a, b) => a + b, 0) / df.length
                setIncrementSign(
                    df.map((element, i) => {
                        return Object.assign(
                            {},
                            { Hour: response.data[i].Hour, diff: element - av }
                        )
                    })
                )
            }
            fetchData()
            setActiveIndex(index)
        },
        [setActiveIndex, dates]
    )

    const d = errors.map((element) => element['DATE'])
    const er = errors.map((element) => element['COUNT'])
    const dd = downs.map((element) => element['COUNT'])
    const t = Array(d.length)
        .fill(0)
        .map((e, i) => er[i] + dd[i])
    const a = t.reduce((a, b) => a + b, 0) / d.length

    let c = []
    d.forEach((element, index) => {
        const dayOfWeek = moment(element, 'YYYY-MM-DD').format('ddd')
        if (activeIndex == index) {
            c.push({ name: dayOfWeek, uv: er[index], pv: dd[index] })
            return
        }
        c.push({ name: dayOfWeek, amt: t[index] })
    })
    return (
        <div>
            <div className="block-title">알람 발생 현황</div>
            <div className="card">
                <div className="card-header">
                    <div className="item-inner">
                        <div className="item-subtitle">
                            {dates[activeIndex]
                                ? moment(dates[activeIndex]).format(
                                      formatString
                                  )
                                : moment(dates.slice(-2)[0]).format(
                                      formatString
                                  )}
                        </div>
                        <div className="item-title-row">
                            <div className="item-title">
                                {t[activeIndex]
                                    ? t[activeIndex].toLocaleString()
                                    : t.slice(-1)[0]}{' '}
                                건
                            </div>
                            {/* <div className="item-text">
                                <ion-icon name="arrow-up-circle"></ion-icon>
                                지난주 대비 95%
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="card-content">
                    <div className="chart">
                        <ScreenTimeStackedBarChart
                            data={c}
                            y={a}
                            handleClick={handleClick}
                        />
                    </div>
                    {activeIndex != undefined && (
                        <div>
                            <div className="chart">
                                <BatteryPerformanceBarChart
                                    syncId="anyId"
                                    data={increment}
                                    fill="#34c759"
                                />
                            </div>
                            <div className="chart">
                                <BatteryPerformanceBarChart
                                    syncId="anyId"
                                    data={incrementSign}
                                    fill="#aeaeb2"
                                />
                            </div>
                        </div>
                    )}
                    <div className="list">
                        <ul>
                            <li>
                                <div className="item-content">
                                    <div className="item-inner item-cell">
                                        <div className="item-row">
                                            <div className="item-cell">
                                                <div>
                                                    <div className="item-title">
                                                        <div className="item-header">
                                                            전체 알람
                                                        </div>
                                                        {t[activeIndex]
                                                            ? t[
                                                                  activeIndex
                                                              ].toLocaleString()
                                                            : t.slice(
                                                                  -1
                                                              )[0]}{' '}
                                                        건
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-cell">
                                                <div>
                                                    <div className="item-title">
                                                        <div className="item-header error">
                                                            Error 알람
                                                        </div>
                                                        {er[activeIndex]
                                                            ? er[
                                                                  activeIndex
                                                              ].toLocaleString()
                                                            : er.slice(
                                                                  -1
                                                              )[0]}{' '}
                                                        건
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-cell">
                                                <div>
                                                    <div className="item-title">
                                                        <div className="item-header down">
                                                            Down 알람
                                                        </div>
                                                        {dd[activeIndex]
                                                            ? dd[
                                                                  activeIndex
                                                              ].toLocaleString()
                                                            : dd.slice(
                                                                  -1
                                                              )[0]}{' '}
                                                        건
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className="card-footer">
                    <div className="item-content">
                        <div className="item-inner">
                            <div className="item-title">총 스크린 타임</div>
                            <div className="item-after">77시간 1분</div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="block-footer">
                {/* moment(SpecialToDate).isSame(moment(), 'day'); */}
                {moment(updatedAt, 'YYYY-MM-DD HH:mm:ss').isSame(
                    moment(),
                    'day'
                )
                    ? '오늘'
                    : moment(updatedAt, 'YYYY-MM-DD HH:mm:ss').format(
                          'YYYY-mm-dd'
                      )}{' '}
                {moment(updatedAt).format('A HH:mm')}에 업데이트 됨
            </div>
        </div>
    )
}
export default ScreenTimeCard
