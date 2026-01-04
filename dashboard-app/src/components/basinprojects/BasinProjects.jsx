import React from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { basinProjectsData } from "./basinProjectsData";
import { basinData } from "./basinData";

function BasinProjects() {
  const { basinKey } = useParams();
  
  const navigate = useNavigate();
  
  const projects = basinProjectsData[basinKey];
  const basin = basinData[basinKey];

  if (!projects || !basin) {
    return <p className="text-danger">No projects found for this basin.</p>;
  }

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">{basin.name} – Projects</h3>

          <Link
            to='/dwr'
            className="btn btn-sm btn-secondary btn-round"
          >
            ← Back to Basin
          </Link>
        </div>

        {/* Projects */}
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-4 mb-3" key={project.id}>
              <div className="card card-stats card-round">
                <div className="card-body">
                  <p className="card-category">{project.name}</p>

                  <h4 className="mb-2">
                    TZS {project.amount.toLocaleString()}
                  </h4>

                  <span
                    className={`badge ${
                      project.status === "Completed"
                        ? "badge-success"
                        : project.status === "Ongoing"
                        ? "badge-warning"
                        : "badge-secondary"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default BasinProjects;
