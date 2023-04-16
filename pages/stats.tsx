import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import Layout from "../components/layout/Layout";
import { Heading } from "../components/Typography";
import dynamic from "next/dynamic";

interface Props {

}

const data = [
  {
    week: "1",
    a: 4000,
    b: 2400,
  },
  {
    week: "2",
    a: 3000,
    b: 1398,
  },
  {
    week: "3",
    a: 2000,
    b: 9800,
  },
  {
    week: "4",
    a: 2780,
    b: 3908,
  },
  {
    week: "5",
    a: 1890,
    b: 4800,
  },
  {
    week: "6",
    a: 2390,
    b: 3800,
  },
  {
    week: "7",
    a: 3490,
    b: 4300,
  },
  {
    week: "8",
    a: 3090,
    b: 4300,
  },
];


const interestData = [
  {
    week: "1",
    a: 3000,
    b: 3400,
    c: 500,
  },
  {
    week: "2",
    a: 3000,
    b: 2398,
    c: 600
  },
  {
    week: "3",
    a: 2000,
    b: 6800,
    c: 700
  },
  {
    week: "4",
    a: 2080,
    b: 3908,
    c: 1200
  },
  {
    week: "5",
    a: 1890,
    b: 3800,
    c: 2000
  },
  {
    week: "6",
    a: 2390,
    b: 3800,
    c: 2100
  },
  {
    week: "7",
    a: 3490,
    b: 4300,
    c: 3500
  },
  {
    week: "8",
    a: 3090,
    b: 4300,
    c: 2700
  },
];

const StackedAreaChartNoSSR = dynamic(import("../components/StackedAreaChart"), { ssr: false });

export default function Page(props: Props) {
  return (
    <Layout>
      <Heading>Dashboard</Heading>

      <h2 className="text-2xl font-semibold my-8">Gender balance ratio</h2>
      <StackedAreaChartNoSSR data={data} />

      <h2 className="text-2xl font-semibold my-8">Primary interest ratio</h2>
      <StackedAreaChartNoSSR data={interestData} />
    </Layout>

  );
}