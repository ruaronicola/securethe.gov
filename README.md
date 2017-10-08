Progetto di monitoraggio di adozione della cifratura HTTP sui domini della PA

Descrizione delle risorse
   - Docker container "domain-scan". Il container 'domain-scan' contiene un servizio che,
   dato in input un csv con un elenco di domini, restituisce un csv con dati strutturati per la consultazione.
   Le informazioni raccolte nel CSV di output forniscono lo stato di adozione dei certificati ssl per i domini interessati
   https://github.com/italia/domain-scan

   - il container postgres contiene un'istanza postgres e postgrest per la consultazione dello storico dei dati raccolti da domain scan
   Il container postgres comunica sulle porta 5432 e sulla porta 3000

   - il container ngix (TODO) contiene il codice /src la index.html e la /build del frontend realizzato per interrogare le API postgrest e visualizzare lo stato d'uso dei certificati per i domini in uso
   Il container ngix è in ascolto sulle porte 5432 di postgres e 3000 di postgrest sul container "postgress"


TODO
yaml file docker compose
buil ngix 

INSTALLAZIONE

Entrare nella cartella /docker
Per ogni docker container lanciare
  " docker build - < Dockerfile"

Se l'operazione si conclude con successo l''output sarà come segue:

  Successfully built a5b8ab549f8d

Successivamente controllare le immagini installate con

  docker image list

E rinominarle con
  docker tag <id> nome:latest


CREAZIONE DEL CONTAINER DOCKER
docker run --name nome_del_container  nome_immagine
