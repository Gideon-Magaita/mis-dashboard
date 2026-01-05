import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { projectsData } from "./projectsData";
import { authorityData } from "../regions/authorityData";

function RegionProjects() {
  const { regionKey } = useParams();
  const projects = projectsData[regionKey];
  const authority = authorityData[regionKey];

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  if (!projects || !authority) {
    return <p className="text-danger">No projects found for this authority.</p>;
  }

  //Count project statuses
  const completedCount = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const ongoingCount = projects.filter(
    (p) => p.status === "Ongoing"
  ).length;

  //Chart
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
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
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `${ctx.label}: ${ctx.raw} projects`,
            },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [completedCount, ongoingCount]);

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">{authority.authorityName} Projects</h3>
          <Link
            to={`/regions/${regionKey}`}
            className="btn btn-sm btn-secondary btn-round"
          >
            ← Back to Authority
          </Link>
        </div>

        {/* Cards */}
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-4 mb-3" key={project.id}>
              <div className="card card-stats card-round">
                <div className="card-body">
                  <p className="card-category">{project.name}</p>
                  <h4>TZS {project.amount.toLocaleString()}</h4>
                  <p className="text-muted">
                    Status:{" "}
                    <span
                      className={
                        project.status === "Completed"
                          ? "text-success"
                          : "text-warning"
                      }
                    >
                      {project.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*Pie Chart*/}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-title">
                  Project Status Overview
                </div>
              </div>
              <div className="card-body">
                <div style={{ height: "400px" }}>
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RegionProjects;
