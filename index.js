require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- CONEXIÓN A BASE DE DATOS ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ ¡CONEXIÓN EXITOSA! Base de datos lista.'))
    .catch(err => console.error('❌ Error de conexión:', err));

// --- MODELO ---
const RegistroSchema = new mongoose.Schema({
    orden: { type: String, required: true },
    email: String,
    fecha: { type: Date, default: Date.now },
    cartas: Array
});
const Registro = mongoose.model('Registro', RegistroSchema);

// --- TUS CARTAS ---
const TODAS_LAS_CARTAS = [
    { id: "ARG", nombre: "ARGENTINA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/6_54188d7b-1ec4-4851-9866-79708a4341ba.png?v=1767765508&width=990" },
    { id: "URU", nombre: "URUGUAY", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/7_a9f94022-25fe-492f-9b02-51b78ca0016a.png?v=1767765505&width=990" },
    { id: "CRC", nombre: "COSTA RICA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/8_07f85a37-4bc3-4fe2-8dab-375f7869f8fe.png?v=1767765508&width=990" },
    { id: "FRA", nombre: "FRANCIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/9_9df24560-3b4f-40d7-b302-5171145d7fdd.png?v=1767765505&width=990" },
    { id: "HAI", nombre: "HAITI", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/10_d0aa080a-e8ee-45d9-89a9-55b1defed0b5.png?v=1767765505&width=990" },
    { id: "JAP", nombre: "JAPÓN", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/11_7ae0eb1f-6678-4707-a74f-554de1589b21.png?v=1767765505&width=990" },
    { id: "ESC", nombre: "ESCOCIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/12_5794a910-7bb9-445a-8861-5004958fa43b.png?v=1767765505&width=990" },
    { id: "CBV", nombre: "CABO VERDE", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/13_4ee216c9-488f-4a64-8a3d-a284b0acbf61.png?v=1767765505&width=990" },
    { id: "POR", nombre: "PORTUGAL", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/14_4cef2f4f-f2ce-4423-87b6-b4a444ad3f53.png?v=1767765505&width=990" },
    { id: "MAR", nombre: "MARRUECOS", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/15_ee904571-ca46-403a-970c-3ac796453037.png?v=1767765505&width=990" },
    { id: "POL", nombre: "POLONIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/16_170f33af-522f-494e-ae03-95aba3945aa5.png?v=1767765505&width=990" },
    { id: "CHI", nombre: "CHILE", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/17_8641eb13-64f2-4a8a-9bb1-b8e22c018d92.png?v=1767765505&width=990" },
    { id: "AUS", nombre: "AUSTRIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/18_e6c9b252-e5e7-4b2a-a001-7c9319848c18.png?v=1767765505&width=990" },
    { id: "ESP", nombre: "ESPAÑA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/19_290a7f2f-2cc2-4ed8-a1ed-99be5c610e52.png?v=1767765505&width=990" },
    { id: "KOR", nombre: "COREA DEL SUR", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/20_4323a3af-a374-429a-ac1b-0baf82ee6771.png?v=1767765505&width=990" },
    { id: "TUN", nombre: "TUNEZ", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/21_3d108953-eb5f-489b-b439-c6e680da813e.png?v=1767765505&width=990" },
    { id: "CRO", nombre: "CROACIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/22_fda058aa-bbb3-499a-b8f0-08d1f2a7739c.png?v=1767765505&width=990" },
    { id: "CAN", nombre: "CANADA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/23_a98566f2-939d-4f5c-bb5d-9728db96e383.png?v=1767765505&width=990" },
    { id: "PAN", nombre: "PANAMA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/24_9eeac16c-6a77-4147-a591-c73403c3095b.png?v=1767765505&width=990" },
    { id: "NOR", nombre: "NORUEGA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/25_41210fbd-9420-444d-8843-6bf1495ccf5d.png?v=1767765505&width=990" },
    { id: "PAR", nombre: "PARAGUAY", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/26_f0a75258-2215-448a-8524-42ee8728eeab.png?v=1767765505&width=990" },
    { id: "EGY", nombre: "EGIPTO", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/27_e8822b79-cfd5-497e-9254-8173db4edd78.png?v=1767765505&width=990" },
    { id: "SUI", nombre: "SUIZA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/28_fc51cc36-13ae-49e4-95ad-f8384a78616e.png?v=1767765505&width=990" },
    { id: "BEL", nombre: "BELGICA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/29_d994a85c-00aa-4d12-9649-190210c897b7.png?v=1767765505&width=990" },
    { id: "DEN", nombre: "DINAMARCA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/30_727e3f6c-c673-464c-bf62-9412cda6bde2.png?v=1767765505&width=990" },
    { id: "BRA", nombre: "BRASIL", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/31_18646e93-6edc-4e29-b6c9-38a3e3195804.png?v=1767765505&width=990" },
    { id: "JAM", nombre: "JAMAICA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/32_8bd6dfef-2584-483b-a632-0fff3adcc68e.png?v=1767765505&width=990" },
    { id: "COL", nombre: "COLOMBIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/33_2db75ec5-c8e4-481a-9881-366f60d63c16.png?v=1767765505&width=990" },
    { id: "ECU", nombre: "ECUADOR", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/34_d634f807-b316-421a-9927-13ca4f428c45.png?v=1767765505&width=990" },
    { id: "ALG", nombre: "ARGELIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/35_6ccc1044-a477-44e8-989c-8ac182e89ec2.png?v=1767765505&width=990" },
    { id: "RSA", nombre: "SUDAFRICA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/36_d692a0ba-8bed-454b-8604-b46d5adb1d07.png?v=1767765505&width=990" },
    { id: "MEX", nombre: "MEXICO", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/37_f1c63d65-cc62-4fe4-a32b-ea2ad41f5ce8.png?v=1767765505&width=990" },
    { id: "KSA", nombre: "ARABIA SAUDI", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/38_a83e3ab0-74a6-4376-acd4-1543c055c477.png?v=1767765505&width=990" },
    { id: "ITA", nombre: "ITALIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/39_a59b91c4-b633-4e85-a7ae-7a6fb8a06696.png?v=1767765507&width=990" },
    { id: "GER", nombre: "ALEMANIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/40_eba2a812-63ac-4ccb-bdf1-358afcfdf96a.png?v=1767765505&width=990" },
    { id: "SEN", nombre: "SENEGAL", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/41_6e465a66-50f4-4cfb-9eb2-2cf5bf6d3639.png?v=1767765505&width=990" },
    { id: "ENG", nombre: "INGLATERRA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/42_5293b125-84ca-4182-864e-b50b4cfc5052.png?v=1767765505&width=990" },
    { id: "USA", nombre: "USA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/43_2a5567e1-67a6-4c13-b268-27f09e68a067.png?v=1767765505&width=990" },
    { id: "GHA", nombre: "GHANA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/44_266e751e-ceaa-409a-b7cf-e65034a7113b.png?v=1767765506&width=990" },
    { id: "JOR", nombre: "JORDANIA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/45_6ae4f80c-38b7-45b6-b7aa-4af79a2994a5.png?v=1767765505&width=990" },
    { id: "UZB", nombre: "UZBEKISTAN", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/46_b84bb275-a5da-4f6a-8e8d-f978bccb5a95.png?v=1767765509&width=990" },
    { id: "NZL", nombre: "NUEVA ZELANDA", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/47_c20fd24c-79f0-4eec-a2ca-7f0d609a2572.png?v=1767765505&width=990" },
    { id: "NED", nombre: "PAISES BAJOS", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/49_7df0be63-a547-4470-a02b-cc10e3cc45a2.png?v=1767765505&width=990" },
    { id: "CIV", nombre: "COSTA DE MARFIL", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/50_896f9759-3120-4192-a2ee-20ada062c8f8.png?v=1767765505&width=990" },
    { id: "QAT", nombre: "QATAR", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/51.png?v=1767765505&width=990" },
    { id: "IRN", nombre: "IRAN", url: "https://ucuha5-yc.myshopify.com/cdn/shop/files/PRODUCTOS.png?v=1767766225&width=990" }
];

// --- RUTA: ABRIR SOBRE ---
app.post('/api/abrir', async (req, res) => {
    const { orden, email } = req.body;
    
    // 1. Verificamos si ya existe
    const ordenExistente = await Registro.findOne({ orden: orden });
    if (ordenExistente) {
        return res.json({ 
            mensaje: "¡Este sobre ya fue abierto!", 
            cartas: ordenExistente.cartas,
            nuevo: false
        });
    }

    // 2. Elegimos 5 cartas al azar
    const seleccion = [];
    for(let i=0; i<5; i++) {
        const random = Math.floor(Math.random() * TODAS_LAS_CARTAS.length);
        seleccion.push(TODAS_LAS_CARTAS[random]);
    }

    // 3. Guardamos en BD
    const nuevoRegistro = new Registro({ orden, email, cartas: seleccion });
    await nuevoRegistro.save();

    res.json({ mensaje: null, cartas: seleccion, nuevo: true });
});

// --- RUTA: PANEL DE CONTROL ---
app.get('/api/admin/ver-todo', async (req, res) => {
    const datos = await Registro.find().sort({ fecha: -1 });
    res.json(datos);
});

// --- INICIAR SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚽ Servidor Listo en puerto ${PORT}`));