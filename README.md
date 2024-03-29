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

    $ npm start 
ou 

    $ nodemon

Dans le dossier "backend", renomer le fichier ".env.exemple" en ".env" 

Dans le dossier "backend" / ".env", j'utilise MongoDBCompass pour la connection avec cette url :

    $ "mongodb://127.0.0.1:27017/<nom_de_la_bdd>"   

Une fois effectué, vous aurait dans votre bdd un dossier <nom_de_la_bdd>. C'est la que l'import des fichiers json des données vont être importé dans la bdd.

Pour l'import, il faut se diriger sur chaque collection (users et posts) de la base de donnée (ici c'est groupomania) créé après le démarrage du backend

Exemple pour posts, dans document, on fait un "add data" et on importe le fichier json associé et ainsi de suite pour d'autre collection.

Une fois fait votre bdd sera prêt a l'utilisation.




