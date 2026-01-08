import React from "react";
import { useParams, Link } from "react-router-dom";

function RegionProjects() {
  const { region } = useParams(); // urban | rural

  // Sample projects (later replace with API)
  const projects = [
    {
      id: 1,
      name: "Urban Water Supply Phase I",
      region: "urban",
      status: "Ongoing",
      cost: 1200000,
    },
    {
      id: 2,
      name: "City Drainage Improvement",
      region: "urban",
      status: "Ongoing",
      cost: 1800000,
    },
    {
      id: 3,
      name: "Rural Borehole Project",
      region: "rural",
      status: "Ongoing",
      cost: 900000,
    },
  ];

  // Filter by region + ongoing
  const filteredProjects = projects.filter(
    (p) => p.region === region && p.status === "Ongoing"
  );

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-capitalize">
            {region} Region – Ongoing Projects
          </h3>
          <Link to="/ongoing" className="btn btn-sm btn-secondary btn-round">
            ← Back to Regions
          </Link>
        </div>

        {/* Projects Table */}
        <div className="card card-round shadow-sm">
          <div className="card-body">

            {filteredProjects.length === 0 ? (
              <div className="text-center text-muted py-5">
                No ongoing projects found for this region.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Status</th>
                      <th>Cost (TZS)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project, index) => (
                      <tr key={project.id}>
                        <td>{index + 1}</td>
                        <td>{project.name}</td>
                        <td>
                          <span className="badge badge-info">
                            {project.status}
                          </span>
                        </td>
                        <td>{project.cost.toLocaleString()}</td>
                        <td>
                          <Link
                            to={`/projects/${project.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default RegionProjects;
