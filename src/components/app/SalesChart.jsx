import React from 'react';
import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	// Legend,
	Bar,
} from 'recharts';
import { getMonthNameByOrder } from './MonthOrder';

const Trans = () => {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart
				data={RAINFALL['2019']}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
				fontSize={14}
			>
				<CartesianGrid
					vertical={false}
					stroke="#d6d9da"
					strokeDasharray="3 3"
				/>
				<XAxis
					dataKey="month"
					tickFormatter={getMonthNameByOrder}
					tickLine={false}
				/>
				<YAxis unit="ml" width={35} axisLine={false} tickLine={false} />
				<Tooltip
					labelFormatter={getMonthNameByOrder}
					cursor={false}
					contentStyle={TooltipContainerStyles}
				/>
				{/* <Legend /> */}
				<Bar dataKey="rainfall" fill="#3066BE" unit="ml" name="Rainfall" />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default Trans;

const TooltipContainerStyles = {
	border: 0,
	borderRadius: '8px',
	fontSize: 14,
	boxShadow: '2px 2px 5px 3px rgba(0,0,0,0.15)',
};

const RAINFALL = {
	2018: [
		{
			month: 1,
			rainfall: 65.4,
		},
		{
			month: 2,
			rainfall: 1.6,
		},
		{
			month: 3,
			rainfall: 23,
		},
		{
			month: 4,
			rainfall: 16.4,
		},
		{
			month: 5,
			rainfall: 65.6,
		},
		{
			month: 6,
			rainfall: 43.2,
		},
		{
			month: 7,
			rainfall: 19.4,
		},
		{
			month: 8,
			rainfall: 42.8,
		},
		{
			month: 9,
			rainfall: 16.4,
		},
		{
			month: 11,
			rainfall: 97.8,
		},
		{
			month: 12,
			rainfall: 104.8,
		},
	],
	2019: [
		{
			month: 1,
			rainfall: 11.2,
		},
		{
			month: 2,
			rainfall: 18.6,
		},
		{
			month: 3,
			rainfall: 12,
		},
		{
			month: 4,
			rainfall: 7.2,
		},
		{
			month: 5,
			rainfall: 53.4,
		},
		{
			month: 6,
			rainfall: 49.8,
		},
		{
			month: 7,
			rainfall: 45.2,
		},
		{
			month: 8,
			rainfall: 51.4,
		},
		{
			month: 9,
			rainfall: 41,
		},
		{
			month: 10,
			rainfall: 24,
		},
		{
			month: 11,
			rainfall: 54.4,
		},
		{
			month: 12,
			rainfall: 6.2,
		},
	],
};
