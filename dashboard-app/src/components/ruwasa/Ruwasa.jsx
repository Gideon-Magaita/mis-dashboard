import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

function Ruwasa() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // RUWASA Regions Dataset
  const regions = [
    { key: "arusha", name: "Arusha", amount: 1200000 },
    { key: "dodoma", name: "Dodoma (Headquarters)", amount: 2500000 },
    { key: "geita", name: "Geita", amount: 980000 },
    { key: "iringa", name: "Iringa", amount: 1100000 },
    { key: "kagera", name: "Kagera", amount: 850000 },
    { key: "katavi", name: "Katavi", amount: 430000 },
    { key: "kigoma", name: "Kigoma", amount: 760000 },
    { key: "kilimanjaro", name: "Kilimanjaro", amount: 1400000 },
    { key: "lindi", name: "Lindi", amount: 620000 },
    { key: "manyara", name: "Manyara", amount: 890000 },
    { key: "mara", name: "Mara", amount: 910000 },
    { key: "mbeya", name: "Mbeya", amount: 1600000 },
    { key: "morogoro", name: "Morogoro", amount: 1800000 },
    { key: "mtwara", name: "Mtwara", amount: 700000 },
    { key: "mwanza", name: "Mwanza", amount: 2000000 },
    { key: "njombe", name: "Njombe", amount: 540000 },
    { key: "pwani", name: "Pwani", amount: 1250000 },
    { key: "rukwa", name: "Rukwa", amount: 610000 },
    { key: "ruvuma", name: "Ruvuma", amount: 770000 },
    { key: "shinyanga", name: "Shinyanga", amount: 930000 },
    { key: "simiyu", name: "Simiyu", amount: 820000 },
    { key: "singida", name: "Singida", amount: 680000 },
    { key: "songwe", name: "Songwe", amount: 590000 },
    { key: "tabora", name: "Tabora", amount: 1040000 },
    { key: "tanga", name: "Tanga", amount: 1500000 },
  ];

  //Chart
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: regions.map((r) => r.name),
        datasets: [
          {
            label: "Amount (TZS)",
            data: regions.map((r) => r.amount),
            backgroundColor: "#177dff",
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: "y",
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
          x: {
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
          <h3 className="fw-bold">RUWASA – Claimed amounts per region</h3>
          
          <div className="mb-4">
          <Link to="/claims" className="btn btn-sm btn-secondary btn-round">
            ← Go Back
          </Link>
        </div>
        </div>

        {/* Region Cards */}
        <div className="row">
          {regions.map((region) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3 mb-3"
              key={region.key}
            >
              <Link
                to={`/ruwasa/${region.key}`}
                className="text-decoration-none"
              >
                <div className="card card-stats card-round">
                  <div className="card-body">
                    <div className="row align-items-center">

                      <div className="col-icon">
                        <div className="icon-big text-center icon-primary bubble-shadow-small">
                          <i className="fas fa-map-marked-alt"></i>
                        </div>
                      </div>

                      <div className="col col-stats ms-3">
                        <div className="numbers">
                          <p className="card-category">{region.name}</p>
                          <h4 className="card-title">
                            TZS {region.amount.toLocaleString()}
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
                  RUWASA Regional Amount Comparison
                </div>
              </div>
              <div className="card-body">
                <div style={{ height: "650px" }}>
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

export default Ruwasa;
