
# Final project

## Introduction

The project creates a Chat application similar to Discord, WhatApps or Keybase with a minimal set of features. The user can securely create and manage channels, invite friends and post messages in a secure manner. By the end, the user will be able:

* To authenticate itself using an external provider with Oauth (groups 1 and 3) or using a local account with its internal sign in form (groups 2 and 4).
* Navigate through his channels and the messages associated with the current channel.
* Share the channel access with other users.
* Access the channel to which he was invited.
* Send new messages.
* Edit and remove **his** messages.
* Use the user Gravatar if any or provide a default randomly generated Gravatar, choose an avatar proposed by the application and upload his avatar.
* Modify his settings.
* Trust the Chat application because it is secured and the resource access is verified.

## Delivery

The project must be published on GitHub. You must grant access to your repository if it is private. The repository must respect best practices and usages. It shall contain at least two folders, one for the back-end API and one for the front-end application.

Communication and presentation of your project must be present in the readme file. The readme must include and reproduce the tasks with your own comments. An example is provided in the `README.md` file provided with the example project. What you have done, why and how you implement features, instructions, recommendations, important notes... all must be concise. The goal is to provide the maximum of context for the correction while accelerating the reviewing process.

A default application is provided to start. It is recommanded to clone it and start from there. It also comes with a `./README.md` file. **Use this file** as a template for your own readme.

## Deadline

The project is due by **December 20th, 2020** in the evening. Please notify me if it is ready before.

## Evaluation

Each task is associated with a grade which is provided for information and which might be adjusted.

Be sure to respect the instructions. If any doubts, **post an issue** on the [course GitHub repository](https://github.com/adaltas/ece-2020-fall-webtech/).

Any **plagiarism will be penalized** with a 0 and a warning.

It is forbidden to:

* use any alternative framework to React.js (eg Vue.js, Angular, ...).
* any alternative storage to LevelDB unless it is a sorted key-value store or a column family store.
* existing available layout templates (but you can get inspiration from them).

You are provided with a working project. The final project must be working as well. No correction will be made on a project which does not start.

The final project must be **professional** grade. You must think about everything expected from a project in production including resource access, error management, ... Don't forget to communicate in the Readme about what has been implemented.

## Tasks

Note, you do not have to complete all tasks, do your best and don't hesitate to ask questions. Some tasks are much easier than expected.

Project management

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
  Overall look and feel, user experience (UX), material-ui and graphical components, CSS styling
* Git and DevOps   
  points: 4   
  level: medium   
  Commit history, branch usage, merge versus rebase, squashing, unit tests, CI/CD (eg run unit tests and Travis, Jenkins, ...), linter, ...

Application development

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
  Every request sent to the API server (back-end) must contain the user access token in the HTTP header with its identity (email). Once the token is validated by the authentication middleware, the user ID must be associated with the created channel (eg `owner` property). If the user does not yet exist in the database, he must be created automatically.
* Ressource access control   
  points: 4   
  level: medium   
  A user must only gain access to the channel he created or to the channels he was invited to. The APIs must return the appropriate channels. It must also prevent unexpected access and intrusion attempts. The HTTP response must return an appropriate HTTP response code and message.
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

## Bonus ideas

* Real-time notification with [Socket.io](https://socket.io/).
* Advanced authorization such as declaring a user as an administrator with extended permissions to remove any channels, add users, ...
* Smiley integration in the messages.
* Replace LevelDB with a scalable and distributed alternative (Cassandra, HBase, ...)
* Any feature of your liking

Bonuses are expected to be proposed if a large majority of the tasks are implemented. Communicate about the bonus inside the readme file to inform about their existence and usage.
