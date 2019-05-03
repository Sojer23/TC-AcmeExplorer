import { Entity } from './entity.model';

export class Display extends Entity {
    tripsManagerStats: Object;
    applicationsTripStats: Object;
    priceTripStats: Object;
    applicationsRatioPerStatus: Object;
    averagePriceFinderStats: Object;
    topKeywordsFinderStats: Array<String>;
    computationMoment: Date;

}

/*tripsManagerStats: {
    avg: Number,
    min: Number,
    max: Number,
    std: Number
  },
  //  La media, mínimo, máximo y desviación estándar del número de aplicaciones por viaje.
  applicationsTripStats: {
    avg: Number,
    min: Number,
    max: Number,
    std: Number
  },
  //  La media, mínimo, máximo y desviación estándar del precio de los viajes.
  priceTripStats: {
    avg: Number,
    min: Number,
    max: Number,
    std: Number
  },
  // El ratio de aplicaciones agrupadas por estado (DUE, PENDING, ACCEPTED...).
  applicationsRatioPerStatus: {
    DUE: {
      type: Number,
      default: 0
    },
    REJECTED: {
      type: Number,
      default: 0
    },
    PENDING: {
      type: Number,
      default: 0
    },
    ACCEPTED: {
      type: Number,
      default: 0
    },
    CANCELLED: {
      type: Number,
      default: 0
    },
  },

  // La media de priceMax y priceMin que los explorers indican en sus búsquedas.
  averagePriceFinderStats: {
    priceMinAvg: Number,
    priceMaxAvg: Number
  },

  // Una lista con las 10 keywords más repetidas en las búsquedas, ordenadas de mayor a menor.
  topKeywordsFinderStats: [String],

  computationMoment: {
    type: Date,
    default: Date.now
  },
  rebuildPeriod: {
    type: String
  }*/