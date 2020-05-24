# wakey_wakey

## Pré requis

Docker / Docker-compose
Editeur de texte (atom,...)


### Mise en place du server 

- Se rendre dans le path /server/docker
- Copier le fichier ``.env.dist`` en ``.env``
- Dans le fichier ``.env`` modifier les variables ``PROTOS_PATH``
 et ``WAKEY_PATH``
- Dans ce répertoire exécuter ``docker-compose build`` puis 
``docker-compose up``

Pour rentrer dans le container : 
``docker exec -it wakey bash``

Il existe 2 types de Dockerfile : un pour dev et un pour la prod

- Pour le Dockerfile de dev, tout est automatisé, le server est prêt.

- Dans le cas du Dockerfile : il faut compiler les fichier .proto
    1. Rentrer dans le container ``docker exec -it wakey bash``
    2. Exécuter la commande ``/app/utils/start_server.sh``
    
## lecture
    https://github.com/TadasBaltrusaitis/OpenFace/wiki/Output-Format