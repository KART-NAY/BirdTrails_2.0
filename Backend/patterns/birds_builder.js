class BirdTechnicalSheetBuilder {
    constructor(data = {}) {
        this.bird = { ...data };
    }

    setCommonName(commonName) {
        this.bird.commonName = commonName;
        return this;
    }

    setScientificName(scientificName) {
        this.bird.scientificName = scientificName;
        return this;
    }

    setAuthor(author) {
        this.bird.author = author;
        return this;
    }

    setFamily(family) {
        this.bird.family = family;
        return this;
    }

    setAltitudinalRange(altitudinalRange) {
        this.bird.altitudinalRange = altitudinalRange;
        return this;
    }

    setSize(size) {
        this.bird.size = size;
        return this;
    }

    setSexualDimorphism(sexualDimorphism) {
        this.bird.sexualDimorphism = sexualDimorphism;
        return this;
    }

    setHabitat(habitat) {
        this.bird.habitat = habitat;
        return this;
    }

    setPresenceType(presenceType) {
        this.bird.presenceType = presenceType;
        return this;
    }

    setLocalName(localName) {
        this.bird.localName = localName;
        return this;
    }

    setFeeding(feeding) {
        this.bird.feeding = feeding;
        return this;
    }

    setAdditionalData(additionalData) {
        this.bird.additionalData = additionalData;
        return this;
    }

    setBirdImage(image) {
        this.bird.image = image;
        return this;
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

    buildPersistence() {
        return {
            commonName: this.bird.commonName,
            scientificName: this.bird.scientificName,
            author: this.bird.author || "",
            family: this.bird.family || "",
            altitudinalRange: this.bird.altitudinalRange || "",
            size: this.bird.size || "",
            sexualDimorphism: this.bird.sexualDimorphism || "No",
            habitat: this.bird.habitat || "",
            presenceType: this.bird.presenceType || "Residente",
            localName: this.bird.localName || "",
            feeding: this.bird.feeding || "",
            additionalData: this.bird.additionalData || "",
            image: this.bird.image || ""
        };
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
        if (!birdRaw) return null;
        return new BirdTechnicalSheetBuilder(birdRaw)
            .setClassification()
            .setBiometrics()
            .setEcology()
            .build();
    }

    static buildPersistenceModel(birdRaw) {
        if (!birdRaw) return null;
        return new BirdTechnicalSheetBuilder()
            .setCommonName(birdRaw.commonName)
            .setScientificName(birdRaw.scientificName)
            .setAuthor(birdRaw.author)
            .setFamily(birdRaw.family)
            .setAltitudinalRange(birdRaw.altitudinalRange)
            .setSize(birdRaw.size)
            .setSexualDimorphism(birdRaw.sexualDimorphism)
            .setHabitat(birdRaw.habitat)
            .setPresenceType(birdRaw.presenceType)
            .setLocalName(birdRaw.localName)
            .setFeeding(birdRaw.feeding)
            .setAdditionalData(birdRaw.additionalData)
            .setBirdImage(birdRaw.image)
            .buildPersistence();
    }
}

module.exports = BirdBuilderService;