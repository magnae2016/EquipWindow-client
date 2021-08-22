import React, { PureComponent } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

class CustomizedXAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dx={20}
                    dy={-2}
                    textAnchor="middle"
                    fontSize={13}
                    fill="#c1c1c1"
                    letterSpacing="-0.3"
                >
                    {payload.value}
                </text>
            </g>
        )
    }
}

class CustomizedYAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dx={4}
                    dy={1}
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

function BatteryPerformanceBarChart({ data, scale = 'auto', fill, syncId }) {
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
                syncId={syncId}
                // barSize={2}
            >
                <CartesianGrid
                    stroke="#c1c1c1"
                    strokeWidth={0.3}
                    fill="#FFFFFF"
                />
                <XAxis
                    interval={35}
                    tickCount={4}
                    dataKey="Hour"
                    height={21}
                    padding={{ left: 0, right: 0 }}
                    tick={{
                        fill: '#c1c1c1',
                        fontSize: 14,
                        strokeDasharray: '3 3',
                    }}
                    tickSize={20}
                    stroke="#c1c1c1"
                    strokeWidth={0.3}
                    tick={<CustomizedXAxisTick />}
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
                    scale={scale}
                />
                <Tooltip />
                <Bar
                    dataKey="diff"
                    stackId="a"
                    fill={fill}
                    isAnimationActive={false}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BatteryPerformanceBarChart
