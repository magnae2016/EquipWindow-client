import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/ko'
import axios from 'axios'
import ScreenTimeStackedBarChart from '@/components/UI/atoms/ScreenTimeStackedBarChart'
import BatteryPerformanceBarChart from '@/components/UI/atoms/BatteryPerformanceBarChart'

function ScreenTimeCard({ currentDate }) {
    const date = moment(currentDate)
    const [errors, setErrors] = useState([])
    const [downs, setDowns] = useState([])
    const [increment, setIncrement] = useState([])
    const [incrementSign, setIncrementSign] = useState([])
    const [updatedAt, setUpdatedAt] = useState('')
    const [activeIndex, setActiveIndex] = useState(6)
    const subtract7days = date.clone().subtract(6, 'days').format('YYYY-MM-DD')
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
            setUpdatedAt(response1.last_update_time)
        }
        fetchData()
    }, [])

    const handleClick = useCallback(
        (entry, index) => {
            console.log(index)
            async function fetchData() {
                console.log(1234)
                const response = await axios.get('/api/v1/alarms/increment')
                console.log(response.data)
                setIncrement(response.data)
                const df = response.data.map((element) => element['diff'])
                const av = df.reduce((a, b) => a + b, 0) / df.length
                console.log(av)
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
        [setActiveIndex]
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
                            {date.format('M월 D일 dddd')}
                        </div>
                        <div className="item-title-row">
                            <div className="item-title">
                                {t.slice(-1)[0] &&
                                    t.slice(-1)[0].toLocaleString()}
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
                                                        {t.slice(-1)[0] &&
                                                            t
                                                                .slice(-1)[0]
                                                                .toLocaleString()}{' '}
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
                                                        {er.slice(-1)[0] &&
                                                            er
                                                                .slice(-1)[0]
                                                                .toLocaleString()}{' '}
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
                                                        {dd.slice(-1)[0] &&
                                                            dd
                                                                .slice(-1)[0]
                                                                .toLocaleString()}{' '}
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
                {moment().diff(moment(updatedAt)) == 0
                    ? '오늘'
                    : moment(updatedAt).format('YYYY-mm-dd')}{' '}
                {moment(updatedAt).format('A HH:mm')}에 업데이트 됨
            </div>
        </div>
    )
}
export default ScreenTimeCard
