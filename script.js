// Mendapatkan info perangkat
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
    return "Desktop";
}

// Otomatis mengisi nomor absen berdasarkan nama yang dipilih di dropdown (Custom Dropdown)
document.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const absen = this.getAttribute('data-absen');
        
        document.getElementById('selectedText').textContent = this.textContent;
        document.getElementById('selectedText').style.color = '#0f172a';
        document.getElementById('nama').value = value;
        document.getElementById('no_absen').value = absen;
        
        document.getElementById('dropdownList').classList.remove('open');
    });
});

document.getElementById('absensiForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const btn = document.getElementById('submitBtn');
    const notif = document.getElementById('notification');

    // Ambil data langsung menggunakan FormData
    const formData = new FormData(form);
    const no_absen = formData.get('no_absen');
    
    // Validasi Nomor Absen (Pastikan terisi dan di antara 1-35)
    if(!no_absen || no_absen < 1 || no_absen > 35) {
        showNotif('Nomor absen harus antara 1 sampai 35.', 'error');
        return;
    }

    // Tambahkan info perangkat ke dalam formData agar ikut terkirim
    formData.append('perangkat', getDeviceType());

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

        // Menangkap response text dari Google Apps Script
        const resultText = await response.text();

        if (resultText.trim() === 'Success') {
            showNotif('Data absen berhasil terkirim!', 'success');
            form.reset();
            // Reset juga nilai kustom dropdown dan nomor absen
            document.getElementById('selectedText').textContent = '-- Pilih Nama Anda --';
            document.getElementById('selectedText').style.color = '#94a3b8';
            document.getElementById('no_absen').value = '';
        } else {
            showNotif('Gagal mengirim data. Coba lagi.', 'error');
        }
    } catch (error) {
        showNotif('Terjadi kesalahan koneksi. Silakan coba lagi.', 'error');
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.textContent = "Kirim Kehadiran";
    }
});

function showNotif(message, type) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.className = `notification ${type}`;
}
