// Konfigurasi link SCRIPT_URL
const CONFIG = {
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbw46nUUyZRGZUESq1N7KF3jIoXEvHNn-tTgWDrsL198BaOzyQOA3MdKg06rnm-RkxcJSg/exec"
};

// Mengambil dan menampilkan data
fetch(CONFIG.SCRIPT_URL)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('tableBody');
        if (!tableBody) return; // Berhenti jika tidak ada elemen tableBody
        
        tableBody.innerHTML = ''; // Bersihkan tabel sebelum diisi

        // Loop data (i=1 untuk melewatkan baris judul/header)
        for (let i = 1; i < data.length; i++) {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(data[i][0]).toLocaleTimeString()}</td>
                <td>${data[i][1]}</td>
                <td>${data[i][2]}</td>
                <td>${data[i][3]}</td>
            `;
            tableBody.appendChild(row);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        const tableBody = document.getElementById('tableBody');
        if (tableBody) {
            tableBody.innerHTML = '<tr><td colspan="4" style="color:red; text-align:center;">Gagal memuat data.</td></tr>';
        }
    });
