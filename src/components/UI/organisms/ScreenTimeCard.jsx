import React, { Fragment, useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/ko'
import axios from 'axios'
import ScreenTimeStackedBarChart from '@/components/UI/atoms/ScreenTimeStackedBarChart'
import BatteryPerformanceBarChart from '@/components/UI/atoms/BatteryPerformanceBarChart'

function ScreenTimeCard({
    errors,
    downs,
    updatedAt,
    dates,
    currentDate,
    onChangeCurrentDate,
}) {
    const date = moment(currentDate, 'YYYY-MM-DD').local()
    const [increment, setIncrement] = useState([])
    const [incrementSign, setIncrementSign] = useState([])
    const [activeIndex, setActiveIndex] = useState(dates.length - 1)
    const formatString = 'M월 D일 dddd'

    useEffect(() => {
        onChangeCurrentDate(dates[activeIndex])
        async function fetchData() {
            const response = await axios.get('/api/v1/alarms/increment', {
                params: { startDate: dates[activeIndex] },
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
    }, [activeIndex])

    const handleClick = useCallback(
        (entry, index) => {
            setActiveIndex(index)
        },
        [activeIndex]
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
            <div className="block-title">알람 발생 현황</div>
            <div className="card">
                <div className="card-header">
                    <div className="item-inner">
                        <div className="item-subtitle">
                            {dates[activeIndex]
                                ? moment(dates[activeIndex]).format(
                                      formatString
                                  )
                                : moment(dates.slice(-1)[0]).format(
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
                        <Fragment>
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
                                    fill="#d1d1d6"
                                    hh={hh}
                                    hl={hl}
                                />
                            </div>
                        </Fragment>
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
            {dates[activeIndex] && (
                <div className="toast">
                    <div className="toast-content">
                        <span className="toast-text">인사이트 및 제안</span>
                        <div className="item-content">
                            <div className="item-media">
                                <div></div>
                            </div>
                            <div className="item-inner">
                                <div className="item-title-row">
                                    <div className="item-title">
                                        알람이 많이 발생한 타임
                                    </div>
                                </div>
                                <div className="item-subtitle">
                                    {moment(dates[activeIndex]).format(
                                        'M월 D일'
                                    )}{' '}
                                    {hh
                                        .slice(0, 3)
                                        .map((element) =>
                                            moment(element, 'HH:mm').format(
                                                'A hh:mm'
                                            )
                                        )
                                        .join(', ')}
                                    에 알람이 많이 발생했습니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ScreenTimeCard
