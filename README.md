# Passo 6: Richieste HTTP osservate

| Pulsante | Metodo | URL | Stato |
| --- | --- | --- | --- |
| **Carica un post** (con 1) | GET | `https://jsonplaceholder.typicode.com/posts/1` | 200 OK |
| **Carica un post** (con 999) | GET | `https://jsonplaceholder.typicode.com/posts/999` | 404 Not Found |
| **Carica tutti** | GET | `https://jsonplaceholder.typicode.com/posts` | 200 OK |
| **Invia un post** | POST | `https://jsonplaceholder.typicode.com/posts` | 201 Created |

### Osservazioni
- **GET /posts/1**: Ritorna il singolo JSON del post richiesto.
- **GET /posts/999**: Restituisce errore 404 e un oggetto vuoto `{}` perché la risorsa non esiste.
- **GET /posts**: Restituisce un array contenente tutti i 100 post.
- **POST /posts**: Invia il nuovo post e riceve in risposta lo stesso oggetto integrato con `"id": 101`.
