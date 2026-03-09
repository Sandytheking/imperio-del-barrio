(function(){
      var seq = [
        {id:'ip0', delay:300},
        {id:'ip1', delay:1200},
        {id:'ip2', delay:2400},
        {id:'ip3', delay:3400},
        {id:'id1', delay:4200},
        {id:'ip4', delay:4600},
        {id:'ip5', delay:5400},
        {id:'id2', delay:6400},
        {id:'ip6', delay:6800},
        {id:'ip7', delay:7600},
        {id:'ipBtn', delay:8600},
      ];
      seq.forEach(function(s){
        setTimeout(function(){
          var el = document.getElementById(s.id);
          if(el) el.classList.add('visible');
        }, s.delay);
      });
    })();
// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════
const LEVELS = [
  // ── Early game ───────────────────────────────────────────────────
  { name: 'Principiante',      xp: 1000      },  // Lv 1
  { name: 'Emprendedor',       xp: 2500      },  // Lv 2
  { name: 'Comerciante',       xp: 6000      },  // Lv 3
  { name: 'Tendero',           xp: 12000     },  // Lv 4
  { name: 'Empresario',        xp: 25000     },  // Lv 5
  // ── Mid game ─────────────────────────────────────────────────────
  { name: 'Emprendedor Pro',   xp: 50000     },  // Lv 6
  { name: 'Inversionista',     xp: 100000    },  // Lv 7
  { name: 'Magnate Junior',    xp: 200000    },  // Lv 8
  { name: 'Magnate',           xp: 400000    },  // Lv 9
  { name: 'Ejecutivo',         xp: 700000    },  // Lv 10
  // ── Late game ────────────────────────────────────────────────────
  { name: 'Director',          xp: 1200000   },  // Lv 11
  { name: 'CEO',               xp: 2000000   },  // Lv 12
  { name: 'Tycoon',            xp: 3500000   },  // Lv 13
  { name: 'Tycoon Elite',      xp: 6000000   },  // Lv 14
  { name: 'Oligarca',          xp: 10000000  },  // Lv 15
  // ── Endgame ──────────────────────────────────────────────────────
  { name: 'Plutócrata',        xp: 18000000  },  // Lv 16
  { name: 'Mogul',             xp: 30000000  },  // Lv 17
  { name: 'Visionario',        xp: 50000000  },  // Lv 18
  { name: 'Titán',             xp: 80000000  },  // Lv 19
  { name: 'Leyenda',           xp: 130000000 },  // Lv 20
  // ── Prestigio ────────────────────────────────────────────────────
  { name: 'Leyenda del Sur',   xp: 200000000 },  // Lv 21
  { name: 'Leyenda del Norte', xp: 320000000 },  // Lv 22
  { name: 'Leyenda Nacional',  xp: 500000000 },  // Lv 23
  { name: 'Ícono del Caribe',  xp: 800000000 },  // Lv 24
  { name: 'Barrio Boss',       xp: 1200000000},  // Lv 25
  // ── Legendario ───────────────────────────────────────────────────
  { name: 'Barrio Boss II',    xp: 2000000000},  // Lv 26
  { name: 'Barrio Boss III',   xp: 3500000000},  // Lv 27
  { name: 'El Fundador',       xp: 6000000000},  // Lv 28
  { name: 'El Patriarca',      xp:10000000000},  // Lv 29
  { name: 'Rey del Barrio 👑', xp: Infinity  },  // Lv 30 — techo final
];

const BUSINESSES = [
  { id: 'barberia',    name: 'Barbería Los Manos',       icon: '💈', color: '#FF6348', bg: '#FFF0EC',
    desc: 'Cortes clásicos del barrio',           baseCost: 50,          baseIncome: 0.02,    baseCycle: 4,  unlockLevel: 0 },
  { id: 'colmado',     name: 'Colmado Don Beto',          icon: '🏪', color: '#FFD200', bg: '#FFFCE0',
    desc: 'El alma del barrio 24/7',              baseCost: 300,         baseIncome: 0.06,    baseCycle: 6,  unlockLevel: 1 },
  { id: 'salon',       name: 'Salón Bella Imagen',        icon: '💇', color: '#FF4FAD', bg: '#FFF0F8',
    desc: 'Belleza dominicana de verdad',         baseCost: 1200,        baseIncome: 0.18,     baseCycle: 8,  unlockLevel: 2 },
  { id: 'motoconcho',  name: 'Mototaxi Express',          icon: '🛵', color: '#2DC653', bg: '#F0FFF4',
    desc: 'El transporte del pueblo',             baseCost: 4000,        baseIncome: 0.45,     baseCycle: 10, unlockLevel: 3 },
  { id: 'cafeteria',   name: 'Cafetín del Barrio',        icon: '☕', color: '#C47A3A', bg: '#FFF8F0',
    desc: 'Café, mangú y chistes locales',        baseCost: 8000,       baseIncome: 0.6,    baseCycle: 9,  unlockLevel: 3 },
  { id: 'taller',      name: 'Taller Mecánico El Gordo',  icon: '🔧', color: '#5BC8F5', bg: '#F0FAFF',
    desc: 'Los carros no mienten',                baseCost: 15000,       baseIncome: 1.8,    baseCycle: 15, unlockLevel: 4 },
  { id: 'farmacia',    name: 'Farmacia San Rafael',       icon: '💊', color: '#E74C3C', bg: '#FFF0EE',
    desc: 'Salud para el barrio entero',          baseCost: 25000,       baseIncome: 2.2,    baseCycle: 12, unlockLevel: 4 },
  { id: 'gym',         name: 'Gym Poder Total 💪',        icon: '💪', color: '#E74C3C', bg: '#FFF0EE',
    desc: 'Hierro, sudor y resultados',           baseCost: 40000,       baseIncome: 4.5,    baseCycle: 18, unlockLevel: 4 },
  { id: 'restaurante', name: 'Restaurante La Mamá',       icon: '🍽️', color: '#FF8C42', bg: '#FFF5EE',
    desc: 'Sancocho y sazón artesanal',           baseCost: 70000,      baseIncome: 7,    baseCycle: 20, unlockLevel: 5 },
  { id: 'lavado',      name: 'Lavado de Carros Shine',    icon: '🚗', color: '#3498DB', bg: '#EAF4FB',
    desc: 'Brillante como nuevo',                 baseCost: 150000,      baseIncome: 11,   baseCycle: 22, unlockLevel: 5 },
  { id: 'ferreteria',  name: 'Ferretería El Maestro',     icon: '🏗️', color: '#A8DADC', bg: '#F0FAFA',
    desc: "Todo pa' la construcción",             baseCost: 250000,      baseIncome: 19,   baseCycle: 25, unlockLevel: 6 },
  { id: 'discoteca',   name: 'Discoteca El Callejón',     icon: '🎵', color: '#B24BF3', bg: '#F5F0FF',
    desc: 'La mejor noche del barrio',            baseCost: 600000,     baseIncome: 30,   baseCycle: 28, unlockLevel: 6 },
  { id: 'bambu',       name: 'Bar El Bambú VIP',          icon: '🍻', color: '#9B5DE5', bg: '#F5F0FF',
    desc: 'Frío, música y negocios',              baseCost: 1000000,     baseIncome: 42,   baseCycle: 30, unlockLevel: 7 },
  { id: 'supermercado',name: 'Supermercado La Nacional',  icon: '🛒', color: '#00B4D8', bg: '#E8F8FF',
    desc: 'Suple a todo el vecindario',           baseCost: 2500000,     baseIncome: 60,  baseCycle: 35, unlockLevel: 7 },
  { id: 'hotelito',    name: 'Hotel & Spa Coral',         icon: '🏨', color: '#F4A261', bg: '#FFF8F0',
    desc: 'Turismo de lujo en el barrio',         baseCost: 6000000,    baseIncome: 95,  baseCycle: 40, unlockLevel: 8 },
  { id: 'plaza',       name: 'Plaza Comercial Imperio',   icon: '🏬', color: '#2DC653', bg: '#F0FFF4',
    desc: 'Tu propio mini-mall',                  baseCost: 18000000,    baseIncome: 150, baseCycle: 50, unlockLevel: 9 },
  { id: 'banco',       name: 'Banco del Barrio',          icon: '🏦', color: '#FFD700', bg: '#FFFBDE',
    desc: '💰 El dinero trabaja para ti',         baseCost: 50000000,   baseIncome: 230, baseCycle: 60, unlockLevel: 10 },
  { id: 'banco_central',name:'Banco Central Imperio',     icon: '🏛️', color: '#C9A200', bg: '#FFFDE0',
    desc: '👑 El pináculo financiero',            baseCost: 200000000,   baseIncome: 420,baseCycle: 90, unlockLevel: 12 },
  // ── Late game / Endgame ────────────────────────────────────────────
  { id: 'crypto',      name: 'Exchange de Cripto 🪙',     icon: '🪙', color: '#F7931A', bg: '#FFF8EE',
    desc: '💹 El futuro del dinero',              baseCost: 800000000,  baseIncome: 660,baseCycle: 120,unlockLevel: 18 },
  { id: 'aereolinea',  name: 'Aerolínea Imperio ✈️',      icon: '🛫', color: '#0077B6', bg: '#E8F4FF',
    desc: '🌎 Vuelos nacionales e internacionales',baseCost: 3000000000, baseIncome:1150,baseCycle: 180,unlockLevel: 22 },
  { id: 'isla',        name: 'Isla Privada 🏝️',           icon: '🏝️', color: '#00B4A0', bg: '#E8FFFC',
    desc: '👑 Tu propio paraíso caribeño',        baseCost:15000000000,  baseIncome:2200,baseCycle:300,unlockLevel: 26 },
];

// ═══════════════════════════════════════════════
// SINERGIAS ENTRE NEGOCIOS
// ═══════════════════════════════════════════════
// Cada sinergia da un bono de income cuando ambos negocios están activos
const BUSINESS_SYNERGIES = [
  { ids: ['taller', 'lavado'],        mult: 1.20, name: '🔧🚗 Combo Automotriz',      desc: '+20% Taller & Lavado' },
  { ids: ['barberia', 'salon'],       mult: 1.25, name: '💈💇 Combo Belleza',          desc: '+25% Barbería & Salón' },
  { ids: ['cafeteria', 'restaurante'],mult: 1.30, name: '☕🍽️ Combo Gastronomía',     desc: '+30% Cafetín & Restaurante' },
  { ids: ['discoteca', 'bambu'],      mult: 1.35, name: '🎵🍻 Combo Nocturno',         desc: '+35% Discoteca & Bambú' },
  { ids: ['banco', 'banco_central'],  mult: 1.50, name: '🏦🏛️ Combo Financiero',      desc: '+50% Banco & Banco Central' },
  { ids: ['gym', 'farmacia'],         mult: 1.20, name: '💪💊 Combo Salud',            desc: '+20% Gym & Farmacia' },
  { ids: ['supermercado', 'plaza'],   mult: 1.40, name: '🛒🏬 Combo Retail',           desc: '+40% Supermercado & Plaza' },
  { ids: ['hotelito', 'aereolinea'],  mult: 1.45, name: '🏨🛫 Combo Turismo',          desc: '+45% Hotel & Aerolínea' },
  { ids: ['crypto', 'banco'],         mult: 1.35, name: '🪙🏦 Combo Fintech',          desc: '+35% Crypto & Banco' },
  { ids: ['isla', 'hotelito'],        mult: 1.60, name: '🏝️🏨 Combo Paraíso',         desc: '+60% Isla & Hotel' },
  // Triple sinergia — todos los negocios de comida
  { ids: ['colmado', 'cafeteria', 'restaurante'], mult: 1.50, name: '🏪☕🍽️ Imperio Gastronómico', desc: '+50% Colmado, Cafetín & Restaurante' },
];

const UPGRADES = [
  // ── Por negocio ──────────────────────────────────────────────────
  { id: 'letrero',    name: 'Letrero LED 💡',          icon: '💡', bg: '#FFF3CD',
    desc: 'x2 ingresos barbería',               cost: 150,        mult: 2,   target: 'barberia' },
  { id: 'nevera',     name: 'Nevera Nueva ❄️',          icon: '❄️', bg: '#D1ECF1',
    desc: 'x2 ventas del colmado',              cost: 800,       mult: 2,   target: 'colmado' },
  { id: 'instagram',  name: 'Instagram 📸',             icon: '📸', bg: '#F8D7DA',
    desc: 'x2 clientes del salón',             cost: 2500,      mult: 2,   target: 'salon' },
  { id: 'casco',      name: 'Cascos Premium 🪖',         icon: '🪖', bg: '#D4EDDA',
    desc: 'x2 ingresos mototaxi',              cost: 8000,      mult: 2,   target: 'motoconcho' },
  { id: 'maquinacafe',name: 'Máquina Espresso ☕',       icon: '☕', bg: '#FFF0DC',
    desc: 'x2.5 ingresos cafetín',             cost: 5000,      mult: 2.5, target: 'cafeteria' },
  { id: 'herramientas',name:'Herramientas Pro 🔩',       icon: '🔩', bg: '#E8F4FD',
    desc: 'x2 ingresos taller',                cost: 12000,     mult: 2,   target: 'taller' },
  { id: 'seguro',     name: 'Seguro Médico 🩺',          icon: '🩺', bg: '#FDECEA',
    desc: 'x2.5 ingresos farmacia',            cost: 18000,     mult: 2.5, target: 'farmacia' },
  { id: 'saunagym',   name: 'Sauna & Jacuzzi 🛁',        icon: '🛁', bg: '#FFE5E5',
    desc: 'x2 ingresos gym',                   cost: 25000,     mult: 2,   target: 'gym' },
  { id: 'franquicia', name: 'Franquicia 📋',             icon: '📋', bg: '#FFF0EC',
    desc: 'x1.5 restaurante',                  cost: 60000,     mult: 1.5, target: 'restaurante' },
  { id: 'robotlavado',name: 'Lavado Robótico 🤖',        icon: '🤖', bg: '#E8F4FD',
    desc: 'x2 ingresos lavado',                cost: 80000,    mult: 2,   target: 'lavado' },
  { id: 'almacen',    name: 'Almacén Ferretero 📦',      icon: '📦', bg: '#E8F8FF',
    desc: 'x2 ingresos ferretería',            cost: 120000,    mult: 2,   target: 'ferreteria' },
  { id: 'djresidente',name: 'DJ Residente 🎧',           icon: '🎧', bg: '#F0E8FF',
    desc: 'x3 discoteca los fines de semana',  cost: 200000,    mult: 3,   target: 'discoteca' },
  { id: 'bartop',     name: 'Bar Top-Shelf 🍾',          icon: '🍾', bg: '#F5F0FF',
    desc: 'x2 Bar El Bambú',                   cost: 280000,    mult: 2,   target: 'bambu' },
  { id: 'selfcheckout',name:'Auto-Caja 🛒',              icon: '🛒', bg: '#E0F8FF',
    desc: 'x2 supermercado',                   cost: 500000,   mult: 2,   target: 'supermercado' },
  { id: 'spa5stars',  name: 'Spa 5 Estrellas ⭐',        icon: '⭐', bg: '#FFF5E0',
    desc: 'x2.5 hotel',                        cost: 900000,   mult: 2.5, target: 'hotelito' },
  { id: 'anchor',     name: 'Tienda Ancla 🏬',           icon: '🏬', bg: '#F0FFF4',
    desc: 'x2 plaza comercial',                cost: 2000000,   mult: 2,   target: 'plaza' },
  { id: 'intereses',  name: 'Tasas de Interés 📊',       icon: '📊', bg: '#FFFBDE',
    desc: 'x2 Banco del Barrio',               cost: 5000000,  mult: 2,   target: 'banco' },
  { id: 'bancocent2', name: 'Reserva Federal 🏛️',        icon: '🏛️', bg: '#FFF9D0',
    desc: 'x2 Banco Central',                  cost: 12000000,  mult: 2,   target: 'banco_central' },

  // ── Globales ──────────────────────────────────────────────────────
  { id: 'wifi',       name: 'WiFi del Barrio 📶',        icon: '📶', bg: '#E2D9F3',
    desc: 'Todos los negocios x1.5',           cost: 15000,     mult: 1.5, target: 'all' },
  { id: 'offlineBoost',name:'Modo 24/7 🌙',              icon: '🌙', bg: '#F0E8FF',
    desc: '100% offline earnings',             cost: 60000,    mult: 1,   target: 'none' },
  { id: 'marca',      name: 'Tu Propia Marca 👑',        icon: '👑', bg: '#FFF3CD',
    desc: 'Todo el barrio x1.5',               cost: 120000,    mult: 1.5, target: 'all' },
  { id: 'empire',     name: 'Imperio Total 🌟',          icon: '🌟', bg: '#F5F0FF',
    desc: 'Multiplicador x2 a TODO',           cost: 500000,    mult: 2,   target: 'all' },
  { id: 'corporate',  name: 'Corporación S.A. 💼',       icon: '💼', bg: '#E8F4FD',
    desc: 'Todo el Imperio x2.5',              cost: 50000000,   mult: 2.5, target: 'all' },
  { id: 'oligarca',   name: 'Oligarca del Barrio 🛩️',   icon: '🛩️', bg: '#FFF3CD',
    desc: 'Todos los negocios x3',             cost: 300000000,  mult: 3,   target: 'all' },
  { id: 'megaempire', name: 'Mega Imperio 👑',           icon: '🌐', bg: '#F0FFF4',
    desc: 'El Imperio completo x5',            cost: 1000000000, mult: 5,   target: 'all' },
  // ── Upgrades nivel 2 por negocio (Nv.15+) ────────────────────────
  { id: 'barberia2',    name: 'Franquicia de Barbería ✂️',  icon: '✂️', bg: '#FFE0DA',
    desc: 'Barbería x3 (requiere Nv.15)',      cost: 5000000,    mult: 3,   target: 'barberia',   minBizLevel: 15 },
  { id: 'colmado2',     name: 'Cadena de Colmados 🏪',      icon: '🏪', bg: '#FFF8CC',
    desc: 'Colmado x3',                        cost: 8000000,    mult: 3,   target: 'colmado',    minBizLevel: 15 },
  { id: 'salon2',       name: 'Spa de Lujo 💅',             icon: '💅', bg: '#FFE0F5',
    desc: 'Salón x3',                          cost: 15000000,   mult: 3,   target: 'salon',      minBizLevel: 15 },
  { id: 'motoconcho2',  name: 'Flota de Motos 🏍️',         icon: '🏍️', bg: '#E0FFE8',
    desc: 'Mototaxi x3',                       cost: 20000000,   mult: 3,   target: 'motoconcho', minBizLevel: 15 },
  { id: 'cafeteria2',   name: 'Cadena de Cafetines ☕',     icon: '☕', bg: '#FFF0DC',
    desc: 'Cafetín x3.5',                      cost: 25000000,   mult: 3.5, target: 'cafeteria',  minBizLevel: 15 },
  { id: 'taller2',      name: 'Concesionario 🚘',           icon: '🚘', bg: '#DCF0FF',
    desc: 'Taller x3',                         cost: 30000000,   mult: 3,   target: 'taller',     minBizLevel: 15 },
  { id: 'farmacia2',    name: 'Clínica Privada 🏥',         icon: '🏥', bg: '#FFE0DE',
    desc: 'Farmacia x3.5',                     cost: 40000000,   mult: 3.5, target: 'farmacia',   minBizLevel: 15 },
  { id: 'gym2',         name: 'Cadena de Gyms 🏋️',         icon: '🏋️', bg: '#FFE0E0',
    desc: 'Gym x3',                            cost: 50000000,   mult: 3,   target: 'gym',        minBizLevel: 15 },
  { id: 'restaurante2', name: 'Restaurante 5 Estrellas 🌟', icon: '🌟', bg: '#FFF0E0',
    desc: 'Restaurante x3',                    cost: 80000000,   mult: 3,   target: 'restaurante',minBizLevel: 15 },
  { id: 'lavado2',      name: 'Lavado Premium 🚙',          icon: '🚙', bg: '#DCECFF',
    desc: 'Lavado x3',                         cost: 100000000,  mult: 3,   target: 'lavado',     minBizLevel: 15 },
  { id: 'ferreteria2',  name: 'Constructora 🏗️',           icon: '🏗️', bg: '#DCFCF8',
    desc: 'Ferretería x3',                     cost: 150000000,  mult: 3,   target: 'ferreteria', minBizLevel: 15 },
  { id: 'discoteca2',   name: 'Club VIP Exclusivo 🥂',      icon: '🥂', bg: '#EEE0FF',
    desc: 'Discoteca x4',                      cost: 200000000,  mult: 4,   target: 'discoteca',  minBizLevel: 15 },
  { id: 'bambu2',       name: 'Lounge Rooftop 🌃',          icon: '🌃', bg: '#F0E8FF',
    desc: 'Bar Bambú x3',                      cost: 250000000,  mult: 3,   target: 'bambu',      minBizLevel: 15 },
  { id: 'supermercado2',name: 'Hipermercado 🛍️',           icon: '🛍️', bg: '#DCF8FF',
    desc: 'Supermercado x3',                   cost: 400000000,  mult: 3,   target: 'supermercado',minBizLevel: 15 },
  { id: 'hotelito2',    name: 'Resort All-Inclusive 🏖️',   icon: '🏖️', bg: '#FFF5DC',
    desc: 'Hotel x4',                          cost: 600000000,  mult: 4,   target: 'hotelito',   minBizLevel: 15 },
  { id: 'plaza2',       name: 'Mega Mall Internacional 🌐', icon: '🌐', bg: '#DCFFE0',
    desc: 'Plaza x3',                          cost: 1000000000, mult: 3,   target: 'plaza',      minBizLevel: 15 },
  { id: 'banco2',       name: 'Banco Internacional 💳',     icon: '💳', bg: '#FFFADC',
    desc: 'Banco x3',                          cost: 2000000000, mult: 3,   target: 'banco',      minBizLevel: 15 },
  { id: 'banco_central2',name:'Reserva Mundial 🌍',         icon: '🌍', bg: '#FFFFE0',
    desc: 'Banco Central x4',                  cost: 5000000000, mult: 4,   target: 'banco_central',minBizLevel: 15 },
];

const ZONES = [
  { id: 'centro',     name: 'Barrio Centro',      icon: '🏘️', mult: 1.0,  cost: 0,           minLevel: 0  },
  { id: 'sur',        name: 'Zona Sur',            icon: '🌴', mult: 1.2,  cost: 3000,        minLevel: 2  },
  { id: 'norte',      name: 'Zona Norte',          icon: '🏙️', mult: 1.4,  cost: 5000,        minLevel: 3  },
  { id: 'este',       name: 'Zona Este',           icon: '🏭', mult: 1.6,  cost: 20000,       minLevel: 5  },
  { id: 'aeropuerto', name: 'Aeropuerto',          icon: '✈️', mult: 2.0,  cost: 500000,      minLevel: 7  },
  { id: 'premium',    name: 'Zona Premium',        icon: '💎', mult: 2.5,  cost: 1000000,     minLevel: 15 },
  { id: 'torre',      name: 'Torre Empresarial',   icon: '🌆', mult: 3.5,  cost: 50000000,    minLevel: 22 },
];

const EVENTS = [
  { icon: '🎄', title: '¡Navidad!', desc: 'Ventas x3 en restaurante', mult: 3, target: 'restaurante', duration: 120 },
  { icon: '💖', title: 'Día de las Madres', desc: 'Salón genera el doble', mult: 2, target: 'salon', duration: 90 },
  { icon: '🔥', title: 'Fin de Semana', desc: 'Todo el barrio x2', mult: 2, target: 'all', duration: 60 },
  { icon: '⚽', title: 'Clásico Dominicano', desc: 'Bar El Bambú x4', mult: 4, target: 'bambu', duration: 45 },
  { icon: '🎓', title: 'Vuelta a Clases', desc: 'Colmado x2.5', mult: 2.5, target: 'colmado', duration: 60 },
  { icon: '⚡', title: 'Flash Sale', desc: '¡Todo el barrio x3 por 30 segundos!', mult: 3, target: 'all', duration: 30 },
  { icon: '🕵️', title: 'Visita del Inspector', desc: '¡Solo los mejores negocios producen!', mult: 0, target: 'none', duration: 45, special: 'inspector' },
  { icon: '💡', title: 'Apagón Eléctrico', desc: 'La mitad de los negocios están apagados', mult: 0.5, target: 'all', duration: 60, special: 'blackout' },
  { icon: '🎪', title: 'Festival del Barrio', desc: '¡Todos los negocios x2.5!', mult: 2.5, target: 'all', duration: 90 },
  { icon: '🌧️', title: 'Lluvia Torrencial', desc: 'Menos clientes afuera, x0.7 general', mult: 0.7, target: 'all', duration: 60 },
];

// ═══════════════════════════════════════════════
// BIZ ANIMATIONS MAP
// ═══════════════════════════════════════════════
const STAGE_ANIMATIONS = {
  0: 'el_comienzo.html',
  1: 'casa_propia.html',
  2: 'casa_moderna.html',
  3: 'villa.html',
  4: 'penthouse.html',
  5: 'jet_privado.html',
  6: 'corporacion.html',
};

const BIZ_ANIMATIONS = {
  barberia:     'barberia-ultra.html',
  salon:        'salon-bella-imagen.html',
  colmado:      'colmado.html',
  motoconcho:   'motoconcho.html',
  cafeteria:    'cafeteria.html',
  taller:       'taller.html',
  farmacia:     'farmacia.html',
  gym:          'gym.html',
  restaurante:  'restaurante.html',
  lavado:       'lavado.html',
  ferreteria:   'ferreteria.html',
  discoteca:    'discoteca.html',
  bambu:        'bambu.html',
  supermercado: 'supermercado.html',
  hotelito:     'hotelito.html',
  plaza:        'plaza.html',
  banco:        'banco.html',
  banco_central:'banco_central.html',
  crypto:       'crypto.html',
  aereolinea:   'aereolinea.html',
  isla:         'isla.html',
};

// ═══════════════════════════════════════════════
// NARRATIVE STORIES PER LEVEL
// ═══════════════════════════════════════════════
const LEVEL_STORIES = [
  '🏘️ Comenzaste con una barbería y $500. El barrio te observa...',
  '💡 La gente habla de ti. Tu local tiene vida. ¡Sigue creciendo!',
  '📰 El periódico del barrio escribió sobre ti. ¡Eres noticia!',
  '🤝 Empresarios de otras zonas quieren hacer negocios contigo.',
  '🏆 Tu nombre resuena en la ciudad. Cinco negocios en pie.',
  '💎 Las zonas premium te abren la puerta. La élite te llama.',
  '🌎 Tu Imperio trasciende el barrio. Eres leyenda en la región.',
  '👑 Lv 8: Tu primer Ascenso Social está al alcance.',
  '🚀 Lv 9: Los inversionistas te buscan. El banco pronto es tuyo.',
  '🏦 Lv 10: CEO del barrio. El Banco del Barrio te espera.',
  '📊 Lv 11: Director de tu propio imperio corporativo.',
  '🏢 Lv 12: La Plaza Comercial está en tus planes.',
  '💼 Lv 13: Tycoon — tu nombre cotiza en la bolsa del barrio.',
  '🛩️ Lv 14: Tycoon Elite — el Jet Privado ya no es un sueño.',
  '💰 Lv 15: Oligarca — el Banco Central Imperio te espera.',
  '🌍 Lv 16: Plutócrata — tu riqueza ya se mide en billones.',
  '🏛️ Lv 17: Mogul — los gobiernos te consultan.',
  '🔭 Lv 18: Visionario — tu visión remodela el barrio entero.',
  '⚡ Lv 19: Titán — nada en este barrio es inalcanzable.',
  '🌟 Lv 20: ¡Leyenda! El Ascenso a Corporación Global se acerca.',
  '🏅 Lv 21: Leyenda del Sur — mitad del camino al pináculo.',
  '🌐 Lv 22: Leyenda del Norte — tu influencia no tiene fronteras.',
  '🇩🇴 Lv 23: Leyenda Nacional — toda la República te conoce.',
  '🌴 Lv 24: Ícono del Caribe — tu legado trasciende fronteras.',
  '👑 Lv 25: Barrio Boss — el título máximo del barrio es tuyo.',
  '💫 Lv 26: Barrio Boss II — los récords ya no existen para ti.',
  '🔥 Lv 27: Barrio Boss III — tu legado es eterno.',
  '🏗️ Lv 28: El Fundador — construiste algo que durará generaciones.',
  '🫅 Lv 29: El Patriarca — el barrio lleva tu apellido.',
  '🌈 Lv 30: REY DEL BARRIO. La historia del Imperio está completa.',
];

// ═══════════════════════════════════════════════
// DAILY OBJECTIVES TEMPLATES — escalables por nivel
// ═══════════════════════════════════════════════
// Se llama en runtime (no en carga), así que G, fmt y totalIPS ya existen
function getScaledObjectives() {
  const lvl      = (G.level || 0) + 1;
  const ips      = totalIPS();
  const t1       = Math.max(50000,    Math.round(ips * 300  / 1000)  * 1000);
  const t2       = Math.max(200000,   Math.round(ips * 1200 / 1000)  * 1000);
  const t3       = Math.max(1000000,  Math.round(ips * 6000 / 10000) * 10000);
  const bizGoal  = Math.min(BUSINESSES.length, Math.max(3, Math.floor(lvl / 2) + 2));
  const lvlGoal  = Math.min(30, lvl + 2);
  const negoGoal = Math.max(3, Math.min(10, Math.floor(lvl / 3) + 2));
  const blGoal   = Math.max(3, Math.min(20, Math.floor(lvl / 2) + 2));

  const all = [
    { id:'earn_s1',    desc:'Gana ' + fmt(t1) + ' hoy',
      reward: Math.max(3, Math.floor(lvl/3)+2),
      target: g => (g.dailyEarned||0) >= t1,
      max: g => t1,      prog: g => Math.min(g.dailyEarned||0, t1) },
    { id:'earn_s2',    desc:'Gana ' + fmt(t2) + ' hoy',
      reward: Math.max(6, Math.floor(lvl/2)+3),
      target: g => (g.dailyEarned||0) >= t2,
      max: g => t2,      prog: g => Math.min(g.dailyEarned||0, t2) },
    { id:'earn_s3',    desc:'Acumula ' + fmt(t3) + ' hoy',
      reward: Math.max(12, lvl),
      target: g => (g.dailyEarned||0) >= t3,
      max: g => t3,      prog: g => Math.min(g.dailyEarned||0, t3) },
    { id:'nego_s',     desc:'Juega ' + negoGoal + ' mini-juegos',
      reward: Math.max(2, Math.floor(negoGoal/2)+1),
      target: g => (g.dailyNegotiations||0) >= negoGoal,
      max: g => negoGoal, prog: g => Math.min(g.dailyNegotiations||0, negoGoal) },
    { id:'biz_s',      desc:'Ten ' + bizGoal + ' negocios activos',
      reward: Math.max(3, Math.floor(bizGoal/2)),
      target: g => Object.values(g.businesses||{}).filter(b=>b.level>0).length >= bizGoal,
      max: g => bizGoal,
      prog: g => Math.min(Object.values(g.businesses||{}).filter(b=>b.level>0).length, bizGoal) },
    { id:'lvl_s',      desc:'Llega al Nivel ' + lvlGoal,
      reward: Math.max(5, lvlGoal - lvl + 3),
      target: g => (g.level+1) >= lvlGoal,
      max: g => lvlGoal,  prog: g => Math.min(g.level+1, lvlGoal) },
    { id:'bizlvl_s',   desc:'Mejora un negocio a Nv.' + blGoal,
      reward: Math.max(4, Math.floor(blGoal/3)+2),
      target: g => Object.values(g.businesses||{}).some(b => b.level >= blGoal),
      max: g => blGoal,
      prog: g => Math.max(0, ...Object.values(g.businesses||{}).map(b => b.level||0)) },
    { id:'upgrades_s', desc:'Compra 2 mejoras hoy',
      reward: 4,
      target: g => (g.dailyUpgradesBought||0) >= 2,
      max: g => 2,        prog: g => Math.min(g.dailyUpgradesBought||0, 2) },
  ];

  // Selecciona 3 usando seed diario, sin repetir
  const seed = G.dailyObjSeed || Date.now();
  const picked = [];
  let s = Math.abs(Math.floor(seed / 1000));
  while (picked.length < 3 && picked.length < all.length) {
    const i = s % all.length;
    if (!picked.includes(i)) picked.push(i);
    s = Math.floor(s / all.length) + i * 7 + 3;
  }
  return picked.map(i => all[i]);
}
// Legacy alias — no se usa pero evita ReferenceError en código externo
const OBJ_TEMPLATES = [];

// ═══════════════════════════════════════════════
// GEM SHOP ITEMS
// ═══════════════════════════════════════════════
const GEM_ITEMS = [
  { id:'autoclicker', icon:'🤖', name:'Auto-Clicker Temporal', desc:'Click automático en negocios por 5 minutos', cost:5, action:'autoclicker' },
  { id:'boost2x', icon:'⚡', name:'Boost x2 Offline', desc:'Duplica ganancias offline por 1 hora', cost:8, action:'offlineboost' },
  { id:'skipcd', icon:'⏩', name:'Skip de Cooldown', desc:'Resetea cooldown de todos los negocios ahora', cost:3, action:'skipcd' },
  { id:'gemdouble', icon:'💎', name:'Multiplicador x2 (10min)', desc:'Duplica todos los ingresos por 10 minutos', cost:12, action:'doublemult' },
];

const ACHIEVEMENTS = [
  { id:'first_biz',   icon:'🌟', name:'Primer Negocio',       desc:'Abriste tu primer negocio',                reward:500,    check:()=>Object.values(G.businesses).filter(b=>b.level>0).length>=1 },
  { id:'biz5',        icon:'🏪', name:'5 Negocios',            desc:'5 negocios activos',                       reward:5000,   check:()=>Object.values(G.businesses).filter(b=>b.level>0).length>=5 },
  { id:'biz_all',     icon:'🏆', name:'Imperio Completo',      desc:'Todos los negocios abiertos',              reward:5000,  check:()=>Object.values(G.businesses).filter(b=>b.level>0).length>=BUSINESSES.length },
  { id:'money10k',    icon:'💰', name:'$10,000',               desc:'Acumulaste $10,000',                       reward:1000,   check:()=>G.totalEarned>=10000 },
  { id:'money100k',   icon:'💎', name:'$100,000',              desc:'Acumulaste $100,000',                      reward:10000,  check:()=>G.totalEarned>=100000 },
  { id:'money1m',     icon:'🤑', name:'¡Millonario!',          desc:'Acumulaste $1,000,000',                    reward:100000, check:()=>G.totalEarned>=1000000 },
  { id:'lvl3',        icon:'📈', name:'Comerciante',           desc:'Llegaste a Nivel 3',                       reward:3000,   check:()=>G.level>=2 },
  { id:'lvl5',        icon:'🚀', name:'Magnate',               desc:'Llegaste a Nivel 5',                       reward:20000,  check:()=>G.level>=4 },
  { id:'prestige1',   icon:'⭐', name:'Primer Prestigio',      desc:'Hiciste tu primer Prestigio',              reward:0,      check:()=>G.prestigeStars>=1 },
  { id:'zone_sur',    icon:'🌴', name:'Zona Turística',        desc:'Te mudaste a la Zona Sur',                 reward:5000,   check:()=>G.zoneHistory&&G.zoneHistory.includes('sur') },
  { id:'zone_prem',   icon:'💎', name:'Zona Premium',          desc:'Llegaste a la Zona Premium',               reward:50000,  check:()=>G.zoneHistory&&G.zoneHistory.includes('premium') },
  { id:'negotiate5',  icon:'🤝', name:'Negociador',            desc:'Negociaste 5 veces',                       reward:2000,   check:()=>G.negotiateCount>=5 },
  { id:'negotiate20', icon:'🦁', name:'Tiburón de Negocios',  desc:'Negociaste 20 veces',                      reward:10000,  check:()=>G.negotiateCount>=20 },
  { id:'daily7',      icon:'📅', name:'Semana Completa',       desc:'7 días seguidos de login',                 reward:15000,  check:()=>G.loginStreak>=7 },
  { id:'upgrade_all', icon:'⚡', name:'Mejoras Totales',       desc:'Compraste todas las mejoras',              reward:30000,  check:()=>UPGRADES.every(u=>G.upgrades[u.id]) },
  { id:'speed',       icon:'⚡', name:'Velocidad Máxima',      desc:'Un negocio a ciclo < 1s',                  reward:800,   check:()=>BUSINESSES.some(b=>bizLevel(b.id)>0&&bizCycle(b)<1.2) },
  { id:'event1',      icon:'🎉', name:'Evento Especial',       desc:'Participaste en un evento',                reward:3000,   check:()=>G.eventsParticipated>=1 },
  { id:'clientes500', icon:'👥', name:'500 Clientes',          desc:'Atendiste 500 clientes',                   reward:10000,  check:()=>totalClientes()>=500 },
];

// Leaderboard dinámico — rivales que escalan con el jugador
const LB_NAMES = [
  { name:'Juan Marte',      avatar:'🤵'    },
  { name:'Carmen Familia',  avatar:'👩‍💼' },
  { name:'Roberto Díaz',    avatar:'👨‍💼' },
  { name:'María Almonte',   avatar:'👩'    },
  { name:'Pedro Sánchez',   avatar:'👨'    },
  { name:'Ana García',      avatar:'👩‍🦱' },
  { name:'Luis Familia',    avatar:'🧑'    },
  { name:'Sofía Torres',    avatar:'👩‍🦰' },
];

function getDynamicLeaderboard() {
  const base = G.totalEarned || 1000;
  const inf   = G.influence  || 0;
  const lvl   = (G.level || 0) + 1;
  // Semilla estable por día (cambia cada 24h para dar sensación de "actividad")
  const daySeed = Math.floor(Date.now() / 86400000);

  return LB_NAMES.map((p, i) => {
    // Cada rival gana entre 60%–130% de lo que tú has ganado
    const rng = (Math.sin(daySeed * 9301 + i * 49297 + 233720923) + 1) / 2;
    const mult = 0.6 + rng * 0.7;
    const money = Math.floor(base * mult);
    const rivalInf = Math.max(0, inf - 1 + Math.floor(rng * 3));
    const bizCount = Math.max(1, Math.min(BUSINESSES.length,
      Math.floor(Object.values(G.businesses).filter(b=>b.level>0).length * (0.5 + rng * 0.8))));
    return { ...p, money, influence: rivalInf, negocios: bizCount,
             score: rivalInf * 1e9 + money };
  });
}

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
let G = {
  money: 0,
  totalEarned: 0,
  xp: 0,
  level: 0,
  prestigeStars: 0,
  prestigeMult: 1,
  // ASCENSO SOCIAL
  socialStage: 0,           // 0-6 (7 etapas)
  influence: 0,             // nuevo recurso
  totalInfluence: 0,        // influencia acumulada total
  influenceUpgrades: {},    // upgrades comprados con influencia
  businesses: {},
  upgrades: {},
  achievements: {},
  zone: 'centro',
  zoneHistory: ['centro'],
  lastSave: Date.now(),
  activeEvent: null,
  eventEnd: 0,
  // New fields
  gems: 0,
  dailyEarned: 0,
  dailyNegotiations: 0,
  lastDailyReset: 0,
  dailyObjClaimed: {},
  dailyObjSeed: 0,
  bizStats: {}, // { id: { totalEarned, cycles, bestHour } }
  gemBoostEnd: 0,
  autoClickerEnd: 0,
  offlineBoostEnd: 0,
  theme: 'gold',
  lastLogin: 0,
  loginStreak: 0,
  negotiateCount: 0,
  eventsParticipated: 0,
  soundOn: true,
  // v9 additions
  bizCustom: {},        // { bizId: { name, color, logo } }
  companyName: '',      // "Imperio Sandy Corp"
  shareCount: 0,
  lastShareTs: 0,
  weeklyReset: 0,
  weeklyEarned: 0,
  weeklyLevels: 0,
  weeklyNego: 0,
  weeklyNewBiz: 0,
  weeklyCycles: 0,
  weeklyObjClaimed: {},
  superEmpresaUnlocked: false,
};

// ── Cloud sync helpers ─────────────────────────────────────────
// The game runs inside an iframe. Save/load goes through the React
// parent (GameClient.tsx) which writes to Supabase via gameService.ts.
// localStorage is used as a fast local cache / offline fallback.

let _cloudSaveTimer = null;
function resetGame() {
  // Show confirmation modal before wiping progress
  const existing = document.getElementById('resetConfirmModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'resetConfirmModal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);padding:16px';
  modal.innerHTML = `
    <div style="background:#1a1a2e;border-radius:20px;border:2px solid #ff4444;padding:24px;max-width:380px;width:100%;text-align:center;box-shadow:0 0 60px rgba(255,68,68,0.2)">
      <div style="font-size:2.5rem;margin-bottom:8px">🗑️</div>
      <div style="font-family:'Fredoka One',cursive;font-size:1.3rem;color:#ff6b6b;margin-bottom:8px">¿Reiniciar partida?</div>
      <div style="font-size:0.85rem;color:#888;margin-bottom:20px;line-height:1.5">Se borrará <b style="color:#fff">todo tu progreso</b>: negocios, dinero, gemas, logros y nivel. Esta acción <b style="color:#ff6b6b">no se puede deshacer</b>.</div>
      <div style="display:flex;gap:10px;justify-content:center">
        <button onclick="document.getElementById('resetConfirmModal').remove();closeSecondaryPanel();"
          style="background:rgba(255,255,255,.08);color:#fff;font-family:'Fredoka One',cursive;font-size:1rem;padding:10px 22px;border-radius:99px;border:2px solid rgba(255,255,255,.15);cursor:pointer">
          Cancelar
        </button>
        <button id="resetConfirmBtn"
          style="background:linear-gradient(135deg,#c0392b,#e74c3c);color:#fff;font-family:'Fredoka One',cursive;font-size:1rem;padding:10px 22px;border-radius:99px;border:2px solid rgba(255,255,255,.15);cursor:pointer">
          Sí, borrar todo
        </button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  document.getElementById('resetConfirmBtn').addEventListener('click', () => {
    // Wipe localStorage
    try { localStorage.removeItem('idb2_save'); } catch(e) {}
    // Reset G to defaults
    G.money = 500; G.totalEarned = 500; G.xp = 0; G.level = 0;
    G.prestigeStars = 0; G.prestigeMult = 1;
    G.socialStage = 0; G.influence = 0; G.totalInfluence = 0;
    G.influenceUpgrades = {}; G.businesses = {}; G.upgrades = {};
    G.achievements = {}; G.zone = 'centro'; G.zoneHistory = ['centro'];
    G.lastSave = Date.now(); G.activeEvent = null; G.eventEnd = 0;
    G.gems = 0; G.dailyEarned = 0; G.dailyNegotiations = 0;
    G.lastDailyReset = 0; G.dailyObjClaimed = {}; G.dailyObjSeed = 0;
    G.bizStats = {}; G.gemBoostEnd = 0; G.autoClickerEnd = 0;
    G.offlineBoostEnd = 0; G.theme = 'gold'; G.lastLogin = 0;
    G.loginStreak = 0; G.negotiateCount = 0; G.eventsParticipated = 0;
    G.soundOn = true; G.bizCustom = {}; G.companyName = '';
    G.shareCount = 0; G.lastShareTs = 0; G.weeklyReset = 0;
    G.weeklyEarned = 0; G.weeklyLevels = 0; G.weeklyNego = 0;
    G.weeklyNewBiz = 0; G.weeklyCycles = 0; G.weeklyObjClaimed = {};
    G.superEmpresaUnlocked = false; G.bizUpgrades = {}; G.bizUpgradeCount = {};
    saveGame();
    modal.remove();
    closeSecondaryPanel();
    renderAll();
    notify('🗑️ ¡Partida reiniciada! Empezando de cero...');
  });
}

// ══════════════════════════════════════════════════════════════
// CLOUD SAVE — Supabase directo (sin React/GameClient)
// ══════════════════════════════════════════════════════════════
// El SDK de Supabase se carga en el <head>.
// _cloud es el cliente. _cloudUser es el usuario activo.
// ══════════════════════════════════════════════════════════════
const _SB_URL = 'https://spubzjcwpehtcctvtbsn.supabase.co';
const _SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwdWJ6amN3cGVodGNjdHZ0YnNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTE0NDgsImV4cCI6MjA4Nzk2NzQ0OH0.gCqOWZxIiXBZvt8JQ4ihhKs36YALmrjupInKhwIUv_g';
let _cloud = null;
let _cloudUser = null;
let _cloudAutoSave = null;
let _cloudDebounce = null;

function _getCloud() {
  if (!_cloud && window.supabase) {
    _cloud = window.supabase.createClient(_SB_URL, _SB_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
  }
  return _cloud;
}

function _updateCloudBtn() {
  const btn = document.getElementById('cloudBtn');
  if (!btn) return;
  if (_cloudUser) {
    btn.textContent = '☁️ ' + (_cloudUser.email?.split('@')[0]?.slice(0,8) || 'cuenta');
    btn.style.color = '#2DC653';
    btn.style.borderColor = 'rgba(45,198,83,0.5)';
  } else {
    btn.textContent = '☁️';
    btn.style.color = '#FFE135';
    btn.style.borderColor = 'rgba(255,225,53,0.4)';
  }
}

async function _cloudDoSave(silent) {
  const sb = _getCloud();
  if (!sb || !_cloudUser) return;
  try {
    const { error } = await sb.rpc('upsert_game_save', {
      p_money:          Math.floor(G.money || 0),
      p_total_earned:   Math.floor(G.totalEarned || 0),
      p_level:          G.level || 0,
      p_prestige_stars: G.prestigeStars || 0,
      p_prestige_mult:  G.prestigeMult || 1,
      p_zone:           G.zone || 'centro',
      p_game_state:     G,
      p_save_version:   1,
      p_social_stage:   G.socialStage || 0,
      p_influence:      Math.floor(G.totalInfluence || 0),
      p_guild_code:     G.guildCode || null,
    });
    if (error) throw error;
    if (!silent) notify('☁️ ✅ Guardado en la nube');
  } catch(e) {
    if (!silent) notify('❌ Error al guardar: ' + e.message);
    console.warn('[Cloud] Save error:', e);
  }
}

// Flag para evitar cargar múltiples veces mientras se juega
let _cloudLoaded = false;

async function _cloudDoLoad(force) {
  if (_cloudLoaded && !force) return;  // Ya cargamos, no volver a cargar
  const sb = _getCloud();
  if (!sb || !_cloudUser) return;
  try {
    const { data, error } = await sb
      .from('game_saves')
      .select('game_state, total_earned, updated_at')
      .eq('user_id', _cloudUser.id)
      .single();

    if (error || !data?.game_state) return;

    const cloud = data.game_state;
    const cloudEarned = Number(cloud.totalEarned) || 0;
    const localEarned = Number(G.totalEarned) || 0;
    const cloudDate   = new Date(data.updated_at).getTime();
    const localDate   = Number(G.lastSave) || 0;
    const cloudWins   = cloudEarned > localEarned ||
                        (cloudEarned === localEarned && cloudDate > localDate);

    console.log('[Cloud] cloud=$' + cloudEarned + ' local=$' + localEarned + ' → ' + (cloudWins ? 'NUBE' : 'LOCAL'));
    _cloudLoaded = true;

    _cloudLoaded = true;
    if (cloudWins && cloudEarned > 0) {
      G = { ...G, ...cloud };
      try { localStorage.setItem('idb2_save', JSON.stringify(G)); } catch(e) {}
      if (!G.businesses) G.businesses = {};
      if (!G.upgrades)   G.upgrades   = {};
      // Si el juego ya está corriendo, re-renderizar
      if (typeof renderAll === 'function') {
        renderAll();
        if (typeof applyTheme === 'function') applyTheme(G.theme || 'gold');
        notify('☁️ Progreso cargado desde la nube');
        // Offline earnings
        const elapsed = (Date.now() - (Number(G.lastSave) || Date.now())) / 1000;
        if (elapsed > 60 && typeof showOfflineModal === 'function') {
          const hasBiz = Object.keys(G.businesses || {}).filter(k => bizLevel(k) > 0).length > 0;
          if (hasBiz) {
            const offlineMult = (G.upgrades?.offlineBoost ? 1.0 : 0.4) * getStageOfflineMult();
            const offlineInc  = totalIPS() * elapsed * offlineMult;
            if (offlineInc > 0) setTimeout(() => showOfflineModal(offlineInc, elapsed), 600);
          }
        }
      }
      // Actualizar hadSave para el arranque
      if (typeof hadSave !== 'undefined') window._hadCloudSave = true;
    }
  } catch(e) {
    console.warn('[Cloud] Load error:', e);
  }
}

function _cloudStartAutoSave() {
  clearInterval(_cloudAutoSave);
  _cloudAutoSave = setInterval(() => _cloudDoSave(true), 45000);
}

// ── Funciones de save/load ───────────────────────────────────
let _localSaveDebounce = null;

function saveGame() {
  G.lastSave = Date.now();
  // 1. localStorage debounced (offline-safe)
  clearTimeout(_localSaveDebounce);
  _localSaveDebounce = setTimeout(() => {
    try { localStorage.setItem('idb2_save', JSON.stringify(G)); } catch(e){}
  }, 500);
  
  // 2. Nube: debounce 3s si hay sesión activa
  if (!_cloudUser) return;
  clearTimeout(_cloudDebounce);
  _cloudDebounce = setTimeout(() => _cloudDoSave(true), 3000);
}

function saveGameNow() {
  G.lastSave = Date.now();
  clearTimeout(_localSaveDebounce);
  try { localStorage.setItem('idb2_save', JSON.stringify(G)); } catch(e){}
  if (!_cloudUser) return;
  clearTimeout(_cloudDebounce);
  _cloudDebounce = setTimeout(() => _cloudDoSave(true), 1000);
}

// Ensure data is saved on exit
window.addEventListener('beforeunload', () => saveGameNow());
window.addEventListener('visibilitychange', () => { if (document.hidden) saveGameNow(); });

function loadGame() {
  try {
    const raw = localStorage.getItem('idb2_save');
    if (raw) {
      const loaded = JSON.parse(raw);
      G = {...G, ...loaded};
      return true;
    }
  } catch(e){}
  return false;
}

// ═══════════════════════════════════════════════
// FORMULAS
// ═══════════════════════════════════════════════
function fmt(n) {
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(1)}k`;
  return `$${Math.floor(n)}`;
}
function fmtRaw(n) {
  if (n >= 1e6) return `${(n/1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n/1e3).toFixed(1)}k`;
  return Math.floor(n).toString();
}

function bizLevel(id) { return G.businesses[id]?.level || 0; }
function bizProgress(id) { return G.businesses[id]?.progress || 0; }

function bizIncome(biz) {
  const lvl = bizLevel(biz.id);
  if (!lvl) return 0;
  let inc = biz.baseIncome * (1 + lvl * 0.4);
  UPGRADES.forEach(u => {
    if (G.upgrades[u.id] && (u.target === biz.id || u.target === 'all')) inc *= u.mult;
  });
  const zone = ZONES.find(z => z.id === G.zone) || ZONES[0];
  inc *= zone.mult;
  inc *= getStageMult();
  // Sinergias entre negocios
  BUSINESS_SYNERGIES.forEach(syn => {
    if (syn.ids.includes(biz.id)) {
      const allActive = syn.ids.every(id => bizLevel(id) > 0);
      if (allActive) inc *= syn.mult;
    }
  });
  // VIP mult (from social stage) — applies to premium businesses
  const VIP_BIZS = ['bambu','hotelito','discoteca','plaza','banco','banco_central','crypto','aereolinea','isla'];
  if (VIP_BIZS.includes(biz.id)) inc *= getStageVipMult();

  // Event
  if (G.activeEvent) {
    const ev = G.activeEvent;
    if (ev.target === biz.id || ev.target === 'all') inc *= ev.mult;
  }
  return inc;
}

function bizCycle(biz) {
  const lvl = bizLevel(biz.id);
  const stage = SOCIAL_STAGES[G.socialStage || 0] || SOCIAL_STAGES[0];
  let speedMult = stage.speedMult || 1;
  // Also apply influence network upgrade
  if (G.influenceUpgrades?.inf_network) speedMult *= 1.08;
  return Math.max(biz.baseCycle / ((1 + lvl * 0.04) * speedMult), 0.5);
}

function bizCost(biz) {
  const lvl = bizLevel(biz.id);
  return Math.floor(biz.baseCost * Math.pow(1.4, lvl));
}

function totalIPS() {
  return BUSINESSES.reduce((s, b) => s + bizIncome(b) / bizCycle(b), 0);
}

function totalClientes() {
  return BUSINESSES.reduce((s, b) => s + bizLevel(b.id) * 12, 0);
}

// Stub — overwritten by the season system in the second script block.
// Defined here early so addXP (called from tick) never throws ReferenceError.
function addSeasonXP(amount) {
  if (!G) return;
  G.seasonXP = (G.seasonXP || 0) + amount;
}

function xpRequired(lvl) {
  const entry = LEVELS[Math.min(lvl, LEVELS.length - 1)];
  return entry ? entry.xp : Infinity;
}

function addXP(amount) {
  // Apply XP boost if active
  const xpMult = (G.xpBoostEnd && Date.now() < G.xpBoostEnd) ? 2 : 1;
  G.xp += amount * xpMult;

  while (G.level < LEVELS.length - 1 && G.xp >= xpRequired(G.level)) {
    const needed = xpRequired(G.level);
    if (needed === Infinity) break;          // Lv30 — already at cap
    G.xp -= needed;
    G.level++;
    // 💎 Gemas por subir de nivel — escala con el nivel
    const gemBonus = G.level >= 25 ? 10
                   : G.level >= 20 ? 7
                   : G.level >= 15 ? 5
                   : G.level >= 10 ? 3
                   : G.level >= 5  ? 2 : 1;
    addGems(gemBonus);
    if (typeof addSeasonXP === 'function') addSeasonXP(20);
    notify(`🎉 ¡Nivel ${G.level + 1} — ${LEVELS[G.level]?.name || ''}! +${gemBonus} 💎`);
    navigator.vibrate?.([100, 50, 100]);
    checkStoryBanner();
    playSound('levelup');
    const flash = document.getElementById('lvlFlash');
    if (flash) { flash.classList.remove('pop'); void flash.offsetWidth; flash.classList.add('pop'); }
    checkAchievements();
  }
  updateXPCircle();
}

// ═══════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════
const BIZ_MAX_LEVEL = 25;

function buyBiz(id) {
  const biz = BUSINESSES.find(b => b.id === id);
  const currentLevel = G.businesses[id]?.level || 0;
  if (currentLevel >= BIZ_MAX_LEVEL) { notify('🏆 ¡Este negocio ya alcanzó el nivel máximo (Nv.25)!'); return; }
  const cost = bizCost(biz);
  if (G.money < cost) { notify('💸 ¡No tienes suficiente dinero!'); return; }
  G.money -= cost;
  if (!G.businesses[id]) G.businesses[id] = { level: 0, progress: 0 };
  G.businesses[id].level++;
  addXP(cost * 0.3);
  const lvl = G.businesses[id].level;
  trackW('weeklyLevels');
  if (lvl === 1) { trackW('weeklyNewBiz'); if (!G.companyName) setTimeout(openCompanyModal, 1500); }
  navigator.vibrate?.([30]);
  const _dn = G.bizCustom?.[id]?.name || biz.name;
  if (lvl === 1) notify(`${G.bizCustom?.[id]?.logo||biz.icon} ¡Abriste ${_dn}!`);
  else notify(`${G.bizCustom?.[id]?.logo||biz.icon} ${_dn} mejorado a Nv.${lvl}!`);
  spawnParticles(cost);
  playSound('buy');
  checkAchievements();
  renderAll({ header:true, businesses:true, upgrades:false, achievements:false, objectives:true, map:false, prestige:true });
  saveGame();
}

function buyUpgrade(id) {
  const u = UPGRADES.find(u => u.id === id);
  if (!u || G.upgrades[id]) return;
  // Verificar minBizLevel si aplica
  if (u.minBizLevel && u.target !== 'all' && u.target !== 'none') {
    const bizLvl = bizLevel(u.target);
    if (bizLvl < u.minBizLevel) { notify(`🔒 Necesitas ${u.target} en Nv.${u.minBizLevel}`); return; }
  }
  if (G.money < u.cost) { notify('💸 ¡Necesitas más dinero!'); return; }
  G.money -= u.cost;
  G.upgrades[id] = true;
  G.dailyUpgradesBought = (G.dailyUpgradesBought || 0) + 1;
  notify(`${u.icon} ¡${u.name} activado!`);
  playSound('buy');
  spawnParticles(u.cost);
  checkAchievements();
  renderAll({ header:true, businesses:true, upgrades:true, achievements:false, objectives:true, map:false, prestige:false });
  saveGame();
}

function moveZone(id) {
  if (id === G.zone) return;
  const zone = ZONES.find(z => z.id === id);
  if (!zone || G.level < zone.minLevel) { notify('🔒 Necesitas más nivel'); return; }
  if (zone.cost > 0 && G.money < zone.cost) { notify('💸 No tienes suficiente dinero'); return; }
  if (zone.cost > 0) G.money -= zone.cost;
  G.zone = id;
  if (!G.zoneHistory) G.zoneHistory = ['centro'];
  if (!G.zoneHistory.includes(id)) G.zoneHistory.push(id);
  notify(`🗺️ ¡Te mudaste a ${zone.name}! (x${zone.mult} ingresos)`);
  playSound('buy');
  checkAchievements();
  renderAll();
  saveGame();
}

// ═══════════════════════════════════════════════
// ASCENSO SOCIAL — DATOS
// ═══════════════════════════════════════════════
const SOCIAL_STAGES = [
  { id:0, name:'El Comienzo', icon:'🏚️', label:'Viviendo en el barrio', incomeMult:1, speedMult:1, vipMult:1, offlineMult:1, bonus:'Sin bonos extra', req:null },
  { id:1, name:'Casa Propia', icon:'🏠', label:'Una casa sencilla tuya', incomeMult:1.10, speedMult:1.05, vipMult:1, offlineMult:1, bonus:'+10% ingresos · +5% velocidad', req:{level:6, totalEarned:5000}, influenceReward:1 },
  { id:2, name:'Casa Moderna', icon:'🏡', label:'Moderna con garaje', incomeMult:1.20, speedMult:1.10, vipMult:1, offlineMult:1, bonus:'+20% ingresos · +10% eficiencia', req:{level:8, totalEarned:20000}, influenceReward:2 },
  { id:3, name:'Villa', icon:'🏖️', label:'Villa con piscina', incomeMult:1.35, speedMult:1.15, vipMult:1.15, offlineMult:1, bonus:'+35% ingresos · +15% eventos VIP', req:{level:12, totalEarned:100000}, influenceReward:3 },
  { id:4, name:'Penthouse', icon:'🏙️', label:'Vista panorámica a la ciudad', incomeMult:1.50, speedMult:1.20, vipMult:1.20, offlineMult:1.25, bonus:'+50% ingresos · +25% offline', req:{level:16, totalEarned:500000}, influenceReward:5 },
  { id:5, name:'Jet Privado', icon:'🛩️', label:'Acceso global', incomeMult:1.75, speedMult:1.30, vipMult:1.30, offlineMult:1.35, bonus:'+75% ingresos · +30% premium', req:{level:20, totalEarned:2000000}, influenceReward:8 },
  { id:6, name:'Corporación', icon:'🌎', label:'Imperio global', incomeMult:2.0, speedMult:1.50, vipMult:1.50, offlineMult:1.50, bonus:'+100% ingresos · Bonus total', req:{level:25, totalEarned:10000000}, influenceReward:15 },
];

const INFLUENCE_UPGRADES = [
  { id:'inf_mindset', icon:'🧠', name:'Mentalidad Ganadora', desc:'+5% ingresos globales', cost:1, incomeMult:1.05 },
  { id:'inf_network', icon:'🤝', name:'Red de Contactos', desc:'+8% velocidad negocios', cost:2, speedMult:1.08 },
  { id:'inf_brand', icon:'🎨', name:'Marca Personal', desc:'+10% ingresos · +10% negocios VIP', cost:3, incomeMult:1.10 },
  { id:'inf_media', icon:'📱', name:'Presencia en Redes', desc:'+15% ingresos totales', cost:5, incomeMult:1.15 },
  { id:'inf_empire', icon:'👑', name:'Visión de Imperio', desc:'+25% todos los ingresos', cost:10, incomeMult:1.25 },
];

function getStageMult() {
  const s = SOCIAL_STAGES[G.socialStage] || SOCIAL_STAGES[0];
  let mult = s.incomeMult;
  if (!G.influenceUpgrades) G.influenceUpgrades = {};
  INFLUENCE_UPGRADES.forEach(u => { if (G.influenceUpgrades[u.id] && u.incomeMult) mult *= u.incomeMult; });
  return mult;
}
function getStageOfflineMult() {
  const s = SOCIAL_STAGES[G.socialStage] || SOCIAL_STAGES[0];
  return s.offlineMult || 1;
}
function getStageVipMult() {
  const s = SOCIAL_STAGES[G.socialStage] || SOCIAL_STAGES[0];
  let mult = s.vipMult || 1;
  // inf_brand adds extra 10% to VIP businesses
  if (G.influenceUpgrades?.inf_brand) mult *= 1.10;
  return mult;
}

function canAscend() {
  const nextStage = SOCIAL_STAGES[(G.socialStage||0) + 1];
  if (!nextStage || !nextStage.req) return false;
  return G.level >= nextStage.req.level && G.totalEarned >= nextStage.req.totalEarned;
}

function showAscendModal() {
  if (!canAscend()) { notify('🔒 No cumples los requisitos aún'); return; }
  const next = SOCIAL_STAGES[(G.socialStage||0) + 1];
  const overlay = document.createElement('div');
  overlay.className = 'ascend-modal-overlay';
  overlay.id = 'ascendModalOverlay';
  overlay.innerHTML = `<div class="ascend-modal">
    <div class="ascend-modal-title">🚀 ¡Ascender!</div>
    <div class="ascend-modal-scene">${next.icon}</div>
    <div style="font-family:'Fredoka One',cursive;font-size:1.3rem;color:var(--ink)">${next.name}</div>
    <div class="ascend-modal-sub">${next.label} · ${next.bonus}</div>
    <div class="ascend-keep-lose">
      <div class="akl-box akl-keep"><div class="akl-title">✅ Conservas</div>⭐ Influencia<br>🏆 Logros<br>⚡ Bonos permanentes</div>
      <div class="akl-box akl-lose"><div class="akl-title">❌ Se reinicia</div>💰 Dinero (empiezas con $5k)<br>🏪 Negocios<br>📈 Nivel XP</div>
    </div>
    <div style="font-size:0.75rem;font-weight:700;color:#888;margin-bottom:16px">+${next.influenceReward||1} ⭐ Influencia al ascender</div>
    <div class="ascend-confirm-btns">
      <button class="btn-cancel-ascend" onclick="document.getElementById('ascendModalOverlay').remove()">Cancelar</button>
      <button class="btn-confirm-ascend" onclick="doAscend()">🔥 ¡Ascender!</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
}

function doAscend() {
  document.getElementById('ascendModalOverlay')?.remove();
  if (!canAscend()) return;
  const next = SOCIAL_STAGES[(G.socialStage||0) + 1];
  const influenceReward = next.influenceReward || 1;
  G.socialStage = (G.socialStage||0) + 1;
  G.influence = (G.influence||0) + influenceReward;
  G.totalInfluence = (G.totalInfluence||0) + influenceReward;
  G.prestigeStars++;
  // Capture stats BEFORE reset so share card shows real numbers
  const _preAscendStats = {
    totalEarned: G.totalEarned || 0,
    totalInfluence: (G.totalInfluence||0) + (next.influenceReward||1),
    level: (G.level||0) + 1,
    companyName: G.companyName || 'Mi Empresa',
  };
  G.money = 5000;
  G.xp = 0;
  G.level = 0;
  G.businesses = {};
  G.upgrades = {};
  G.zone = 'centro';
  G.zoneHistory = ['centro'];
  showAscendCelebration(next, _preAscendStats);
  playSound('levelup');
  checkAchievements();
  renderAll();
  saveGameNow();
  saveGame();
}

function buyInfluenceUpgrade(id) {
  const u = INFLUENCE_UPGRADES.find(u => u.id === id);
  if (!u || G.influenceUpgrades?.[id]) return;
  if ((G.influence||0) < u.cost) { notify(`⭐ Necesitas ${u.cost} de Influencia`); return; }
  G.influence -= u.cost;
  if (!G.influenceUpgrades) G.influenceUpgrades = {};
  G.influenceUpgrades[id] = true;
  notify(`${u.icon} ¡${u.name} activado!`);
  playSound('buy');
  renderPrestige();
  saveGame();
}

function showAscendCelebration(stage, preStats) {
  const colors = ['#FFE135','#FF4757','#00C9A7','#7B2FBE','#FF6348'];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-ascend';
    c.style.cssText = `left:${Math.random()*100}vw;top:-20px;background:${colors[i%colors.length]};animation-duration:${1.5+Math.random()*1.5}s;animation-delay:${Math.random()*0.5}s;transform:rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
  const cel = document.createElement('div');
  cel.className = 'ascend-celebration';
  cel.id = 'ascendCelPanel';
  cel.innerHTML = `
    <div class="ascend-cel-text">🚀 ¡ASCENDISTE!</div>
    <div style="font-size:5rem;margin:12px 0">${stage.icon}</div>
    <div class="ascend-cel-sub">${stage.name}</div>
    <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
      <button id="ascendShareBtn" style="background:linear-gradient(135deg,#1877F2,#0a5dc9);border:3px solid white;border-radius:14px;color:white;font-family:'Fredoka One',cursive;font-size:1rem;padding:10px 20px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
        📤 ¡Compartir logro!
      </button>
      <button onclick="document.getElementById('ascendCelPanel')?.remove()" style="background:rgba(255,255,255,0.15);border:2px solid rgba(255,255,255,0.4);border-radius:14px;color:white;font-family:'Fredoka One',cursive;font-size:0.9rem;padding:10px 16px;cursor:pointer;">
        Continuar →
      </button>
    </div>`;
  // Attach share button safely after DOM insert (avoids emoji/quote issues in onclick)
  setTimeout(() => {
    const btn = document.getElementById('ascendShareBtn');
    if (btn) btn.addEventListener('click', () => shareAscend(stage.icon, stage.name, stage.id, preStats));
  }, 50);
  document.body.appendChild(cel);
}

// ── Share Card Generator ─────────────────────────────────────────────────
// Real game image for share card bg
const _SHARE_BG_B64 = '/images/splash.jpg';
function generateShareCard(stageIdx, preStats) {
  const stage = SOCIAL_STAGES[stageIdx] || SOCIAL_STAGES[G.socialStage||0];
  const _s = preStats || { totalEarned: G.totalEarned||0, totalInfluence: G.totalInfluence||0, level: (G.level||0)+1, companyName: G.companyName||'Mi Empresa' };
  const c = document.createElement('canvas');
  c.width = 1200; c.height = 630;
  const x = c.getContext('2d');

  const bgs = {
    0:['#8B7355','#c8963c'], 1:['#2d6a4f','#52b788'], 2:['#1a3a6a','#4a90d9'],
    3:['#006994','#48cae4'], 4:['#020412','#14143a'], 5:['#0a1628','#e8853a'], 6:['#000000','#0a0010'],
  };
  const [c1,c2] = bgs[stageIdx] || bgs[0];
  const grad = x.createLinearGradient(0,0,1200,630);
  grad.addColorStop(0,c1); grad.addColorStop(1,c2);
  x.fillStyle=grad; x.fillRect(0,0,1200,630);

  // Real game illustration as bg
  try {
    const bgImg = new Image();
    bgImg.src = _SHARE_BG_B64;
    if(bgImg.complete) {
      x.globalAlpha = 0.18;
      x.drawImage(bgImg, 0, 0, 1200, 630);
      x.globalAlpha = 1;
    }
  } catch(e) {}

  // Stars for dark stages
  if(stageIdx >= 4) {
    for(let i=0;i<100;i++){
      x.globalAlpha=0.2+Math.random()*0.6;
      x.beginPath();x.arc(Math.random()*1200,Math.random()*400,1+Math.random()*2,0,Math.PI*2);
      x.fillStyle='#fff';x.fill();
    }
    x.globalAlpha=1;
  }

  // Darken bottom
  const ov=x.createLinearGradient(0,0,0,630);
  ov.addColorStop(0,'rgba(0,0,0,0)'); ov.addColorStop(1,'rgba(0,0,0,0.65)');
  x.fillStyle=ov; x.fillRect(0,0,1200,630);

  const accent = [,'#52b788','#4a90d9','#48cae4','#c9a96e','#e8c547','#FFD700'][stageIdx] || '#52b788';

  // Accent bars
  x.fillStyle=accent; x.fillRect(0,0,1200,10); x.fillRect(0,620,1200,10);

  // Game logo
  x.font='bold 20px sans-serif'; x.fillStyle='rgba(255,255,255,0.55)';
  x.textAlign='left'; x.textBaseline='top'; x.fillText('IMPERIO DEL BARRIO',40,28);

  // Stage icon
  x.font='150px serif'; x.textAlign='center'; x.textBaseline='middle';
  x.fillText(stage.icon, 600, 210);

  // Stage name
  x.font='bold 68px sans-serif'; x.fillStyle=accent;
  x.textAlign='center'; x.textBaseline='middle';
  x.fillText(stage.name, 600, 340);

  // Subtitle
  x.font='28px sans-serif'; x.fillStyle='rgba(255,255,255,0.85)';
  x.fillText('¡Ascendí a este nivel en Imperio del Barrio!', 600, 400);

  // Stats bar
  x.fillStyle='rgba(0,0,0,0.45)';
  x.beginPath(); x.roundRect(60,440,1080,110,14); x.fill();
  x.strokeStyle=accent; x.lineWidth=2; x.stroke();

  const money = typeof fmt==='function' ? fmt(_s.totalEarned) : '$0';
  const stats = [
    ['💰 Ganado', money],
    ['⭐ Influencia', String(_s.totalInfluence)],
    ['🏆 Nivel', String(_s.level)],
    ['🏢 Empresa', _s.companyName],
  ];
  stats.forEach(([label,val],i)=>{
    const sx = 160 + i*270;
    x.font='bold 13px sans-serif'; x.fillStyle='rgba(255,255,255,0.5)';
    x.textAlign='center'; x.textBaseline='top'; x.fillText(label, sx, 455);
    x.font='bold 24px sans-serif'; x.fillStyle='#fff';
    x.fillText(val, sx, 478);
  });

  // URL
  x.font='16px sans-serif'; x.fillStyle='rgba(255,255,255,0.35)';
  x.textAlign='right'; x.textBaseline='bottom';
  x.fillText('imperiodelbarrio.com', 1155, 618);

  return c.toDataURL('image/png');
}

