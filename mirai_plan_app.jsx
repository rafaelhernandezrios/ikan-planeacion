import { useState } from "react";

const PEOPLE = [
  { name: "Rafael", role: "Coordinación general / Timer", color: "#0a3fa8", available: "10:00 →" },
  { name: "Dr. Peñaloza", role: "Bienvenida / Supervisión", color: "#7c3aed", available: "10:00 →" },
  { name: "Daniel", role: "S3, S10, S13", color: "#7c3aed", available: "→ 13:30 (sale)" },
  { name: "Miri", role: "CanSat (S11) / Coord. circulante", color: "#d97706", available: "10:00 →" },
  { name: "Rene", role: "Logística / Señalética", color: "#16a34a", available: "10:00 →" },
  { name: "Estudiante EMFUTECH 1", role: "Exhibit asignado", color: "#1565c0", available: "10:00 →" },
  { name: "Estudiante EMFUTECH 2", role: "Exhibit asignado", color: "#1565c0", available: "10:00 →" },
  { name: "Estudiante EMFUTECH 3", role: "Exhibit asignado", color: "#1565c0", available: "10:00 →" },
  { name: "Estudiante EMFUTECH 4", role: "Exhibit asignado", color: "#1565c0", available: "10:00 →" },
  { name: "Estudiante EMFUTECH 5", role: "Exhibit asignado", color: "#1565c0", available: "10:00 →" },
];

const EXHIBITS = [
  { id: "S2", name: "Human-Robot Interaction", tech: "Pepper Robot" },
  { id: "S3", name: "Humanoid Avatar & Telepresence", tech: "G1 + FPV" },
  { id: "S4", name: "VR-Based Cognitive Assessment", tech: "Oculus + PC" },
  { id: "S5", name: "Immersive VR for Mental Well-being", tech: "VR + Módem" },
  { id: "S6", name: "Vending Machine VR", tech: "Oculus" },
  { id: "S7", name: "Dual-arm Robotic Teleoperation", tech: "Robot dual-arm" },
  { id: "S8", name: "Wearable Robotics for Rehabilitation", tech: "Exoesqueleto + Myoware" },
  { id: "S9", name: "EEG-Monitored VR Phobia Exposure", tech: "VR + EEG + Módem" },
  { id: "S10", name: "Spider-like Locomotion", tech: "Robot araña" },
  { id: "S11", name: "Pico Satellite", tech: "CanSat + VR" },
  { id: "S12", name: "Brain-Computer Interface", tech: "Aura EEG + Robot" },
  { id: "S13", name: "Computer Vision & Pose Estimation", tech: "Cámara + LEDs" },
  { id: "S14", name: "Remote Vehicle Teleoperation", tech: "Vehículo + Módem" },
  { id: "S15", name: "Web-Based Robot Teleoperation", tech: "Brazo robótico + Web" },
];

const INITIAL_ASSIGNMENTS = {
  S2: "Por asignar", S3: "Daniel", S4: "Estudiante EMFUTECH 1",
  S5: "Por asignar", S6: "Por asignar", S7: "Por asignar",
  S8: "Estudiante EMFUTECH 2", S9: "Por asignar", S10: "Daniel",
  S11: "Miri", S12: "Por asignar", S13: "Daniel",
  S14: "Estudiante EMFUTECH 3", S15: "Por asignar",
};

const ASSIGNABLE = [
  "Rafael", "Dr. Peñaloza", "Daniel", "Miri", "Rene",
  "Estudiante EMFUTECH 1", "Estudiante EMFUTECH 2", "Estudiante EMFUTECH 3",
  "Estudiante EMFUTECH 4", "Estudiante EMFUTECH 5",
  "Mentor contratado 1", "Mentor contratado 2", "Mentor contratado 3",
  "Mentor contratado 4", "Mentor contratado 5",
  "Por asignar"
];

