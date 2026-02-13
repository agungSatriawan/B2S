
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
      <td>${row['Tinggi Tower']}</td>
      <td>${row['Kandidat Terpilih (P/Q/R/Candidate Reject)']}</td>
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
    document.getElementById("site_name").innerHTML = data.Site_Name_Tenant;
    document.getElementById("site_names").value = data.Site_Name_Tenant;
    document.getElementById("tenant").value = data.Tenant;
    document.getElementById("regional").value = data.Regional;
    document.getElementById("prov").value = data.Propinsi;
    document.getElementById("kabkot").value = data.Kota_Kabupaten;
    document.getElementById("Lat_NOM").value = data.Lat_NOM;
    document.getElementById("Acses_Jalan").value = data.Acses_Jalan;
    document.getElementById("distance").value = data['Distance_(Meter)'];
    document.getElementById("Long_NOM").value = data.Long_NOM;
    document.getElementById("status_lahan").value = data.Status_Lahan;
    document.getElementById("Harga_Sewa_Lahan_NET").value = data.Harga_Sewa_Lahan_NET;
    document.getElementById("kandidat_terpilih").value = data['Kandidat Terpilih (P/Q/R/Candidate Reject)'];
    document.getElementById("Masa_Sewa").value = data['Masa_Sewa_(thn)'];
    document.getElementById("Harga_Sewa_Lahan_Inc").value = data['Harga_Sewa_Lahan_Inc._Pajak'];
    document.getElementById("lat_new").value = data['Lat_(NEW)'];
    document.getElementById("Pemilik_Lahan").value = data['Pemilik_Lahan'];
    document.getElementById("DP_Request").value = data['DP_Request_(Date)'];
    document.getElementById("long_new").value = data['Long_(NEW)'];
    document.getElementById("Penerima_Kuasa").value = data['Penerima_Kuasa'];
    document.getElementById("FP_Paid_Date").value = data['FP_Paid_Date'];
    document.getElementById("Luas_Lahan").value = data['Luas_Lahan/Expand_lahan'];
    document.getElementById("telp").value = data['Nomor_Telepon_LL_/_Kuasa'];
    document.getElementById("PKS_Status").value = data['PKS_Status'];s

    const modal = new bootstrap.Modal(
        document.getElementById("editModal")
    );
    modal.show();
}


let selectedRow = null;




