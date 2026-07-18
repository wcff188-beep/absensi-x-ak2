document.getElementById('absensiForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const form = e.target;
    
    // Ambil data
    const nama = document.getElementById('nama').value;
    const no_absen = document.getElementById('no_absen').value;
    const status = document.getElementById('status').value;
    const perangkat = getDeviceType();

    if(no_absen < 1 || no_absen > 36) {
        showNotif('Nomor absen harus antara 1 sampai 36.', 'error');
        return;
    }

    btn.disabled = true;
    btn.textContent = "Mengirim...";

    // Kirim data via URL (Metode GET)
    const url = `${CONFIG.SCRIPT_URL}?nama=${encodeURIComponent(nama)}&no_absen=${no_absen}&status=${status}&perangkat=${perangkat}`;

    try {
        await fetch(url); // Tidak perlu await response, cukup panggil URL-nya
        showNotif('Data berhasil dikirim!', 'success');
        form.reset();
    } catch (error) {
        showNotif('Gagal mengirim data.', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = "Kirim Absensi";
    }
});

function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
    return "Desktop";
}

function showNotif(message, type) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.className = `notification ${type}`;
    notif.style.display = 'block';
}