function shareAscend(icon, stageName, stageIdx, preStats) {
  if(stageIdx === undefined) {
    stageIdx = SOCIAL_STAGES.findIndex(s=>s.name===stageName);
    if(stageIdx < 0) stageIdx = G.socialStage || 0;
  }

  // Use pre-reset stats if available, otherwise fall back to current
  const _stats = preStats || {
    totalEarned: G.totalEarned || 0,
    totalInfluence: G.totalInfluence || 0,
    level: (G.level||0) + 1,
    companyName: G.companyName || 'Mi Empresa',
  };

  const url   = 'https://www.imperiodelbarrio.com';
  const money = typeof fmt==='function' ? fmt(_stats.totalEarned) : '$?';
  const quote = [
    `${icon} ¡Ascendí a ${stageName} en Imperio del Barrio!`,
    `💰 Ganado: ${money} · ⭐ Influencia: ${_stats.totalInfluence} · Nivel: ${_stats.level}`,
    `🏢 ${_stats.companyName} — ¿Puedes superarme? 👉 ${url}`,
  ].join('\n');

  // Generate image synchronously (canvas, no fetch needed)
  let imgData = null;
  try { imgData = generateShareCard(stageIdx, _stats); } catch(e) { console.warn('Card gen failed', e); }

  // Always show modal first (card preview + download + Facebook)
  if(imgData) {
    _showShareModal(imgData, quote, url, icon, stageName, stageIdx);
  } else {
    _openFacebook(url, quote);
  }

  // Additionally attempt native Web Share API in parallel (mobile)
  if(imgData && navigator.share) {
    fetch(imgData)
      .then(r => r.blob())
      .then(blob => {
        const file = new File([blob], 'mi-logro.png', {type:'image/png'});
        const canFile = navigator.canShare && navigator.canShare({files:[file]});
        if(canFile) return navigator.share({title:'Imperio del Barrio', text:quote, url:'https://www.imperiodelbarrio.com', files:[file]});
        return navigator.share({title:'Imperio del Barrio', text:quote, url:'https://www.imperiodelbarrio.com'});
      })
      .catch(() => {}); // Silent fail — modal is already showing
  }
}

function _openFacebook(url, quote) {
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`;
  window.open(fbUrl, '_blank', 'width=600,height=500,noopener');
}

function _closeShareModal() {
  const m = document.getElementById('shareCardModal');
  if(m) m.remove();
  const p = document.getElementById('ascendCelPanel');
  if(p) p.remove();
}

function _showShareModal(imgData, quote, url, icon, stageName, stageIdx) {
  const existing = document.getElementById('shareCardModal');
  if(existing) existing.remove();

  const stage   = SOCIAL_STAGES[stageIdx] || {};
  const accent  = [,'#52b788','#4a90d9','#48cae4','#c9a96e','#e8c547','#FFD700'][stageIdx] || '#c9a96e';
  // Facebook sharer — use only the URL, quote as separate param (FB ignores quote on mobile but URL always works)
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const dlName  = `logro-${(stageName||'').replace(/\s+/g,'-').replace(/[^a-zA-Z0-9-]/g,'')}.png`;

  const modal = document.createElement('div');
  modal.id = 'shareCardModal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.88);padding:16px';
  modal.innerHTML = `
    <div style="background:#1a1a2e;border-radius:20px;border:2px solid ${accent}44;padding:20px;max-width:540px;width:100%;text-align:center;box-shadow:0 0 60px ${accent}22">
      <div style="font-family:'Fredoka One',cursive;font-size:1.15rem;color:${accent};margin-bottom:12px">${icon} ¡Comparte tu logro!</div>
      <img src="${imgData}" style="width:100%;border-radius:12px;border:2px solid ${accent}44;margin-bottom:14px;display:block" />
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <a href="${imgData}" download="${dlName}"
           style="background:linear-gradient(135deg,#2d6a4f,#52b788);color:#fff;font-family:'Fredoka One',cursive;font-size:.9rem;padding:10px 18px;border-radius:99px;text-decoration:none;border:2px solid rgba(255,255,255,.15)">
          📥 Guardar imagen
        </a>
        <button onclick="window.open('${fbShareUrl}','_blank','noopener,noreferrer')"
           style="background:linear-gradient(135deg,#1877F2,#0a5dc9);color:#fff;font-family:'Fredoka One',cursive;font-size:.9rem;padding:10px 18px;border-radius:99px;border:2px solid rgba(255,255,255,.15);cursor:pointer">
          📘 Compartir en Facebook
        </button>
        <button onclick="_closeShareModal()"
           style="background:rgba(255,255,255,.08);color:#fff;font-family:'Fredoka One',cursive;font-size:.9rem;padding:10px 18px;border-radius:99px;border:2px solid rgba(255,255,255,.12);cursor:pointer">
          ✕ Cerrar
        </button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if(e.target===modal) _closeShareModal(); });
}

function doPrestige() { showAscendModal(); }

// ═══════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════
function renderBusiness(biz) {
  const lvl = bizLevel(biz.id);
  const cost = bizCost(biz);
  const income = bizIncome(biz);
  const cycle = bizCycle(biz);
  const prog = bizProgress(biz.id);
  const locked = G.level < biz.unlockLevel;
  const canAfford = G.money >= cost;
  const isOpen = lvl > 0;
  const stats = G.bizStats[biz.id] || {};
  const custom = G.bizCustom?.[biz.id] || {};
  const delay = BUSINESSES.indexOf(biz) * 0.06;

  // Display data (custom overrides base)
  const displayName = custom.name || biz.name;
  const displayIcon = custom.logo || biz.icon;
  const accentColor = custom.color || biz.color;

  // Micro story
  const stories = BIZ_STORIES[biz.id] || ['El negocio sigue adelante 💪'];
  const storyKey = Math.floor(Date.now() / 50000) + biz.id.charCodeAt(0) * 31;
  const story = isOpen ? stories[storyKey % stories.length] : (locked ? `🔒 Requiere nivel ${biz.unlockLevel}` : '🚀 ¡Abre este negocio para verlo crecer!');

  // Color picker dots
  const BIZ_PALETTE = ['#FF6348','#FFD200','#2DC653','#5BC8F5','#9B5DE5','#FF4FAD','#FF8C42','#E74C3C'];
  const colorDots = BIZ_PALETTE.map(col =>
    `<div class="biz-color-dot${accentColor===col?' sel':''}" style="background:${col}" onclick="setBizColor('${biz.id}','${col}');event.stopPropagation()"></div>`
  ).join('');

  // Hot/Top badges
  const isHot = isOpen && lvl >= 5;
  const isTop = isOpen && (stats.cycles || 0) >= 200;
  const isMaxed = lvl >= BIZ_MAX_LEVEL;

  if (locked) {
    return `<div class="biz-card locked" style="animation-delay:${delay}s">
      <div class="biz-banner" style="background:${biz.color}18">
        <div class="biz-banner-dots"></div>
        <div class="biz-icon-wrap" style="opacity:0.5">${biz.icon}</div>
        <div class="biz-banner-info">
          <div class="biz-name">${biz.name}</div>
          <div class="biz-custom-sub">${biz.desc}</div>
        </div>
      </div>
      <div class="biz-lock-banner">🔒 Desbloquea en Nivel ${biz.unlockLevel}</div>
    </div>`;
  }

  return `<div class="biz-card" style="--biz-accent:${accentColor};animation-delay:${delay}s">
    <!-- BANNER -->
    <div class="biz-banner" style="background:${accentColor}1a">
      <div class="biz-banner-bg" style="background:${accentColor}"></div>
      <div class="biz-banner-dots"></div>
      <div class="biz-icon-wrap" onclick="openRenameModal('${biz.id}')">${displayIcon}</div>
      <div class="biz-banner-info">
        <div class="biz-name">${displayName}</div>
        ${custom.name ? `<div class="biz-custom-sub">${biz.name}</div>` : `<div class="biz-custom-sub">${biz.desc}</div>`}
        <div class="biz-badge-row">
          ${isOpen ? `<div class="biz-lvl-badge" style="background:${accentColor}">Nv.${lvl}</div>` : ''}
          ${isMaxed ? `<div class="biz-hot-badge" style="background:#FFD700;color:#1E1B2E">👑 MAX</div>` : isHot ? `<div class="biz-hot-badge">🔥 HOT</div>` : ''}
          ${isTop ? `<div class="biz-top-badge">📈 TOP</div>` : ''}
        </div>
      </div>
      ${!locked ? `<button class="biz-edit-btn" onclick="openRenameModal('${biz.id}')" title="Personalizar negocio">✏️</button>` : ''}
    </div>

    <!-- BODY -->
    <div class="biz-body-inner">
      <!-- Micro story -->
      <div class="biz-story" id="story-${biz.id}" style="border-left-color:${accentColor}">${story}</div>

      ${isOpen ? `
        <!-- Color picker -->
        <div class="biz-color-row">
          <span class="biz-color-lbl">Color:</span>
          ${colorDots}
        </div>

        <!-- Progress bar -->
        <div class="biz-prog-wrap">
          <div class="biz-prog-bg">
            <div class="biz-prog-fill" id="prog-${biz.id}" style="width:${prog*100}%;background:linear-gradient(90deg,${accentColor}aa,${accentColor})"></div>
          </div>
          <div class="biz-income-line">
            <span class="bil-income">+${fmt(income)}/ciclo</span>
            <span class="bil-time">${cycle.toFixed(1)}s ⏱</span>
            <span class="bil-total" id="bizearned-${biz.id}">${stats.totalEarned ? fmt(stats.totalEarned) + ' total' : ''}</span>
          </div>
        </div>

        ${stats.cycles ? `<div class="biz-stats-row">
          <div class="biz-stat-chip">🔄 ${stats.cycles} ciclos</div>
          ${stats.totalEarned ? `<div class="biz-stat-chip">💰 ${fmt(stats.totalEarned)}</div>` : ''}
          ${lvl >= 10 ? `<div class="biz-stat-chip" style="background:#fff0f8;border-color:#FF4FAD;color:#FF4FAD">⭐ Máster</div>` : ''}
        </div>` : ''}
      ` : `<div style="height:4px"></div>`}
    </div>

    <!-- FOOTER ACTIONS -->
    <div class="biz-footer-row">
      ${isMaxed
        ? `<button class="btn-buy" onclick="${BIZ_ANIMATIONS[biz.id] ? `openBizAnim('${biz.id}')` : ''}" style="background:linear-gradient(135deg,#7B2FBE,#9B5DE5);border-color:#7B2FBE">👑 Ver Negocio</button>
           <div class="biz-cost-tag">✨ ¡Nivel máximo!</div>
           <button class="btn-negotiate" onclick="openNegotiate('${biz.id}','${displayName}',${income.toFixed(2)})">🎮 Jugar</button>`
        : `<button class="btn-buy${!isOpen?' open-btn':''}" onclick="${isOpen && BIZ_ANIMATIONS[biz.id] ? `openBizAnim('${biz.id}')` : `buyBiz('${biz.id}')`}" ${!isOpen && !canAfford?'disabled':''} style="${!isOpen?'background:'+accentColor:''}">
          ${!isOpen ? '🔓 Abrir' : '🎬 Mejorar'}
        </button>
        <div class="biz-cost-tag">${isOpen ? '▶ Ver animación' : fmt(cost)}</div>
        ${isOpen ? `<button class="btn-negotiate" onclick="openNegotiate('${biz.id}','${displayName}',${income.toFixed(2)})">🎮 Jugar</button>` : ''}`
      }
    </div>
  </div>`;
}

function renderUpgrade(u, i) {
  const bought = !!G.upgrades[u.id];
  const canAfford = G.money >= u.cost;
  const delay = i * 0.05;
  // Verificar requisito de nivel de negocio
  let locked = false;
  let lockMsg = '';
  if (u.minBizLevel && u.target !== 'all' && u.target !== 'none') {
    const bizLvl = bizLevel(u.target);
    if (bizLvl < u.minBizLevel) { locked = true; lockMsg = `🔒 Nv.${u.minBizLevel} en negocio`; }
  }
  const ribbon = u.target === 'all' ? '<div class="upg-ribbon">⚡ GLOBAL</div>'
               : u.minBizLevel      ? '<div class="upg-ribbon" style="background:#9B5DE5">⭐ PRO</div>' : '';
  return `<div class="upg-card ${bought ? 'bought' : ''} ${locked ? 'upg-locked' : ''}" onclick="buyUpgrade('${u.id}')" style="background:${u.bg};animation-delay:${delay}s;${locked?'opacity:0.6':''}">
    ${ribbon}
    <div class="upg-icon-wrap" style="background:white">${u.icon}</div>
    <div class="upg-name">${u.name}</div>
    <div class="upg-desc">${u.desc}</div>
    <div class="upg-cost ${bought ? 'bought' : ''}">${bought ? '✅ Activado' : locked ? lockMsg : fmt(u.cost)}</div>
  </div>`;
}

function renderSynergies() {
  const el = document.getElementById('synergiesPanel');
  if (!el) return;
  const active = BUSINESS_SYNERGIES.filter(s => s.ids.every(id => bizLevel(id) > 0));
  const partial = BUSINESS_SYNERGIES.filter(s => !s.ids.every(id => bizLevel(id) > 0) && s.ids.some(id => bizLevel(id) > 0));
  if (active.length === 0 && partial.length === 0) { el.innerHTML = '<div style="text-align:center;color:#888;padding:12px">Abre negocios para descubrir sinergias 🤝</div>'; return; }
  el.innerHTML = [
    ...active.map(s => `<div style="background:#E8FFE8;border:2px solid #2DC653;border-radius:12px;padding:8px 12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">
      <div><strong>${s.name}</strong><div style="font-size:12px;color:#444">${s.desc}</div></div>
      <div style="color:#2DC653;font-weight:800;font-size:14px">✅ ACTIVA</div></div>`),
    ...partial.map(s => {
      const missing = s.ids.filter(id => bizLevel(id) === 0);
      return `<div style="background:#FFF8E0;border:2px dashed #FFB300;border-radius:12px;padding:8px 12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;opacity:0.8">
        <div><strong>${s.name}</strong><div style="font-size:12px;color:#666">${s.desc}</div></div>
        <div style="color:#888;font-size:11px">Falta: ${missing.join(', ')}</div></div>`;
    })
  ].join('');
}

function renderMap() {
  // Keep tab content minimal — real map is in overlay
  document.getElementById('currentZoneName').textContent = ZONES.find(z=>z.id===G.zone)?.name || '';
  // Update HUD button label
  const z = ZONES.find(z=>z.id===G.zone);
  if(z) document.getElementById('hdrZoneLabel').textContent = `${z.icon} ${z.name.split(' ').slice(-1)[0]}`;
  // Quick zone list in tab
  const ql = document.getElementById('zoneQuickList');
  if(ql) ql.innerHTML = ZONES.map(z => {
    const isActive = G.zone===z.id, isLocked = G.level<z.minLevel;
    const onclickAttr = isLocked ? '' : isActive ? "notify('✅ Ya estás aquí!')" : "moveZone('" + z.id + "')";
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;margin-bottom:5px;background:${isActive?'#FFF3CD':isLocked?'#f8f8f8':'#fff'};border:2px solid ${isActive?'#FFE135':isLocked?'#eee':'#ddd'};cursor:${isLocked?'not-allowed':'pointer'};opacity:${isLocked?0.55:1}" onclick="${onclickAttr}" >
      <span style="font-size:1.4rem">${z.icon}</span>
      <div style="flex:1">
        <div style="font-family:'Fredoka One',cursive;font-size:0.8rem;color:#1E1B2E">${z.name}</div>
        <div style="font-size:0.6rem;font-weight:900;color:#5CB85C">x${z.mult} ingresos</div>
      </div>
      <div style="font-size:0.6rem;font-weight:900;color:#FF6348">${isActive?'⭐ ACTIVA':isLocked?`🔒 Nv.${z.minLevel}`:fmt(z.cost)}</div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════
// MAP SYSTEM - HTML/CSS VERSION
// ═══════════════════════════════════════════════
const ZONE_DEFS = {
  centro:     { name:'Barrio Centro',     icon:'🏘️', mult:1.0, cost:0,          minLevel:0,  desc:'Zona inicial. Mucho movimiento, bajo poder adquisitivo. El corazón del barrio.', vibe:'Hustle real' },
  sur:        { name:'Zona Sur',          icon:'🌴', mult:1.3, cost:30000,       minLevel:2,  desc:'Zona turística. Más poder adquisitivo, cafeterías y palmeras por doquier.', vibe:'Ambiente relajado' },
  norte:      { name:'Zona Norte',        icon:'🏙️', mult:1.5, cost:50000,       minLevel:3,  desc:'Zona empresarial. Clientes ejecutivos, calles anchas y autos elegantes.', vibe:'Dinero serio' },
  este:       { name:'Zona Este',         icon:'🏭', mult:1.8, cost:200000,      minLevel:5,  desc:'Zona industrial. Mucho volumen, camiones y producción intensa.', vibe:'Producción máxima' },
  aeropuerto: { name:'Aeropuerto',        icon:'✈️', mult:3.0, cost:5000000,     minLevel:7,  desc:'Internacional. Clientes extranjeros y los tickets más altos de la ciudad.', vibe:'Gran escala' },
  premium:    { name:'Zona Premium',      icon:'💎', mult:4.0, cost:10000000,    minLevel:15, desc:'Zona de lujo. Torres doradas, autos deportivos y clientes VIP.', vibe:'Exclusividad total' },
  torre:      { name:'Torre Empresarial', icon:'🌆', mult:7.0, cost:500000000,   minLevel:22, desc:'El pináculo del poder. Solo los más grandes imperios llegan aquí.', vibe:'Dominio absoluto' },
};

let selectedZoneId = null;


// ─── MAP FUNCTIONS (flat, no animations) ────────────────────────────

function openMapOverlay() {
  document.getElementById('mapOverlay').classList.add('open');
  renderFlatMap();
}
function closeMapOverlay() {
  document.getElementById('mapOverlay').classList.remove('open');
}
function renderFlatMap() {
  const container = document.getElementById('flatZoneGrid');
  if (!container) return;
  container.innerHTML = ZONES.map(z => {
    const isActive  = G.zone === z.id;
    const isLocked  = G.level < z.minLevel;
    const canAfford = G.money >= z.cost;
    let statusLabel, statusColor, clickable;
    if (isActive) {
      statusLabel = '⭐ ZONA ACTUAL'; statusColor = '#FFE135'; clickable = false;
    } else if (isLocked) {
      statusLabel = `🔒 Nivel ${z.minLevel}`; statusColor = '#FF4757'; clickable = false;
    } else if (!canAfford && z.cost > 0) {
      statusLabel = `💸 ${fmt(z.cost)}`; statusColor = '#FF6348'; clickable = false;
    } else {
      statusLabel = z.cost > 0 ? `🚀 ${fmt(z.cost)}` : '🚀 Gratis'; statusColor = '#2DC653'; clickable = true;
    }
    return `<div class="fz-card ${isActive?'fz-active':''} ${isLocked?'fz-locked':''}" ${clickable?`onclick="doMoveZone('${z.id}')"`:''} style="cursor:${clickable?'pointer':'default'}">
      <div class="fz-icon">${z.icon}</div>
      <div class="fz-info">
        <div class="fz-name">${z.name}</div>
        <div class="fz-desc">${ZONE_DEFS[z.id]?.desc || ''}</div>
      </div>
      <div class="fz-right">
        <div class="fz-mult">x${z.mult}</div>
        <div class="fz-status" style="color:${statusColor}">${statusLabel}</div>
      </div>
    </div>`;
  }).join('');
}
function doMoveZone(id) { moveZone(id); closeMapOverlay(); renderFlatMap(); }




// ═══════════════════════════════════════════════════════════════════
// v9: CONSTANTS & DATA
// ═══════════════════════════════════════════════════════════════════

const BIZ_STORIES = {
  barberia:    ['🪒 Un cliente salió con el look del año','💈 ¡Tres cortes seguidos! La barbería vuela','😄 El peluquero está de buenas hoy','🔥 Tu barbería está de moda en el barrio','⭐ Un influencer visitó y dio 5 estrellas','✂️ Récord: 8 clientes antes del mediodía','🏆 Nominada "Mejor Barbería del Mes"'],
  colmado:     ['🛒 Vendiste la última leche, récord de ventas','😄 Un cliente salió feliz con su yaniqueque','🔥 El colmado más visitado del barrio hoy','🧃 Los jugos se agotan antes del mediodía','⭐ Fiado bien pagado, clientes leales','📦 Llegó mercancía nueva, ventas al techo','🎶 La música del colmado alegra la cuadra'],
  salon:       ['💅 Cuatro peinados en una hora, nuevo récord','📸 Influencer posteó sobre tu salón en IG','😄 Una novia satisfecha recomendó el salón','🔥 Trending en redes sociales del barrio','⭐ Lista de espera llena para el fin de semana','💇 Nueva técnica aprendida, clientes encantados','🌺 Aroma nuevo en el salón, clientas encantadas'],
  motoconcho:  ['🛵 Entrega récord: 12 viajes antes del mediodía','😄 Cliente satisfecho dejó propina doble','🔥 La moto más rápida y confiable del barrio','⚡ Sin tráfico hoy, el doble de carreras','⭐ 5 estrellas en la app del vecindario','🏁 Nuevo récord personal de velocidad','🎯 Cero tardanzas esta semana, clientes felices'],
  taller:      ['🔧 Motor difícil resuelto en tiempo récord','😄 El cliente quedó boca abierta de lo feliz','🔥 Tres carros en fila esperando turno','⭐ Taller recomendado por toda la zona Norte','🏆 Ganaste el cliente más exigente del barrio','🚗 Un Ferrari en la puerta, trabajo de élite','🔩 Nueva herramienta, trabajos más rápidos'],
  gym:         ['💪 ¡Nuevo miembro inscrito esta tarde!','🔥 Clase de las 6am llena al máximo','😄 Un cliente bajó 5 libras esta semana','⭐ Trending como el gym más motivador','🏆 Competencia local ganada por tu gym','🥊 Nuevo récord de asistencia mensual','🏋️ Programa nuevo lanzado, inscripciones llenas'],
  restaurante: ['🍽️ La mamá cocinó el mejor sancocho del año','😄 Mesa llena toda la tarde, récord histórico','🔥 El delivery suena sin parar hoy','⭐ Blogger gastronómico visitó y quedó encantado','🏆 Mejor restaurante del barrio 3 meses seguidos','👨‍🍳 Receta secreta nueva, ventas se triplicaron','🌟 Reseña en la revista del barrio esta semana'],
  lavado:      ['🚗 Veinte carros brillantes antes del mediodía','✨ Un Ferrari quedó como espejo, cliente VIP volvió','😄 Cliente habitual trajo a toda la familia','🔥 Línea de espera: señal de que estás haciendo bien','⭐ Foto viral del antes/después en redes','💧 Nuevo producto especial, resultados épicos','🏆 Premio "Servicio Destacado" del vecindario'],
  ferreteria:  ['🏗️ Proveedor nuevo con mejores precios desbloqueado','😄 Constructor compró todo el stock de cemento','🔥 Obra grande en la zona, ventas disparadas','⭐ Arquitecto del barrio nos recomienda a todos','🏆 Venta más grande en la historia del negocio','🔩 Kit especial lanzado, agotado en 2 horas','🧱 Nuevo catálogo de productos, clientes emocionados'],
  bambu:        ['🍻 Viernes lleno hasta afuera, todo el barrio aquí','🎵 DJ nuevo trajo el doble de clientes','😄 Mesa VIP reservada para toda la semana','🔥 Cóctel especial se convirtió en viral','⭐ Mejor bar del año según la revista local','🎉 Evento privado anoche: noche de récord total','🌙 El after más solicitado del mes'],
  cafeteria:    ['☕ Cola de 10 personas para el café de la mañana','🍳 Mangú especial agotado antes del mediodía','😄 Cliente habitual trajo a todos sus compañeros','🔥 El cafetín más visitado del barrio esta semana','⭐ Receta de café nuevo: todos piden doble','🥐 Panadería fresca llegó, ventas se triplicaron','🎶 Música en vivo hoy, clientes no se quieren ir'],
  farmacia:     ['💊 Medicamento difícil de conseguir, solo aquí','😄 Cliente agradeció con flores por el buen servicio','🔥 Temporada de gripe: ventas al máximo','⭐ Farmacéutico recomendado por tres doctores del barrio','🩺 Servicio de presión arterial gratis, colas largas','💉 Vacuna nueva llegó primero a tu farmacia','🌡️ El termómetro más preciso del vecindario'],
  discoteca:    ['🎵 DJ internacional esta noche, lleno total','💃 Competencia de baile: récord de asistencia','🔥 Lista de VIP llena para todo el mes','⭐ Reseña en la revista de entretenimiento dominicana','🎉 Cumpleaños masivo reservó toda la discoteca','🎧 Nuevo equipo de sonido, la vibra es diferente','🌟 La discoteca más hablada de la zona'],
  supermercado: ['🛒 Inventario nuevo llegó: pasillos llenos de clientes','😄 Familia entera hizo la compra del mes','🔥 Ofertas del miércoles: ventas récord','⭐ Clasificado #1 en calidad/precio del barrio','🥩 Sección de carnes renovada: clientes encantados','🧺 App de delivery lanzada: pedidos sin parar','📦 Nuevo proveedor: mejores productos al mismo precio'],
  hotelito:     ['🏨 Todas las habitaciones reservadas este fin','💆 Spa de lujo: lista de espera de 2 semanas','😄 Luna de miel perfecta: reseña de 5 estrellas','🔥 Temporada alta: precios premium justificados','⭐ Mencionado en Travel & Leisure del Caribe','🌊 Vista al mar desde el penthouse, hype en redes','🍹 Cócteles del bar del hotel virales en TikTok'],
  plaza:        ['🏬 Nueva tienda ancla abrió: 500 visitantes hoy','🛍️ Sábado de ventas: estacionamiento lleno','😄 Evento familiar atrajo familias de todo Santiago','🔥 Black Friday del barrio: ventas históricas','⭐ Plaza más moderna de la zona norte','🎪 Food court lleno toda la tarde','🌟 Cobertura en noticias locales: orgullo del barrio'],
  banco:        ['🏦 Primer cliente millonario atendido hoy','💰 Préstamos aprobados: más negocios en el barrio crecen','😄 Tasa de interés competitiva: clientes agradecidos','🔥 Semana de apertura de cuentas: récord histórico','⭐ Banco más confiable de la comunidad','📊 Inversiones rindiendo frutos: clientes contentos','💎 Servicio VIP de banca privada lanzado con éxito'],
  banco_central:['🏛️ Decisión de tasa de interés que impacta todo el barrio','💴 Reservas internacionales en máximo histórico','😄 Presidente del país visitó tus instalaciones','🔥 Imperio financiero reconocido a nivel nacional','⭐ Institución más sólida del sistema dominicano','🌎 Corresponsalía con bancos del exterior aprobada','👑 El poder monetario del barrio en tus manos'],
};

const BIZ_LOGOS = ['💈','🏪','💇','🛵','🔧','💪','🍽️','🚗','🏗️','🍻','⭐','🏆','💎','🔑','🌟','👑','🔥','💰','🎯','🚀','🏅','⚡','🦁','🎪','🛍️','🏠','💡','🎨'];
const BIZ_PALETTE = ['#FF6348','#FFD200','#2DC653','#5BC8F5','#9B5DE5','#FF4FAD','#FF8C42','#E74C3C'];

const WEEKLY_CHALLENGES = [
  { id:'w_earn',  icon:'💰', name:'Gana $500k esta semana',        max: 500000,  prog: ()=>G.weeklyEarned||0,   fmt: true,  reward:30 },
  { id:'w_lvl',   icon:'⬆️', name:'Sube 3 negocios de nivel',      max: 3,       prog: ()=>G.weeklyLevels||0,   fmt: false, reward:25 },
  { id:'w_nego',  icon:'💬', name:'Negocia 5 veces',               max: 5,       prog: ()=>G.weeklyNego||0,     fmt: false, reward:20 },
  { id:'w_newbiz',icon:'🔓', name:'Abre un nuevo negocio',         max: 1,       prog: ()=>G.weeklyNewBiz||0,   fmt: false, reward:35 },
  { id:'w_cycles',icon:'🔄', name:'Completa 500 ciclos',           max: 500,     prog: ()=>G.weeklyCycles||0,   fmt: false, reward:40 },
];

// ═══════════════════════════════════════════════════════════════════
// v9: CUSTOMIZATION
// ═══════════════════════════════════════════════════════════════════

let _renameId = null;
let _renameLogo = null;

function openRenameModal(bizId) {
  if (bizLevel(bizId) === 0) { notify('🔓 Abre este negocio primero'); return; }
  const biz = BUSINESSES.find(b => b.id === bizId);
  if (!biz) return;
  _renameId = bizId;
  const custom = G.bizCustom?.[bizId] || {};
  _renameLogo = custom.logo || biz.icon;
  document.getElementById('renamePreviewIcon').textContent = _renameLogo;
  document.getElementById('renameInp').value = custom.name || '';
  document.getElementById('renameInp').placeholder = biz.name;
  // Build logo grid
  document.getElementById('logoGrid').innerHTML = BIZ_LOGOS.map(l =>
    `<div class="logo-opt${_renameLogo===l?' sel':''}" onclick="pickLogo('${l}')">${l}</div>`
  ).join('');
  document.getElementById('renameModalBg').classList.add('open');
}

function pickLogo(logo) {
  _renameLogo = logo;
  document.getElementById('renamePreviewIcon').textContent = logo;
  document.querySelectorAll('.logo-opt').forEach(el =>
    el.classList.toggle('sel', el.textContent === logo)
  );
}

function saveRename() {
  if (!_renameId) return;
  if (!G.bizCustom) G.bizCustom = {};
  if (!G.bizCustom[_renameId]) G.bizCustom[_renameId] = {};
  const rawName = document.getElementById('renameInp').value.trim();
  const biz = BUSINESSES.find(b => b.id === _renameId);
  const newName = rawName || biz.name;
  G.bizCustom[_renameId].name = rawName ? rawName : '';
  G.bizCustom[_renameId].logo = _renameLogo;
  saveGame(); renderAll(); closeRenameModal();
  const company = G.companyName ? `${G.companyName}` : 'Tu negocio';
  notify(`🎨 "${newName}" personalizado! ${_renameLogo}`);
}

function closeRenameModal() {
  document.getElementById('renameModalBg').classList.remove('open');
  _renameId = null;
}

function setBizColor(bizId, color) {
  if (!G.bizCustom) G.bizCustom = {};
  if (!G.bizCustom[bizId]) G.bizCustom[bizId] = {};
  G.bizCustom[bizId].color = color;
  saveGame(); renderAll();
}

// COMPANY NAME
function openCompanyModal() {
  document.getElementById('companyInp').value = G.companyName || '';
  document.getElementById('companyModalBg').classList.add('open');
}

function saveCompanyName() {
  const name = document.getElementById('companyInp').value.trim();
  if (!name) { notify('⚠️ Escribe un nombre'); return; }
  G.companyName = name;
  saveGame();
  document.getElementById('companyModalBg').classList.remove('open');
  updateCompanyInHeader();
  notify(`🏢 ¡Bienvenido, ${name}! Tu imperio empieza ahora.`);
}

function updateCompanyInHeader() {
  const el = document.getElementById('companyNameHdr');
  if (!el) return;
  if (G.companyName) {
    el.textContent = G.companyName;
    el.classList.add('show');
  } else {
    el.classList.remove('show');
  }
}

// ═══════════════════════════════════════════════════════════════════
// v9: WEEKLY CHALLENGES
// ═══════════════════════════════════════════════════════════════════

function resetWeeklyIfNeeded() {
  const weekId = Math.floor(Date.now() / (7 * 24 * 3600 * 1000));
  if (G.weeklyReset !== weekId) {
    G.weeklyReset = weekId;
    G.weeklyEarned = 0;
    G.weeklyLevels = 0;
    G.weeklyNego = 0;
    G.weeklyNewBiz = 0;
    G.weeklyCycles = 0;
    G.weeklyObjClaimed = {};
  }
}

function renderWeeklyChallenges() {
  resetWeeklyIfNeeded();
  const el = document.getElementById('weeklyChallengesEl');
  if (!el) return;
  const items = WEEKLY_CHALLENGES.map(ch => {
    const p = Math.min(ch.prog(), ch.max);
    const pct = (p / ch.max) * 100;
    const done = p >= ch.max;
    const claimed = !!(G.weeklyObjClaimed?.[ch.id]);
    const progTxt = ch.fmt ? (fmt(p) + ' / ' + fmt(ch.max)) : (p + ' / ' + ch.max);
    return `<div class="ch-item">
      <div class="ch-icon">${ch.icon}</div>
      <div class="ch-mid">
        <div class="ch-name">${ch.name}</div>
        <div class="ch-prog-txt">${done ? '✅ COMPLETADO' : progTxt}</div>
        <div class="ch-bar"><div class="ch-bar-fill" style="width:${pct}%;background:${done?'#2DC653':'#5BC8F5'}"></div></div>
      </div>
      <div class="ch-right">
        <div class="ch-reward">💎 ${ch.reward}</div>
        ${done && !claimed
          ? `<button class="ch-claim-btn" onclick="claimWeekly('${ch.id}',${ch.reward})">¡Reclamar!</button>`
          : claimed ? '<div class="ch-done-txt">✅ Reclamado</div>' : ''}
      </div>
    </div>`;
  }).join('');
  el.innerHTML = `<div class="ch-panel">
    <div class="ch-panel-title">🎯 Retos Semanales <span style="font-size:0.65rem;color:rgba(255,255,255,0.45);font-weight:700">Se reinician cada semana</span></div>
    ${items}
  </div>`;
}

function claimWeekly(id, reward) {
  if (!G.weeklyObjClaimed) G.weeklyObjClaimed = {};
  if (G.weeklyObjClaimed[id]) return;
  G.weeklyObjClaimed[id] = true;
  G.gems = (G.gems || 0) + reward;
  saveGame();
  renderWeeklyChallenges();
  document.getElementById('hdrGems').textContent = G.gems;
  notify(`💎 +${reward} gemas por reto semanal completado!`);
}

// ═══════════════════════════════════════════════════════════════════
// v9: SUPER EMPRESA
// ═══════════════════════════════════════════════════════════════════

function checkSuperEmpresa() {
  if (G.superEmpresaUnlocked) {
    document.getElementById('superEmpBanner')?.classList.add('show');
    document.body.classList.add('super-empresa');
    return;
  }
  const allOpen = BUSINESSES.every(b => bizLevel(b.id) >= 1);
  const fiveAt10 = BUSINESSES.filter(b => bizLevel(b.id) >= 10).length >= 5;
  if (allOpen && fiveAt10) {
    G.superEmpresaUnlocked = true;
    saveGame();
    document.getElementById('superEmpBanner')?.classList.add('show');
    document.body.classList.add('super-empresa');
    notify('🌟👑 ¡SUPER EMPRESA DESBLOQUEADA! Eres una leyenda del barrio.');
  }
}

// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// GEM SOURCES SYSTEM — múltiples formas de ganar gemas
// ═══════════════════════════════════════════════════════════════════

// ── Trivia database ─────────────────────────────────────────────────
const TRIVIA_QUESTIONS = [
  { q:'¿Cuántas zonas tiene el mapa de Ciudad Imperio?', opts:['4','5','6','8'], a:2 },
  { q:'¿Qué moneda especial ganas al Ascender Socialmente?', opts:['Pesos','Gemas','Influencia','XP'], a:2 },
  { q:'¿Cuál es el negocio más básico para empezar?', opts:['Colmado','Barbería','Salón','Cafetín'], a:1 },
  { q:'¿Qué upgrade activa las ganancias offline al 100%?', opts:['Modo 24/7 🌙','Auto-Click','Turbo','Flash Sale'], a:0 },
  { q:'¿Qué zona tiene el mayor multiplicador de ingresos?', opts:['Centro','Norte','Sur','Premium'], a:3 },
  { q:'¿Qué recurso necesitas para comprar mejoras permanentes?', opts:['Dinero','Gemas','Influencia','XP'], a:2 },
  { q:'¿Cada cuánto se reinician los Objetivos Diarios?', opts:['1 hora','6 horas','24 horas','7 días'], a:2 },
  { q:'¿Qué hace el Auto-Clicker Temporal de la tienda?', opts:['Sube nivel solo','Clicks automáticos 5min','Dobla gemas','Skip de cooldown'], a:1 },
  { q:'¿Cuántos días de racha necesitas para logro "Semana Completa"?', opts:['3','5','7','10'], a:2 },
  { q:'¿Qué pasa al "Ascender" en el Ascenso Social?', opts:['Pierdes todo','Conservas influencia y logros','Solo pierdes dinero','Nada'], a:1 },
  { q:'¿Cómo se llama la app donde jugamos?', opts:['Barrio Boss','Imperio del Barrio','Tycoon RD','El Colmado'], a:1 },
  { q:'¿De qué ciudad dominicana está inspirado el juego?', opts:['Santo Domingo','La Romana','Santiago','Higüey'], a:2 },
];

let _triviaActive = false;
let _triviaTimer = null;
let _triviaTimeout = null;
let _triviaCallbackOnDone = null;

function startTrivia(onDone) {
  if (_triviaActive) return;
  _triviaActive = true;
  _triviaCallbackOnDone = onDone || null;

  const q = TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)];
  document.getElementById('triviaQuestion').textContent = q.q;
  const fill = document.getElementById('triviaTimerFill');
  const result = document.getElementById('triviaResult');
  const doneBtn = document.getElementById('triviaDoneBtn');
  result.style.display = 'none';
  doneBtn.style.display = 'none';
  fill.style.width = '100%';
  fill.style.transition = 'none';

  let answered = false;
  const opts = document.getElementById('triviaOpts');
  opts.innerHTML = q.opts.map((o, i) =>
    `<button class="trivia-opt" onclick="answerTrivia(${i},${q.a})">${o}</button>`
  ).join('');

  // Countdown 15s
  let timeLeft = 15;
  fill.style.transition = 'width 15s linear';
  requestAnimationFrame(() => { fill.style.width = '0%'; });

  _triviaTimeout = setTimeout(() => {
    if (!answered) {
      answered = true;
      Array.from(opts.children).forEach((b, i) => {
        b.disabled = true;
        if (i === q.a) b.classList.add('correct');
      });
      result.style.display = 'block';
      result.innerHTML = `<span style="color:#FF4757">⏰ ¡Tiempo agotado! La respuesta era: <b>${q.opts[q.a]}</b></span>`;
      doneBtn.style.display = 'block';
    }
  }, 15000);

  document.getElementById('triviaOverlay').classList.add('open');
}

function answerTrivia(chosen, correct) {
  if (document.querySelector('.trivia-opt.correct, .trivia-opt.wrong')) return;
  clearTimeout(_triviaTimeout);

  const opts = document.getElementById('triviaOpts');
  Array.from(opts.children).forEach((b, i) => {
    b.disabled = true;
    if (i === correct) b.classList.add('correct');
    else if (i === chosen) b.classList.add('wrong');
  });

  const result = document.getElementById('triviaResult');
  const doneBtn = document.getElementById('triviaDoneBtn');
  result.style.display = 'block';
  doneBtn.style.display = 'block';

  if (chosen === correct) {
    result.innerHTML = `<span style="color:#2DC653">✅ ¡Correcto! <b>+3 💎</b></span>`;
    addGems(3);
    G.lastTriviaTs = Date.now();
    G.triviaCorrect = (G.triviaCorrect || 0) + 1;
    saveGame();
    if (_triviaCallbackOnDone) _triviaCallbackOnDone(true);
  } else {
    result.innerHTML = `<span style="color:#FF4757">❌ Incorrecto. Era: <b>${document.querySelectorAll('.trivia-opt')[correct].textContent}</b></span>`;
    G.lastTriviaTs = Date.now();
    saveGame();
    if (_triviaCallbackOnDone) _triviaCallbackOnDone(false);
  }
}

function closeTriviaOverlay() {
  _triviaActive = false;
  clearTimeout(_triviaTimeout);
  document.getElementById('triviaOverlay').classList.remove('open');
}

// ── Referral code system ─────────────────────────────────────────────
function getMyReferralCode() {
  if (G.referralCode) return G.referralCode;
  const base = (G.companyName || 'BARRIO').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,5);
  const suffix = Math.floor(Math.random() * 900 + 100);
  G.referralCode = base + suffix;
  saveGame();
  return G.referralCode;
}

function copyReferralCode() {
  const code = getMyReferralCode();
  const txt = `🏘️ ¡Juega Imperio del Barrio conmigo! Usa mi código ${code} al registrarte y ambos ganamos 💎 gemas. Juega gratis en https://www.imperiodelbarrio.com #ImperioDelBarrio`;
  if (navigator.share) {
    navigator.share({ title: 'Imperio del Barrio', text: txt, url: 'https://www.imperiodelbarrio.com' }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(txt).catch(() => {});
  }
  notify('📋 ¡Código copiado! Comparte con amigos 💜');
}

// ── Platform share helpers ────────────────────────────────────────────
function shareToNetwork(platform) {
  const openBiz = BUSINESSES.filter(b => bizLevel(b.id) > 0).length;
  const zone = ZONES.find(z => z.id === G.zone)?.name || 'el barrio';
  const company = G.companyName || 'Mi Imperio';
  const txt = encodeURIComponent(`🏘️ "${company}" tiene ${openBiz} negocios y domina ${zone} en Imperio del Barrio 😎💰 Juega gratis en https://www.imperiodelbarrio.com #ImperioDelBarrio`);
  const url = encodeURIComponent('https://www.imperiodelbarrio.com');

  const links = {
    twitter:   `https://twitter.com/intent/tweet?text=${txt}&url=${url}`,
    facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${txt}`,
    whatsapp:  `https://wa.me/?text=${txt}`,
    instagram: null, // Instagram no permite deep link de share, abrimos native share
    tiktok:    null,
  };

  const now = Date.now();
  const dayMs = 24 * 3600 * 1000;
  if (!G.socialShares) G.socialShares = {};
  const lastShare = G.socialShares[platform] || 0;
  const alreadyToday = (now - lastShare) < dayMs;

  const openLink = () => {
    if (links[platform]) {
      window.open(links[platform], '_blank');
    } else {
      // native share para Instagram/TikTok
      const raw = decodeURIComponent(txt);
      if (navigator.share) {
        navigator.share({ title: 'Imperio del Barrio', text: raw, url: 'https://www.imperiodelbarrio.com' }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(raw + '\nhttps://www.imperiodelbarrio.com').catch(() => {});
        notify('📋 Texto copiado — pégalo en ' + platform);
      }
    }
  };

  if (alreadyToday) {
    openLink();
    notify(`📤 Ya compartiste en ${platform} hoy. Vuelve mañana para más 💎`);
    return;
  }

  openLink();
  // Wait 2s then reward (user had to at least trigger the share)
  setTimeout(() => {
    G.socialShares[platform] = now;
    const reward = platform === 'whatsapp' ? 5 : 3;
    addGems(reward);
    saveGame();
    notify(`💎 +${reward} gemas por compartir en ${platform}! 🎉`);
    renderGemSources(); // refresh the panel
  }, 2000);
}

// ── Watch a "video ad" (simulated with a timer) ───────────────────────
let _watchAdActive = false;
function watchAd() {
  if (_watchAdActive) return;
  const now = Date.now();
  const cooldown = 30 * 60 * 1000; // 30 min
  if ((now - (G.lastAdTs || 0)) < cooldown) {
    const remaining = Math.ceil((cooldown - (now - G.lastAdTs)) / 60000);
    notify(`⏳ Próximo video disponible en ${remaining} min`);
    return;
  }
  _watchAdActive = true;
  let secs = 5;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9000;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;';
  overlay.innerHTML = `
    <div style="font-size:0.7rem;color:#aaa;font-weight:900;text-transform:uppercase;letter-spacing:2px">Anuncio del barrio</div>
    <div style="font-size:5rem" id="adEmoji">📺</div>
    <div style="font-family:'Fredoka One',cursive;font-size:1.3rem;color:white">¡Apoya al Imperio!</div>
    <div style="font-size:0.8rem;color:#aaa;font-weight:700">Completando en <span id="adCount">${secs}</span>s...</div>
    <div style="width:200px;height:6px;background:rgba(255,255,255,0.1);border-radius:99px;overflow:hidden">
      <div id="adBar" style="height:100%;width:0%;background:linear-gradient(90deg,#9B5DE5,#D4A8FF);border-radius:99px;transition:width 1s linear"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  const adEmojis = ['📺','🎬','🎭','🎪','🎨'];
  let t = 0;
  requestAnimationFrame(() => { document.getElementById('adBar').style.width = '100%'; });
  const iv = setInterval(() => {
    t++;
    secs--;
    document.getElementById('adCount').textContent = secs;
    document.getElementById('adEmoji').textContent = adEmojis[t % adEmojis.length];
    if (secs <= 0) {
      clearInterval(iv);
      overlay.remove();
      _watchAdActive = false;
      G.lastAdTs = Date.now();
      addGems(5);
      saveGame();
      notify('🎬 ¡Gracias por ver! +5 💎');
      renderGemSources();
    }
  }, 1000);
}

// ── Gem Sources Panel ─────────────────────────────────────────────────
function openGemSources() {
  renderGemSources();
  document.getElementById('gemSourcesOverlay').classList.add('open');
}
function closeGemSources() {
  document.getElementById('gemSourcesOverlay').classList.remove('open');
}

function renderGemSources() {
  const now = Date.now();
  const dayMs = 24 * 3600 * 1000;
  const weekMs = 7 * dayMs;
  if (!G.socialShares) G.socialShares = {};

  // ── INSTANT / ONE-TIME ───────────────────────────────────────────
  const instant = [
    {
      icon: '🧠', name: 'Trivia del Barrio', desc: 'Responde una pregunta correctamente',
      gems: '+3 💎', id: 'trivia',
      cooldown: dayMs,
      last: G.lastTriviaTs || 0,
      action: () => { closeGemSources(); startTrivia(); },
    },
    {
      icon: '🎬', name: 'Ver un Video', desc: 'Mira 5 segundos y gana gemas',
      gems: '+5 💎', id: 'ad',
      cooldown: 30 * 60 * 1000,
      last: G.lastAdTs || 0,
      action: () => { closeGemSources(); watchAd(); },
    },
    {
      icon: '🏆', name: 'Completar un Logro', desc: 'Ve a Logros y reclama los disponibles',
      gems: '+1~3 💎', id: 'achievement',
      cooldown: 0,
      last: 0,
      action: () => { closeGemSources(); showTab('logros'); },
    },
    {
      icon: '🎯', name: 'Objetivos Diarios', desc: 'Completa los 3 objetivos del día',
      gems: '+2~8 💎', id: 'objectives',
      cooldown: 0,
      last: 0,
      action: () => { closeGemSources(); showTab('logros'); },
    },
  ];

  // ── RECURRING ────────────────────────────────────────────────────
  const recurring = [
    {
      icon: '🎁', name: 'Recompensa Diaria', desc: 'Login cada día para acumular racha',
      gems: '+1 💎 / día', id: 'daily_gem',
      cooldown: dayMs,
      last: G.lastGemDailyTs || 0,
      action: () => {
        const cd = dayMs - (now - (G.lastGemDailyTs || 0));
        if (cd > 0) { notify(`⏳ Vuelve en ${Math.ceil(cd/3600000)}h`); return; }
        G.lastGemDailyTs = now;
        addGems(1);
        saveGame();
        notify('🎁 +1 💎 por entrar hoy!');
        renderGemSources();
      },
    },
    {
      icon: '📅', name: 'Racha Semanal', desc: '7 días seguidos = +10 💎 bonus',
      gems: '+10 💎', id: 'weekly_streak',
      cooldown: weekMs,
      last: G.lastWeeklyGemTs || 0,
      action: () => {
        if ((G.loginStreak || 0) < 7) { notify(`🔥 Racha actual: ${G.loginStreak || 0}/7 días`); return; }
        const cd = weekMs - (now - (G.lastWeeklyGemTs || 0));
        if (cd > 0) { notify(`⏳ Próximo en ${Math.ceil(cd/86400000)}d`); return; }
        G.lastWeeklyGemTs = now;
        addGems(10);
        saveGame();
        notify('🔥 +10 💎 por racha de 7 días!');
        renderGemSources();
      },
    },
    {
      icon: '🚀', name: 'Subir de Nivel', desc: 'Cada nivel nuevo regala gemas',
      gems: '+1~5 💎', id: 'level_up',
      cooldown: 0, last: 0,
      action: () => { closeGemSources(); notify('¡Sube de nivel para ganar 💎!'); },
    },
    {
      icon: '🏠', name: 'Ascenso Social', desc: 'Al ascender recibes influencia Y gemas',
      gems: '+5 💎', id: 'ascend',
      cooldown: 0, last: 0,
      action: () => { closeGemSources(); showTab('ascenso'); },
    },
  ];

  // ── SOCIAL ───────────────────────────────────────────────────────
  const NETWORKS = [
    { id:'whatsapp', icon:'💬', name:'WhatsApp', desc:'Comparte con tus contactos', gems:'+5 💎', reward:5 },
    { id:'twitter',  icon:'🐦', name:'X / Twitter', desc:'Tuitea tu Imperio', gems:'+3 💎', reward:3 },
    { id:'facebook', icon:'📘', name:'Facebook', desc:'Publica en tu muro', gems:'+3 💎', reward:3 },
    { id:'instagram',icon:'📷', name:'Instagram', desc:'Copia texto para stories/bio', gems:'+3 💎', reward:3 },
    { id:'tiktok',   icon:'🎵', name:'TikTok', desc:'Comparte tu progreso', gems:'+3 💎', reward:3 },
  ];

  // ── RENDER ────────────────────────────────────────────────────────
  const makeRow = (item, badgeText, badgeCls, disabled) => `
    <div class="gs-row${disabled ? ' claimed' : ''}" onclick="${disabled ? '' : `gsAction('${item.id}')`}">
      <div class="gs-icon">${item.icon}</div>
      <div class="gs-info">
        <div class="gs-name">${item.name}</div>
        <div class="gs-desc">${item.desc}</div>
      </div>
      <div class="gs-reward">
        <div class="gs-gems">${item.gems}</div>
        <div class="gs-badge ${badgeCls}">${badgeText}</div>
      </div>
    </div>`;

  const fmtCooldown = (ms) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.ceil((ms % 3600000) / 60000);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  document.getElementById('gsListInstant').innerHTML = instant.map(item => {
    const cd = item.cooldown > 0 ? item.cooldown - (now - item.last) : -1;
    const onCooldown = cd > 0;
    return makeRow(item, onCooldown ? fmtCooldown(cd) : 'Disponible', onCooldown ? 'cooldown' : 'available', onCooldown);
  }).join('');

  document.getElementById('gsListRecurring').innerHTML = recurring.map(item => {
    const cd = item.cooldown > 0 ? item.cooldown - (now - item.last) : -1;
    const onCooldown = cd > 0;
    return makeRow(item, onCooldown ? fmtCooldown(cd) : 'Disponible', onCooldown ? 'cooldown' : 'available', onCooldown && item.cooldown > 0);
  }).join('');

  document.getElementById('gsListSocial').innerHTML = NETWORKS.map(net => {
    const lastShare = G.socialShares[net.id] || 0;
    const cd = dayMs - (now - lastShare);
    const onCooldown = cd > 0;
    return makeRow(
      { icon: net.icon, name: net.name, desc: net.desc, gems: net.gems, id: 'social_' + net.id },
      onCooldown ? 'Mañana' : 'Disponible',
      onCooldown ? 'cooldown' : 'available',
      onCooldown
    );
  }).join('');

  const code = getMyReferralCode();
  document.getElementById('gsListReferral').innerHTML = `
    <div class="gs-row" onclick="copyReferralCode()">
      <div class="gs-icon">🔗</div>
      <div class="gs-info">
        <div class="gs-name">Invita a un amigo</div>
        <div class="gs-desc">Tu amigo entra con tu código → ambos ganan +10 💎</div>
      </div>
      <div class="gs-reward">
        <div class="gs-gems">+10 💎</div>
        <div class="gs-badge available">Compartir</div>
      </div>
    </div>
    <div class="ref-code-box">
      <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);font-weight:900;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Tu código</div>
      <div class="ref-code">${code}</div>
      <button class="ref-copy-btn" onclick="copyReferralCode()">📋 Copiar y compartir</button>
    </div>`;
}

// ── Dispatch action from rendered rows ───────────────────────────────
function gsAction(id) {
  const now = Date.now();
  const dayMs = 24 * 3600 * 1000;
  if (!G.socialShares) G.socialShares = {};

  if (id === 'trivia')      { closeGemSources(); startTrivia(); return; }
  if (id === 'ad')          { closeGemSources(); watchAd(); return; }
  if (id === 'achievement') { closeGemSources(); showTab('logros'); return; }
  if (id === 'objectives')  { closeGemSources(); showTab('logros'); return; }
  if (id === 'ascend')      { closeGemSources(); showTab('ascenso'); return; }
  if (id === 'level_up')    { closeGemSources(); return; }

  if (id === 'daily_gem') {
    const cd = dayMs - (now - (G.lastGemDailyTs || 0));
    if (cd > 0) { notify(`⏳ Vuelve en ${Math.ceil(cd/3600000)}h`); return; }
    G.lastGemDailyTs = now;
    addGems(1);
    saveGame();
    notify('🎁 +1 💎 por entrar hoy!');
    renderGemSources();
    return;
  }

  if (id === 'weekly_streak') {
    const weekMs = 7 * dayMs;
    if ((G.loginStreak || 0) < 7) { notify(`🔥 Racha actual: ${G.loginStreak || 0}/7 días`); return; }
    const cd = weekMs - (now - (G.lastWeeklyGemTs || 0));
    if (cd > 0) { notify(`⏳ Próximo en ${Math.ceil(cd/86400000)}d`); return; }
    G.lastWeeklyGemTs = now;
    addGems(10);
    saveGame();
    notify('🔥 +10 💎 por racha de 7 días!');
    renderGemSources();
    return;
  }

  if (id.startsWith('social_')) {
    const platform = id.replace('social_', '');
    closeGemSources();
    shareToNetwork(platform);
    return;
  }
}

// ── Hook: reward gems on level up ────────────────────────────────────
const _origLevelUp = window.onLevelUp;
function onGemLevelUpHook(newLevel) {
  const gemBonus = newLevel >= 20 ? 5 : newLevel >= 10 ? 3 : newLevel >= 5 ? 2 : 1;
  addGems(gemBonus);
  if (_origLevelUp) _origLevelUp(newLevel);
}

// ═══════════════════════════════════════════════════════════════════
// v9: SHARE WITH GEMS (updated)
// ═══════════════════════════════════════════════════════════════════
function shareGame() {
  shareToNetwork('whatsapp');
}



// ═══════════════════════════════════════════════════════════════════
// v9: MICRO STORY REFRESH (called from game tick)
// ═══════════════════════════════════════════════════════════════════

let _lastStoryBucket = 0;
function refreshMicroStories() {
  const bucket = Math.floor(Date.now() / 50000);
  if (bucket === _lastStoryBucket) return;
  _lastStoryBucket = bucket;
  BUSINESSES.forEach(biz => {
    if (bizLevel(biz.id) === 0) return;
    const el = document.getElementById('story-' + biz.id);
    if (!el) return;
    const stories = BIZ_STORIES[biz.id] || [];
    const idx = (bucket + biz.id.charCodeAt(0) * 31) % stories.length;
    const newStory = stories[idx];
    if (el.textContent !== newStory) {
      el.classList.add('story-flash');
      setTimeout(() => {
        el.textContent = newStory;
        setTimeout(() => el.classList.remove('story-flash'), 600);
      }, 150);
    }
  });
}

// Weekly tracking helpers
function trackW(field, amount) {
  resetWeeklyIfNeeded();
  G[field] = (G[field] || 0) + (amount || 1);
}

function renderLeaderboard() {
  const myScore = (G.influence||0) * 1e9 + (G.totalEarned||0);
  const rows = [
    ...getDynamicLeaderboard(),
    {
      name: 'TÚ', avatar: G.avatar||'😎',
      money: G.totalEarned, influence: G.influence||0,
      score: myScore,
      negocios: Object.values(G.businesses).filter(b=>b.level>0).length,
      isYou: true,
    }
  ];
  rows.sort((a,b) => b.score - a.score);
  document.getElementById('lbBody').innerHTML = rows.map((r,i) => {
    const rankClass = i===0?'r1':i===1?'r2':i===2?'r3':'rN';
    const inf = r.influence||0;
    const rankEmoji = i===0?'🥇':i===1?'🥈':i===2?'🥉':'';
    return `<div class="lb-row ${r.isYou?'you':''}">
      <div class="lb-rank ${rankClass}">${rankEmoji||i+1}</div>
      <div class="lb-avatar">${r.avatar}</div>
      <div class="lb-info">
        <div class="lb-name">${r.isYou ? '👤 '+r.name : r.name}</div>
        <div class="lb-detail">${r.negocios} negocios${inf>0?' · ⭐'+inf+' inf':''}</div>
      </div>
      <div class="lb-money">${fmt(r.money)}</div>
    </div>`;
  }).join('');
}


// ═══════════════════════════════════════════════
// RENDER — optimizado con flags selectivos
// ═══════════════════════════════════════════════
let _renderQueued = {};
function queueRender(flags) {
  Object.assign(_renderQueued, flags);
}

function renderAll(opts) {
  const f = opts || { header:true, businesses:true, upgrades:true, achievements:true, objectives:true, map:true, prestige:true };

  // Header — siempre rápido, siempre actualiza
  if (f.header !== false) {
    document.getElementById('hdrMoney').textContent = fmt(G.money);
    document.getElementById('hdrIPS').textContent = `+${fmt(totalIPS())}/seg`;
    document.getElementById('hdrGems').textContent = G.gems || 0;
    document.getElementById('stClientes').textContent = fmtRaw(totalClientes());
    document.getElementById('stNivel').textContent = G.level + 1;
    document.getElementById('stNegocios').textContent = BUSINESSES.filter(b=>bizLevel(b.id)>0).length;
    document.getElementById('stPrestige').textContent = G.influence||0;
    const req = xpRequired(G.level);
    document.getElementById('lcBadge').textContent = `Nivel ${G.level+1} – ${LEVELS[G.level].name}`;
    document.getElementById('lcNext').textContent = `${fmtRaw(G.xp)} / ${fmtRaw(req)} XP`;
    document.getElementById('lcFill').style.width = Math.min(G.xp/req*100, 100) + '%';
    updateXPCircle();
    updateCompanyInHeader();
    const sb = document.getElementById('soundBtn');
    if (sb) sb.textContent = G.soundOn !== false ? '🔊' : '🔇';
    applyTheme(G.theme || 'gold');
  }

  // Negocios — solo reconstruye si hay cambio de nivel o zona
  if (f.businesses !== false) {
    document.getElementById('bizGrid').innerHTML = BUSINESSES.map(renderBusiness).join('');
    renderWeeklyChallenges();
    checkSuperEmpresa();
  }

  // Mejoras — solo si cambia
  if (f.upgrades !== false) {
    document.getElementById('upgGrid').innerHTML = UPGRADES.map(renderUpgrade).join('');
    renderSynergies();
  }

  // Logros
  if (f.achievements !== false) renderAchievements();

  // Objetivos diarios
  if (f.objectives !== false) renderDailyObjectives();

  // Mapa
  if (f.map !== false) {
    renderMap();
    if (document.getElementById('tab-mapa')?.classList.contains('active')) renderLeaderboard();
  }

  // Ascenso
  if (f.prestige !== false) renderPrestige();
}

// Versión ligera para el tick — solo header
function renderTick() {
  document.getElementById('hdrMoney').textContent = fmt(G.money);
  document.getElementById('hdrIPS').textContent = `+${fmt(totalIPS())}/seg`;
}

// ═══════════════════════════════════════════════
// GAME LOOP
// ═══════════════════════════════════════════════
let lastTick = Date.now();
let _lastIncomeNotif = 0;
let _accumulatedForNotif = 0;
let _sessionStart = Date.now();

function updateSessionTimer() {
  const elapsed = Math.floor((Date.now() - _sessionStart) / 1000);
  const m = Math.floor(elapsed / 60), s = elapsed % 60;
  const el = document.getElementById('sessionTimer');
  if (el) el.textContent = `⏱ ${m}:${s.toString().padStart(2,'0')}`;
}
setInterval(updateSessionTimer, 1000);

function tick() {
  const now = Date.now();
  const dt = (now - lastTick) / 1000;
  lastTick = now;

  // Daily reset check
  if (!G.lastDailyReset || now - G.lastDailyReset > 86400000) {
    G.dailyEarned = 0;
    G.dailyNegotiations = 0;
    G.dailyUpgradesBought = 0;
    G.dailyObjClaimed = {};
    G.dailyObjSeed = now;
    G.lastDailyReset = now;
  }

  // Gem boost check
  const gemBoostActive = G.gemBoostEnd && now < G.gemBoostEnd;
  const autoClickerActive = G.autoClickerEnd && now < G.autoClickerEnd;

  // Check event expiry
  if (G.activeEvent && now > G.eventEnd) {
    G.activeEvent = null;
    document.getElementById('eventBanner').classList.add('hidden');
  }

  // Update event timer
  if (G.activeEvent) {
    const remaining = Math.max(0, (G.eventEnd - now) / 1000);
    const m = Math.floor(remaining / 60);
    const s = Math.floor(remaining % 60);
    document.getElementById('evTimer').textContent = `${m}:${s.toString().padStart(2,'0')}`;
  }

  // Process businesses
  BUSINESSES.forEach(biz => {
    const lvl = bizLevel(biz.id);
    if (!lvl) return;
    if (!G.businesses[biz.id]) G.businesses[biz.id] = { level: lvl, progress: 0 };
    if (!G.bizStats[biz.id]) G.bizStats[biz.id] = { totalEarned: 0, cycles: 0 };

    let dtMod = dt;
    if (autoClickerActive) dtMod = dt * 1.5; // autoclicker speeds up progress

    const cycle = bizCycle(biz);
    G.businesses[biz.id].progress += dtMod / cycle;
    if (G.businesses[biz.id].progress >= 1) {
      G.businesses[biz.id].progress -= 1;
      let inc = bizIncome(biz);
      if (gemBoostActive) inc *= 2;
      G.money += inc;
      G.totalEarned += inc;
      G.dailyEarned = (G.dailyEarned || 0) + inc;
      G.bizStats[biz.id].totalEarned = (G.bizStats[biz.id].totalEarned || 0) + inc;
      G.bizStats[biz.id].cycles = (G.bizStats[biz.id].cycles || 0) + 1;
      trackW('weeklyEarned', inc);
      trackW('weeklyCycles');
      _accumulatedForNotif += inc;
      addXP(inc * 0.05);
      const el = document.getElementById(`prog-${biz.id}`);
      if (el) el.style.width = '0%';
      // Income sound (throttled)
      if (!window._lastChing || Date.now() - window._lastChing > 800) {
        playSound('ching');
        window._lastChing = Date.now();
      }
      // Spawn floating money on card
      spawnBizFloat(biz.id, inc);
      // Occasional achievement check
      if (Math.random() < 0.1) checkAchievements();
      refreshMicroStories();
    } else {
      const el = document.getElementById(`prog-${biz.id}`);
      if (el) el.style.width = (G.businesses[biz.id].progress * 100) + '%';
    }
  });

  // Real-time income notification — adaptativo: más seguido en early, más espaciado en late game
  const notifInterval = G.level > 15 ? 45000 : G.level > 8 ? 30000 : 15000;
  if (now - _lastIncomeNotif > notifInterval && _accumulatedForNotif > 0) {
    notify(`💰 Tus negocios generaron ${fmt(_accumulatedForNotif)} en los últimos momentos`);
    _accumulatedForNotif = 0;
    _lastIncomeNotif = now;
  }

  // Update header money live
  const currentMoney = fmt(G.money);
  if (window._lastDispMoney !== currentMoney) {
    document.getElementById('hdrMoney').textContent = currentMoney;
    window._lastDispMoney = currentMoney;
  }
  const currentIps = `+${fmt(totalIPS())}/seg`;
  if (window._lastDispIps !== currentIps) {
    document.getElementById('hdrIPS').textContent = currentIps;
    window._lastDispIps = currentIps;
  }

  requestAnimationFrame(tick);
}

// ═══════════════════════════════════════════════
// FLOATING INCOME ON BIZ CARD
// ═══════════════════════════════════════════════
function spawnBizFloat(bizId, amount) {
  const card = document.querySelector(`[id="prog-${bizId}"]`);
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;left:${rect.left + rect.width/2}px;top:${rect.top - 10}px;z-index:500;font-family:'Fredoka One',cursive;font-size:0.85rem;color:#2DC653;font-weight:900;pointer-events:none;animation:floatUp 1.2s forwards;text-shadow:1px 1px 0 white`;
  el.textContent = `+${fmt(amount)}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

// ═══════════════════════════════════════════════
// BIZ ANIMATION SYSTEM
// ═══════════════════════════════════════════════
let currentBizAnim = null;

function openStageAnim(stageIdx) {
  const url = STAGE_ANIMATIONS[stageIdx];
  if (!url) { showAscendModal(); return; }
  const overlay = document.getElementById('bizAnimOverlay');
  const iframe  = document.getElementById('bizAnimFrame');
  const stage   = SOCIAL_STAGES[stageIdx];
  iframe.src = url;
  overlay.classList.add('open');
  currentBizAnim = '__stage_' + stageIdx;
  document.getElementById('bizAnimInfo').textContent = `${stage.name} — Tu propiedad`;

  // orientation handling (same as biz)
  try { screen.orientation?.lock?.('landscape').catch(()=>{}); } catch(_) {}
  const frame = document.getElementById('bizAnimFrame');
  const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const isMobile = ('ontouchstart' in window)||navigator.maxTouchPoints>0;
  const checkOrient2 = () => {
    const portrait = window.innerHeight > window.innerWidth;
    const rp = document.getElementById('rotatePrompt');
    if (!portrait) { frame.style.cssText=''; if(rp)rp.style.display='none'; }
    else if (isMobile) {
      const W=window.innerWidth,H=window.innerHeight;
      frame.style.cssText=`position:fixed;top:0;left:0;width:${H}px;height:${W}px;transform-origin:top left;transform:rotate(90deg) translateX(0) translateY(-${W}px);z-index:701;border:none;background:#000`;
      if(rp)rp.style.display='none';
    }
  };
  checkOrient2();
  window._orientChecker = checkOrient2;
  window.addEventListener('resize', checkOrient2);
  window.addEventListener('orientationchange', ()=>setTimeout(checkOrient2,150));
}

function openBizAnim(id) {
  const url = BIZ_ANIMATIONS[id];
  if (!url) return;
  const biz = BUSINESSES.find(b => b.id === id);
  const overlay = document.getElementById('bizAnimOverlay');
  const iframe = document.getElementById('bizAnimFrame');
  iframe.src = url + '?level=' + bizLevel(id) + '&mult=' + G.prestigeMult;
  overlay.classList.add('open');
  currentBizAnim = id;
  document.getElementById('bizAnimInfo').textContent = `${biz.name} — Ingresos sincronizados en tiempo real`;

  // Try to lock landscape on Android (Safari ignores)
  try { screen.orientation?.lock?.('landscape').catch(()=>{}); } catch(_) {}

  const frame = document.getElementById('bizAnimFrame');
  const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isMobile = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  const checkOrient = () => {
    const portrait = window.innerHeight > window.innerWidth;
    const rp = document.getElementById('rotatePrompt');
    const W = window.innerWidth;
    const H = window.innerHeight;

    if (!portrait) {
      // Landscape — iframe normal, sin transform
      frame.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;background:#000;';
      overlay.style.cssText = 'display:block;position:fixed;inset:0;z-index:700;background:#000;';
      if (rp) rp.style.display = 'none';
    } else if (isMobile) {
      // Portrait en móvil — rotar el OVERLAY entero, no el iframe
      // Así Chrome mantiene hit-testing correcto sobre el iframe
      overlay.style.cssText = [
        'display:block',
        'position:fixed',
        `width:${H}px`,
        `height:${W}px`,
        'top:0',
        `left:${W}px`,
        'transform-origin:top left',
        'transform:rotate(90deg)',
        'z-index:700',
        'background:#000',
        'overflow:hidden'
      ].join(';');
      frame.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;background:#000;';
      if (rp) rp.style.display = 'none';
    }
  };

  checkOrient();
  window._orientChecker = checkOrient;
  window.addEventListener('resize', checkOrient);
  window.addEventListener('orientationchange', () => setTimeout(checkOrient, 150));

  // Send initial state to iframe once it loads
  iframe.onload = () => {
    const upgrades = G.bizUpgrades?.[id] || {};
    iframe.contentWindow?.postMessage({
      type: 'bizInit',
      money: G.money,
      // Generic: send all stored upgrade levels for this biz
      ...Object.fromEntries(Object.entries(upgrades).map(([k,v]) => [k+'Level', v])),
      // Backwards compat keys
      chairLevel:     upgrades.sillas    || 1,
      speedLevel:     upgrades.velocidad || 1,
      priceLevel:     upgrades.precio    || 1,
      marketingLevel: upgrades.marketing || 1,
    }, '*');
  };
}

function closeBizAnim() {
  const overlay = document.getElementById('bizAnimOverlay');
  overlay.classList.remove('open');
  // Resetear estilos del overlay y del iframe
  overlay.style.cssText = '';
  const iframe = document.getElementById('bizAnimFrame');
  iframe.style.cssText = '';
  iframe.contentWindow?.postMessage({ type: 'bizClose' }, '*');
  setTimeout(() => { iframe.src = ''; }, 100);
  currentBizAnim = null;
  // Release orientation lock
  try { screen.orientation?.unlock?.(); } catch(_) {}
  // Hide rotate prompt
  const rp = document.getElementById('rotatePrompt');
  if (rp) rp.style.display = 'none';
  if (window._orientChecker) {
    window.removeEventListener('resize', window._orientChecker);
    window.removeEventListener('orientationchange', window._orientChecker);
    window._orientChecker = null;
  }
}
window.addEventListener('message', e => {
  if (!e.data) return;
  const iframe = document.getElementById('bizAnimFrame');

  // Iframe ready — send init state
  if (e.data.type === 'bizReady' && currentBizAnim) {
    const id = currentBizAnim;
    const upgrades = G.bizUpgrades?.[id] || {};
    iframe?.contentWindow?.postMessage({
      type: 'bizInit',
      money: G.money,
      ...Object.fromEntries(Object.entries(upgrades).map(([k,v]) => [k+'Level', v])),
      chairLevel:     upgrades.sillas    || 1,
      speedLevel:     upgrades.velocidad || 1,
      priceLevel:     upgrades.precio    || 1,
      marketingLevel: upgrades.marketing || 1,
    }, '*');
  }

  // Iframe earned money — sync to main game
  if (e.data.type === 'bizEarned') {
    const earned = e.data.earned || 0;
    const xp = e.data.xp || 0;
    if (earned > 0) {
      G.money += earned;
      G.totalEarned += earned;
      G.dailyEarned = (G.dailyEarned || 0) + earned;
      addXP(xp || earned * 0.05);
      spawnParticles(earned);
      checkAchievements();
      // Update header money without full re-render
      document.getElementById('hdrMoney').textContent = fmt(G.money);
      saveGame();
    }
  }

  // Iframe requests a purchase — validate and confirm/deny
  if (e.data.type === 'bizPurchase' && currentBizAnim) {
    const { upg, cost } = e.data;
    const id = currentBizAnim;
    // Stage animations: just handle money, no biz level
    if (id && id.startsWith('__stage_')) {
      if (G.money >= cost) {
        G.money -= cost;
        if (!G.bizUpgrades) G.bizUpgrades = {};
        if (!G.bizUpgrades[id]) G.bizUpgrades[id] = {};
        G.bizUpgrades[id][upg] = (G.bizUpgrades[id][upg] || 1) + 1;
        iframe?.contentWindow?.postMessage({ type:'purchaseOk', upg, newMoney:G.money }, '*');
        document.getElementById('hdrMoney').textContent = fmt(G.money);
        notify(`✅ ¡${upg} mejorado! -${fmt(cost)}`);
        saveGame();
      } else {
        iframe?.contentWindow?.postMessage({ type:'purchaseDenied' }, '*');
        notify('💸 Sin fondos');
      }
      return;
    }
    if (G.money >= cost) {
      G.money -= cost;
      // Persist upgrade level for this biz animation
      if (!G.bizUpgrades) G.bizUpgrades = {};
      if (!G.bizUpgrades[id]) G.bizUpgrades[id] = {};
      G.bizUpgrades[id][upg] = (G.bizUpgrades[id][upg] || 1) + 1;
      // The max level for an animation upgrade is 5, and there are 5 types of upgrades.
      // So max total upgrades is 25. The business level should exactly equal the sum of these upgrades.
      const upgradesObj = G.bizUpgrades[id];
      let sumLevels = 0;
      for (const key in upgradesObj) {
        sumLevels += (upgradesObj[key] || 1); // If they bought it, the value is its level. Minimum 1 if property exists.
      }
      
      // If none bought, it's level 1. If 1 upgrade is bought to lvl 2, it's level 2. 
      // However, base levels start at 1. Since upgrades start at 1, total sum of 5 upgrades at start would be 5...
      // Let's just use the user requested logic: total number of times ANY upgrade was purchased + 1 (base level).
      if (!G.businesses[id]) G.businesses[id] = { level: 1, progress: 0 };
      
      const prevLvl = G.businesses[id].level || 1;
      // New requested logic: 1 Upgrade bought = +1 Level
      const newLvl = Math.min(prevLvl + 1, BIZ_MAX_LEVEL);
      
      let leveledUp = false;
      if (newLvl > prevLvl) {
          G.businesses[id].level = newLvl;
          leveledUp = true;
      }

      // Confirm to iframe
      iframe?.contentWindow?.postMessage({
        type: 'purchaseOk',
        upg,
        newMoney: G.money,
      }, '*');
      // Update header money
      document.getElementById('hdrMoney').textContent = fmt(G.money);
      
      if (leveledUp) {
        notify(`🎉 ¡Negocio subió a Nv.${newLvl}!`);
        renderAll();
      } else {
        notify(`✅ ¡${upg} mejorado! (Alcanzaste el Nv máximo ${BIZ_MAX_LEVEL})`);
      }
      saveGame();
    } else {
      iframe?.contentWindow?.postMessage({ type: 'purchaseDenied' }, '*');
      notify(`💸 Sin fondos para la mejora`);
    }
  }
});

