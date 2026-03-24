let lastPrice = 0;

async function fetchPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const price = data.bitcoin.usd;
        
        const card = document.getElementById('btc-card');
        const priceDisplay = card.querySelector('.price');
        
        // Intensity Logic: Detect a "Crash"
        if (lastPrice > 0 && price < lastPrice) {
            card.classList.add('crash-alert');
            document.getElementById('status').innerText = "CRASH DETECTED";
        } else {
            card.classList.remove('crash-alert');
            document.getElementById('status').innerText = "STABLE";
        }

        priceDisplay.innerText = `$${price.toLocaleString()}`;
        lastPrice = price;

    } catch (error) {
        console.error("System Error: Data Stream Interrupted", error);
    }
}

// Update every 10 seconds for intensity
setInterval(fetchPrice, 10000);
fetchPrice();

// Panic Button: Local Storage Wipe
document.getElementById('panic-btn').addEventListener('click', () => {
    localStorage.clear();
    alert("SYSTEM PURGED");
});
