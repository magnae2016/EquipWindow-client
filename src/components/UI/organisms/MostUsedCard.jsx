import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/ko'
import axios from 'axios'
import nonMoving from '@/assets/images/ios12-control-center-airplane-mode-icon.png'
import run from '@/assets/images/ios14-screentime-always-allowed-icon.png'
import error from '@/assets/images/ios14-screentime-always-allowed-icon.png'
import down from '@/assets/images/ios14-screentime-always-allowed-icon.png'

function ListItem({ title, percent, value, thumbnail }) {
    return (
        <li>
            <a className="item-link item-content">
                <div className="item-media">
                    {thumbnail === 0 && (
                        <img src={nonMoving} width="31" height="31" />
                    )}
                    {thumbnail === 1 && (
                        <img src={run} width="31" height="31" />
                    )}
                    {thumbnail === 2 && (
                        <img src={error} width="31" height="31" />
                    )}
                    {thumbnail === 3 && (
                        <img src={down} width="31" height="31" />
                    )}
                </div>
                <div className="item-inner">
                    <div className="item-title">
                        <div className="item-header">{title}</div>
                    </div>
                    <div className="progress">
                        <div
                            className="progressbar"
                            style={{
                                width: `${percent}%`,
                            }}
                        ></div>
                        <div className="progressbar-title">{value}건</div>
                    </div>
                </div>
                <ion-icon name="chevron-forward"></ion-icon>
            </a>
        </li>
    )
}

function MostUsedCard({ currentDate }) {
    const date = moment(currentDate)
    const [status, setStatus] = useState([])
    const [equipments, setEquipments] = useState([])
    const [isToggleOn, setIsToggleOn] = useState(false)
    const [count, setCount] = useState(0)
    const [initialLimit, maxLimit] = [5, 10]
    const [limit, setLimit] = useState(initialLimit)

    function handleClickMoreButton(e) {
        console.log(2)
        setIsToggleOn((prevState) => !prevState)
        setLimit((prevState) =>
            prevState === maxLimit ? initialLimit : maxLimit
        )
    }

    const promise1 = axios.get('/api/v1/equipments/status')

    const promise2 = axios.get('/api/v1/equipments/alarms', {
        params: {
            startDate: date.format('YYYY-MM-DD'),
            endDate: date.format('YYYY-MM-DD'),
        },
    })

    useEffect(() => {
        async function fetchData() {
            const [response1, response2] = await Promise.all([
                promise1,
                promise2,
            ])
            setStatus(response1.data)
            setEquipments(response2.data.datas)
            setCount(response2.data.count)
        }
        fetchData()
    }, [currentDate])

    let current = equipments.slice(0, limit).map((element) => ({
        ...element,
        ratio: (element.COUNT / count) * 100,
    }))

    const layoutStatus = {}
    status.forEach((element) => {
        var eq_name = element.eq_name
        var e_type = element.e_type
        var e_time = element.e_time

        if (!e_time) e_type = 0
        else {
            var date2 = new Date(e_time)
            var diff = new Date().getTime() - date2.getTime()

            var msec = Math.floor(diff / 1000)
            if (msec > 60 * 60 * 24 * 10) e_type = 0
        }
        layoutStatus[eq_name] = e_type
    })

    return (
        <div style={{ marginTop: 16 }}>
            <div className="block-title">최다 알람 발생 장비 목록</div>
            <div className="card">
                <div className="card-content-padding">
                    <div className="list">
                        <div className="list-group">
                            <ul>
                                {current.length > 0 &&
                                    current
                                        .slice(0, limit)
                                        .map((element, index) => (
                                            <ListItem
                                                key={index}
                                                title={element.EQ_NAME}
                                                percent={element.ratio}
                                                value={element.COUNT}
                                                thumbnail={
                                                    layoutStatus[
                                                        element.EQ_NAME
                                                    ]
                                                }
                                            />
                                        ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div
                        className="item-content pointer"
                        onClick={handleClickMoreButton}
                    >
                        <div className="item-inner">
                            <div className="item-title">
                                {!isToggleOn ? '더보기' : '접기'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostUsedCard
