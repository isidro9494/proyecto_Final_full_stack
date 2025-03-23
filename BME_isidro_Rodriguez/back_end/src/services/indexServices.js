import yahooFinance from 'yahoo-finance2';
import mongoose from 'mongoose';
import Index from '../models/indexModels.js';

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
        let intentos = 3; // Número de reintentos
        while (intentos > 0) {
            try {
                console.log(`Obteniendo datos para: ${simbolo}`);
                const resultado = await yahooFinance.quote(simbolo);

                if (!resultado || !resultado.symbol || !resultado.regularMarketPrice) {
                    console.warn(`Datos incompletos para: ${simbolo}`);
                    break;
                }

                const nombre = resultado.displayName || resultado.longName || resultado.shortName || 'Desconocido';

                // Usar findOneAndUpdate para evitar duplicados
                await Index.findOneAndUpdate(
                    { simbolo: resultado.symbol },
                    {
                        $set: {
                            nombre: nombre,
                            precio: resultado.regularMarketPrice || 0,
                            sector: resultado.sector || 'Desconocido',
                            bpa: resultado.epsTrailingTwelveMonths || 0,
                            per: resultado.trailingPE || 0,
                            beneficios: resultado.netIncomeToCommon || 0,
                            ingresos: resultado.totalRevenue || 0,
                            capitalizacion: resultado.marketCap || 0,
                        },
                    },
                    { upsert: true, new: true }
                );

                console.log(`Datos guardados para: ${simbolo}`);
                break; // Salir del bucle de reintentos si tiene éxito
            } catch (error) {
                console.error(`Error al procesar ${simbolo}:`, error.message);
                intentos--;
                if (intentos === 0) {
                    console.error(`No se pudo procesar ${simbolo} después de 3 intentos.`);
                } else {
                    await delay(5000); // Esperar 5 segundos antes de reintentar
                }
            }
        }

        await delay(3000); // Retraso entre solicitudes
    }
};

// Conectar a MongoDB y ejecutar la función
const main = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/BME', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');

        await obtenerDatosIndice(); // Ejecutar la función principal
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1); // Salir del proceso si no se puede conectar
    }
};

// Ejecutar el proceso cada 5 minutos
const ejecutarProceso = async () => {
    try {
        await obtenerDatosIndice();
        console.log('Proceso completado. Esperando para la próxima ejecución...');
    } catch (error) {
        console.error('Error en el proceso:', error.message);
    }
};

// Ejecutar el proceso inmediatamente al iniciar
ejecutarProceso();

// Mantener el proceso activo
setInterval(ejecutarProceso, 1000 * 60 * 5); // Ejecutar cada 5 minutos

export default { obtenerDatosIndice };