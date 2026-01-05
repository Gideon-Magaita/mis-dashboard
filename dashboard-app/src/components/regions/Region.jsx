import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { authorityData } from "./authorityData";

function Region() {
  const { regionKey } = useParams();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const authority = authorityData[regionKey];

  useEffect(() => {
    if (!authority) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Claims Amount", "Total Amount"],
        datasets: [
          {
            data: [authority.claimAmount, authority.totalAmount],
            backgroundColor: ["#f3545d", "#177dff"],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (v) => `TZS ${v.toLocaleString()}`,
            },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [authority]);

  if (!authority) {
    return <p className="text-danger">Authority not found</p>;
  }

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Authority Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">{authority.authorityName}</h3>
          <Link to="/maji" className="btn btn-sm btn-secondary btn-round mt-2">
            ← Back to Regions
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="row">

          <div className="col-md-4">
            <Link
              to={`/projects/${regionKey}`} // Pass the authority/region key in the URL
              className="text-decoration-none"
            >
              <div className="card card-stats card-round">
                <div className="card-body d-flex align-items-center">
                  <div className="icon-big icon-success bubble-shadow-small me-3">
                    <i className="fas fa-project-diagram"></i>
                  </div>
                  <div>
                    <p className="card-category">Total Projects</p>
                    <h4>{authority.projects}</h4>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <div className="card card-stats card-round">
              <div className="card-body d-flex align-items-center">
                <div className="icon-big icon-warning bubble-shadow-small me-3">
                  <i className="fas fa-hand-holding-usd"></i>
                </div>
                <div>
                  <p className="card-category">Claim Amount</p>
                  <h4>TZS {authority.claimAmount.toLocaleString()}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-stats card-round">
              <div className="card-body d-flex align-items-center">
                <div className="icon-big icon-primary bubble-shadow-small me-3">
                  <i className="fas fa-coins"></i>
                </div>
                <div>
                  <p className="card-category">Total Amount</p>
                  <h4>TZS {authority.totalAmount.toLocaleString()}</h4>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Chart */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-title">Financial Overview</div>
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

export default Region;
