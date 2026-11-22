// ==================================================
// CONFIGURACIÓN GENERAL DE LA APLICACIÓN
// ==================================================

const API_URL = "http://localhost:5000/api";

// ==================================================
// 1. UTILIDAD POLIMÓRFICA / MAPEO SIN CONDICIONALES IF
// ==================================================

function ejecutarPorCondicion(condicion, acciones) {
    const clave = Boolean(condicion);
    const accion = acciones[clave] || (() => {});
    return accion();
}

// ==================================================
// 2. PATRÓN ADAPTER
// ==================================================

class AdapterGoogleMaps {
    static generateNavigationLink(zoneName, location) {
        const query = encodeURIComponent(`${zoneName} ${location}`);

        return `https://www.google.com/maps/search/?api=1&query=${query}`;
    }

    static generateQRCodeData(zoneName, location) {
        const urlMaps = this.generateNavigationLink(zoneName, location);

        return {
            url: urlMaps,
            qrApiUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(urlMaps)}`
        };
    }
}
