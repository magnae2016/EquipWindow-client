import React, { useState } from 'react'
import './ScreenTime.css'
import ScreenTimeCard from '@/components/UI/organisms/ScreenTimeCard'
import MostUsedCard from '@/components/UI/organisms/MostUsedCard'

function ScreenTime(params) {
    const [currentDate, setCurrentDate] = useState(new Date())

    function handleChangeCurrentDate(date) {
        setCurrentDate(date)
    }
    return (
        <div className="page">
            <div className="navbars">
                <div className="navbar navbar-current">
                    <div className="appbar">
                        <div className="appbar-inner">
                            <div className="left">
                                <a className="link back">
                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                    <span className="if-not-md">
                                        스크린 타임
                                    </span>
                                </a>
                            </div>
                            <div className="title">모든 기기</div>
                        </div>
                    </div>
                    <div className="navbar-bg">
                        <div className="navbar-inner">
                            <div className="left">
                                <a className="link back">
                                    <ion-icon name="chevron-back-outline"></ion-icon>
                                </a>
                            </div>
                            <div className="title">이번 주</div>
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
                            <div className="title">알람 모니터링</div>
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
                                    주
                                </a>
                                <a
                                    href="#tab2"
                                    className="button tab-link tab-link-active"
                                >
                                    일
                                </a>
                            </div>
                        </div>
                    </div>
                    <ScreenTimeCard
                        currentDate={currentDate}
                        onChangeCurrentDate={handleChangeCurrentDate}
                    />
                    <MostUsedCard currentDate={currentDate} />
                </div>
            </div>
        </div>
    )
}

export default ScreenTime
