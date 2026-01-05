import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { basinProjectsData } from "./basinProjectsData";
import { basinData } from "./basinData";

function BasinProjects() {
  const { basinKey } = useParams();

  const projects = basinProjectsData[basinKey];
  const basin = basinData[basinKey];

  const amountChartRef = useRef(null);
  const amountChartInstance = useRef(null);

  const statusChartRef = useRef(null);
  const statusChartInstance = useRef(null);

  if (!projects || !basin) {
    return <p className="text-danger">No projects found for this basin.</p>;
  }

  /*status count*/
  const completedCount = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const ongoingCount = projects.filter(
    (p) => p.status === "Ongoing"
  ).length;

  useEffect(() => {
    /*Mount bar chart*/
    const amountCtx = amountChartRef.current.getContext("2d");
    if (amountChartInstance.current)
      amountChartInstance.current.destroy();

    amountChartInstance.current = new Chart(amountCtx, {
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

    /*status pie chart*/
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
      amountChartInstance.current?.destroy();
      statusChartInstance.current?.destroy();
    };
  }, [projects, completedCount, ongoingCount]);

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">{basin.name} – Projects</h3>
          <Link
            to="/dwr"
            className="btn btn-sm btn-secondary btn-round"
          >
            ← Back to Basin
          </Link>
        </div>

        {/* Project Cards */}
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-4 mb-3" key={project.id}>
              <div className="card card-stats card-round">
                <div className="card-body">
                  <p className="card-category">{project.name}</p>

                  <h4 className="mb-2">
                    TZS {project.amount.toLocaleString()}
                  </h4>

                  <span
                    className={`badge ${
                      project.status === "Completed"
                        ? "badge-success"
                        : project.status === "Ongoing"
                        ? "badge-warning"
                        : "badge-secondary"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="row mt-4">

          {/* Amount Comparison Chart */}
          <div className="col-md-8">
            <div className="card card-round h-100">
              <div className="card-header">
                <div className="card-title">
                  Project Amount Comparison
                </div>
              </div>
              <div className="card-body">
                <div style={{ height: "400px" }}>
                  <canvas ref={amountChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>

          {/* Status Pie Chart */}
          <div className="col-md-4">
            <div className="card card-round h-100">
              <div className="card-header">
                <div className="card-title">
                  Project Status Overview
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

export default BasinProjects;
