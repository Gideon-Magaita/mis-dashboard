import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import $ from "jquery";

/* ===============================
   DataTables + Export imports
================================ */
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

import JSZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

/* FIXES */
window.JSZip = JSZip;
pdfMake.vfs = pdfFonts.vfs;

/* ===============================
   Sample Project Data
================================ */
const projects = [
  { name: "Borehole Construction", year: "2023/2024", region: "Dodoma", cost: 120000000 },
  { name: "Water Pipeline Extension", year: "2023/2024", region: "Singida", cost: 90000000 },
  { name: "Dam Rehabilitation", year: "2024/2025", region: "Morogoro", cost: 150000000 },
  { name: "Urban Water Supply", year: "2024/2025", region: "Arusha", cost: 110000000 },
  { name: "Rural Water Supply", year: "2024/2025", region: "Dodoma", cost: 80000000 },
];

function Planned() {
  const [selectedYear, setSelectedYear] = useState("");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  /* ===============================
     Filter projects by year
  ================================ */
  const filteredProjects = selectedYear
    ? projects.filter(p => p.year === selectedYear)
    : projects;

  /* ===============================
     Group cost by region
  ================================ */
  const regionTotals = filteredProjects.reduce((acc, project) => {
    acc[project.region] = (acc[project.region] || 0) + project.cost;
    return acc;
  }, {});

  /* ===============================
     DataTable Init
  ================================ */
  useEffect(() => {
    if ($.fn.dataTable.isDataTable("#projectsTable")) {
      $("#projectsTable").DataTable().destroy();
    }

    $("#projectsTable").DataTable({
      responsive: true,
      dom: "Bfrtip",
      buttons: [
        { extend: "excelHtml5", title: "Planned Projects" },
        { extend: "pdfHtml5", title: "Planned Projects" },
        { extend: "print", title: "Planned Projects" }
      ]
    });
  }, [filteredProjects]);

  /* ===============================
     Bar Chart (Cost per Region)
  ================================ */
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: Object.keys(regionTotals),
        datasets: [
          {
            label: "Total Cost (TZS)",
            data: Object.values(regionTotals),
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Total Planned Project Cost per Region"
          }
        },
        scales: {
          y: {
            ticks: {
              callback: value => value.toLocaleString()
            }
          }
        }
      }
    });
  }, [filteredProjects]);

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Planned Projects</h3>
          <Link to="/" className="btn btn-sm btn-secondary btn-round">
            ← Go Back
          </Link>
        </div>

        {/* Financial Year Filter */}
        <div className="mb-3">
          <select
            className="form-select w-25"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Financial Years</option>
            {[...new Set(projects.map(p => p.year))].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* DataTable */}
        <div className="card card-round">
          <div className="card-body">
            <table id="projectsTable" className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Financial Year</th>
                  <th>Region</th>
                  <th>Cost (TZS)</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p, index) => (
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td>{p.year}</td>
                    <td>{p.region}</td>
                    <td>{p.cost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card card-round mt-4">
          <div className="card-header">
            <h5 className="fw-bold mb-0">Cost Distribution by Region</h5>
          </div>
          <div className="card-body">
            <canvas ref={chartRef} height="120"></canvas>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Planned;
