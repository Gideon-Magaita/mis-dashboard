import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";



function Ongoing() {
  // Sample data
  const stats = [
    { category: "Urban", totalProjects: 5, totalCost: 3000000, icon: "fas fa-city", color: "primary", link: "/projects/urban" },
    { category: "Rural", totalProjects: 8, totalCost: 4500000, icon: "fas fa-tree", color: "success", link: "/projects/rural" },
  ];

  const costChartRef = useRef(null);
  const projectsChartRef = useRef(null);
  const costChartInstance = useRef(null);
  const projectsChartInstance = useRef(null);

  // Initialize Cost Pie Chart
useEffect(() => {
    if (costChartInstance.current) costChartInstance.current.destroy();

    costChartInstance.current = new Chart(costChartRef.current, {
      type: "pie",
      data: {
        labels: stats.map((s) => s.category),
        datasets: [{
          label: "Project Cost (TZS)",
          data: stats.map((s) => s.totalCost),
          backgroundColor: stats.map((s) =>
            s.color === "primary"
              ? "rgba(54, 162, 235, 0.7)"
              : "rgba(75, 192, 192, 0.7)"
          ),
          borderColor: stats.map((s) =>
            s.color === "primary"
              ? "rgba(54, 162, 235, 1)"
              : "rgba(75, 192, 192, 1)"
          ),
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" }, title: { display: true, text: "Project Cost Comparison" } },
      },
    });
  }, [stats]);

  // Initialize Total Projects Pie Chart
  useEffect(() => {
    if (projectsChartInstance.current) projectsChartInstance.current.destroy();

    projectsChartInstance.current = new Chart(projectsChartRef.current, {
      type: "pie",
      data: {
        labels: stats.map((s) => s.category),
        datasets: [{
          label: "Total Projects",
          data: stats.map((s) => s.totalProjects),
          backgroundColor: stats.map((s) =>
            s.color === "primary"
              ? "rgba(54, 162, 235, 0.7)"
              : "rgba(75, 192, 192, 0.7)"
          ),
          borderColor: stats.map((s) =>
            s.color === "primary"
              ? "rgba(54, 162, 235, 1)"
              : "rgba(75, 192, 192, 1)"
          ),
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" }, title: { display: true, text: "Total Projects Comparison" } },
      },
    });
  }, [stats]);

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Page Title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Ongoing Projects</h3>
          <Link to="/" className="btn btn-sm btn-secondary btn-round mt-2">← Go Back</Link>
        </div>

        {/* Cards Row */}
        <div className="row g-3">
          {stats.map((stat, index) => (
            <div key={index} className="col-md-6">
              <Link to={stat.link} className="text-decoration-none">
                <div className={`card card-stats card-round h-100 border-${stat.color} shadow-sm hover-shadow`}>
                  <div className={`card-header bg-${stat.color} text-white py-2 text-center fw-bold`}>
                    {stat.category}
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="col-auto me-3">
                        <div className={`icon-big text-center text-${stat.color}`}>
                          <i className={`${stat.icon} fa-2x`}></i>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <div className="text-center">
                            <p className="text-muted mb-1">Total Projects</p>
                            <h4 className="mb-0">{stat.totalProjects}</h4>
                          </div>
                          <div className="text-center">
                            <p className="text-muted mb-1">Total Cost</p>
                            <h4 className="mb-0">TZS {stat.totalCost.toLocaleString()}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pie Charts Row */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card card-round">
              <div className="card-header text-center fw-bold">Project Cost Comparison</div>
              <div className="card-body">
                <canvas ref={costChartRef} height="200"></canvas>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card card-round">
              <div className="card-header text-center fw-bold">Total Projects Comparison</div>
              <div className="card-body">
                <canvas ref={projectsChartRef} height="200"></canvas>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Ongoing;
