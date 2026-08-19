"use client";

import { useEffect, useMemo, useState } from "react";

type ProductKey = "HO1028" | "HO1012" | "HO1003";
type Mode = "home" | "wizard" | "generating" | "book" | "pdf";
type Draft = { title: string; body: string; instruction: string };
type Shot = { id: string; name: string; category: string; image: number; credits: number; title: string; body: string };

const products: Record<ProductKey, { code: ProductKey; short: string; name: string; dimensions: string; use: string; capacity: string; hero: string; images: string[] }> = {
  HO1028: { code: "HO1028", short: "Operación agrícola", name: "Tráiler carrozado para drones fumigadores", dimensions: "5 × 2,40 m", use: "Logística móvil para drones agrícolas", capacity: "Doble nivel operativo", hero: "/products/HO1028.jpg", images: ["HO1028.jpg", "HO1028-1.jpg", "HO1028-2.jpg", "HO1028-4.jpg", "HO1028-5.jpg"] },
  HO1012: { code: "HO1012", short: "Carga pesada", name: "Semirremolque basculante homologado", dimensions: "9 × 2,60 m", use: "Auxilio mecánico y maquinaria pesada", capacity: "8 / 10 toneladas", hero: "/products/HO1012.jpg", images: ["HO1012.jpg", "HO1012-2.jpg", "HO1012-4.jpg", "HO1012-6.jpg", "HO1012-8.jpg", "HO1012-10.jpg"] },
  HO1003: { code: "HO1003", short: "Transporte vial", name: "Semirremolque balancín homologado", dimensions: "9 × 2,60 m", use: "Transporte de vehículos y auxilio", capacity: "8 / 10 toneladas", hero: "/products/HO1003.jpg", images: ["HO1003.jpg", "HO1003-1.jpg", "HO1003-3.jpg", "HO1003-5.jpg", "HO1003-8.jpg", "HO1003-12.jpg"] },
};

const steps = ["Referencias", "Materiales", "Movilidad", "Contexto", "Información", "Composición"];
const stepNotes = ["Producto y archivos", "Zonas y acabados", "Vehículo tractor", "Contextos de uso", "Fuente de verdad", "Piezas y costo"];
const zones = [
  { name: "Carrocería", x: 58, y: 38 },
  { name: "Chasis", x: 53, y: 67 },
  { name: "Piso", x: 40, y: 54 },
  { name: "Rodado", x: 74, y: 72 },
];
const materials = [
  { id: "grafito", name: "Acero grafito", detail: "Poliuretano semimate", style: "sphere-graphite" },
  { id: "aluminio", name: "Aluminio cepillado", detail: "Terminación satinada", style: "sphere-aluminum" },
  { id: "antideslizante", name: "Chapa antideslizante", detail: "Acero galvanizado", style: "sphere-tread" },
  { id: "azul", name: "Azul Rubiolo", detail: "Pintura poliuretánica", style: "sphere-blue" },
  { id: "caucho", name: "Caucho técnico", detail: "Negro de alta resistencia", style: "sphere-rubber" },
  { id: "inox", name: "Acero inoxidable", detail: "Pulido industrial", style: "sphere-steel" },
  { id: "vidrio", name: "Vidrio tonalizado", detail: "Transparencia controlada", style: "sphere-glass" },
  { id: "blanco", name: "Blanco cálido", detail: "Poliuretano satinado", style: "sphere-white" },
];
const vehicles = [
  { name: "Pickup full size", detail: "Enganche reforzado", compatible: ["HO1028", "HO1012", "HO1003"] },
  { name: "Camión liviano", detail: "Plato junior", compatible: ["HO1012", "HO1003"] },
  { name: "Camión con plato", detail: "Perno de 2 pulgadas", compatible: ["HO1012", "HO1003"] },
  { name: "Tractor agrícola", detail: "Adaptación de lanza", compatible: ["HO1028"] },
];
const contexts = [
  { name: "Campo agrícola", note: "Operación productiva y logística en lote" },
  { name: "Ruta nacional", note: "Traslado homologado y seguridad vial" },
  { name: "Camino de tierra", note: "Exigencia, polvo y terreno irregular" },
  { name: "Base operativa", note: "Preparación, carga y mantenimiento" },
  { name: "Feria o exposición", note: "Presentación comercial del equipo" },
];