// ═══════════════════════════════════════════════
// GEMS SYSTEM
// ═══════════════════════════════════════════════
function addGems(n) {
  G.gems = (G.gems || 0) + n;
  document.getElementById('hdrGems').textContent = G.gems;
  notify(`💎 +${n} gema${n>1?'s':''}!`);
}

function openGemShop() {
  document.getElementById('gemBalance').textContent = `${G.gems || 0} 💎`;
  const list = document.getElementById('gemShopItems');
  list.innerHTML = GEM_ITEMS.map(item => {
    const canAfford = (G.gems || 0) >= item.cost;
    return `<div class="gem-item">
      <div class="gem-item-icon">${item.icon}</div>
      <div style="flex:1">
        <div class="gem-item-name">${item.name}</div>
        <div class="gem-item-desc">${item.desc}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="gem-item-cost">${item.cost} 💎</div>
        <button class="gem-item-btn" ${!canAfford ? 'disabled' : ''} onclick="buyGemItem('${item.id}')">Comprar</button>
      </div>
    </div>`;
  }).join('');
  document.getElementById('gemShopOverlay').classList.add('open');
}

function buyGemItem(id) {
  const item = GEM_ITEMS.find(i => i.id === id);
  if (!item || (G.gems || 0) < item.cost) return;
  G.gems -= item.cost;
  document.getElementById('hdrGems').textContent = G.gems;
  const now = Date.now();
  if (item.action === 'autoclicker') { G.autoClickerEnd = now + 5 * 60000; notify('🤖 Auto-Clicker activo por 5 minutos!'); }
  else if (item.action === 'offlineboost') { G.offlineBoostEnd = now + 3600000; notify('⚡ Boost offline x2 activo 1 hora!'); }
  else if (item.action === 'skipcd') { BUSINESSES.forEach(b => { if (G.businesses[b.id]) G.businesses[b.id].progress = 0.99; }); notify('⏩ ¡Cooldown reseteado!'); }
  else if (item.action === 'doublemult') { G.gemBoostEnd = now + 10 * 60000; notify('💎 Multiplicador x2 activo por 10 minutos!'); }
  document.getElementById('gemShopOverlay').classList.remove('open');
  renderAll(); saveGame();
}

// ═══════════════════════════════════════════════
// DAILY OBJECTIVES
// ═══════════════════════════════════════════════
function getDailyObjectives() {
  return getScaledObjectives();
}

function renderDailyObjectives() {
  const list = document.getElementById('dailyObjList');
  if (!list) return;
  const objs = getDailyObjectives();
  list.innerHTML = objs.map(obj => {
    const done = !!G.dailyObjClaimed?.[obj.id];
    const complete = obj.target(G);
    const prog = obj.prog(G);
    const max = obj.max(G);
    const pct = Math.min(prog / max * 100, 100);
    return `<div class="obj-card">
      <div class="obj-title">${obj.desc}</div>
      <div class="obj-prog-bar"><div class="obj-prog-fill" style="width:${pct}%"></div></div>
      <div class="obj-footer">
        <div class="obj-reward">💎 +${obj.reward} gemas</div>
        ${done ? '<div class="obj-done-badge">✅ Reclamado</div>' :
          complete ? `<button class="obj-claim-btn" onclick="claimObjective('${obj.id}',${obj.reward})">¡Reclamar!</button>` :
          `<div style="font-size:0.6rem;color:rgba(255,255,255,0.5);font-weight:900">${Math.floor(pct)}%</div>`}
      </div>
    </div>`;
  }).join('');
}

function claimObjective(id, reward) {
  if (!G.dailyObjClaimed) G.dailyObjClaimed = {};
  if (G.dailyObjClaimed[id]) return;
  G.dailyObjClaimed[id] = true;
  addGems(reward);
  navigator.vibrate?.([30, 50, 100]);
  renderDailyObjectives();
  saveGame();
}

// ═══════════════════════════════════════════════
// THEME SYSTEM
// ═══════════════════════════════════════════════
function setTheme(name) {
  G.theme = name;
  applyTheme(name);
  saveGame();
}

function applyTheme(name) {
  document.body.classList.remove('theme-neon','theme-fire');
  if (name === 'neon') document.body.classList.add('theme-neon');
  else if (name === 'fire') document.body.classList.add('theme-fire');
  document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
  const active = document.getElementById('theme-' + name);
  if (active) active.classList.add('active');
}

// ═══════════════════════════════════════════════
// NARRATIVE STORY BANNERS
// ═══════════════════════════════════════════════
let _lastStoryLevel = -1;
function checkStoryBanner() {
  if (G.level !== _lastStoryLevel && LEVEL_STORIES[G.level]) {
    _lastStoryLevel = G.level;
    const banner = document.getElementById('storyBanner');
    document.getElementById('storyText').textContent = LEVEL_STORIES[G.level];
    banner.classList.add('show');
    setTimeout(() => banner.classList.remove('show'), 8000);
  }
}

// ═══════════════════════════════════════════════
// MOBILE VIBRATION (already in buyBiz/upgrades)
// ═══════════════════════════════════════════════
// ═══════════════════════════════════════════════
function shareScore() {
  const txt = `🏘️ ¡Mi Imperio del Barrio! 💰${fmt(G.totalEarned)} ganados | Nivel ${G.level+1} | ⭐${G.prestigeStars} prestigios | ${BUSINESSES.filter(b=>bizLevel(b.id)>0).length} negocios abiertos 🔥 Juega en https://www.imperiodelbarrio.com`;
  if (navigator.share) {
    navigator.share({ title: 'Imperio del Barrio', text: txt, url: 'https://www.imperiodelbarrio.com' }).catch(()=>{});
  } else {
    navigator.clipboard?.writeText(txt).then(()=>notify('📋 ¡Score copiado!')).catch(()=>{
      prompt('Copia tu score:', txt);
    });
  }
}
// Save every 30s
setInterval(saveGame, 30000);

// ═══════════════════════════════════════════════
// NOTIFICATIONS & FX
// ═══════════════════════════════════════════════
function notify(msg) {
  const box = document.getElementById('notifBox');
  const el = document.createElement('div');
  el.className = 'notif-item';
  el.textContent = msg;
  box.appendChild(el);
  setTimeout(() => el.remove(), 3100);
}

function spawnMoney(amount) {
  const el = document.createElement('div');
  el.className = 'float-money';
  el.textContent = `+${fmt(amount)}`;
  el.style.left = (Math.random() * 50 + 25) + 'vw';
  el.style.bottom = '100px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

// ═══════════════════════════════════════════════
// PARTICLES
// ═══════════════════════════════════════════════
function spawnParticles(amount) {
  const count = Math.min(8, 3 + Math.floor(Math.log10(Math.max(1, amount))));
  const cx = window.innerWidth * (0.3 + Math.random() * 0.4);
  const cy = window.innerHeight * 0.5;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle coin-particle';
    const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
    const dist = 30 + Math.random() * 60;
    p.style.left = (cx + Math.cos(angle) * dist * 0.3) + 'px';
    p.style.top = (cy + Math.sin(angle) * 20) + 'px';
    p.style.animationDelay = (i * 0.06) + 's';
    p.style.animationDuration = (1.1 + Math.random() * 0.5) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
  // Float money text
  spawnMoney(amount);
}

// ═══════════════════════════════════════════════
// WEB AUDIO SOUND FX
// ═══════════════════════════════════════════════
let audioCtx = null;
function getAudio() {
  if (!audioCtx) try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){}
  return audioCtx;
}
function beep(freq, dur, type='sine', vol=0.15) {
  if (!G.soundOn) return;
  try {
    const ac = getAudio(); if (!ac) return;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + dur);
  } catch(e){}
}
function playSound(type) {
  if (!G.soundOn) return;
  if (type === 'ching') { beep(880, 0.08, 'triangle', 0.18); setTimeout(()=>beep(1100,0.1,'triangle',0.12), 80); setTimeout(()=>beep(1320,0.15,'sine',0.1),140); }
  else if (type === 'buy') { beep(440, 0.07, 'square', 0.1); setTimeout(()=>beep(660,0.12,'sine',0.1),80); }
  else if (type === 'levelup') { [523,659,784,1047].forEach((f,i)=>setTimeout(()=>beep(f,0.15,'sine',0.15),i*80)); }
  else if (type === 'achieve') { [784,880,1047,1320].forEach((f,i)=>setTimeout(()=>beep(f,0.1,'sine',0.12),i*60)); }
  else if (type === 'negotiate') { beep(330,0.04,'square',0.08); }
  else if (type === 'daily') { [523,659,784,1047,1320].forEach((f,i)=>setTimeout(()=>beep(f,0.1,'sine',0.15),i*70)); }
}
function toggleSound() {
  G.soundOn = !G.soundOn;
  const sb = document.getElementById('soundBtn');
  if (sb) sb.textContent = G.soundOn ? '🔊' : '🔇';
  saveGame();
}

// ═══════════════════════════════════════════════
// ACHIEVEMENTS
// ═══════════════════════════════════════════════
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (G.achievements[ach.id]) return;
    try { if (!ach.check()) return; } catch(e) { return; }
    G.achievements[ach.id] = true;
    if (ach.reward > 0) { G.money += ach.reward; G.totalEarned += ach.reward; }
    // Give 1-3 gems for achievements
    const gemReward = ach.reward >= 50000 ? 3 : ach.reward >= 10000 ? 2 : 1;
    G.gems = (G.gems || 0) + gemReward;
    document.getElementById('hdrGems').textContent = G.gems;
    showAchToast(ach);
    playSound('achieve');
    saveGame();
  });
}

function showAchToast(ach) {
  const toast = document.getElementById('achToast');
  document.getElementById('achToastIcon').textContent = ach.icon;
  document.getElementById('achToastName').textContent = `${ach.name}${ach.reward > 0 ? ' +'+fmt(ach.reward) : ''}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function renderAchievements() {
  const grid = document.getElementById('achGrid');
  if (!grid) return;
  grid.innerHTML = ACHIEVEMENTS.map((ach, i) => {
    const earned = !!G.achievements[ach.id];
    return `<div class="ach-card ${earned ? 'earned' : 'locked'}" style="animation-delay:${i*0.04}s">
      <div class="ach-icon">${ach.icon}</div>
      <div class="ach-info">
        <div class="ach-name">${ach.name}</div>
        <div class="ach-desc">${ach.desc}</div>
        ${ach.reward > 0 ? `<div class="ach-reward">🎁 +${fmt(ach.reward)}</div>` : ''}
      </div>
      ${earned ? '<div style="font-size:1.2rem">✅</div>' : '<div style="font-size:1rem;color:#ccc">🔒</div>'}
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════
// DAILY REWARD
// ═══════════════════════════════════════════════
function checkDaily() {
  const now = Date.now();
  const last = G.lastLogin || 0;
  const dayMs = 86400000;
  const diffDays = Math.floor((now - last) / dayMs);
  if (diffDays === 0) return; // already claimed today
  if (diffDays === 1) { G.loginStreak = (G.loginStreak || 0) + 1; }
  else if (diffDays > 1) { G.loginStreak = 1; } // reset streak
  G.lastLogin = now;
  showDailyPopup();
}

function showDailyPopup() {
  const streak = G.loginStreak || 1;
  const rewards = [1000, 2500, 5000, 10000, 20000, 50000, 100000];
  const reward = rewards[Math.min(streak - 1, rewards.length - 1)];
  const emojis = ['💰','💎','🌟','🚀','👑','🏆','🎊'];
  document.getElementById('dailyEmoji').textContent = emojis[Math.min(streak-1,6)];
  document.getElementById('dailyStreakTxt').textContent = `Racha: ${streak} día${streak>1?'s':''} seguido${streak>1?'s':''}`;
  document.getElementById('dailyRewardTxt').textContent = `+${fmt(reward)}`;
  const daysEl = document.getElementById('dailyDays');
  daysEl.innerHTML = Array.from({length:7},(_,i)=>{
    const cls = i < streak-1 ? 'done' : i === streak-1 ? 'today' : '';
    return `<div class="dd ${cls}">${cls==='done'?'✅':cls==='today'?'⭐':'D'+(i+1)}</div>`;
  }).join('');
  window._dailyReward = reward;
  document.getElementById('dailyPopup').classList.add('open');
}

function claimDaily() {
  const reward = window._dailyReward || 1000;
  G.money += reward;
  G.totalEarned += reward;
  document.getElementById('dailyPopup').classList.remove('open');
  notify(`🎁 ¡Recompensa diaria! +${fmt(reward)}`);
  playSound('daily');
  spawnParticles(reward);
  checkAchievements();
  renderAll();
  saveGame();
}

// ═══════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// MINI-GAME ENGINE — 5 juegos de negociación
// ═══════════════════════════════════════════════════════════════════

let _mgState = null;          // current game state
let _mgRaf   = null;          // requestAnimationFrame handle
let _mgIv    = null;          // setInterval handle (memory/snake/wordfind)
let _mgBizIncome = 0;
let _mgBizName   = '';
let _mgBizId     = '';

const MINI_GAMES = ['runner', 'wordfind', 'memory', 'catcher', 'snake'];

// Pick a game — avoid repeating the last one
let _lastMiniGame = '';
function pickMiniGame() {
  const pool = MINI_GAMES.filter(g => g !== _lastMiniGame);
  const pick = pool[Math.floor(Math.random() * pool.length)];
  _lastMiniGame = pick;
  return pick;
}

// ── Public entry: called from "🎮 Jugar" button ───────────────────
function openNegotiate(id, name, income) {
  _mgBizId     = id;
  _mgBizName   = name;
  _mgBizIncome = income;
  const game   = pickMiniGame();
  launchMiniGame(game);
}

function launchMiniGame(game) {
  // Clean up any previous game
  cancelAnimationFrame(_mgRaf);
  clearInterval(_mgIv);
  _mgRaf = null;
  _mgIv  = null;
  _mgState = null;
  document.removeEventListener('keydown', _mgKeyHandler);
  document.removeEventListener('keyup',   _mgKeyHandler);
  document.getElementById('mgResult').style.display = 'none';
  document.getElementById('mgControls').innerHTML = '';

  const overlay = document.getElementById('miniGameOverlay');
  overlay.style.display = 'flex';

  const subtitles = {
    runner:   '🏃 Salta los obstáculos para ganar',
    wordfind: '🔤 Forma palabras antes de que acabe el tiempo',
    memory:   '🃏 Encuentra los pares de tarjetas',
    catcher:  '🪣 Atrapa los billetes que caen',
    snake:    '🐍 Come los billetes sin chocarte',
  };
  document.getElementById('mgSubtitle').textContent = subtitles[game] || 'Completa el reto para ganar bonus';

  // Launch
  if (game === 'runner')   startRunner();
  if (game === 'wordfind') startWordFind();
  if (game === 'memory')   startMemory();
  if (game === 'catcher')  startCatcher();
  if (game === 'snake')    startSnake();
}

function closeMiniGame() {
  cancelAnimationFrame(_mgRaf);
  clearInterval(_mgIv);
  _mgRaf = null;
  _mgIv  = null;
  _mgState = null;
  document.getElementById('miniGameOverlay').style.display = 'none';
  document.getElementById('mgControls').innerHTML = '';
  document.removeEventListener('keydown', _mgKeyHandler);
  document.removeEventListener('keyup',   _mgKeyHandler);
}

function playMiniGameAgain() {
  const game = pickMiniGame();
  launchMiniGame(game);
}

function _mgFinish(won, score) {
  cancelAnimationFrame(_mgRaf);
  clearInterval(_mgIv);
  _mgRaf = null;
  _mgIv  = null;
  document.getElementById('mgControls').innerHTML = '';
  document.removeEventListener('keydown', _mgKeyHandler);
  document.removeEventListener('keyup',   _mgKeyHandler);

  const multiplier = won ? Math.max(1, Math.min(score / 10, 10)) : 0.1;
  const bonus = Math.floor(_mgBizIncome * 2.4 * multiplier); // reducido 70%

  if (bonus > 0) {
    G.money += bonus;
    G.totalEarned += bonus;
    G.dailyEarned = (G.dailyEarned || 0) + bonus;
    G.negotiateCount = (G.negotiateCount || 0) + 1;
    G.dailyNegotiations = (G.dailyNegotiations || 0) + 1;
    trackW?.('weeklyNego');
    spawnParticles(bonus);
    playSound('ching');
    checkAchievements();
    saveGame();
  }

  const result = document.getElementById('mgResult');
  const text   = document.getElementById('mgResultText');
  result.style.display = 'block';
  text.innerHTML = won
    ? `🎉 ¡Ganaste! <span style="color:#2DC653">+${fmt(bonus)}</span> para ${_mgBizName}`
    : `💸 Casi... +${fmt(bonus)} de consolación`;
  notify(won ? `🎮 +${fmt(bonus)} ganado en mini-juego!` : `🎮 Mejor suerte la próxima. +${fmt(bonus)}`);
}

// ── Canvas helpers ────────────────────────────────────────────────
function _mgCtx() {
  const c = document.getElementById('mgCanvas');
  // Ajustar canvas al tamaño real disponible (fix Chrome/móvil)
  const wrap = document.getElementById('mgCanvasWrap') || c.parentElement;
  const availW = Math.floor(wrap.clientWidth || 360);
  const ratio = window.devicePixelRatio || 1;
  // Mantener proporción 360:320 = 9:8
  const newW = Math.min(availW, 400);
  const newH = Math.round(newW * (320 / 360));
  if (c.width !== newW || c.height !== newH) {
    c.width  = newW;
    c.height = newH;
    c.style.width  = newW + 'px';
    c.style.height = newH + 'px';
  }
  return { ctx: c.getContext('2d'), W: c.width, H: c.height, canvas: c };
}

// ── Keyboard handler ref (removable) ─────────────────────────────
let _mgKeyHandler = () => {};

// ══════════════════════════════════════════════════════════════════
// GAME 1: RUNNER — salta obstáculos 🏃
// ══════════════════════════════════════════════════════════════════
function startRunner() {
  document.getElementById('mgTitle').textContent = '🏃 Corre por el Barrio';
  const { ctx, W, H } = _mgCtx();

  const GROUND = H - 50;
  const st = {
    player: { x: 60, y: GROUND, vy: 0, onGround: true, w: 32, h: 40 },
    obstacles: [],
    coins: [],
    speed: 4,
    score: 0,
    frame: 0,
    alive: true,
    distance: 0,
    bgOffset: 0,
  };
  _mgState = st;

  const jump = () => {
    if (st.player.onGround && st.alive) {
      st.player.vy = -14;
      st.player.onGround = false;
      playSound('negotiate');
    }
  };

  // Touch / click
  const canvas = document.getElementById('mgCanvas');
  canvas.onclick = (e) => { e.stopPropagation(); jump(); };
  canvas.ontouchstart = (e) => { e.preventDefault(); e.stopPropagation(); jump(); };

  // Keyboard
  _mgKeyHandler = (e) => { if (e.code === 'Space' || e.code === 'ArrowUp') jump(); };
  document.addEventListener('keydown', _mgKeyHandler);

  // Mobile button
  document.getElementById('mgControls').innerHTML =
    `<button onclick="" id="runnerJumpBtn" style="background:linear-gradient(135deg,#FFE135,#FF9800);border:3px solid #1E1B2E;border-radius:99px;font-family:'Fredoka One',cursive;font-size:1.1rem;padding:12px 32px;cursor:pointer;box-shadow:0 4px 0 #1E1B2E;color:#1E1B2E;">⬆️ SALTAR</button>`;
  document.getElementById('runnerJumpBtn').addEventListener('click', (e)=>{ e.stopPropagation(); jump(); });
  document.getElementById('runnerJumpBtn').addEventListener('touchstart', (e)=>{ e.preventDefault(); e.stopPropagation(); jump(); });

  // Characters / obstacles pool
  const OBSTACLES = ['🚧','🛑','🏗️','📦','🚌'];
  const COINS_SET = ['💰','💵','💴'];

  function spawnObstacle() {
    st.obstacles.push({ x: W + 20, y: GROUND - 10, type: OBSTACLES[Math.floor(Math.random()*OBSTACLES.length)] });
  }
  function spawnCoin() {
    const yPos = GROUND - 20 - Math.random() * 60;
    st.coins.push({ x: W + 20, y: yPos, type: COINS_SET[Math.floor(Math.random()*COINS_SET.length)], collected: false });
  }

  let nextObs = 80, nextCoin = 40;

  function loop() {
    if (!st.alive || document.getElementById('miniGameOverlay').style.display === 'none') return;
    _mgRaf = requestAnimationFrame(loop);
    st.frame++;
    st.distance++;
    st.bgOffset = (st.bgOffset + st.speed * 0.5) % W;
    st.speed = 4 + st.distance / 400;

    // Physics
    st.player.vy += 0.7;
    st.player.y += st.player.vy;
    if (st.player.y >= GROUND) {
      st.player.y = GROUND;
      st.player.vy = 0;
      st.player.onGround = true;
    }

    // Spawn
    nextObs--;
    if (nextObs <= 0) { spawnObstacle(); nextObs = 60 + Math.random() * 60; }
    nextCoin--;
    if (nextCoin <= 0) { spawnCoin(); nextCoin = 40 + Math.random() * 40; }

    // Move obstacles
    st.obstacles.forEach(o => { o.x -= st.speed; });
    st.obstacles = st.obstacles.filter(o => o.x > -40);
    st.coins.forEach(c => { c.x -= st.speed; });
    st.coins = st.coins.filter(c => c.x > -40);

    // Collision: obstacles
    const px = st.player.x, py = st.player.y - st.player.h;
    for (const o of st.obstacles) {
      if (Math.abs(o.x - px - 10) < 22 && Math.abs(o.y - py - 20) < 28) {
        st.alive = false;
        _mgFinish(st.score >= 8, st.score);
        draw();
        return;
      }
    }

    // Collect coins
    st.coins.forEach(c => {
      if (!c.collected && Math.abs(c.x - px - 10) < 24 && Math.abs(c.y - (py + 20)) < 24) {
        c.collected = true;
        st.score++;
      }
    });

    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // ── Bright daytime sky ──────────────────────────────────────────
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0,   '#1565C0');   // deep blue top
    sky.addColorStop(0.45,'#42A5F5');   // bright mid-sky
    sky.addColorStop(0.75,'#90CAF9');   // light horizon
    sky.addColorStop(1,   '#BBDEFB');   // near-white near ground
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // ── Sun ──────────────────────────────────────────────────────────
    ctx.fillStyle = '#FFD600';
    ctx.shadowColor = 'rgba(255,214,0,0.6)'; ctx.shadowBlur = 24;
    ctx.beginPath(); ctx.arc(W - 48, 40, 22, 0, Math.PI * 2); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;

    // ── Clouds ───────────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    [[50,28,56,20],[170,16,64,22],[290,34,50,18]].forEach(([cx,cy,cw,ch]) => {
      const ox = ((cx - st.bgOffset * 0.15) % (W + 80) + W + 80) % (W + 80) - 40;
      ctx.beginPath();
      ctx.ellipse(ox,          cy,      cw*0.55, ch*0.7,  0, 0, Math.PI*2);
      ctx.ellipse(ox + cw*0.35,cy-ch*0.4, cw*0.5, ch*0.65, 0, 0, Math.PI*2);
      ctx.ellipse(ox + cw*0.7, cy,      cw*0.5, ch*0.55, 0, 0, Math.PI*2);
      ctx.fill();
    });

    // ── Background buildings ─────────────────────────────────────────
    [[15,50,38,90],[70,35,32,105],[120,55,44,85],[190,30,36,110],
     [245,48,40,90],[295,38,34,100],[340,52,36,88]].forEach(([bx,by,bw,bh]) => {
      const ox = ((bx - st.bgOffset * 0.3) % (W + 60) + W + 60) % (W + 60) - 30;
      ctx.fillStyle = '#1565C0';
      ctx.globalAlpha = 0.28;
      ctx.fillRect(ox, by, bw, bh);
      ctx.globalAlpha = 0.38;
      ctx.fillStyle = '#FFE082';
      for (let wy = by+8; wy < by+bh-8; wy += 14)
        for (let wx = ox+5; wx < ox+bw-5; wx += 11)
          ctx.fillRect(wx, wy, 6, 8);
      ctx.globalAlpha = 1;
    });

    // ── Ground ───────────────────────────────────────────────────────
    const gY = GROUND + st.player.h;
    // grass
    ctx.fillStyle = '#43A047';
    ctx.fillRect(0, gY, W, H - gY);
    // dark edge
    ctx.fillStyle = '#2E7D32';
    ctx.fillRect(0, gY, W, 5);
    // pavement
    ctx.fillStyle = '#A5D6A7';
    ctx.fillRect(0, gY + 5, W, 12);
    // tile joints
    ctx.fillStyle = '#81C784';
    for (let i = -1; i < W / 42 + 1; i++) {
      const tx = ((i * 42) - (st.bgOffset * 0.85) % 42 + 42) % (W + 42) - 21;
      ctx.fillRect(tx, gY + 5, 2, 12);
    }

    // ── Drop-shadow emoji helper ──────────────────────────────────────
    function drawE(emoji, x, y, size) {
      ctx.shadowColor = 'rgba(0,0,0,0.7)';
      ctx.shadowBlur  = 8;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 4;
      ctx.font = size + 'px serif';
      ctx.fillText(emoji, x, y);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur  = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    // ── Coins ─────────────────────────────────────────────────────────
    st.coins.forEach(c => { if (!c.collected) drawE(c.type, c.x + 13, c.y + 28, 28); });

    // ── Obstacles ────────────────────────────────────────────────────
    st.obstacles.forEach(o => drawE(o.type, o.x + 16, o.y + 38, 38));

    // ── Player (flipped to face right toward obstacles) ───────────────
    ctx.save();
    ctx.scale(-1, 1);
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur  = 8;
    ctx.shadowOffsetX = -3;
    ctx.shadowOffsetY = 4;
    ctx.font = '40px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('🏃', -(st.player.x + 16), st.player.y + st.player.h + 6);
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
    ctx.restore();

    // ── HUD pill ─────────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.beginPath(); ctx.roundRect(6, 6, 210, 30, 8); ctx.fill();
    ctx.fillStyle = '#FFE135';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('💰 ' + st.score + '   📏 ' + Math.floor(st.distance/10) + 'm', 14, 21);

    // ── Game-over overlay ─────────────────────────────────────────────
    if (!st.alive) {
      ctx.fillStyle = 'rgba(180,20,20,0.6)';
      ctx.fillRect(0, 0, W, H);
      ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 12;
      ctx.fillStyle = 'white';
      ctx.font = 'bold 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('¡CRASH! 💥', W/2, H/2);
      ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
    }
  }

  loop();
}

// ══════════════════════════════════════════════════════════════════
// GAME 2: WORD FIND — completa palabras 🔤
// ══════════════════════════════════════════════════════════════════
function startWordFind() {
  document.getElementById('mgTitle').textContent = '🔤 Palabras del Barrio';
  const { ctx, W, H } = _mgCtx();

  const WORDS = [
    { word: 'BARRIO', hint: '🏘️ Donde vivimos' },
    { word: 'NEGOCIO', hint: '🏪 Lo que manejamos' },
    { word: 'DINERO', hint: '💵 Lo que ganamos' },
    { word: 'COLMADO', hint: '🛒 La tiendita' },
    { word: 'CLIENTE', hint: '👤 El que paga' },
    { word: 'GANANCIAS', hint: '📈 El resultado' },
    { word: 'EMPRESA', hint: '🏢 Organización' },
    { word: 'MERCADO', hint: '🛍️ Donde vendemos' },
    { word: 'SOCIO', hint: '🤝 Compañero' },
    { word: 'PRECIO', hint: '🏷️ Cuánto cuesta' },
    { word: 'BILLETE', hint: '💴 Papel de dinero' },
    { word: 'CAPITAL', hint: '💰 Dinero inicial' },
  ];

  const chosen = WORDS[Math.floor(Math.random() * WORDS.length)];
  const word = chosen.word;

  // Build scramble — shuffle letters + add 3 random extras
  const extra = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let pool = word.split('');
  for (let i = 0; i < 3; i++) pool.push(extra[Math.floor(Math.random()*extra.length)]);
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const st = {
    word, hint: chosen.hint, pool,
    selected: [],    // indices into pool
    formed: '',
    timeLeft: 20,
    done: false,
    score: 0,
    rounds: 0,
    maxRounds: 3,
  };
  _mgState = st;

  _mgIv = setInterval(() => {
    if (!st.done) {
      st.timeLeft--;
      if (st.timeLeft <= 0) { clearInterval(_mgIv); endWord(false); }
      drawWord();
    }
  }, 1000);

  function endWord(won) {
    clearInterval(_mgIv);
    if (won) {
      st.score += 3;
      playSound('ching');
    }
    st.rounds++;
    if (st.rounds >= st.maxRounds || !won && st.rounds >= 2) {
      st.done = true;
      _mgFinish(st.score >= 3, st.score);
      drawWord();
      document.getElementById('mgControls').innerHTML = '';
      return;
    }
    // Next word
    setTimeout(() => {
      const next = WORDS[Math.floor(Math.random() * WORDS.length)];
      st.word = next.word;
      st.hint = next.hint;
      let p2 = next.word.split('');
      for (let i = 0; i < 3; i++) p2.push(extra[Math.floor(Math.random()*extra.length)]);
      for (let i = p2.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [p2[i], p2[j]] = [p2[j], p2[i]];
      }
      st.pool = p2;
      st.selected = [];
      st.formed = '';
      st.timeLeft = 20;
      renderWordButtons();
      _mgIv = setInterval(() => {
        if (!st.done) {
          st.timeLeft--;
          if (st.timeLeft <= 0) { clearInterval(_mgIv); endWord(false); }
          drawWord();
        }
      }, 1000);
      drawWord();
    }, 800);
  }

  function selectLetter(i) {
    if (st.done) return;
    if (st.selected.includes(i)) {
      st.selected = st.selected.filter(x => x !== i);
    } else {
      st.selected.push(i);
    }
    st.formed = st.selected.map(x => st.pool[x]).join('');
    if (st.formed === st.word) { clearInterval(_mgIv); endWord(true); }
    drawWord();
    renderWordButtons();
  }

  function renderWordButtons() {
    const ctrl = document.getElementById('mgControls');
    ctrl.innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;">${
      st.pool.map((l, i) => {
        const sel = st.selected.includes(i);
        return `<button onclick="window._wfSelect(${i})" style="width:40px;height:40px;border-radius:10px;border:2px solid ${sel?'#FFE135':'rgba(255,255,255,0.2)'};background:${sel?'rgba(255,225,53,0.25)':'rgba(255,255,255,0.07)'};color:${sel?'#FFE135':'white'};font-family:'Fredoka One',cursive;font-size:1.1rem;cursor:pointer;">${l}</button>`;
      }).join('')
    }</div>`;
  }
  window._wfSelect = selectLetter;

  function drawWord() {
    ctx.clearRect(0, 0, W, H);

    // BG
    const bg = ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0, '#0d1f3a');
    bg.addColorStop(1, '#1a0d3a');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,W,H);

    // Hint
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '18px serif';
    ctx.fillText(st.hint, W/2, 40);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '700 13px Nunito, sans-serif';
    ctx.fillText(`Pista: ${st.hint}`, W/2, 40);

    // Timer bar
    const barW = (W - 40) * (st.timeLeft / 20);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.roundRect?.(20, 60, W-40, 10, 5); ctx.fill?.();
    const barColor = st.timeLeft > 10 ? '#2DC653' : st.timeLeft > 5 ? '#FFE135' : '#FF4757';
    ctx.fillStyle = barColor;
    ctx.roundRect?.(20, 60, Math.max(0, barW), 10, 5); ctx.fill?.();

    // Word blanks
    const cellW = Math.min(36, (W - 40) / st.word.length);
    const startX = W/2 - (st.word.length * cellW)/2;
    for (let i = 0; i < st.word.length; i++) {
      const x = startX + i * cellW;
      const letter = st.formed[i] || '';
      ctx.strokeStyle = letter ? '#FFE135' : 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 2, 85, cellW - 6, cellW - 4);
      if (letter) {
        ctx.fillStyle = '#FFE135';
        ctx.font = `bold ${Math.min(22, cellW-6)}px Fredoka One, cursive`;
        ctx.fillText(letter, x + cellW/2, 85 + (cellW-4)/2);
      }
    }

    // Status
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '700 12px Nunito, sans-serif';
    ctx.fillText(`Ronda ${st.rounds+1}/${st.maxRounds} · Puntos: ${st.score} · ⏱ ${st.timeLeft}s`, W/2, 148);

    if (st.formed === st.word) {
      ctx.fillStyle = 'rgba(45,198,83,0.3)';
      ctx.fillRect(0,0,W,H);
      ctx.fillStyle = '#2DC653';
      ctx.font = 'bold 22px Fredoka One, cursive';
      ctx.fillText('¡CORRECTO! 🎉', W/2, H/2);
    }
  }

  drawWord();
  renderWordButtons();
}

// ══════════════════════════════════════════════════════════════════
// GAME 3: MEMORY — encuentra los pares 🃏
// ══════════════════════════════════════════════════════════════════
function startMemory() {
  document.getElementById('mgTitle').textContent = '🃏 Memoria del Barrio';

  const EMOJIS = ['💰','🏪','🛒','🚀','💎','🏆','🤝','🎯'];
  const pairs = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);

  const st = {
    cards: pairs.map((e, i) => ({ emoji: e, id: i, flipped: false, matched: false })),
    flipped: [],
    moves: 0,
    matches: 0,
    timeLeft: 45,
    done: false,
    blocked: false,
  };
  _mgState = st;

  _mgIv = setInterval(() => {
    if (!st.done) {
      st.timeLeft--;
      renderMemory();
      if (st.timeLeft <= 0) {
        clearInterval(_mgIv);
        st.done = true;
        _mgFinish(st.matches >= 4, st.matches);
      }
    }
  }, 1000);

  function flip(i) {
    if (st.done || st.blocked) return;
    const card = st.cards[i];
    if (card.flipped || card.matched) return;
    card.flipped = true;
    st.flipped.push(i);
    playSound('negotiate');

    if (st.flipped.length === 2) {
      st.blocked = true;
      st.moves++;
      const [a, b] = st.flipped;
      if (st.cards[a].emoji === st.cards[b].emoji) {
        st.cards[a].matched = true;
        st.cards[b].matched = true;
        st.matches++;
        st.flipped = [];
        st.blocked = false;
        playSound('ching');
        if (st.matches === EMOJIS.length) {
          clearInterval(_mgIv);
          st.done = true;
          renderMemory();
          setTimeout(() => _mgFinish(true, 10 + Math.max(0, 45 - st.timeLeft < 20 ? 5 : 0)), 500);
        }
      } else {
        setTimeout(() => {
          st.cards[a].flipped = false;
          st.cards[b].flipped = false;
          st.flipped = [];
          st.blocked = false;
          renderMemory();
        }, 900);
      }
    }
    renderMemory();
  }

  window._memFlip = flip;

  function renderMemory() {
    const ctrl = document.getElementById('mgControls');
    // Timer bar at top via canvas
    const { ctx, W, H } = _mgCtx();
    ctx.clearRect(0,0,W,H);
    const bg = ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#0d1f1d');
    bg.addColorStop(1,'#1a2d1a');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,W,H);

    // Timer
    const barW = (W-32) * (st.timeLeft/45);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(16,8,W-32,8);
    ctx.fillStyle = st.timeLeft > 20 ? '#2DC653' : st.timeLeft > 10 ? '#FFE135' : '#FF4757';
    ctx.fillRect(16,8,Math.max(0,barW),8);

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '700 12px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Pares: ${st.matches}/${EMOJIS.length} · Movimientos: ${st.moves} · ⏱ ${st.timeLeft}s`, W/2, 30);

    ctrl.innerHTML = `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:100%;max-width:280px;">${
      st.cards.map((c, i) => {
        const show = c.flipped || c.matched;
        const bg = c.matched ? 'rgba(45,198,83,0.25)' : show ? 'rgba(255,225,53,0.2)' : 'rgba(255,255,255,0.07)';
        const border = c.matched ? '#2DC653' : show ? '#FFE135' : 'rgba(255,255,255,0.15)';
        return `<button onclick="window._memFlip(${i})" style="aspect-ratio:1;border-radius:10px;border:2px solid ${border};background:${bg};font-size:1.4rem;cursor:pointer;transition:all 0.2s;">${show ? c.emoji : '❓'}</button>`;
      }).join('')
    }</div>`;
  }

  renderMemory();
  document.getElementById('mgControls').style.justifyContent = 'center';
}

