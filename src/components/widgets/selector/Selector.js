import { useMapStore } from "src/stores/map-store";

class Selector {
  constructor() {
    this.mapStore = useMapStore();
    this.features = []

    /**
     * Fonction de selection des features. Si 'true' un écouteur d'évenement clic est ajouté pour selectionner les éléments, sinon l'événement est retiré
     * @param {Boolean} Boolean - Permet d'activer ou de desactiver l'option de sélection.
     */
    this.enableSelection = function (Boolean) {
      if (Boolean) {
        this.mapStore.map.on(
          "click",
          (this.featuresSelector = (e) => {
            this.features = this.mapStore.map.getFeaturesAtPixel(e.pixel, {
              hitTolerance: 5,
            });
          })
        );
      } else {
        this.mapStore.map.un("click", this.featuresSelector);
        this.features = []
      }
    };
  }
}
export default Selector;
