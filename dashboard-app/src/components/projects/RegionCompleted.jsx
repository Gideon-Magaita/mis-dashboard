import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import $ from "jquery";

// DataTables core
import "datatables.net";
import "datatables.net-bs5";

// DataTables Buttons
import "datatables.net-buttons";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

// Export dependencies
import jszip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

window.JSZip = jszip;
pdfMake.vfs = pdfFonts.vfs;


function RegionCompleted() {
  const { region } = useParams(); // urban | rural
  const tableRef = useRef(null);

  // Sample data
  const projects = [
    {
      id: 1,
      name: "Urban Water Supply Phase I",
      type: "urban",
      regionName: "Dar es Salaam",
      financialYear: "2023/2024",
      status: "Completed",
      cost: 1_200_000,
    },
    {
      id: 2,
      name: "City Drainage Improvement",
      type: "urban",
      regionName: "Dodoma",
      financialYear: "2024/2025",
      status: "Completed",
      cost: 1_800_000,
    },
    {
      id: 3,
      name: "Rural Borehole Project",
      type: "rural",
      regionName: "Morogoro",
      districtName: "Kilosa",
      financialYear: "2023/2024",
      status: "Completed",
      cost: 900_000,
    },
    {
      id: 4,
      name: "Village Water Extension",
      type: "rural",
      regionName: "Mwanza",
      districtName: "Ilemela",
      financialYear: "2024/2025",
      status: "Completed",
      cost: 1_050_000,
    },
  ];

  const filteredProjects = projects.filter(
    (p) => p.type === region && p.status === "Completed"
  );

  useEffect(() => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    const table = $(tableRef.current).DataTable({
      pageLength: 5,
      responsive: true,
      dom:
        "<'row mb-3'<'col-md-6'l><'col-md-6 text-end'B>>" +
        "<'row'<'col-12'fr>>" +
        "<'row'<'col-12'<'table-responsive't>>>" +
        "<'row mt-3'<'col-md-5'i><'col-md-7'p>>",

      buttons: [
        {
          extend: "excel",
          className: "btn btn-success btn-sm",
          title: "Completed Projects",
        },
        {
          extend: "pdf",
          className: "btn btn-danger btn-sm",
          title: "Completed Projects",
        },
        {
          extend: "print",
          className: "btn btn-secondary btn-sm",
          title: "Completed Projects",
        },
      ],

      initComplete: function () {
        const api = this.api();

        // Region filter
        api.columns(2).every(function () {
          const column = this;
          const select = $(
            '<select class="form-select form-select-sm"><option value="">All Regions</option></select>'
          )
            .appendTo($(column.header()).empty())
            .on("change", function () {
              const val = $.fn.dataTable.util.escapeRegex($(this).val());
              column.search(val ? `^${val}$` : "", true, false).draw();
            });

          column.data().unique().sort().each(function (d) {
            select.append(`<option value="${d}">${d}</option>`);
          });
        });

        // District filter (rural only)
        if (region === "rural") {
          api.columns(3).every(function () {
            const column = this;
            const select = $(
              '<select class="form-select form-select-sm"><option value="">All Districts</option></select>'
            )
              .appendTo($(column.header()).empty())
              .on("change", function () {
                const val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? `^${val}$` : "", true, false).draw();
              });

            column.data().unique().sort().each(function (d) {
              select.append(`<option value="${d}">${d}</option>`);
            });
          });
        }

        // Financial Year filter
        const fyColumnIndex = region === "rural" ? 4 : 3;
        api.columns(fyColumnIndex).every(function () {
          const column = this;
          const select = $(
            '<select class="form-select form-select-sm"><option value="">All Financial Years</option></select>'
          )
            .appendTo($(column.header()).empty())
            .on("change", function () {
              const val = $.fn.dataTable.util.escapeRegex($(this).val());
              column.search(val ? `^${val}$` : "", true, false).draw();
            });

          column.data().unique().sort().each(function (d) {
            select.append(`<option value="${d}">${d}</option>`);
          });
        });
      },
    });

    return () => table.destroy();
  }, [region]);

  return (
    <div className="container-fluid">
      <div className="page-inner">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-capitalize">
            {region === "urban" ? "Urban Projects" : "Rural Projects"} – Completed
          </h3>
          <Link to="/completed" className="btn btn-sm btn-secondary btn-round">
            ← Go Back
          </Link>
        </div>

        {/* Table */}
        <div className="card card-round shadow-sm">
          <div className="card-body">
            <table
              ref={tableRef}
              className="table table-striped table-hover align-middle"
              style={{ width: "100%" }}
            >
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Region</th>
                  {region === "rural" && <th>District</th>}
                  <th>Financial Year</th>
                  <th>Cost (TZS)</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td className="fw-semibold">{p.name}</td>
                    <td>{p.regionName}</td>
                    {region === "rural" && <td>{p.districtName}</td>}
                    <td>{p.financialYear}</td>
                    <td>
                      {p.cost.toLocaleString()}
                    </td>
                    <td>
                      <span className="badge bg-success">{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RegionCompleted;
