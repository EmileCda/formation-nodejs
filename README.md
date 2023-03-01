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
npm i
```

Compilation live & Exécution live

```sh
npm run start
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

Check compilation ts : le fichier compilé sera dans le répertoire ./dist

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

installation de la gestion des variables d'environnement

```sh
npm i dotenv
```

parametrage de dotenv :dans package.json

modifier les scripts d'exécution

```json
 "watch:app": "npx nodemon -r dotenv/config dist/index.js",
```

créer le fichier `.env` et y mettre les variables d'environnement

pour utiliser les variables d'environne dans JS
process.env.MA_VARIABLE_EN
exemple

```js
console.long(process.env.MA_VARIABLE_EN);
```

Ajouter ce fichier dans .gitignore

```sh
echo ".env" >> .gitignore
```

Creer un fichier d'exemple de variable d'environnement

**attention** : le fichier .env ne DOIT pas être versionné. Par contre versionner .env.dist qui est un fichier d'environnement en exemple qui sera versionné.

# codage du serveur http (TP 1)

1. Installer fastify
2. Dans le fichier `index.ts`, créé une application fastify qui écoute sur votre machine, sur le port 4646
3. Ajouter 2 routes :

- `GET /`: Qui retourne la chaine de caractère `Bienvenue sur mon serveur`
- `GET /hello`: Qui retourne la chaine de caractère `Bonjour tout le monde`

4. Utiliser des variables d'environement pour le `port` et le `host` de votre serveur ...

> L'objéctif de l'exercice 4 est de rendre configurable pour `Alban` le `host` et le `port` de notre serveur !

# codage des (TP2)

[sujet](https://github.com/Djeg/formation-nodejs-mongo/blob/session/27-02-23/03-03-23/assets/exos/first-server.md)
