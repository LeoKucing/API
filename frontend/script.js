const API_URL = "http://127.0.0.1:8000/mahasiswa";

const tbody = document.getElementById("dataMahasiswa");
const form = document.getElementById("formMahasiswa");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");

// =====================
// READ ALL
// =====================
async function loadData() {
    tbody.innerHTML = "";
    const res = await fetch(API_URL);
    const data = await res.json();

    for (let id in data) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${id}</td>
            <td>${data[id].nama}</td>
            <td>${data[id].jurusan}</td>
            <td>
                <button class="edit" onclick="editData(${id})">Edit</button>
                <button class="delete" onclick="hapusData(${id})">Hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    }
}

// =====================
// CREATE & UPDATE
// =====================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nama = document.getElementById("nama").value;
    const jurusan = document.getElementById("jurusan").value;

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nama, jurusan })
    });

    form.reset();
    batalEdit();
    loadData();
});

// =====================
// READ BY ID (EDIT)
// =====================
async function editData(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();

    document.getElementById("id").value = id;
    document.getElementById("nama").value = data.nama;
    document.getElementById("jurusan").value = data.jurusan;

    btnSubmit.innerText = "Update";
    btnCancel.hidden = false;
}

// =====================
// DELETE
// =====================
async function hapusData(id) {
    if (confirm("Yakin ingin menghapus data?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadData();
    }
}

// =====================
// CANCEL EDIT
// =====================
function batalEdit() {
    document.getElementById("id").value = "";
    btnSubmit.innerText = "Tambah";
    btnCancel.hidden = true;
}

// Load awal
loadData();
