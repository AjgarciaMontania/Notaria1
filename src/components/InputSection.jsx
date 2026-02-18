// src/components/InputSection.jsx
import { useState } from "react";
import { formatNumberWithPoints, parseNumberWithoutPoints } from "../utils/formatters";

export default function InputSection({ onIngresar, onCalcular, onLimpiar, onExportar, calcularDisabled }) {
  const [compraventa, setCompraventa] = useState("");
  const [certificado, setCertificado] = useState("");
  const [hipoteca, setHipoteca] = useState("");
  const [saber, setSaber] = useState("");
  const [igac, setIgac] = useState("");

  // ==================== NUEVOS ACTOS ====================
  const [donacion, setDonacion] = useState("");
  const [permuta, setPermuta] = useState("");
  const [sucesion, setSucesion] = useState("");
  const [sinCuantia, setSinCuantia] = useState("");

  const [dineroEnviado, setDineroEnviado] = useState("");

  const handleDineroChange = (e) => {
    let val = e.target.value.replace(/[^\d]/g, "");
    setDineroEnviado(formatNumberWithPoints(val));
  };

  const handleIngresar = () => {
    onIngresar({
      compraventa: parseInt(compraventa) || 0,
      certificado: parseInt(certificado) || 0,
      hipoteca: parseInt(hipoteca) || 0,
      saber: parseInt(saber) || 0,
      igac: parseInt(igac) || 0,
      donacion: parseInt(donacion) || 0,
      permuta: parseInt(permuta) || 0,
      sucesion: parseInt(sucesion) || 0,
      sinCuantia: parseInt(sinCuantia) || 0,
    });
  };

  return (
    <div className="input-card">
      <div className="inputs-container">
        {/* Fila 1 */}
        <div className="input-row three-columns">
          <div className="input-group"><label>Compraventa:</label><input type="number" placeholder="Cantidad" value={compraventa} onChange={(e) => setCompraventa(e.target.value)} min="0" /></div>
          <div className="input-group"><label>Certificado Cancelación Hipoteca:</label><input type="number" placeholder="Cantidad" value={certificado} onChange={(e) => setCertificado(e.target.value)} min="0" /></div>
          <div className="input-group"><label>Hipoteca con Banco Agrario:</label><input type="number" placeholder="Cantidad" value={hipoteca} onChange={(e) => setHipoteca(e.target.value)} min="0" /></div>
        </div>

        {/* Fila 2 */}
        <div className="input-row two-columns">
          <div className="input-group"><label>Escritura para Saber:</label><input type="number" placeholder="Cantidad" value={saber} onChange={(e) => setSaber(e.target.value)} min="0" /></div>
          <div className="input-group"><label>Trámite IGAC:</label><input type="number" placeholder="Cantidad" value={igac} onChange={(e) => setIgac(e.target.value)} min="0" /></div>
        </div>

        {/* Fila 3 - Nuevos actos */}
       {/* <div className="input-row three-columns">
          <div className="input-group"><label>Donación:</label><input type="number" placeholder="Cantidad" value={donacion} onChange={(e) => setDonacion(e.target.value)} min="0" /></div>
          <div className="input-group"><label>Permuta:</label><input type="number" placeholder="Cantidad" value={permuta} onChange={(e) => setPermuta(e.target.value)} min="0" /></div>
          <div className="input-group"><label>Sucesión:</label><input type="number" placeholder="Cantidad" value={sucesion} onChange={(e) => setSucesion(e.target.value)} min="0" /></div>
        </div>
*/}
       

        {/* Fila 4 - Acto sin cuantía */}

        {/*  <div className="input-row two-columns">
          <div className="input-group"><label>Acto sin cuantía (poder, PH, etc.):</label><input type="number" placeholder="Cantidad" value={sinCuantia} onChange={(e) => setSinCuantia(e.target.value)} min="0" /></div>
        </div> */}
  
        {/* DINERO ENVIADO */}
        <div className="dinero-group">
          <label>DINERO ENVIADO:</label>
          <input type="text" placeholder="Ingrese el monto enviado" value={dineroEnviado} onChange={handleDineroChange} />
        </div>
      </div>

      <div className="button-row">
        <button className="ingresar" onClick={handleIngresar}>Ingresar</button>
        <button className="calcular" onClick={() => onCalcular(dineroEnviado)} disabled={calcularDisabled}>Calcular</button>
        <button className="limpiar" onClick={onLimpiar}>Limpiar</button>
        <button className="exportar" onClick={onExportar}>Exportar Excel</button>
      </div>
    </div>
  );
}