const catalogs: Record<ProductKey, Shot[]> = {
  HO1028: [
    { id: "cover", name: "Portada en ruta", category: "COMERCIAL", image: 0, credits: 24, title: "La operación agrícola, lista para moverse", body: "Una solución móvil creada para acompañar el trabajo con drones desde la preparación hasta el traslado." },
    { id: "drone", name: "Operación con dron", category: "USO", image: 1, credits: 22, title: "Una plataforma diseñada para operar", body: "El doble nivel organiza equipo, insumos y maniobras para convertir cada lote en una base de trabajo." },
    { id: "road", name: "Traslado en ruta", category: "MOVILIDAD", image: 2, credits: 20, title: "Seguridad visible en cada traslado", body: "Iluminación reglamentaria, señalización y estabilidad para acompañar jornadas que empiezan antes de llegar al campo." },
    { id: "three", name: "Tres cuartos frontal", category: "PRODUCTO", image: 3, credits: 18, title: "Carrocería protegida para el trabajo real", body: "Una envolvente robusta resguarda el equipamiento y mantiene la operación ordenada ante condiciones cambiantes." },
    { id: "aerial", name: "Vista aérea operativa", category: "USO", image: 4, credits: 26, title: "Todo el sistema, visto desde arriba", body: "La superficie desplegable amplía el espacio de operación y revela una lógica pensada para trabajar con precisión." },
    { id: "platform", name: "Detalle de plataforma", category: "DETALLE", image: 1, credits: 16, title: "Cada metro trabaja a favor del equipo", body: "Accesos, barandas y superficies transitables simplifican la preparación y protegen al operador." },
    { id: "rear", name: "Vista posterior nocturna", category: "SEGURIDAD", image: 2, credits: 20, title: "Visibilidad cuando la jornada se extiende", body: "El sistema lumínico completo mantiene el conjunto reconocible y seguro en condiciones de baja luz." },
    { id: "side", name: "Perfil completo", category: "PRODUCTO", image: 3, credits: 18, title: "Cinco metros de solución móvil", body: "Proporciones, accesos y rodado se integran en un equipo compacto, estable y listo para acompañar la producción." },
    { id: "materials", name: "Materiales y terminaciones", category: "DETALLE", image: 0, credits: 16, title: "Materiales elegidos para durar", body: "Acero protegido, superficies antideslizantes y terminaciones técnicas sostienen el rendimiento cotidiano." },
    { id: "client", name: "Configuración del cliente", category: "PERSONALIZADA", image: 4, credits: 28, title: "Una configuración para esta operación", body: "El book traduce la necesidad del cliente en una propuesta visual específica, concreta y verificable." },
  ],
  HO1012: [
    { id: "cover", name: "Portada basculante", category: "COMERCIAL", image: 0, credits: 24, title: "Carga pesada. Maniobra simple.", body: "Un semirremolque basculante de gran capacidad preparado para cargar, trasladar y descargar con seguridad." },
    { id: "side", name: "Vista lateral completa", category: "PRODUCTO", image: 1, credits: 18, title: "Nueve metros pensados para transportar", body: "La plataforma combina largo útil, estabilidad y una configuración homologada para el trabajo cotidiano." },
    { id: "loading", name: "Secuencia de carga", category: "USO", image: 2, credits: 22, title: "La plataforma baja hasta el trabajo", body: "El sistema basculante reduce la complejidad de carga y facilita el ingreso de vehículos y maquinaria." },
    { id: "hydraulic", name: "Mecanismo hidráulico", category: "DETALLE", image: 3, credits: 18, title: "Control hidráulico, operación precisa", body: "El accionamiento acompaña una maniobra progresiva y controlada desde la posición de transporte hasta la carga." },
    { id: "hitch", name: "Enganche y estructura", category: "DETALLE", image: 4, credits: 16, title: "El esfuerzo empieza en una estructura reforzada", body: "Cuello de cisne, apoyos y chasis trabajan como un sistema único para sostener la capacidad del equipo." },
    { id: "transport", name: "Vehículo transportado", category: "USO", image: 5, credits: 24, title: "Capacidad que se demuestra en uso", body: "Una configuración preparada para auxilio mecánico, maquinaria y vehículos de distintas dimensiones." },
    { id: "three", name: "Tres cuartos posterior", category: "PRODUCTO", image: 0, credits: 18, title: "Una presencia sólida desde cada ángulo", body: "El conjunto prioriza robustez, lectura visual y acceso claro a cada componente operativo." },
    { id: "road", name: "En traslado", category: "MOVILIDAD", image: 1, credits: 20, title: "Homologado para acompañar cada destino", body: "Señalización, frenos y rodado dual construyen una propuesta de transporte estable y previsible." },
    { id: "materials", name: "Piso y terminaciones", category: "DETALLE", image: 2, credits: 16, title: "Superficies preparadas para trabajar", body: "La plataforma antideslizante y sus terminaciones resisten la exigencia de cargas repetidas." },
    { id: "client", name: "Aplicación del cliente", category: "PERSONALIZADA", image: 5, credits: 28, title: "Configurado alrededor de una necesidad real", body: "Cada imagen y cada argumento se adaptan al vehículo, la carga y el escenario comercial del comprador." },
  ],
  HO1003: [
    { id: "cover", name: "Portada balancín", category: "COMERCIAL", image: 0, credits: 24, title: "Estabilidad para mover más", body: "Un semirremolque homologado que combina capacidad, equilibrio y una plataforma lista para el transporte vial." },
    { id: "side", name: "Vista lateral", category: "PRODUCTO", image: 1, credits: 18, title: "Una plataforma amplia y despejada", body: "Nueve metros útiles permiten abordar vehículos y maquinaria con una lectura clara de toda la superficie." },
    { id: "three", name: "Tres cuartos frontal", category: "PRODUCTO", image: 2, credits: 18, title: "Geometría robusta, operación directa", body: "El cuello de cisne y el chasis reforzado conectan capacidad de carga con estabilidad en movimiento." },
    { id: "low", name: "Detalle estructural", category: "DETALLE", image: 3, credits: 16, title: "La resistencia se ve en cada unión", body: "Apoyos, largueros y puntos de amarre forman una base preparada para jornadas de alta exigencia." },
    { id: "profile", name: "Perfil con movilidad", category: "MOVILIDAD", image: 4, credits: 20, title: "El conjunto completo, listo para salir", body: "La integración con la pickup muestra proporción, maniobrabilidad y funcionamiento como sistema de transporte." },
    { id: "rear", name: "Tres cuartos posterior", category: "SEGURIDAD", image: 5, credits: 18, title: "Acceso, señalización y control", body: "Rampas, luces y bandas reflectivas concentran la seguridad donde comienza cada maniobra." },
    { id: "loading", name: "Carga de maquinaria", category: "USO", image: 0, credits: 22, title: "Preparado para recibir la carga", body: "La plataforma y sus rampas convierten la carga de maquinaria en una secuencia simple y ordenada." },
    { id: "road", name: "Traslado vial", category: "MOVILIDAD", image: 4, credits: 20, title: "Equilibrio que acompaña la ruta", body: "El sistema balancín distribuye el trabajo del conjunto y favorece un comportamiento estable." },
    { id: "materials", name: "Piso antideslizante", category: "DETALLE", image: 5, credits: 16, title: "Una superficie hecha para sostener", body: "La chapa antideslizante mejora el contacto y aporta confianza durante carga, descarga y transporte." },
    { id: "client", name: "Aplicación del cliente", category: "PERSONALIZADA", image: 2, credits: 28, title: "Una propuesta adaptada al trabajo del cliente", body: "El book conecta la configuración técnica con el uso concreto que necesita resolver el comprador." },
  ],
};

