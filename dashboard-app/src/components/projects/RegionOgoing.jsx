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


function RegionOgoing() {
  const { region } = useParams(); // urban | rural
  const tableRef = useRef(null);

  // Sample data
  const projects = [
  // ===== URBAN PROJECTS =====
  {
    id: 1,
    name: "Urban Water Supply Phase I",
    type: "urban",
    regionName: "Dar es Salaam",
    financialYear: "2023/2024",
    status: "Ongoing",
    cost: 1_200_000,
  },
  {
    id: 2,
    name: "City Drainage Improvement",
    type: "urban",
    regionName: "Dodoma",
    financialYear: "2024/2025",
    status: "Ongoing",
    cost: 1_800_000,
  },
  {
    id: 3,
    name: "Urban Sewerage Expansion",
    type: "urban",
    regionName: "Arusha",
    financialYear: "2023/2024",
    status: "Completed",
    cost: 2_500_000,
  },
  {
    id: 4,
    name: "Municipal Water Network Upgrade",
    type: "urban",
    regionName: "Mwanza",
    financialYear: "2022/2023",
    status: "Completed",
    cost: 1_650_000,
  },
  {
    id: 5,
    name: "Urban Sanitation Improvement",
    type: "urban",
    regionName: "Mbeya",
    financialYear: "2024/2025",
    status: "Ongoing",
    cost: 1_300_000,
  },
  {
    id: 6,
    name: "Storm Water Control Project",
    type: "urban",
    regionName: "Tanga",
    financialYear: "2023/2024",
    status: "Ongoing",
    cost: 980_000,
  },
  {
    id: 7,
    name: "Urban Water Meter Installation",
    type: "urban",
    regionName: "Morogoro",
    financialYear: "2022/2023",
    status: "Completed",
    cost: 720_000,
  },
  {
    id: 8,
    name: "City Wastewater Treatment Plant",
    type: "urban",
    regionName: "Zanzibar",
    financialYear: "2024/2025",
    status: "Planned",
    cost: 3_200_000,
  },
  {
    id: 9,
    name: "Urban Flood Mitigation Project",
    type: "urban",
    regionName: "Kigoma",
    financialYear: "2023/2024",
    status: "Ongoing",
    cost: 1_450_000,
  },
  {
    id: 10,
    name: "Urban Pipeline Rehabilitation",
    type: "urban",
    regionName: "Shinyanga",
    financialYear: "2022/2023",
    status: "Completed",
    cost: 860_000,
  },

  // ===== RURAL PROJECTS =====
  {
    id: 11,
    name: "Rural Borehole Project",
    type: "rural",
    regionName: "Morogoro",
    districtName: "Kilosa",
    financialYear: "2023/2024",
    status: "Ongoing",
    cost: 900_000,
  },
  {
    id: 12,
    name: "Village Water Extension",
    type: "rural",
    regionName: "Mwanza",
    districtName: "Ilemela",
    financialYear: "2024/2025",
    status: "Ongoing",
    cost: 1_050_000,
  },
  {
    id: 13,
    name: "Community Borehole Drilling",
    type: "rural",
    regionName: "Tabora",
    districtName: "Uyui",
    financialYear: "2022/2023",
    status: "Completed",
    cost: 650_000,
  },
  {
    id: 14,
    name: "Rural Water Tank Construction",
    type: "rural",
    regionName: "Singida",
    districtName: "Iramba",
    financialYear: "2023/2024",
    status: "Ongoing",
    cost: 480_000,
  },
  {
    id: 15,
    name: "Village Solar Water Pump",
    type: "rural",
    regionName: "Dodoma",
    districtName: "Chamwino",
    financialYear: "2024/2025",
    status: "Planned",
    cost: 720_000,
  },
  {
    id: 16,
    name: "Rural Gravity Water Scheme",
    type: "rural",
    regionName: "Kilimanjaro",
    districtName: "Hai",
    financialYear: "2022/2023",
    status: "Completed",
    cost: 1_100_000,
  },
  {
    id: 17,
    name: "Village Hand Pump Rehabilitation",
    type: "rural",
    regionName: "Lindi",
    districtName: "Nachingwea",
    financialYear: "2023/2024",
    status: "Ongoing",
    cost: 300_000,
  },
  {
    id: 18,
    name: "Rural Water Supply Phase II",
    type: "rural",
    regionName: "Rukwa",
    districtName: "Sumbawanga",
    financialYear: "2024/2025",
    status: "Planned",
    cost: 1_250_000,
  },
  {
    id: 19,
    name: "Village Rainwater Harvesting",
    type: "rural",
    regionName: "Manyara",
    districtName: "Babati",
    financialYear: "2022/2023",
    status: "Completed",
    cost: 410_000,
  },
  {
    id: 20,
    name: "Rural Water Pipeline Extension",
    type: "rural",
    regionName: "Pwani",
    districtName: "Bagamoyo",
    financialYear: "2023/2024",
    status: "Ongoing",
    cost: 870_000,
  },
];


  const filteredProjects = projects.filter(
    (p) => p.type === region && p.status === "Ongoing"
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
          title: "Ongoing Projects",
        },
        {
          extend: "pdf",
          className: "btn btn-danger btn-sm",
          title: "Ongoing Projects",
        },
        {
          extend: "print",
          className: "btn btn-secondary btn-sm",
          title: "Ongoing Projects",
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
            {region === "urban" ? "Urban Projects" : "Rural Projects"} – Ongoing
          </h3>
          <Link to="/ongoing" className="btn btn-sm btn-secondary btn-round">
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
                      <span className="badge bg-info">{p.status}</span>
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

export default RegionOgoing;