const DAY1_PHASES = [
  {
    time: "10:00 — 11:00", label: "Fase 1 · Llegada y descarga", tag: "Todo el equipo + Dr. Peñaloza",
    rows: [
      { time: "10:00", who: ["Todos"], title: "Llegada al espacio — briefing rápido (10 min)", desc: "Rafael explica el plan del día, el circuito físico y quién monta qué. Se asignan zonas de descarga.", result: ["Todos saben qué hacer"] },
      { time: "10:10", who: ["Todos"], title: "Descarga y transporte de equipos al open space", desc: "Todo el equipo participa en la descarga. Cada estudiante EMFUTECH se hace responsable de su equipo pero todos ayudan a cargar y mover.", result: ["Equipos en el open space", "Nada olvidado en los autos"] },
      { time: "10:10", who: ["Rene"], title: "Marcar circuito físico en el piso", desc: "Colocar flechas de cinta adhesiva y letreros de posición (S2→S3→...→S15). Así cada quien sabe dónde va su exhibit. Simultáneo a la descarga.", result: ["Circuito marcado", "Posiciones claras desde 5m"] },
    ]
  },
  {
    time: "11:00 — 13:00", label: "Fase 2 · Montaje y encendido", tag: "Daniel sale a las 13:30",
    rows: [
      { time: "11:00–13:00", who: ["EMFUTECH ×5", "Daniel", "Miri"], title: "Montaje simultáneo de los 14 exhibits", desc: "Cada estudiante monta y enciende su exhibit en su posición. Daniel prioriza S3 (G1+FPV) primero, luego S10 y S13. Miri monta S11 (CanSat). Rafael circula resolviendo problemas técnicos.", result: ["14 exhibits en posición", "Encendidos y funcionando"], note: "Prioridad: S3, S5, S9, S15 — mayor riesgo técnico" },
      { time: "11:00–13:00", who: ["Rafael"], title: "Configurar módem y red local", desc: "Conectar S5, S9 y S14 al módem. Verificar que los tres corren simultáneamente sin interferencia. Este es el paso más crítico del montaje.", result: ["Red local estable", "S5, S9, S14 conectados"], note: "Si hay problemas de red, priorizar sobre cualquier otra cosa" },
      { time: "11:00–13:00", who: ["Rene"], title: "Apoyo logístico durante el montaje", desc: "Ayudar a cargar, mover mesas, conectar cables, acomodar letreros. Estar disponible donde haga falta.", result: ["Logística resuelta"] },
      { time: "12:30", who: ["Rafael"], title: "Verificación rápida — recorrido por cada exhibit", desc: "Rafael pasa por cada posición del circuito confirmando que está encendido y funcional. Si algo no funciona, los últimos 30 min son para resolverlo.", result: ["Checklist técnico completo", "Problemas identificados"], note: "Meta: todos en verde antes de las 13:00" },
    ]
  },
  {
    time: "13:00 — 14:00", label: "Fase 3 · Lunch", tag: "Descanso",
    rows: [
      { time: "13:00", who: ["Todos"], title: "Pausa para comer — 1 hora", desc: "El equipo descansa y come. Rafael prepara los scripts impresos y los sobres con el nombre del exhibit asignado a cada mentor contratado.", result: ["Scripts listos para entregar", "Equipo descansado"] },
      { time: "13:30", who: ["Daniel"], title: "Daniel se retira", desc: "Antes de irse, Daniel hace un traspaso rápido a Rafael de S3, S10 y S13 — cómo encenderlos, reiniciarlos y qué hacer si fallan. Documentar los pasos en papel o foto.", result: ["Traspaso documentado", "Rafael puede operar S3/S10/S13"], note: "Documentar pasos de encendido de S3 especialmente" },
    ]
  },
  {
    time: "14:00 — 15:30", label: "Fase 4 · Capacitación de mentores contratados", tag: "4–5 mentores externos llegan",
    rows: [
      { time: "14:00", who: ["Rafael", "Mentores"], title: "Bienvenida y briefing general", desc: "Rafael explica la dinámica: qué es Mirai, cómo funciona la rotación de 6 min, qué se espera de ellos, cómo manejar grupos de 10 alumnos. Se entrega script de su exhibit.", result: ["Mentores entienden la dinámica", "Script en mano"], note: "20 min máximo" },
      { time: "14:20", who: ["Mentores", "EMFUTECH"], title: "Entrenamiento 1:1 en cada exhibit", desc: "Cada mentor contratado va a su exhibit asignado y aprende de la persona de EMFUTECH que lo opera: cómo encenderlo, cómo hacer la demo, qué decir, qué hacer si falla. Rafael rota supervisando.", result: ["Mentor puede operar solo", "Sabe el pitch básico"] },
      { time: "15:00", who: ["Mentores"], title: "Práctica del pitch — 6 min cada uno", desc: "Rafael cronometra. Feedback inmediato. Si el pitch está débil, 10 min más de práctica.", result: ["Cada mentor hizo su pitch al menos 1 vez"], note: "No buscar perfección — buscar capaces y seguros" },
    ]
  },
  {
    time: "15:30 — 17:00", label: "Fase 5 · Exhibición de muestra", tag: "Evaluación final",
    rows: [
      { time: "15:30", who: ["Todos"], title: "Todos en posición — exhibits encendidos", desc: "Cada mentor en su spot, exhibit encendido y listo. Rafael hace última ronda de verificación.", result: ["14 exhibits listos", "14 personas en posición"] },
      { time: "16:00", who: ["Dr. Peñaloza", "Rafael"], title: "Exhibición de muestra completa", desc: "El Dr. Peñaloza y Rafael recorren el circuito como si fueran alumnos. Cada mentor hace su pitch de 6 min. Se usa la señal real de rotación.", result: ["14 pitches evaluados", "Problemas detectados en vivo"] },
      { time: "17:00", who: ["Dr. Peñaloza", "Rafael"], title: "Sesión de feedback con todos los mentores", desc: "El Dr. Peñaloza y Rafael dan feedback general. Se corrigen puntos débiles. Si hay algo urgente, se trabaja ahí mismo o se agenda para el Día 2 antes de las 3pm.", result: ["Lista de ajustes para Día 2", "Equipo alineado"] },
      { time: "17:00–", who: ["Todos"], title: "Cierre del Día 1", desc: "Cargar overnight: Oculus, baterías del robot araña, S1, controles remotos. Dejar equipos en posición si el espacio lo permite.", result: ["Baterías cargando", "Plan Día 2 confirmado"], note: "Todos llegan a las 15:00 para el Día 2" },
    ]
  },
];

