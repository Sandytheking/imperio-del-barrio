# 🏘️ Imperio del Barrio — Guía de Deploy

## Stack
- **Frontend:** Next.js 14 (App Router)
- **Base de datos:** Supabase (Auth + PostgreSQL)
- **Hosting:** Vercel (gratis)
- **Guardado:** Local-first + Cloud sync automático

---

## PASO 1 — Supabase (10 min)

### 1.1 Crear proyecto
1. Ve a **https://supabase.com** → Sign up gratis
2. "New Project" → nombre: `imperio-del-barrio`
3. Elige región: **South America (São Paulo)** (más cercano a RD)
4. Guarda la contraseña del DB

### 1.2 Crear la base de datos
1. En Supabase → **SQL Editor** → "New query"
2. Pega TODO el contenido de `supabase/migrations/001_schema.sql`
3. Click **Run** ✅

### 1.3 Copiar tus keys
Ve a **Settings → API** y copia:
- `Project URL` → va en `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` → va en `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role secret` → va en `SUPABASE_SERVICE_ROLE_KEY`

### 1.4 Activar Email Auth
Ve a **Authentication → Providers** → Email → Enable ✅

---

## PASO 2 — GitHub (5 min)

```bash
cd imperio-next
git init
git add .
git commit -m "🏘️ Imperio del Barrio v1.0"

# Crear repo en github.com/new
git remote add origin https://github.com/TU_USUARIO/imperio-del-barrio.git
git push -u origin main
```

---

## PASO 3 — Vercel (5 min)

1. Ve a **https://vercel.com** → Sign up con GitHub
2. "Add New Project" → importa tu repo `imperio-del-barrio`
3. Framework: **Next.js** (auto-detectado ✅)
4. En **Environment Variables** agrega:

```
NEXT_PUBLIC_SUPABASE_URL      = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY     = eyJhbGc...
NEXT_PUBLIC_APP_URL           = https://tu-proyecto.vercel.app
```

5. Click **Deploy** 🚀

**¡Listo! Tu juego estará en:** `https://imperio-del-barrio.vercel.app`

---

## PASO 4 — Dominio personalizado (opcional)

En Vercel → Settings → Domains → agrega `imperiodelbarrio.com`

---

## Cómo funciona el guardado

```
Jugador hace acción
      ↓
saveGame() en el juego HTML
      ↓
┌─────────────────────────────┐
│  localStorage (INSTANTÁNEO) │  ← siempre funciona, sin internet
└─────────────────────────────┘
      ↓ (async, no bloquea)
┌─────────────────────────────┐
│   Supabase Cloud (30s sync) │  ← backup en la nube
└─────────────────────────────┘
```

Al cargar el juego:
1. Busca save en localStorage (rápido)
2. Busca save en Supabase cloud
3. Usa el que tenga más dinero total ganado
4. Sincroniza ambos

---

## Estructura del proyecto

```
imperio-next/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout con fuentes
│   │   ├── page.tsx            # Página principal
│   │   └── api/
│   │       ├── save/route.ts   # POST /api/save
│   │       └── leaderboard/route.ts  # GET /api/leaderboard
│   ├── components/
│   │   └── GameClient.tsx      # React wrapper con auth + ranking
│   └── lib/
│       ├── supabase.ts         # Cliente Supabase + tipos
│       └── gameService.ts      # saveToCloud, loadFromCloud, leaderboard
├── public/
│   ├── game/
│   │   ├── imperio-del-barrio-v8.html  # El juego
│   │   └── game-bridge.js     # Bridge game ↔ Next.js
│   └── manifest.json          # PWA manifest
└── supabase/
    └── migrations/
        └── 001_schema.sql     # Todo el schema de la DB
```

---

## Mejoras implementadas vs v8

| Feature | v8 | v9 (Next.js) |
|---|---|---|
| Guardado | localStorage solo | localStorage + Supabase cloud |
| Auth | ❌ | ✅ Email + registro |
| Ranking | Fake (hardcoded) | ✅ Real (Supabase) |
| Anti-rollback | ❌ | ✅ (usa el save con más dinero) |
| Offline | ✅ | ✅ (local-first) |
| PWA | Básico | ✅ Con manifest |
| Deploy | Manual | ✅ Auto-deploy en cada push |

---

## Desarrollo local

```bash
cd imperio-next

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.local.example .env.local
# → Editar .env.local con tus keys de Supabase

# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000
```

---

## Próximos pasos sugeridos

- [ ] Agregar login con Google (1 click en Supabase)
- [ ] Notificaciones push (cuando hay eventos)
- [ ] Modo torneos (ranking semanal)
- [ ] Admin panel para ver estadísticas
- [ ] Conectar Stripe para el tier Premium ($4.99/mes)
