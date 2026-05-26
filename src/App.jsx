import { useState, useEffect } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

const PEOPLE = [
  { name: "Rafael", role: "General Coordination / Timer", color: "#0a3fa8", available: "10:00 →" },
  { name: "Dr. Peñaloza", role: "Welcome / Supervision", color: "#7c3aed", available: "10:00 →" },
  { name: "Daniel", role: "S3, S10, S13", color: "#7c3aed", available: "→ 13:30 (leaves)" },
  { name: "Francisco", role: "CanSat (S11) / Roving Coord.", color: "#d97706", available: "10:00 →" },
  { name: "Rene", role: "Logistics / Signage", color: "#16a34a", available: "10:00 →" },
  { name: "Jonhatan", role: "Assigned exhibit", color: "#1565c0", available: "10:00 →" },
  { name: "Saulo", role: "Assigned exhibit", color: "#1565c0", available: "10:00 →" },
  { name: "Claudia", role: "Assigned exhibit", color: "#1565c0", available: "10:00 →" },
  { name: "Barrie", role: "Assigned exhibit", color: "#1565c0", available: "10:00 →" },
  { name: "Hired Mentor 0", role: "Assigned exhibit", color: "#1565c0", available: "10:00 →" },
];

const EXHIBITS = [
  { id: "S2", name: "Human-Robot Interaction", tech: "Pepper Robot" },
  { id: "S3", name: "Humanoid Avatar & Telepresence", tech: "G1 + FPV" },
  { id: "S4", name: "VR-Based Cognitive Assessment", tech: "Oculus + PC" },
  { id: "S5", name: "Immersive VR for Mental Well-being", tech: "VR + Modem" },
  { id: "S6", name: "Vending Machine VR", tech: "Oculus" },
  { id: "S7", name: "Dual-arm Robotic Teleoperation", tech: "Dual-arm Robot" },
  { id: "S8", name: "Wearable Robotics for Rehabilitation", tech: "Exoskeleton + Myoware" },
  { id: "S9", name: "EEG-Monitored VR Phobia Exposure", tech: "VR + EEG + Modem" },
  { id: "S10", name: "Spider-like Locomotion", tech: "Spider Robot" },
  { id: "S11", name: "Pico Satellite", tech: "CanSat + VR" },
  { id: "S12", name: "Brain-Computer Interface", tech: "Aura EEG + Robot" },
  { id: "S13", name: "Computer Vision & Pose Estimation", tech: "Camera + LEDs" },
  { id: "S14", name: "Remote Vehicle Teleoperation", tech: "Vehicle + Modem" },
  { id: "S15", name: "Web-Based Robot Teleoperation", tech: "Robotic Arm + Web" },
];

const INITIAL_ASSIGNMENTS = {
  S2: "Unassigned", S3: "Daniel", S4: "Jonhatan",
  S5: "Unassigned", S6: "Unassigned", S7: "Unassigned",
  S8: "Saulo", S9: "Unassigned", S10: "Daniel",
  S11: "Francisco", S12: "Unassigned", S13: "Daniel",
  S14: "Claudia", S15: "Unassigned",
};

const ASSIGNABLE = [
  "Rafael", "Dr. Peñaloza", "Daniel", "Francisco", "Rene",
  "Jonhatan", "Saulo", "Claudia",
  "Barrie", "Hired Mentor 0",
  "Hired Mentor 1", "Hired Mentor 2", "Hired Mentor 3",
  "Hired Mentor 4", "Hired Mentor 5",
  "Unassigned"
];

