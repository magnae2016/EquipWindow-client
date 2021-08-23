import React from 'react'
import './NotificationsCard.css'

function NotificationsCard(params) {
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
                                주
                            </a>
                            <a href="#tab2" className="button tab-link">
                                일
                            </a>
                        </div>
                    </div>
                </div>
                <div className="item-divider">
                    <div className="block-title">마지막 충전량: 100%</div>
                    <div className="item-text">(토) 오후 5:18</div>
                </div>
                <div className="chart-area">
                    <div className="list-group-title">배터리 잔량</div>
                    <div className="chart"></div>
                </div>
                <div className="chart-area">
                    <div className="list-group-title">활동</div>
                    <div className="chart"></div>
                </div>
                <div className="item-content">
                    <div className="item-inner">
                        <div className="item-row">
                            <div className="item-cell">
                                <div className="item-title">화면 켬</div>
                                <div className="item-subtitle">13시간 26분</div>
                            </div>
                            <div className="item-cell">
                                <div className="item-title">화면 켬</div>
                                <div className="item-subtitle">2분</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-head-label">앱별 배터리 사용량</div>
            </div>
            <div className="list medium-inset">
                <ul>
                    <li>
                        <div className="item-content">
                            <div className="item-media">
                                <i className="icon icon-f7"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">
                                    홈 및 잠금 화면
                                </div>
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
                                <div className="item-title">
                                    홈 및 잠금 화면
                                </div>
                                <div className="item-after"></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NotificationsCard
