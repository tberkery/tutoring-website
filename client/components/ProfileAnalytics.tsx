"use client";
import axios from 'axios';
import { Square, Star } from 'lucide-react';
import React, { FC, useEffect, useState } from 'react';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type view = {
  viewerId: string,
  timestamp: string,
  durationInSeconds: number,
}

type lineGraphPoint = { label: string, value: number }

type pieGraphPoint = { _id: string, count: number }

const ProfileAnalytics : FC<{profileId : string}> = (params) => {
  const analyticsSections = ["Overview", "Profile Viewers"];
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const id = params.profileId;
  const animDuration = 1000;

  const [activeAnalytics, setActiveAnalytics] = useState(analyticsSections[0]);
  const [viewsGraphData, setViewsGraphData] = useState<lineGraphPoint[]>([]);
  const [timeGraphData, setTimeGraphData] = useState<lineGraphPoint[]>([]);
  const [majorData, setMajorData] = useState<pieGraphPoint[]>([]);
  const [yearData, setYearData] = useState<pieGraphPoint[]>([]);
  const [affiliationData, setAffiliationData] = useState<pieGraphPoint[]>([]);

  const capitalize = (s : string) => {
    const pieces = s.split(" ");
    const newPieces = pieces.map((piece) => {
      return `${piece.charAt(0).toUpperCase()}${piece.substring(1)}`
    })
    return newPieces.join(' ');
  }

  const getWeeksAgo = (weeks : number) => {
    const result = new Date();
    result.setDate(result.getDate() - (weeks * 7));
    return result;
  }

  const getDateLabel = (date : Date) => {
    var options = { month: "long", day: "numeric" };
    // @ts-ignore (issue with the options)
    return date.toLocaleDateString(undefined, options);
  }

  const getBucketByMonth = (input : Date) => {
    const oneWeekAgo = getWeeksAgo(1);
    const twoWeeksAgo = getWeeksAgo(2);
    const threeWeeksAgo = getWeeksAgo(3);
    const fourWeeksAgo = getWeeksAgo(4);
    if (input > oneWeekAgo) {
      return 3;
    } else if (input > twoWeeksAgo) {
      return 2;
    } else if (input > threeWeeksAgo) {
      return 1;
    } else if (input > fourWeeksAgo) {
      return 0;
    } else {
      return -1;
    }
  }

  const getViewsData = async () => {
    const endpoint = `${api}/profiles/views/${id}`;
    const response = await axios.get(endpoint);
    const rawData : view[] = response.data.data.views;
    // calculate profile views and view time by date
    let frequency = [0, 0, 0, 0];
    let viewTime = [0, 0, 0, 0];
    rawData.forEach((data : view) => {
      const bucket = getBucketByMonth(new Date(data.timestamp));
      if (bucket != -1) {
        frequency[bucket]++;
        viewTime[bucket] += data.durationInSeconds;
      }
    })
    let viewsData = [];
    let timeData = [];
    frequency.forEach((number, index) => {
      viewsData[index] = {
        label: getDateLabel(getWeeksAgo(4 - index)),
        value: number
      }
      timeData[index] = {
        label: getDateLabel(getWeeksAgo(4 - index)),
        value: number === 0 ? 0 : viewTime[index] / number
      }
    })
    setViewsGraphData(viewsData);
    setTimeGraphData(timeData);
    console.log(timeData);
  }

  const getDemographicsData = async () => {
    const endpoint = `${api}/profiles/demographics/${id}`;
    const response = await axios.get(endpoint);
    const data = response.data;
    let majors : pieGraphPoint[] = data.departments;
    majors = majors.map((point) => {
      point._id = capitalize(point._id);
      return point;
    })
    setMajorData(majors);
    let affiliations : pieGraphPoint[] = data.affiliations;
    affiliations = affiliations.map((point) => {
      point._id = capitalize(point._id);
      return point;
    })
    setAffiliationData(affiliations);
    setYearData(data.graduationYears);
  }

  useEffect(() => { getViewsData() }, [])

  useEffect(() => { getDemographicsData() }, [])

  const viewedPosts = [
    { title: 'Linear Algebra', views: 79},
    { title: 'Calculus III', views: 54},
    { title: 'Piano Lessons', views: 48},
  ]

  const ratedPosts = [
    { title: 'Calculus III', rating: 4.8 },
    { title: 'Synchronized Swimming', rating: 4.7 },
    { title: 'Piano Lessons', rating: 4.2 },
  ]

  const pieColors = ['#ef4444', '#a3e635', '#38bdf8', '#ec4899', '#f59e0b', '#34d399', '#a855f7']
  
  const lineChartTooltipGenereator = (
    { payload, label, active }, valueLabel : string
  ) => {
    if (active) {
      return (
        <div 
          className="bg-white px-2 py-1 border
          border-slate-300"
        >
          <p className="font-bold text-slate-800">{label}</p>
          <p className="text-gray-600">{`${valueLabel}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return <></>;
  }

  const lineChartTooltip = (valueLabel : string) => {
    return ({ payload, label, active }) => { 
      return lineChartTooltipGenereator({ payload, label, active }, valueLabel)
    } 
  }

  const pieChartLabel = (
    { cx, cy, midAngle, innerRadius, outerRadius, percent }
  ) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  
    return (
      <text 
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getAnalyticsOverview = () => {
    return (
      <>
        <div 
          className="flex flex-col flex-grow basis-[440px] 
          min-w-[440px] max-w-[640px]"
        >
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Number of Profile Views
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsGraphData}>
                <CartesianGrid stroke="#ccc"/>
                <Line type="monotone" dataKey="value" stroke="#8884d8" animationDuration={animDuration}/>
                <Tooltip content={lineChartTooltip("views")}/>
                <XAxis dataKey="label"/>
                <YAxis/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Average Time Spent on Profile
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeGraphData}>
                <CartesianGrid stroke="#ccc"/>
                <Line type="monotone" dataKey="value" stroke="#8884d8" animationDuration={animDuration}/>
                <Tooltip content={lineChartTooltip("seconds")}/>
                <XAxis dataKey="label"/>
                <YAxis/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div 
          className="flex flex-col flex-grow basis-[320px] 
          min-w-[320px] max-w-[560px]"
        >
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Most Viewed Posts
            </h3>
            { viewedPosts.map((post, index) => {
              return <>
                <div
                  className="flex items-center mb-2" 
                  key={`viewed-post-${index}`}
                >
                  <div
                    className="w-9 h-9 mr-5 flex flex-shrink-0 justify-center
                    items-center bg-sky-800 rounded-3xl"
                  >
                    <p className="text-white font-bold text-2xl">
                      {index + 1}
                    </p>
                  </div>
                  <a
                    className="text-lg mr-2 line-clamp-1
                    hover:cursor-pointer hover:underline"
                  >
                    {post.title}
                  </a>
                  <p className="text-slate-500 text-nowrap">
                    ({post.views} views)
                  </p>
                </div>
              </>
            })}
          </div>
          <div className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Highest Rated Posts
            </h3>
            { ratedPosts.map((post, index) => {
              return <>
                <div 
                  className="flex justify-between items-center mb-2"
                  key={`rated-post-${index}`}
                >
                  <div className="flex items-center">
                    <div
                      className="w-9 h-9 mr-5 flex flex-shrink-0
                      justify-center items-center bg-sky-800 rounded-3xl"
                    >
                      <p className="text-white font-bold text-2xl">
                        {index + 1}
                      </p>
                    </div>
                    <a
                      className="text-lg mr-2 line-clamp-1
                      hover:cursor-pointer hover:underline"
                    >
                      {post.title}
                    </a>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <Star size={20} strokeWidth={1} className="fill-yellow-300"/>
                    <p>{post.rating}</p>
                  </div>
                </div>
              </>
            })}
          </div>
        </div>
      </>
    )
  }

  const getViewersSection = () => {
    return <>
      <div
        className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md flex-grow
        basis-[480px] min-w-[480px] max-w-[540px]"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">
          Profile Viewers by Major
        </h3>
        <div className="flex">
          <PieChart width={300} height={300}>
            <Pie 
              data={majorData}
              dataKey="count"
              nameKey="id"
              outerRadius={130}
              fill='#3b82f6'
              labelLine={false}
              label={pieChartLabel}
              animationDuration={animDuration}
            >
              { majorData.map((data, index) => {
                return (
                  <Cell 
                    fill={pieColors[index % pieColors.length]}
                    key={`major-pie-cell-${index}`}
                  />
                )
              })}
            </Pie>
          </PieChart>
          <div className="flex flex-col justify-start">
            { majorData.map((data, index) => {
              return (
                <div className="flex gap-x-2" key={`pie-1-key-${index}`}>
                  <Square 
                    fill={pieColors[index % pieColors.length]}
                    strokeWidth={1}
                  />
                  <p>{data._id}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div
        className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md flex-grow
        basis-[480px] min-w-[480px] max-w-[540px]"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">
          Profile Viewers by Graduation Year
        </h3>
        <div className="flex">
          <PieChart width={300} height={300}>
            <Pie 
              data={yearData}
              dataKey="count"
              nameKey="id"
              outerRadius={130}
              fill='#3b82f6'
              labelLine={false}
              label={pieChartLabel}
              animationDuration={animDuration}
            >
              { yearData.map((data, index) => {
                return (
                  <Cell 
                    fill={pieColors[index % pieColors.length]}
                    key={`year-pie-cell-${index}`}
                  />
                )
              })}
            </Pie>
          </PieChart>
          <div className="flex flex-col justify-start">
            { yearData.map((data, index) => {
              return (
                <div className="flex gap-x-2" key={`pie-2-key-${index}`}>
                  <Square 
                    fill={pieColors[index % pieColors.length]}
                    strokeWidth={1}
                  />
                  <p>{data._id}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div
        className="bg-white px-8 py-8 mb-8 rounded-xl shadow-md flex-grow
        basis-[480px] min-w-[480px] max-w-[540px]"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">
          Profile Viewers by Affiliation Type
        </h3>
        <div className="flex">
          <PieChart width={300} height={300}>
            <Pie 
              data={affiliationData}
              dataKey="count"
              nameKey="id"
              outerRadius={130}
              fill='#3b82f6'
              labelLine={false}
              label={pieChartLabel}
              animationDuration={animDuration}
            >
              { affiliationData.map((data, index) => {
                return (
                  <Cell 
                    fill={pieColors[index % pieColors.length]}
                    key={`year-pie-cell-${index}`}
                  />
                )
              })}
            </Pie>
          </PieChart>
          <div className="flex flex-col justify-start">
            { affiliationData.map((data, index) => {
              return (
                <div className="flex gap-x-2" key={`pie-3-key-${index}`}>
                  <Square 
                    fill={pieColors[index % pieColors.length]}
                    strokeWidth={1}
                  />
                  <p>{data._id}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex justify-center mb-6">
        <div 
          className="flex flex-row flex-grow-0 px-1 py-1 bg-sky-50 gap-x-1
          rounded-lg"
        >
          { analyticsSections.map((section) => {
            return (
              <button 
                className={`text-lg px-2 py-1 rounded-md transition
                ${section === activeAnalytics ? 'bg-sky-200' 
                : 'hover:bg-blue-300'}`}
                disabled={section === activeAnalytics}
                onClick={() => setActiveAnalytics(section)}
                key={section}
              >
                {section}
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex justify-center flex-wrap flex-grow gap-x-8">
        { activeAnalytics === "Overview" ? 
          getAnalyticsOverview()
        :
          getViewersSection()
        }
      </div>
    </div>
  );
}

export default ProfileAnalytics;