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

// ==================================================
// 7. ENRUTADOR SPA
// ==================================================

async function router() {
    const defaultHashes = {
        true: () => getRoleStrategy(state.user?.role).defaultRoute,
        false: () => "#/login"
    };

    const hash = window.location.hash || defaultHashes[Boolean(state.user)]();

    const specialRoutes = {
        "#/logout": async () => {
            localStorage.removeItem("user");
            state.user = null;
            updateSessionState();
            window.location.hash = "#/login";
        }
    };

    const routeDispatcher = specialRoutes[hash] || (async () => {
        await ejecutarPorCondicion(state.user, {
            false: async () => {
                const publicComponent = PUBLIC_ROUTES[hash];
                await ejecutarPorCondicion(publicComponent, {
                    true: async () => {
                        updateSessionState();
                        await cargarComponente(publicComponent);
                    },
                    false: async () => {
                        window.location.hash = "#/login";
                    }
                });
            },
            true: async () => {
                const strategy = getRoleStrategy(state.user.role);
                const privateComponent = strategy.routes[hash];
                await ejecutarPorCondicion(privateComponent, {
                    true: async () => {
                        updateSessionState();
                        await cargarComponente(privateComponent);
                    },
                    false: async () => {
                        window.location.hash = strategy.defaultRoute;
                    }
                });
            }
        });
    });

    await routeDispatcher();
}

// ==================================================
// 8. MOSTRAR LAS AVES (DESDE MYSQL)
// ==================================================

const BIRD_CARD_BUTTON_TEMPLATES = {
    favorite: bird => `
        <button
            type="button"
            class="boton-favorito"
            data-id="${bird.id}">
            ♡ Agregar a Favoritos
        </button>
    `,
    delete: bird => `
        <button
            type="button"
            class="boton-eliminar-favorito boton-eliminar-ave"
            data-id="${bird.id}">
            Eliminar Ave
        </button>
    `
};

