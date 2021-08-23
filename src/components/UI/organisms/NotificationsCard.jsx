import moment from 'moment'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './NotificationsCard.css'
import BatteryPerformanceBarChart from '@/components/UI/atoms/BatteryPerformanceBarChart'
import NotificationsStackedBarChart from '@/components/UI/atoms/NotificationsStackedBarChart'

function NotificationsCard({ currentDate }) {
    const [parent, setParent] = useState([])
    const [increment, setIncrement] = useState([])
    const [incrementSign, setIncrementSign] = useState([])

    const promise1 = axios.get('/api/v1/alarms/increment', {
        params: { startDate: currentDate },
    })

    const promise2 = axios.get('/api/v1/alarms/increment/error', {
        params: { startDate: currentDate },
    })

    useEffect(() => {
        async function fetchData() {
            const [response1, response2] = await Promise.all([
                promise1,
                promise2,
            ])

            setParent(response1.data)
            setIncrement(response2.data)
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
    }, [currentDate])

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

    return (
        <div>
            <div className="card card-expandable" style={{ marginTop: 38 }}>
                <div className="subnavbar">
                    <div className="subnavbar-inner">
                        <div className="segmented">
                            <a
                                href="#tab1"
                                className="button tab-link tab-link-active"
                            >
                                Error
                            </a>
                            <a href="#tab2" className="button tab-link">
                                Down
                            </a>
                        </div>
                    </div>
                </div>
                <div className="item-divider">
                    <div className="block-title">
                        에러 알람 발생 건 수: 1,644건
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
                                <div className="item-subtitle">13시간 26분</div>
                            </div>
                            <div className="item-cell">
                                <div className="item-title">
                                    에러 해지까지 평균 소요 시간
                                </div>
                                <div className="item-subtitle">28분</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-head-label">최다 발생 알람 순</div>
            </div>
            <div className="list medium-inset">
                <ul>
                    <li>
                        <div className="item-content">
                            <div className="item-media">
                                <i className="icon icon-f7"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">Bin Fail</div>
                                <div className="item-after">34%</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item-content">
                            <div className="item-media">
                                <i className="icon icon-f7"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">retry</div>
                                <div className="item-after">7%</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item-content">
                            <div className="item-media">
                                <i className="icon icon-f7"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">GPIB</div>
                                <div className="item-after">4%</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item-content">
                            <div className="item-media">
                                <i className="icon icon-f7"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">OCR</div>
                                <div className="item-after">3%</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item-content">
                            <div className="item-media">
                                <i className="icon icon-f7"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">Wafer Align</div>
                                <div className="item-after">1%</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NotificationsCard
