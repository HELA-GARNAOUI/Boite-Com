"use client"

import { useTheme } from "next-themes"
import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

export function LineChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
      title: {
        display: true,
        text: "Website Traffic",
        color: isDark ? "#e5e7eb" : "#374151",
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
        },
      },
      x: {
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
        },
      },
    },
  }

  const labels = ["January", "February", "March", "April", "May", "June", "July"]

  const data = {
    labels,
    datasets: [
      {
        label: "Organic",
        data: [1200, 1900, 3000, 5000, 4000, 6000, 7000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Referral",
        data: [900, 1200, 1500, 1800, 2000, 2500, 3000],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      },
      {
        label: "Social",
        data: [600, 800, 1000, 1200, 1500, 1800, 2200],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.5)",
      },
    ],
  }

  return <Line options={options} data={data} />
}

export function BarChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
      title: {
        display: true,
        text: "Social Media Performance",
        color: isDark ? "#e5e7eb" : "#374151",
      },
    },
    scales: {
      y: {
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
        },
      },
      x: {
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
        },
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
        },
      },
    },
  }

  const labels = ["Facebook", "Instagram", "Twitter", "LinkedIn", "YouTube"]

  const data = {
    labels,
    datasets: [
      {
        label: "Followers",
        data: [5000, 12000, 3000, 8000, 2000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Engagement",
        data: [3000, 8000, 2000, 4000, 1000],
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export function PieChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
      },
      title: {
        display: true,
        text: "Sales by Service",
        color: isDark ? "#e5e7eb" : "#374151",
      },
    },
  }

  const data = {
    labels: ["Web Development", "SEO", "Social Media", "ERP Integration", "Branding"],
    datasets: [
      {
        data: [40, 20, 15, 15, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(236, 72, 153, 0.7)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return <Pie options={options} data={data} />
}
