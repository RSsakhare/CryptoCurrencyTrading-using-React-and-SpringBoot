import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchMarketChart } from "@/State/Coin/Action";

const timeSeries = [
  { label: "1 Day", value: 1 },
  { label: "1 Week", value: 7 },
  { label: "1 Month", value: 30 },
  { label: "1 Year", value: 365 },
];

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.coin, shallowEqual);
  const [activeLabel, setActiveLabel] = useState(timeSeries[0]);

  const series = useMemo(() => [
    {
      data: coin?.market?.data || [],
    },
  ], [coin]);

  const options = useMemo(() => ({
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: { autoScaleYaxis: true },
    },
    dataLabels: { enabled: false },
    xaxis: { type: "datetime", tickAmount: 6 },
    colors: ["#758AA2"],
    markers: {
      colors: ["#fff"],
      strokeColor: "#fff",
      size: 0,
      strokeWidth: 1,
      style: "hollow",
    },
    tooltip: { theme: "dark" },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#47535E",
      strokeDashArray: 4,
      show: true,
    },
  }), []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (coinId) {
        dispatch(fetchMarketChart({
          coinId,
          days: activeLabel.value,
          jwt: localStorage.getItem("jwt"),
        }));
      } else {
        console.warn("Missing coinId for market chart fetch");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [dispatch, coinId, activeLabel]);

  return (
    <div>
      <div className="space-x-3 mb-5">
        {timeSeries.map((item) => (
          <Button
            key={item.label}
            variant={activeLabel.label === item.label ? "solid" : "outline"}
            className="rounded-full cursor-pointer hover:bg-black hover:text-white"
            onClick={() => setActiveLabel(item)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div id="chart-timelines">
        {coin?.loading ? (
          <p>Loading chart...</p>
        ) : (
          <ReactApexChart options={options} series={series} height={450} type="area" />
        )}
      </div>
    </div>
  );
};

export default StockChart;
