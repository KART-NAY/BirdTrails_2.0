const API_URL = "http://localhost:5000/api";

// ==================================================
// 1. DATOS DE LAS AVES
// ==================================================

const BIRDS_DATA = [
    {
        id: "pava_monte",
        commonName: "Pava de Monte",
        scientificName: "Penelope montagnii",
        author: "Bonaparte, 1856",
        family: "Cracidae",
        altitudinalRange: "1500 - 3500 m",
        size: "60 cm",
        sexualDimorphism: "No",
        habitat: "Bosque de niebla / Andino",
        presenceType: "Residente",
        localName: "Pava",
        feeding: "Frutos y brotes",
        additionalData: "Ave arborícola vulnerable a la pérdida de hábitat.",
        image: "imagenes/pava_de_monte.png"
    },
    {
        id: "pava_guacharacha",
        commonName: "Guacharacha",
        scientificName: "Ortalis columbiana",
        author: "Hellmayr, 1906",
        family: "Cracidae",
        altitudinalRange: "1000 - 2500 m",
        size: "50 cm",
        sexualDimorphism: "No",
        habitat: "Matorrales y bordes de bosque",
        presenceType: "Endémica",
        localName: "Guacharacha",
        feeding: "Semillas y frutas",
        additionalData: "Muy ruidosa y territorial.",
        image: "imagenes/pava_guacharacha.jpg"
    },
    {
        id: "caminera_cabeciazul",
        commonName: "Caminera Cabeciazul",
        scientificName: "Leptotila conoveri",
        author: "Bond & Meyer de Schauensee, 1943",
        family: "Columbidae",
        altitudinalRange: "1200 - 2200 m",
        size: "25 cm",
        sexualDimorphism: "No",
        habitat: "Suelo de bosque húmedo",
        presenceType: "Endémica",
        localName: "Caminera azul",
        feeding: "Granos y pequeños invertebrados",
        additionalData: "Especie terrestre difícil de avistar.",
        image: "imagenes/caminera_cabeciazul.jpg"
    },
    {
        id: "caminera_rabiblanca",
        commonName: "Caminera Rabiblanca",
        scientificName: "Leptotila verreauxi",
        author: "Bonaparte, 1855",
        family: "Columbidae",
        altitudinalRange: "0 - 2600 m",
        size: "28 cm",
        sexualDimorphism: "No",
        habitat: "Bosques secos y áreas abiertas",
        presenceType: "Residente",
        localName: "Paloma caminera",
        feeding: "Semillas en el suelo",
        additionalData: "Camina frecuentemente por senderos.",
        image: "imagenes/caminera_rabiblanca.jpg"
    },
    {
        id: "paloma_colorada",
        commonName: "Paloma Colorada",
        scientificName: "Patagioenas subvinacea",
        author: "Lawrence, 1868",
        family: "Columbidae",
        altitudinalRange: "1000 - 2800 m",
        size: "30 cm",
        sexualDimorphism: "No",
        habitat: "Dosel del bosque",
        presenceType: "Residente",
        localName: "Paloma de monte",
        feeding: "Frutas silvestres",
        additionalData: "Habita en las copas de los árboles.",
        image: "imagenes/paloma_colorada.jpg"
    },
    {
        id: "paloma_comun",
        commonName: "Paloma Común",
        scientificName: "Columba livia",
        author: "Gmelin, 1789",
        family: "Columbidae",
        altitudinalRange: "0 - 3000 m",
        size: "32 cm",
        sexualDimorphism: "No",
        habitat: "Zonas urbanas",
        presenceType: "Introducida",
        localName: "Paloma de plaza",
        feeding: "Semillas y desperdicios",
        additionalData: "Adaptada completamente a la vida urbana.",
        image: "imagenes/Paloma_comun.jpg"
    },
    {
        id: "paloma_collar",
        commonName: "Paloma de Collar",
        scientificName: "Patagioenas fasciata",
        author: "Say, 1823",
        family: "Columbidae",
        altitudinalRange: "1500 - 3300 m",
        size: "35 cm",
        sexualDimorphism: "No",
        habitat: "Bosques de robles y altoandinos",
        presenceType: "Residente",
        localName: "Torcaza alta",
        feeding: "Bellotas y frutos",
        additionalData: "Se desplaza en bandadas grandes.",
        image: "imagenes/paloma_de_collar.jpg"
    },
    {
        id: "perdiz_comun",
        commonName: "Perdiz Común",
        scientificName: "Nothoprocta curvirostris",
        author: "Sclater & Salvin, 1873",
        family: "Tinamidae",
        altitudinalRange: "2500 - 3800 m",
        size: "28 cm",
        sexualDimorphism: "No",
        habitat: "Páramo y subpáramo",
        presenceType: "Residente",
        localName: "Perdiz de páramo",
        feeding: "Semillas y raíces",
        additionalData: "Vuela únicamente en tramos muy cortos.",
        image: "imagenes/Perdiz_comun.jpg"
    },
    {
        id: "torcaza_naguiblanca",
        commonName: "Torcaza Naguiblanca",
        scientificName: "Zenaida auriculata",
        author: "Des Murs, 1847",
        family: "Columbidae",
        altitudinalRange: "0 - 3000 m",
        size: "24 cm",
        sexualDimorphism: "No",
        habitat: "Campos abiertos y cultivos",
        presenceType: "Residente",
        localName: "Torcaza",
        feeding: "Semillas de cereales",
        additionalData: "Muy abundante en zonas agrícolas.",
        image: "imagenes/Torcaza_naguiblanca.jpg"
    },
    {
        id: "tortolita_diminuta",
        commonName: "Tortolita Diminuta",
        scientificName: "Columbina minuta",
        author: "Linnaeus, 1766",
        family: "Columbidae",
        altitudinalRange: "0 - 1800 m",
        size: "15 cm",
        sexualDimorphism: "Sí",
        habitat: "Matorrales secos",
        presenceType: "Residente",
        localName: "Tortolita",
        feeding: "Semillas pequeñas",
        additionalData: "Una de las palomas más pequeñas de Colombia.",
        image: "imagenes/Tortolita_diminuta.jpg"
    }
];