const BIRD_CARD_ACTION_BINDERS = {
    favorite: lista => {
        lista.querySelectorAll(".boton-favorito").forEach(button => {
            button.addEventListener("click", async () => {
                await ejecutarPorCondicion(state.user, {
                    false: () => {
                        alert("Debes iniciar sesión.");
                        window.location.hash = "#/login";
                    },
                    true: async () => {
                        const birdId = Number(button.dataset.id);

                        try {
                            const favResponse = await fetch(`${API_URL}/favorites`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    userId: state.user.id,
                                    birdId
                                })
                            });

                            const data = await favResponse.json();

                            ejecutarPorCondicion(favResponse.ok, {
                                false: () => alert(data.message || "No se pudo agregar el favorito."),
                                true: () => alert(data.message || "Ave agregada a favoritos.")
                            });
                        } catch (error) {
                            console.error(error);
                            alert("Error al conectar con el servidor.");
                        }
                    }
                });
            });
        });
    },
    delete: lista => {
        lista.querySelectorAll(".boton-eliminar-ave").forEach(button => {
            button.addEventListener("click", async () => {
                const birdId = Number(button.dataset.id);

                try {
                    const delResponse = await fetch(`${API_URL}/birds/${encodeURIComponent(birdId)}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: state.user.id
                        })
                    });

                    const data = await delResponse.json();

                    await ejecutarPorCondicion(delResponse.ok, {
                        false: () => alert(data.message || "No se pudo eliminar el ave."),
                        true: async () => {
                            alert(data.message || "Ave eliminada correctamente.");
                            await renderBirds();
                        }
                    });
                } catch (error) {
                    console.error(error);
                    alert("Error al conectar con el servidor.");
                }
            });
        });
    }
};

async function renderBirds() {
    const lista = document.getElementById("lista-aves");

    await ejecutarPorCondicion(lista, {
        true: async () => {
            try {
                const response = await fetch(`${API_URL}/birds`);
                const processedBirds = await response.json();

                await ejecutarPorCondicion(response.ok, {
                    false: () => Promise.reject(new Error(processedBirds.message || "Error al obtener aves.")),
                    true: () => {
                        const strategy = getRoleStrategy(state.user?.role);
                        const renderActionButton = BIRD_CARD_BUTTON_TEMPLATES[strategy.birdCardAction] || (() => "");

                        lista.innerHTML = processedBirds.map(bird => `
                            <div class="ave">
                                <img src="${bird.image}" alt="${bird.commonName}">

                                <h3>${bird.commonName}</h3>

                                <p><em>${bird.classification.scientificName}</em></p>

                                <p><strong>Familia:</strong> ${bird.classification.family}</p>

                                <p><strong>Hábitat:</strong> ${bird.ecology.habitat}</p>

                                <p><strong>Alimentación:</strong> ${bird.ecology.feeding}</p>

                                ${renderActionButton(bird)}
                            </div>
                        `).join("");

                        const bindAction = BIRD_CARD_ACTION_BINDERS[strategy.birdCardAction] || (() => {});
                        bindAction(lista);
                    }
                });
            } catch (error) {
                console.error(error);
                lista.innerHTML = "<p>Error al cargar las aves desde la base de datos.</p>";
            }
        }
    });
}

// ==================================================
// 9. MOSTRAR LAS RUTAS (DESDE MYSQL)
// ==================================================

function crearHtmlCartillaZona(zone, extraActionsHtml = "") {
    const mapsData = AdapterGoogleMaps.generateQRCodeData(
        zone.name,
        zone.location
    );

    return `
        <article class="ruta">
            <img src="${zone.image}" alt="${zone.name}">

            <h3>${zone.name}</h3>

            <p>📍 ${zone.location}</p>

            <p>${zone.description}</p>

            <a
                href="${mapsData.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="boton"
                style="display:inline-block; margin-top:10px;">
                📍 Ver en Google Maps
            </a>

            <div class="qr-container">
                <p><strong>Escanea para llegar:</strong></p>

                <img
                    src="${mapsData.qrApiUrl}"
                    alt="Código QR ${zone.name}">
            </div>

            ${extraActionsHtml}
        </article>
    `;
}

async function renderZones() {
    const lista = document.getElementById("lista-rutas");

    await ejecutarPorCondicion(lista, {
        true: async () => {
            try {
                const response = await fetch(`${API_URL}/zones`);
                const zones = await response.json();

                await ejecutarPorCondicion(response.ok, {
                    false: () => Promise.reject(new Error(zones.message || "Error al obtener rutas.")),
                    true: () => {
                        lista.innerHTML = zones
                            .map(zone => crearHtmlCartillaZona(zone))
                            .join("");
                    }
                });
            } catch (error) {
                console.error(error);
                lista.innerHTML = "<p>Error al cargar las rutas de avistamiento.</p>";
            }
        }
    });
}
// ==================================================
// 10. MOSTRAR FAVORITOS (DESDE MYSQL)
// ==================================================

async function renderFavorites() {
    const lista = document.getElementById("lista-favoritos");

    await ejecutarPorCondicion(lista, {
        true: async () => {
            await ejecutarPorCondicion(state.user, {
                false: () => {
                    lista.innerHTML = "<p>Debes iniciar sesión para ver tus favoritos.</p>";
                },
                true: async () => {
                    lista.innerHTML = "<p>Cargando favoritos...</p>";

                    try {
                        const response = await fetch(
                            `${API_URL}/favorites?userId=${encodeURIComponent(state.user.id)}`
                        );
                        const favorites = await response.json();

                        await ejecutarPorCondicion(response.ok, {
                            false: () => Promise.reject(new Error(favorites.message || "Error al obtener favoritos.")),
                            true: () => {
                                const hasFavorites = Array.isArray(favorites) && favorites.length > 0;

                                ejecutarPorCondicion(hasFavorites, {
                                    false: () => {
                                        lista.innerHTML = "<p>Aún no has agregado aves a tus favoritos.</p>";
                                    },
                                    true: () => {
                                        lista.innerHTML = favorites.map(bird => `
                                            <div class="ave">
                                                <img src="${bird.image}" alt="${bird.commonName}">

                                                <h3>${bird.commonName}</h3>

                                                <p><em>${bird.scientificName}</em></p>

                                                <p><strong>Nombre local:</strong> ${bird.localName}</p>

                                                <button
                                                    type="button"
                                                    class="boton-eliminar-favorito"
                                                    data-id="${bird.birdId}">
                                                    Eliminar de Favoritos
                                                </button>
                                            </div>
                                        `).join("");

                                        lista.querySelectorAll(".boton-eliminar-favorito").forEach(button => {
                                            button.addEventListener("click", async () => {
                                                const birdId = Number(button.dataset.id);

                                                try {
                                                    const deleteResponse = await fetch(`${API_URL}/favorites`, {
                                                        method: "DELETE",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({
                                                            userId: state.user.id,
                                                            birdId
                                                        })
                                                    });

                                                    const data = await deleteResponse.json();

                                                    await ejecutarPorCondicion(deleteResponse.ok, {
                                                        false: () => alert(data.message || "No se pudo eliminar el favorito."),
                                                        true: async () => {
                                                            alert(data.message || "Favorito eliminado.");
                                                            await renderFavorites();
                                                        }
                                                    });
                                                } catch (error) {
                                                    console.error(error);
                                                    alert("Error al eliminar favorito.");
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    } catch (error) {
                        console.error(error);
                        lista.innerHTML = "<p>Error al obtener tus favoritos.</p>";
                    }
                }
            });
        }
    });
}
// ==================================================
// 11. PANEL DE ADMINISTRACIÓN (ROL ADMIN)
// ==================================================

async function cargarSelectorAvesAdmin() {
    const contenedor = document.getElementById("selector-aves-zona");

    await ejecutarPorCondicion(contenedor, {
        true: async () => {
            try {
                const response = await fetch(`${API_URL}/birds`);
                const birds = await response.json();

                ejecutarPorCondicion(response.ok, {
                    true: () => {
                        contenedor.innerHTML = birds.map(bird => `
                            <label class="item-ave-check">
                                <input type="checkbox" name="zoneBirdIds" value="${bird.id}">
                                <span>${bird.commonName}</span>
                            </label>
                        `).join("");
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    });
}
// ==================================================
// 11. PANEL DE ADMINISTRACIÓN (ROL ADMIN)
// ==================================================

async function cargarSelectorAvesAdmin() {
    const contenedor = document.getElementById("selector-aves-zona");

    await ejecutarPorCondicion(contenedor, {
        true: async () => {
            try {
                const response = await fetch(`${API_URL}/birds`);
                const birds = await response.json();

                ejecutarPorCondicion(response.ok, {
                    true: () => {
                        contenedor.innerHTML = birds.map(bird => `
                            <label class="item-ave-check">
                                <input type="checkbox" name="zoneBirdIds" value="${bird.id}">
                                <span>${bird.commonName}</span>
                            </label>
                        `).join("");
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    });
}

async function renderAdminZones() {
    const lista = document.getElementById("lista-admin-zonas");

    await ejecutarPorCondicion(lista, {
        true: async () => {
            try {
                const response = await fetch(`${API_URL}/zones`);
                const zones = await response.json();

                await ejecutarPorCondicion(response.ok, {
                    true: () => {
                        lista.innerHTML = zones.map(zone => {
                            const acciones = `
                                <div class="acciones-ruta">
                                    <button type="button" class="boton-favorito boton-editar-zona" data-id="${zone.id}">
                                        Editar cartilla
                                    </button>
                                    <button type="button" class="boton-eliminar-favorito boton-eliminar-zona" data-id="${zone.id}">
                                        Eliminar cartilla
                                    </button>
                                </div>
                            `;
                            return crearHtmlCartillaZona(zone, acciones);
                        }).join("");

                        const zonesById = Object.fromEntries(zones.map(z => [String(z.id), z]));

                        lista.querySelectorAll(".boton-editar-zona").forEach(button => {
                            button.addEventListener("click", () => {
                                const zona = zonesById[button.dataset.id];
                                ejecutarPorCondicion(zona, {
                                    true: () => {
                                        document.getElementById("zone-id").value = zona.id;
                                        document.getElementById("zone-name").value = zona.name;
                                        document.getElementById("zone-location").value = zona.location;
                                        document.getElementById("zone-description").value = zona.description;
                                        document.getElementById("zone-image").value = zona.image || "";
                                        document.getElementById("titulo-form-zona").textContent = `Editando cartilla: ${zona.name}`;

                                        const asociados = new Set((zona.birdIds || []).map(Number));
                                        document.querySelectorAll('input[name="zoneBirdIds"]').forEach(cb => {
                                            cb.checked = asociados.has(Number(cb.value));
                                        });
                                    }
                                });
                            });
                        });

                        lista.querySelectorAll(".boton-eliminar-zona").forEach(button => {
                            button.addEventListener("click", async () => {
                                const zoneId = Number(button.dataset.id);
                                try {
                                    const delResponse = await fetch(`${API_URL}/zones/${encodeURIComponent(zoneId)}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({ userId: state.user.id })
                                    });

                                    const data = await delResponse.json();
                                    await ejecutarPorCondicion(delResponse.ok, {
                                        false: () => alert(data.message || "No se pudo eliminar la cartilla."),
                                        true: async () => {
                                            alert(data.message || "Cartilla eliminada.");
                                            await renderAdminZones();
                                        }
                                    });
                                } catch (error) {
                                    console.error(error);
                                    alert("Error al eliminar la cartilla.");
                                }
                            });
                        });
                    }
                });
            } catch (error) {
                console.error(error);
                lista.innerHTML = "<p>Error al cargar las cartillas de zonas.</p>";
            }
        }
    });
}