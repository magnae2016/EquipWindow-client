import React, { useState } from 'react'
import './ScreenTime.css'
import ScreenTimeCard from '@/components/UI/organisms/ScreenTimeCard'

function ScreenTime(params) {
    const [currentDate, setCurrentDate] = useState(new Date())
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
                    <ScreenTimeCard currentDate={currentDate} />
                    <div style={{ marginTop: 16 }}>
                        <div className="block-title">최다 사용</div>
                        <div className="block-right">카테고리 보기</div>
                        <div className="card">
                            <div className="card-content-padding">
                                <div className="list">
                                    <div className="list-group">
                                        <ul>
                                            <li>
                                                <a className="item-link item-content">
                                                    <div className="item-media">
                                                        <i className="icon icon-f7"></i>
                                                    </div>
                                                    <div className="item-inner">
                                                        <div className="item-title">
                                                            <div className="item-header">
                                                                Safari
                                                            </div>
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                className="progressbar"
                                                                style={{
                                                                    width: '34.5%',
                                                                }}
                                                            ></div>
                                                            <div className="progressbar-title">
                                                                30시간 55분
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ion-icon name="chevron-forward"></ion-icon>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="item-link item-content">
                                                    <div className="item-media">
                                                        <i className="icon icon-f7"></i>
                                                    </div>
                                                    <div className="item-inner">
                                                        <div className="item-title">
                                                            <div className="item-header">
                                                                Safari
                                                            </div>
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                className="progressbar"
                                                                style={{
                                                                    width: '10%',
                                                                }}
                                                            ></div>
                                                            <div className="progressbar-title">
                                                                30시간 55분
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ion-icon name="chevron-forward"></ion-icon>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="item-link item-content">
                                                    <div className="item-media">
                                                        <i className="icon icon-f7"></i>
                                                    </div>
                                                    <div className="item-inner">
                                                        <div className="item-title">
                                                            <div className="item-header">
                                                                Safari
                                                            </div>
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                className="progressbar"
                                                                style={{
                                                                    width: '34.5%',
                                                                }}
                                                            ></div>
                                                            <div className="progressbar-title">
                                                                30시간 55분
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ion-icon name="chevron-forward"></ion-icon>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="item-link item-content">
                                                    <div className="item-media">
                                                        <i className="icon icon-f7"></i>
                                                    </div>
                                                    <div className="item-inner">
                                                        <div className="item-title">
                                                            <div className="item-header">
                                                                Safari
                                                            </div>
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                className="progressbar"
                                                                style={{
                                                                    width: '34.5%',
                                                                }}
                                                            ></div>
                                                            <div className="progressbar-title">
                                                                30시간 55분
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ion-icon name="chevron-forward"></ion-icon>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="item-link item-content">
                                                    <div className="item-media">
                                                        <i className="icon icon-f7"></i>
                                                    </div>
                                                    <div className="item-inner">
                                                        <div className="item-title">
                                                            <div className="item-header">
                                                                Safari
                                                            </div>
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                className="progressbar"
                                                                style={{
                                                                    width: '34.5%',
                                                                }}
                                                            ></div>
                                                            <div className="progressbar-title">
                                                                30시간 55분
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ion-icon name="chevron-forward"></ion-icon>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="item-link item-content">
                                                    <div className="item-media">
                                                        <i className="icon icon-f7"></i>
                                                    </div>
                                                    <div className="item-inner">
                                                        <div className="item-title">
                                                            <div className="item-header">
                                                                Safari
                                                            </div>
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                className="progressbar"
                                                                style={{
                                                                    width: '34.5%',
                                                                }}
                                                            ></div>
                                                            <div className="progressbar-title">
                                                                30시간 55분
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ion-icon name="chevron-forward"></ion-icon>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="item-link item-content">
                                                    <div className="item-media">
                                                        <i className="icon icon-f7"></i>
                                                    </div>
                                                    <div className="item-inner">
                                                        <div className="item-title">
                                                            <div className="item-header">
                                                                Safari
                                                            </div>
                                                        </div>
                                                        <div className="progress">
                                                            <div
                                                                className="progressbar"
                                                                style={{
                                                                    width: '34.5%',
                                                                }}
                                                            ></div>
                                                            <div className="progressbar-title">
                                                                30시간 55분
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ion-icon name="chevron-forward"></ion-icon>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="item-content">
                                    <div className="item-inner">
                                        <div className="item-title">
                                            자세히 보기
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScreenTime
