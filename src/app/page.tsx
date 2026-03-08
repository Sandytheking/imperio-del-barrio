'use client';

export default function Home() {
  return (
    <>
      <style>{`
        :root {
          --bg:#0F0D1A; --bg2:#171426; --yellow:#FFE135; --orange:#FF6B35;
          --green:#2DC653; --blue:#5BC8F5; --purple:#9B5DE5;
          --text:#F5F3FF; --muted:#8B87A8; --card:#1C1830;
          --border:rgba(255,255,255,0.07);
        }
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--text);font-family:'Nunito',sans-serif;overflow-x:hidden}

        /* NAV */
        nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 32px;display:flex;align-items:center;gap:16px;background:rgba(15,13,26,.88);backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
        .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
        .nav-logo-text{font-family:'Fredoka One',cursive;font-size:1.2rem;color:var(--yellow)}
        .nav-links{margin-left:auto;display:flex;gap:8px;align-items:center}
        .nav-link{color:var(--muted);text-decoration:none;font-size:.85rem;font-weight:700;padding:6px 12px;border-radius:8px;transition:color .2s,background .2s}
        .nav-link:hover{color:var(--text);background:var(--border)}
        .nav-cta{background:var(--yellow);color:var(--bg);font-family:'Fredoka One',cursive;font-size:.9rem;padding:9px 22px;border-radius:99px;text-decoration:none;transition:transform .15s,box-shadow .15s}
        .nav-cta:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(255,225,53,.4)}

        /* HERO */
        .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:100px 24px 60px;position:relative;overflow:hidden;text-align:center}
        .hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,225,53,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,225,53,.04) 1px,transparent 1px);background-size:60px 60px;animation:gridMove 20s linear infinite}
        @keyframes gridMove{0%{transform:translateY(0)}100%{transform:translateY(60px)}}
        .hero::after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 20% 40%,rgba(255,107,53,.12) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 80% 60%,rgba(45,198,83,.09) 0%,transparent 60%)}
        .hero-content{position:relative;z-index:2;max-width:800px}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(45,198,83,.12);border:1.5px solid rgba(45,198,83,.35);color:var(--green);font-size:.8rem;font-weight:800;letter-spacing:.08em;padding:6px 16px;border-radius:99px;margin-bottom:28px;text-transform:uppercase;animation:fadeUp .6s ease both}
        .badge-dot{width:6px;height:6px;background:var(--green);border-radius:50%;animation:pulse 2s ease infinite}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
        .hero h1{font-family:'Fredoka One',cursive;font-size:clamp(3rem,10vw,6.5rem);line-height:.95;margin-bottom:10px;animation:fadeUp .7s .1s ease both}
        .h1-line1{color:var(--yellow);display:block;text-shadow:0 0 80px rgba(255,225,53,.35)}
        .h1-line2{color:transparent;-webkit-text-stroke:2px rgba(255,255,255,.3);display:block}
        .hero-tagline{font-size:clamp(1rem,3vw,1.3rem);color:var(--blue);font-weight:800;margin-bottom:20px;animation:fadeUp .7s .2s ease both}
        .hero-desc{font-size:clamp(.95rem,2.5vw,1.1rem);color:var(--muted);max-width:520px;margin:0 auto 36px;line-height:1.7;animation:fadeUp .7s .3s ease both}
        .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:52px;animation:fadeUp .7s .4s ease both}
        .btn-primary{background:linear-gradient(135deg,var(--yellow),#FFA500);color:var(--bg);font-family:'Fredoka One',cursive;font-size:1.2rem;padding:16px 40px;border-radius:99px;text-decoration:none;box-shadow:0 8px 32px rgba(255,225,53,.4);transition:transform .2s,box-shadow .2s;display:inline-flex;align-items:center;gap:8px}
        .btn-primary:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(255,225,53,.5)}
        .btn-secondary{background:rgba(255,255,255,.06);color:var(--text);font-family:'Fredoka One',cursive;font-size:1rem;padding:16px 32px;border-radius:99px;text-decoration:none;border:1.5px solid rgba(255,255,255,.12);transition:background .2s}
        .btn-secondary:hover{background:rgba(255,255,255,.1)}
        .biz-float{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;max-width:560px;margin:0 auto;animation:fadeUp .8s .5s ease both}
        .biz-pill{background:var(--card);border:1px solid var(--border);border-radius:99px;padding:8px 16px;font-size:.85rem;font-weight:700;color:var(--muted);transition:all .2s}
        .biz-pill:hover{border-color:rgba(255,225,53,.3);color:var(--text);transform:translateY(-2px)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .scroll-hint{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);color:var(--muted);font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:flex;flex-direction:column;align-items:center;gap:6px;animation:fadeUp 1s .8s ease both}
        .scroll-arrow{width:20px;height:20px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg);animation:bounce 1.5s ease infinite}
        @keyframes bounce{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(5px)}}

        /* STATS */
        .stats-bar{background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);display:flex;justify-content:center;flex-wrap:wrap}
        .stat-item{padding:28px 40px;text-align:center;border-right:1px solid var(--border);flex:1;min-width:130px}
        .stat-item:last-child{border-right:none}
        .stat-num{font-family:'Fredoka One',cursive;font-size:2.2rem;color:var(--yellow);display:block;line-height:1;margin-bottom:4px}
        .stat-label{font-size:.72rem;color:var(--muted);font-weight:800;letter-spacing:.08em;text-transform:uppercase}

        /* SECTIONS */
        section{padding:80px 24px}
        .section-inner{max-width:1000px;margin:0 auto}
        .section-badge{display:inline-block;font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--yellow);background:rgba(255,225,53,.1);border:1px solid rgba(255,225,53,.2);padding:4px 14px;border-radius:99px;margin-bottom:14px}
        .section-title{font-family:'Fredoka One',cursive;font-size:clamp(1.8rem,5vw,3rem);color:var(--text);margin-bottom:12px;line-height:1.1}
        .section-title span{color:var(--yellow)}
        .section-sub{color:var(--muted);font-size:1rem;max-width:500px;line-height:1.7;margin-bottom:48px}

        /* JOURNEY */
        .journey-section{background:var(--bg)}
        .journey-track{display:flex;flex-direction:column;position:relative}
        .journey-track::before{content:'';position:absolute;left:28px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--yellow),var(--orange),var(--purple),var(--blue));opacity:.3}
        .journey-step{display:flex;gap:24px;align-items:flex-start;padding:20px 0;border-bottom:1px solid var(--border)}
        .journey-step:last-child{border-bottom:none}
        .j-icon{width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;border:2px solid var(--border);background:var(--card);position:relative;z-index:1;transition:transform .2s}
        .journey-step:hover .j-icon{transform:scale(1.1)}
        .j-body h3{font-family:'Fredoka One',cursive;font-size:1.2rem;color:var(--text);margin-bottom:4px}
        .j-body p{font-size:.9rem;color:var(--muted);line-height:1.6}
        .j-tag{display:inline-block;font-size:.7rem;font-weight:800;padding:2px 10px;border-radius:99px;margin-top:6px}

        /* BIZ GRID */
        .biz-section{background:var(--bg2)}
        .biz-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}
        .biz-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px 10px;text-align:center;transition:transform .2s,border-color .2s,background .2s}
        .biz-card:hover{transform:translateY(-5px);border-color:rgba(255,225,53,.25);background:#221E38}
        .biz-card .be{font-size:2rem;display:block;margin-bottom:8px}
        .biz-card .bn{font-family:'Fredoka One',cursive;font-size:.8rem;color:var(--text);display:block}
        .biz-card .bt{font-size:.65rem;color:var(--muted);margin-top:3px;display:block}
        .biz-end{background:linear-gradient(135deg,#2A1040,#1A2A40)!important;border-color:rgba(155,93,229,.3)!important}

        /* FEATURES */
        .features-section{background:var(--bg)}
        .feat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
        .feat{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:28px;transition:transform .2s,border-color .2s}
        .feat:hover{transform:translateY(-4px);border-color:rgba(255,225,53,.15)}
        .feat-icon{font-size:2.4rem;margin-bottom:14px;display:block}
        .feat h3{font-family:'Fredoka One',cursive;font-size:1.15rem;color:var(--yellow);margin-bottom:8px}
        .feat p{font-size:.9rem;color:var(--muted);line-height:1.65}

        /* CLOUD */
        .cloud-section{background:linear-gradient(135deg,#1A1040 0%,#0F1A2A 50%,#1A1040 100%);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .cloud-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:36px;max-width:640px;margin-left:auto;margin-right:auto}
        .cloud-card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:28px 20px;text-align:center}
        .cloud-card.featured{border-color:rgba(91,200,245,.3);background:rgba(91,200,245,.05)}
        .cloud-card-icon{font-size:2.5rem;margin-bottom:12px;display:block}
        .cloud-card h3{font-family:'Fredoka One',cursive;font-size:1.1rem;color:var(--text);margin-bottom:8px}
        .cloud-card p{font-size:.85rem;color:var(--muted);line-height:1.6}
        .cloud-badge{display:inline-block;margin-top:10px;font-size:.7rem;font-weight:800;padding:3px 12px;border-radius:99px;background:rgba(91,200,245,.15);color:var(--blue);border:1px solid rgba(91,200,245,.25)}

        /* CTA */
        .cta-section{background:var(--bg);text-align:center;padding:100px 24px;position:relative;overflow:hidden}
        .cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(255,225,53,.07) 0%,transparent 60%)}
        .cta-emoji{font-size:5rem;display:block;margin-bottom:20px;animation:float 3s ease-in-out infinite}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .cta-section h2{font-family:'Fredoka One',cursive;font-size:clamp(2rem,6vw,3.5rem);color:var(--yellow);margin-bottom:12px;position:relative}
        .cta-section p{color:var(--muted);font-size:1rem;margin-bottom:32px;position:relative}

        /* FOOTER */
        footer{background:var(--bg2);border-top:1px solid var(--border);padding:40px 24px}
        .footer-inner{max-width:1000px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px;text-align:center}
        .footer-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
        .footer-logo-text{font-family:'Fredoka One',cursive;font-size:1.2rem;color:var(--yellow)}
        .footer-links{display:flex;gap:24px;flex-wrap:wrap;justify-content:center}
        .footer-links a{color:var(--muted);text-decoration:none;font-size:.85rem;font-weight:700;transition:color .2s}
        .footer-links a:hover{color:var(--yellow)}
        .footer-copy{color:var(--muted);font-size:.8rem}

        @media(max-width:600px){
          .cloud-cards{grid-template-columns:1fr}
          .stat-item{padding:20px 16px}
          .nav-link{display:none}
          .journey-track::before{left:22px}
          .j-icon{width:46px;height:46px;font-size:1.3rem}
        }
      `}</style>

      {/* NAV */}
      <nav>
        <a href="/" className="nav-logo">
          <span style={{fontSize:'1.8rem'}}>🏘️</span>
          <span className="nav-logo-text">Imperio del Barrio</span>
        </a>
        <div className="nav-links">
          <a href="#negocios" className="nav-link">Negocios</a>
          <a href="#como-jugar" className="nav-link">¿Cómo jugar?</a>
          <a href="/game/acerca.html" className="nav-link">Acerca</a>
          <a href="/game/imperio-del-barrio-v8.html" className="nav-cta">🎮 Jugar gratis</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge"><span className="badge-dot"></span>Juego Idle Dominicano 🇩🇴</div>
          <h1>
            <span className="h1-line1">Imperio</span>
            <span className="h1-line2">del Barrio</span>
          </h1>
          <div className="hero-tagline">De barbería a banco central 💰</div>
          <p className="hero-desc">El barrio te enseñó a levantarte cuando nadie creía en ti. Hoy empiezas con $500 y una barbería. El Imperio lo construyes tú. 🔥</p>
          <div className="hero-btns">
            <a href="/game/imperio-del-barrio-v8.html" className="btn-primary">🚀 Jugar gratis ahora</a>
            <a href="#negocios" className="btn-secondary">Ver negocios ↓</a>
          </div>
          <div className="biz-float">
            {['💈 Barbería','🏪 Colmado','☕ Cafetín','🏦 Banco','🛫 Aerolínea','🏝️ Isla Privada','+ 15 más...'].map(b => (
              <div key={b} className="biz-pill">{b}</div>
            ))}
          </div>
        </div>
        <div className="scroll-hint"><span>Descubre más</span><div className="scroll-arrow"></div></div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[['21','Negocios'],['7','Etapas sociales'],['4','Mini juegos'],['100%','Gratis'],['☁️','Guardado en nube']].map(([n,l]) => (
          <div key={l} className="stat-item"><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
        ))}
      </div>

      {/* JOURNEY */}
      <section className="journey-section">
        <div className="section-inner">
          <div className="section-badge">Tu Historia</div>
          <h2 className="section-title">De cero a <span>Imperio</span></h2>
          <p className="section-sub">Cada etapa se siente diferente. Cada ascenso tiene su recompensa.</p>
          <div className="journey-track">
            {[
              {icon:'🏚️', title:'El Comienzo', desc:'Una barbería, $500 y las ganas de probar que puedes. El barrio te mira.', tag:'Nivel 1 — El Barrio', color:'rgba(255,225,53,.1)', textColor:'var(--yellow)'},
              {icon:'🏠', title:'Casa Propia', desc:'Tu primer logro real. Una casa tuya, ganada con sudor y negocios.', tag:'+10% ingresos globales', color:'rgba(45,198,83,.1)', textColor:'var(--green)'},
              {icon:'🏖️', title:'Villa con Piscina', desc:'Ya no eres del barrio — eres el dueño. Los eventos VIP te abren las puertas.', tag:'+35% ingresos', color:'rgba(91,200,245,.1)', textColor:'var(--blue)'},
              {icon:'🛩️', title:'Jet Privado', desc:'Negocias desde el cielo. El barrio ya no te alcanza la vista desde arriba.', tag:'+75% ingresos', color:'rgba(155,93,229,.1)', textColor:'var(--purple)'},
              {icon:'🌎', title:'Corporación Global', desc:'Tu nombre ya no es solo del barrio — es de todo el mundo. El Imperio es completo.', tag:'+100% ingresos 👑', color:'rgba(255,215,0,.1)', textColor:'#FFD700'},
            ].map(s => (
              <div key={s.title} className="journey-step">
                <div className="j-icon">{s.icon}</div>
                <div className="j-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="j-tag" style={{background:s.color, color:s.textColor}}>{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESSES */}
      <section className="biz-section" id="negocios">
        <div className="section-inner">
          <div className="section-badge">21 Negocios</div>
          <h2 className="section-title">Construye tu <span>Imperio</span></h2>
          <p className="section-sub">Cada negocio tiene su propia animación interactiva con clientes, mejoras y efectos visuales.</p>
          <div className="biz-grid">
            {[
              ['💈','Barbería','Inicio'],['🏪','Colmado','Comercio'],['💇','Salón','Belleza'],
              ['🛵','Mototaxi','Transporte'],['☕','Cafetín','Gastronomía'],['🔧','Taller','Mecánica'],
              ['💊','Farmacia','Salud'],['💪','Gym','Fitness'],['🍽️','Restaurante','Comida'],
              ['🚗','Lavado','Autos'],['🏗️','Ferretería','Construcción'],['🎵','Discoteca','Nocturno'],
              ['🍻','Bar VIP','Premium'],['🛒','Supermercado','Retail'],['🏨','Hotel & Spa','Turismo'],
              ['🏬','Plaza','Inmobiliaria'],['🏦','Banco','Finanzas'],['🏛️','Banco Central','Finanzas'],
              ['🪙','Crypto','Digital'],['🛫','Aerolínea','Aviación'],['🏝️','Isla Privada','👑 Endgame'],
            ].map(([e,n,t], i) => (
              <div key={n} className={`biz-card${i===20?' biz-end':''}`}>
                <span className="be">{e}</span>
                <span className="bn">{n}</span>
                <span className="bt">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="como-jugar">
        <div className="section-inner">
          <div className="section-badge">Características</div>
          <h2 className="section-title">Todo lo que <span>necesitas</span></h2>
          <p className="section-sub">Un juego completo, directo en tu navegador. Sin descargas ni registro.</p>
          <div className="feat-grid">
            {[
              ['🎨','Animaciones únicas','Cada negocio tiene su propia animación canvas con clientes en tiempo real y efectos visuales.'],
              ['🎮','4 Mini Juegos','Runner, memoria, catcher y snake integrados. Gana bonos extras y rompe la monotonía del idle.'],
              ['🔗','Sinergias','Combina negocios relacionados para activar multiplicadores especiales y estratégicos.'],
              ['🗺️','7 Zonas del Mapa','Expande desde el Barrio Centro hasta la Torre Empresarial. Más zona, más ingresos.'],
              ['⭐','Influencia Permanente','Asciende para ganar Influencia. Compra mejoras que sobreviven al prestige.'],
              ['📱','Mobile & Desktop','Diseñado para celular y computadora. Sin instalación, sin cuenta obligatoria.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="feat">
                <span className="feat-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOUD SAVE */}
      <section className="cloud-section">
        <div className="section-inner" style={{textAlign:'center'}}>
          <div className="section-badge">Guardado</div>
          <h2 className="section-title" style={{textAlign:'center'}}>Tu progreso, <span>siempre seguro</span></h2>
          <p className="section-sub" style={{margin:'0 auto',textAlign:'center'}}>Juega sin preocuparte por perder tu Imperio.</p>
          <div className="cloud-cards">
            <div className="cloud-card">
              <span className="cloud-card-icon">💾</span>
              <h3>Guardado Local</h3>
              <p>Tu progreso se guarda automáticamente en tu dispositivo. Sin cuenta requerida.</p>
            </div>
            <div className="cloud-card featured">
              <span className="cloud-card-icon">☁️</span>
              <h3>Guardado en la Nube</h3>
              <p>Crea una cuenta gratuita para sincronizar tu Imperio en todos tus dispositivos.</p>
              <span className="cloud-badge">✨ Opcional y gratis</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div style={{position:'relative',zIndex:1}}>
          <span className="cta-emoji">👑</span>
          <h2>¿Listo para dominar el barrio?</h2>
          <p>Gratis, sin registro, directo en tu navegador. Tu Imperio te espera.</p>
          <a href="/game/imperio-del-barrio-v8.html" className="btn-primary" style={{margin:'0 auto'}}>
            🚀 Empezar ahora — es gratis
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <a href="/" className="footer-logo">
            <span style={{fontSize:'1.6rem'}}>🏘️</span>
            <span className="footer-logo-text">Imperio del Barrio</span>
          </a>
          <div className="footer-links">
            <a href="/game/imperio-del-barrio-v8.html">🎮 Jugar</a>
            <a href="/game/acerca.html">Acerca del juego</a>
            <a href="/game/privacidad.html">Política de Privacidad</a>
            <a href="mailto:imperiodelbarrio@outlook.com">Contacto</a>
          </div>
          <p className="footer-copy">© 2026 Imperio del Barrio · Hecho con 🏘️ en la República Dominicana</p>
        </div>
      </footer>
    </>
  );
}