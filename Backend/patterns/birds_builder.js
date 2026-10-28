// class BirdTechnicalSheetBuilder {
//     constructor(data) {
//         this.bird = { ...data };
//     }

//     setClassification() {
//         this.bird.classification = {
//             family: this.bird.family,
//             author: this.bird.author,
//             scientificName: this.bird.scientificName
//         };
//         return this;
//     }

//     setBiometrics() {
//         this.bird.biometrics = {
//             size: this.bird.size,
//             sexualDimorphism: this.bird.sexualDimorphism
//         };
//         return this;
//     }

//     setEcology() {
//         this.bird.ecology = {
//             altitudinalRange: this.bird.altitudinalRange,
//             habitat: this.bird.habitat,
//             presenceType: this.bird.presenceType,
//             feeding: this.bird.feeding
//         };
//         return this;
//     }

//     build() {
//         return {
//             id: this.bird.id,
//             commonName: this.bird.commonName,
//             localName: this.bird.localName,
//             image: this.bird.image,
//             additionalData: this.bird.additionalData,
//             classification: this.bird.classification,
//             biometrics: this.bird.biometrics,
//             ecology: this.bird.ecology
//         };
//     }
// }

// class BirdBuilderService {
//     static buildDetailedSheet(birdRaw) {
//         if (!birdRaw) return null;
//         return new BirdTechnicalSheetBuilder(birdRaw)
//             .setClassification()
//             .setBiometrics()
//             .setEcology()
// //             .build();
// //     }
// }

// module.exports = BirdBuilderService;