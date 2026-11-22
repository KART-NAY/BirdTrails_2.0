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
// 4. PATRÓN ADAPTER
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
// 5. ESTADO DE LA APLICACIÓN
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

// ==================================================
// 6. CARGA DE COMPONENTES HTML
// ==================================================

async function cargarComponente(nombre) {
    const contenedor = document.getElementById("app-content");

    try {
        const respuesta = await fetch(`components/${nombre}.html`);

        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar components/${nombre}.html`);
        }

        contenedor.innerHTML = await respuesta.text();

        // Ejecutar la lógica correspondiente al componente cargado.
        switch (nombre) {
            case "aves":
                renderBirds();
                break;

            case "rutas":
                renderZones();
                break;

            case "favoritos":
                await renderFavorites();
                break;

            case "login":
                conectarLogin();
                break;

            case "registro":
                conectarRegistro();
                break;
        }
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
// 7. INICIO DE LA APLICACIÓN
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("hashchange", router);
    router();
});

// ==================================================
// 8. MENÚ Y SESIÓN
// ==================================================

function updateSessionState() {
    const mainNav = document.getElementById("main-nav");
    const linkSesion = document.getElementById("link-sesion");

    if (!mainNav) return;

    if (state.user) {
        mainNav.style.display = "block";

        if (linkSesion) {
            linkSesion.innerHTML = `
                <span class="icono-usuario">👤</span>
                <span class="texto-sesion">Hola, ${state.user.name} (Cerrar sesión)</span>
            `;

            linkSesion.href = "#/logout";
        }
    } else {
        mainNav.style.display = "none";
    }
}

// ==================================================
// 9. ENRUTADOR SPA
// ==================================================

async function router() {
    const hash = window.location.hash ||
        (state.user ? "#/inicio" : "#/login");

    if (hash === "#/logout") {
        localStorage.removeItem("user");
        state.user = null;
        updateSessionState();
        window.location.hash = "#/login";
        return;
    }

    // Proteger las páginas privadas.
    if (
        !state.user &&
        hash !== "#/login" &&
        hash !== "#/registro"
    ) {
        window.location.hash = "#/login";
        return;
    }

    // Si ya inició sesión, no debe volver a login o registro.
    if (
        state.user &&
        (hash === "#/login" || hash === "#/registro")
    ) {
        window.location.hash = "#/inicio";
        return;
    }

    updateSessionState();

    const componentes = {
        "#/inicio": "inicio",
        "#/aves": "aves",
        "#/rutas": "rutas",
        "#/recomendaciones": "recomendaciones",
        "#/favoritos": "favoritos",
        "#/login": "login",
        "#/registro": "registro"
    };

    const componente = componentes[hash] || "inicio";

    await cargarComponente(componente);
}

// ==================================================
// 10. MOSTRAR LAS AVES
// ==================================================

function renderBirds() {
    const lista = document.getElementById("lista-aves");

    if (!lista) return;

    const processedBirds = BIRDS_DATA.map(bird =>
        BirdBuilderService.buildDetailedSheet(bird)
    );

    lista.innerHTML = processedBirds.map(bird => `
        <div class="ave">
            <img src="${bird.image}" alt="${bird.commonName}">

            <h3>${bird.commonName}</h3>

            <p><em>${bird.classification.scientificName}</em></p>

            <p><strong>Familia:</strong> ${bird.classification.family}</p>

            <p><strong>Hábitat:</strong> ${bird.ecology.habitat}</p>

            <p><strong>Alimentación:</strong> ${bird.ecology.feeding}</p>

            <button
                type="button"
                class="boton-favorito"
                data-id="${bird.id}">
                ♡ Agregar a Favoritos
            </button>
        </div>
    `).join("");

    lista.querySelectorAll(".boton-favorito").forEach(button => {
        button.addEventListener("click", async () => {
            if (!state.user) {
                alert("Debes iniciar sesión.");
                window.location.hash = "#/login";
                return;
            }

            const birdId = button.dataset.id;

            try {
                const response = await fetch(`${API_URL}/favorites`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: state.user.id,
                        birdId
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || "No se pudo agregar el favorito.");
                    return;
                }

                alert(data.message || "Ave agregada a favoritos.");
            } catch (error) {
                console.error(error);
                alert("Error al conectar con el servidor.");
            }
        });
    });
}

// ==================================================
// 11. MOSTRAR LAS RUTAS
// ==================================================

function renderZones() {
    const lista = document.getElementById("lista-rutas");

    if (!lista) return;

    lista.innerHTML = ZONES_DATA.map(zone => {
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
            </article>
        `;
    }).join("");
}

