
  

# Billed front-end

  
  

## L'architecture du projet :

Ce projet, dit frontend, est connecté à un service API backend que vous devez aussi lancer en local.

  

Le projet backend se trouve ici: https://github.com/David952/Billed/tree/main/backend

  

## Organiser son espace de travail :

Pour une bonne organization, vous pouvez créer un dossier `"billed"` dans lequel vous allez mettre le projet backend et par la suite, le projet frontend:

  
  

```
billed/

- backend

- frontend

```

  

## Comment lancer l'application en local ?

  

### étape 1 - Lancer le backend :

  

Suivez les indications dans le README du projet backend.

  

### étape 2 - Lancer le frontend :

  

Allez au répertoire du projet:

```
$ cd frontend
```

  

Installez les packages npm (décrits dans `package.json`) :

```
$ npm install
```

  

Installez live-server pour lancer un serveur local :

```
$ npm install -g live-server
```

  

Lancez l'application :

```
$ live-server
```

  

Puis allez à l'adresse : `http://127.0.0.1:8080/`

  
  

## Comment lancer tous les tests en local avec Jest ?

  

```
$ npm run test
```

  

## Comment lancer un seul test ?

  

Installez jest-cli :

  

```
$npm i -g jest-cli

$jest src/__tests__/votre_fichier_de_test.js
```

  

## Comment voir la couverture de test ?

  

`http://127.0.0.1:8080/coverage/lcov-report/`

  

## Comptes et utilisateurs :

  

Vous pouvez vous connecter en utilisant les comptes:

  

### administrateur :

```
utilisateur : admin@test.tld
mot de passe : admin
```

### employé :

```
utilisateur : employee@test.tld
mot de passe : employee
```

================ EN ====================

## How to launch the application locally ?

  

### Step 1 - Launch the backend :

  

Follow the instructions in the README file of the backend project.

  

### Step 2 - Launch the frontend :

  

Navigate to the project directory :

```
$ cd frontend
```

  

Install the npm packages (described in `package.json`) :

```
$ npm install
```

  

Install live-server to run a local server :

```
$ npm install -g live-server
```

  

Launch the application :

```
$ live-server
```

  

Then go to the address : `http://127.0.0.1:8080/`

  
  

## How to run all tests locally with Jest ?

  

```
$ npm run test
```

  

## How to run a single test ?

  

Install jest-cli :

  

```
$npm i -g jest-cli

$jest src/__tests__/your_test_file.js
```

  

## How to view test coverage ?

  

`http://127.0.0.1:8080/coverage/lcov-report/`

  

## Accounts and users :

  

You can log in using the following accounts :

  

### administrator :

```
user : admin@test.tld
password : admin
```

### employee :

```
user : employee@test.tld
password : employee
```