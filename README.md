# Ajedrez UNViMe — Frontend

Interfaz del sistema de ajedrez local (Modelos y Simulación, UNViMe). React 19 + Vite, organizado con Atomic Design.
La estructura y el inventario de componentes están en [`src/README.md`](src/README.md).

## Requisitos

- Node 24 LTS (ver Gestión de la Configuración) y npm.
- El backend (carpeta `backend/` del repo común) corriendo en `http://127.0.0.1:3001` (Express, sin prefijo `/api`) con PostgreSQL y Stockfish configurados.
- En el `.env` del backend, `FRONTEND_URL` tiene que ser **exactamente** el origen del front (por defecto `http://localhost:5173`). Si abrís el front como `http://127.0.0.1:5173`, el backend rechaza las llamadas por CORS.

## Puesta en marcha

```bash
npm ci
cp .env.example .env      # ajustar VITE_API_URL si el backend no está en 3001
npm run dev               # http://localhost:5173 (el backend ya habilita CORS para este puerto)
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve lo compilado |
| `npm run lint` | ESLint |
| `npm test` | Pruebas unitarias (`node:test`) |

## Qué está conectado al backend

| Pantalla / acción | Endpoint |
| --- | --- |
| Niveles de dificultad | `GET /difficulty-profiles` |
| Comenzar partida | `POST /games` `{ mode: LOCAL\|STOCKFISH\|AI, alias, difficulty: FACIL\|MEDIO\|DIFICIL, playerColor: WHITE\|BLACK }` (con el motor de blancas, el backend juega su primera jugada al crear la partida) |
| Elegir pieza (destinos legales) | `GET /games/:id/legal-moves?square=e2` |
| Mover | `POST /games/:id/moves` `{ from, to, promotion? }` |
| Turno de Stockfish / IA | `POST /games/:id/engine-move` |
| Rendirse | `POST /games/:id/resign` `{ color }` (devuelve resultado y motivo) |
| Guardar y salir | `POST /games/:id/pause` |

Capa HTTP: `src/services/`. Los nombres de campo del backend están en un único archivo, `src/services/normalizar.js`; los valores
`LOCAL | STOCKFISH | AI` y `WHITE | BLACK` están en `src/utils/traductores.js`; los mensajes por código de error, en `src/utils/mensajesError.js`.
Verificado contra el backend real (PostgreSQL + Stockfish): partida contra Stockfish con ambos colores, contra la IA (respaldo del backend),
coronación, jaque mate, abandono, guardar y salir y timeout del motor con reintento.

## Pendiente

- Historial de partidas, visor PGN y reanudar (`GET /games`, `/games/:id/pgn`, `/resume`): falta el diseño de UX.
- Reloj: la interfaz muestra el tiempo elegido pero no hay cuenta regresiva; ningún requisito lo pide (decisión abierta).
- Partidas contra otro jugador: la API recibe un único `alias` (el segundo jugador figura como "Player 2" en la base); el nombre del segundo jugador solo se ve en pantalla.
- `GET /games/:id` devuelve `result` pero no `endReason`: el motivo de cierre solo llega al terminar la partida; para el historial habrá que pedirle a Backend que lo agregue.
- Pruebas de componentes (Vitest + Testing Library): decisión abierta del equipo.
