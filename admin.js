document.addEventListener('DOMContentLoaded', fetchAdminData);

async function fetchAdminData() {
    const tbody = document.getElementById('tableBody');
    
    try {
        const response = await fetch(CONFIG.SCRIPT_URL);
        const data = await response.json(); // Ambil data langsung sebagai array

        tbody.innerHTML = '';
        
        // Cek apakah data kosong (data.length <= 1 karena baris ke-0 adalah judul)
        if (!data || data.length <= 1) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Belum ada absensi hari ini.</td></tr>';
            return;
        }

        // Loop mulai dari i=1 agar judul (baris 0) tidak ikut masuk ke tabel
        // Kita balik (reverse) agar data terbaru ada di atas
        const dataIsi = data.slice(1).reverse();

        dataIsi.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(row[0]).toLocaleTimeString()}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error(error);
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;">Gagal memuat data.</td></tr>';
    }
}
        }
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: red;">Gagal memuat data. Periksa URL Web App.</td></tr>';
    }
}
