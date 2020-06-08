# wakey_wakey

## Pré requis

Docker / Docker-compose
Editeur de texte (atom,...)


### Mise en place du server 

- Se rendre dans le path /server
- Copier le fichier ``.env.dist`` en ``.env``
- Dans le fichier ``.env`` modifier la variable ``WAKEY_PATH``
- Dans ce répertoire exécuter ``docker-compose build`` puis 
``docker-compose up`` pour lancer le serveur

Pour rentrer dans le container : 
``docker exec -it wakey bash``


### Lancer le client

Installer le client expo https://expo.io/ et npm https://www.npmjs.com/

Dans le dossier client :

`npm install`

`expo start`

Installer l'application android expo https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US

Lancer l'application > Scan QR code

Scannez le QR code de la console expo, l'application se téléchargera et se lancera sur le mobile android.