const DAY1_PHASES = [
  {
    time: "10:00 — 11:00", label: "Phase 1 · Arrival & Unloading", tag: "Full team + Dr. Peñaloza",
    rows: [
      { time: "10:00", who: ["Everyone"], title: "Arrival at the venue — quick briefing (10 min)", desc: "Rafael explains the day's plan, the physical circuit, and who sets up what. Unloading zones are assigned.", result: ["Everyone knows what to do"] },
      { time: "10:10", who: ["Everyone"], title: "Unload and transport equipment to the open space", desc: "The whole team helps with unloading. Each EMFUTECH student is responsible for their equipment, but everyone helps carry and move items.", result: ["Equipment in the open space", "Nothing left in the cars"] },
      { time: "10:10", who: ["Rene"], title: "Mark the physical circuit on the floor", desc: "Place tape arrows and position signs (S2→S3→...→S15). This way everyone knows where their exhibit goes. Done simultaneously with unloading.", result: ["Circuit marked", "Positions clearly visible from 5m"] },
    ]
  },
  {
    time: "11:00 — 13:00", label: "Phase 2 · Setup & Power-on", tag: "Daniel leaves at 13:30",
    rows: [
      { time: "11:00–13:00", who: ["EMFUTECH ×5", "Daniel", "Francisco"], title: "Simultaneous setup of all 14 exhibits", desc: "Each student sets up and powers on their exhibit at their position. Daniel prioritizes S3 (G1+FPV) first, then S10 and S13. Francisco sets up S11 (CanSat). Rafael circulates resolving technical issues.", result: ["14 exhibits in position", "Powered on and running"], note: "Priority: S3, S5, S9, S15 — highest technical risk" },
      { time: "11:00–13:00", who: ["Rafael"], title: "Configure modem and local network", desc: "Connect S5, S9, and S14 to the modem. Verify all three run simultaneously without interference. This is the most critical setup step.", result: ["Stable local network", "S5, S9, S14 connected"], note: "If there are network issues, prioritize over everything else" },
      { time: "11:00–13:00", who: ["Rene"], title: "Logistical support during setup", desc: "Help carry, move tables, connect cables, arrange signs. Be available wherever needed.", result: ["Logistics resolved"] },
      { time: "12:30", who: ["Rafael"], title: "Quick check — walk through each exhibit", desc: "Rafael visits each circuit position confirming it's powered on and functional. If something doesn't work, the last 30 min are for fixing it.", result: ["Technical checklist complete", "Issues identified"], note: "Goal: all green before 13:00" },
    ]
  },
  {
    time: "13:00 — 14:00", label: "Phase 3 · Lunch", tag: "Break",
    rows: [
      { time: "13:00", who: ["Everyone"], title: "Lunch break — 1 hour", desc: "The team rests and eats. Rafael prepares printed scripts and envelopes with each hired mentor's assigned exhibit name.", result: ["Scripts ready to hand out", "Team rested"] },
      { time: "13:30", who: ["Daniel"], title: "Daniel departs", desc: "Before leaving, Daniel does a quick handoff to Rafael for S3, S10, and S13 — how to turn them on, restart them, and what to do if they fail. Document steps on paper or photos.", result: ["Handoff documented", "Rafael can operate S3/S10/S13"], note: "Document S3 startup steps especially" },
    ]
  },
  {
    time: "14:00 — 15:30", label: "Phase 4 · Hired Mentor Training", tag: "4–5 external mentors arrive",
    rows: [
      { time: "14:00", who: ["Rafael", "Mentors"], title: "Welcome and general briefing", desc: "Rafael explains the dynamics: what Mirai is, how the 6-min rotation works, what's expected of them, how to handle groups of 10 students. Scripts for their exhibit are handed out.", result: ["Mentors understand the dynamics", "Script in hand"], note: "20 min max" },
      { time: "14:20", who: ["Mentors", "EMFUTECH"], title: "1:1 training at each exhibit", desc: "Each hired mentor goes to their assigned exhibit and learns from the EMFUTECH person operating it: how to turn it on, how to do the demo, what to say, what to do if it fails. Rafael rotates supervising.", result: ["Mentor can operate solo", "Knows the basic pitch"] },
      { time: "15:00", who: ["Mentors"], title: "Pitch practice — 6 min each", desc: "Rafael times them. Immediate feedback. If the pitch is weak, 10 more min of practice.", result: ["Each mentor did their pitch at least once"], note: "Don't aim for perfection — aim for capable and confident" },
    ]
  },
  {
    time: "15:30 — 17:00", label: "Phase 5 · Trial Exhibition", tag: "Final evaluation",
    rows: [
      { time: "15:30", who: ["Everyone"], title: "Everyone in position — exhibits powered on", desc: "Each mentor at their spot, exhibit powered on and ready. Rafael does one last verification round.", result: ["14 exhibits ready", "14 people in position"] },
      { time: "16:00", who: ["Dr. Peñaloza", "Rafael"], title: "Full trial exhibition", desc: "Dr. Peñaloza and Rafael walk the circuit as if they were students. Each mentor does their 6-min pitch. The real rotation signal is used.", result: ["14 pitches evaluated", "Issues detected live"] },
      { time: "17:00", who: ["Dr. Peñaloza", "Rafael"], title: "Feedback session with all mentors", desc: "Dr. Peñaloza and Rafael give general feedback. Weak points are corrected. If something is urgent, it's worked on right there or scheduled for Day 2 before 3pm.", result: ["Adjustment list for Day 2", "Team aligned"] },
      { time: "17:00–", who: ["Everyone"], title: "Day 1 wrap-up", desc: "Charge overnight: Oculus, spider robot batteries, S1, remote controls. Leave equipment in position if the space allows.", result: ["Batteries charging", "Day 2 plan confirmed"], note: "Everyone arrives at 15:00 for Day 2" },
    ]
  },
];

