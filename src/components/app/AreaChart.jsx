import React from 'react';
import {
	ResponsiveContainer,
	AreaChart,
	XAxis,
	YAxis,
	Area,
	Tooltip,
	CartesianGrid,
} from 'recharts';
// import '../css/MaterialsAnalytics.css';
import { format, parseISO, subDays } from 'date-fns';

const data = [];

for (let num = 30; num >= 0; num--) {
	data.push({
		date: subDays(new Date(), num).toISOString().substr(0, 10),
		value: 1 + Math.random(),
	});
}

const Analytics = () => {
	// console.log(data);
	return (
		<>
			<ResponsiveContainer width="99%" height={400}>
				<AreaChart
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 30,
						bottom: 5,
					}}
				>
					<defs>
						<linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
							<stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
						</linearGradient>
					</defs>

					<Area
						type="monotone"
						dataKey="value"
						stroke="#2451B7"
						fill="url(#color)"
					/>
					<XAxis
						dataKey="date"
						tickLine={false}
						tickFormatter={(str) => {
							const date = parseISO(str);
							if (date.getDate() % 7 === 0) {
								return format(date, 'MMM, d');
							}
							return '';
						}}
					/>
					<YAxis
						dataKey="value"
						tickLine={false}
						tickCount={8}
						width={35}
						tickFormatter={(number) => `$${number.toFixed(2)}`}
					/>
					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid opacity={0.1} vertical={false} />
				</AreaChart>
			</ResponsiveContainer>
		</>
	);
};

export default Analytics;

function CustomTooltip({ active, payload, label }) {
	if (active) {
		return (
			<div className="tooltip">
				<h4>{format(parseISO(label), 'eeee d, MMM, yyyy ')}</h4>
				<p>${payload[0].value.toFixed(2)} USD</p>
			</div>
		);
	}
	return null;
}
