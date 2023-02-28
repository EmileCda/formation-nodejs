# Formation NodeJs : 27 févier 2023

## Node.js formation Back-end

## package suplémentaire

ajout de l'option watch
nodedemon : pour simplifier la tâche; c'est un cron qui ré-exécute le fichier en cas de changement
ajout de 2 bibliothèque
1.watch:typescript

    "watch:typescript": "tsc --watch",
    "demon:node": "nodemon dist/index.js"

## Instruction d'installation

Dans une terminal lancer les commandes suivantes :

initialisation le projet se rendre dans le répertoire projet

```sh
npm init -y
```

installation de typescript

```sh
npm i -D typescript @types/node
```

```sh
node ./dist/index.js
```

Exécution live

```sh
npm run demon:node
```

Compilation live

```sh
npm run watch:typescript
```

## installation lors de la création du projet

Creation du projet :
check si node et npm est installé

```sh
# Affiche la version de node (l'interpréteur)
node --version
# Affiche la version de npm
npm --version
```

creer le répertoire projet et s'y rendre

```sh
mkdir monProjet
cd monProjet
```

Initilisation du projet

```sh
npm init -y
```

installation de typescript

```sh
npm i -D typescript @types/node
```

initialiser typescript (creation de trsconfig.json)

```sh
npx tsc --init
```

creation de l'arbrescense projet
et du fichier index.ts

```sh
mkdir ./src
echo "console.log('**********JS on line **************** ')" >> ./src/index.ts
```

Check compilation ts : le fichier compilé sera dans le répertoire ./dit

```sh
npx tsc ./src/index.ts -outDir ./dist
```

configuration de ts

editer le fichier `./tsconfig.json` et renseigner les clés :

1. `rootDir` => répertoire des fichier source (ts)
2. `outDir` => répertoire des fichier compilé (js)

Exclure les répertoires et fichier à versionner

```sh
echo "dist/" >> .gitignore
echo "node_modules/" >> .gitignore
echo "package-lock.json" >> .gitignore
```

confort : nodemon : surveille le fichier et s'il change alors l'excuter
installation nodedemon

```sh
npm i -D nodemon
```

**confort** : précompilation à chaque modification (enregistrement).

```sh
npx tsc --watch
```

**confort** : Creation des scripts de raccourci dans package.json

A faire dans package.json : clé "scripts"

1. watch:typescript => "npx tsc --watch",
2. watch:app => "npx nodemon dist/index.js",

```json
 "watch:typescript": "npx tsc --watch",
 "watch:app": "npx nodemon dist/index.js",
```

installation de concurrently

```sh
npm i -D concurrently
```

**confort** : Ajout du script pour lancer le watch:typescript et watch:app en parallèle
A faire dans package.json : clé "scripts"

```json
"start": "npx concurrently npm:watch:typescript npm:watch:app"
```