const DAY2_PHASES = [
  {
    time: "15:00 — 15:50", label: "Prep · Encendido y verificación", tag: "Todo debe estar listo a las 15:50",
    rows: [
      { time: "15:00", who: ["Todos"], title: "Llegada — encender exhibits", desc: "Cada mentor enciende su exhibit y hace prueba rápida de 2 min. Si algo falla, Rafael tiene 40 min para resolverlo.", result: ["14 exhibits encendidos"] },
      { time: "15:20", who: ["Rafael"], title: "Ronda de verificación final", desc: "Recorrer el circuito confirmando todo. Red local, batería de Oculus, señal audible de rotación.", result: ["Todo en verde", "Señal probada"] },
      { time: "15:40", who: ["Rafael"], title: "Briefing final de 10 min", desc: "Dinámica: señal cada 6 min, no moverse del spot, qué hacer si falla, señal de inicio la da Rafael. WhatsApp grupal activo.", result: ["Equipo listo"] },
      { time: "15:50", who: ["Todos"], title: "Todos en su spot — espera", desc: "Cada mentor en su exhibit, encendido y listo. Esperando la llegada de alumnos al auditorio.", result: ["Circuito 100% listo"] },
    ]
  },
  {
    time: "16:00 — 18:00+", label: "Exhibición real", tag: "Tiempos relativos desde T+0 = llegada alumnos",
    rows: [
      { time: "T+0", who: ["Dr. Peñaloza"], title: "Welcome speech + presentación de Mirai (7 min)", desc: "Auditorio. Aparición de S1 al cierre. Explicación de la dinámica del recorrido.", result: ["Alumnos motivados"] },
      { time: "T+9", who: ["Equipo IKan"], title: "Intro IKan (2 min) + mentores forman grupos", desc: "Mentores salen escalonados del auditorio. Cada uno lleva ~10 alumnos a su exhibit.", result: ["10 grupos en posición"] },
      { time: "T+15", who: ["Rafael"], title: "🔁 Señal de inicio del tour", desc: "Rafael = Coordinador Central. Da la señal cuando todos confirman posición. Timer de 6 min arranca.", result: ["Tour iniciado"] },
      { time: "T+15→T+99", who: ["Todos"], title: "14 rondas × 6 min — rotación a la derecha", desc: "Rafael maneja timer y señal. Miri circula verificando avance y apoyando.", result: ["100 alumnos ven 14 exhibits"], note: "Miri = Coord. circulante" },
      { time: "T+105", who: ["Equipo IKan"], title: "Asignación de video reportaje (5 min)", desc: "IKan entrega lista. 30 min de trabajo de equipos. Mentores disponibles para entrevistas.", result: ["Actividad IKan completa"] },
      { time: "T+140", who: ["Dr. Peñaloza"], title: "Cierre oficial", desc: "Agradecimientos. Alumnos salen. +1h de buffer si se alarga. Fin estimado: 18:00–19:00.", result: ["Exhibición completada ✓"] },
    ]
  },
];

