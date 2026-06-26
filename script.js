let scanner = null;
let scannerRunning = false;

const btnStart = document.getElementById("btnStart");
const status = document.getElementById("status");
const pesan = document.getElementById("pesan");

btnStart.addEventListener("click", startScanner);

async function startScanner() {

    if (scannerRunning) {
        alert("Scanner sudah berjalan.");
        return;
    }

    try {

        status.textContent = "Mencari kamera...";

        // Ambil daftar kamera
        const cameras = await Html5Qrcode.getCameras();

        console.log("Daftar Kamera:", cameras);

        if (!cameras || cameras.length === 0) {
            status.textContent = "Tidak ada kamera ditemukan";
            return;
        }

        alert("Kamera ditemukan: " + cameras.length);

        // Pilih kamera pertama
        const cameraId = cameras[0].id;

        scanner = new Html5Qrcode("reader");

        status.textContent = "Memulai kamera...";

        await scanner.start(
            cameraId,
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250
                }
            },
            function (decodedText) {

                console.log("QR:", decodedText);

                pesan.textContent = "QR Terbaca : " + decodedText;

            },
            function (errorMessage) {
                // Error scan diabaikan
            }
        );

        scannerRunning = true;

        status.textContent = "Kamera Aktif";

    } catch (err) {

        console.error(err);

        status.textContent = "ERROR";

        alert(
            "Nama Error : " + err.name +
            "\n\nPesan : " + err.message
        );

    }

}