const DAY2_PHASES = [
  {
    time: "15:00 — 15:50", label: "Prep · Power-on & Verification", tag: "Everything must be ready by 15:50",
    rows: [
      { time: "15:00", who: ["Everyone"], title: "Arrival — power on exhibits", desc: "Each mentor turns on their exhibit and does a quick 2-min test. If something fails, Rafael has 40 min to fix it.", result: ["14 exhibits powered on"] },
      { time: "15:20", who: ["Rafael"], title: "Final verification round", desc: "Walk the circuit confirming everything. Local network, Oculus battery, audible rotation signal.", result: ["All green", "Signal tested"] },
      { time: "15:40", who: ["Rafael"], title: "Final 10-min briefing", desc: "Dynamics: signal every 6 min, don't leave your spot, what to do if it fails, start signal given by Rafael. Group WhatsApp active.", result: ["Team ready"] },
      { time: "15:50", who: ["Everyone"], title: "Everyone at their spot — standby", desc: "Each mentor at their exhibit, powered on and ready. Waiting for students to arrive at the auditorium.", result: ["Circuit 100% ready"] },
    ]
  },
  {
    time: "16:00 — 18:00+", label: "Live Exhibition", tag: "Relative times from T+0 = students arrive",
    rows: [
      { time: "T+0", who: ["Dr. Peñaloza"], title: "Welcome speech + Mirai presentation (7 min)", desc: "Auditorium. S1 appears at the end. Explanation of the tour dynamics.", result: ["Students motivated"] },
      { time: "T+9", who: ["IKan Team"], title: "IKan intro (2 min) + mentors form groups", desc: "Mentors exit the auditorium in stages. Each one leads ~10 students to their exhibit.", result: ["10 groups in position"] },
      { time: "T+15", who: ["Rafael"], title: "🔁 Tour start signal", desc: "Rafael = Central Coordinator. Gives the signal when everyone confirms position. 6-min timer starts.", result: ["Tour started"] },
      { time: "T+15→T+99", who: ["Everyone"], title: "14 rounds × 6 min — rotate right", desc: "Rafael manages the timer and signal. Francisco circulates checking progress and providing support.", result: ["100 students see 14 exhibits"], note: "Francisco = Roving Coordinator" },
      { time: "T+105", who: ["IKan Team"], title: "Video report assignment (5 min)", desc: "IKan hands out the list. 30 min of team work. Mentors available for interviews.", result: ["IKan activity complete"] },
      { time: "T+140", who: ["Dr. Peñaloza"], title: "Official closing", desc: "Thank-yous. Students leave. +1h buffer if it runs long. Estimated end: 18:00–19:00.", result: ["Exhibition completed ✓"] },
    ]
  },
];

