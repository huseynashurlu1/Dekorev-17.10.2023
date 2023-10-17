import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import apiUrl from '../../utils/api';

const ApexChart = () => {
  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'bar',
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
      },
    },
  });

  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  useEffect(() => {
    fetch(`${apiUrl.storeApi.storeURL}/chart`) // API_ENDPOINT, serverinizin API URL-ni əvəz edin
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const stores = data.map((category) => category.storeName);
        const counts = data.map((category) => category.productCount);
        setOptions({
          ...options,
          xaxis: {
            ...options.xaxis,
            stores: stores,
          },
        });

        setSeries([
          {
            data: counts,
          },
        ]);
      })
      .catch((error) => {
        console.error('Məlumatlar alınarkən səhv baş verdi: ', error);
      });
  }, [options]);

  return (
    <div className='mt-5' id='chart'>
      <ReactApexChart options={options} series={series} type='bar' height={350} />
    </div>
  );
};

export default ApexChart;
