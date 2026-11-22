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

function getRoleStrategy(role) {
    return ROLE_STRATEGIES[role] || ROLE_STRATEGIES.normal;
}
// ==================================================
// 4. CARGA DE COMPONENTES HTML
// ==================================================

const COMPONENT_HANDLERS = {
    aves: renderBirds,
    rutas: renderZones,
    favoritos: renderFavorites,
    login: conectarLogin,
    registro: conectarRegistro,
    admin: conectarAdmin
};

async function cargarComponente(nombre) {
    const contenedor = document.getElementById("app-content");

    try {
        const respuesta = await fetch(`components/${nombre}.html`);

        const contenidoHtml = await ejecutarPorCondicion(respuesta.ok, {
            true: () => respuesta.text(),
            false: () => Promise.reject(new Error(`No se pudo cargar components/${nombre}.html`))
        });

        contenedor.innerHTML = contenidoHtml;

        const handler = COMPONENT_HANDLERS[nombre] || (() => {});
        await handler();
    } catch (error) {
        console.error("Error al cargar el componente:", error);

        contenedor.innerHTML = `
            <section>
                <h2>Error al cargar la página</h2>
                <p>No fue posible cargar el componente solicitado.</p>
                <p>Verifica que exista el archivo HTML dentro de la carpeta components.</p>
            </section>
        `;
    }
}

// ==================================================
// 5. INICIO DE LA APLICACIÓN
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("hashchange", router);
    router();
});

// ==================================================
// 6. MENÚ Y SESIÓN
// ==================================================

function updateSessionState() {
    const mainNav = document.getElementById("main-nav");
    const linkSesion = document.getElementById("link-sesion");

    ejecutarPorCondicion(mainNav, {
        true: () => {
            ejecutarPorCondicion(state.user, {
                true: () => {
                    mainNav.style.display = "block";
                    const strategy = getRoleStrategy(state.user.role);

                    Object.entries(strategy.navVisibility).forEach(([navId, displayValue]) => {
                        const navItem = document.getElementById(navId);
                        ejecutarPorCondicion(navItem, {
                            true: () => {
                                navItem.style.display = displayValue;
                            }
                        });
                    });

                    ejecutarPorCondicion(linkSesion, {
                        true: () => {
                            linkSesion.innerHTML = `
                                <span class="icono-usuario">👤</span>
                                <span class="texto-sesion">Hola, ${state.user.name} (Cerrar sesión)</span>
                            `;
                            linkSesion.href = "#/logout";
                        }
                    });
                },
                false: () => {
                    mainNav.style.display = "none";
                }
            });
        }
    });
}