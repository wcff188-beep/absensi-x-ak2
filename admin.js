document.addEventListener('DOMContentLoaded', fetchAdminData);

async function fetchAdminData() {
    const tbody = document.getElementById('tableBody');
    
    try {
        const response = await fetch(`${CONFIG.SCRIPT_URL}?action=getToday`);
        const result = await response.json();

        if (result.status === 'success') {
            const data = result.data;
            tbody.innerHTML = '';
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Belum ada absensi hari ini.</td></tr>';
                return;
            }

            // Urutkan berdasarkan waktu (terbaru di atas)
            data.reverse().forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                    <td>${row[4]}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Gagal memuat data. Periksa URL Web App.</td></tr>';
    }
}
