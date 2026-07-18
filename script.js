function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
    return "Desktop";
}

document.getElementById('absensiForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    
    // Ambil nilai input
    const data = {
        nama: document.getElementById('nama').value,
        no_absen: document.getElementById('no_absen').value,
        status: document.getElementById('status').value,
        perangkat: getDeviceType()
    };

    // Validasi
    if(data.no_absen < 1 || data.no_absen > 36) {
        showNotif('Nomor absen harus antara 1 sampai 36.', 'error');
        return;
    }

    btn.disabled = true;
    btn.textContent = "Mengirim...";

    try {
        // Kirim sebagai JSON agar lebih kompatibel dengan Google Apps Script
        const response = await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Mencegah error CORS
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        // Karena mode no-cors, kita anggap sukses jika tidak ada error jaringan
        showNotif('Data absen berhasil terkirim!', 'success');
        document.getElementById('absensiForm').reset();
    } catch (error) {
        showNotif('Terjadi kesalahan koneksi.', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = "Kirim Absensi";
    }
});

function showNotif(message, type) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.className = `notification ${type}`;
    notif.style.display = 'block';
}function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
    return "Desktop";
}

document.getElementById('absensiForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    
    // Ambil nilai input
    const data = {
        nama: document.getElementById('nama').value,
        no_absen: document.getElementById('no_absen').value,
        status: document.getElementById('status').value,
        perangkat: getDeviceType()
    };

    // Validasi
    if(data.no_absen < 1 || data.no_absen > 36) {
        showNotif('Nomor absen harus antara 1 sampai 36.', 'error');
        return;
    }

    btn.disabled = true;
    btn.textContent = "Mengirim...";

    try {
        // Kirim sebagai JSON agar lebih kompatibel dengan Google Apps Script
        const response = await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Mencegah error CORS
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        // Karena mode no-cors, kita anggap sukses jika tidak ada error jaringan
        showNotif('Data absen berhasil terkirim!', 'success');
        document.getElementById('absensiForm').reset();
    } catch (error) {
        showNotif('Terjadi kesalahan koneksi.', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = "Kirim Absensi";
    }
});

function showNotif(message, type) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.className = `notification ${type}`;
    notif.style.display = 'block';
}