const s = {
  app: { background: "#f0f4fa", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, color: "#0d1a2e" },
  header: { background: "#071530", padding: "36px 40px 28px", color: "#fff" },
  eyebrow: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#90c8ff", marginBottom: 8 },
  h1: { fontSize: 28, fontWeight: 800, lineHeight: 1.1, marginBottom: 12 },
  h1span: { color: "#90c8ff" },
  nav: { display: "flex", borderBottom: "2px solid #071530", background: "#fff", overflow: "auto" },
  navBtn: (active) => ({ padding: "12px 20px", fontSize: 11, fontWeight: active ? 600 : 400, cursor: "pointer", border: "none", background: active ? "#071530" : "transparent", color: active ? "#90c8ff" : "#4a6080", whiteSpace: "nowrap" }),
  section: { padding: "28px 40px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
  th: { textAlign: "left", padding: "8px 12px", background: "#071530", color: "#90c8ff", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" },
  td: { padding: "10px 12px", borderBottom: "1px solid #c2d0e8", verticalAlign: "top" },
  select: { background: "#e4ecf7", color: "#0d1a2e", border: "1px solid #c2d0e8", borderRadius: 3, padding: "5px 8px", fontSize: 12, width: "100%" },
  badge: (color) => ({ display: "inline-block", fontSize: 10, padding: "2px 8px", borderRadius: 2, background: `${color}15`, color, fontWeight: 500 }),
  phaseHeader: { padding: "12px 40px", background: "#e4ecf7", borderBottom: "1px solid #c2d0e8", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  phaseTime: { fontWeight: 700, color: "#0a3fa8", fontSize: 13 },
  phaseLabel: { fontSize: 11, color: "#1565c0", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" },
  phaseTag: { fontSize: 9, padding: "2px 8px", borderRadius: 2, background: "rgba(10,63,168,0.1)", color: "#1565c0" },
  row: { display: "grid", gridTemplateColumns: "80px 140px 1fr 180px", borderBottom: "1px solid rgba(194,208,232,0.6)", background: "#fff" },
  rowTime: { padding: "12px 12px", borderRight: "1px solid #c2d0e8", fontSize: 12, fontWeight: 600, color: "#0a3fa8", whiteSpace: "nowrap" },
  rowWho: { padding: "12px 10px", borderRight: "1px solid #c2d0e8", display: "flex", flexDirection: "column", gap: 3 },
  whoBadge: { fontSize: 9, padding: "2px 6px", borderRadius: 2, background: "#e4ecf7", color: "#1565c0", display: "inline-block", marginBottom: 2 },
  rowContent: { padding: "12px 16px", borderRight: "1px solid #c2d0e8" },
  rowTitle: { fontWeight: 600, color: "#071530", fontSize: 13, marginBottom: 3 },
  rowDesc: { color: "#4a6080", fontSize: 12, lineHeight: 1.55 },
  rowNote: { display: "inline-block", marginTop: 6, fontSize: 10, padding: "2px 8px", borderRadius: 2, background: "rgba(217,119,6,0.08)", color: "#d97706" },
  rowOutput: { padding: "12px 12px", display: "flex", flexDirection: "column", gap: 3 },
  outputItem: { fontSize: 11, color: "#4a6080", paddingLeft: 14, position: "relative" },
  dayHeader: (dark) => ({ background: dark ? "#071530" : "#0a3fa8", padding: "16px 40px", display: "flex", alignItems: "center", gap: 16 }),
  dayLabel: { fontWeight: 800, fontSize: 26, color: "#fff" },
  dayDesc: { color: "#90c8ff", fontSize: 12, lineHeight: 1.5 },
  spotCard: { background: "#fff", border: "1px solid #c2d0e8", borderRadius: 4, overflow: "hidden", marginBottom: 12 },
  spotHeader: { padding: "16px 20px", background: "#071530", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" },
  spotId: { fontWeight: 800, fontSize: 20, color: "#90c8ff" },
  spotName: { fontWeight: 600, fontSize: 14 },
  spotBody: { padding: "16px 20px" },
  spotRow: { display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #e4ecf7", fontSize: 12 },
  spotLabel: { color: "#4a6080", fontWeight: 500 },
  spotValue: { color: "#0d1a2e", fontWeight: 500 },
  scriptPlaceholder: { padding: "16px 20px", background: "#e4ecf7", borderTop: "1px solid #c2d0e8", fontSize: 12, color: "#4a6080", fontStyle: "italic" },
  footer: { borderTop: "2px solid #071530", padding: "16px 40px", background: "#e4ecf7", fontSize: 11, color: "#4a6080" },
};

export default function App() {
  const [page, setPage] = useState("assignments");
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const updateAssignment = (exhibitId, person) => {
    setAssignments(prev => ({ ...prev, [exhibitId]: person }));
  };

  const renderPhase = (phase, idx) => (
    <div key={idx} style={{ borderBottom: "1px solid #c2d0e8" }}>
      <div style={s.phaseHeader}>
        <span style={s.phaseTime}>{phase.time}</span>
        <span style={s.phaseLabel}>{phase.label}</span>
        {phase.tag && <span style={s.phaseTag}>{phase.tag}</span>}
      </div>
      {phase.rows.map((row, i) => (
        <div key={i} style={{ ...s.row, background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
          <div style={s.rowTime}>{row.time}</div>
          <div style={s.rowWho}>
            {row.who.map((w, j) => <span key={j} style={s.whoBadge}>{w}</span>)}
          </div>
          <div style={s.rowContent}>
            <div style={s.rowTitle}>{row.title}</div>
            <div style={s.rowDesc}>{row.desc}</div>
            {row.note && <div style={s.rowNote}>{row.note}</div>}
          </div>
          <div style={s.rowOutput}>
            {(row.result || []).map((r, j) => <div key={j} style={s.outputItem}>✓ {r}</div>)}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={s.app}>
      {/* HEADER */}
      <div style={s.header}>
        <div style={s.eyebrow}>Mirai Innovation Research Institute · Plan de Ejecución</div>
        <div style={s.h1}>Día 1 — Montaje · <span style={s.h1span}>Día 2 — Exhibición</span></div>
        <div style={{ display: "flex", gap: 24, fontSize: 11, color: "rgba(255,255,255,0.5)", flexWrap: "wrap" }}>
          <span><strong style={{color:"rgba(255,255,255,0.8)"}}>Día 1:</strong> Montaje + Capacitación + Muestra</span>
          <span><strong style={{color:"rgba(255,255,255,0.8)"}}>Día 2:</strong> Exhibición real · 16:00–18:00</span>
        </div>
      </div>

      {/* NAV */}
      <div style={s.nav}>
        {[
          ["assignments", "👥 Personas y Spots"],
          ["day1", "📦 Día 1 — Montaje"],
          ["day2", "🎯 Día 2 — Exhibición"],
          ["spots", "📋 Spots individuales"],
        ].map(([k, label]) => (
          <button key={k} style={s.navBtn(page === k)} onClick={() => setPage(k)}>{label}</button>
        ))}
      </div>

      {/* ASSIGNMENTS */}
      {page === "assignments" && (
        <div style={s.section}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: "#071530" }}>Asignación de personas por exhibit</h2>
          <p style={{ fontSize: 12, color: "#4a6080", marginBottom: 20 }}>Edita las asignaciones directamente con los selectores. Estos cambios se reflejan en la vista de spots individuales.</p>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Pos.</th>
                <th style={s.th}>ID</th>
                <th style={s.th}>Exhibit</th>
                <th style={s.th}>Tecnología</th>
                <th style={s.th}>Persona asignada</th>
              </tr>
            </thead>
            <tbody>
              {EXHIBITS.map((ex, i) => (
                <tr key={ex.id} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                  <td style={{ ...s.td, fontWeight: 700, fontSize: 16, color: "#0a3fa8" }}>{i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 500, color: "#1565c0" }}>{ex.id}</td>
                  <td style={{ ...s.td, fontWeight: 500, color: "#071530" }}>{ex.name}</td>
                  <td style={{ ...s.td, color: "#4a6080", fontSize: 12 }}>{ex.tech}</td>
                  <td style={s.td}>
                    <select
                      style={{
                        ...s.select,
                        background: assignments[ex.id] === "Por asignar" ? "#fef3c7" : "#e4ecf7",
                        borderColor: assignments[ex.id] === "Por asignar" ? "#d97706" : "#c2d0e8"
                      }}
                      value={assignments[ex.id]}
                      onChange={(e) => updateAssignment(ex.id, e.target.value)}
                    >
                      {ASSIGNABLE.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#071530", marginBottom: 12 }}>Equipo disponible</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
              {PEOPLE.map(p => {
                const assignedExhibits = Object.entries(assignments).filter(([_, v]) => v === p.name).map(([k]) => k);
                return (
                  <div key={p.name} style={{ padding: "10px 14px", background: "#fff", border: "1px solid #c2d0e8", borderLeft: `3px solid ${p.color}`, borderRadius: 3 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: "#071530" }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: "#4a6080" }}>{p.role}</div>
                    <div style={{ fontSize: 10, color: "#0a3fa8", marginTop: 3 }}>{p.available}</div>
                    {assignedExhibits.length > 0 && (
                      <div style={{ marginTop: 4, display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {assignedExhibits.map(e => <span key={e} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 2, background: "#e4ecf7", color: "#1565c0" }}>{e}</span>)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DAY 1 */}
      {page === "day1" && (
        <div>
          <div style={s.dayHeader(false)}>
            <div style={s.dayLabel}>DÍA 1</div>
            <div style={s.dayDesc}>
              Montaje completo · Capacitación de mentores · Exhibición de muestra<br />
              <strong style={{ color: "#fff" }}>Meta: circuito listo y encendido antes de las 14:00</strong>
            </div>
          </div>
          {DAY1_PHASES.map((phase, i) => renderPhase(phase, i))}
        </div>
      )}

      {/* DAY 2 */}
      {page === "day2" && (
        <div>
          <div style={s.dayHeader(true)}>
            <div style={s.dayLabel}>DÍA 2</div>
            <div style={s.dayDesc}>
              Exhibición real · Alumnos llegan a las 16:00 · Fin 18:00 (+1h buffer)<br />
              <strong style={{ color: "#fff" }}>Todo encendido y listo a las 15:50</strong>
            </div>
          </div>
          {DAY2_PHASES.map((phase, i) => renderPhase(phase, i))}
        </div>
      )}

      {/* SPOTS */}
      {page === "spots" && !selectedSpot && (
        <div style={s.section}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: "#071530" }}>Spots individuales</h2>
          <p style={{ fontSize: 12, color: "#4a6080", marginBottom: 20 }}>Cada spot tiene su información y espacio para el script. Haz clic para ver el detalle.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {EXHIBITS.map((ex, i) => (
              <div key={ex.id} style={{ ...s.spotCard, cursor: "pointer" }} onClick={() => setSelectedSpot(ex.id)}>
                <div style={s.spotHeader}>
                  <div>
                    <span style={s.spotId}>{ex.id}</span>
                    <span style={{ marginLeft: 10, fontSize: 11, color: "#90c8ff" }}>Pos. {i + 1}</span>
                  </div>
                </div>
                <div style={s.spotBody}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{ex.name}</div>
                  <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 8 }}>{ex.tech}</div>
                  <div style={{ fontSize: 12 }}>
                    <span style={{ color: "#4a6080" }}>Asignado: </span>
                    <span style={{ fontWeight: 600, color: assignments[ex.id] === "Por asignar" ? "#d97706" : "#0a3fa8" }}>
                      {assignments[ex.id]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === "spots" && selectedSpot && (() => {
        const ex = EXHIBITS.find(e => e.id === selectedSpot);
        const idx = EXHIBITS.indexOf(ex);
        return (
          <div style={s.section}>
            <button onClick={() => setSelectedSpot(null)} style={{ background: "#071530", color: "#90c8ff", border: "none", padding: "8px 16px", borderRadius: 3, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>← Volver a todos los spots</button>
            <div style={s.spotCard}>
              <div style={{ ...s.spotHeader, padding: "20px 24px" }}>
                <div>
                  <span style={{ ...s.spotId, fontSize: 28 }}>{ex.id}</span>
                  <span style={{ marginLeft: 12, fontSize: 13, color: "#90c8ff" }}>Posición {idx + 1} en el circuito</span>
                </div>
              </div>
              <div style={{ padding: "24px" }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{ex.name}</h2>
                <p style={{ fontSize: 13, color: "#4a6080", marginBottom: 20 }}>{ex.tech}</p>
                <div style={s.spotRow}><span style={s.spotLabel}>Persona asignada</span><span style={{ ...s.spotValue, color: assignments[ex.id] === "Por asignar" ? "#d97706" : "#0a3fa8" }}>{assignments[ex.id]}</span></div>
                <div style={s.spotRow}><span style={s.spotLabel}>Posición en circuito</span><span style={s.spotValue}>{idx + 1} de 14</span></div>
                <div style={s.spotRow}><span style={s.spotLabel}>Siguiente exhibit (derecha)</span><span style={s.spotValue}>{EXHIBITS[(idx + 1) % 14].id} — {EXHIBITS[(idx + 1) % 14].name}</span></div>
                <div style={{ ...s.spotRow, borderBottom: "none" }}><span style={s.spotLabel}>Anterior exhibit (izquierda)</span><span style={s.spotValue}>{EXHIBITS[(idx + 13) % 14].id} — {EXHIBITS[(idx + 13) % 14].name}</span></div>
              </div>
              <div style={s.scriptPlaceholder}>
                <div style={{ fontWeight: 600, color: "#071530", marginBottom: 8, fontStyle: "normal" }}>📄 Script de presentación (6 minutos)</div>
                <div style={{ lineHeight: 1.7 }}>
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>0:00–0:30</strong> — Presentación: nombre del exhibit y tecnología<br />
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>0:30–2:00</strong> — ¿Qué es? Explicación simple<br />
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>2:00–4:00</strong> — Demo en vivo<br />
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>4:00–5:30</strong> — Aplicaciones reales<br />
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>5:30–6:00</strong> — Cierre y preguntas rápidas<br />
                  <div style={{ marginTop: 12, padding: "12px 16px", background: "#fff", border: "1px dashed #c2d0e8", borderRadius: 4, minHeight: 100, color: "#c2d0e8" }}>
                    El contenido específico del script para este exhibit se agregará aquí...
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <div style={s.footer}>
        Mirai Innovation Research Institute · Uso interno EMFUTECH · Actualizar antes del Día 1
      </div>
    </div>
  );
}
