let scanner = null;
let scannerRunning = false;

const btnStart = document.getElementById("btnStart");
const status = document.getElementById("status");
const pesan = document.getElementById("pesan");

btnStart.addEventListener("click", startScanner);

async function (decodedText) {

    try {

        // Hentikan scanner supaya QR tidak terbaca berkali-kali
        await scanner.stop();
        scannerRunning = false;

        status.textContent = "Mengirim data...";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=UTF-8"
            },
            body: JSON.stringify({
                nis: decodedText
            })
        });

        const hasil = await response.json();

        pesan.textContent = hasil.pesan;

        status.textContent = "Selesai";

    } catch (err) {

        console.error(err);

        pesan.textContent = err.toString();

        status.textContent = "Gagal";

    }

}
