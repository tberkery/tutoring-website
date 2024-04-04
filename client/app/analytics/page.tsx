"use client";
import React, { FC } from "react";
import "../../styles/global.css";
import Navbar from "@/components/Navbar"
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const Page : FC = () => {

  const chartData = [
    { label: 'March 4th', value: 20 },
    { label: 'March 11th', value: 12 },
    { label: 'March 18th', value: 15 },
    { label: 'March 25th', value: 39 },
    { label: 'April 1st', value: 25 },
  ];

  const getCustomTooltip = ({ payload, label, active }) => {
    if (active) {
      return (
        <div 
          className="bg-white px-2 py-1 border
          border-slate-300"
        >
          <p className="font-bold text-slate-800">{label}</p>
          <p className="text-gray-600">{`views: ${payload[0].value}`}</p>
        </div>
      );
    }
    return <></>;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen">
        <div className="flex flex-col flex-grow px-8 pt-16 max-w-[680px]">
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Profile Views
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#ccc"/>
                <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                <Tooltip content={getCustomTooltip}/>
                <XAxis dataKey="label"/>
                <YAxis/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Profile Views
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <Tooltip content={getCustomTooltip}/>
                <XAxis dataKey="label"/>
                <YAxis/>
                <Bar barSize={38} dataKey="value" fill="#8884d8"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
