# wakey_wakey

## Pré requis

Docker / Docker-compose
Editeur de texte (atom,...)


### Mise en place du server 

- Se rendre dans le path /server
- Copier le fichier ``.env.dist`` en ``.env``
- Dans le fichier ``.env`` modifier la variable ``WAKEY_PATH``
- Dans ce répertoire exécuter ``docker-compose build`` puis 
``docker-compose up``

Pour rentrer dans le container : 
``docker exec -it wakey bash``


### Rentrer dans le container 
   
   docker exec -it wakey bash

  
