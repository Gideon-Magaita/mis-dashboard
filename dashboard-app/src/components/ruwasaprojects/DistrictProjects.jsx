import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { districtProjectsData } from "./districtProjectsData";

function DistrictProjects() {
  const { districtKey } = useParams();
  const projects = districtProjectsData[districtKey];

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  if (!projects) {
    return <h4 className="text-danger">No projects found for this district.</h4>;
  }

  useEffect(() => {
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
            backgroundColor: projects.map((_, i) => `hsl(${(i * 60) % 360}, 70%, 50%)`),
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { callback: (v) => `TZS ${v.toLocaleString()}` } },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [projects]);

  return (
    <div className="container-fluid">
      <div className="page-inner">
        <div className="mb-4">
          <h3 className="fw-bold">Projects – {districtKey}</h3>
        </div>

        <div className="mb-3">
          <Link to={`/ruwasa`} className="btn btn-sm btn-secondary btn-round">
            ← Back to Regions
          </Link>
        </div>

        <div className="row">
          {projects.map((p) => (
            <div className="col-md-4 mb-3" key={p.id}>
              <div className="card card-round card-stats">
                <div className="card-body">
                  <p className="card-category">{p.name}</p>
                  <h4>TZS {p.amount.toLocaleString()}</h4>
                  <p className="text-muted">Status: {p.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-title">Projects Amount Comparison</div>
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

export default DistrictProjects;
