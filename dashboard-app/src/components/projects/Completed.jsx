import React from "react";
import { Link } from "react-router-dom";

function Completed() {
  const stats = [
    {
      category: "Urban",
      totalProjects: 5,
      totalCost: 3000000,
      icon: "fas fa-city",
      color: "primary",
      link: "urban",
    },
    {
      category: "Rural",
      totalProjects: 8,
      totalCost: 4500000,
      icon: "fas fa-tree",
      color: "success",
      link: "rural",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Completed Projects</h3>
          <Link to="/" className="btn btn-sm btn-secondary btn-round mt-2">
            ← Go Back
          </Link>
        </div>

        {/* Region Cards */}
        <div className="row g-3">
          {stats.map((stat, index) => (
            <div key={index} className="col-md-6">
              <div
                className={`card card-stats card-round h-100 border-${stat.color} shadow-sm`}
              >
                <div
                  className={`card-header bg-${stat.color} text-white py-2 text-center fw-bold`}
                >
                  {stat.category}
                </div>

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-auto me-3">
                      <div
                        className={`icon-big text-center text-${stat.color}`}
                      >
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
                          <h4 className="mb-0">
                            TZS {stat.totalCost.toLocaleString()}
                          </h4>
                        </div>
                      </div>

                      {/* View Button */}
                      <div className="text-center mt-3">
                        <Link
                          to={`/completedprojects/${stat.link}`}
                          className={`btn btn-sm btn-${stat.color}`}
                        >
                          View Projects
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Completed;
