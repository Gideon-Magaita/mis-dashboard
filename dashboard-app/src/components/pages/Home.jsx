import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

function Home() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Dashboard cards data
  const cardData = [
    {
      category: "Total Claims",
      count: 245,
      amount: 1_294_000_000,
      icon: "fas fa-file-alt",
      color: "primary",
      link: "/claims",
    },
    {
      category: "Planned Projects",
      count: 18,
      amount: 1_303_000_000,
      icon: "fas fa-users",
      color: "info",
      link: "/planned",
    },
    {
      category: "Ongoing Projects",
      count: 12,
      amount: 1_345_000_000,
      icon: "fas fa-project-diagram",
      color: "success",
      link: "/ongoing",
    },
    {
      category: "Completed Projects",
      beneficiaries: 1_280,
      amount: 576_000_000,
      showBeneficiaries: true,
      icon: "fas fa-user-check",
      color: "danger",
      link: "/completed",
    },
    {
      category: "Paid Amount",
      amount: 520_000_000,
      amountOnly: true,
      icon: "fas fa-wallet",
      color: "warning",
      link: "/paid",
    },
  ];

  // Chart
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: cardData.map(d => d.category),
        datasets: [
          {
            data: cardData.map(d => d.amount),
            backgroundColor: cardData.map(d => {
              switch (d.color) {
                case "primary": return "#177dff";
                case "info": return "#36a3f7";
                case "success": return "#2bb930";
                case "danger": return "#f3545d";
                case "warning": return "#f7c32e";
                default: return "#177dff";
              }
            }),
            borderRadius: 12,
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
        <div className="d-flex justify-content-between align-items-center pt-2 pb-4">
          <h3 className="fw-bold mb-0">Certificates Dashboard</h3>
          <Link to="/projects" className="btn btn-primary btn-round">
            View Projects
          </Link>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {cardData.map((d, i) => (
            <div className="col-sm-6 col-md-4" key={i}>
              <Link to={d.link} className="text-decoration-none">

              <div className="card card-round h-100 shadow-sm hover-lift">

                {/* Horizontal Card Header */}
                <div
                  className={`d-flex justify-content-between align-items-center px-3 py-2 rounded-top bg-${d.color} bg-opacity-10`}
                  style={{ borderBottom: `2px solid #${d.color === 'primary' ? '177dff' : d.color === 'info' ? '36a3f7' : d.color === 'success' ? '2bb930' : d.color === 'danger' ? 'f3545d' : 'f7c32e'}` }}
                >
                  <h3 className="fw-bold text-dark mb-0">{d.category}</h3>
                  <div
                    className={`d-flex align-items-center justify-content-center icon icon-${d.color} bg-opacity-25`}
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i
                      className={`${d.icon} text-white`}
                      style={{ fontSize: "24px" }}
                    ></i>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">

                  {d.amountOnly ? (
                    <div className="text-center mt-3">
                      <p className="text-muted mb-1" style={{fontSize:'16px'}}>Amount Paid</p>
                      <h3 className="fw-bold text-dark">
                        TZS {(d.amount / 1_000_000).toLocaleString()}M
                      </h3>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between mt-3">
                      <div>
                        <p className="text-muted mb-1 small" style={{fontSize:'16px'}}>
                          {d.showBeneficiaries ? "Beneficiaries" : "Total"}
                        </p>
                        <h4 className="fw-bold mb-0 text-dark">
                          {d.showBeneficiaries
                            ? d.beneficiaries.toLocaleString()
                            : d.count}
                        </h4>
                      </div>

                      <div className="text-end">
                        <p className="text-muted mb-1 small" style={{fontSize:'16px'}}>Amount</p>
                        <h5 className="fw-bold mb-0 text-dark">
                          TZS {(d.amount / 1_000_000).toLocaleString()}M
                        </h5>
                      </div>
                    </div>
                  )}

                </div>
              </div>


              </Link>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card card-round shadow-sm">
              <div className="card-header">
                <div className="card-title fw-bold">
                  Statistics Overview
                </div>
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
