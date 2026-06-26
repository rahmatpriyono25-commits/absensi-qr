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

        if (!cameras.length) {
            status.textContent = "Tidak ada kamera";
            return;
        }

        if (!scanner) {
            scanner = new Html5Qrcode("reader");
        }

        scannerRunning = true;

        await scanner.start(

            { facingMode: "environment" },

            {
                fps: 10,
                qrbox: 250
            },
            onScanSuccess,
            () => {
                // abaikan error pembacaan
            }
        );
        status.textContent = "Kamera Aktif";
    } catch (err) {
        console.error(err);
        status.textContent = err.message;
    }
}
async function onScanSuccess(decodedText) {
    if (!scannerRunning) return;
    scannerRunning = false;
    status.textContent = "Mengirim absensi...";
    try {
        await scanner.pause(true);
        const hasil = await kirimAbsen(decodedText);
        if (hasil.success) {
            document.getElementById("nama").textContent = hasil.nama;
            document.getElementById("nis").textContent = hasil.nis;
            document.getElementById("kelas").textContent = hasil.kelas;
            pesan.textContent =
                hasil.pesan + " (" + hasil.jam + ")";
            status.textContent = "Absensi Berhasil";
        } else {
            pesan.textContent = hasil.pesan;
            status.textContent = "Absensi Gagal";
        }
        setTimeout(async () => {
            document.getElementById("nama").textContent = "-";
            document.getElementById("nis").textContent = "-";
            document.getElementById("kelas").textContent = "-";
            document.getElementById("pesan").textContent = "Menunggu QR Code...";
            await scanner.resume();
            scannerRunning = true;
            status.textContent = "Kamera Aktif";
        }, 2000);
    } catch (err) {
        console.error(err);
        status.textContent = "ERROR";
        pesan.textContent = err.toString();
    }
}