const defaultFeatures: Record<ProductKey, string> = {
  HO1028: "Doble nivel para operación de drones fumigadores. Plataforma superior transitable con barandas. Espacio protegido para dron, generador e insumos. Iluminación reglamentaria completa.",
  HO1012: "Plataforma pivotante basculante con accionamiento hidráulico. Capacidad real de 8/10 toneladas. Dos ejes con suspensión balancín. Piso antideslizante y freno eléctrico inercial.",
  HO1003: "Chasis reforzado para 8/10 toneladas. Suspensión con sistema balancín. Rampas traseras rebatibles con asistencia. Sistema de amarre longitudinal y señalización completa.",
};

export default function Home() {
  const [mode, setMode] = useState<Mode>("home");
  const [step, setStep] = useState(0);
  const [productKey, setProductKey] = useState<ProductKey>("HO1028");
  const [cadFile, setCadFile] = useState("Vista_CAD_frontal.png");
  const [vehicleFile, setVehicleFile] = useState("Sin fotos particulares");
  const [activeZone, setActiveZone] = useState("Carrocería");
  const [zoneMaterials, setZoneMaterials] = useState<Record<string, string>>({ Carrocería: "grafito", Chasis: "grafito", Piso: "antideslizante", Rodado: "caucho" });
  const [vehicle, setVehicle] = useState("Pickup full size");
  const [primaryContext, setPrimaryContext] = useState("Campo agrícola");
  const [extraContexts, setExtraContexts] = useState<string[]>(["Ruta nacional", "Base operativa"]);
  const [features, setFeatures] = useState(defaultFeatures.HO1028);
  const [benefits, setBenefits] = useState("Reduce tiempos de preparación, concentra la logística y protege el equipamiento durante el traslado.");
  const [restrictions, setRestrictions] = useState("No modificar dimensiones ni capacidad homologada. No agregar equipamiento que no esté declarado.");
  const [selectedIds, setSelectedIds] = useState<string[]>(catalogs.HO1028.slice(0, 6).map((item) => item.id));
  const [resolution, setResolution] = useState<"standard" | "high">("standard");
  const [progress, setProgress] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [imageOffsets, setImageOffsets] = useState<Record<string, number>>({});
  const [regenNotice, setRegenNotice] = useState("");

  const product = products[productKey];
  const catalog = catalogs[productKey];
  const selectedShots = catalog.filter((shot) => selectedIds.includes(shot.id));
  const compatibleVehicles = useMemo(() => vehicles.filter((item) => item.compatible.includes(productKey)), [productKey]);
  const cost = Math.round(selectedShots.reduce((sum, shot) => sum + shot.credits, 0) * (resolution === "high" ? 1.6 : 1));
  const ars = cost * 100;
  const wallet = 1200;

  useEffect(() => {
    if (mode !== "generating") return;
    const values = [27, 49, 68, 84, 96, 100];
    const timers = values.map((value, index) => window.setTimeout(() => setProgress(value), 420 * (index + 1)));
    const done = window.setTimeout(() => { setActivePage(0); setMode("book"); }, 3250);
    return () => { timers.forEach(window.clearTimeout); window.clearTimeout(done); };
  }, [mode]);

  function chooseProduct(key: ProductKey) {
    setProductKey(key);
    setFeatures(defaultFeatures[key]);
    setSelectedIds(catalogs[key].slice(0, 6).map((item) => item.id));
    setVehicle(vehicles.find((item) => item.compatible.includes(key))?.name ?? "Pickup full size");
  }

  function startBook(key: ProductKey = productKey) {
    chooseProduct(key);
    setStep(0);
    setMode("wizard");
  }

  function assignMaterial(materialId: string) {
    setZoneMaterials((current) => ({ ...current, [activeZone]: materialId }));
  }

  function toggleContext(name: string) {
    setExtraContexts((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  }

  function toggleShot(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function beginGeneration() {
    const nextDrafts: Record<string, Draft> = {};
    selectedShots.forEach((shot) => { nextDrafts[shot.id] = { title: shot.title, body: shot.body, instruction: "" }; });
    setDrafts(nextDrafts);
    setImageOffsets({});
    setProgress(8);
    setMode("generating");
  }

  function nextStep() {
    if (step < steps.length - 1) setStep(step + 1);
    else beginGeneration();
  }

  function updateDraft(field: keyof Draft, value: string) {
    const shot = selectedShots[activePage];
    if (!shot) return;
    setDrafts((current) => ({ ...current, [shot.id]: { ...(current[shot.id] ?? { title: shot.title, body: shot.body, instruction: "" }), [field]: value } }));
  }

  function regenerate(kind: "text" | "image" | "both") {
    const shot = selectedShots[activePage];
    if (!shot) return;
    if (kind === "text" || kind === "both") {
      const instruction = drafts[shot.id]?.instruction.trim();
      setDrafts((current) => ({ ...current, [shot.id]: { ...current[shot.id], body: instruction ? `${shot.body} Ajuste solicitado: ${instruction}.` : `${shot.body} Una versión más directa, enfocada en el valor para el cliente.` } }));
    }
    if (kind === "image" || kind === "both") setImageOffsets((current) => ({ ...current, [shot.id]: ((current[shot.id] ?? 0) + 1) % product.images.length }));
    setRegenNotice(`${kind === "text" ? "Texto" : kind === "image" ? "Imagen" : "Página"} regenerado · costo demo ${kind === "both" ? 16 : kind === "image" ? 12 : 4} créditos`);
    window.setTimeout(() => setRegenNotice(""), 2400);
  }

  function shotImage(shot: Shot) {
    const index = (shot.image + (imageOffsets[shot.id] ?? 0)) % product.images.length;
    return `/products/${product.images[index]}`;
  }

  if (mode === "pdf") {
    return (
      <main className="pdf-preview">
        <header><button onClick={() => setMode("book")}>← Volver al editor</button><div><span>VISTA PREVIA</span><b>Book_{product.code}_Cliente.pdf</b></div><button onClick={() => window.alert("La descarga real estará disponible en la versión productiva.")}>Descargar PDF <small>Demo</small></button></header>
        <div className="pdf-document">
          {selectedShots.map((shot, index) => {
            const draft = drafts[shot.id] ?? { title: shot.title, body: shot.body, instruction: "" };
            return <article key={shot.id} className={`pdf-page ${index === 0 ? "pdf-cover" : ""}`}>
              <img src={shotImage(shot)} alt={shot.name} />
              <div className="pdf-shade" />
              <div className="pdf-brand">{index > 0 && <img src="/products/logo4.png" alt="Acoplados Rubiolo"/>}<span>{product.code}</span></div>
              <div className="pdf-copy"><span>{shot.category} · 0{index + 1}</span><h2>{draft.title}</h2><p>{draft.body}</p></div>
              <footer><span>{product.name}</span><span>0{index + 1} / {String(selectedShots.length).padStart(2, "0")}</span></footer>
            </article>;
          })}
        </div>
      </main>
    );
  }

  if (mode === "book") {
    const shot = selectedShots[activePage] ?? selectedShots[0];
    const draft = shot ? (drafts[shot.id] ?? { title: shot.title, body: shot.body, instruction: "" }) : null;
    return (
      <main className="editor-shell">
        <header className="editor-header">
          <button className="brand-button" onClick={() => setMode("home")}><img src="/products/logo4.png" alt="Acoplados Rubiolo"/></button>
          <div><span>BORRADOR EDITORIAL</span><b>{product.code} · {selectedShots.length} páginas visuales</b></div>
          <p><i />Guardado local</p>
          <button className="ghost-button" onClick={() => { setStep(5); setMode("wizard"); }}>Editar configuración</button>
          <button className="primary-button" onClick={() => setMode("pdf")}>Vista previa PDF <span>↗</span></button>
        </header>
        <div className="editor-workspace">
          <nav className="page-rail" aria-label="Páginas del book">
            <span>PÁGINAS</span>
            {selectedShots.map((item, index) => <button key={item.id} className={activePage === index ? "active" : ""} onClick={() => setActivePage(index)}><em>0{index + 1}</em><img src={shotImage(item)} alt=""/><b>{item.name}</b></button>)}
          </nav>
          {shot && draft && <section className="editor-canvas-wrap">
            <div className={`editor-page ${activePage === 0 ? "editor-cover" : ""}`}>
              <div className="editor-page-image"><img src={shotImage(shot)} alt={shot.name}/><div className="editor-image-gradient"/><span>{shot.category}</span></div>
              <div className="editor-page-copy"><div className="editor-page-brand">{activePage > 0 && <img src="/products/logo4.png" alt=""/>}<span>{product.code}</span></div><span className="page-kicker">{shot.category} · 0{activePage + 1}</span><h1>{draft.title}</h1><p>{draft.body}</p><dl><div><dt>Dimensiones</dt><dd>{product.dimensions}</dd></div><div><dt>Capacidad</dt><dd>{product.capacity}</dd></div><div><dt>Aplicación</dt><dd>{primaryContext}</dd></div></dl></div>
              <div className="page-number">0{activePage + 1}<span>/{String(selectedShots.length).padStart(2, "0")}</span></div>
            </div>
            <div className="canvas-note"><i />Borrador generado a partir de referencias e información declarada por el vendedor</div>
          </section>}
          {shot && draft && <aside className="editor-inspector">
            <div className="inspector-heading"><span>EDITAR PÁGINA 0{activePage + 1}</span><b>{shot.name}</b></div>
            <label>Título<input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)}/></label>
            <label>Texto comercial<textarea rows={7} value={draft.body} onChange={(event) => updateDraft("body", event.target.value)}/><small>{draft.body.length} caracteres</small></label>
            <label>Indicación para regenerar<textarea rows={4} value={draft.instruction} onChange={(event) => updateDraft("instruction", event.target.value)} placeholder="Ej.: Hacer más foco en la seguridad durante el traslado"/></label>
            <div className="regenerate-box"><span>REGENERAR ESTA PÁGINA</span><button onClick={() => regenerate("text")}>Solo texto <b>4 cr.</b></button><button onClick={() => regenerate("image")}>Solo imagen <b>12 cr.</b></button><button className="regen-primary" onClick={() => regenerate("both")}>Imagen + texto <b>16 cr.</b></button></div>
            <div className="editor-source"><i />Fuente de verdad activa<p>{features.slice(0, 118)}…</p></div>
          </aside>}
        </div>
        {regenNotice && <div className="toast">✓ {regenNotice}</div>}
      </main>
    );
  }

  if (mode === "generating") {
    return (
      <main className="generation-screen"><div className="generation-grid"/><div className="generation-card">
        <span className="status-pill"><i /> PROCESANDO BOOK</span><p className="generation-code">{product.code} · {selectedShots.length} COMPOSICIONES · {cost} CRÉDITOS</p><h1>Construyendo la narrativa visual</h1><p>Combinando geometría, materiales, contexto y datos verificados.</p>
        <div className="progress-track"><div style={{ width: `${progress}%` }}/></div><div className="progress-meta"><span>{progress < 40 ? "Interpretando referencias" : progress < 72 ? "Componiendo escenas" : progress < 95 ? "Redactando narrativa comercial" : "Preparando editor"}</span><b>{progress}%</b></div>
        <div className="render-queue">{selectedShots.slice(0, 8).map((item, index) => <div key={item.id} className={progress > (index + 1) * (86 / Math.min(selectedShots.length, 8)) ? "done" : ""}><span>{String(index + 1).padStart(2, "0")}</span>{item.name}<b>✓</b></div>)}</div>
      </div></main>
    );
  }

  if (mode === "wizard") {
    return (
      <main className="app-shell v2-shell">
        <header className="app-header"><button className="brand-button" onClick={() => setMode("home")}><img src="/products/logo4.png" alt="Acoplados Rubiolo"/></button><div className="project-name"><span>PROYECTO</span><strong>Book comercial · {product.code}</strong></div><div className="wallet-mini"><span>SALDO</span><b>{wallet.toLocaleString("es-AR")} créditos</b></div><div className="draft-status"><i /> BORRADOR GUARDADO</div><button className="close-button" onClick={() => setMode("home")}>×</button></header>
        <div className="workspace">
          <aside className="step-rail"><div className="rail-label">CONFIGURACIÓN</div>{steps.map((label, index) => <button key={label} onClick={() => setStep(index)} className={`${step === index ? "active" : ""} ${step > index ? "complete" : ""}`}><span>{step > index ? "✓" : `0${index + 1}`}</span><div><b>{label}</b><small>{stepNotes[index]}</small></div></button>)}<div className="rail-summary"><span>PRODUCTO ACTIVO</span><img src={product.hero} alt=""/><b>{product.code}</b><p>{product.name}</p></div></aside>
          <section className="step-content">
            <div className="step-heading"><div><span>PASO {step + 1} DE 6</span><h1>{["Definí el producto de partida", "Asigná un material a cada zona", "Vinculá el vehículo real", "Definí el uso principal", "Declarar antes de generar", "Elegí cada pieza del book"][step]}</h1></div><p>{["Reuní capturas CAD y fotos que preservarán la geometría.", "Seleccioná una parte sobre la imagen y aplicá un acabado Rubiolo.", "Elegí la movilidad y sumá referencias del vehículo particular.", "Marcá el contexto principal sin limitar la variedad del book.", "Estos datos serán la fuente de verdad para imágenes y textos.", "Seleccioná cantidad, resolución y revisá el costo estimado."][step]}</p></div>

            {step === 0 && <div className="step-block"><div className="product-selector">{(Object.keys(products) as ProductKey[]).map((key) => { const item = products[key]; return <button key={key} className={productKey === key ? "selected" : ""} onClick={() => chooseProduct(key)}><div className="product-image"><img src={item.hero} alt={item.name}/><span>{item.short}</span></div><div className="product-card-copy"><span>{item.code}</span><h2>{item.name}</h2><p>{item.dimensions} · {item.capacity}</p><i>{productKey === key ? "✓ Seleccionado" : "Elegir producto"}</i></div></button>; })}</div><div className="reference-row"><label className="upload-card"><input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && setCadFile(event.target.files[0].name)}/><span className="upload-icon">＋</span><div><b>Agregar captura CAD</b><p>Vista frontal, lateral o superior</p></div></label><div className="file-card"><img src={product.hero} alt="Referencia"/><div><span>REFERENCIA PRINCIPAL</span><b>{cadFile}</b><p>Imagen lista para segmentación</p></div><i>✓</i></div></div></div>}

            {step === 1 && <div className="zone-material-layout"><div className="zone-canvas"><div className="zone-image"><img src={product.hero} alt={product.name}/>{zones.map((zone) => <button key={zone.name} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} className={activeZone === zone.name ? "active" : ""} onClick={() => setActiveZone(zone.name)}><span>{zones.indexOf(zone) + 1}</span>{zone.name}</button>)}<div className="zone-hint">Seleccioná una zona sobre el producto</div></div><div className="zone-assignments">{zones.map((zone) => { const materialItem = materials.find((item) => item.id === zoneMaterials[zone.name])!; return <button key={zone.name} onClick={() => setActiveZone(zone.name)} className={activeZone === zone.name ? "active" : ""}><i className={`material-sphere mini ${materialItem.style}`}/><span>{zone.name}<b>{materialItem.name}</b></span><em>Editar</em></button>; })}</div></div><aside className="material-library"><div><span>BIBLIOTECA RUBIOLO</span><h2>Material para {activeZone}</h2></div><div className="sphere-grid">{materials.map((item) => <button key={item.id} className={zoneMaterials[activeZone] === item.id ? "selected" : ""} onClick={() => assignMaterial(item.id)}><i className={`material-sphere ${item.style}`}/><b>{item.name}</b><small>{item.detail}</small><em>{zoneMaterials[activeZone] === item.id ? "✓" : ""}</em></button>)}</div><button className="add-material">＋ Cargar nuevo material</button></aside></div>}

            {step === 2 && <div className="mobility-v2"><div className="mobility-photo"><img src={product.hero} alt={product.name}/><div><span>MOVILIDAD SELECCIONADA</span><h2>{vehicle}</h2><p>{compatibleVehicles.find((item) => item.name === vehicle)?.detail}</p></div></div><aside><span className="panel-eyebrow">VEHÍCULOS COMPATIBLES</span>{compatibleVehicles.map((item, index) => <button key={item.name} className={vehicle === item.name ? "selected" : ""} onClick={() => setVehicle(item.name)}><span>0{index + 1}</span><div><b>{item.name}</b><small>{item.detail}</small></div><i>{vehicle === item.name ? "✓" : "→"}</i></button>)}<label className="vehicle-upload"><input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && setVehicleFile(event.target.files[0].name)}/><span>＋</span><div><b>Fotos del vehículo particular</b><small>{vehicleFile}</small></div></label></aside></div>}

            {step === 3 && <div className="context-v2"><div className="context-grid">{contexts.map((item, index) => <button key={item.name} className={primaryContext === item.name ? "selected" : ""} onClick={() => setPrimaryContext(item.name)}><img src={`/products/${product.images[index % product.images.length]}`} alt=""/><div/><span>CONTEXTO {String(index + 1).padStart(2, "0")}</span><b>{item.name}</b><p>{item.note}</p><i>{primaryContext === item.name ? "PRINCIPAL ✓" : "Elegir principal"}</i></button>)}</div><aside className="context-aside"><span>VARIEDAD DEL BOOK</span><h3>Contextos complementarios</h3><p>El contexto principal guía la narrativa. Podés sumar otros para mostrar versatilidad.</p>{contexts.filter((item) => item.name !== primaryContext).map((item) => <label key={item.name}><input type="checkbox" checked={extraContexts.includes(item.name)} onChange={() => toggleContext(item.name)}/><i/>{item.name}</label>)}</aside></div>}

            {step === 4 && <div className="truth-layout"><div className="truth-intro"><span>FUENTE DE VERDAD</span><h2>Lo que la IA puede afirmar</h2><p>La generación usará estas declaraciones como límite. No agregará capacidades, medidas o equipamiento que no estén documentados.</p><div><i>01</i>Imágenes de referencia<b>{product.images.length + 1} archivos</b></div><div><i>02</i>Zonas con material<b>{Object.keys(zoneMaterials).length} asignadas</b></div><div><i>03</i>Movilidad definida<b>{vehicle}</b></div></div><div className="truth-form"><label>Características funcionales<textarea rows={6} value={features} onChange={(event) => setFeatures(event.target.value)}/><small>Describí capacidades, mecanismos, dimensiones y equipamiento real.</small></label><label>Beneficios comerciales<textarea rows={4} value={benefits} onChange={(event) => setBenefits(event.target.value)}/></label><label>Restricciones — no inventar<textarea rows={4} value={restrictions} onChange={(event) => setRestrictions(event.target.value)}/></label><div className="ai-draft-note"><i>AI</i><div><b>La IA propondrá el primer borrador</b><p>Imágenes, títulos y textos estarán disponibles para revisión del vendedor.</p></div></div></div></div>}

            {step === 5 && <div className="composition-v2"><div className="shot-catalog"><div className="catalog-toolbar"><span>{selectedShots.length} de {catalog.length} composiciones seleccionadas</span><button onClick={() => setSelectedIds(catalog.map((item) => item.id))}>Seleccionar todas</button></div><div className="shot-choice-grid">{catalog.map((shot) => <button key={shot.id} className={selectedIds.includes(shot.id) ? "selected" : ""} onClick={() => toggleShot(shot.id)}><img src={`/products/${product.images[shot.image % product.images.length]}`} alt=""/><div className="shot-shade"/><span>{shot.category}</span><b>{shot.name}</b><small>{shot.credits} créditos</small><i>{selectedIds.includes(shot.id) ? "✓" : "+"}</i></button>)}</div></div><aside className="cost-panel"><span>ESTIMACIÓN DE GENERACIÓN</span><h2>{selectedShots.length} composiciones</h2><div className="resolution-toggle"><button className={resolution === "standard" ? "active" : ""} onClick={() => setResolution("standard")}><b>Estándar</b><small>1536 px</small></button><button className={resolution === "high" ? "active" : ""} onClick={() => setResolution("high")}><b>Alta</b><small>2048 px · ×1,6</small></button></div><dl><div><dt>Imágenes</dt><dd>{selectedShots.length}</dd></div><div><dt>Resolución</dt><dd>{resolution === "high" ? "Alta" : "Estándar"}</dd></div><div><dt>Generación inicial</dt><dd>{cost} cr.</dd></div></dl><div className="cost-total"><span>COSTO ESTIMADO</span><b>{cost} créditos</b><p>≈ ARS {ars.toLocaleString("es-AR")} <small>valor demo</small></p></div><div className="wallet-status"><div><span>SALDO DISPONIBLE</span><b>{wallet.toLocaleString("es-AR")} cr.</b></div><div className="wallet-bar"><i style={{ width: `${Math.max(8, ((wallet - cost) / wallet) * 100)}%` }}/></div><p>Saldo luego de generar: {(wallet - cost).toLocaleString("es-AR")} créditos</p></div></aside></div>}
          </section>
        </div>
        <footer className="wizard-footer"><button className="back-button" onClick={() => step === 0 ? setMode("home") : setStep(step - 1)}>← {step === 0 ? "Cancelar" : "Anterior"}</button><div><span>{step + 1} / 6</span><div className="mini-progress"><i style={{ width: `${((step + 1) / 6) * 100}%` }}/></div></div><button className="primary-button" disabled={step === 5 && selectedShots.length === 0} onClick={nextStep}>{step === 5 ? `Generar · ${cost} cr.` : "Continuar"}<span>→</span></button></footer>
      </main>
    );
  }

  return (
    <main className="home-screen"><header className="home-header"><img src="/products/logo4.png" alt="Acoplados Rubiolo"/><div className="product-badge"><i/> BOOK STUDIO <span>CONCEPT</span></div><nav><button>Proyectos</button><button>Biblioteca</button><button className="wallet-nav"><span>SALDO</span><b>1.200 cr.</b></button><button className="avatar">MR</button></nav></header>
      <section className="hero-social"><div className="hero-social-copy"><span className="kicker">PRESENTACIÓN COMERCIAL INTELIGENTE</span><h1><strong>RUBIOLO</strong><em>BOOK STUDIO</em></h1><div className="lime-rule"><i/></div><h2>De una captura CAD a una historia que vende.</h2><p>Configurá el producto, generá las imágenes y editá un book comercial listo para cada cliente.</p><button className="hero-cta" onClick={() => startBook()}>Crear nuevo book <span>→</span></button><div className="hero-metrics"><div><b>06</b><span>pasos guiados</span></div><div><b>10</b><span>composiciones</span></div><div><b>100%</b><span>editable</span></div></div></div><div className="hero-social-visual"><div className="blueprint-lines"/><img src="/og.png" alt="Rubiolo Book Studio: del CAD al producto terminado"/><div className="hero-visual-fade"/><div className="floating-card"><span>FLUJO DEL BOOK</span><b>Referencias → Borrador editable</b><div><i/><i/><i/><i/><i/><i/></div></div></div></section>
      <section className="recent-section"><div className="section-title"><div><span>CATÁLOGO DE PARTIDA</span><h2>Elegí un producto para comenzar</h2></div><p>Modelos precargados para esta demostración conceptual</p></div><div className="recent-grid">{(Object.keys(products) as ProductKey[]).map((key) => { const item = products[key]; return <button key={key} onClick={() => startBook(key)}><div className="recent-image"><img src={item.hero} alt={item.name}/><span>{item.short}</span><i>↗</i></div><div className="recent-copy"><span>{item.code}</span><h3>{item.name}</h3><p>{item.dimensions}<b>·</b>{item.capacity}</p></div></button>; })}</div></section><footer className="home-footer"><span>RUBIOLO BOOK STUDIO · PROTOTIPO CONCEPTUAL</span><span>Experiencia interna de ventas</span></footer>
    </main>
  );
}
