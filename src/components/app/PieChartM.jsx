import React from 'react';
import { ResponsiveContainer, PieChart, Tooltip, Pie, Cell } from 'recharts';

const COLORS = [
	'#3066BE',
	'#20A39E',
	'#61D095',
	'#FFBA49',
	'#EF5B5B',
	'#A4036F',
];

const AGE_GROUP = [
	{
		age: '18-24',
		percentage: 14,
	},
	{
		age: '25-34',
		percentage: 24,
	},
	{
		age: '35-44',
		percentage: 22,
	},
	{
		age: '45-54',
		percentage: 18,
	},
	{
		age: '55-64',
		percentage: 16,
	},
	{
		age: '65+',
		percentage: 6,
	},
];

const PieChartM = () => {
	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN) - 10;
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text x={x} y={y} fill="white" fontSize={12} dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	return (
		<ResponsiveContainer width="100%" height={200}>
			<PieChart fontSize={14}>
				<Tooltip
					cursor={false}
					contentStyle={TooltipContainerStyles}
					formatter={(value, name) => [`${value}%`, `Sales - ${name}`]}
				/>

				<Pie
					dataKey="percentage"
					data={AGE_GROUP}
					outerRadius={100}
					innerRadius={40}
					name="Percentage"
					nameKey="age"
					unit="%"
					label={renderCustomizedLabel}
					labelLine={false}
				>
					{AGE_GROUP.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default PieChartM;

const TooltipContainerStyles = {
	border: 0,
	borderRadius: '8px',
	fontSize: 14,
	boxShadow: '2px 2px 5px 3px rgba(0,0,0,0.15)',
};
