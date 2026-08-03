"use client";

import { useEffect, useMemo, useState } from "react";

type ProductKey = "HO1028" | "HO1012" | "HO1003";
type Mode = "home" | "wizard" | "generating" | "book";

const products: Record<ProductKey, {
  code: ProductKey;
  short: string;
  name: string;
  dimensions: string;
  use: string;
  capacity: string;
  hero: string;
  images: string[];
}> = {
  HO1028: {
    code: "HO1028",
    short: "Operación agrícola",
    name: "Tráiler carrozado para drones fumigadores",
    dimensions: "5 × 2,40 m",
    use: "Logística móvil para drones agrícolas",
    capacity: "Doble nivel operativo",
    hero: "/products/HO1028.jpg",
    images: ["HO1028.jpg", "HO1028-1.jpg", "HO1028-2.jpg", "HO1028-4.jpg", "HO1028-5.jpg"],
  },
  HO1012: {
    code: "HO1012",
    short: "Carga pesada",
    name: "Semirremolque basculante homologado",
    dimensions: "9 × 2,60 m",
    use: "Auxilio mecánico y maquinaria pesada",
    capacity: "8 / 10 toneladas",
    hero: "/products/HO1012.jpg",
    images: ["HO1012.jpg", "HO1012-2.jpg", "HO1012-4.jpg", "HO1012-6.jpg", "HO1012-8.jpg", "HO1012-10.jpg"],
  },
  HO1003: {
    code: "HO1003",
    short: "Transporte vial",
    name: "Semirremolque balancín homologado",
    dimensions: "9 × 2,60 m",
    use: "Transporte de vehículos y auxilio",
    capacity: "8 / 10 toneladas",
    hero: "/products/HO1003.jpg",
    images: ["HO1003.jpg", "HO1003-1.jpg", "HO1003-3.jpg", "HO1003-5.jpg", "HO1003-8.jpg", "HO1003-12.jpg"],
  },
};

const steps = ["Referencias", "Materiales", "Escenario", "Movilidad", "Composición"];
const materials = [
  { name: "Acero grafito", detail: "Estructura y chasis", color: "#171b20" },
  { name: "Chapa antideslizante", detail: "Piso operativo", color: "#89939b" },
  { name: "Aluminio natural", detail: "Terminaciones", color: "#d3d7d7" },
  { name: "Poliuretano Rubiolo", detail: "Carrocería", color: "#0866c8" },
];
const scenarios = [
  { name: "Campo agrícola", eyebrow: "OPERACIÓN", description: "Lote abierto · luz de mañana", symbol: "⌁" },
  { name: "Ruta nacional", eyebrow: "TRASLADO", description: "Asfalto · hora dorada", symbol: "↗" },
  { name: "Camino de tierra", eyebrow: "EXIGENCIA", description: "Polvo · movimiento", symbol: "≈" },
  { name: "Base operativa", eyebrow: "DETALLE", description: "Taller · luz controlada", symbol: "⌂" },
];
const vehicles = [
  { name: "Pickup full size", detail: "Enganche reforzado", compatible: ["HO1028", "HO1012", "HO1003"] },
  { name: "Camión liviano", detail: "Plato junior", compatible: ["HO1012", "HO1003"] },
  { name: "Camión con plato", detail: "Perno de 2 pulgadas", compatible: ["HO1012", "HO1003"] },
  { name: "Tractor agrícola", detail: "Adaptación de lanza", compatible: ["HO1028"] },
];
const shots = ["Portada comercial", "Tres cuartos", "Vista lateral", "Perspectiva aérea", "Detalle técnico", "En operación"];

