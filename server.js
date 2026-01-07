const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const CARDS_POOL = require('./cards_data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// --- BASE DE DATOS EN MEMORIA ---
let ordersDB = {};      
let userInventory = {}; 

// --- FUNCIÓN RANDOM (Igual probabilidad para todas) ---
function getRandomCards(quantity = 5) {
    const selected = [];
    for (let i = 0; i < quantity; i++) {
        // Selección totalmente aleatoria 1/46
        const randomIndex = Math.floor(Math.random() * CARDS_POOL.length);
        selected.push(CARDS_POOL[randomIndex]);
    }
    return selected;
}

// --- RUTA 1: ABRIR SOBRE ---
app.post('/api/open-pack', (req, res) => {
    const { order_id, token, customer_email } = req.body;

    if (!order_id || !token) return res.status(400).json({ success: false, message: "Datos incompletos" });
    
    const userIdentifier = customer_email || `Anon_${order_id}`;

    if (ordersDB[order_id] && ordersDB[order_id].opened) {
        return res.status(403).json({ success: false, message: "Sobre ya abierto" });
    }

    const newCards = getRandomCards(5);

    if (!userInventory[userIdentifier]) {
        userInventory[userIdentifier] = { total_cards: 0, collection: {} };
    }

    newCards.forEach(card => {
        userInventory[userIdentifier].total_cards += 1;
        if (userInventory[userIdentifier].collection[card.name]) {
            userInventory[userIdentifier].collection[card.name] += 1;
        } else {
            userInventory[userIdentifier].collection[card.name] = 1;
        }
    });

    ordersDB[order_id] = { opened: true, date: new Date(), user: userIdentifier };

    res.json({ success: true, cards: newCards });
});

// --- RUTA 2: INVENTARIO ADMIN ---
app.get('/api/admin/inventory', (req, res) => {
    res.json({
        total_orders: Object.keys(ordersDB).length,
        inventory: userInventory
    });
});

// --- RUTA 3: VER CARTAS (Vista limpia sin rangos) ---
app.get('/ver-cartas', (req, res) => {
    let htmlContent = `
    <html>
        <head>
            <title>Colección Completa - Mundial 2026</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f4f4f4; }
                h1 { color: #d20a2e; text-align: center; }
                .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; padding: 20px; }
                .card-item { background: white; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
                .card-item img { width: 100%; border-radius: 4px; }
                .card-name { font-weight: bold; margin-top: 10px; font-size: 14px; }
                .count { margin-top: 10px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <h1>Colección Oficial (${CARDS_POOL.length} Cartas)</h1>
            <div class="grid">
    `;

    CARDS_POOL.forEach(card => {
        htmlContent += `
            <div class="card-item">
                <img src="${card.image_url}" loading="lazy" alt="${card.name}">
                <div class="card-name">${card.name}</div>
            </div>
        `;
    });

    htmlContent += `</div></body></html>`;
    res.send(htmlContent);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});