const DAY3_PHASES = [
  {
    time: "15:00 — 15:50", label: "Prep · Power-on & Verification", tag: "Everything must be ready by 15:50",
    rows: [
      { time: "15:00", who: ["Everyone"], title: "Arrival — power on exhibits", desc: "Each mentor turns on their exhibit and does a quick 2-min test. If something fails, Rafael has 40 min to fix it.", result: ["14 exhibits powered on"] },
      { time: "15:20", who: ["Rafael"], title: "Final verification round", desc: "Walk the circuit confirming everything. Local network, Oculus battery, audible rotation signal.", result: ["All green", "Signal tested"] },
      { time: "15:40", who: ["Rafael"], title: "Final 10-min briefing", desc: "Dynamics: signal every 6 min, don't leave your spot, what to do if it fails, start signal given by Rafael. Group WhatsApp active.", result: ["Team ready"] },
      { time: "15:50", who: ["Everyone"], title: "Everyone at their spot — standby", desc: "Each mentor at their exhibit, powered on and ready. Waiting for students to arrive at the auditorium.", result: ["Circuit 100% ready"] },
    ]
  },
  {
    time: "16:00 — 18:00+", label: "Live Exhibition", tag: "Relative times from T+0 = students arrive",
    rows: [
      { time: "T+0", who: ["Dr. Peñaloza"], title: "Welcome speech + Mirai presentation (7 min)", desc: "Auditorium. S1 appears at the end. Explanation of the tour dynamics.", result: ["Students motivated"] },
      { time: "T+9", who: ["IKan Team"], title: "IKan intro (2 min) + mentors form groups", desc: "Mentors exit the auditorium in stages. Each one leads ~10 students to their exhibit.", result: ["10 groups in position"] },
      { time: "T+15", who: ["Rafael"], title: "🔁 Tour start signal", desc: "Rafael = Central Coordinator. Gives the signal when everyone confirms position. 6-min timer starts.", result: ["Tour started"] },
      { time: "T+15→T+99", who: ["Everyone"], title: "14 rounds × 6 min — rotate right", desc: "Rafael manages the timer and signal. Francisco circulates checking progress and providing support.", result: ["100 students see 14 exhibits"], note: "Francisco = Roving Coordinator" },
      { time: "T+105", who: ["IKan Team"], title: "Video report assignment (5 min)", desc: "IKan hands out the list. 30 min of team work. Mentors available for interviews.", result: ["IKan activity complete"] },
      { time: "T+140", who: ["Dr. Peñaloza"], title: "Official closing", desc: "Thank-yous. Students leave. +1h buffer if it runs long. Estimated end: 18:00–19:00.", result: ["Exhibition completed ✓"] },
    ]
  },
];

