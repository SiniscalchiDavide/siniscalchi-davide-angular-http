# Risposte Laboratorio Angular HTTP

## Passo 6: Richieste HTTP osservate

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

---

## Domande e Risposte

### 1. A che cosa serve `provideHttpClient()` e in quale file va scritto?
Serve ad abilitare e configurare il servizio `HttpClient` nell'applicazione Angular per poter effettuare chiamate HTTP. Va scritto nel file di configurazione globale dell'app `src/app/app.config.ts`, all'interno dell'array `providers`.

### 2. Nel codice meno recente il servizio si otteneva con `constructor(public http: HttpClient)`; oggi scriviamo `private readonly http = inject(HttpClient)`. Che differenza c'è tra le due notazioni? Quale delle due non funziona dentro una classe `@Service()`?
Entrambe le notazioni realizzano la *Dependency Injection* in Angular. La sintassi con `inject()` è più moderna e pulita, in quanto permette di inizializzare le proprietà direttamente nella dichiarazione della classe senza dover definire un costruttore esplicito. La funzione `inject()` non funziona se chiamata al di fuori dell'inizializzazione delle proprietà o del costruttore (ovvero fuori dal *context* di iniezione di Angular).

### 3. Che cos'è un Observable? Quando parte la richiesta scritta in `getPosts()`?
Un `Observable` è un flusso di dati asincrono gestito dalla libreria RxJS. La richiesta HTTP scritta dentro `getPosts()` non parte al momento della chiamata del metodo, ma **solo quando viene eseguito il metodo `.subscribe()`**.

### 4. Che cosa fanno `next` ed `error` in `subscribe({ next, error })`? Quale dei due viene chiamato con il post 999, e con quale codice di stato?
* `next`: è la funzione di callback eseguita quando la richiesta va a buon fine e il server risponde con un dato.
* `error`: è la funzione di callback eseguita quando si verifica un errore durante la chiamata.
* Con il post 999 viene chiamato **`error`**, con lo stato HTTP **404 Not Found** (poiché la risorsa richiesta non esiste).

### 5. Perché `post`, `posts`, `loading` ed `errore` sono signal? Che cosa succederebbe con delle proprietà semplici?
Sono signal in modo che Angular possa tracciare la reattività dei dati e aggiornare automaticamente la vista (il template HTML) quando il loro valore cambia a seguito di una risposta asincrona. Con proprietà semplici, il dato arriverebbe in memoria ma la pagina non si aggiornerebbe visivamente.

### 6. Perché conviene tipizzare le risposte con un'interfaccia (`Post`, `CatFact`) invece di usare `any`? Fai un esempio di errore che l'interfaccia ti fa scoprire subito.
Conviene tipizzare per sfruttare il controllo dei tipi a tempo di compilazione e l'autocompletamento dell'editor.
* *Esempio di errore*: Se si scrive `p.titolo` invece di `p.title`, TypeScript segnala immediatamente l'errore in fase di compilazione (`TS2339: Property 'titolo' does not exist on type 'Post'`), evitando bug in fase di esecuzione.

### 7. Che cosa fa il pipe `json` e perché è utile durante lo sviluppo?
Il pipe `json` (`{{ p | json }}`) converte un oggetto o un array JavaScript/TypeScript in una stringa formattata in formato JSON indentato. È utile in fase di sviluppo perché permette di ispezionare rapidamente nella pagina HTML la struttura esatta dei dati restituiti dall'API.

### 8. Perché la POST restituisce sempre l'id 101? Perché nella POST non si usa `JSON.stringify`?
* Restituisce sempre l'id `101` perché JSONPlaceholder è un'API di prova (finta): simula la creazione assegnando l'id successivo ai 100 post esistenti, ma non salva i dati sul server.
* Non si usa `JSON.stringify` perché `HttpClient.post()` trasforma automaticamente l'oggetto JavaScript in JSON e imposta l'header `Content-Type: application/json`. Usare `JSON.stringify` invierebbe i dati come semplice testo libero.

### 9. Descrivi i passi con cui hai tenuto la chiave della NASA fuori dal repository. A che cosa serve `environment.example.ts`?
I passi seguiti sono stati:
1. Generazione dei file di ambiente con `ng g environments`.
2. Inserimento dei percorsi dei file `environment.ts` ed `environment.development.ts` nel file `.gitignore` prima del commit.
3. Creazione del file `environment.example.ts` contenente un segnaposto al posto della chiave (`INSERISCI_QUI_LA_TUA_CHIAVE`) e salvato su Git.
4. Inserimento della chiave reale esclusivamente nei file di ambiente veri (ignorati da Git).

Il file `environment.example.ts` serve da modello per chiunque cloni il repository (come il docente), indicando quali variabili di ambiente è necessario configurare localmente.

### 10. Perché la chiave in un'app Angular non è comunque segreta? Dove andrebbe tenuta una chiave davvero importante?
La chiave non è segreta perché un'applicazione Angular viene eseguita direttamente nel browser dell'utente: il codice compilato viene scaricato dal client e la chiave in chiaro può essere facilmente letta dagli strumenti dello sviluppatore (F12) o analizzando il traffico di rete. Le chiavi riservate andrebbero tenute su un server backend (full-stack), che si occupa di chiamare l'API esterna in modo sicuro senza esporre credenziali al client.
