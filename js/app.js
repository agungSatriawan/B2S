
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

const statusMapping = {
    "01. On Air": "01. On Air",
    "02. BAST CME DONE": "02. BAST CME DONE",
    "03. BAST SITAC DONE": "03. BAST SITAC DONE",
    "04. BAST SACME NY": "04. BAST SACME NY",
    "05. BAST SACME DONE": "05. BAST SACME DONE",
    "06. ATP DONE": "06. ATP",
    "07. RFI": "07. RFI",
    "08. SOFT RFI": "08. SOFT RFI",

    "09. CME": "09. CME",
    "09.a PLN DONE": "09. CME",
    "09. b ME DONE": "09. CME",
    "09.c ME OG": "09. CME",
    "09.d ERECTION DONE": "09. CME",
    "09.e ERECTION OG": "09. CME",
    "09.f CURRING DONE": "09. CME",
    "09.g CURRING OG": "09. CME",
    "09.h POURING DONE": "09. CME",
    "09.i POURING OG": "09. CME",
    "09.j REBBARING DONE": "09. CME",
    "09.k REBBARING OG": "09. CME",
    "09.l EXCAVATION DONE": "09. CME",
    "09.m EXCAVATION OG": "09. CME",
    "09.n Site Opening/Clearing": "09. CME",

    "10. RFC": "10. RFC",
    "10.a IMB DONE": "10. RFC",
    "10.b IMB OG": "11. SITAC 2",

    "11. SITAC 2": "11. SITAC 2",
    "11.a RFC DONE": "11. SITAC 2",
    "11.b APD DONE": "11. SITAC 2",
    "11.c APD OG": "11. SITAC 2",
    "11.d SOIL/HAMMER DONE": "11. SITAC 2",
    "11.e SOIL/HAMMER OG": "11. SITAC 2",
    "11.f REKOM CAMAT DONE": "11. SITAC 2",
    "11.g REKOM CAMAT OG": "11. SITAC 2",
    "11. h REKOM LURAH DONE": "11. SITAC 2",
    "11. I REKOM LURAH OG": "11. SITAC 2",
    "11. j IW DONE": "11. SITAC 2",

    "11.k IW OG": "12. SITAC 1",
    "11. l BAN BAK DONE": "12. SITAC 1",
    "11.m BAN BAK OG": "12. SITAC 1",

    "12. VALIDASI DONE": "13. SIS",
    "12.VALIDASI OG": "13. SIS",
    "12. TSSR DONE": "13. SIS",
    "13. TSSR OG": "13. SIS",
    "14. REHUNTING": "13. SIS",
    "15. HUNTING": "13. SIS",

    "16. HOLD": "13. HOLD",
    "17. DROP": "14. DROP",
    "18. PKS OG": "15. PKS",
    "19. PKS DONE": "15. PKS"
};
document.getElementById("Detail_Status_SACME")
    .addEventListener("change", function () {

        const selectedValue = this.value;

        const generalStatus = statusMapping[selectedValue] || "";

        document.getElementById("General_Status_SACME").value = generalStatus;

    });

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
      <td class="text-center">${row['Tinggi Tower']}</td>
      <td class="text-center">${row['Kandidat Terpilih (P/Q/R/Candidate Reject)']}</td>
      <td>${row['Lat_(NEW)']}</td>
      <td>${row['Long_(NEW)']}</td>
      <td class="text-nowrap">${row.General_Status_SACME}</td>
      <td class="text-nowrap">${row.Detail_Status_SACME}</td>
      <td class="text-truncate d-inline-blocks" style="max-width:70px;">${row.Remarks_Daily}</td>
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
        if (!elementId) return;

        const value = data[key] ?? "";

        // ===== FIELD YANG PAKE TINYMCE =====
        if (elementId === "Remarks_Daily" || elementId === "Alamat_NEW") {

            let cleanText = cleanHTMLToText(value);
            let formatted = cleanText.replace(/\n/g, "<br>");

            tinymce.get(elementId)?.setContent(formatted);

        } else {

            const el = document.getElementById(elementId);
            if (el) el.value = value;

        }

        const detail = data.Detail_Status_SACME ?? "";
        document.getElementById("Detail_Status_SACME").value = detail;

        document.getElementById("General_Status_SACME").value =
            statusMapping[detail] || "";


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

        if (elementId === "Remarks_Daily") {
            updatedData[key] = tinymce
                .get("Remarks_Daily")
                .getContent({ format: "text" });
        } else if (elementId === "Alamat_NEW"){
            updatedData[key] = tinymce
                .get("Alamat_NEW")
                .getContent({ format: "text" });
        } else if (el) {
            updatedData[key] = el.value;
        }

        

    });

    const formData = new URLSearchParams();
    formData.append("data", JSON.stringify(updatedData));

    try {

        await fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify(updatedData),
            headers: {
                "Content-Type": "text/plain"
            },
            mode: "no-cors"
        });


        alert("✅ Data berhasil dikirim!");
        loadData(); // reload table

    } catch (error) {
        console.error(error);
        alert("❌ Gagal update data");
    }

});

tinymce.init({
    selector: 'textarea',
    height: 300,
    menubar: false,
    plugins: 'lists link table code',
    toolbar: 'undo redo | bold italic underline | bullist numlist | link | code',
    branding: false,
    forced_root_block: false,   // penting!
    force_br_newlines: true,
    force_p_newlines: false
});

function cleanHTMLToText(html) {
    if (!html) return "";

    return html
        .replace(/<\/p>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .trim();
}









