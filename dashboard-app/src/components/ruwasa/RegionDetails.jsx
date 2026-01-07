import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Chart from "chart.js/auto";
import ruwasaRegions from "./ruwasaRegions";

function RegionDetails() {
  const { regionKey } = useParams();
  const region = ruwasaRegions[regionKey];

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  if (!region) {
    return <h4 className="text-danger">Region not found</h4>;
  }

  const totalAmount = region.districts.reduce((sum, d) => sum + d.amount, 0);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: region.districts.map((d) => d.name),
        datasets: [
          {
            label: "Amount (TZS)",
            data: region.districts.map((d) => d.amount),
            backgroundColor: region.districts.map((d) => d.color || "#177dff"),
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
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
  }, [region]);

  return (
    <div className="container-fluid">
      <div className="page-inner">
        
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h3 className="fw-bold">
            {region.name} – Claimed amounts per District
            <p className="text-muted">
            Total Amount: <strong>TZS {totalAmount.toLocaleString()}</strong>
          </p>
          </h3>
          
          <Link to="/ruwasa" className="btn btn-sm btn-secondary btn-round">
            ← Back to Regions
          </Link>
        </div>


        <div className="row">
          {region.districts.map((district) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={district.key}>
              <Link
                to={`/ruwasaprojects/${district.key}`}
                className="text-decoration-none"
              >
                <div className="card card-round card-stats">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div
                        className="col-icon"
                        style={{ backgroundColor: district.color || "#177dff" }}
                      >
                        <div className="icon-big text-center bubble-shadow-small text-white">
                          <i className="fas fa-city"></i>
                        </div>
                      </div>
                      <div className="col col-stats ms-3">
                        <div className="numbers">
                          <p className="card-category">{district.name}</p>
                          <h4 className="card-title">
                            TZS {district.amount.toLocaleString()}
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

        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-title">District Amount Comparison (TZS)</div>
              </div>
              <div className="card-body">
                <div style={{ height: "500px" }}>
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

export default RegionDetails;
