import { Attribution } from 'ol/control'
import { ScaleLine } from 'ol/control.js';
import Link from 'ol/interaction/Link'

class MapElement {
  constructor({ map }) {
    this.map = map

    this.map.addInteraction(new Link({
      params: ['x', 'y', 'z', 'r']
    }));

    this.map.addControl(new ScaleLine({
      units: 'metric',
      bar: false,
      text: true,
      minWidth: 140
    }));

    this.map.addControl(new Attribution({
      collapsible: false,
    }));

  }
}

export default MapElement