// ══════════════════════════════════════════════════════════════════
// GAME 4: CATCHER — atrapa los billetes 🪣
// ══════════════════════════════════════════════════════════════════
function startCatcher() {
  document.getElementById('mgTitle').textContent = '🪣 Atrapa los Billetes';
  const { ctx, W, H, canvas } = _mgCtx();

  const BUCKET_W = 72, BUCKET_H = 36;
  let finished = false;

  const st = {
    bucketX: W / 2 - BUCKET_W / 2,
    bucketTarget: W / 2 - BUCKET_W / 2,
    items: [],
    score: 0,
    misses: 0,
    maxMisses: 5,
    timeLeft: 25,
    frame: 0,
    nextSpawn: 25,
  };
  _mgState = st;

  // ── Timer (uses RAF delta instead of setInterval to avoid drift) ─
  let lastTick = performance.now();

  // ── Input — touch/mouse move bucket ──────────────────────────────
  function getBucketX(clientX) {
    const rect = canvas.getBoundingClientRect();
    return (clientX - rect.left) * (W / rect.width) - BUCKET_W / 2;
  }
  canvas.ontouchstart = canvas.ontouchmove = (e) => {
    e.preventDefault();
    st.bucketTarget = Math.max(0, Math.min(W - BUCKET_W, getBucketX(e.touches[0].clientX)));
  };
  canvas.onmousemove = (e) => {
    st.bucketTarget = Math.max(0, Math.min(W - BUCKET_W, getBucketX(e.clientX)));
  };

  // ── Keyboard ──────────────────────────────────────────────────────
  let keys = {};
  _mgKeyHandler = (e) => { keys[e.code] = e.type === 'keydown'; };
  document.addEventListener('keydown', _mgKeyHandler);
  document.addEventListener('keyup',  _mgKeyHandler);

  // ── Mobile buttons ────────────────────────────────────────────────
  document.getElementById('mgControls').innerHTML =
    `<button id="mcLeft"  style="background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.2);border-radius:14px;color:white;font-size:1.6rem;padding:10px 28px;cursor:pointer;user-select:none;">◀</button>
     <button id="mcRight" style="background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.2);border-radius:14px;color:white;font-size:1.6rem;padding:10px 28px;cursor:pointer;user-select:none;">▶</button>`;

  ['mcLeft','mcRight'].forEach((id, i) => {
    const dir = i === 0 ? -1 : 1;
    const btn = document.getElementById(id);
    let held = false;
    const press = (e) => { e.preventDefault(); held = true; };
    const release = () => { held = false; };
    btn.addEventListener('mousedown',  press);
    btn.addEventListener('touchstart', press,   { passive: false });
    btn.addEventListener('mouseup',    release);
    btn.addEventListener('touchend',   release);
    btn.addEventListener('mouseleave', release);
    // Poll held state in loop via closure
    btn._held = () => held;
    btn._dir  = dir;
  });

  // ── Item types ────────────────────────────────────────────────────
  const FALL_ITEMS = [
    { emoji: '💵', value:  1, spd: 2.5 },
    { emoji: '💴', value:  2, spd: 3.0 },
    { emoji: '💰', value:  3, spd: 2.8 },
    { emoji: '💎', value:  5, spd: 2.0 },
    { emoji: '💣', value: -1, spd: 4.5 }, // bomb — costs a miss
  ];

  // ── End game (called exactly once) ───────────────────────────────
  function endGame() {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(_mgRaf);
    document.removeEventListener('keydown', _mgKeyHandler);
    document.removeEventListener('keyup',   _mgKeyHandler);
    _mgFinish(st.score >= 8, st.score);
  }

  // ── Main loop ────────────────────────────────────────────────────
  function loop(now) {
    if (finished) return;
    _mgRaf = requestAnimationFrame(loop);
    st.frame++;

    // 1s timer using real time
    if (now - lastTick >= 1000) {
      lastTick = now;
      st.timeLeft--;
      if (st.timeLeft <= 0) { endGame(); return; }
    }

    // Keyboard / button move
    const btnLeft  = document.getElementById('mcLeft');
    const btnRight = document.getElementById('mcRight');
    const spd = 9 + st.frame * 0.005;
    if (keys['ArrowLeft']  || btnLeft?._held?.())  st.bucketTarget = Math.max(0,         st.bucketTarget - spd);
    if (keys['ArrowRight'] || btnRight?._held?.()) st.bucketTarget = Math.min(W-BUCKET_W, st.bucketTarget + spd);

    // Smooth bucket follow
    st.bucketX += (st.bucketTarget - st.bucketX) * 0.25;

    // Spawn items
    st.nextSpawn--;
    if (st.nextSpawn <= 0) {
      const tmpl = FALL_ITEMS[Math.floor(Math.random() * FALL_ITEMS.length)];
      st.items.push({ x: 16 + Math.random() * (W - 48), y: -24, ...tmpl, spd: tmpl.spd + st.frame * 0.003 });
      st.nextSpawn = 18 + Math.floor(Math.random() * 18);
    }

    // Move + collision
    const bucketTop = H - BUCKET_H - 16;
    st.items = st.items.filter(it => {
      it.y += it.spd;
      const caught = it.y + 16 >= bucketTop && it.y - 16 <= bucketTop + BUCKET_H
                  && it.x + 16 >= st.bucketX && it.x - 16 <= st.bucketX + BUCKET_W;
      if (caught) {
        if (it.value > 0) { st.score += it.value; try { playSound('ching'); } catch(e){} }
        else { st.misses++; try { playSound('negotiate'); } catch(e){} }
        if (st.misses >= st.maxMisses) { endGame(); return false; }
        return false;
      }
      if (it.y > H + 20) {
        if (it.value > 0) { st.misses++; if (st.misses >= st.maxMisses) { endGame(); return false; } }
        return false;
      }
      return true;
    });

    draw();
  }

  function draw() {
    // ── Vibrant gradient sky ────────────────────────────────────────
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0,   '#FF6B35');
    bg.addColorStop(0.4, '#E91E8C');
    bg.addColorStop(0.75,'#5C35CC');
    bg.addColorStop(1,   '#1A0A3E');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // ── Stars ────────────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    for (let i = 0; i < 28; i++) {
      const sx = (i * 67 + 11) % W;
      const sy = (i * 41 + 7)  % (H * 0.65);
      ctx.fillRect(sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
    }

    // ── City silhouette ──────────────────────────────────────────────
    ctx.fillStyle = 'rgba(10,0,30,0.75)';
    [[0,H-60,30,60],[30,H-80,25,80],[55,H-50,20,50],[75,H-95,30,95],
     [105,H-65,25,65],[130,H-110,35,110],[165,H-70,20,70],[185,H-90,30,90],
     [215,H-55,22,55],[237,H-100,28,100],[265,H-75,25,75],[290,H-88,30,88],
     [320,H-60,22,60],[342,H-80,18,80]
    ].forEach(([bx,by,bw,bh]) => {
      ctx.fillRect(bx, by, bw, bh);
      ctx.fillStyle = 'rgba(255,230,80,0.65)';
      for (let wy=by+6; wy<by+bh-6; wy+=10)
        for (let wx=bx+4; wx<bx+bw-4; wx+=8)
          if (Math.sin(wx*wy) > 0.1) ctx.fillRect(wx, wy, 5, 6);
      ctx.fillStyle = 'rgba(10,0,30,0.75)';
    });

    // ── Ground / road ────────────────────────────────────────────────
    ctx.fillStyle = '#1A0A3E';
    ctx.fillRect(0, H - 16, W, 16);
    ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 2;
    ctx.setLineDash([18, 10]);
    ctx.beginPath(); ctx.moveTo(0, H - 8); ctx.lineTo(W, H - 8); ctx.stroke();
    ctx.setLineDash([]);

    // ── Falling items with glow ──────────────────────────────────────
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    st.items.forEach(it => {
      ctx.shadowColor = it.value > 0 ? 'rgba(255,220,0,0.95)' : 'rgba(255,50,50,0.95)';
      ctx.shadowBlur  = 18;
      ctx.font = '36px serif';
      ctx.fillText(it.emoji, it.x, it.y);
    });
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;

    // ── Bucket — neon gold ───────────────────────────────────────────
    const bx = st.bucketX, by = H - BUCKET_H - 16;
    ctx.shadowColor = 'rgba(255,215,0,0.8)'; ctx.shadowBlur = 18;
    ctx.fillStyle = '#B8860B';
    ctx.beginPath();
    ctx.moveTo(bx + 8, by); ctx.lineTo(bx + BUCKET_W - 8, by);
    ctx.lineTo(bx + BUCKET_W + 2, by + BUCKET_H);
    ctx.lineTo(bx - 2, by + BUCKET_H);
    ctx.closePath(); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(bx - 4, by - 5, BUCKET_W + 8, 8);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(bx + 8, by + 2, 12, BUCKET_H - 10);
    ctx.font = '22px serif';
    ctx.fillText('🪣', bx + BUCKET_W / 2, by + BUCKET_H / 2 + 2);

    // ── HUD ──────────────────────────────────────────────────────────
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath(); ctx.roundRect(4, 4, 122, 28, 8); ctx.fill();
    ctx.font = '14px serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    const hearts = Array(st.maxMisses).fill(0)
      .map((_,i) => i < st.maxMisses - st.misses ? '❤️' : '🖤').join('');
    ctx.fillText(hearts, 10, 18);

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath(); ctx.roundRect(W - 144, 4, 140, 28, 8); ctx.fill();
    ctx.fillStyle = '#FFE135'; ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText('💰 ' + st.score + '   ⏱ ' + st.timeLeft + 's', W - 10, 18);
  }

  _mgRaf = requestAnimationFrame(loop);
}

// ══════════════════════════════════════════════════════════════════
// GAME 5: SNAKE — come los billetes 🐍
// ══════════════════════════════════════════════════════════════════
function startSnake() {
  document.getElementById('mgTitle').textContent = '🐍 La Culebra del Barrio';
  const { ctx, W, H } = _mgCtx();

  const CELL = 24;
  const COLS = Math.floor(W / CELL);
  const ROWS = Math.floor((H - 40) / CELL);
  const OFFSET_Y = 40;

  const st = {
    snake: [{ x: Math.floor(COLS/2), y: Math.floor(ROWS/2) }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: [],
    score: 0,
    alive: true,
    frame: 0,
    speed: 8, // frames per move
  };
  _mgState = st;

  function spawnFood() {
    const FOOD_TYPES = [
      { emoji:'💵', value:1 },
      { emoji:'💴', value:2 },
      { emoji:'💰', value:3 },
    ];
    let pos;
    do { pos = { x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS) }; }
    while (st.snake.some(s => s.x === pos.x && s.y === pos.y));
    const t = FOOD_TYPES[Math.floor(Math.random()*FOOD_TYPES.length)];
    st.food.push({ ...pos, ...t });
  }
  spawnFood(); spawnFood();

  // Keyboard
  _mgKeyHandler = (e) => {
    const map = { ArrowUp:{x:0,y:-1}, ArrowDown:{x:0,y:1}, ArrowLeft:{x:-1,y:0}, ArrowRight:{x:1,y:0} };
    const d = map[e.code];
    if (d && !(d.x === -st.dir.x && d.y === -st.dir.y)) st.nextDir = d;
  };
  document.addEventListener('keydown', _mgKeyHandler);

  // Touch swipe
  let touchStart = null;
  const canvas = document.getElementById('mgCanvas');
  canvas.ontouchstart = (e) => { e.preventDefault(); touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  canvas.ontouchend   = (e) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      st.nextDir = dx > 0 ? {x:1,y:0} : {x:-1,y:0};
    } else {
      st.nextDir = dy > 0 ? {x:0,y:1} : {x:0,y:-1};
    }
    touchStart = null;
  };

  // Controls
  document.getElementById('mgControls').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,44px);grid-template-rows:repeat(2,44px);gap:4px;">
      <div></div>
      <button id="snkU" style="border-radius:10px;border:2px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:white;font-size:1.3rem;cursor:pointer;">⬆️</button>
      <div></div>
      <button id="snkL" style="border-radius:10px;border:2px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:white;font-size:1.3rem;cursor:pointer;">⬅️</button>
      <button id="snkD" style="border-radius:10px;border:2px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:white;font-size:1.3rem;cursor:pointer;">⬇️</button>
      <button id="snkR" style="border-radius:10px;border:2px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:white;font-size:1.3rem;cursor:pointer;">➡️</button>
    </div>`;
  document.getElementById('snkU').onclick = () => { if(st.dir.y!==1)  st.nextDir={x:0,y:-1}; };
  document.getElementById('snkD').onclick = () => { if(st.dir.y!==-1) st.nextDir={x:0,y:1}; };
  document.getElementById('snkL').onclick = () => { if(st.dir.x!==1)  st.nextDir={x:-1,y:0}; };
  document.getElementById('snkR').onclick = () => { if(st.dir.x!==-1) st.nextDir={x:1,y:0}; };

  let timeLeft = 40;
  _mgIv = setInterval(() => {
    if (st.alive) {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(_mgIv);
        st.alive = false;
        _mgFinish(st.score >= 5, st.score);
      }
    }
  }, 1000);

  function loop() {
    if (!st.alive) return;
    _mgRaf = requestAnimationFrame(loop);
    st.frame++;

    if (st.frame % st.speed === 0) {
      // Move
      st.dir = { ...st.nextDir };
      const head = { x: st.snake[0].x + st.dir.x, y: st.snake[0].y + st.dir.y };

      // Wall wrap
      head.x = (head.x + COLS) % COLS;
      head.y = (head.y + ROWS) % ROWS;

      // Self collision
      if (st.snake.slice(2).some(s => s.x === head.x && s.y === head.y)) {
        clearInterval(_mgIv);
        st.alive = false;
        draw();
        _mgFinish(st.score >= 5, st.score);
        return;
      }

      // Eat food
      let ate = false;
      st.food = st.food.filter(f => {
        if (f.x === head.x && f.y === head.y) {
          st.score += f.value;
          ate = true;
          playSound('ching');
          return false;
        }
        return true;
      });

      st.snake.unshift(head);
      if (!ate) st.snake.pop();
      else { spawnFood(); if (st.speed > 4) st.speed--; }
    }

    draw();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,'#0d1f0d');
      bg.addColorStop(1,'#1a3a1a');
      ctx.fillStyle = bg;
      ctx.fillRect(0,0,W,H);

      // Grid dots
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      for (let col = 0; col < COLS; col++)
        for (let row = 0; row < ROWS; row++)
          ctx.fillRect(col*CELL + CELL/2 - 1, OFFSET_Y + row*CELL + CELL/2 - 1, 2, 2);

      // Snake
      st.snake.forEach((s, i) => {
        const x = s.x * CELL, y = OFFSET_Y + s.y * CELL;
        ctx.fillStyle = i === 0 ? '#2DC653' : `rgba(45,${198 - i*4},83,${1 - i/st.snake.length * 0.5})`;
        ctx.beginPath();
        ctx.roundRect?.(x+2, y+2, CELL-4, CELL-4, 4) ?? ctx.rect(x+2, y+2, CELL-4, CELL-4);
        ctx.fill();
        if (i === 0) {
          ctx.font = '16px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🐍', x + CELL/2, y + CELL/2);
        }
      });

      // Food
      ctx.font = '18px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      st.food.forEach(f => ctx.fillText(f.emoji, f.x*CELL + CELL/2, OFFSET_Y + f.y*CELL + CELL/2));

      // HUD
      ctx.fillStyle = '#FFE135';
      ctx.font = 'bold 13px Fredoka One, cursive';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`💰 ${st.score}  🐍 ${st.snake.length}  ⏱ ${timeLeft}s`, 10, 20);

      if (!st.alive) {
        ctx.fillStyle = 'rgba(255,50,50,0.4)';
        ctx.fillRect(0,0,W,H);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 26px Fredoka One, cursive';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💥 ¡Chocaste!', W/2, H/2);
      }
    }
  }

  loop();
}



// ═══════════════════════════════════════════════
// NIGHT/DAY MODE
// ═══════════════════════════════════════════════
function updateDayNight() {
  const h = new Date().getHours();
  const isNight = h >= 20 || h < 6;
  document.body.classList.toggle('night-mode', isNight);
}
setInterval(updateDayNight, 60000);
updateDayNight();

// ═══════════════════════════════════════════════
// XP CIRCLE
// ═══════════════════════════════════════════════
function updateXPCircle() {
  const isMaxLevel = G.level >= LEVELS.length - 1;
  const req = xpRequired(G.level);
  const pct = isMaxLevel ? 1 : Math.min(G.xp / req, 1);

  // Legacy circle
  const circumference = 2 * Math.PI * 17;
  const offset = circumference * (1 - pct);
  const circle = document.getElementById('xpCircle');
  const lbl = document.getElementById('xpCircleLbl');
  if (circle) circle.style.strokeDashoffset = offset;
  if (lbl) lbl.textContent = `${G.level + 1}`;

  // Slim XP bar
  const fill = document.getElementById('hdrXpFill');
  if (fill) fill.style.width = (pct * 100) + '%';

  // Level chip — show name at higher levels, MAX at cap
  const chip = document.getElementById('hdrLevelChip');
  if (chip) {
    const lvName = LEVELS[G.level]?.name || '';
    if (isMaxLevel) {
      chip.textContent = `👑 Rey del Barrio`;
      chip.style.background = 'linear-gradient(135deg,#FFD700,#FF8C00)';
    } else {
      chip.textContent = `⭐ Nv.${G.level + 1} ${G.level >= 8 ? '· ' + lvName : ''}`;
      chip.style.background = '';
    }
  }
}

// ═══════════════════════════════════════════════
// EVENTS (reduce interval to 3min)
// ═══════════════════════════════════════════════
// ─── Weekend Event System ───────────────────────────────────
// Sat 00:00 → Mon 00:00 → global x2.5 multiplier + special banner
const WEEKEND_EVENTS = [
  { icon:'🎉', title:'¡Fin de Semana del Barrio!',   desc:'TODO el Imperio gana x2.5 este fin de semana',       mult:2.5 },
  { icon:'🎊', title:'¡Feria del Barrio!',           desc:'Doble producción + clientes extra todo el fin de semana', mult:2.5 },
  { icon:'🏖️', title:'¡Finde de Vacaciones!',        desc:'El barrio está de fiesta — ganancias x2.5',          mult:2.5 },
  { icon:'⚡', title:'¡Finde Turbo!',                desc:'Energía máxima: todos los negocios al 250%',         mult:2.5 },
];

function getWeekendEvent() {
  const now  = new Date();
  const dow  = now.getDay(); // 0=Sun, 6=Sat
  if (dow !== 0 && dow !== 6) return null;
  // Use ISO week number to pick event
  const week = Math.floor(now.getTime() / (7 * 24 * 3600 * 1000));
  return WEEKEND_EVENTS[week % WEEKEND_EVENTS.length];
}

function getWeekendCountdown() {
  const now = new Date();
  const dow = now.getDay();
  if (dow === 1) return null; // Monday — just ended
  // Next Monday midnight
  const daysToMon = dow === 0 ? 1 : (8 - dow) % 7 || 7;
  const mon = new Date(now);
  mon.setDate(now.getDate() + daysToMon);
  mon.setHours(0,0,0,0);
  const ms = mon - now;
  const h = Math.floor(ms/3600000);
  const m = Math.floor((ms%3600000)/60000);
  return `${h}h ${m}m`;
}

function checkWeekendEvent() {
  const ev = getWeekendEvent();
  const banner = document.getElementById('eventBanner');
  if (!banner) return;
  if (ev && !G.activeEvent) {
    G.activeEvent   = { ...ev, target:'all', duration: 99999999, isWeekend: true };
    G.eventEnd      = new Date(new Date().setHours(23,59,59,999) + (new Date().getDay()===6 ? 86400000 : 0)).getTime();
    G.eventsParticipated = (G.eventsParticipated||0) + 1;
    document.getElementById('evIcon').textContent  = ev.icon;
    document.getElementById('evTitle').textContent = ev.title;
    document.getElementById('evDesc').textContent  = ev.desc + ' · Termina el lunes';
    banner.classList.remove('hidden');
    banner.style.background = 'linear-gradient(135deg,#FF6B35,#E91E8C)';
    const timerEl = document.getElementById('evTimer');
    if (timerEl) { timerEl.textContent = getWeekendCountdown() || ''; timerEl.style.display='inline'; }
    notify(`${ev.icon} ¡EVENTO DE FIN DE SEMANA! ${ev.title}`);
    checkAchievements();
  } else if (!ev && G.activeEvent?.isWeekend) {
    // Weekend ended
    G.activeEvent = null;
    G.eventEnd    = 0;
    banner.classList.add('hidden');
    banner.style.background = '';
    notify('👋 El evento de fin de semana terminó. ¡Hasta el próximo!');
  }
}

// Check weekend on load and every 5 minutes
checkWeekendEvent();
setInterval(checkWeekendEvent, 5 * 60 * 1000);

// Countdown ticker
setInterval(() => {
  if (!G.activeEvent?.isWeekend) return;
  const timerEl = document.getElementById('evTimer');
  if (timerEl) timerEl.textContent = getWeekendCountdown() || '';
}, 60000);

// Regular random events (only on weekdays when no weekend event active)
setInterval(() => {
  if (G.activeEvent) return; // don't stack with weekend
  if (Object.keys(G.businesses).filter(k=>bizLevel(k)>0).length < 2) return;
  const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  G.activeEvent = ev;
  G.eventEnd = Date.now() + ev.duration * 1000;
  G.eventsParticipated = (G.eventsParticipated || 0) + 1;
  const banner = document.getElementById('eventBanner');
  document.getElementById('evIcon').textContent = ev.icon;
  document.getElementById('evTitle').textContent = ev.title;
  document.getElementById('evDesc').textContent = ev.desc;
  banner.classList.remove('hidden');
  banner.style.background = '';
  notify(`${ev.icon} ¡Evento especial! ${ev.title}`);
  checkAchievements();
}, 90000);

// ═══════════════════════════════════════════════
// TABS & UI
// ═══════════════════════════════════════════════
function showTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const el = document.getElementById(`tab-${name}`);
  if (el) el.classList.add('active');
  // Map new nav order: negocios=0, mejoras=1, mapa=2, ⚙️=3
  const navOrder = ['negocios','mejoras','mapa'];
  const navIdx = navOrder.indexOf(name);
  if (navIdx >= 0) document.querySelectorAll('.nav-btn')[navIdx]?.classList.add('active');
  if (name === 'ascenso') renderAscensoTab();
  if (name === 'mapa') renderLeaderboard();
}

// ═══════════════════════════════════════════════
// MAP ZOOM (wheel + touch)
// ═══════════════════════════════════════════════
let mapZoom = 1;
function initMapZoom() {
  const map = document.getElementById('cityMapHTML');
  if (!map) return;
  map.addEventListener('wheel', e => {
    e.preventDefault();
    mapZoom = Math.max(0.75, Math.min(1.8, mapZoom + e.deltaY * -0.003));
    map.style.transform = `scale(${mapZoom})`;
    map.style.transformOrigin = 'center top';
  }, { passive: false });
}

// ═══════════════════════════════════════════════
// TUTORIAL
// ═══════════════════════════════════════════════
let tutorialStep = 0;
const TUTORIAL_STEPS = [
  { msg: '👋 ¡Bienvenido al Imperio! Comienza abriendo la <b>Barbería Los Manos</b> por $50. Toca el botón 🔓 Abrir.', target: null },
  { msg: '💡 ¡Bien hecho! El dinero crece solo con el tiempo. Ahora pulsa <b>⬆️ Mejorar</b> para que la barbería gane más por ciclo.', target: null },
  { msg: '💰 ¡Excelente! Cuando tengas suficiente dinero, abre el <b>Colmado Don Beto</b>. Más negocios = más ingresos pasivos.', target: null },
  { msg: '💇 ¡Vas ganando! Ahora apunta a abrir el <b>Salón Bella Imagen</b>. Con 3 negocios tu barrio empieza a vivir.', target: null },
  { msg: '🏆 ¡Tienes 3+ negocios! Revisa los <b>Logros</b> para ganar 💎 gemas y usa las <b>Mejoras</b> para escalar más rápido. ¡El barrio es tuyo!', target: null },
];
function showTutorial() {
  if (G.tutorialDone || tutorialStep >= TUTORIAL_STEPS.length) { G.tutorialDone = true; return; }
  const step = TUTORIAL_STEPS[tutorialStep];
  const box = document.createElement('div');
  box.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:996;background:linear-gradient(135deg,#1E1B2E,#3a2d5e);border:3px solid #FFE135;border-radius:16px;padding:14px 20px;max-width:320px;text-align:center;color:white;font-size:0.82rem;font-weight:700;box-shadow:0 8px 30px rgba(0,0,0,0.5);animation:popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)`;
  box.innerHTML = `<div style="font-size:0.75rem;color:#FFE135;font-family:'Fredoka One',cursive;margin-bottom:6px">💡 Tip ${tutorialStep+1}/${TUTORIAL_STEPS.length}</div>${step.msg}<div style="margin-top:10px"><button onclick="nextTutorial()" style="background:#FFE135;color:#1E1B2E;border:2px solid #1E1B2E;border-radius:99px;font-family:'Fredoka One',cursive;font-size:0.8rem;padding:6px 16px;cursor:pointer">Entendido ✓</button></div>`;
  box.id = 'tutBox';
  document.body.appendChild(box);
}
function nextTutorial() {
  const el = document.getElementById('tutBox');
  if (el) el.remove();
  tutorialStep++;
  if (tutorialStep < TUTORIAL_STEPS.length) {
    setTimeout(showTutorial, 8000);
  } else {
    G.tutorialDone = true;
    saveGame();
  }
}

// ═══════════════════════════════════════════════
// PRESTIGE IMPROVED
// ═══════════════════════════════════════════════
function renderAscensoTab() {
  renderPrestige();
}

function renderPrestige() {
  const sec = document.getElementById('ascensoTabContent') || document.getElementById('prestigeSection');
  if (!sec) return;
  const stageIdx = G.socialStage || 0;
  const stage = SOCIAL_STAGES[stageIdx];
  const nextStage = SOCIAL_STAGES[stageIdx + 1];
  const can = canAscend();
  if (!G.influenceUpgrades) G.influenceUpgrades = {};

  // ── Build rich scene HTML per stage ──
  function buildPropertyScene(idx) {
    const stars = (n,dark) => Array.from({length:n},()=>{
      const s=(1+Math.random()*3).toFixed(1);
      return `<div class="sc-star" style="left:${(Math.random()*98).toFixed(1)}%;top:${(Math.random()*65).toFixed(1)}%;width:${s}px;height:${s}px;--sd:${(1.5+Math.random()*2.5).toFixed(1)}s;--sl:${(Math.random()*2).toFixed(1)}s"></div>`;
    }).join('');

    // Building with windows helper
    const building = (l,w,h,col,wins) => {
      let winHtml = '';
      for(let r=0;r<Math.floor(h/22);r++) for(let c=0;c<Math.floor(w/14);c++) {
        const on=Math.random()>.3;
        winHtml+=`<div class="sc-win" style="left:${5+c*14}px;bottom:${8+r*22}px;width:8px;height:10px;--wc:${on?'#FFE135':'#1a2060'};--wd:${(2+Math.random()*5).toFixed(1)}s;--wdl:${(Math.random()*4).toFixed(1)}s"></div>`;
      }
      return `<div class="sc-building" style="left:${l}%;width:${w}px;height:${h}px;--bc:${col}">${winHtml}</div>`;
    };

    const scenes = {
      0: `<!-- Barrio El Comienzo -->
        <div class="sc-ground" style="height:40px;background:linear-gradient(#8B7355,#7a6345)"></div>
        <div style="position:absolute;bottom:38px;left:10%;font-size:2.5rem;filter:drop-shadow(2px 3px 0 rgba(0,0,0,.3))">🏚️</div>
        <div style="position:absolute;bottom:38px;left:55%;font-size:2rem">🛖</div>
        <div style="position:absolute;bottom:38px;right:8%;font-size:2.2rem">🌵</div>
        <div class="sc-person" style="bottom:38px;--walk-dur:10s;--walk-del:0s" data-e="🚶"></div>
        <div class="sc-person" style="bottom:38px;--walk-dur:14s;--walk-del:3s" data-e="🧍"></div>`,

      1: `<!-- Casa Propia -->
        <div class="sc-ground" style="height:45px;background:linear-gradient(#5cb85c,#4a9e4a)"></div>
        <div style="position:absolute;bottom:44px;left:50%;transform:translateX(-50%);font-size:3.5rem">🏠</div>
        <div class="sc-palm" style="left:8%;bottom:44px;font-size:2rem">🌳</div>
        <div class="sc-palm" style="right:10%;bottom:44px;font-size:1.8rem;animation-delay:1s">🌳</div>
        <div style="position:absolute;bottom:44px;left:22%;font-size:1.5rem">🚗</div>
        <div class="sc-person" style="bottom:44px;--walk-dur:9s;--walk-del:1s" data-e="🚶‍♀️"></div>
        <div class="sc-person" style="bottom:44px;--walk-dur:12s;--walk-del:5s" data-e="🐕"></div>`,

      2: `<!-- Casa Moderna -->
        <div class="sc-ground" style="height:45px;background:linear-gradient(#6aaa6a,#5a9a5a)"></div>
        <div style="position:absolute;bottom:44px;left:50%;transform:translateX(-50%);font-size:3.5rem">🏡</div>
        <div style="position:absolute;bottom:44px;left:15%;font-size:2rem">🚙</div>
        <div style="position:absolute;bottom:44px;right:12%;font-size:1.8rem">🌿</div>
        <div class="sc-palm" style="left:5%;bottom:44px">🌴</div>
        <div class="sc-person" style="bottom:44px;--walk-dur:10s;--walk-del:0s" data-e="🧑‍💼"></div>
        <div class="sc-person" style="bottom:44px;--walk-dur:15s;--walk-del:4s" data-e="👶"></div>`,

      3: `<!-- Villa con Piscina -->
        <div class="sc-ground" style="height:40px;background:linear-gradient(#48cae4,#0096c7)"></div>
        <div style="position:absolute;bottom:38px;left:50%;transform:translateX(-50%);font-size:3.5rem">🏖️</div>
        <div class="sc-pool" style="left:5%;right:5%;bottom:40px"></div>
        <div class="sc-palm" style="left:3%;bottom:38px;font-size:2.8rem">🌴</div>
        <div class="sc-palm" style="right:5%;bottom:38px;font-size:2.5rem;animation-delay:1.5s">🌴</div>
        <div class="sc-person" style="bottom:60px;--walk-dur:11s;--walk-del:0s" data-e="👙"></div>
        <div class="sc-person" style="bottom:60px;--walk-dur:9s;--walk-del:4s" data-e="🩱"></div>
        <div class="sc-money" style="top:30px;right:20%;--md:0.5s">☀️</div>`,

      4: `<!-- PENTHOUSE — luxury night sky -->
        <div class="sc-stars">${stars(35,true)}</div>
        ${building(0,60,130,'#070d30')}
        ${building(8,45,100,'#050b28')}
        ${building(18,80,150,'#060c2e')}
        ${building(33,55,110,'#070d32')}
        ${building(45,70,140,'#050b28')}
        ${building(58,50,120,'#070e35')}
        ${building(68,90,160,'#060d32')}
        ${building(82,65,130,'#050b2a')}
        ${building(90,75,145,'#070e36')}
        <!-- City glow orbs -->
        <div class="sc-glow" style="bottom:-20px;left:15%;width:120px;height:80px;background:#1a3aff;--gd:5s;--gdl:0s"></div>
        <div class="sc-glow" style="bottom:-20px;right:10%;width:100px;height:70px;background:#9b59b6;--gd:4s;--gdl:1.5s"></div>
        <div class="sc-glow" style="bottom:-10px;left:50%;width:140px;height:60px;background:#e74c3c;--gd:6s;--gdl:0.5s"></div>
        <!-- Penthouse terrace floor -->
        <div class="sc-terrace"></div>
        <!-- Luxury elements on terrace -->
        <div style="position:absolute;bottom:32px;left:10%;font-size:1.4rem;animation:floatScene 4s ease-in-out infinite">🥂</div>
        <div style="position:absolute;bottom:32px;left:25%;font-size:1.2rem;animation:floatScene 3s ease-in-out infinite .5s">🍾</div>
        <div style="position:absolute;bottom:34px;right:12%;font-size:1.5rem">🛋️</div>
        <div style="position:absolute;bottom:34px;right:25%;font-size:1.3rem;animation:floatScene 5s ease-in-out infinite 1s">🌃</div>
        <!-- Champagne bubbles -->
        <div class="sc-bubble" style="left:12%;bottom:50px;width:4px;height:4px;--bd:2.2s;--bdl:0s"></div>
        <div class="sc-bubble" style="left:14%;bottom:50px;width:3px;height:3px;--bd:1.8s;--bdl:0.5s"></div>
        <div class="sc-bubble" style="left:27%;bottom:50px;width:5px;height:5px;--bd:2.5s;--bdl:0.3s"></div>
        <!-- 3 walking characters on terrace -->
        <div class="sc-person" style="bottom:32px;--walk-dur:12s;--walk-del:0s;font-size:1.8rem" data-e="🧑‍💼"></div>
        <div class="sc-person" style="bottom:32px;--walk-dur:18s;--walk-del:5s;font-size:1.7rem" data-e="👸"></div>
        <div class="sc-person" style="bottom:32px;--walk-dur:15s;--walk-del:9s;font-size:1.6rem" data-e="🕴️"></div>
        <!-- Moon -->
        <div style="position:absolute;top:14px;right:18%;font-size:2rem;opacity:0.9;animation:floatScene 8s ease-in-out infinite">🌙</div>
        <!-- Gold money floats -->
        <div class="sc-money" style="top:25%;left:20%;--md:0s">💰</div>
        <div class="sc-money" style="top:18%;right:30%;--md:1.5s;font-size:1rem">💎</div>`,

      5: `<!-- Jet Privado -->
        <div style="position:absolute;bottom:0;left:0;right:0;height:50px;background:linear-gradient(#c8e6c9,#a5d6a7)"></div>
        <div class="sc-person" style="bottom:50px;--walk-dur:11s" data-e="🧑‍✈️"></div>
        <div style="position:absolute;top:30px;left:-80px;font-size:3rem;animation:flyJet 5s linear infinite">✈️</div>
        <div style="position:absolute;top:55px;left:-80px;font-size:1.5rem;animation:flyJet 8s linear infinite 2s">🛩️</div>
        <div class="sc-money" style="top:20%;left:60%;--md:0s">💵</div>
        <div class="sc-money" style="top:35%;right:15%;--md:2s">🌍</div>`,

      6: `<!-- Corporación Global -->
        <div class="sc-stars">${stars(25,true)}</div>
        ${building(0,50,180,'#0a0a1a')}
        ${building(12,100,200,'#080818')}
        ${building(30,60,160,'#0a0a1e')}
        ${building(45,120,220,'#070715')}
        ${building(65,80,185,'#090918')}
        ${building(82,55,165,'#0a0a1c')}
        <div class="sc-glow" style="bottom:-10px;left:35%;width:200px;height:100px;background:#ffd700;--gd:6s"></div>
        <div class="sc-ground" style="height:28px;background:linear-gradient(#1a1a2e,#0d0d1a)"></div>
        <div class="sc-person" style="bottom:28px;--walk-dur:14s;--walk-del:0s;font-size:1.8rem" data-e="👑"></div>
        <div class="sc-person" style="bottom:28px;--walk-dur:20s;--walk-del:7s;font-size:1.6rem" data-e="🤵"></div>
        <div class="sc-money" style="top:20%;left:20%;--md:0s;color:#ffd700;font-size:1.1rem">👑</div>
        <div class="sc-money" style="top:30%;right:15%;--md:2s">💎</div>`
    };
    return scenes[idx] || scenes[0];
  }
  const starDots = ''; const cityLights = '';

  const stageCards = SOCIAL_STAGES.map((s,i) => {
    let cls='', badge='';
    if(i===stageIdx){cls='current-stage';badge='<span class="stage-badge badge-current">ACTUAL</span>';}
    else if(i<stageIdx){cls='completed-stage';badge='<span class="stage-badge badge-done">✓</span>';}
    else{cls='locked-stage';badge='<span class="stage-badge badge-locked">🔒</span>';}
    return `<div class="stage-card ${cls}"><div class="stage-icon">${s.icon}</div><div class="stage-info"><div class="stage-name">${s.name}</div><div class="stage-bonus">${s.bonus}</div></div>${badge}</div>`;
  }).join('');

  const infUpgrades = INFLUENCE_UPGRADES.map(u => {
    const bought = G.influenceUpgrades[u.id];
    return `<div class="inf-upgrade ${bought?'bought':''}" onclick="${bought?'':("buyInfluenceUpgrade('"+u.id+"')")}">
      <div class="inf-upgrade-icon">${u.icon}</div>
      <div class="inf-upgrade-info"><div class="inf-upgrade-name">${u.name}</div><div class="inf-upgrade-desc">${u.desc}</div></div>
      <div class="inf-upgrade-cost">${bought?'✓':('⭐'+u.cost)}</div>
    </div>`;
  }).join('');

  let ascendBtn = '';
  if (nextStage) {
    const r = nextStage.req;
    const reqTxt = can ? `✅ Listo para ascender` : `Req: Nv.${r.level} + ${fmt(r.totalEarned)} · Ganado: ${fmt(G.totalEarned)}`;
    const btnTxt = can ? `🚀 ¡Ascender a ${nextStage.name}!` : `🔒 Nv.${r.level} + ${fmt(r.totalEarned)}`;
    ascendBtn = `<div style="font-size:0.75rem;font-weight:700;color:#888;margin-bottom:10px;text-align:center">${reqTxt}</div>
    <button class="btn-ascend" onclick="showAscendModal()" ${!can?'disabled':''}>${btnTxt}</button>`;
  } else {
    ascendBtn = `<div style="text-align:center;font-family:'Boogaloo',cursive;font-size:1.5rem;color:var(--ink)">🌎 ¡Eres el jefe máximo!</div>`;
  }

  sec.innerHTML = `<div class="ascenso-wrap">
    <div class="ascenso-scene scene-stage-${stageIdx}" onclick="openStageAnim(${stageIdx})" title="Click para ver animación de tu propiedad">
      <div class="scene-bg"></div>
      ${buildPropertyScene(stageIdx)}
      <div class="scene-label">${stage.name}</div>
      <div class="scene-influence">⭐ ${G.influence||0}</div>
      <div style="position:absolute;bottom:10px;right:12px;background:rgba(0,0,0,0.6);color:white;font-family:'Fredoka One',cursive;font-size:0.7rem;padding:3px 10px;border-radius:99px;pointer-events:none">${nextStage ? '🚀 Ascender' : '👑 Máximo'}</div>
    </div>
    <div class="influence-panel">
      <div class="influence-title">⭐ Influencia — Mejoras Permanentes</div>
      <div style="font-size:0.78rem;opacity:0.8;margin-bottom:10px">⭐ Tienes <strong>${G.influence||0}</strong> · Total acumulado: ${G.totalInfluence||0}</div>
      <div class="influence-upgrades">${infUpgrades}</div>
    </div>
    <div style="font-family:'Fredoka One',cursive;font-size:1.1rem;color:var(--ink);margin-bottom:10px">🏆 Progresión Social</div>
    <div class="stage-grid">${stageCards}</div>
    ${ascendBtn}
  </div>`;
}

// ═══════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════
function startGame() {
  document.getElementById('introScreen').classList.remove('active');
  document.getElementById('gameScreen').classList.add('active');
  document.getElementById('mainHeader').style.display = 'flex';
  document.getElementById('bottomNav').style.display = 'flex';
  renderAll();
  requestAnimationFrame(tick);
  initMapZoom();
  updateDayNight();
  resetWeeklyIfNeeded();
  updateCompanyInHeader();
  // Tutorial for new players
  if (!G.tutorialDone) {
    setTimeout(showTutorial, 800);
    setTimeout(() => { if (!G.tutorialDone && tutorialStep === 0) { document.getElementById('tutBox')?.remove(); } }, 15000);
  }
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
const hadSave = loadGame();

// Migrate old saves
if (!G.zoneHistory) G.zoneHistory = [G.zone || 'centro'];
if (!G.achievements) G.achievements = {};
if (G.soundOn === undefined) G.soundOn = true;
if (!G.gems) G.gems = 0;
if (!G.bizStats) G.bizStats = {};
if (!G.bizUpgrades) G.bizUpgrades = {};
if (!G.dailyObjClaimed) G.dailyObjClaimed = {};
if (!G.dailyObjSeed) G.dailyObjSeed = Date.now();
if (!G.theme) G.theme = 'gold';
// v10: Gem sources migration
if (!G.socialShares) G.socialShares = {};
if (!G.referralCode) {} // will be lazy-created
if (!G.lastTriviaTs) G.lastTriviaTs = 0;
if (!G.lastAdTs) G.lastAdTs = 0;
if (!G.lastGemDailyTs) G.lastGemDailyTs = 0;
if (!G.lastWeeklyGemTs) G.lastWeeklyGemTs = 0;
if (!G.triviaCorrect) G.triviaCorrect = 0;
// v10: Ascenso Social migration
if (G.socialStage === undefined) {
  // Migrate old prestige stars to socialStage
  G.socialStage = Math.min(G.prestigeStars || 0, 6);
  G.influence = G.prestigeStars || 0;
  G.totalInfluence = G.prestigeStars || 0;
  G.influenceUpgrades = {};
}
applyTheme(G.theme);


// ═══════════════════════════════════════════════════════════
// SPLASH SCREEN
// ═══════════════════════════════════════════════════════════
function runSplash(onDone) {
  const bar  = document.getElementById('splashBar');
  const lbl  = document.getElementById('splashLbl');
  const msgs = ['Cargando negocios...','Revisando cuentas...','Abriendo el barrio...','¡Listo!'];
  let pct = 0, step = 0;
  const iv = setInterval(function() {
    pct = Math.min(pct + (3 + Math.random() * 5), 100);
    if(bar) bar.style.width = pct + '%';
    const mi = Math.floor(pct / 33);
    if(mi !== step && mi < msgs.length && lbl) { step = mi; lbl.textContent = msgs[step]; }
    if(pct >= 100) {
      clearInterval(iv);
      if(lbl) lbl.textContent = '¡Listo!';
      setTimeout(function() {
        const el = document.getElementById('splashScreen');
        if(el) { el.classList.add('fade-out'); setTimeout(function(){ el.style.display='none'; onDone(); }, 650); }
        else onDone();
      }, 300);
    }
  }, 40);
}

// ═══════════════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════════════
var _obSlide = 0;
var _OB_TOTAL = 3;

function showOnboarding() {
  var el = document.getElementById('onboardingScreen');
  if(el) el.style.display = 'flex';
}
function obNext() {
  _obSlide++;
  if(_obSlide >= _OB_TOTAL) { skipOnboarding(); return; }
  var track = document.getElementById('obTrack');
  if(track) track.style.transform = 'translateX(-' + (_obSlide * 100) + '%)';
  for(var i = 0; i < _OB_TOTAL; i++) {
    var d = document.getElementById('obDot' + i);
    if(d) d.className = 'ob-dot' + (i === _obSlide ? ' active' : '');
  }
  var btn = document.getElementById('obNextBtn');
  if(btn && _obSlide === _OB_TOTAL - 1) btn.textContent = '¡Empezar! 🚀';
}
function skipOnboarding() {
  var el = document.getElementById('onboardingScreen');
  if(el) el.style.display = 'none';
  try { localStorage.setItem('idb_ob_seen','1'); } catch(e) {}
  var intro = document.getElementById('introScreen');
  if(intro) intro.style.display = 'none';
  startGame();
}

// ═══════════════════════════════════════════════════════════
// OFFLINE EARNINGS MODAL
// ═══════════════════════════════════════════════════════════
function showOfflineModal(amount, elapsed) {
  var h = Math.floor(elapsed / 3600);
  var m = Math.floor((elapsed % 3600) / 60);
  var timeStr = (h > 0 ? h + 'h ' : '') + (m > 0 ? m + 'm' : 'unos momentos');
  var amtEl = document.getElementById('omAmount');
  var subEl = document.getElementById('omSub');
  if(amtEl) amtEl.textContent = '+' + fmt(amount);
  if(subEl) subEl.textContent = 'en ' + timeStr + ' 💤';
  var modal = document.getElementById('offlineModal');
  if(modal) modal.style.display = 'flex';
  var btn = document.getElementById('omBtn');
  if(btn) btn.onclick = function() {
    G.money += amount;
    G.totalEarned += amount;
    if(modal) modal.style.display = 'none';
    var banner = document.getElementById('offlineBanner');
    if(banner) banner.classList.add('hidden');
    notify('💤 +' + fmt(amount) + ' mientras dormías!');
    spawnParticles(amount);
    checkAchievements();
    renderAll();
    saveGameNow();
  };
}

// ══════════════════════════════════════════════════════════════
// ARRANQUE — Supabase directo, sin React
// ══════════════════════════════════════════════════════════════
runSplash(() => {
  const hasBiz = Object.keys(G.businesses || {}).filter(k=>bizLevel(k)>0).length > 0;
  const hasRealProgress = hasBiz || (G.totalEarned > 500) || (G.level > 0) || (G.gems > 1);
  const isRealSave = (hadSave || window._hadCloudSave) && hasRealProgress;

  if (isRealSave) {
    const elapsed = (Date.now() - (G.lastSave || Date.now())) / 1000;
    document.getElementById('introScreen').style.display = 'none';
    startGame();
    if (elapsed > 30 && hasBiz) {
      const offlineMult = (G.upgrades?.offlineBoost ? 1.0 : 0.4) * getStageOfflineMult();
      const offlineInc  = totalIPS() * elapsed * offlineMult;
      if (offlineInc > 0) setTimeout(() => showOfflineModal(offlineInc, elapsed), 600);
    }
    setTimeout(() => checkDaily(), 1200);
  } else {
    if (!hadSave) G.money = 500;
    const obSeen = (() => { try { return !!localStorage.getItem('idb_ob_seen'); } catch(e){return false;} })();
    if (!obSeen && !hadSave) {
      showOnboarding();
    } else {
      document.getElementById('introScreen').style.display = 'none';
      startGame();
    }
  }
});

// ═══════════════════════════════════════════════
// PANEL SECUNDARIO ⚙️
// ═══════════════════════════════════════════════
function openSecondaryPanel() {
  document.getElementById('secondaryPanel').classList.add('open');
  // Update dynamic content
  const gemsEl = document.getElementById('secGemsCount');
  if (gemsEl) gemsEl.textContent = `${G.gems || 0} gemas disponibles`;
  const guildEl = document.getElementById('secGuildName');
  if (guildEl) guildEl.textContent = G.guildName ? `${G.guildEmoji||'🤝'} ${G.guildName}` : 'Sin clan — crea o únete';
  updateSoundBtn();
}
function closeSecondaryPanel() {
  document.getElementById('secondaryPanel').classList.remove('open');
}
function updateSoundBtn() {
  const lbl = document.getElementById('secSoundLabel');
  if (lbl) lbl.textContent = G.soundOn ? 'Sonido activado' : 'Sonido desactivado';
  const btn = document.getElementById('secSoundBtn');
  if (btn) btn.querySelector('.sec-btn-icon').textContent = G.soundOn ? '🔊' : '🔇';
  // sync music button
  const ml = document.getElementById('secMusicLabel');
  if (ml) ml.textContent = _musicOn ? 'Música activada' : 'Música desactivada';
  const mb = document.getElementById('secMusicBtn');
  if (mb) mb.querySelector('.sec-btn-icon').textContent = _musicOn ? '🎵' : '🎶';
}
// ═══════════════════════════════════════════════════════════
// MÚSICA AMBIENTAL — Beat Lofi Urbano (Web Audio, sin copyright)
// ═══════════════════════════════════════════════════════════
let _musicOn = false;
let _musicAc = null;
let _musicMaster = null;
let _musicScheduler = null;
let _musicBeat = 0;
let _musicNextTime = 0;

const _BPM = 82;
const _BEAT = 60 / _BPM;
const _BAR  = _BEAT * 4;

// Acordes lofi (do menor → si♭ mayor → fa mayor → sol menor)
const _CHORDS = [
  [261.63, 311.13, 392.00],  // Cm
  [233.08, 293.66, 349.23],  // B♭
  [174.61, 220.00, 261.63],  // F
  [196.00, 233.08, 293.66],  // Gm
];

// Línea de bajo (nota raíz en octava baja)
const _BASS = [130.81, 116.54, 87.31, 98.00];

function _musicNote(ac, master, freq, start, dur, vol=0.12, type='sine') {
  try {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.value = freq;
    // pequeño detune aleatorio para sabor lofi
    o.detune.value = (Math.random() - 0.5) * 14;
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(vol, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, start + dur * 0.92);
    o.connect(g); g.connect(master);
    o.start(start); o.stop(start + dur);
  } catch(e) {}
}

function _musicKick(ac, master, start) {
  try {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, start);
    o.frequency.exponentialRampToValueAtTime(40, start + 0.08);
    g.gain.setValueAtTime(0.38, start);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
    o.connect(g); g.connect(master);
    o.start(start); o.stop(start + 0.2);
  } catch(e) {}
}

function _musicSnare(ac, master, start) {
  try {
    const buf = ac.createBuffer(1, ac.sampleRate * 0.12, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/d.length, 2.5);
    const src = ac.createBufferSource();
    const g = ac.createGain();
    const f = ac.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = 2200; f.Q.value = 0.8;
    src.buffer = buf;
    g.gain.setValueAtTime(0.22, start);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.11);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(start); src.stop(start + 0.14);
  } catch(e) {}
}

function _musicHihat(ac, master, start, vol=0.07) {
  try {
    const buf = ac.createBuffer(1, ac.sampleRate * 0.04, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/d.length, 3);
    const src = ac.createBufferSource();
    const g = ac.createGain();
    const f = ac.createBiquadFilter();
    f.type = 'highpass'; f.frequency.value = 8000;
    src.buffer = buf;
    g.gain.setValueAtTime(vol, start);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.035);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(start); src.stop(start + 0.05);
  } catch(e) {}
}

function _scheduleBar(ac, master, barStart, chordIdx) {
  const chord = _CHORDS[chordIdx];
  const bass  = _BASS[chordIdx];

  // Bajo — golpe en tiempo 1 y un pickup en tiempo 3.5
  _musicNote(ac, master, bass, barStart, _BEAT * 1.8, 0.28, 'triangle');
  _musicNote(ac, master, bass * 1.5, barStart + _BEAT * 3.5, _BEAT * 0.45, 0.14, 'triangle');

  // Acordes pad suave
  chord.forEach(f => {
    _musicNote(ac, master, f, barStart + 0.01, _BAR * 0.9, 0.06, 'sine');
    // segunda voz una octava arriba, muy suave
    _musicNote(ac, master, f * 2, barStart + 0.04, _BAR * 0.7, 0.025, 'sine');
  });

  // Melodía lofi simple (arpeggio aleatorio)
  const mel = [chord[2]*2, chord[0]*2, chord[1]*2, chord[2]*2, chord[0]*2*1.125];
  const offsets = [0, _BEAT*0.75, _BEAT*1.5, _BEAT*2.5, _BEAT*3.25];
  mel.forEach((f, i) => {
    if (Math.random() > 0.25) // pequeña variación cada ciclo
      _musicNote(ac, master, f, barStart + offsets[i], _BEAT * 0.55, 0.055, 'sine');
  });

  // Percusión — patrón lofi con swing
  const sw = _BEAT * 0.06; // swing
  _musicKick(ac, master, barStart);              // tiempo 1
  _musicKick(ac, master, barStart + _BEAT * 2);  // tiempo 3

  _musicSnare(ac, master, barStart + _BEAT);          // tiempo 2
  _musicSnare(ac, master, barStart + _BEAT * 3);      // tiempo 4

  // Hi-hats en 8vos con swing
  for (let i = 0; i < 8; i++) {
    const t = barStart + i * _BEAT * 0.5 + (i % 2 === 1 ? sw : 0);
    const v = (i % 4 === 0) ? 0.09 : (i % 2 === 0) ? 0.06 : 0.04;
    _musicHihat(ac, master, t, v);
  }

  // Rimshot ocasional en tiempo 2.5
  if (Math.random() > 0.5)
    _musicHihat(ac, master, barStart + _BEAT * 2.5, 0.11);
}

function _startMusicLoop() {
  try {
    if (!_musicAc) _musicAc = new (window.AudioContext || window.webkitAudioContext)();
    const ac = _musicAc;

    // Master gain + compresor suave
    const master = ac.createGain();
    const comp = ac.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 3;
    master.gain.value = 0.72;
    master.connect(comp); comp.connect(ac.destination);
    _musicMaster = master;

    // Reverb sencillo (convolver con ruido decayente)
    try {
      const revLen = ac.sampleRate * 1.8;
      const revBuf = ac.createBuffer(2, revLen, ac.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const d = revBuf.getChannelData(ch);
        for (let i = 0; i < revLen; i++) d[i] = (Math.random()*2-1) * Math.pow(1-i/revLen, 3.5);
      }
      const rev = ac.createConvolver(); rev.buffer = revBuf;
      const revGain = ac.createGain(); revGain.gain.value = 0.18;
      master.connect(revGain); revGain.connect(rev); rev.connect(comp);
    } catch(e) {}

    _musicBeat = 0;
    _musicNextTime = ac.currentTime + 0.1;

    function schedule() {
      if (!_musicOn) return;
      const ac = _musicAc;
      // Programar 2 compases por adelantado
      while (_musicNextTime < ac.currentTime + _BAR * 2) {
        const chordIdx = _musicBeat % _CHORDS.length;
        _scheduleBar(ac, master, _musicNextTime, chordIdx);
        _musicNextTime += _BAR;
        _musicBeat++;
      }
      _musicScheduler = setTimeout(schedule, (_BAR * 1000) * 0.5);
    }
    schedule();
  } catch(e) { console.warn('Música no disponible:', e); }
}

function _stopMusicLoop() {
  clearTimeout(_musicScheduler);
  _musicScheduler = null;
  if (_musicMaster) {
    try {
      _musicMaster.gain.linearRampToValueAtTime(0, _musicAc.currentTime + 0.8);
      setTimeout(() => { try { _musicMaster.disconnect(); } catch(e){} _musicMaster = null; }, 900);
    } catch(e) { _musicMaster = null; }
  }
}

function toggleMusic() {
  _musicOn = !_musicOn;
  if (_musicOn) {
    _startMusicLoop();
    notify('🎵 Música del barrio activada');
  } else {
    _stopMusicLoop();
    notify('🔇 Música desactivada');
  }
  updateSoundBtn();
}

// Auto-arrancar con primera interacción del usuario (política de autoplay)
let _musicAutoStarted = false;
function _tryAutoMusic() {
  if (_musicAutoStarted) return;
  _musicAutoStarted = true;
  _musicOn = true;
  _startMusicLoop();
  updateSoundBtn();
}
document.addEventListener('click', _tryAutoMusic, { once: true });
document.addEventListener('touchstart', _tryAutoMusic, { once: true });

// Close panel on Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSecondaryPanel(); });
// ═══════════════════════════════════════════════════════════════════
// PWA INSTALL PROMPT
// ═══════════════════════════════════════════════════════════════════
let _pwaPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  _pwaPrompt = e;
  // Show install banner after 30s or first level up
  setTimeout(showInstallBanner, 30000);
});

function showInstallBanner() {
  if (!_pwaPrompt || G.pwaInstalled || document.getElementById('pwaBanner')) return;
  const banner = document.createElement('div');
  banner.id = 'pwaBanner';
  banner.style.cssText = `position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:995;background:linear-gradient(135deg,#1E1B2E,#2d1a4a);border:3px solid #9B5DE5;border-radius:16px;padding:12px 16px;max-width:320px;width:92%;display:flex;align-items:center;gap:12px;box-shadow:0 8px 30px rgba(0,0,0,0.5);animation:popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)`;
  banner.innerHTML = `
    <div style="font-size:2.2rem">📲</div>
    <div style="flex:1">
      <div style="font-family:'Fredoka One',cursive;color:#D4A8FF;font-size:0.9rem">¡Instala el Imperio!</div>
      <div style="font-size:0.62rem;color:rgba(255,255,255,0.5);font-weight:900">Juega sin internet · Icono en pantalla</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:4px">
      <button onclick="installPWA()" style="background:#9B5DE5;border:none;border-radius:8px;color:white;font-family:'Fredoka One',cursive;font-size:0.75rem;padding:5px 10px;cursor:pointer;">Instalar</button>
      <button onclick="this.closest('#pwaBanner').remove()" style="background:transparent;border:none;color:rgba(255,255,255,0.3);font-size:0.65rem;cursor:pointer;">Ahora no</button>
    </div>`;
  document.body.appendChild(banner);
  setTimeout(() => banner?.remove(), 12000);
}

async function installPWA() {
  if (!_pwaPrompt) return;
  const result = await _pwaPrompt.prompt();
  if (result?.outcome === 'accepted') {
    G.pwaInstalled = true;
    addGems(10);
    saveGame();
    notify('📲 ¡Imperio instalado! +10 💎 de regalo');
  }
  document.getElementById('pwaBanner')?.remove();
  _pwaPrompt = null;
}

// ═══════════════════════════════════════════════════════════════════
// SEASONS SYSTEM — temporadas de 30 días con cosmetics
// ═══════════════════════════════════════════════════════════════════
const CURRENT_SEASON = {
  id: 1,
  name: 'Temporada del Barrio',
  theme: '🌆',
  endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).getTime(),
  tiers: [
    { level: 1,  xp: 100,   reward: { type:'gems', amount:5 },    label:'💎 5 Gemas' },
    { level: 2,  xp: 300,   reward: { type:'gems', amount:10 },   label:'💎 10 Gemas' },
    { level: 3,  xp: 600,   reward: { type:'title', val:'🌟 Emprendedor de Temporada' }, label:'🌟 Título' },
    { level: 4,  xp: 1000,  reward: { type:'gems', amount:20 },   label:'💎 20 Gemas' },
    { level: 5,  xp: 1500,  reward: { type:'boost', val:'x1.5 ingresos 2h' }, label:'⚡ Boost x1.5' },
    { level: 6,  xp: 2200,  reward: { type:'gems', amount:30 },   label:'💎 30 Gemas' },
    { level: 7,  xp: 3000,  reward: { type:'title', val:'🔥 Magnate de Temporada' }, label:'🔥 Título Elite' },
    { level: 8,  xp: 4000,  reward: { type:'gems', amount:50 },   label:'💎 50 Gemas' },
    { level: 9,  xp: 5500,  reward: { type:'boost', val:'Offline 24h gratis' }, label:'🌙 Boost Offline' },
    { level: 10, xp: 7500,  reward: { type:'title', val:'👑 Leyenda del Barrio' }, label:'👑 Leyenda' },
  ]
};

function getSeasonXP() { return G.seasonXP || 0; }
function getSeasonLevel() {
  const xp = getSeasonXP();
  let lv = 0;
  for (const t of CURRENT_SEASON.tiers) { if (xp >= t.xp) lv = t.level; }
  return lv;
}
function addSeasonXP(amount) {
  if (!G.seasonXP) G.seasonXP = 0;
  if (!G.seasonClaimed) G.seasonClaimed = {};
  const prevLv = getSeasonLevel();
  G.seasonXP += amount;
  const newLv = getSeasonLevel();
  if (newLv > prevLv) {
    for (let l = prevLv + 1; l <= newLv; l++) {
      const tier = CURRENT_SEASON.tiers.find(t => t.level === l);
      if (tier && !G.seasonClaimed[l]) {
        claimSeasonTier(l, tier);
      }
    }
  }
}
function claimSeasonTier(level, tier) {
  if (!G.seasonClaimed) G.seasonClaimed = {};
  if (G.seasonClaimed[level]) return;
  G.seasonClaimed[level] = true;
  const r = tier.reward;
  if (r.type === 'gems')  { addGems(r.amount); notify(`🏆 Temporada Nv.${level}: +${r.amount} 💎`); }
  if (r.type === 'title') { G.seasonTitle = r.val; notify(`🏆 Temporada Nv.${level}: ${r.val}`); }
  if (r.type === 'boost') { G.seasonBoostEnd = Date.now() + 2 * 3600000; notify(`🏆 Temporada Nv.${level}: ${r.val}`); }
}

// Give season XP on actions
const _origAddXP = window.addXP;
// Patch will be applied below after addXP is defined

// ═══════════════════════════════════════════════════════════════════
// STORY MISSIONS — arco narrativo de 10 misiones
// ═══════════════════════════════════════════════════════════════════
const STORY_MISSIONS = [
  { id:'s1',  icon:'🪒', title:'El Comienzo',        desc:'Abre la Barbería Los Manos',                   check: g => Object.values(g.businesses).filter(b=>b.level>0).length >= 1, reward:{ money:500,  gems:2  }, story:'Heredaste la barbería de tu abuelo con $500 y muchos sueños.' },
  { id:'s2',  icon:'🛒', title:'El Primer Socio',    desc:'Abre el Colmado Don Beto',                    check: g => g.businesses?.colmado?.level > 0, reward:{ money:2000, gems:3  }, story:'Don Beto te ofrece el colmado de su jubilación. ¡Es tu momento!' },
  { id:'s3',  icon:'💪', title:'El Barrio Habla',    desc:'Llega a Nivel 3',                              check: g => g.level >= 2, reward:{ money:5000, gems:5  }, story:'Tu nombre empieza a sonar en el vecindario. La gente confía en ti.' },
  { id:'s4',  icon:'🏪', title:'Cinco Negocios',     desc:'Ten 5 negocios activos',                       check: g => Object.values(g.businesses).filter(b=>b.level>0).length >= 5, reward:{ money:15000, gems:8 }, story:'Con 5 negocios en pie, el barrio entero es tu oficina.' },
  { id:'s5',  icon:'🗺️', title:'Nuevos Horizontes',  desc:'Múdate a la Zona Norte o Sur',                check: g => g.zoneHistory?.some(z => z==='norte'||z==='sur'), reward:{ money:25000, gems:10 }, story:'El barrio ya es pequeño. Es hora de expandir el Imperio.' },
  { id:'s6',  icon:'⭐', title:'Primera Influencia', desc:'Haz tu primer Ascenso Social',                check: g => (g.socialStage||0) >= 1, reward:{ money:50000, gems:15 }, story:'Ascendiste. Ahora tienes Influencia: el poder invisible del barrio.' },
  { id:'s7',  icon:'🏆', title:'El Millonario',      desc:'Acumula $1,000,000 en total',                 check: g => g.totalEarned >= 1000000, reward:{ money:100000, gems:20 }, story:'Un millón de pesos. La gente ya te llama "Don". Tu legado comienza.' },
  { id:'s8',  icon:'🌟', title:'La Zona Premium',    desc:'Llega a la Zona Premium',                     check: g => g.zoneHistory?.includes('premium'), reward:{ money:250000, gems:25 }, story:'La élite de la ciudad te abre las puertas. Ahora eres de los grandes.' },
  { id:'s9',  icon:'🛩️', title:'El Imperio Total',   desc:'Ten todos los negocios abiertos',             check: g => typeof BUSINESSES!=='undefined' && Object.values(g.businesses).filter(b=>b.level>0).length >= BUSINESSES.length, reward:{ money:5000, gems:35 }, story:'Cada rincón del barrio lleva tu nombre. Eres el dueño del territorio.' },
  { id:'s10', icon:'👑', title:'Leyenda del Barrio',  desc:'Llega a Nivel 20 y 2+ Ascensos',              check: g => g.level >= 19 && (g.socialStage||0) >= 2, reward:{ money:1000000, gems:50 }, story:'Tu historia será contada por generaciones. El barrio te pertenece para siempre.' },

  // ── ARC 2: El Magnate ──────────────────────────────────────────
  { id:'s11', icon:'🏦', title:'El Primer Banco',      desc:'Abre el Banco del Barrio',                    check: g => g.businesses?.banco?.level > 0, reward:{ money:500000, gems:20 }, story:'El barrio ya tiene su propio banco. Tú controlas el flujo del dinero.' },
  { id:'s12', icon:'🌆', title:'La Plaza',              desc:'Abre la Plaza Comercial',                     check: g => g.businesses?.plaza?.level > 0, reward:{ money:800000, gems:25 }, story:'Una plaza entera con tu nombre. Los turistas vienen a verte.' },
  { id:'s13', icon:'⭐', title:'Tercer Ascenso',        desc:'Alcanza la Villa (3er ascenso)',               check: g => (g.socialStage||0) >= 3, reward:{ money:2000000, gems:30 }, story:'Villa con piscina. Tu infancia fue humilde — tu presente es extraordinario.' },
  { id:'s14', icon:'💎', title:'Coleccionista',         desc:'Compra 10 mejoras permanentes de Influencia',  check: g => Object.keys(g.influenceUpgrades||{}).length >= 10, reward:{ money:3000000, gems:35 }, story:'Cada mejora es una pieza del puzzle. El Imperio se fortalece desde adentro.' },
  { id:'s15', icon:'🏙️', title:'Banco Central',         desc:'Abre el Banco Central',                       check: g => g.businesses?.banco_central?.level > 0, reward:{ money:5000000, gems:40 }, story:'Ya no eres del barrio. El barrio es tuyo. El banco central lo certifica.' },

  // ── ARC 3: La Corporación ─────────────────────────────────────
  { id:'s16', icon:'✈️', title:'El Jet Privado',        desc:'Alcanza el Penthouse (5to ascenso)',           check: g => (g.socialStage||0) >= 5, reward:{ money:10000000, gems:60 }, story:'Un jet privado. Ya no esperas por nadie. El mundo entero es tu barrio.' },
  { id:'s17', icon:'🌍', title:'Imperio Global',         desc:'Abre la Corporación Global',                  check: g => g.businesses?.corporacion?.level > 0, reward:{ money:20000000, gems:75 }, story:'Tu corporación opera en tres continentes. Todo empezó con $500.' },
  { id:'s18', icon:'🎯', title:'El Nivel 25',            desc:'Llega al Nivel 25',                           check: g => g.level >= 24, reward:{ money:30000000, gems:80 }, story:'Nivel 25. Eres uno de los pocos que llegó hasta aquí. El barrio te rinde homenaje.' },
  { id:'s19', icon:'🔱', title:'Rey Absoluto',           desc:'6 Ascensos + Nivel 25',                       check: g => (g.socialStage||0) >= 6 && g.level >= 24, reward:{ money:50000000, gems:100 }, story:'El máximo ascenso. La Corporación Global. Tu nombre es sinónimo de poder.' },
  { id:'s20', icon:'🌈', title:'La Historia Completa',   desc:'Completa las 19 misiones anteriores',         check: g => g.storyClaimed && Object.keys(g.storyClaimed).filter(k=>k!=='s20').length >= 19, reward:{ money:100000000, gems:150 }, story:'De $500 a un Imperio. Esta es la historia que le contarás a tus hijos. Eres la Leyenda del Barrio.' },
];

