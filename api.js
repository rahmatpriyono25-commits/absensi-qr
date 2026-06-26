async function kirimAbsen(nis) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                nis: nis
            })
        });
        const hasil = await response.json();
        return hasil;
    } catch (err) {
        console.error(err);
        return {
            success: false,
            pesan: err.toString()
        };
    }

}
