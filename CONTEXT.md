# CONTEXT — Mirai Innovation Lab Exhibition App

## Proyecto
Mini sitio web estático (React + Vite) desplegado en GitHub Pages / Netlify.
Plan operativo interno del equipo EMFUTECH para una exhibición en Mirai Innovation Research Institute.

## Stack
- React + Vite
- Deploy: GitHub Pages o Netlify (ya configurado)
- Sin backend — todo es estado local en React (useState)
- Tailwind o CSS-in-JS inline styles

---

## Estructura del evento

### Contexto general
- ~100 alumnos por día (±5), organizados en 10 grupos de ~10 personas
- 14 exhibits en circuito cerrado en un open space
- Rotación: cada señal audible (cada 6 min), todos caminan al exhibit de su derecha
- Al completar 14 rondas, cada grupo ha visto los 14 exhibits
- 4 exhibits vacíos por ronda (buffer natural)
- El mentor permanece fijo en su exhibit — los grupos son los que rotan

### Circuito físico (orden en el espacio, S2 → S15 → regresa a S2)
| Pos | ID  | Nombre                                      | Tecnología                        |
|-----|-----|---------------------------------------------|-----------------------------------|
| 1   | S2  | Human-Robot Interaction                     | Pepper Robot                      |
| 2   | S3  | Humanoid Avatar & Telepresence              | G1 Robot + FPV                    |
| 3   | S4  | VR-Based Cognitive Assessment               | Oculus Quest 3 + PC               |
| 4   | S5  | Immersive VR for Mental Well-being          | VR + Server + Módem               |
| 5   | S6  | Vending Machine VR                          | Oculus                            |
| 6   | S7  | Dual-arm Robotic Teleoperation              | Robot dual-arm + PC               |
| 7   | S8  | Wearable Robotics for Rehabilitation        | Exoesqueleto + Myoware            |
| 8   | S9  | EEG-Monitored VR Phobia Exposure            | VR + EEG + Módem                  |
| 9   | S10 | Spider-like Locomotion & Biomimetic Control | Robot araña + Control remoto      |
| 10  | S11 | Pico Satellite                              | CanSat + Interfaz VR              |
| 11  | S12 | Brain-Computer Interface & EEG              | Aura EEG + Robot (modo simulado)  |
| 12  | S13 | Computer Vision & Pose Estimation           | Cámara + LEDs (output alternativo)|
| 13  | S14 | Remote Vehicle Teleoperation                | Vehículo + Módem                  |
| 14  | S15 | Web-Based Robot Teleoperation               | Brazo robótico + Web interface    |

### Nota sobre S1
S1 = Robot Dog (Unitree). No es un exhibit del circuito. Aparece solo en el welcome speech del auditorio para generar entusiasmo, luego queda en el open space como elemento visual.

---

## Equipo

### Día del evento (Día 2)
| Persona         | Rol                                              | Horario       |
|-----------------|--------------------------------------------------|---------------|
| Rafael          | Coordinador Central (timer + señal de rotación) | Todo el día   |
| Dr. Peñaloza    | Welcome speech + supervisión                    | Todo el día   |
| Miri            | S11 (CanSat) + Coordinador circulante           | Todo el día   |
| Rene            | Logística y carga                               | Todo el día   |
| Daniel          | S3, S10, S13 (sale a las 13:30 en Día 1)       | Solo Día 1    |
| 5 Estudiantes EMFUTECH | Sus propios exhibits                    | Todo el día   |
| 4–5 Mentores contratados | Exhibits restantes                    | Día 1 tarde + Día 2 |

### Mentores contratados (pendiente definir nombres)
Se les asignan los exhibits más simples técnicamente: S11, S13, S6, S15, S12.

---

## Plan Día 1 (Montaje + Capacitación + Muestra)

