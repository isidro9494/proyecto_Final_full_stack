import yahooFinance from 'yahoo-finance2';
import Index from '../models/indexModels.js';
import mongoose from 'mongoose';

// Suprimir avisos de yahoo-finance2
yahooFinance.suppressNotices(['yahooSurvey']);

const obtenerDatosIndice = async () => {
    const simbolos = [
        "AENA.MC", "AMS.MC", "ANA.MC", "ACS.MC", "ACX.MC", "AIX.MC", "ALM.MC", "ALB.MC",
        "BBVA.MC", "BKT.MC", "BME.MC", "CABK.MC", "CLNX.MC", "COL.MC", "ELE.MC", "ENG.MC",
        "FER.MC", "GRF.MC", "IAG.MC", "IBE.MC", "ITX.MC", "MAP.MC", "MEL.MC", "MRL.MC",
        "NTGY.MC", "PHM.MC", "REE.MC", "REP.MC", "SAN.MC", "SAB.MC", "SGRE.MC", "SLR.MC",
        "TEF.MC"
    ];

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const simbolo of simbolos) {
        try {
            const resultado = await yahooFinance.quote(simbolo);

            // Verificar si los campos mínimos necesarios están disponibles
            if (!resultado || !resultado.symbol || !resultado.regularMarketPrice) {
                continue; // Saltar al siguiente símbolo
            }

            // Usar longName o shortName si displayName no está disponible
            const nombre = resultado.displayName || resultado.longName || resultado.shortName || 'Desconocido';

            // Crear el documento con valores predeterminados si los campos no están disponibles
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

            // Guardar el documento en la base de datos
            await indice.save();
        } catch (error) {
            // Manejar errores de validación o de conexión
            if (error.name === 'ValidationError') {
                // Manejar errores de validación si es necesario
            }
        }
        await delay(3000); // Esperar 3 segundos entre solicitudes
    }
};

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/BME')
    .then(() => {
        return obtenerDatosIndice();
    })
    .catch((error) => {
        // Manejar errores de conexión a MongoDB
    })
    .finally(() => {
        mongoose.connection.close(); // Cerrar la conexión al final
    });

export default { obtenerDatosIndice };