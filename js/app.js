
const tableBody = document.querySelector("tbody");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx9hlQMfR3z8YlDvIL245Qs7BkdixOfXLbUB1kC55ovLllN9irSSbhSqbNMUy8f7bLetQ/exec";

let sheetData = [];
const mapping = {
    "PID": "PID",
    "Site_ID_Tsel": "Site_ID_Tsel",
    "Site_Name_Tenant": "site_names",
    "Tenant": "tenant",
    "Regional": "regional",
    "Propinsi": "prov",
    "Kota_Kabupaten": "kabkot",
    "Kandidat Terpilih (P/Q/R/Candidate Reject)": "kandidat_terpilih",
    "SIS_SPMK": "SIS_SPMK",
    "MK_SPMK": "MK_SPMK",
    "Mitra_SACME_SPMK": "Mitra_SACME_SPMK",
    "Ketinggian Tower SPMK": "ketinggian_tower_spmk",
    "Ketinggian Tower Aktual": "Ketinggian_tower_aktual",
    "Remarks": "Remarks",
    "Status_DRM": "Status_DRM",
    "DRM_DATE": "DRM_DATE",
    "Lat_NOM": "Lat_NOM",
    "Long_NOM": "Long_NOM",
    "Lat_(NEW)": "lat_new",
    "Long_(NEW)": "long_new",
    "Distance_(Meter)": "distance",
    "Alamat_NEW": "Alamat_NEW",
    "Milestone": "Milestone",
    "Ket": "Ket",
    "WO": "wo",
    "Tanggal_WO": "Tanggal_WO",
    "Remarks_NOD_Tower": "Remarks_NOD_Tower",
    "Fabrikasi": "Fabrikasi",
    "Waspang": "Waspang",
    "Target_RFC": "Target_RFC",
    "Target_RFI": "Target_RFI",
    "Detail_Status_SACME": "Detail_Status_SACME",
    "General_Status_SACME": "General_Status_SACME",
    "Remarks_Daily": "Remarks_Daily",
    "Status_Lahan": "status_lahan",
    "Acses_Jalan": "Acses_Jalan",
    "Luas_Lahan/Expand_lahan": "Luas_Lahan",
    "Pemilik_Lahan": "Pemilik_Lahan",
    "Penerima_Kuasa": "Penerima_Kuasa",
    "Nomor_Telepon_LL_/_Kuasa": "telp",
    "Harga_Sewa_Lahan_NET": "Harga_Sewa_Lahan_NET",
    "Harga_Sewa_Lahan_Inc._Pajak": "Harga_Sewa_Lahan_Inc",
    "Masa_Sewa_(thn)": "Masa_Sewa",
    "DP_Request_(Date)": "DP_Request",
    "DP_Paid_(Date)": "DP_Paid_Date",
    "Status_FP_Request": "Status_FP_Request",
    "FP_Paid_Date": "FP_Paid_Date",
    "PKS_Status": "PKS_Status",
    "PKS_Date": "PKS_Date",
    "Tanggal_KOM_Mitra": "Tanggal_KOM_Mitra",
    "Tanggal_DRM": "Tanggal_DRM",
    "Jumlah_Cand.": "Jumlah_Cand",
    "No_Cand.": "No_Cand",
    "Coordinate_Validate_Date": "Coordinate_Validate_Date",
    "BAN/BAK": "ban",
    "IW": "iw",
    "Rekom_Lurah": "Rekom_Lurah",
    "Rekom_Camat": "Rekom_Camat",
    "Soil_Test_/Hammer_Test": "soil_test",
    "APD": "apd",
    "RFC_(Date)": "rfc_date",
    "SKOM_(Date)": "skom_date",
    "Excavation": "Excavation",
    "Bore_Pile": "Bore_Pile",
    "Pouring": "Pouring",
    "Erection": "Erection",
    "RBS_Foundation": "RBS_Foundation",
    "ME_Date": "ME_Date",
    "F_&_Y": "f&y",
    "PSB_Req": "PSB_Req",
    "PLN_Done": "PLN_Done",
    "Power_(KVA)": "power_kva",
    "Nama_Pelanggan": "Nama_Pelanggan",
    "ID_Pelanggan": "ID_Pelanggan",
    "RFI_Announce_Tenant": "RFI_Announce_Tenant",
    "RFI_Date": "RFI_Date",
    "ATP_Internal": "ATP_Internal",
    "Request_ATP": "Request_ATP",
    "Plan_ATP": "Plan_ATP",
    "ATP_External": "ATP_External",
    "Target_RFI_Tsel": "Target_RFI_Tsel",
    "PM": "PM"
};
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
  
    document.getElementById("site_name").innerHTML = data.Site_Name_Tenant;
    Object.keys(mapping).forEach(function (key) {

        const elementId = mapping[key];

        if (elementId && document.getElementById(elementId)) {
            document.getElementById(elementId).value = data[key] ?? "";
        }

    });

        const modal = new bootstrap.Modal(
            document.getElementById("editModal")
        );
        modal.show();

}


let selectedRow = null;

document.getElementById("btnSave").addEventListener("click", async function () {

    const updatedData = {};

    Object.keys(mapping).forEach(function (key) {
        const elementId = mapping[key];
        const el = document.getElementById(elementId);

        if (el) {
            updatedData[key] = el.value;
        }
    });

    try {

        const formData = new URLSearchParams();
        formData.append("data", JSON.stringify(updatedData));

        const response = await fetch(WEB_APP_URL, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.status === "success") {
            alert("✅ Data berhasil diupdate!");
            loadData();
        }

    } catch (error) {
        console.error(error);
        alert("❌ Gagal update data");
    }

});






