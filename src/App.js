import logo from './logo.svg'
import './reset.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Sidebar from './components/templates/Sidebar'
import ScreenTime from './components/pages/ScreenTime'

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <ScreenTime />,
    },
]

function App() {
    return (
        <div className="App">
            <Router>
                <div id="wrap">
                    <div id="container" role="main">
                        <div id="NM_INT_LEFT" className="column_left">
                            <Sidebar />
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                    />
                                ))}
                            </Switch>
                        </div>
                        <div id="NM_INT_RIGHT" className="column_right">
                            <div className="view view-main">
                                <Switch>
                                    {routes.map((route, index) => (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            children={<route.main />}
                                        />
                                    ))}
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default App
