# Groupomania_P7

# Sommaire
## 1. Informations générales
## 2. Technologies
## 3. Installation

---
## 1. Informations générales
Ce projet est la toute première version d'un projet de réseau social d'entreprise du groupe "Groupomania". Cette première version sera à faire tester par quelques employés de Groupomania pour valider la partie fonctionnelle. Actuellement, cette première version est terminée et est en attente de validation.
Le projet est composé de deux parties. La première partie est le front-end et la seconde partie est l'API, cette dernière se trouvant dans le dossier "backend".

---
## 2. Technologies
Liste des différentes technologies utilisé pour la création du projet :
* NodeJs
* express
* mongoose
* mongoDB
* react

---
## 3. Installation
Cloner le repository :

    $ git clone https://github.com/MichaelH2B/Groupomania_P7.git

Ouvrir un premier terminal de commande dans le dossier "frontend", puis installer les librairies :

    $ npm install

Démarrer le projet (par défaut le projet sera lancé sur le port 3000) :

    $ npm start

Ouvrir un deuxième terminal de commande dans le dossier "backend", puis installer les librairies :

    $ npm install

Démarrer le projet (par défaut le projet sera lancé sur le port 5000) :

    $ npm start ou $ nodemon

Dans le dossier "backend", renomer le fichier ".env.example" en ".env" à l'intérieur compléter les données manquantes dans l'url.
(email et mdp de votre BDD)