// ==================================================
// 12. MOSTRAR FAVORITOS
// ==================================================

async function renderFavorites() {
    const lista = document.getElementById("lista-favoritos");

    if (!lista) return;

    if (!state.user) {
        lista.innerHTML = "<p>Debes iniciar sesión para ver tus favoritos.</p>";
        return;
    }

    lista.innerHTML = "<p>Cargando favoritos...</p>";

    try {
        const response = await fetch(
            `${API_URL}/favorites?userId=${encodeURIComponent(state.user.id)}`
        );

        const favorites = await response.json();

        if (!response.ok) {
            throw new Error(favorites.message || "Error al obtener favoritos.");
        }

        if (!Array.isArray(favorites) || favorites.length === 0) {
            lista.innerHTML = "<p>Aún no has agregado aves a tus favoritos.</p>";
            return;
        }

        const favoriteBirds = favorites
            .map(favorite =>
                BIRDS_DATA.find(bird => bird.id === favorite.birdId)
            )
            .filter(Boolean);

        if (favoriteBirds.length === 0) {
            lista.innerHTML = "<p>No se encontraron aves favoritas.</p>";
            return;
        }

        lista.innerHTML = favoriteBirds.map(bird => `
            <div class="ave">
                <img src="${bird.image}" alt="${bird.commonName}">

                <h3>${bird.commonName}</h3>

                <p><em>${bird.scientificName}</em></p>

                <p><strong>Nombre local:</strong> ${bird.localName}</p>

                <button
                    type="button"
                    class="boton-eliminar-favorito"
                    data-id="${bird.id}">
                    Eliminar de Favoritos
                </button>
            </div>
        `).join("");

        lista.querySelectorAll(".boton-eliminar-favorito").forEach(button => {
            button.addEventListener("click", async () => {
                const birdId = button.dataset.id;

                try {
                    const response = await fetch(`${API_URL}/favorites`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: state.user.id,
                            birdId
                        })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        alert(data.message || "No se pudo eliminar el favorito.");
                        return;
                    }

                    alert(data.message || "Favorito eliminado.");
                    await renderFavorites();
                } catch (error) {
                    console.error(error);
                    alert("Error al eliminar favorito.");
                }
            });
        });
    } catch (error) {
        console.error(error);
        lista.innerHTML = "<p>Error al obtener tus favoritos.</p>";
    }
}

// ==================================================
// 13. INICIAR SESIÓN
// ==================================================

function conectarLogin() {
    const formulario = document.getElementById("form-login");

    if (!formulario) {
        console.error("No se encontró el formulario form-login en login.html");
        return;
    }

    formulario.addEventListener("submit", async event => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "No se pudo iniciar sesión.");
                return;
            }

            if (!data.user) {
                alert("El servidor no devolvió los datos del usuario.");
                return;
            }

            state.user = data.user;
            localStorage.setItem("user", JSON.stringify(data.user));

            updateSessionState();
            window.location.hash = "#/inicio";
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}

// ==================================================
// 14. REGISTRAR USUARIO
// ==================================================

function conectarRegistro() {
    const formulario = document.getElementById("form-registro");

    if (!formulario) {
        console.error("No se encontró el formulario form-registro en registro.html");
        return;
    }

    formulario.addEventListener("submit", async event => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "No se pudo crear la cuenta.");
                return;
            }

            alert("Cuenta creada con éxito. Inicia sesión para continuar.");
            window.location.hash = "#/login";
        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}