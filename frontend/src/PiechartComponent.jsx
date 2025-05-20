import React from "react";
import './App.css'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Critical", value: 10 },
  { name: "High", value: 5 },
  { name: "Mediam", value: 5 },
];

const COLORS = ["rgba(146, 6, 25, 0.43)", "#00C49F", "#FFBB28"];

const PieChartComponent = () => {
  return (
    <div className="charts-overall">
      <h2 className="title">Vulnerablity Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart className="piechart">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;