const getStyles = (m) => ({
  app: { background: "#f0f4fa", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, color: "#0d1a2e" },
  header: { background: "#071530", padding: m ? "24px 16px 20px" : "36px 40px 28px", color: "#fff" },
  eyebrow: { fontSize: m ? 9 : 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#90c8ff", marginBottom: 8 },
  h1: { fontSize: m ? 20 : 28, fontWeight: 800, lineHeight: 1.1, marginBottom: 12 },
  h1span: { color: "#90c8ff" },
  nav: { display: "flex", borderBottom: "2px solid #071530", background: "#fff", overflow: "auto", WebkitOverflowScrolling: "touch" },
  navBtn: (active) => ({ padding: m ? "10px 14px" : "12px 20px", fontSize: m ? 10 : 11, fontWeight: active ? 600 : 400, cursor: "pointer", border: "none", background: active ? "#071530" : "transparent", color: active ? "#90c8ff" : "#4a6080", whiteSpace: "nowrap", flex: m ? "none" : undefined }),
  section: { padding: m ? "16px" : "28px 40px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
  th: { textAlign: "left", padding: m ? "6px 8px" : "8px 12px", background: "#071530", color: "#90c8ff", fontSize: m ? 9 : 10, letterSpacing: "0.08em", textTransform: "uppercase" },
  td: { padding: m ? "8px" : "10px 12px", borderBottom: "1px solid #c2d0e8", verticalAlign: "top" },
  select: { background: "#e4ecf7", color: "#0d1a2e", border: "1px solid #c2d0e8", borderRadius: 3, padding: "5px 8px", fontSize: 12, width: "100%" },
  badge: (color) => ({ display: "inline-block", fontSize: 10, padding: "2px 8px", borderRadius: 2, background: `${color}15`, color, fontWeight: 500 }),
  phaseHeader: { padding: m ? "10px 16px" : "12px 40px", background: "#e4ecf7", borderBottom: "1px solid #c2d0e8", display: "flex", alignItems: "center", gap: m ? 8 : 12, flexWrap: "wrap" },
  phaseTime: { fontWeight: 700, color: "#0a3fa8", fontSize: m ? 12 : 13 },
  phaseLabel: { fontSize: m ? 10 : 11, color: "#1565c0", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" },
  phaseTag: { fontSize: 9, padding: "2px 8px", borderRadius: 2, background: "rgba(10,63,168,0.1)", color: "#1565c0" },
  row: m
    ? { display: "flex", flexDirection: "column", borderBottom: "1px solid rgba(194,208,232,0.6)", background: "#fff", padding: "12px 16px", gap: 8 }
    : { display: "grid", gridTemplateColumns: "80px 140px 1fr 180px", borderBottom: "1px solid rgba(194,208,232,0.6)", background: "#fff" },
  rowTime: m
    ? { fontSize: 11, fontWeight: 700, color: "#0a3fa8" }
    : { padding: "12px 12px", borderRight: "1px solid #c2d0e8", fontSize: 12, fontWeight: 600, color: "#0a3fa8", whiteSpace: "nowrap" },
  rowWho: m
    ? { display: "flex", flexDirection: "row", gap: 4, flexWrap: "wrap" }
    : { padding: "12px 10px", borderRight: "1px solid #c2d0e8", display: "flex", flexDirection: "column", gap: 3 },
  whoBadge: { fontSize: 9, padding: "2px 6px", borderRadius: 2, background: "#e4ecf7", color: "#1565c0", display: "inline-block", marginBottom: m ? 0 : 2 },
  rowContent: m
    ? { padding: 0 }
    : { padding: "12px 16px", borderRight: "1px solid #c2d0e8" },
  rowTitle: { fontWeight: 600, color: "#071530", fontSize: m ? 13 : 13, marginBottom: 3 },
  rowDesc: { color: "#4a6080", fontSize: 12, lineHeight: 1.55 },
  rowNote: { display: "inline-block", marginTop: 6, fontSize: 10, padding: "2px 8px", borderRadius: 2, background: "rgba(217,119,6,0.08)", color: "#d97706" },
  rowOutput: m
    ? { display: "flex", flexDirection: "column", gap: 3, borderTop: "1px dashed #e4ecf7", paddingTop: 6, marginTop: 4 }
    : { padding: "12px 12px", display: "flex", flexDirection: "column", gap: 3 },
  outputItem: { fontSize: 11, color: "#4a6080", paddingLeft: 14, position: "relative" },
  dayHeader: (dark) => ({ background: dark ? "#071530" : "#0a3fa8", padding: m ? "14px 16px" : "16px 40px", display: "flex", alignItems: m ? "flex-start" : "center", gap: m ? 10 : 16, flexDirection: m ? "column" : "row" }),
  dayLabel: { fontWeight: 800, fontSize: m ? 22 : 26, color: "#fff" },
  dayDesc: { color: "#90c8ff", fontSize: m ? 11 : 12, lineHeight: 1.5 },
  spotCard: { background: "#fff", border: "1px solid #c2d0e8", borderRadius: 4, overflow: "hidden", marginBottom: 12 },
  spotHeader: { padding: m ? "12px 16px" : "16px 20px", background: "#071530", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" },
  spotId: { fontWeight: 800, fontSize: m ? 18 : 20, color: "#90c8ff" },
  spotName: { fontWeight: 600, fontSize: 14 },
  spotBody: { padding: m ? "12px 16px" : "16px 20px" },
  spotRow: { display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #e4ecf7", fontSize: 12, flexWrap: m ? "wrap" : "nowrap", gap: m ? 2 : 0 },
  spotLabel: { color: "#4a6080", fontWeight: 500 },
  spotValue: { color: "#0d1a2e", fontWeight: 500, textAlign: m ? "right" : undefined, wordBreak: m ? "break-word" : undefined },
  scriptPlaceholder: { padding: m ? "12px 16px" : "16px 20px", background: "#e4ecf7", borderTop: "1px solid #c2d0e8", fontSize: 12, color: "#4a6080", fontStyle: "italic" },
  footer: { borderTop: "2px solid #071530", padding: m ? "12px 16px" : "16px 40px", background: "#e4ecf7", fontSize: 11, color: "#4a6080", textAlign: m ? "center" : undefined },
});

export default function App() {
  const mobile = useIsMobile();
  const s = getStyles(mobile);

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
          {mobile ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={s.rowTime}>{row.time}</span>
                <div style={s.rowWho}>
                  {row.who.map((w, j) => <span key={j} style={s.whoBadge}>{w}</span>)}
                </div>
              </div>
              <div style={s.rowContent}>
                <div style={s.rowTitle}>{row.title}</div>
                <div style={s.rowDesc}>{row.desc}</div>
                {row.note && <div style={s.rowNote}>{row.note}</div>}
              </div>
              {(row.result || []).length > 0 && (
                <div style={s.rowOutput}>
                  {row.result.map((r, j) => <div key={j} style={s.outputItem}>✓ {r}</div>)}
                </div>
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      ))}
    </div>
  );

  const renderMobileAssignmentCard = (ex, i) => (
    <div key={ex.id} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", border: "1px solid #c2d0e8", borderRadius: 4, padding: 14, marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#0a3fa8" }}>{i + 1}</span>
          <span style={{ fontWeight: 500, color: "#1565c0", fontSize: 13 }}>{ex.id}</span>
        </div>
      </div>
      <div style={{ fontWeight: 600, color: "#071530", fontSize: 13, marginBottom: 2 }}>{ex.name}</div>
      <div style={{ color: "#4a6080", fontSize: 11, marginBottom: 10 }}>{ex.tech}</div>
      <select
        style={{
          ...s.select,
          background: assignments[ex.id] === "Unassigned" ? "#fef3c7" : "#e4ecf7",
          borderColor: assignments[ex.id] === "Unassigned" ? "#d97706" : "#c2d0e8",
          fontSize: 14, padding: "8px 10px"
        }}
        value={assignments[ex.id]}
        onChange={(e) => updateAssignment(ex.id, e.target.value)}
      >
        {ASSIGNABLE.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
  );

  return (
    <div style={s.app}>
      {/* HEADER */}
      <div style={s.header}>
        <div style={s.eyebrow}>Mirai Innovation Research Institute · Execution Plan</div>
        <div style={s.h1}>Day 1 — Setup · <span style={s.h1span}>Day 2 & 3 — Exhibition</span></div>
        <div style={{ display: "flex", gap: mobile ? 12 : 24, fontSize: mobile ? 10 : 11, color: "rgba(255,255,255,0.5)", flexWrap: "wrap" }}>
          <span><strong style={{color:"rgba(255,255,255,0.8)"}}>Day 1:</strong> Setup + Training + Trial Run</span>
          <span><strong style={{color:"rgba(255,255,255,0.8)"}}>Day 2:</strong> Live Exhibition · 16:00–18:00</span>
          <span><strong style={{color:"rgba(255,255,255,0.8)"}}>Day 3:</strong> Live Exhibition · 16:00–18:00</span>
        </div>
      </div>

      {/* NAV */}
      <div style={s.nav}>
        {[
          ["assignments", mobile ? "👥 People" : "👥 People & Spots"],
          ["day1", mobile ? "📦 Day 1" : "📦 Day 1 — Setup"],
          ["day2", mobile ? "🎯 Day 2" : "🎯 Day 2 — Exhibition"],
          ["day3", mobile ? "🎯 Day 3" : "🎯 Day 3 — Exhibition"],
          ["spots", mobile ? "📋 Spots" : "📋 Individual Spots"],
        ].map(([k, label]) => (
          <button key={k} style={s.navBtn(page === k)} onClick={() => setPage(k)}>{label}</button>
        ))}
      </div>

      {/* ASSIGNMENTS */}
      {page === "assignments" && (
        <div style={s.section}>
          <h2 style={{ fontSize: mobile ? 16 : 18, fontWeight: 700, marginBottom: 6, color: "#071530" }}>People Assignment per Exhibit</h2>
          <p style={{ fontSize: 12, color: "#4a6080", marginBottom: 20 }}>Edit assignments directly with the selectors. These changes are reflected in the individual spots view.</p>

          {mobile ? (
            <div>{EXHIBITS.map((ex, i) => renderMobileAssignmentCard(ex, i))}</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Pos.</th>
                    <th style={s.th}>ID</th>
                    <th style={s.th}>Exhibit</th>
                    <th style={s.th}>Technology</th>
                    <th style={s.th}>Assigned Person</th>
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
                            background: assignments[ex.id] === "Unassigned" ? "#fef3c7" : "#e4ecf7",
                            borderColor: assignments[ex.id] === "Unassigned" ? "#d97706" : "#c2d0e8"
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
            </div>
          )}

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#071530", marginBottom: 12 }}>Available Team</h3>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
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
            <div style={s.dayLabel}>DAY 1</div>
            <div style={s.dayDesc}>
              Full setup · Mentor training · Trial exhibition<br />
              <strong style={{ color: "#fff" }}>Goal: circuit ready and powered on before 14:00</strong>
            </div>
          </div>
          {DAY1_PHASES.map((phase, i) => renderPhase(phase, i))}
        </div>
      )}

      {/* DAY 2 */}
      {page === "day2" && (
        <div>
          <div style={s.dayHeader(true)}>
            <div style={s.dayLabel}>DAY 2</div>
            <div style={s.dayDesc}>
              Live exhibition · Students arrive at 16:00 · End 18:00 (+1h buffer)<br />
              <strong style={{ color: "#fff" }}>Everything powered on and ready by 15:50</strong>
            </div>
          </div>
          {DAY2_PHASES.map((phase, i) => renderPhase(phase, i))}
        </div>
      )}

      {/* DAY 3 */}
      {page === "day3" && (
        <div>
          <div style={s.dayHeader(true)}>
            <div style={s.dayLabel}>DAY 3</div>
            <div style={s.dayDesc}>
              Live exhibition · Students arrive at 16:00 · End 18:00 (+1h buffer)<br />
              <strong style={{ color: "#fff" }}>Everything powered on and ready by 15:50</strong>
            </div>
          </div>
          {DAY3_PHASES.map((phase, i) => renderPhase(phase, i))}
        </div>
      )}

      {/* SPOTS */}
      {page === "spots" && !selectedSpot && (
        <div style={s.section}>
          <h2 style={{ fontSize: mobile ? 16 : 18, fontWeight: 700, marginBottom: 6, color: "#071530" }}>Individual Spots</h2>
          <p style={{ fontSize: 12, color: "#4a6080", marginBottom: 20 }}>Each spot has its own info and space for the script. Click to see details.</p>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
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
                    <span style={{ color: "#4a6080" }}>Assigned: </span>
                    <span style={{ fontWeight: 600, color: assignments[ex.id] === "Unassigned" ? "#d97706" : "#0a3fa8" }}>
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
            <button onClick={() => setSelectedSpot(null)} style={{ background: "#071530", color: "#90c8ff", border: "none", padding: "8px 16px", borderRadius: 3, cursor: "pointer", fontSize: 12, marginBottom: 20 }}>← Back to all spots</button>
            <div style={s.spotCard}>
              <div style={{ ...s.spotHeader, padding: mobile ? "16px" : "20px 24px" }}>
                <div>
                  <span style={{ ...s.spotId, fontSize: mobile ? 24 : 28 }}>{ex.id}</span>
                  <span style={{ marginLeft: 12, fontSize: mobile ? 11 : 13, color: "#90c8ff" }}>Position {idx + 1} in the circuit</span>
                </div>
              </div>
              <div style={{ padding: mobile ? "16px" : "24px" }}>
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, marginBottom: 4 }}>{ex.name}</h2>
                <p style={{ fontSize: 13, color: "#4a6080", marginBottom: 20 }}>{ex.tech}</p>
                <div style={s.spotRow}><span style={s.spotLabel}>Assigned person</span><span style={{ ...s.spotValue, color: assignments[ex.id] === "Unassigned" ? "#d97706" : "#0a3fa8" }}>{assignments[ex.id]}</span></div>
                <div style={s.spotRow}><span style={s.spotLabel}>Circuit position</span><span style={s.spotValue}>{idx + 1} of 14</span></div>
                <div style={s.spotRow}><span style={s.spotLabel}>Next exhibit (right)</span><span style={s.spotValue}>{EXHIBITS[(idx + 1) % 14].id} — {EXHIBITS[(idx + 1) % 14].name}</span></div>
                <div style={{ ...s.spotRow, borderBottom: "none" }}><span style={s.spotLabel}>Previous exhibit (left)</span><span style={s.spotValue}>{EXHIBITS[(idx + 13) % 14].id} — {EXHIBITS[(idx + 13) % 14].name}</span></div>
              </div>
              <div style={s.scriptPlaceholder}>
                <div style={{ fontWeight: 600, color: "#071530", marginBottom: 8, fontStyle: "normal" }}>📄 Presentation Script (6 minutes)</div>
                <div style={{ lineHeight: 1.7 }}>
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>0:00–0:30</strong> — Introduction: exhibit name and technology<br />
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>0:30–2:00</strong> — What is it? Simple explanation<br />
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>2:00–4:00</strong> — Live demo<br />
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>4:00–5:30</strong> — Real-world applications<br />
                  <strong style={{ fontStyle: "normal", color: "#071530" }}>5:30–6:00</strong> — Wrap-up and quick questions<br />
                  <div style={{ marginTop: 12, padding: "12px 16px", background: "#fff", border: "1px dashed #c2d0e8", borderRadius: 4, minHeight: 100, color: "#c2d0e8" }}>
                    Specific script content for this exhibit will be added here...
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <div style={s.footer}>
        Mirai Innovation Research Institute · EMFUTECH Internal Use · Update before Day 1
      </div>
    </div>
  );
}
