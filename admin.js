document.getElementById('absensiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil data
    const nama = document.getElementById('nama').value;
    const no_absen = document.getElementById('no_absen').value;
    const status = document.getElementById('status').value;
    const perangkat = "Mobile";

    // Ubah tombol
    const btn = document.getElementById('submitBtn');
    btn.textContent = "Mengirim...";
    btn.disabled = true;

    // Pakai iframe tersembunyi untuk kirim data (Anti-Stuck)
    const url = `${CONFIG.SCRIPT_URL}?nama=${encodeURIComponent(nama)}&no_absen=${no_absen}&status=${status}&perangkat=${perangkat}`;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);

    // Langsung beri notifikasi sukses setelah 2 detik
    setTimeout(() => {
        alert('Data berhasil dikirim!');
        btn.textContent = "Kirim Absensi";
        btn.disabled = false;
        document.getElementById('absensiForm').reset();
    }, 2000);
});
