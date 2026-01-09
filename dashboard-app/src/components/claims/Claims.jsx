import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

function Mow() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const mow = 1_200_000
  const darhm = 1_300_000
  const dwss = 1_200_000
  const dwr = 1_100_000
  const dwq = 1_000_000

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "MoW",
          "DARHM",
          "DWSS",
          "DWQ",
          "DWR",
        ],
        datasets: [
          {
            label: "Amount (TZS)",
            data: [1_200_000,1_300_000,1_200_000,1_100_000,1_000_000],
            backgroundColor: [
              "#5198faff",
              "#39495fff",
              "#4eaef8ff",
              "#39835dff",
              "#141ad7ff",
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
          y: { beginAtZero: true,
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
        <div className="mb-4 d-flex justify-content-end align-items-center">
          <Link to="/" className="btn btn-sm btn-secondary btn-round mt-2">
            ← Go Back
          </Link>
        </div>
        {/* Cards */}
        <div className="row">

           {/* MoW */}
          <div className="col-sm-6 col-md-3">
            <Link to="/claims" className="text-decoration-none">
              <div className="card card-stats card-round">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-icon">
                      <div className="icon-big text-center icon-primary bubble-shadow-small">
                        <i className="fas fa-file-alt"></i>
                      </div>
                    </div>
                    <div className="col col-stats ms-3">
                      <div className="numbers">
                        <p className="card-category">MoW-HQ</p>
                        <h4 className="card-title">{mow.toLocaleString()}M</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Total Claims */}
          <div className="col-sm-6 col-md-3">
            <Link to="/claims" className="text-decoration-none">
              <div className="card card-stats card-round">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-icon">
                      <div className="icon-big text-center icon-primary bubble-shadow-small">
                        <i className="fas fa-file-alt"></i>
                      </div>
                    </div>
                    <div className="col col-stats ms-3">
                      <div className="numbers">
                        <p className="card-category">DARHM</p>
                        <h4 className="card-title">{darhm.toLocaleString()}M</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Total IPCS */}
          <div className="col-sm-6 col-md-3">
            <Link to="/dwss" className="text-decoration-none">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-info bubble-shadow-small">
                      <i className="fas fa-users"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3">
                    <div className="numbers">
                      <p className="card-category">DWSS</p>
                      <h4 className="card-title">{dwss.toLocaleString()}M</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

          {/* Projects */}
          <div className="col-sm-6 col-md-3">
            <Link to="/dwq" className="text-decoration-none">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-success bubble-shadow-small">
                      <i className="fas fa-project-diagram"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3">
                    <div className="numbers">
                      <p className="card-category">DWQ</p>
                      <h4 className="card-title">{dwq.toLocaleString()}M</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

          {/* dwr */}
          <div className="col-sm-6 col-md-3">
            <Link to="/dwr" className="text-decoration-none">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-secondary bubble-shadow-small">
                      <i className="fas fa-user-tie"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3">
                    <div className="numbers">
                      <p className="card-category">DWR</p>
                      <h4 className="card-title">{dwr.toLocaleString()}M</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

          {/* WSSAs */}
          <div className="col-sm-6 col-md-3">
            <Link to="/maji" className="text-decoration-none">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-secondary bubble-shadow-small">
                      <i className="fas fa-user-tie"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3">
                    <div className="numbers">
                      <p className="card-category">WSSAs</p>
                      <h4 className="card-title">{dwr.toLocaleString()}M</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

          {/* RUWASA */}
          <div className="col-sm-6 col-md-3">
            <Link to="/ruwasa" className="text-decoration-none">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-secondary bubble-shadow-small">
                      <i className="fas fa-user-tie"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3">
                    <div className="numbers">
                      <p className="card-category">RUWASA</p>
                      <h4 className="card-title">{dwr.toLocaleString()}M</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

          {/* BASINS */}
          <div className="col-sm-6 col-md-3">
            <Link to="/basins" className="text-decoration-none">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-secondary bubble-shadow-small">
                      <i className="fas fa-user-tie"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3">
                    <div className="numbers">
                      <p className="card-category">BWB</p>
                      <h4 className="card-title">{dwr.toLocaleString()}M</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

          {/* LABS */}
          <div className="col-sm-6 col-md-3">
            <Link to="/labs" className="text-decoration-none">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-secondary bubble-shadow-small">
                      <i className="fas fa-user-tie"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3">
                    <div className="numbers">
                      <p className="card-category">Water Labs</p>
                      <h4 className="card-title">{dwr.toLocaleString()}M</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>

          {/* wi */}
          <div className="col-sm-6 col-md-3">
            <Link to="/" className="text-decoration-none">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-icon">
                    <div className="icon-big text-center icon-secondary bubble-shadow-small">
                      <i className="fas fa-user-tie"></i>
                    </div>
                  </div>
                  <div className="col col-stats ms-3">
                    <div className="numbers">
                      <p className="card-category">Water Institute</p>
                      <h4 className="card-title">{dwr.toLocaleString()}M</h4>
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
                <div className="card-title">Statistics Overview</div>
              </div>
              <div className="card-body">
                <div style={{ height: "360px" }}>
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

export default Mow;
