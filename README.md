# Site Diary

Site diary task for WBHO.

List entries, add entries, filter by contract, summary view with counts per contract. All the stuff from the brief.


## NB



I used AI assistance to quickly scaffold the Docker configurations and refresh my memory on SQLite setup (my daily stack is typically MongoDB/ SQL Server / PostgreSQL). All core business logic, MVC architecture, Redux state setup, and UI components were written by hand. Though I did look at documentations there and there. I remember the logic, not the syntax and methods sometimes. 😅

## What I built it with

Backend is Node and Express. I kept an mvc setup on the backend — routes, controllers, models, services — so `server.js` stays clean and I'm not cramming everything into one file.

Database is SQLite. Good enough for this, data persists in a file.

Frontend is React and TypeScript. The brief said Vue is a plus — I can work with Vue, there's a legacy vue app at work I help maintain sometimes — but React is what I'm most solid in so I used that here.

Redux for global state. Material UI for the ui. Toasts via notistack.

Git for the codebase.

Docker so you can run the project without setting up node on your machine first.


## Project layout

```
Site Diary/
├── client/
├── server/
├── Dockerfile
└── docker-compose.yml
```

## Run with docker

From the project root:

```bash
npm run docker:up
```

Then go to http://localhost:8080  or go to  http://localhost:80  I think it will reroute you in some instances.

Make sure Docker Desktop is running before you run that.

Both the api and frontend run in one container.

Stop it with:

```bash
docker compose down
```

## Run without docker

If you don't have docker desktop, run server and client separately.

Server:

```bash
cd server
npm install
npm run dev
```

http://localhost:3001

Client (second terminal):

```bash
cd client
npm install
npm run dev
```

http://localhost:5173

Vite proxies `/api` to the backend on 3001.

## API

`GET /api/entries` — list entries, newest first. pass `?contract=ContractName` to filter

`POST /api/entries` — create an entry

`GET /api/entries/summary` — entries grouped by contract with counts

Example POST body:

```json
{
  "date": "2026-08-22",
  "contractName": "WBHO Tower",
  "weather": "Sunny",
  "notes": "Foundation work completed.",
  "authorName": "Nhlamulo"
}
```

Validation on create: date can't be in the future, notes are required, notes max 500 characters.

Regards
Nhlamulo Magwaza
