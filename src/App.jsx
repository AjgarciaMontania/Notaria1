// src/App.jsx
import { useState, useRef } from "react";
import InputSection from "./components/InputSection";
import ResultTable from "./components/ResultTable";

import icontecLogo from './assets/icontec-iso9001.png';
import iqnetLogo from './assets/iqnet.png';
import ucncLogo from './assets/ucnc.jpg';
import uinLogo from './assets/uin.png';
import officePhoto from './assets/office-photo.jpg';

import "./index.css";

function App() {
  const [rows, setRows] = useState([]);
  const [hasInserted, setHasInserted] = useState(false);

  const resultRef = useRef();

  const handleIngresar = (counts) => {
    setRows([]); 
    setHasInserted(true);

    const add = (acto, count) => {
      for (let i = 0; i < count; i++) {
        setRows((prev) => [
          ...prev,
          {
            acto,
            numeroEscritura: '',
            fechaEscritura: '2026-02-16',
            foliosAdicionales: 0,
            valorActo: '',
            tributaria: null,
            orip: null,
            total: null,
          },
        ]);
      }
    };

    add("COMPRAVENTA", counts.compraventa);
    add("CERTIFICADO CANCELACIÓN HIPOTECA", counts.certificado);
    add("HIPOTECA CON BANCO AGRARIO", counts.hipoteca);
    add("ESCRITURA PARA SABER", counts.saber);
    add("TRAMITE IGAC", counts.igac);
    add("DONACIÓN", counts.donacion);
    add("PERMUTA", counts.permuta);
    add("SUCESIÓN", counts.sucesion);
    add("ACTO SIN CUANTÍA", counts.sinCuantia);
  };

  const handleCalcular = (dineroStr) => {
    if (!hasInserted) {
      alert("Primero debe hacer clic en 'Ingresar' antes de calcular.");
      return;
    }
    resultRef.current?.calcularTodo(dineroStr);
  };

  const handleLimpiar = () => {
    setRows([]);
    setHasInserted(false);
  };

  const handleExportar = () => {
    if (!hasInserted || rows.length === 0) {
      alert("Primero ingrese datos y calcule.");
      return;
    }
    resultRef.current?.exportToExcel();
  };

  return (
    <div>
      <header>
        <img src={ucncLogo} alt="Unión Colegiada del Notariado Colombiano" className="logo" />
        <h2>NOTARÍA ÚNICA DE CARTAGENA DEL CHAIRA</h2>
        <img src={officePhoto} alt="Foto de la Notaría" className="office-photo" />
      </header>

      <h1>LIQUIDACIÓN NOTARIAL</h1>

      <InputSection
        onIngresar={handleIngresar}
        onCalcular={handleCalcular}
        onLimpiar={handleLimpiar}
        onExportar={handleExportar}
        calcularDisabled={!hasInserted}
      />

      <ResultTable
        ref={resultRef}
        rows={rows}
        setRows={setRows}
        calcularDisabled={!hasInserted}
      />

      {/* ==================== SECCIÓN INFERIOR (mapa + datos) ==================== */}
      <div id="notaria-info">
        <h2>Nuestra Ubicación</h2>
        
        <iframe
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "8px", marginBottom: "2rem" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d-74.844!3d1.335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjAnMDYuMCJOIDc0wrA1MCczNC44Ilc!5e0!3m2!1ses!2sco!4v1700000000000"
        ></iframe>

        <div className="info-grid">
          <div className="contacto">
            <h3>Contacto</h3>
            <p><strong>Dirección:</strong> Cl. 5 # 8-5, Cartagena Del Chairá, Caquetá</p>
            <p><strong>Teléfono:</strong> (322) 582 5736</p>
            <p><strong>Email:</strong> unicartagenadelchaira@supernotariado.gov.co</p>
          </div>

          <div className="horario">
            <h3>Horario de Atención</h3>
            <p>Lunes a Viernes: 8:00 a.m. – 12:00 m y 2:00 p.m. a 6:00 p.m.</p>
            <p>Sábado: Cerrado</p>
            <p>Domingo: Cerrado</p>
          </div>
        </div>

        <div className="certificados">
          <p>Miembro de la UINL</p>
          <img src={uinLogo} alt="UINL" style={{ height: "70px" }} />

          <p style={{ marginTop: "1.5rem" }}>Certificado por:</p>
          <img src={icontecLogo} alt="Icontec" style={{ height: "60px", marginRight: "20px" }} />
          <img src={iqnetLogo} alt="IQNet" style={{ height: "60px" }} />
        </div>
      </div>
    </div>
  );
}

export default App;