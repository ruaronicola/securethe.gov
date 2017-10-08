Progetto di monitoraggio di adozione della cifratura HTTP sui domini della PA

Descrizione delle risorse
   - docker container "domain-scan". Il container 'domain-scan' contiene un servizio che,
   dato in input un csv con un elenco di domini, restituisce un csv con dati strutturati per la consultazione.
   Le informazioni raccolte nel CSV di output forniscono lo stato di adozione dei certificati ssl per i domini interessati
   https://github.com/italia/domain-scan

   - il container postgres contiene un'istanza postgres e postgrest per la consultazione dello storico dei dati raccolti da domain scan

   - il container ngix (TODO) contiene il codice /src la index.html e la /build del frontend realizzato per interrogare le API postgrest e visualizzare lo stato d'uso dei certificati per i domini in uso



   INSTALLAZIONE
   Entrare nella cartella /docker
   Per ogni docker container lanciare
   " docker build - < Dockerfile"

   Se l'operazione si conclude con successo l''output sarà come segue:

   Successfully built a5b8ab549f8d

   docker image list

  docker tag <id> nome:latest


CREAZIONE DEL CONTAINER DOCKER
docker run --name nome_del_container  nome_immagine
