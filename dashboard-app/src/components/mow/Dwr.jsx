import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

function Dwr() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  //DWR Basins Dataset
  const basins = [
    { key: "pangani", name: "Pangani Basin", amount: 1350000 },
    { key: "wami-ruvu", name: "Wami Ruvu Basin", amount: 2200000 },
    { key: "rufiji", name: "Rufiji Basin", amount: 3100000 },
    { key: "ruvuma", name: "Ruvuma & Southern Coast Basin", amount: 1800000 },
    { key: "lake-nyasa", name: "Lake Nyasa Basin", amount: 950000 },
    { key: "internal-drainage", name: "Internal Drainage Basin", amount: 780000 },
    { key: "lake-rukwa", name: "Lake Rukwa Basin", amount: 820000 },
    { key: "lake-tanganyika", name: "Lake Tanganyika Basin", amount: 1600000 },
    { key: "lake-victoria", name: "Lake Victoria Basin", amount: 2900000 },
  ];

  const mowAmount = 6000000;

  //Chart
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["DWR - MoW", ...basins.map((b) => b.name)],
        datasets: [
          {
            label: "Amount (TZS)",
            data: [mowAmount, ...basins.map((b) => b.amount)],
            backgroundColor: [
              "#177dff",
              "#10bb85",
              "#f3545d",
              "#ffa534",
              "#716aca",
              "#6f42c1",
              "#20c997",
              "#fd7e14",
              "#0dcaf0",
              "#198754",
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
          DWR – Claimed amounts per Basin
          </h3>
           <Link to="/mow" className="btn btn-sm btn-secondary btn-round">
            ← Go Back
          </Link>
        </div>

    

        {/* Cards */}
        <div className="row">

          {/* DWR - MoW */}
          <div className="col-md-4 mb-3">
            <Link to="/mow" className="text-decoration-none">
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
                        <p className="card-category">DWR - MoW</p>
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

          {/* Basins */}
          {basins.map((basin) => (
            <div className="col-md-4 mb-3" key={basin.key}>
              <Link
                to={`/basinprojects/${basin.key}`}
                className="text-decoration-none"
              >
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
                          <p className="card-category">{basin.name}</p>
                          <h4 className="card-title">
                            TZS {basin.amount.toLocaleString()}
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
                  Basin Amount Comparison
                </div>
              </div>
              <div className="card-body">
                <div style={{ height: "450px" }}>
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

export default Dwr;