// ==================================================
// 2. DATOS DE LAS RUTAS
// ==================================================

const ZONES_DATA = [
    {
        id: 1,
        name: "Sendero Los Arrayanales",
        location: "Popayán - Vereda La Rejoya",
        description: "Ruta rodeada de vegetación nativa ideal para el avistamiento de aves de bosque altoandino.",
        image: "imagenes/zona.arrayanales.jpg"
    },
    {
        id: 2,
        name: "Reserva El Oasis",
        location: "Popayán - Sector Norte",
        description: "Espacio protegido con humedales y senderos rodeados de árboles de gran porte.",
        image: "imagenes/zona.oasis.jpg"
    },
    {
        id: 3,
        name: "Ruta Rayo de Sol",
        location: "Popayán - Vereda Clara",
        description: "Recorrido con buena visibilidad matutina para observación de torcazas y perdices.",
        image: "imagenes/zona.rayo.sol.jpg"
    },
    {
        id: 4,
        name: "Sendero Ecologico Principal",
        location: "Popayán - Parque Ecológico",
        description: "Sendero accesible para principiantes en la observación de aves urbanas y periurbanas.",
        image: "imagenes/zona.sendero.jpg"
    },
    {
        id: 5,
        name: "Mirador Barranquero",
        location: "Popayán - Vereda San Bernardino",
        description: "Punto elevado preferido para observar especies de dosel y aves ruidosas.",
        image: "imagenes/zona_barranquero.jpg"
    }
];

// ==================================================
// 3. PATRÓN BUILDER
// ==================================================

class BirdTechnicalSheetBuilder {
    constructor(data) {
        this.bird = { ...data };
        this.bird.id = this.resolveBirdId();
    }

    resolveBirdId() {
        if (this.bird.id) return this.bird.id;

        if (this.bird.commonName) {
            return this.bird.commonName
                .toLowerCase()
                .replaceAll(" ", "_");
        }

        return "ave_desconocida";
    }

    setClassification() {
        this.bird.classification = {
            family: this.bird.family,
            author: this.bird.author,
            scientificName: this.bird.scientificName
        };

        return this;
    }

    setBiometrics() {
        this.bird.biometrics = {
            size: this.bird.size,
            sexualDimorphism: this.bird.sexualDimorphism
        };

        return this;
    }

    setEcology() {
        this.bird.ecology = {
            altitudinalRange: this.bird.altitudinalRange,
            habitat: this.bird.habitat,
            presenceType: this.bird.presenceType,
            feeding: this.bird.feeding
        };

        return this;
    }

    build() {
        return {
            id: this.bird.id,
            commonName: this.bird.commonName,
            localName: this.bird.localName,
            image: this.bird.image,
            additionalData: this.bird.additionalData,
            classification: this.bird.classification,
            biometrics: this.bird.biometrics,
            ecology: this.bird.ecology
        };
    }
}

class BirdBuilderService {
    static buildDetailedSheet(birdRaw) {
        return new BirdTechnicalSheetBuilder(birdRaw)
            .setClassification()
            .setBiometrics()
            .setEcology()
            .build();
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