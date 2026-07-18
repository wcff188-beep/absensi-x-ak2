document.getElementById('absensiForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const btn = document.getElementById('submitBtn');
    
    // Ambil data form
    const formData = new FormData(form);
    formData.append('perangkat', getDeviceType());

    // Validasi dasar
    if(formData.get('no_absen') < 1 || formData.get('no_absen') > 36) {
        showNotif('Nomor absen harus antara 1 sampai 36.', 'error');
        return;
    }

    btn.disabled = true;
    btn.textContent = "Mengirim...";

    // Kirim menggunakan XMLHttpRequest (paling kompatibel dengan FormData + e.parameter)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', CONFIG.SCRIPT_URL, true);
    
    xhr.onload = function() {
        if (xhr.responseText === "Success") {
            showNotif('Data absen berhasil terkirim!', 'success');
            form.reset();
        } else {
            showNotif(xhr.responseText, 'error'); // Menampilkan pesan error dari GAS
        }
        btn.disabled = false;
        btn.textContent = "Kirim Absensi";
    };
    
    xhr.onerror = function() {
        showNotif('Terjadi kesalahan koneksi.', 'error');
        btn.disabled = false;
        btn.textContent = "Kirim Absensi";
    };
    
    xhr.send(formData);
});

