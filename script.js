// Mendapatkan info perangkat
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
    return "Desktop";
}

document.getElementById('absensiForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const btn = document.getElementById('submitBtn');
    const notif = document.getElementById('notification');

    // Ambil data
    const formData = new FormData(form);
    const data = {
        nama: formData.get('nama'),
        no_absen: formData.get('no_absen'),
        status: formData.get('status'),
        perangkat: getDeviceType()
    };

    // Validasi Nomor Absen
    if(data.no_absen < 1 || data.no_absen > 36) {
        showNotif('Nomor absen harus antara 1 sampai 36.', 'error');
        return;
    }

    // Ubah UI menjadi loading
    btn.disabled = true;
    btn.textContent = "Mengirim...";
    notif.className = "notification hidden";

    try {
        // Karena GAS sering bermasalah dengan CORS jika menggunakan POST JSON standar,
        // Kita membungkusnya ke form-urlencoded text/plain
        const response = await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.status === 'success') {
            showNotif(result.message, 'success');
            form.reset();
        } else {
            showNotif(result.message, 'error');
        }
    } catch (error) {
        showNotif('Terjadi kesalahan koneksi. Silakan coba lagi.', 'error');
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.textContent = "Kirim Absensi";
    }
});

function showNotif(message, type) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.className = `notification ${type}`;
}
