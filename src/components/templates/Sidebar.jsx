import React from 'react'
import './Sidebar.css'
import downtime from 'assets/images/ios12-screentime-downtime-icon.png'

function Sidebar(params) {
    return (
        <div className="panel panel-left">
            <div className="block">
                <div className="appbar">
                    <div className="appbar-inner">
                        <div className="navbar">
                            <div className="navbar-inner">
                                <h1 className="title">설정</h1>
                                <div className="subnavbar">
                                    <div className="searchbar">
                                        <div className="searchbar-inner">
                                            <div className="searchbar-input-wrap">
                                                <input
                                                    type="text"
                                                    placeholder="장비명 검색"
                                                    className="searchbar-input"
                                                />
                                                <i className="searchbar-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block">
                <div className="menu">
                    <div className="menu-inner">
                        <div className="menu-item">
                            <div className="menu-item-content">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="list media-list">
                                            <ul>
                                                <li className="item-content">
                                                    <div className="item-media">
                                                        <div className="card-img"></div>
                                                    </div>
                                                    <div className="item-inner">
                                                        <div className="item-title-row">
                                                            <h3 className="item-title">
                                                                nepes Ark
                                                            </h3>
                                                        </div>
                                                        <div className="item-subtitle">
                                                            tester / prober 장비
                                                            총 146대
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list menu-list">
                            <ul>
                                <li>
                                    <a className="item-content item-link item-selected">
                                        <div className="item-media">
                                            <img src={downtime} width="31px" />
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">
                                                    알람 기반 장애 감지
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
