let html5QrCode = null;

document.getElementById("btnStart").addEventListener("click", async function () {

    const status = document.getElementById("status");

    try {

        const cameras = await Html5Qrcode.getCameras();

        if (cameras.length === 0) {
            status.innerHTML = "Tidak ada kamera ditemukan";
            return;
        }

        status.innerHTML = "Kamera Aktif";

        html5QrCode = new Html5Qrcode("reader");

        await html5QrCode.start(
            cameras[0].id,
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250
                }
            },
            function(decodedText) {

                alert("QR Terbaca : " + decodedText);

            }
        );

    } catch(err){

        console.error(err);

        status.innerHTML = err;

    }

});
