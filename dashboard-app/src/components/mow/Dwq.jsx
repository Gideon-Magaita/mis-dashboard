import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

function Dwq() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  //Labs Dataset
  const labs = [
    { key: "mwanza", name: "Mwanza Lab", amount: 1200000 },
    { key: "shinyanga", name: "Shinyanga Lab", amount: 950000 },
    { key: "bukoba", name: "Bukoba Lab", amount: 780000 },
    { key: "musoma", name: "Musoma Lab", amount: 860000 },
    { key: "kigoma", name: "Kigoma Lab", amount: 910000 },
    { key: "dsm", name: "Dar es Salaam Lab", amount: 1000000 },
    { key: "singida", name: "Singida Lab", amount: 670000 },
  ];

  const mowAmount = 5000000;

  //Chart
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["DWQ - MoW", ...labs.map((lab) => lab.name)],
        datasets: [
          {
            label: "Amount (TZS)",
            data: [mowAmount, ...labs.map((lab) => lab.amount)],
            backgroundColor: [
              "#177dff",
              "#10bb85",
              "#f3545d",
              "#ffa534",
              "#716aca",
              "#6f42c1",
              "#20c997",
              "#fd7e14",
            ],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `TZS ${ctx.raw.toLocaleString()}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `TZS ${value.toLocaleString()}`,
            },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, []);

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Page Title */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h3 className="fw-bold">
            DWQ – Claimed amounts per Lab
          </h3>
          <Link to="/" className="btn btn-sm btn-secondary btn-round mt-2">
            ← Go Back
        </Link>
        </div>


        {/* Start Cards */}
        <div className="row">

          {/* DWQ - MoW */}
          <div className="col-md-4 mb-3">
            <Link to="/" className="text-decoration-none">
              <div className="card card-stats card-round">
                <div className="card-body">
                  <div className="row align-items-center">

                    <div className="col-icon">
                      <div className="icon-big text-center icon-primary bubble-shadow-small">
                        <i className="fas fa-building"></i>
                      </div>
                    </div>

                    <div className="col col-stats ms-3">
                      <div className="numbers">
                        <p className="card-category">DWQ - MoW</p>
                        <h4 className="card-title">
                          TZS {mowAmount.toLocaleString()}
                        </h4>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Labs */}
          {labs.map((lab) => (
            <div className="col-md-4 mb-3" key={lab.key}>
              <Link
                to={`/labs/${lab.key}`}
                className="text-decoration-none"
              >
                <div className="card card-stats card-round">
                  <div className="card-body">
                    <div className="row align-items-center">

                      <div className="col-icon">
                        <div className="icon-big text-center icon-info bubble-shadow-small">
                          <i className="fas fa-flask"></i>
                        </div>
                      </div>

                      <div className="col col-stats ms-3">
                        <div className="numbers">
                          <p className="card-category">{lab.name}</p>
                          <h4 className="card-title">
                            TZS {lab.amount.toLocaleString()}
                          </h4>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

        </div>

        {/* Chart */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-title">
                Laboratory Amount Comparison
                </div>
              </div>
              <div className="card-body">
                <div style={{ height: "420px" }}>
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

export default Dwq;
