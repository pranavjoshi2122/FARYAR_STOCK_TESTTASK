"use client";
import styles from "./page.module.css";
import { Box, Button, Typography } from "@mui/material";
import CustomTable from "../components/CustomTable";
import { useEffect, useState } from "react";
import moment from "moment";
import dynamic from "next/dynamic";
import "chart.js/auto";
import axios from "axios";
import { LimitModal } from "@/components/LimitModal";
import { toast } from "react-toastify";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

export default function Home() {
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [webSocketRecord, setWebSocketRecord] = useState([]);
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedStock, setSelectedStock] = useState({});
  const [limitModal, setLimitModal] = useState(false);
  const [indexDataToDisplay, setIndexDataToDisplay] = useState([
    {
      o: 20661.41326239032,
      c: 20811.35951925537,
      h: 20672.10181068938,
      l: 20165.00407268002,
      t: 1720674000000,
      ticker: "NDX",
    },
    {
      o: 20771.41326239032,
      c: 20211.35951925537,
      h: 20672.10181068938,
      l: 20165.00407268002,
      t: 1720674000000,
      ticker: "HD",
    },
    {
      o: 20401.41326239032,
      c: 20451.35951925537,
      h: 20672.10181068938,
      l: 20165.00407268002,
      t: 1720674000000,
      ticker: "MMM",
    },
  ]);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const columns = [
    { id: "name", label: "Name" },
    { id: "last", label: "Last" },
    { id: "high", label: "High" },
    { id: "low", label: "Low" },
    { id: "open", label: "Open" },
    { id: "close", label: "Close" },
    { id: "chg", label: "Chg." },
    { id: "chgper", label: "Chg. (%)" },
    { id: "timestamp", label: "Timestamp" },
    { id: "action", label: "Action" },
  ];

  useState(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    setDateRange({
      startDate: today,
      endDate: yesterday,
    });
  }, []);

  useEffect(() => {
    if (indexDataToDisplay) {
      setCount(indexDataToDisplay.length);
    }
  }, [indexDataToDisplay]);

  useEffect(() => {
    const request = { type: "subscribe", symbol: "AAPL" };

    const token = "cq8g511r01qk4ja4is2gcq8g511r01qk4ja4is30";
    const wsUrl = `wss://ws.finnhub.io?token=${token}`;

    const wsClient = new WebSocket(wsUrl);
    wsClient.onopen = () => {
      wsClient.send(JSON.stringify(request));
    };
    wsClient.onmessage = (evt) => {
      const chartData = JSON.parse(evt.data);
      if (chartData?.data) {
        setWebSocketRecord(chartData?.data);
      }
    };
    return () => {
      wsClient.close();
    };
  }, []);

  const data =
    indexDataToDisplay?.length > 0
      ? indexDataToDisplay.map((item) => ({
          name: item.ticker,
          last: item?.l.toFixed(2),
          high: item?.h.toFixed(2),
          low: item?.l.toFixed(2),
          open: item?.o.toFixed(2),
          close: item?.c.toFixed(2),
          chg: (item?.c - item?.o).toFixed(2),
          chgper: (((item?.c - item?.o) / item?.o) * 100).toFixed(2),
          timestamp: moment(item?.t).format("DD-MM-YYYY, HH:MM"),
          action: (
            <Button
              onClick={() => {
                setLimitModal(true);
              }}
            >
              Action
            </Button>
          ),
        }))
      : [];

  useEffect(() => {}, [indexDataToDisplay]);

  const onPageChange = (value) => {
    setPage(value);
  };

  const onRowsPerPageChange = (value) => {
    setRowsPerPage(value);
  };

  console.log("webSocketRecord", webSocketRecord);
  const setSelectedData = async (item) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/I:${item?.name}/range/1/day/2023-03-13/2023-03-24?apiKey=gLtcgdQn0BOZ1CnGg0UgQ9Lkh2pcwotA&sort=asc`
      );
      if (!response?.data?.results?.length) {
        toast.error("Chart data for this stock is not available.");
      }
      setSelectedStock(response?.data);
    } catch (error) {
      if (error?.response.status === 429) {
        toast.error("API limit exceeded");
      }
    }
  };
  const labels =
    selectedStock?.results?.length &&
    selectedStock?.results.map((result) => {
      const date = new Date(result.t);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}.${minutes}`;
    });

  const chartResult =
    selectedStock?.results?.length &&
    selectedStock?.results.map((result) => result.c);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: selectedStock.ticker,
        data: chartResult,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const handleLogout = () => {
    document.cookie =
      "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie =
      "authToken=; Path=/login; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    window.location.href = "/login";
  };
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", color: "#000" }}
      >
        <Typography sx={{ fontSize: "25px", mt: 3, ml: 3, color: "#2b2c40" }}>
          Welcome to Dashboard!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 3, mr: 3 }}>
          <Button variant="contained" type="button" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
      <main className={styles.main}>
        <Box width={"100%"}>
          <CustomTable
            columns={columns}
            rows={data}
            page={page}
            count={count}
            rowsPerPage={rowsPerPage}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            setSelectedData={setSelectedData}
          />
        </Box>
        <Box sx={{ width: "700px", height: "700px", mt: 7 }}>
          {selectedStock?.results?.length && <Line data={chartData} />}
        </Box>
        <LimitModal open={limitModal} setOpen={() => setLimitModal(false)} />
      </main>
    </>
  );
}
