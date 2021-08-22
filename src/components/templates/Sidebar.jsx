import React from 'react'
import './Sidebar.css'

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
                                                                Hannah Kim
                                                            </h3>
                                                        </div>
                                                        <div className="item-subtitle">
                                                            Apple ID, iCloud,
                                                            미디어 및 구입
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
                                            <img
                                                src="../ios12-screentime-icon.png"
                                                width="31px"
                                            />
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">
                                                    에어플레인 모드
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="item-content item-link item-selected">
                                        <div className="item-media">
                                            <img
                                                src="../ios12-screentime-icon.png"
                                                width="31px"
                                            />
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">
                                                    에어플레인 모드
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="item-content item-link item-selected">
                                        <div className="item-media">
                                            <img
                                                src="../ios12-screentime-icon.png"
                                                width="31px"
                                            />
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">
                                                    에어플레인 모드
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="list menu-list">
                            <ul>
                                <li>
                                    <a className="item-content item-link item-selected">
                                        <div className="item-media">
                                            <img
                                                src="../ios12-screentime-downtime-icon.png"
                                                width="31px"
                                            />
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">
                                                    디스플레이 및 밝기
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="item-content item-link item-selected">
                                        <div className="item-media">
                                            <img
                                                src="../ios12-screentime-downtime-icon.png"
                                                width="31px"
                                            />
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">
                                                    디스플레이 및 밝기
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="item-content item-link item-selected">
                                        <div className="item-media">
                                            <img
                                                src="../ios12-screentime-downtime-icon.png"
                                                width="31px"
                                            />
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">
                                                    디스플레이 및 밝기
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="item-content item-link item-selected">
                                        <div className="item-media">
                                            <img
                                                src="../ios12-screentime-downtime-icon.png"
                                                width="31px"
                                            />
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">
                                                    디스플레이 및 밝기
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
