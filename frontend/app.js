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

// ==================================================
// 3. ESTADO DE LA APLICACIÓN Y ROLES
// ==================================================

function obtenerUsuarioGuardado() {
    try {
        return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
        return null;
    }
}

const state = {
    user: obtenerUsuarioGuardado()
};

const PUBLIC_ROUTES = {
    "#/login": "login",
    "#/registro": "registro"
};

const ROLE_STRATEGIES = {
    normal: {
        defaultRoute: "#/inicio",
        birdCardAction: "favorite",
        navVisibility: {
            "nav-admin": "none",
            "nav-inicio": "list-item",
            "nav-aves": "list-item",
            "nav-rutas": "list-item",
            "nav-recomendaciones": "list-item",
            "nav-favoritos": "list-item"
        },
        routes: {
            "#/inicio": "inicio",
            "#/aves": "aves",
            "#/rutas": "rutas",
            "#/recomendaciones": "recomendaciones",
            "#/favoritos": "favoritos"
        }
    },
    admin: {
        defaultRoute: "#/admin",
        birdCardAction: "delete",
        navVisibility: {
            "nav-admin": "list-item",
            "nav-inicio": "none",
            "nav-aves": "list-item",
            "nav-rutas": "list-item",
            "nav-recomendaciones": "none",
            "nav-favoritos": "none"
        },
        routes: {
            "#/admin": "admin",
            "#/aves": "aves",
            "#/rutas": "rutas"
        }
    }
};
