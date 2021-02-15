
# Lab

On va créer notre premier serveur nodejs avec express.

Le but de ce TP est de créer plusieurs routes.

On va créer des routes dans le but de :
- Lister tous les utilisateurs :
    - retourner un tableau d'objet utilisateur
- Récuperer les données d'un utilisateur : 
    - retourner 404 si l'utilisateur n'existe pas,
    - retourner l'objet utilisateur si il existe
- Créer un utilisateur :
    - retourner le nouvel utilisateur créé. Code 201.
    - Bonus si des blindages sont mis en place (email obligatoire/unique, etc) -> Code 400 / 422
- Modifier un utilisateur :
    - retourner 404 si l'utilisateur n'existe pas,
    - retourner l'utilisateur modifié.
    - Bonus si des blindages sont mis en place (email obligatoire/unique, etc) -> Code 400 / 422
- Supprimer un utilisateur :
    - retourner 404 si l'utilisateur n'existe pas,
    - retourner une réponse 204 si l'utilisateur est correctement supprimé.

Vous n'aurez pas encore de base de données.
Les données seront stockées en mémoire uniquement avec des variables globales (berk).

N'oubliez pas qu'il ne faut pas écrire tout dans un même fichier, séparer les choses comme vu lors du TP1
