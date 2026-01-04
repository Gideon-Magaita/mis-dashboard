import React from "react";
import { useParams, Link } from "react-router-dom";
import { projectsData } from "./projectsData";
import { authorityData } from "../regions/authorityData";

function RegionProjects() {
  const { regionKey } = useParams();
  const projects = projectsData[regionKey];
  const authority = authorityData[regionKey];

  if (!projects || !authority) {
    return <p className="text-danger">No projects found for this authority.</p>;
  }

  return (
    <div className="container-fluid">
      <div className="page-inner">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">{authority.authorityName} Projects</h3>
          <Link to={`/regions/${regionKey}`} className="btn btn-sm btn-secondary btn-round">
            ← Back to Authority
          </Link>
        </div>

        <div className="row">
          {projects.map((project) => (
            <div className="col-md-4 mb-3" key={project.id}>
              <div className="card card-stats card-round">
                <div className="card-body">
                  <p className="card-category">{project.name}</p>
                  <h4>TZS {project.amount.toLocaleString()}</h4>
                  <p className="text-muted">Status: {project.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RegionProjects;
