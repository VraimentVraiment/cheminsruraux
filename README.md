# Carte de la cyclabilité des chemins en France et en Belgique

## Description

Un projet de carte pour visualiser la qualification de cyclabilité des chemins en France et en Belgique.

La carte est rendue avec la librairie [mapbox-gl-js](https://docs.mapbox.com/mapbox-gl-js/guides/).

Le fond de carte est réglé sur le style [Mapbox Streets](https://www.mapbox.com/maps/streets) avec quelques modifications.

Les tuiles vectorielles des chemins sont générées avec [tilemaker](https://github.com/systemed/tilemaker) à partir de la base de données OpenStreetMap et uploadées sur mapbox.

Ce dépôt permet de générer deux bundles :

- à destination d'un [site statique](https://cheminsruraux.vraimentvraiment.com) d'une part ;

- à destination d'un plugin wordpress pour notre [article sur les chemins ruraux](https://autrementautrement.com).

## Installation

Cloner ce dépôt, puis :

```bash
npm install
```

Créer un fichier `src/scripts/map/config.secrets.js` exportant les deux variables suivantes :

```javascript
/**
 * L'url du style mapbox à utiliser.
 */
export const STYLE_URL = "<your mapbox style url>";

/**
 * La clé d'accès à l'API mapbox.
 */
export const ACCESS_TOKEN = "<your mapbox access token>";
```

## Développement

### Développement du site statique

```bash
npm run dev:static
```

## Production

### Génération du bundle pour site statique

```bash
npm run build:static
```

### Génération du bundle pour plugin wordpress

```bash
npm run build:wordpress
```

### Tout générer

```bash
npm run build:all
```

## Déploiement

### Déploiement du site statique

Copier le contenu du dossier `static` sur le serveur.

### Déploiement du plugin wordpress

Créer un dossier `vv-map` dans le dossier `wp-content/plugins` de l'installation de wordpress, puis copier le contenu du dossier `wp-plugin` de ce dépôt dans ce dossier.

## Licence

Ce projet est sous licence [MIT](https://choosealicense.com/licenses/mit/).