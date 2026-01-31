import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

function Dwss() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["DWSS - MoW", "WSSAs"],
        datasets: [
          {
            label: "Amount (TZS)",
            data: [5000000, 1000000],
            backgroundColor: ["#177dff", "#10bb85ff"],
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

        {/* Stat Cards */}
        <div className="row">

          {/* Ministry of Water */}
          <div className="col-md-6">
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
                        <p className="card-category">DWSS - MoW</p>
                        <h4 className="card-title">TZS 5,000,000</h4>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* WSSA */}
          <div className="col-md-6">
            <Link to="/maji" className="text-decoration-none">
              <div className="card card-stats card-round">
                <div className="card-body">
                  <div className="row align-items-center">

                    <div className="col-icon">
                      <div className="icon-big text-center icon-info bubble-shadow-small">
                        <i className="fas fa-water"></i>
                      </div>
                    </div>

                    <div className="col col-stats ms-3">
                      <div className="numbers">
                        <p className="card-category">WSSAs</p>
                        <h4 className="card-title">TZS 1,000,000</h4>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </Link>
          </div>

        </div>

        {/* Chart */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-title">
                  Amount Statistics Comparison
                </div>
              </div>
              <div className="card-body">
                <div style={{ height: "350px" }}>
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

export default Dwss;
