
# Final project

## Introduction

Ce projet a pour sujet la reproduction d’un tchat à la manière de Discord/Whatsapp/Keybase (de manière très simplifiée)... Le but est de fournir une application Web permettant d’accéder à des channels, d’écrire des messages, ....

* S’authentifier auprès de l’application avec un compte local et un formulaire d’inscription.
* Naviguer au travers de ses channels et des messages du channel sélectionné.
* Partager l’accès au channel avec d’autres utilisateurs.
* Accéder aux channels auxquels il a été ajouté.
* Envoyer un nouveau message.
* Modifier et supprimer son message.
* Automatiser l’association de leur email avec leur gravatar, sélectionner un avatar proposé par l’application et uploader son propre gravatar.
* Système de préférence de compte.
* Bénéficier d’une application sécurisée dans laquelle l’accès aux ressources est vérifié (authentification et autorisation).

## Delivery

Votre projet est à faire par groupe de deux, au sein d’un même groupe de TD.

Votre projet devra être déposé sur *campus* avec le nom suivant : Gr0X_Nom1_Prenom1_Nom2_Prenom2.rar

**Vous ne devez pas inclure dans votre archive les dossiers node_modules**

Une application par défaut est disponible. Nous vous recommandons de partir de celle-ci.

## Deadline

La deadline est fixée pour le 09 / 05 / 2021 à 23H55

## Evaluation

Attention à bien respecter les spécifications pour les fonctionnalités demandées.

Vous devez respecter les conventions de nommage de variable comme vu en cours cf le fichier sur campus.

**Tout plagiat sera sanctionné d’un 0 et d’un avertissement**

Interdiction d’utiliser :

* autres languages que javascript (typescript, php, python, ...)
* d’autres frameworks ou librairie autre que React (Vuejs, Angular, …),
* tout autres bases de données que LevelDB qui n’est pas du type Column Family ou Sorted Key Value Set
* des templates React “tout fait”.

Le projet doit fonctionner. Aucun évaluation sera faite si le projet ne se lance par correctement

S'il y a des informations nécessaires à fournir, veuillez les fournir dans le Readme.

Les fonctionnalités doivent fonctionner !

## Tasks

#### Gestion de projet

* Respect des conventions de nommage
  poinnts : 2
* Structure des projets simple, compréhensible et stable, organisation des dossiers, services, composants 4
* Qualité globale du code (indentation, clarté, …) 4
* Apparence globale de l’application web 4

#### Développement (English)

Note, you do not have to complete all tasks, do your best and don't hesitate to ask questions. Some tasks are much easier than expected.

##### Project management

* Naming convention   
  points: 2   
  level: easy   
  Respect of the community conventions and best practices, consistency
* Project structure   
  points: 4   
  level: easy   
  Simplicity and comprehensiveness, files/services/components organization.
* Code quality   
  points: 4   
  level: easy   
  Indentation, understandability, lint usage and validation, line spacing.
* Design, UX   
  points: 4   
  level: medium   
  Overall look and feel, user experience (UX), material-ui/bootstrap and graphical components, CSS styling

##### Application development

* Sign In, Sign Up, Log Out   
  points: 4   
  level: medium   
  Make a sign in form, a sign up form and create all the API needed.   
  The user can also log out.

* Welcome screens   
  points: 4   
  level: easy   
  Make the welcome screens when the user arrives inside the app and after they log in to be friendly, good looking and informative. Refer to other services on the web to take inspiration and provide relevant information about the service. This task is mostly about content and design.
* New channel creation   
  points: 6   
  level: hard   
  Insert a new action (eg a button) allowing the creation of a new channel, display the form (eg popup, screen) with the channel properties (eg name, members, ...), propose to cancel or send the form and persist the channel in the database.
* Channel membership and access   
  points: 4   
  level: medium   
  Every request sent to the API server (back-end) must contain the user access token in the HTTP header. Once the token is validated by the authentication middleware, the user ID must be associated with the created channel (eg `owner` property).
* Ressource access control   
  points: 4   
  level: medium
  A user must only gain access to the channel he created or to the channels he was invited to. The APIs must return the appropriate channels. It must also prevent unexpected access and intrusion attempts. The HTTP response must return an appropriate HTTP response code and message.
  The user password must be encrypted. You can use this library : https://github.com/kelektiv/node.bcrypt.js#readme 
* Invite users to channels   
  points: 6   
  level: hard   
  A channel can have one to n members, the creator being the first member. It is possible to invite new members either at the channel creation or later.
* Message modification   
  points: 2   
  level: easy   
  Once a message is sent and shared, only the message author must be able to modify its content.
* Message removal   
  points: 2   
  level: easy   
  Once the message is sent and shared, the message author, and only him, must be able to remove it.
* Account settings   
  points: 4   
  level: medium   
  Create a screen for the user to modify his/her personal settings (email, name, language, theme, ...). Those properties don't have to be active. The goal is to display form components, persist their value and load the form components with new values. For example, a switch component to select between a day and night theme illustrates how to use the switch component. On save, the value must be persisted and the switch component must reflect it. You don't have to update the overall theme UI to reflect this value. If you do, it is part of the bonus and you must mention it in the readme.
* Gravatar integration   
  points: 2   
  level: easy   
  Gravatar is a service which associates your email with an image you upload. Other services may then refer to it. Some people choose a photo of themself, others use an abstract image. It is part of the tech culture and services such as GitHub and NPM.js use it. You can use an existing component or build your own, it is very easy to integrate and it will provide a default random image if the user email is not registered.
* Avatar selection   
  points: 4   
  level: medium   
  Provide the user with the possibility to choose an avatar from a selection you provide. The screen presenting this selection can be proposed once the user logged in for the first time (when the user account was not yet present inside the database and was created) or when the user edits his/her settings.
* Personal custom avatar   
  points: 6   
  level: hard   
  Offer the user the ability to upload his avatar in the form of an image (eg png, svg, ...). Ideally, the form must support drag and drop, filter the file type and restrict the file size.
  Images can be saved in different ways (clouds, locally files, database) but you will have 6 points only if you do the best scalable features

## Bonus ideas

* Real-time notification with [Socket.io](https://socket.io/).
* Advanced authorization such as declaring a user as an administrator with extended permissions to remove any channels, add users, ...
* Smiley integration in the messages.
* Replace LevelDB with a scalable and distributed alternative (Cassandra, HBase, ...)
* Any feature of your liking

Bonuses are expected to be proposed if **the majority of the tasks are implemented**. Communicate about the bonus inside the readme file to inform about their existence and usage.