function renderStoryMissions() {
  if (!G.storyClaimed) G.storyClaimed = {};
  const container = document.getElementById('storyMissionsContainer');
  if (!container) return;

  const activeMissions = STORY_MISSIONS.filter(m => !G.storyClaimed[m.id]);
  const nextMission = activeMissions[0];
  const completedCount = STORY_MISSIONS.length - activeMissions.length;

  container.innerHTML = `
    <div style="background:linear-gradient(135deg,#1a0d3a,#2d1a4a);border:3px solid #9B5DE5;border-radius:18px;padding:16px;margin-bottom:12px;">
      <div style="font-family:'Boogaloo',cursive;font-size:1.2rem;color:#D4A8FF;margin-bottom:4px;">📖 Historia del Imperio <span style="font-size:0.7rem;color:rgba(255,255,255,0.4);font-family:'Nunito',sans-serif;">${completedCount}/${STORY_MISSIONS.length}</span></div>
      <div style="height:4px;background:rgba(255,255,255,0.1);border-radius:99px;margin-bottom:12px;overflow:hidden;">
        <div style="height:100%;width:${completedCount/STORY_MISSIONS.length*100}%;background:linear-gradient(90deg,#9B5DE5,#D4A8FF);border-radius:99px;"></div>
      </div>
      ${STORY_MISSIONS.slice(0, completedCount + 2).map(m => {
        const done = !!G.storyClaimed[m.id];
        const ready = !done && m.check(G);
        return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;background:${done?'rgba(45,198,83,0.1)':ready?'rgba(255,225,53,0.08)':'rgba(255,255,255,0.04)'};border:2px solid ${done?'rgba(45,198,83,0.3)':ready?'rgba(255,225,53,0.3)':'rgba(255,255,255,0.08)'};margin-bottom:6px;">
          <div style="font-size:1.6rem;">${done?'✅':m.icon}</div>
          <div style="flex:1;">
            <div style="font-family:'Fredoka One',cursive;font-size:0.85rem;color:${done?'#2DC653':ready?'#FFE135':'rgba(255,255,255,0.6)'};">${m.title}</div>
            <div style="font-size:0.62rem;color:rgba(255,255,255,0.4);font-weight:900;">${done?m.story:m.desc}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            ${done ? '<div style="font-size:0.65rem;color:#2DC653;font-weight:900;">Completado</div>' :
              ready ? `<button onclick="claimStoryMission('${m.id}')" style="background:#FFE135;border:2px solid #1E1B2E;border-radius:99px;color:#1E1B2E;font-family:'Fredoka One',cursive;font-size:0.7rem;padding:5px 10px;cursor:pointer;">+${m.reward.gems}💎</button>` :
              `<div style="font-size:0.7rem;color:rgba(255,255,255,0.25);font-weight:900;">🔒</div>`}
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function claimStoryMission(id) {
  const m = STORY_MISSIONS.find(x => x.id === id);
  if (!m || G.storyClaimed?.[id]) return;
  if (!m.check(G)) return;
  if (!G.storyClaimed) G.storyClaimed = {};
  G.storyClaimed[id] = true;
  G.money += m.reward.money;
  G.totalEarned += m.reward.money;
  addGems(m.reward.gems);
  addSeasonXP(50);
  notify(`📖 Misión: ${m.title} — +${fmt(m.reward.money)} y +${m.reward.gems}💎`);
  spawnParticles(m.reward.money);
  renderStoryMissions();
  saveGame();
}

// ═══════════════════════════════════════════════════════════════════
// EXPANDED GEM SHOP ITEMS
// ═══════════════════════════════════════════════════════════════════
// Patch GEM_ITEMS after definition
if (typeof GEM_ITEMS !== 'undefined') {
  GEM_ITEMS.push(
    { id:'xpboost', icon:'📈', name:'Boost de XP x2 (30min)', desc:'Doble XP en todos los negocios', cost:8, action:'xpboost' },
    { id:'megabiz', icon:'🏢', name:'Súper Negocio (1h)', desc:'Un negocio al azar x5 ingresos por 1 hora', cost:15, action:'megabiz' },
    { id:'shield', icon:'🛡️', name:'Escudo Anti-Reset', desc:'Protege tu progreso de un evento negativo', cost:6, action:'shield' },
    { id:'seasonxp', icon:'🏆', name:'+200 XP de Temporada', desc:'Avanza rápido en la Temporada', cost:10, action:'seasonxp' }
  );
}

// Patch buyGemItem for new items
const _origBuyGemItem = window.buyGemItem;
window.buyGemItem = function(id) {
  const item = typeof GEM_ITEMS !== 'undefined' ? GEM_ITEMS.find(i => i.id === id) : null;
  if (!item) return;
  if (item.action === 'xpboost') {
    G.xpBoostEnd = Date.now() + 30 * 60000;
    document.getElementById('gemShopOverlay').classList.remove('open');
    G.gems -= item.cost;
    document.getElementById('hdrGems').textContent = G.gems;
    notify('📈 XP x2 activo por 30 minutos!');
    saveGame();
    return;
  }
  if (item.action === 'megabiz') {
    const openBiz = typeof BUSINESSES !== 'undefined' ? BUSINESSES.filter(b => (G.businesses[b.id]?.level||0) > 0) : [];
    if (openBiz.length > 0) {
      const target = openBiz[Math.floor(Math.random() * openBiz.length)];
      G.megaBizId = target.id;
      G.megaBizEnd = Date.now() + 3600000;
      document.getElementById('gemShopOverlay').classList.remove('open');
      G.gems -= item.cost;
      document.getElementById('hdrGems').textContent = G.gems;
      notify(`🏢 ${target.name} ahora produce x5 por 1 hora!`);
      saveGame();
    }
    return;
  }
  if (item.action === 'shield') {
    G.shieldActive = true;
    document.getElementById('gemShopOverlay').classList.remove('open');
    G.gems -= item.cost;
    document.getElementById('hdrGems').textContent = G.gems;
    notify('🛡️ Escudo activo — próximo evento negativo bloqueado');
    saveGame();
    return;
  }
  if (item.action === 'seasonxp') {
    document.getElementById('gemShopOverlay').classList.remove('open');
    G.gems -= item.cost;
    document.getElementById('hdrGems').textContent = G.gems;
    addSeasonXP(200);
    notify('🏆 +200 XP de Temporada!');
    saveGame();
    return;
  }
  // Fall back to original handler
  if (_origBuyGemItem) _origBuyGemItem(id);
};

// ═══════════════════════════════════════════════════════════════════
// INJECT STORY MISSIONS INTO LOGROS TAB
// ═══════════════════════════════════════════════════════════════════
(function injectStoryMissionsTab() {
  const target = document.getElementById('tab-logros');
  if (!target) return;
  const wrapper = document.createElement('div');
  wrapper.id = 'storyMissionsContainer';
  target.insertBefore(wrapper, target.firstChild);
})();

// ═══════════════════════════════════════════════════════════════════
// SEASON XP HOOK — give XP on key actions
// ═══════════════════════════════════════════════════════════════════
(function hookSeasonXP() {
  const origSave = window.saveGame;
  window.saveGame = function() {
    if (origSave) origSave();
  };

  // Hook into biz income tick to give season XP periodically
  let _seasonXPTick = 0;
  const origTick = window.tick;
  if (origTick) {
    window.tick = function() {
      _seasonXPTick++;
      if (_seasonXPTick % 600 === 0) {  // every ~10s of game time
        const ips = typeof totalIPS === 'function' ? totalIPS() : 0;
        if (ips > 0) addSeasonXP(1);
      }
      origTick();
    };
  }
})();

// Render story missions when logros tab opens
(function hookTabChange() {
  const origShow = window.showTab;
  window.showTab = function(name) {
    if (origShow) origShow(name);
    if (name === 'logros') {
      setTimeout(renderStoryMissions, 50);
    }
  };
})();


// ═══════════════════════════════════════════════════════════════════
// GUILD / CLAN SYSTEM — respaldado por Supabase
// ═══════════════════════════════════════════════════════════════════
// CLAN WEEKLY CHALLENGES
// ═══════════════════════════════════════════════════════════════════

const CLAN_CHALLENGES = [
  { id:'cc1', icon:'💰', name:'Ganar $10M en clan',     desc:'Entre todos los miembros acumulen $10M esta semana', target: 10_000_000, stat:'totalEarned',  gemReward: 20 },
  { id:'cc2', icon:'⬆️', name:'50 mejoras en clan',     desc:'El clan completa 50 mejoras de negocios',            target: 50,         stat:'weeklyLevels', gemReward: 15 },
  { id:'cc3', icon:'🎮', name:'100 mini-juegos',         desc:'Entre todos jueguen 100 mini-juegos esta semana',    target: 100,        stat:'weeklyNego',   gemReward: 25 },
  { id:'cc4', icon:'🔓', name:'Abrir 5 negocios nuevos', desc:'El clan abre 5 negocios nuevos esta semana',         target: 5,          stat:'weeklyNewBiz', gemReward: 30 },
];

function getClanChallengeWeekId() {
  return Math.floor(Date.now() / (7 * 24 * 3600 * 1000));
}

function renderClanChallenges(members) {
  if (!members || members.length === 0) return '';
  const weekId = getClanChallengeWeekId();
  if (!G.clanChallenges) G.clanChallenges = {};
  if (G.clanChallengesWeek !== weekId) {
    G.clanChallengesWeek = weekId;
    G.clanChallenges = {};
  }

  // Pick 2 challenges for this week (deterministic by weekId)
  const active = [CLAN_CHALLENGES[weekId % 4], CLAN_CHALLENGES[(weekId + 2) % 4]];

  return `<div style="margin-top:14px;">
    <div style="font-size:0.6rem;color:rgba(255,255,255,0.35);font-weight:900;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">⚔️ Retos del Clan — Esta Semana</div>
    ${active.map(ch => {
      // Sum stat across all members
      const total = members.reduce((s,m) => {
        const v = (m[ch.stat]||0);
        return s + v;
      }, 0);
      const pct = Math.min(100, Math.floor(total / ch.target * 100));
      const done = total >= ch.target;
      const claimed = G.clanChallenges[ch.id];
      return `<div style="background:rgba(255,255,255,0.05);border:2px solid ${done?'#2DC653':'rgba(255,255,255,0.08)'};border-radius:14px;padding:12px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-family:'Fredoka One',cursive;font-size:0.95rem;color:white;">${ch.icon} ${ch.name}</span>
          <span style="font-size:0.7rem;color:#FFE135;font-weight:900;">+${ch.gemReward}💎</span>
        </div>
        <div style="font-size:0.7rem;color:rgba(255,255,255,0.5);margin-bottom:8px;">${ch.desc}</div>
        <div style="background:rgba(255,255,255,0.08);border-radius:99px;height:8px;overflow:hidden;margin-bottom:8px;">
          <div style="height:100%;width:${pct}%;background:${done?'#2DC653':'#FFE135'};border-radius:99px;transition:width 0.5s;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:0.7rem;color:rgba(255,255,255,0.5);">${fmtRaw(total)} / ${fmtRaw(ch.target)} (${pct}%)</span>
          ${done && !claimed
            ? `<button onclick="claimClanChallenge('${ch.id}',${ch.gemReward})" style="background:linear-gradient(135deg,#2DC653,#00a844);border:2px solid #1E1B2E;border-radius:10px;color:white;font-family:'Fredoka One',cursive;font-size:0.8rem;padding:5px 12px;cursor:pointer;">¡Reclamar!</button>`
            : claimed
              ? `<span style="font-size:0.75rem;color:#2DC653;font-weight:900;">✅ Reclamado</span>`
              : `<span style="font-size:0.7rem;color:rgba(255,255,255,0.3);">${pct}% completo</span>`
          }
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function claimClanChallenge(id, gems) {
  if (!G.clanChallenges) G.clanChallenges = {};
  if (G.clanChallenges[id]) return;
  G.clanChallenges[id] = true;
  addGems(gems);
  saveGame();
  notify(`⚔️ ¡Reto de clan completado! +${gems}💎`);
  openGuildPanel(); // refresh
}

// El juego corre en un iframe, así que usamos postMessage para
// pedirle al parent React que ejecute las llamadas a Supabase.
// ═══════════════════════════════════════════════════════════════════

const GUILD_EMOJIS = ['🏘️','⚔️','🔥','💎','🦁','👑','🌟','💪','🛡️','🚀','🎯','🌴'];

// ── postMessage helpers ───────────────────────────────────────────
function _guildRequest(action, payload) {
  return new Promise((resolve) => {
    const id = 'guild_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    const handler = (e) => {
      if (!e.data || e.data.type !== 'GUILD_RESPONSE' || e.data.id !== id) return;
      window.removeEventListener('message', handler);
      resolve(e.data.result);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: 'GUILD_REQUEST', id, action, payload }, '*');
    // Timeout fallback — 5s
    setTimeout(() => { window.removeEventListener('message', handler); resolve(null); }, 5000);
  });
}

// ── Panel ─────────────────────────────────────────────────────────
function openGuildPanel() {
  renderGuildPanel();
  document.getElementById('guildOverlay').style.display = 'flex';
}
function closeGuildPanel() {
  document.getElementById('guildOverlay').style.display = 'none';
}

async function renderGuildPanel() {
  const el = document.getElementById('guildContent');
  if (!el) return;
  el.innerHTML = `<div style="text-align:center;padding:30px;color:rgba(255,255,255,0.4);font-family:'Fredoka One',cursive;">Cargando...</div>`;

  if (G.guildCode) {
    // Fetch members from Supabase
    const data = await _guildRequest('getMembers', { code: G.guildCode });
    if (data?.members) window._lastGuildMembers = data.members;
    const members = (data?.members || []);
    const guild   = data?.guild || { name: G.guildName, emoji: G.guildEmoji, total_earned: 0 };

    el.innerHTML = `
      <div style="background:linear-gradient(135deg,rgba(255,215,0,0.12),rgba(255,215,0,0.05));border:2px solid rgba(255,215,0,0.3);border-radius:16px;padding:16px;margin-bottom:14px;text-align:center;">
        <div style="font-size:2.8rem;margin-bottom:4px;">${guild.emoji||G.guildEmoji||'🤝'}</div>
        <div style="font-family:'Boogaloo',cursive;font-size:1.3rem;color:#FFD700;">${guild.name||G.guildName}</div>
        <div style="font-size:0.65rem;color:rgba(255,255,255,0.4);font-weight:900;margin:4px 0;">Código: <span style="color:#FFD700;letter-spacing:3px;">${G.guildCode}</span></div>
        <div style="font-size:0.75rem;color:#2DC653;font-weight:900;">${members.length} miembro${members.length!==1?'s':''} · Total: ${fmt(guild.total_earned||0)}</div>
        <button onclick="copyGuildCode()" style="margin-top:8px;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.4);border-radius:99px;color:#FFD700;font-family:'Fredoka One',cursive;font-size:0.75rem;padding:5px 14px;cursor:pointer;">📋 Invitar amigos</button>
      </div>

      <div style="font-size:0.6rem;color:rgba(255,255,255,0.35);font-weight:900;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">🏆 Ranking del Clan</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px;">
        ${members.map((m, i) => {
          const isMe = m.username === (G.companyName||'Jugador');
          const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':`${i+1}.`;
          return `<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:10px;background:${isMe?'rgba(255,215,0,0.1)':'rgba(255,255,255,0.04)'};border:1px solid ${isMe?'rgba(255,215,0,0.3)':'rgba(255,255,255,0.06)'};">
            <span style="font-size:1rem;width:24px;text-align:center;">${medal}</span>
            <span style="font-size:1.2rem;">${m.avatar||'😎'}</span>
            <div style="flex:1;">
              <div style="font-family:'Fredoka One',cursive;font-size:0.82rem;color:${isMe?'#FFD700':'white'};">${m.username||'Jugador'}</div>
              <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);font-weight:900;">Nv.${(m.level||0)+1} · ${(m.social_stage||0) > 0 ? ['🏠','🏡','🏖️','🏙️','🛩️','🌎'][(m.social_stage||1)-1] : '🏘️'}</div>
            </div>
            <div style="font-family:'Fredoka One',cursive;font-size:0.82rem;color:#2DC653;">${fmt(m.total_earned||0)}</div>
          </div>`;
        }).join('') || '<div style="text-align:center;color:rgba(255,255,255,0.3);font-size:0.8rem;padding:16px;">Sin miembros aún</div>'}
      </div>

      <div style="display:flex;gap:8px;">
        <button onclick="renderGuildPanel()" style="flex:1;background:rgba(45,198,83,0.15);border:2px solid rgba(45,198,83,0.4);border-radius:12px;color:#2DC653;font-family:'Fredoka One',cursive;font-size:0.8rem;padding:8px;cursor:pointer;">🔄 Actualizar</button>
        <button onclick="leaveGuildAction()" style="background:rgba(255,71,87,0.1);border:2px solid rgba(255,71,87,0.3);border-radius:12px;color:rgba(255,71,87,0.7);font-family:'Fredoka One',cursive;font-size:0.8rem;padding:8px 14px;cursor:pointer;">Salir</button>
      </div>
      ${renderClanChallenges(members)}`;
    return;
  }

  // No guild — show create/join UI
  el.innerHTML = `
    <div style="text-align:center;padding:10px 0 18px;">
      <div style="font-size:3rem;margin-bottom:8px;">🤝</div>
      <div style="font-family:'Fredoka One',cursive;color:rgba(255,255,255,0.6);font-size:0.9rem;margin-bottom:4px;">Únete a un clan con tus amigos</div>
      <div style="font-size:0.65rem;color:rgba(255,255,255,0.35);font-weight:900;">Compitan en ranking grupal y dominen el barrio juntos</div>
    </div>

    <div style="font-size:0.6rem;color:rgba(255,255,255,0.35);font-weight:900;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">🔥 Crear un Clan Nuevo</div>
    <div style="background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;margin-bottom:14px;">
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:10px;" id="guildEmojiPicker">
        ${GUILD_EMOJIS.map(e => `<button onclick="selectGuildEmoji('${e}')" id="ge_${e}" style="font-size:1.4rem;width:38px;height:38px;border-radius:10px;border:2px solid ${e==='🏘️'?'#FFD700':'rgba(255,255,255,0.1)'};background:${e==='🏘️'?'rgba(255,215,0,0.2)':'rgba(255,255,255,0.04)'};cursor:pointer;">${e}</button>`).join('')}
      </div>
      <input id="guildNameInput" maxlength="24" placeholder="Nombre del clan (ej: Los Campeones)" style="width:100%;background:rgba(255,255,255,0.07);border:2px solid rgba(255,255,255,0.12);border-radius:10px;color:white;font-family:'Fredoka One',cursive;font-size:0.9rem;padding:10px 12px;box-sizing:border-box;outline:none;margin-bottom:8px;" />
      <button onclick="createGuildAction()" style="width:100%;background:linear-gradient(135deg,#FFD700,#FFA500);border:2px solid #1E1B2E;border-radius:12px;color:#1E1B2E;font-family:'Fredoka One',cursive;font-size:0.95rem;padding:10px;cursor:pointer;">⚔️ Crear Clan</button>
    </div>

    <div style="font-size:0.6rem;color:rgba(255,255,255,0.35);font-weight:900;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">🔗 Unirse con Código</div>
    <div style="background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;">
      <input id="guildJoinInput" maxlength="10" placeholder="Código del clan" style="width:100%;background:rgba(255,255,255,0.07);border:2px solid rgba(255,255,255,0.12);border-radius:10px;color:white;font-family:'Fredoka One',cursive;font-size:1rem;padding:10px 12px;box-sizing:border-box;outline:none;letter-spacing:3px;margin-bottom:8px;text-transform:uppercase;" />
      <button onclick="joinGuildAction()" style="width:100%;background:rgba(45,198,83,0.2);border:2px solid #2DC653;border-radius:12px;color:#2DC653;font-family:'Fredoka One',cursive;font-size:0.95rem;padding:10px;cursor:pointer;">🚀 Unirse al Clan</button>
    </div>`;
}

let _selectedGuildEmoji = '🏘️';
function selectGuildEmoji(e) {
  _selectedGuildEmoji = e;
  document.querySelectorAll('[id^="ge_"]').forEach(b => {
    b.style.borderColor = b.id === 'ge_' + e ? '#FFD700' : 'rgba(255,255,255,0.1)';
    b.style.background  = b.id === 'ge_' + e ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.04)';
  });
}

async function createGuildAction() {
  const name = document.getElementById('guildNameInput')?.value?.trim();
  if (!name || name.length < 2) { notify('⚠️ Escribe un nombre para el clan'); return; }
  const code = name.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,4) + (Math.floor(Math.random()*9000)+1000);
  notify('⏳ Creando clan...');
  const result = await _guildRequest('create', { name, emoji: _selectedGuildEmoji, code, gameState: G });
  if (result?.error) { notify('❌ ' + result.error); return; }
  G.guildName  = name;
  G.guildCode  = code;
  G.guildEmoji = _selectedGuildEmoji;
  saveGame();
  notify(`⚔️ ¡Clan "${name}" creado! Código: ${code}`);
  renderGuildPanel();
  const secEl = document.getElementById('secGuildName');
  if (secEl) secEl.textContent = `${_selectedGuildEmoji} ${name}`;
}

async function joinGuildAction() {
  const code = document.getElementById('guildJoinInput')?.value?.trim().toUpperCase();
  if (!code || code.length < 4) { notify('⚠️ Ingresa el código del clan'); return; }
  notify('⏳ Buscando clan...');
  const result = await _guildRequest('join', { code, gameState: G });
  if (!result || result.error) { notify('❌ ' + (result?.error || 'Código inválido')); return; }
  G.guildCode  = code;
  G.guildName  = result.guild?.name  || 'Clan';
  G.guildEmoji = result.guild?.emoji || '🤝';
  saveGame();
  notify(`🎉 ¡Te uniste a "${G.guildName}"!`);
  renderGuildPanel();
  const secEl = document.getElementById('secGuildName');
  if (secEl) secEl.textContent = `${G.guildEmoji} ${G.guildName}`;
}

async function leaveGuildAction() {
  if (!confirm('¿Seguro que quieres salir del clan?')) return;
  await _guildRequest('leave', { code: G.guildCode, gameState: G });
  G.guildName = null;
  G.guildCode = null;
  G.guildEmoji = null;
  saveGame();
  renderGuildPanel();
  notify('👋 Saliste del clan');
  const secEl = document.getElementById('secGuildName');
  if (secEl) secEl.textContent = 'Sin clan — crea o únete';
}

function copyGuildCode() {
  const txt = `🤝 ¡Únete a mi clan "${G.guildName}" en Imperio del Barrio! Código: ${G.guildCode} — Juega gratis en https://www.imperiodelbarrio.com #ImperioDelBarrio`;
  if (navigator.share) {
    navigator.share({ title: 'Imperio del Barrio', text: txt, url: 'https://www.imperiodelbarrio.com' }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(txt).catch(() => {});
    notify('📋 ¡Código copiado!');
  }
}

// Sync guild on every game save (non-blocking)
const _origSaveForGuild = window.saveGame;
if (_origSaveForGuild && !window._guildHookApplied) {
  window._guildHookApplied = true;
  window.saveGame = function() {
    _origSaveForGuild();
    if (G.guildCode) {
      _guildRequest('sync', { code: G.guildCode, gameState: G }).catch(() => {});
    }
  };
}


// ═══════════════════════════════════════════════════════════════════
// IMPROVED TUTORIAL SYSTEM (replaces old tooltip style)
// ═══════════════════════════════════════════════════════════════════

const TUTORIAL_V2 = [
  {
    emoji: '👋',
    title: '¡Bienvenido al Imperio!',
    msg: 'Eres el nuevo dueño del barrio. Empieza abriendo tu primera barbería con los $500 que tienes. ¡Toca el botón 🔓 Abrir!',
  },
  {
    emoji: '💈',
    title: 'Tu primer negocio',
    msg: 'La barbería produce dinero automáticamente cada pocos segundos. Mejórala con ⬆️ Mejorar para ganar más por ciclo.',
  },
  {
    emoji: '💎',
    title: 'Las Gemas',
    msg: 'Las gemas 💎 son la moneda premium. Gánalas gratis completando logros, objetivos diarios, jugando mini-juegos y compartiendo el juego. ¡Toca ✨ Ganar!',
  },
  {
    emoji: '🎮',
    title: 'Mini-juegos de Negociación',
    msg: 'Cada negocio tiene un botón 🎮 Jugar. Úsalo para acceder a 5 mini-juegos distintos que te dan dinero bonus según tu puntuación.',
  },
  {
    emoji: '⬆️',
    title: 'Sube de Nivel',
    msg: 'Cada vez que gastas dinero en negocios y mejoras, ganas XP. Subir de nivel desbloquea nuevos negocios y zonas del mapa.',
  },
  {
    emoji: '🗺️',
    title: 'Zonas de la Ciudad',
    msg: 'Hay 6 zonas con diferentes multiplicadores. La Zona Premium da 6.5x ingresos. Ve al tab 🗺️ Ciudad para explorar.',
  },
  {
    emoji: '🤝',
    title: 'Clanes',
    msg: '¡Crea o únete a un clan con amigos! Compitan en el ranking grupal. Ve a ⚙️ Más → Mi Clan para empezar.',
  },
];

let _tutV2Step = 0;
let _tutV2Active = false;

function startTutorialV2() {
  if (G.tutorialV2Done || _tutV2Active) return;
  _tutV2Active = true;
  _tutV2Step = 0;
  showTutorialV2Step();
}

function showTutorialV2Step() {
  const overlay = document.getElementById('tutorialOverlay');
  if (!overlay) return;
  if (_tutV2Step >= TUTORIAL_V2.length) {
    endTutorialV2(); return;
  }
  const step = TUTORIAL_V2[_tutV2Step];
  overlay.style.display = 'block';
  document.getElementById('tutEmoji').textContent = step.emoji;
  document.getElementById('tutTitle').textContent = step.title;
  document.getElementById('tutMsg').textContent = step.msg;
  document.getElementById('tutStep').textContent = `Paso ${_tutV2Step+1} de ${TUTORIAL_V2.length}`;

  // Dots
  document.getElementById('tutDots').innerHTML = TUTORIAL_V2.map((_,i) =>
    `<div style="width:6px;height:6px;border-radius:99px;background:${i===_tutV2Step?'#FFE135':'rgba(255,255,255,0.2)'}"></div>`
  ).join('');

  // Last step: change button text
  const nextBtn = document.getElementById('tutNext');
  if (nextBtn) nextBtn.textContent = _tutV2Step === TUTORIAL_V2.length - 1 ? '¡Listo! 🎉' : 'Siguiente →';

  // Reward gems on start
  if (_tutV2Step === 0) { addGems(5); notify('🎁 +5 💎 de bienvenida!'); }
}

function nextTutorialStep() {
  _tutV2Step++;
  if (_tutV2Step >= TUTORIAL_V2.length) { endTutorialV2(); return; }
  showTutorialV2Step();
}

function skipTutorial() {
  endTutorialV2();
}

function endTutorialV2() {
  _tutV2Active = false;
  G.tutorialV2Done = true;
  saveGame();
  const overlay = document.getElementById('tutorialOverlay');
  if (overlay) overlay.style.display = 'none';
  notify('🎓 Tutorial completo. ¡Construye tu Imperio!');
}

// ── State migration + auto-start ────────────────────────────────────
if (!G.guildName)      G.guildName  = null;
if (!G.guildCode)      G.guildCode  = null;
if (!G.guildEmoji)     G.guildEmoji = null;
if (!G.tutorialV2Done) G.tutorialV2Done = false;

// Start tutorial for new players (delay so game loads first)
setTimeout(() => {
  if (!G.tutorialV2Done && (G.totalEarned || 0) < 1000) {
    startTutorialV2();
  }
}, 2500);

// Sync guild every 2 minutes while playing
setInterval(() => { if (G.guildCode) _guildRequest('sync', { code: G.guildCode, gameState: G }).catch(() => {}); }, 120000);



(function() {

  // ── Modal de login/cuenta ─────────────────────────────────
  window.openCloudAuth = function() {
    const existing = document.getElementById('_cloudModal');
    if (existing) { existing.remove(); return; }
    const modal = document.createElement('div');
    modal.id = '_cloudModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);padding:16px;font-family:Nunito,sans-serif';

    if (_cloudUser) {
      modal.innerHTML = `
        <div style="background:#1E1B2E;border:3px solid #FFE135;border-radius:20px;padding:28px;width:100%;max-width:360px;text-align:center">
          <div style="font-size:2rem;margin-bottom:6px">☁️</div>
          <h2 style="font-family:'Fredoka One',cursive;color:#FFE135;font-size:1.4rem;margin:0 0 4px">Sesión activa</h2>
          <p style="color:#aaa;font-size:12px;margin:0 0 20px">${_cloudUser.email}</p>
          <button onclick="window._cloudManualSave()" style="width:100%;padding:11px;border-radius:12px;border:none;background:#2DC653;color:#fff;font-family:'Fredoka One',cursive;font-size:15px;cursor:pointer;margin-bottom:8px">💾 Guardar ahora</button>
          <button onclick="window._cloudManualLoad()" style="width:100%;padding:11px;border-radius:12px;border:2px solid #FFE135;background:rgba(255,225,53,0.1);color:#FFE135;font-family:'Fredoka One',cursive;font-size:15px;cursor:pointer;margin-bottom:8px">☁️ Cargar desde nube</button>
          <button onclick="window._cloudSignOut()" style="width:100%;padding:9px;border-radius:12px;border:1px solid rgba(255,71,87,0.4);background:transparent;color:#FF4757;font-family:'Fredoka One',cursive;font-size:14px;cursor:pointer;margin-bottom:12px">Cerrar sesión</button>
          <button onclick="document.getElementById('_cloudModal').remove()" style="background:none;border:none;color:#555;cursor:pointer;font-size:13px">Cerrar</button>
        </div>`;
    } else {
      modal.innerHTML = `
        <div style="background:#1E1B2E;border:3px solid #FFE135;border-radius:20px;padding:28px;width:100%;max-width:380px">
          <div style="text-align:center;margin-bottom:18px">
            <div style="font-size:2.5rem">🏘️</div>
            <h2 style="font-family:'Fredoka One',cursive;color:#FFE135;font-size:1.6rem;margin:4px 0">¡Guarda tu Imperio!</h2>
            <p style="color:#aaa;font-size:13px;margin:0">Sincroniza en la nube. Nunca pierdas tu progreso.</p>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:14px">
            <button onclick="window._setCloudTab('login')" id="_ctabL" style="flex:1;padding:8px;border-radius:10px;border:2px solid #FFE135;background:rgba(255,225,53,0.15);color:#FFE135;font-family:'Fredoka One',cursive;cursor:pointer;font-size:13px">Entrar</button>
            <button onclick="window._setCloudTab('reg')" id="_ctabR" style="flex:1;padding:8px;border-radius:10px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:#888;font-family:'Fredoka One',cursive;cursor:pointer;font-size:13px">Registrarse</button>
          </div>
          <input id="_cemail" type="email" placeholder="Correo electrónico" style="width:100%;padding:10px 14px;border-radius:10px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);color:white;font-size:14px;outline:none;margin-bottom:8px;box-sizing:border-box">
          <input id="_cpass" type="password" placeholder="Contraseña (mín. 6 caracteres)" style="width:100%;padding:10px 14px;border-radius:10px;border:2px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);color:white;font-size:14px;outline:none;margin-bottom:8px;box-sizing:border-box">
          <div id="_cerr" style="display:none;background:rgba(255,71,87,.15);border:1px solid #FF4757;border-radius:8px;padding:7px 12px;margin-bottom:8px;color:#FF4757;font-size:12px"></div>
          <button id="_csubmit" onclick="window._cloudSubmit()" style="width:100%;padding:12px;border-radius:12px;border:none;background:#FFE135;color:#1E1B2E;font-family:'Fredoka One',cursive;font-size:16px;cursor:pointer;margin-bottom:8px">🚀 Entrar al Barrio</button>
          <button onclick="document.getElementById('_cloudModal').remove()" style="display:block;width:100%;background:none;border:none;color:#555;cursor:pointer;font-size:13px">Cancelar</button>
        </div>`;
    }
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  };

  let _ctab = 'login';
  window._setCloudTab = function(t) {
    _ctab = t;
    const l = document.getElementById('_ctabL');
    const r = document.getElementById('_ctabR');
    const s = document.getElementById('_csubmit');
    if (!l||!r||!s) return;
    const on  = 'flex:1;padding:8px;border-radius:10px;border:2px solid #FFE135;background:rgba(255,225,53,0.15);color:#FFE135;font-family:Fredoka One,cursive;cursor:pointer;font-size:13px';
    const off = 'flex:1;padding:8px;border-radius:10px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:#888;font-family:Fredoka One,cursive;cursor:pointer;font-size:13px';
    l.style.cssText = t==='login' ? on : off;
    r.style.cssText = t==='reg'   ? on : off;
    s.textContent = t==='login' ? '🚀 Entrar al Barrio' : '🏘️ Crear cuenta';
  };

  window._cloudSubmit = async function() {
    const sb    = _getCloud();
    const email = document.getElementById('_cemail')?.value?.trim();
    const pass  = document.getElementById('_cpass')?.value;
    const btn   = document.getElementById('_csubmit');
    const err   = document.getElementById('_cerr');
    if (!email||!pass) { if(err){err.textContent='⚠️ Completa todos los campos';err.style.display='block';} return; }
    if (btn) { btn.textContent='⏳ Cargando...'; btn.disabled=true; }
    try {
      const res = _ctab==='login'
        ? await sb.auth.signInWithPassword({ email, password: pass })
        : await sb.auth.signUp({ email, password: pass });
      if (res.error) throw res.error;
      _cloudUser = res.data.user;
      _updateCloudBtn();
      document.getElementById('_cloudModal')?.remove();
      if (_ctab==='login') {
        await _cloudDoLoad();
        _cloudStartAutoSave();
        notify('☁️ ¡Sesión iniciada!');
      } else {
        await _cloudDoSave(false);
        _cloudStartAutoSave();
        notify('☁️ ¡Cuenta creada! Progreso guardado.');
      }
    } catch(e) {
      if(err){err.textContent='⚠️ '+(e.message||'Error');err.style.display='block';}
      if(btn){btn.textContent=_ctab==='login'?'🚀 Entrar al Barrio':'🏘️ Crear cuenta';btn.disabled=false;}
    }
  };

  window._cloudManualSave = async function() {
    document.getElementById('_cloudModal')?.remove();
    await _cloudDoSave(false);
  };

  window._cloudManualLoad = async function() {
    document.getElementById('_cloudModal')?.remove();
    await _cloudDoLoad();
  };

  window._cloudSignOut = async function() {
    const sb = _getCloud();
    await sb?.auth.signOut();
    _cloudUser = null;
    clearInterval(_cloudAutoSave);
    _updateCloudBtn();
    document.getElementById('_cloudModal')?.remove();
    notify('👋 Sesión cerrada');
  };

  // ── Interceptar resetGame para limpiar Supabase también ──
  const _origReset = window.resetGame;
  window.resetGame = function() {
    if (typeof _origReset === 'function') _origReset();
    // Parchear el botón de confirmación cuando aparezca
    const obs = new MutationObserver(() => {
      const btn = document.getElementById('resetConfirmBtn');
      if (btn && !btn._cloudPatched) {
        btn._cloudPatched = true;
        btn.addEventListener('click', async () => {
          obs.disconnect();
          if (!_cloudUser) return;
          const sb = _getCloud();
          await sb?.rpc('upsert_game_save', {
            p_money:500, p_total_earned:500, p_level:0,
            p_prestige_stars:0, p_prestige_mult:1, p_zone:'centro',
            p_game_state:{ money:500, totalEarned:500, xp:0, level:0,
              prestigeStars:0, prestigeMult:1, socialStage:0, influence:0,
              totalInfluence:0, influenceUpgrades:{}, businesses:{},
              upgrades:{}, achievements:{}, zone:'centro',
              zoneHistory:['centro'], gems:0, lastSave:Date.now() },
            p_save_version:1, p_social_stage:0, p_influence:0, p_guild_code:null,
          }).catch(()=>{});
        }, { once: true });
      }
    });
    obs.observe(document.body, { childList: true });
  };

  // ── Init: verificar sesión guardada al arrancar ───────────
  (async function() {
    const sb = _getCloud();
    if (!sb) return;
    const { data } = await sb.auth.getSession();
    _cloudUser = data.session?.user ?? null;
    _updateCloudBtn();
    if (_cloudUser) {
      _cloudStartAutoSave();
      // Cargar nube en paralelo al splash — si termina antes, actualiza G
      _cloudDoLoad();
    }
    // Escuchar cambios de sesión
    sb.auth.onAuthStateChange((_event, session) => {
      _cloudUser = session?.user ?? null;
      _updateCloudBtn();
      if (_event === 'SIGNED_IN') { _cloudDoLoad(); _cloudStartAutoSave(); }
      if (_event === 'SIGNED_OUT') clearInterval(_cloudAutoSave);
    });
  })();

})();