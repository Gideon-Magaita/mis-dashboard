import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

function Home() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Demo data with TZS amounts (millions)
  const cardData = [
    { category: "Total Claims", amount: 1_294_000_000, icon: "fas fa-file-alt", color: "primary", link: "/claims" },
    { category: "Total IPCS", amount: 1_303_000_000, icon: "fas fa-users", color: "info", link: "/ipcs" },
    { category: "Projects", amount: 1_345_000_000, icon: "fas fa-project-diagram", color: "success", link: "/projects" },
    { category: "Consultant IPCS", amount: 576_000_000, icon: "fas fa-user-tie", color: "danger", link: "/consultants" },
  ];

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: cardData.map(d => d.category),
        datasets: [
          {
            label: "Statistics Overview (TZS)",
            data: cardData.map(d => d.amount),
            backgroundColor: cardData.map(d => {
              switch (d.color) {
                case "primary": return "#177dff";
                case "info": return "#36a3f7";
                case "success": return "#2bb930";
                case "secondary": return "#f3545d";
                default: return "#177dff";
              }
            }),
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
              label: ctx => `TZS ${ctx.raw.toLocaleString()}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `TZS ${value.toLocaleString()}`,
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

        {/* Header */}
        <div className="d-flex justify-content-between pt-2 pb-4">
          <h3 className="fw-bold">Dashboard</h3>
          <Link to="/projects" className="btn btn-primary btn-round">
            View Projects
          </Link>
        </div>

        {/* Cards */}
        <div className="row">
          {cardData.map((d, i) => (
            <div className="col-sm-6 col-md-3" key={i}>
              <Link to={d.link} className="text-decoration-none">
                <div className="card card-stats card-round">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-icon">
                        <div className={`icon-big text-center icon-${d.color} bubble-shadow-small`}>
                          <i className={d.icon}></i>
                        </div>
                      </div>
                      <div className="col col-stats ms-3">
                        <div className="numbers">
                          <p className="card-category">{d.category}</p>
                          <h4 className="card-title">
                            TZS {(d.amount / 1_000_000).toLocaleString()}M
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

export default Home;
