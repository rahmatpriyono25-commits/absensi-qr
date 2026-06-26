let scanner = null;

document.getElementById("btnStart").addEventListener("click", async function () {

    const status = document.getElementById("status");

    try {

        const cameras = await Html5Qrcode.getCameras();

        if (cameras.length === 0) {
            status.innerHTML = "Tidak ada kamera";
            return;
        }

        scanner = new Html5Qrcode("reader");

        await scanner.start(
            cameras[0].id,
            {
                fps: 10,
                qrbox: 250
            },
            function(decodedText) {

                document.getElementById("pesan").innerHTML =
                    "QR : " + decodedText;

            }
        );

        status.innerHTML = "Kamera Aktif";

    } catch(err) {

        status.innerHTML = err;

        console.error(err);

    }

});