| Hora         | Actividad                                                    | Quién              |
|--------------|--------------------------------------------------------------|--------------------|
| 10:00        | Llegada + briefing rápido (10 min)                          | Todos              |
| 10:10        | Descarga y transporte de equipos al open space              | Todos              |
| 10:10        | Marcar circuito físico en el piso (cinta + letreros)        | Rene               |
| 11:00–13:00  | Montaje simultáneo de los 14 exhibits                       | EMFUTECH, Daniel, Miri |
| 11:00–13:00  | Configurar módem y red local (S5, S9, S14)                 | Rafael             |
| 11:00–13:00  | Apoyo logístico                                             | Rene               |
| 12:30        | Verificación rápida — recorrido por cada exhibit            | Rafael             |
| 13:00–14:00  | LUNCH — pausa 1 hora                                        | Todos              |
| 13:30        | Daniel hace traspaso de S3/S10/S13 y se retira             | Daniel → Rafael    |
| 14:00        | Llegada de mentores contratados — briefing general (20 min) | Rafael + Mentores  |
| 14:20        | Entrenamiento 1:1 en cada exhibit                           | Mentores + EMFUTECH|
| 15:00        | Práctica de pitch — 6 min cada uno                         | Mentores           |
| 15:30        | Todos en posición — exhibits encendidos                     | Todos              |
| 16:00        | Exhibición de muestra para Dr. Peñaloza y Rafael            | Todos              |
| 17:00        | Sesión de feedback                                          | Dr. Peñaloza + Rafael |
| 17:00+       | Cierre Día 1 — cargar baterías overnight                   | Todos              |

## Plan Día 2 (Exhibición real)

| Hora  | Actividad                                              |
|-------|--------------------------------------------------------|
| 15:00 | Llegada + encender exhibits                            |
| 15:20 | Ronda de verificación final — Rafael                   |
| 15:40 | Briefing final 10 min                                  |
| 15:50 | Todos en su spot — espera                              |
| T+0   | Welcome speech Dr. Peñaloza + S1 demo                  |
| T+9   | Intro IKan + mentores forman grupos y trasladan        |
| T+15  | 🔁 Rafael da señal de inicio del tour                  |
| T+15→T+99 | 14 rondas × 6 min. Miri = coord. circulante       |
| T+105 | IKan asigna exhibit para video reportaje               |
| T+110 | 30 min trabajo de equipos (grabación + entrevistas)    |
| T+140 | Cierre oficial. Buffer hasta T+200 si se alarga.       |

---

## App — estructura actual (mirai_plan_app.jsx → src/App.jsx)

### Navegación (4 pestañas)
1. **👥 Personas y Spots** — tabla editable con selector por exhibit. Muestra equipo con sus asignaciones.
2. **📦 Día 1 — Montaje** — plan minuto a minuto en formato tabla por fases.
3. **🎯 Día 2 — Exhibición** — plan minuto a minuto del evento real.
4. **📋 Spots individuales** — tarjetas por exhibit. Al hacer clic, muestra detalle con: persona asignada, posición, exhibit a derecha/izquierda, y placeholder para el script.

### Estado principal
```js
const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
// { S2: "Por asignar", S3: "Daniel", ... }
```

### Pendiente implementar
- Scripts por exhibit: cada spot tiene un placeholder. Falta agregar el contenido real del script (texto o componente) en la vista de spot individual.
- Posiblemente: rutas independientes por spot (React Router) para que cada mentor tenga su URL directa.
- Posiblemente: persistencia de asignaciones (localStorage o parámetros en URL).

---

## Recursos críticos del evento (técnico)
- **Módem red local** — S5, S9, S14 dependen de él. Compra urgente.
- **Oculus necesarios** — 5 unidades: S4 (alumna trae los suyos), S5, S6, S9, S11 (del lab)
- **Daniel** — clave en S3 (FPV), S10 (araña), S13 (pose estimation). Sale a las 13:30 del Día 1.
- **S15** — único exhibit que requiere desarrollo desde cero (web robot teleoperation).

---

## Notion (uso interno)
- Hub: https://www.notion.so/36138cb6998381c8bcb4e45fbcf6a92a
- Inventario de exhibits: https://www.notion.so/673a2bd84f7a4750805b95b581400dd6
- Plan 13 días: https://www.notion.so/e71011cbe6714b76bf1f1ab5e91291a8
- Verificación técnica: https://www.notion.so/36438cb6998381a49a6ad16e6d881607
