---
date: 2020-11-07
duration: 1.5 hours
---

# OAuth and OpenID Connect

OAuth 2.0 is designed only for authorization, for granting access to data and features from one application to another. OpenID Connect (OIDC) is a thin layer that sits on top of OAuth 2.0 that adds login and profile information about the person who is logged in.

We will go deep into the protocol, see how it work and integrate with traditionnal web application as well as with microservice applications.

## OAuth basics

* A meta-framework, a protocol of protocols
* Oauth is OAuth2
* Used as the base of other specifications
* Such as OpenID Connect, UMA, HEART
* Adresses some important requirements
  * Delegate access
  * No password sharing
  * Revocation of access

## OAuth actors

* Resource Owner (RO), (end user, organisation, ...)
* Client (web app, mobile app, ...)
* Authorization Server (AS)
* Resources Server (RS) (API, ...)

## Flow

* Request access (signup, login, ...)
* Login (transparent, username/password, 2 factor auth, ...)
* Content (allowed the application to access resources on your behalf, can be hidden)

## Code Flow

* Multiple flows in OAuth, even more in OpenID Connect
* Most popular is Authentication Code Flow
* Application requests the user to be authenticated
* User authorizes the application to consume resources on behalf of the user
* User is redirect from the application to the Authorization Server
* Once authenticated, consent takes place 
* User is redirected to the application with a short live authorisation code
* Authorisation code is a Nonce (No More than Once) code
* Code is exchange for an access token from the client application

## Scopes

* Determine what to access
* Grouping of claims
* Claims in scope can be used as permissions
* No standardized scope in OAuth, various in OpenID Connect

## Kind of tokens

* Access Tokens, like a session, used to secure API calls
* Refresh Tokens, like a password, used to get new access token

## JWT (JSON Web Token)

* Not the only kind of token supported by OAuth
* JWT is the most popular
* Pronounced like the english word "jot"
* Lightweight tokenps passed in HTTP headers & query strings
* Encoded as JSON
* Encrypted, signed, or neither
* 3 parts, the hash, the content, the signature

## Usages of OAuth

* Not for authentication
* Not for federation
* Not really for authorisation
* For delegation

## OpenID Connect

* Based on OAuth2
* Made for mobile
* Clients also receive ID Tokens (identity tokens)
* User info endpoint to get user data
* Additionnal flow
* Claims, request obj, ...
* ID Token for the client, shall never be sent (eg to microservices)

## Resources

* [An Illustrated Guide to OAuth and OpenID Connect](https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc), video and article, 16mn.
