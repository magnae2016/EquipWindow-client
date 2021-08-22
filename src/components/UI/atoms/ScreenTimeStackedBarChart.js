import React, { PureComponent } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts'

class CustomizedYAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dx={4}
                    textAnchor="start"
                    fontSize={14}
                    fill="#c1c1c1"
                    letterSpacing="-0.3"
                >
                    {payload.value.toLocaleString()}
                </text>
            </g>
        )
    }
}

function ScreenTimeStackedBarChart({ data, y }) {
    return (
        <ResponsiveContainer width="100%" height={120}>
            <BarChart
                data={data}
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
                barSize={46}
                maxBarSize={46}
                isAnimationActive={false}
            >
                <CartesianGrid
                    stroke="#c1c1c1"
                    strokeWidth={0.3}
                    fill="#FFFFFF"
                />
                <XAxis
                    dataKey="name"
                    height={21}
                    interval={0}
                    padding={{ left: 0, right: 0 }}
                    tick={{
                        fill: '#c1c1c1',
                        fontSize: 14,
                    }}
                    stroke="#c1c1c1"
                    strokeWidth={0.3}
                />
                <YAxis
                    orientation="right"
                    width={43}
                    type="number"
                    padding={{ top: 0, bottom: 0 }}
                    interval="preserveEnd"
                    tickCount={3}
                    tickLine={false}
                    tickSize={0}
                    strokeWidth={0.5}
                    stroke="#c1c1c1"
                    strokeDasharray="3 3"
                    tick={<CustomizedYAxisTick />}
                />
                <Bar dataKey="amt" stackId="a" fill="#d1d0d5" />
                <Bar dataKey="pv" stackId="a" fill="#fc9f0a" />
                <Bar dataKey="uv" stackId="a" fill="#0a84ff" />
                <ReferenceLine
                    y={y}
                    stroke="#67be65"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default ScreenTimeStackedBarChart
