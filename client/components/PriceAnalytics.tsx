import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

type AnalyticsData = {
  meanPrice: number;
  comparisonResult: string;
  myPostPrice: number;
  percentDiff: number;
  marketPosition: string;
};

type Props = {
  postId: string;
};

const PriceAnalytics: FC<Props> = ({ postId }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coursePosts/comparePrice/${postId}`);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchAnalyticsData();
    }
  }, [postId]);

  return (
    <div className="px-20 content">
      <div className="w-[300px] info-box max-w p-4 border-2 border-black mt-10 mb-6" style={{ boxShadow: '5px 5px 0px rgba(0, 0, 0, 10)' }}>
        <h1 className="inline-block p-1 mb-2 font-sans text-lg font-extrabold text-black uppercase bg-blue-300">Price Analytics</h1>
        {analyticsData && (
          <>
            <p>Comparison result: {analyticsData.comparisonResult}</p>
            <p>Mean price: ${analyticsData.meanPrice}</p>
            <p>My post price: ${analyticsData.myPostPrice}</p>
            <p>Percent difference: {analyticsData.percentDiff.toFixed(2)}%</p>
            <p>Market position: {analyticsData.marketPosition}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PriceAnalytics;
