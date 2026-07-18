document.getElementById('absensiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    
    // Ambil nilai
    const nama = document.getElementById('nama').value;
    const no_absen = document.getElementById('no_absen').value;
    const status = document.getElementById('status').value;
    const perangkat = "Mobile"; // Bisa diubah jika perlu

    btn.textContent = "Mengirim...";
    btn.disabled = true;

    // Kirim data dengan cara pindah halaman sebentar
    const url = `${CONFIG.SCRIPT_URL}?nama=${encodeURIComponent(nama)}&no_absen=${no_absen}&status=${status}&perangkat=${perangkat}`;
    
    // Redirect sebentar untuk kirim data, lalu kembali
    window.location.href = url;
});
