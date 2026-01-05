import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { districtProjectsData } from "./districtProjectsData";

function DistrictProjects() {
  const { districtKey } = useParams();
  const projects = districtProjectsData[districtKey];

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const statusChartRef = useRef(null);
  const statusChartInstance = useRef(null);

  if (!projects) {
    return (
      <h4 className="text-danger">
        No projects found for this district.
      </h4>
    );
  }

  //Status counts
  const completedCount = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const ongoingCount = projects.filter(
    (p) => p.status === "Ongoing"
  ).length;

  useEffect(() => {
    /*BAR CHART*/
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: projects.map((p) => p.name),
        datasets: [
          {
            label: "Amount (TZS)",
            data: projects.map((p) => p.amount),
            backgroundColor: projects.map(
              (_, i) => `hsl(${(i * 60) % 360}, 70%, 50%)`
            ),
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `TZS ${ctx.raw.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              callback: (v) =>
                `TZS ${v.toLocaleString()}`,
            },
          },
        },
      },
    });

    /*STATUS PIE CHART*/
    const statusCtx = statusChartRef.current.getContext("2d");
    if (statusChartInstance.current)
      statusChartInstance.current.destroy();

    statusChartInstance.current = new Chart(statusCtx, {
      type: "pie",
      data: {
        labels: ["Completed", "Ongoing"],
        datasets: [
          {
            data: [completedCount, ongoingCount],
            backgroundColor: ["#10bb85", "#ffa534"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `${ctx.label}: ${ctx.raw} projects`,
            },
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
      statusChartInstance.current?.destroy();
    };
  }, [projects, completedCount, ongoingCount]);

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Header */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h3 className="fw-bold">
            Projects – {districtKey}
          </h3>
          <Link
            to="/ruwasa"
            className="btn btn-sm btn-secondary btn-round"
          >
            ← Back to Regions
          </Link>
        </div>

        {/* Project Cards */}
        <div className="row">
          {projects.map((p) => (
            <div className="col-md-4 mb-3" key={p.id}>
              <div className="card card-round card-stats">
                <div className="card-body">
                  <p className="card-category">{p.name}</p>
                  <h4>
                    TZS {p.amount.toLocaleString()}
                  </h4>
                  <p className="text-muted">
                    Status:{" "}
                    <span
                      className={
                        p.status === "Completed"
                          ? "text-success"
                          : "text-warning"
                      }
                    >
                      {p.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="row mt-4">

          {/* Amount Bar Chart */}
          <div className="col-md-8">
            <div className="card card-round h-100">
              <div className="card-header">
                <div className="card-title">
                  Projects Amount Comparison
                </div>
              </div>
              <div className="card-body">
                <div style={{ height: "400px" }}>
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>
            </div>
          </div>

          {/* Status Pie Chart */}
          <div className="col-md-4">
            <div className="card card-round h-100">
              <div className="card-header">
                <div className="card-title">
                  Project Status
                </div>
              </div>
              <div className="card-body">
                <div style={{ height: "400px" }}>
                  <canvas ref={statusChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DistrictProjects;
