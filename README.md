# Projet gestion des rendez-vous médicaux patient médecin
## 1 - Contexte et définition du projet:

le projet est une plateforme web qui permet de gérer la prise des rendez-vous pour les pataient d'une part et d'autre part permet au medecin de gerer leurs patients.Cette palatefoeme destiné à tous tous les catégories des patients et des médecins.

## 2 - Objectif du projet:

faciliter la gestion des rendez-vous midicaux sur trois niveaux;
	* Permettre au patient de chercher un médecin et d’avoir la  
	  possibilité de le géo-localiser et même de prendre un rendez-vous.
	* Permettre au médecin de gérer leurs rendez-vous, leurs dossiers
	  médicaux, et leurs temps de travail.
	* Permettre au administrateur de gérer le système (les médecins, les
	  spécialités...).

## 3 - Utilisation:

| Acteurs       | Cas d'utilisation             | 
| ------------- |:-----------------------------:| 
| Medecin       | Gérer les horaires de travail |
|               | Gérer les dossiers patients   |  
| Patient       | Chercher un médecin           |
|               | Prendre un rendez-vous        |
|               | Consulter l’état des RDV      |
| Administrateur| Gérer les spécialités         |
|               | Vérifier les médecins         |

## 4 - Délais de réalisation:

Les délais sont estimés vers 15 jours.

## 5 - USE CASE:

![cas d’utilisation géneral](screenshots/genrale.png)

## 6 - Diagramme de class :

![diagramme de class](screenshots/DigrClass.png)

# Projet gestion des rendez-vous patient medecin coté BE/FE

la plateforme a été dévellopé en se basent sur le framework Spring pour le backend et ReactJs pour le frontend.
le port de lancement sur ReactJs :  http://localhost:3000/
le port de lancement coté backend : http://localhost:8015/

## Les packages utilisé :

Spring MVC ,Spring Ioc, Spring Data, Spring sécurité, Spring Boot.

## Conception de Code :

le projet est supdivisé en plusieurs package :
* package.entitie : contient l'ensembles des entitité utilisé dans notre plateforme.
* package.dao : contient des interface qui hérite de l'interface JpaRepository qui nous offrir des opérations crus  pour manipuler la base de données,
* package.service : contient notre logique métier.
* packege.controller : contient notre REST API.
* packege.Config : pour la configuration de JWT.

## Les API à consommer :

## AUTHENTIFICATION :
![volé patient](screenshots/Patient.png)
![volé medecin](screenshots/Medcin.png)
![volé admin](screenshots/Admin1.png)

Pour consommer API de registrement il faut utiliser le lien :

http://localhost:3000/public/inscription-medecin
![register page medecin](screenshots/InscriptionMedcin.png)
http://localhost:3000/public/inscription-patient
![register page patient](screenshots/InscriptionPatient4.PNG)
http://localhost:3000/public/inscription-admin
![register page ](screenshots/Admin3.PNG)



Pour s'authentifier il faut utiliser le lien :

 
http://localhost:3000/public/authentification-patient
![login page patient](screenshots/LoginPatient.png)
![login page patient](screenshots/PageLoginPatient.png)
http://localhost:3000/public/authentification-medcin
![login page medecin](screenshots/LoginMedcin.png)
![login page medecin](screenshots/dashboardmedecin.png)
http://localhost:3000/public/authentification-admin
![login page medecin](screenshots/Admin2.PNG)
![login page medecin](screenshots/Admin4.PNG)

## Cas d'utilisation pour un Patient
### Rechercher un médecin :

http://localhost:3000/patient/medecin
![résultat de recherche](screenshots/rechercheMedecin.png)

### Accéder à un profil d'un médecin et prendre un rendez-vous :
http://localhost:3000/patient/medecin/26
![afficher le profil sélectioner](screenshots/profilmedcin.png)
![prise du rdv](screenshots/appointment.png)
![saisir la motif](screenshots/appointmentmotif.png)

### Voir la liste des rendez-vous prise :
http://localhost:3000/patient/rendez-vous
![afficher la liste des rendez-ous prise](screenshots/rdv.png)

## Cas d'utilisation pour un Médecin
### Afficher la liste des consultations
http://localhost:3000/medcin/calandrier
![liste des consulatations](screenshots/Calandrer.png)

### Gérer l'horaire de travail du médecin
http://localhost:3000/medecin/heure-disponibilite
![diponibilité](screenshots/listJourHeure.png)
![diponibilité](screenshots/listJourHeure1.png)
![diponibilité](screenshots/listJourHeure3.png)

## Cas d'utilisation pour l'admin
### Gérer les spécilaitées des médecins
http://localhost:3000/admin/specialite
![ajouter supprimer modifier les spécialitées](screenshots/specialite.png)
![ajouter supprimer modifier les spécialitées](screenshots/ajouterspecialite.PNG)
![ajouter supprimer modifier les spécialitées](screenshots/modification.PNG)
![ajouter supprimer modifier les spécialitées](screenshots/delete.PNG)
### Consulter la liste des médecins inscrivirent
http://localhost:3000/admin/medecins
![liste des medecin inscrit](screenshots/medecin.png)


## API documentation

Pour voir l'ensemble des fonctionnalités qui ont développé veuillez le trouver sur le lien  :
<http://localhost:8015/swagger-ui.html>

## Athors: 
* **Chaimaa Nazih**  - [Nazih Chaimaa](https://github.com/NzChaimaa)
* **Othmane Sarhabil**  - [SARHABIL othmane](https://github.com/SARHABILothmane)
* **Chaimaa  Bellemallem**  - [Chaimaa  Bellemallem](https://github.com/ChaimaaBellemallem) 

## Licence & Copyright
© Chaimaa  Nazih, Othmane Sarhabil, Chaimaa  Bellemallem.

Licensed under the [MIT Licence](LICENSE)
