export default function Home() {
  const [mode, setMode] = useState<Mode>("home");
  const [step, setStep] = useState(0);
  const [productKey, setProductKey] = useState<ProductKey>("HO1028");
  const [material, setMaterial] = useState(materials[0].name);
  const [scenario, setScenario] = useState(scenarios[0].name);
  const [vehicle, setVehicle] = useState(vehicles[0].name);
  const [fileName, setFileName] = useState("Vista_CAD_frontal.png");
  const [progress, setProgress] = useState(0);
  const [activeSpread, setActiveSpread] = useState(0);

  const product = products[productKey];
  const compatibleVehicles = useMemo(
    () => vehicles.filter((item) => item.compatible.includes(productKey)),
    [productKey],
  );

  useEffect(() => {
    if (!compatibleVehicles.some((item) => item.name === vehicle)) {
      setVehicle(compatibleVehicles[0].name);
    }
  }, [compatibleVehicles, vehicle]);

  useEffect(() => {
    if (mode !== "generating") return;
    setProgress(12);
    const values = [31, 54, 76, 92, 100];
    const timers = values.map((value, index) =>
      window.setTimeout(() => setProgress(value), 430 * (index + 1)),
    );
    const done = window.setTimeout(() => {
      setActiveSpread(0);
      setMode("book");
    }, 2700);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
  }, [mode]);

  function startBook(key: ProductKey = productKey) {
    setProductKey(key);
    setStep(0);
    setMode("wizard");
  }

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else setMode("generating");
  }

  if (mode === "book") {
    const images = Array.from({ length: 6 }, (_, index) => product.images[index % product.images.length]);
    return (
      <main className="book-view">
        <header className="book-header">
          <button className="brand-button" onClick={() => setMode("home")} aria-label="Volver al inicio">
            <img src="/products/logo4.png" alt="Acoplados Rubiolo" />
          </button>
          <div className="book-titleline">
            <span>BOOK COMERCIAL</span>
            <strong>{product.code} / {scenario}</strong>
          </div>
          <div className="book-actions">
            <button className="ghost-button" onClick={() => setMode("wizard")}>Editar configuración</button>
            <button className="primary-button subtle-disabled" onClick={() => window.alert("La exportación estará disponible en la siguiente versión.")}>Exportar PDF <span>Próximamente</span></button>
          </div>
        </header>

        <section className="book-stage">
          <div className="book-visual">
            <img src={`/products/${images[activeSpread]}`} alt={`${product.name} — ${shots[activeSpread]}`} />
            <div className="book-gradient" />
            <div className="book-copy">
              <span className="kicker">ACOPLADOS RUBIOLO · {product.code}</span>
              <h1>{activeSpread === 0 ? "Hecho para llegar más lejos." : shots[activeSpread]}</h1>
              <p>{product.name}. Configurado para {scenario.toLowerCase()} con {vehicle.toLowerCase()}.</p>
            </div>
            <div className="book-index">0{activeSpread + 1}<span>/ 06</span></div>
          </div>
          <aside className="book-specs">
            <div className="spec-top">
              <span>CONFIGURACIÓN</span>
              <b>BOOK #{product.code}-042</b>
            </div>
            <dl>
              <div><dt>Producto</dt><dd>{product.code}</dd></div>
              <div><dt>Dimensiones</dt><dd>{product.dimensions}</dd></div>
              <div><dt>Capacidad</dt><dd>{product.capacity}</dd></div>
              <div><dt>Acabado</dt><dd>{material}</dd></div>
              <div><dt>Contexto</dt><dd>{scenario}</dd></div>
              <div><dt>Movilidad</dt><dd>{vehicle}</dd></div>
            </dl>
            <div className="concept-note"><i />Visualización conceptual para presentación comercial</div>
          </aside>
        </section>

        <nav className="filmstrip" aria-label="Composiciones del book">
          {images.map((image, index) => (
            <button key={`${image}-${index}`} className={activeSpread === index ? "active" : ""} onClick={() => setActiveSpread(index)}>
              <span>0{index + 1}</span>
              <img src={`/products/${image}`} alt="" />
              <b>{shots[index]}</b>
            </button>
          ))}
        </nav>
      </main>
    );
  }

  if (mode === "generating") {
    return (
      <main className="generation-screen">
        <div className="generation-grid" />
        <div className="generation-card">
          <span className="status-pill"><i /> PROCESANDO BOOK</span>
          <p className="generation-code">{product.code} · {scenario} · 6 COMPOSICIONES</p>
          <h1>Construyendo la narrativa visual</h1>
          <p>Combinando geometría, materiales y contexto de uso.</p>
          <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
          <div className="progress-meta"><span>{progress < 55 ? "Interpretando referencias" : progress < 92 ? "Componiendo escenarios" : "Aplicando identidad Rubiolo"}</span><b>{progress}%</b></div>
          <div className="render-queue">
            {shots.map((shot, index) => <div key={shot} className={progress > (index + 1) * 14 ? "done" : ""}><span>0{index + 1}</span>{shot}<b>✓</b></div>)}
          </div>
        </div>
      </main>
    );
  }

  if (mode === "wizard") {
    return (
      <main className="app-shell">
        <header className="app-header">
          <button className="brand-button" onClick={() => setMode("home")} aria-label="Volver al inicio"><img src="/products/logo4.png" alt="Acoplados Rubiolo" /></button>
          <div className="project-name"><span>PROYECTO</span><strong>Book comercial · {product.code}</strong></div>
          <div className="draft-status"><i /> BORRADOR GUARDADO</div>
          <button className="close-button" onClick={() => setMode("home")} aria-label="Cerrar proyecto">×</button>
        </header>

        <div className="workspace">
          <aside className="step-rail">
            <div className="rail-label">CONFIGURACIÓN</div>
            {steps.map((label, index) => (
              <button key={label} onClick={() => setStep(index)} className={`${step === index ? "active" : ""} ${step > index ? "complete" : ""}`}>
                <span>{step > index ? "✓" : `0${index + 1}`}</span>
                <div><b>{label}</b><small>{["Producto y archivos", "Superficies y acabado", "Contexto de uso", "Vehículo tractor", "Vistas del book"][index]}</small></div>
              </button>
            ))}
            <div className="rail-summary">
              <span>PRODUCTO ACTIVO</span>
              <img src={product.hero} alt="" />
              <b>{product.code}</b>
              <p>{product.name}</p>
            </div>
          </aside>

          <section className="step-content">
            <div className="step-heading">
              <div><span>PASO {step + 1} DE 5</span><h1>{["Definí el producto de partida", "Asigná materiales y acabados", "Elegí dónde cobra vida", "Seleccioná la movilidad", "Armá la secuencia del book"][step]}</h1></div>
              <p>{["Elegí un modelo y reuní las referencias que preservarán su geometría.", "Definí cómo se verá cada superficie en las composiciones.", "Seleccioná el contexto que mejor representa el trabajo del cliente.", "Vinculá el acoplado con el vehículo que lo llevará a la acción.", "Revisá las seis vistas que construirán la presentación comercial."][step]}</p>
            </div>

            {step === 0 && (
              <div className="step-block">
                <div className="product-selector">
                  {(Object.keys(products) as ProductKey[]).map((key) => {
                    const item = products[key];
                    return <button key={key} className={productKey === key ? "selected" : ""} onClick={() => setProductKey(key)}>
                      <div className="product-image"><img src={item.hero} alt={item.name} /><span>{item.short}</span></div>
                      <div className="product-card-copy"><span>{item.code}</span><h2>{item.name}</h2><p>{item.dimensions} · {item.capacity}</p><i>{productKey === key ? "✓ Seleccionado" : "Elegir producto"}</i></div>
                    </button>;
                  })}
                </div>
                <div className="reference-row">
                  <label className="upload-card">
                    <input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && setFileName(event.target.files[0].name)} />
                    <span className="upload-icon">＋</span><div><b>Agregar captura CAD</b><p>PNG, JPG o WEBP · vista frontal, lateral o superior</p></div>
                  </label>
                  <div className="file-card"><img src={product.hero} alt="Referencia seleccionada" /><div><span>REFERENCIA PRINCIPAL</span><b>{fileName}</b><p>Imagen lista para la simulación</p></div><i>✓</i></div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="materials-layout">
                <div className="material-preview"><img src={product.hero} alt={product.name} /><span className="zone zone-a">A</span><span className="zone zone-b">B</span><span className="zone zone-c">C</span><div className="preview-label">ZONAS PREDEFINIDAS · SIMULACIÓN</div></div>
                <div className="material-panel"><span className="panel-eyebrow">BIBLIOTECA RUBIOLO</span><h2>Acabado principal</h2>{materials.map((item) => <button key={item.name} className={material === item.name ? "selected" : ""} onClick={() => setMaterial(item.name)}><i style={{ background: item.color }} /><div><b>{item.name}</b><span>{item.detail}</span></div><em>{material === item.name ? "✓" : ""}</em></button>)}<div className="material-note">El material elegido se aplicará a estructura, carrocería y detalles visibles del book.</div></div>
              </div>
            )}

            {step === 2 && (
              <div className="scenario-grid">{scenarios.map((item, index) => <button key={item.name} className={scenario === item.name ? "selected" : ""} onClick={() => setScenario(item.name)}><img src={`/products/${product.images[index % product.images.length]}`} alt="" /><div className="scenario-overlay"/><span>{item.eyebrow}</span><strong>{item.name}</strong><p>{item.description}</p><i>{item.symbol}</i></button>)}</div>
            )}

            {step === 3 && (
              <div className="vehicle-layout"><div className="vehicle-visual"><img src={product.hero} alt={product.name} /><div className="vehicle-caption"><span>COMPATIBILIDAD VALIDADA</span><b>{vehicle}</b><p>{compatibleVehicles.find((item) => item.name === vehicle)?.detail}</p></div></div><div className="vehicle-options"><span className="panel-eyebrow">VEHÍCULOS COMPATIBLES</span>{compatibleVehicles.map((item, index) => <button key={item.name} className={vehicle === item.name ? "selected" : ""} onClick={() => setVehicle(item.name)}><span>0{index + 1}</span><div><b>{item.name}</b><small>{item.detail}</small></div><i>{vehicle === item.name ? "✓" : "→"}</i></button>)}</div></div>
            )}

            {step === 4 && (
              <div className="composition-layout"><div className="shot-grid">{shots.map((shot, index) => <div key={shot}><img src={`/products/${product.images[index % product.images.length]}`} alt=""/><span>0{index + 1}</span><b>{shot}</b><i>INCLUIDA ✓</i></div>)}</div><aside className="final-summary"><span>RESUMEN DEL BOOK</span><h2>Listo para generar</h2><dl><div><dt>Producto</dt><dd>{product.code}</dd></div><div><dt>Material</dt><dd>{material}</dd></div><div><dt>Escenario</dt><dd>{scenario}</dd></div><div><dt>Movilidad</dt><dd>{vehicle}</dd></div><div><dt>Composiciones</dt><dd>6 vistas</dd></div></dl><p><i />La generación será simulada para esta demostración conceptual.</p></aside></div>
            )}
          </section>
        </div>

        <footer className="wizard-footer">
          <button className="back-button" onClick={() => step === 0 ? setMode("home") : setStep(step - 1)}>← {step === 0 ? "Cancelar" : "Anterior"}</button>
          <div><span>{step + 1} / 5</span><div className="mini-progress"><i style={{ width: `${((step + 1) / 5) * 100}%` }} /></div></div>
          <button className="primary-button" onClick={next}>{step === 4 ? "Generar book" : "Continuar"} <span>→</span></button>
        </footer>
      </main>
    );
  }

  return (
    <main className="home-screen">
      <header className="home-header">
        <img src="/products/logo4.png" alt="Acoplados Rubiolo" />
        <div className="product-badge"><i /> BOOK STUDIO <span>CONCEPT</span></div>
        <nav><button>Proyectos</button><button>Biblioteca</button><button className="avatar" aria-label="Perfil de usuario">MR</button></nav>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <span className="kicker">PRESENTACIÓN COMERCIAL INTELIGENTE</span>
          <h1>De una captura CAD<br/>a una historia que <em>vende.</em></h1>
          <p>Transformá cada acoplado en un book visual personalizado, listo para presentar en el contexto real de tu cliente.</p>
          <button className="hero-cta" onClick={() => startBook()}>Crear nuevo book <span>→</span></button>
          <div className="hero-metrics"><div><b>05</b><span>pasos guiados</span></div><div><b>06</b><span>vistas por book</span></div><div><b>03</b><span>productos demo</span></div></div>
        </div>
        <div className="hero-showcase">
          <div className="blueprint-lines" />
          <div className="hero-image"><img src="/products/HO1028.jpg" alt="Tráiler Rubiolo para drones fumigadores"/><div className="image-scan"/><span className="annotation annotation-a"><i>A</i> CARROCERÍA</span><span className="annotation annotation-b"><i>B</i> SISTEMA DE RODADO</span></div>
          <div className="floating-card"><span>BOOK EN PROCESO</span><b>HO1028 · Campo agrícola</b><div><i/><i/><i/><i/><i/><i/></div></div>
          <div className="hero-number">01<span>/ 06</span></div>
        </div>
      </section>
      <section className="recent-section">
        <div className="section-title"><div><span>CATÁLOGO DE PARTIDA</span><h2>Elegí un producto para comenzar</h2></div><p>Modelos precargados para esta demostración conceptual</p></div>
        <div className="recent-grid">{(Object.keys(products) as ProductKey[]).map((key) => { const item = products[key]; return <button key={key} onClick={() => startBook(key)}><div className="recent-image"><img src={item.hero} alt={item.name}/><span>{item.short}</span><i>↗</i></div><div className="recent-copy"><span>{item.code}</span><h3>{item.name}</h3><p>{item.dimensions}<b>·</b>{item.capacity}</p></div></button>})}</div>
      </section>
      <footer className="home-footer"><span>RUBIOLO BOOK STUDIO · PROTOTIPO CONCEPTUAL</span><span>Experiencia interna de ventas</span></footer>
    </main>
  );
}
