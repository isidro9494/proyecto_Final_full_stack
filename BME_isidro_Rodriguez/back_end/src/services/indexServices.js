import yahooFinance from 'yahoo-finance2';
import Index from '../models/indexModels.js';
import mongoose from 'mongoose';

// Suprimir avisos de Yahoo Finance
yahooFinance.suppressNotices(['yahooSurvey']);

// Función para obtener datos del índice
const obtenerDatosIndice = async () => {
    const simbolos = [
        "AENA.MC", "AMS.MC", "ANA.MC", "ACS.MC", "ACX.MC", "AIX.MC", "ALM.MC", "ALB.MC",
        "BBVA.MC", "BKT.MC", "BME.MC", "CABK.MC", "CLNX.MC", "COL.MC", "ELE.MC", "ENG.MC",
        "FER.MC", "GRF.MC", "IAG.MC", "IBE.MC", "ITX.MC", "MAP.MC", "MEL.MC", "MRL.MC",
        "NTGY.MC", "PHM.MC", "REE.MC", "REP.MC", "SAN.MC", "SAB.MC", "SGRE.MC", "SLR.MC",
        "TEF.MC"
    ];

    // Función para retrasar las solicitudes
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const simbolo of simbolos) {
        try {
            console.log(`Obteniendo datos para: ${simbolo}`);
            
            // Obtener datos de Yahoo Finance
            const resultado = await yahooFinance.quote(simbolo);

            // Validar datos obtenidos
            if (!resultado || !resultado.symbol || !resultado.regularMarketPrice) {
                console.warn(`Datos incompletos para: ${simbolo}`);
                continue;
            }

            // Crear objeto con los datos
            const nombre = resultado.displayName || resultado.longName || resultado.shortName || 'Desconocido';
            const indice = new Index({
                nombre: nombre,
                simbolo: resultado.symbol,
                precio: resultado.regularMarketPrice || 0,
                sector: resultado.sector || 'Desconocido',
                bpa: resultado.epsTrailingTwelveMonths || 0,
                per: resultado.trailingPE || 0,
                beneficios: resultado.netIncomeToCommon || 0,
                ingresos: resultado.totalRevenue || 0,
                capitalizacion: resultado.marketCap || 0,
            });

            // Guardar en la base de datos
            await indice.save();
            console.log(`Datos guardados para: ${simbolo}`);
        } catch (error) {
            console.error(`Error al procesar ${simbolo}:`, error.message);
        }

        // Retraso entre solicitudes para evitar bloqueos
        await delay(3000);
    }
};

// Conectar a MongoDB y ejecutar la función
const main = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/BME');
        console.log('Conectado a MongoDB');

        await obtenerDatosIndice(); // Esperar a que todas las operaciones terminen
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Ejecutar la función principal
main();

// Mantener el proceso activo
setInterval(() => {
    console.log('Manteniendo el proceso activo...');
}, 1000 * 60); // Ejecutar cada minuto

export default { obtenerDatosIndice };