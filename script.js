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

    // Ambil data langsung menggunakan FormData
    const formData = new FormData(form);
    const no_absen = formData.get('no_absen');
    
    // Tambahkan info perangkat ke dalam formData agar ikut terkirim
    formData.append('perangkat', getDeviceType());

    // Validasi Nomor Absen
    if(no_absen < 1 || no_absen > 36) {
        showNotif('Nomor absen harus antara 1 sampai 36.', 'error');
        return;
    }

    // Ubah UI menjadi loading
    btn.disabled = true;
    btn.textContent = "Mengirim...";
    notif.className = "notification hidden";

    try {
        // Mengirim menggunakan format FormData agar otomatis dibaca sebagai e.parameter oleh GAS
        const response = await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            body: formData
        });

        // Karena GAS me-return ContentService.createTextOutput("Success"),
        // kita harus menangkapnya sebagai text(), bukan json()
        const resultText = await response.text();

        if (resultText === 'Success') {
            showNotif('Data absen berhasil terkirim!', 'success');
            form.reset();
        } else {
            showNotif('Gagal mengirim data. Coba lagi.', 'error');
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
