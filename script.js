let scanner = null;
let scannerRunning = false;

const btnStart = document.getElementById("btnStart");
const status = document.getElementById("status");
const pesan = document.getElementById("pesan");

btnStart.addEventListener("click", startScanner);

async function startScanner() {

    if (scannerRunning) return;

    try {

        const cameras = await Html5Qrcode.getCameras();

        if (cameras.length === 0) {
            status.textContent = "Tidak ada kamera";
            return;
        }

        scanner = new Html5Qrcode("reader");

        await scanner.start(
            cameras[0].id,
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250
                }
            },

            async function(decodedText) {

                // Hentikan scanner agar tidak scan berulang
                await scanner.stop();
                scannerRunning = false;

                status.textContent = "Mengirim absensi...";
                setTimeout(async () => {
                    document.getElementById("nama").textContent = "-";
                    document.getElementById("nis").textContent = "-";
                    document.getElementById("kelas").textContent = "-";
                    document.getElementById("pesan").textContent = "Menunggu QR Code...";
                    await startScanner();
                }, 2000);

                const hasil = await kirimAbsen(decodedText);

                if (hasil.success) {

                        document.getElementById("nama").textContent = hasil.nama;
                        document.getElementById("nis").textContent = hasil.nis;
                        document.getElementById("kelas").textContent = hasil.kelas;

                        pesan.textContent = hasil.pesan + " (" + hasil.jam + ")";

                } else {
                        pesan.textContent = hasil.pesan;
                }
                        status.textContent = hasil.success
                            ? "Absensi Berhasil"
                            : "Absensi Gagal";
                        restartScanner();
            },
                function(errorMessage) {
                    // Abaikan error pembacaan QR
                }
        );
        scannerRunning = true;
        status.textContent = "Kamera Aktif";
            } catch(err) {

                console.error(err);

                status.textContent = "ERROR";

                alert(err.message || err);

            }

}

async function restartScanner() {
    document.getElementById("nama").textContent = "-";
    document.getElementById("nis").textContent = "-";
    document.getElementById("kelas").textContent = "-";
    document.getElementById("pesan").textContent = "Menunggu QR Code...";

    setTimeout(() => {
        startScanner();
    }, 2000);
}
