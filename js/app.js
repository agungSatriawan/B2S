
const tableBody = document.querySelector("tbody");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwYSZwM11hz_Xj8m8AKQTGuSMBbnZT_vVNfTZ3BkCUy-QtTzKSnGEBtqSqEFUDKuVi7XQ/exec";

let sheetData = [];

async function loadData() {
    const res = await fetch(WEB_APP_URL);
    const data = await res.json();

    sheetData = data;
    renderTable();
}

function renderTable() {
    tableBody.innerHTML = "";

    sheetData.forEach((row) => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";

        tr.innerHTML = `
      <td>${row.PID}</td>
      <td>${row.Site_ID_Tsel}</td>
      <td>${row.Site_Name_Tenant}</td>
      <td>${row.Tinggi_Tower}</td>
      <td>${row['Kandidat_Terpilih_(P/Q/R/Candidate_Reject)']}</td>
      <td>${row['Lat_(NEW)']}</td>
      <td>${row['Long_(NEW)']}</td>
      <td>${row.General_Status_SACME}</td>
      <td>${row.Detail_Status_SACME}</td>
      <td>${row.Remarks_Daily}</td>
    `;

        tr.addEventListener("click", () => openModal(row));

        tableBody.appendChild(tr);
    });
}

loadData();


function openModal(data) {
    document.getElementById("PID").value = data.PID;
    document.getElementById("Site_ID_Tsel").value = data.Site_ID_Tsel;
    document.getElementById("tp").value = data.site_name;
    document.getElementById("status").value = data.status;

    const modal = new bootstrap.Modal(
        document.getElementById("editModal")
    );
    modal.show();
}


let selectedRow = null;




