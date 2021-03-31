
# Lab

https://www.npmjs.com/package/jsonwebtoken

#### 1 : JWT
Vous allez devoir construire une API /login qui permet à un utilisateur de se "connecter" à l'application.

L'utilisateur se connecte avec son email/mot de passe.

N'oubliez pas le blindage des erreurs (identifiants incorrects, ...)

L'api devra retourner :

```json
{
  "access_token": "jwt"
}
```

#### 2 : Middlewares

L'ensemble des routes du projet doivent être protegées.

On va mettre en place un middleware qui permet de vérifier si le JWT passé dans la requete est valide.
Ce middleware devra retourner un message d'erreur dans le cas où le middleware est invalide.


