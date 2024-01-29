export default function __(key) {
  const lang = window?.LANGUAGE ?? 'fr';
  return STRINGS?.[lang]?.[key] ?? key;
}

const STRINGS = {
  "fr": {
    "path": "Sentier",
    "track": "Chemin",

    "tracktype": "Type de piste",
    "grade1": "Revêtement dur",
    "grade2": "Revêtement compact",
    "grade3": "Revêtement assez compact",
    "grade4": "Revêtement peu compact",
    "grade5": "Revêtement mou",

    "surface": "Surface",
    "asphalt": "Asphalte",
    "concrete": "Béton",
    "paved": "Revêtu",
    "unpaved": "Non revêtu",
    "compacted": "Compacté",
    "fine_gravel": "Gravier fin",
    "gravel": "Gravier",
    "dirt": "Terre",
    "ground": "Sol",
    "sand": "Sable",
    "grass": "Herbe",

    "smoothness": "Lissage",
    "excellent": "Excellent",
    "good": "Bon",
    "intermediate": "Intermédiaire",
    "bad": "Mauvais",
    "very_bad": "Très mauvais",
    "horrible": "Horrible",
    "very_horrible": "Très horrible",
    "impassable": "Impassable",

    "mtb:scale": "Niveau technique de VTT (1 à 5)",
    "mtb:scale:uphill": "Niveau technique de VTT en montée (1 à 5)",

    "bicycle": "Cyclabilité",
    "yes": "Oui",
    "no": "Non",
    "designated": "Dédié",
    "official": "Officiel",
    "permissive": "Permis",
    "destination": "Destination",
    "private": "Privé",
    "delivery": "Livraison",
    "customers": "Clients",
    "agricultural": "Agricole",
    "forestry": "Forestier",
    "discouraged": "Déconseillé"
  }
}