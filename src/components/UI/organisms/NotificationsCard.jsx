import moment from 'moment'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './NotificationsCard.css'
import BatteryPerformanceBarChart from '@/components/UI/atoms/BatteryPerformanceBarChart'
import NotificationsStackedBarChart from '@/components/UI/atoms/NotificationsStackedBarChart'

function ListItem({ EVENT_NAME, COUNT }) {
    return (
        <li>
            <div className="item-content">
                <div className="item-media">
                    <i className="icon icon-f7">
                        {EVENT_NAME[0].toUpperCase()}
                    </i>
                </div>
                <div className="item-inner">
                    <div className="item-title">{EVENT_NAME}</div>
                    <div className="item-after">
                        {COUNT.toLocaleString()} 건
                    </div>
                </div>
            </div>
        </li>
    )
}

function NotificationsCard({ currentDate, error = [], down = [] }) {
    const [filter, setFilter] = useState('error')
    const [target, setTarget] = useState([])
    const [parent, setParent] = useState([])
    const [increment, setIncrement] = useState([])
    const [incrementSign, setIncrementSign] = useState([])
    const [consumed, setConsumed] = useState(0)
    const [consumedCount, setConsumedCount] = useState(0)
    const [order, setOrder] = useState([])
    const promise1 = axios.get('/api/v1/alarms/increment', {
        params: { startDate: currentDate },
    })

    const promise2 = axios.get(`/api/v1/alarms/increment/${filter}`, {
        params: { startDate: currentDate },
    })

    const promise3 = axios.get(`/api/v1/alarms/${filter}/consumed`, {
        params: { startDate: currentDate },
    })

    const promise4 = axios.get(`/api/v1/alarms/${filter}/order`, {
        params: { startDate: currentDate },
    })

    useEffect(() => {
        async function fetchData() {
            const [response1, response2, response3, response4] =
                await Promise.all([promise1, promise2, promise3, promise4])
            setParent(response1.data)
            setIncrement(response2.data)
            setConsumed(Number(response3.data[0].CONSUMED))
            setConsumedCount(Number(response3.data[0].COUNT))
            setOrder(response4.data)
            if (filter == 'error') setTarget([...error])
            else setTarget([...down])
            const df = response2.data.map((element) => element['diff'])
            const av = df.reduce((a, b) => a + b, 0) / df.length
            setIncrementSign(
                df.map((element, i) => {
                    return Object.assign(
                        {},
                        { Hour: response2.data[i].Hour, diff: element - av }
                    )
                })
            )
        }
        fetchData()
    }, [currentDate, filter])

    function handleClickFilter(f) {
        setFilter(f)
    }

    let c = []
    parent.forEach((element, index) => {
        if (increment.length > 0) {
            const pv = increment[index].diff
            c.push({
                name: element.Hour,
                amt: element.diff - increment[index].diff,
                pv: increment[index].diff,
            })
        }
    })

    let hh = [...incrementSign]
        .sort((d1, d2) => d2.diff - d1.diff)
        .slice(0, 5)
        .map((d) => d.Hour)
    let hl = [...incrementSign]
        .sort((d1, d2) => d1.diff - d2.diff)
        .slice(0, 5)
        .map((d) => d.Hour)

    let COUNT = 0
    if (target.length > 0) {
        const result = target.find((error) => error.DATE == currentDate)
        if (result) COUNT = result.COUNT
    }

    let av = undefined
    if (consumedCount != 0) {
        av = new Date((consumed / consumedCount) * 1000)
            .toISOString()
            .substr(11, 8)
    }

    return (
        <div>
            <div className="card card-expandable" style={{ marginTop: 38 }}>
                <div className="subnavbar">
                    <div className="subnavbar-inner">
                        <div className="segmented">
                            <a
                                href="#tab1"
                                className={
                                    filter === 'error'
                                        ? 'button tab-link tab-link-active'
                                        : 'button tab-link'
                                }
                                onClick={() => handleClickFilter('error')}
                            >
                                Error
                            </a>
                            <a
                                href="#tab2"
                                className={
                                    filter === 'down'
                                        ? 'button tab-link tab-link-active'
                                        : 'button tab-link'
                                }
                                onClick={() => handleClickFilter('down')}
                            >
                                Down
                            </a>
                        </div>
                    </div>
                </div>
                <div className="item-divider">
                    <div className="block-title">
                        에러 알람 발생 건 수: {COUNT.toLocaleString()}건
                    </div>
                    <div className="item-text">
                        {moment(currentDate).format('M월 D일 dddd')}
                    </div>
                </div>
                <div className="chart-area">
                    <div className="list-group-title">
                        10분 단위 신규 알람 건 수
                    </div>
                    <div className="chart">
                        <NotificationsStackedBarChart
                            data={c}
                            syncId="anyId2"
                        />
                    </div>
                </div>
                <div className="chart-area">
                    <div className="list-group-title">변화량</div>
                    <div className="chart">
                        <BatteryPerformanceBarChart
                            syncId="anyId2"
                            data={incrementSign}
                            fill="#d1d1d6"
                            hh={hh}
                            hl={hl}
                        />
                    </div>
                </div>
                <div className="item-content">
                    <div className="item-inner">
                        <div className="item-row">
                            <div className="item-cell">
                                <div className="item-title">에러 타임</div>
                                <div className="item-subtitle">
                                    {new Date(consumed * 1000)
                                        .toISOString()
                                        .substr(11, 8)}
                                </div>
                            </div>
                            <div className="item-cell">
                                <div className="item-title">
                                    에러 해지까지 평균 소요 시간
                                </div>
                                <div className="item-subtitle">{av}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-head-label">최다 발생 알람 순</div>
            </div>
            <div className="list medium-inset">
                <ul>
                    {order.length > 0 &&
                        order.map((element, index) => (
                            <ListItem
                                key={index}
                                EVENT_NAME={element.EVENT_NAME}
                                COUNT={element.COUNT}
                            />
                        ))}
                </ul>
            </div>
        </div>
    )
}

export default NotificationsCard
