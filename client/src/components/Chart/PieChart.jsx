import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import apiUrl from '../../utils/api';

const PieChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    fetch(`${apiUrl.storeApi.storeURL}/pie`)
      .then((response) => response.json())
      .then((data) => {
        const series = data.map((category) => category.percentage);
        const labels = data.map((category) => category.name);

        setChartData({
          series,
          options: {
            chart: {
              width: 600,
              type: 'pie',
            },
            labels,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: 'bottom',
                  },
                },
              },
            ],
          },
        });
      });
  }, []);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width={600}
      />
    </div>
  );
};

export default PieChart;