document.getElementById("btnStart").addEventListener("click", async function () {

    alert("Langkah 1");

    try {

        const cameras = await Html5Qrcode.getCameras();

        alert("Jumlah kamera: " + cameras.length);

        console.log(cameras);

    } catch (err) {

        alert("ERROR: " + err);

        console.error(err);

    }

});
