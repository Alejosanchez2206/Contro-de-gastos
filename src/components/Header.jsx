import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControPresupuesto"
export default function header({
  gastos,
  presupuesto,
  setGastos,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  setValidarGastoDisponible

}) {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidPresupuesto ? (
        <ControlPresupuesto
          gastos={gastos}
          presupuesto={presupuesto}
          setPresupuesto = {setPresupuesto}
          setGastos = {setGastos}
          setValidarGastoDisponible = {setValidarGastoDisponible}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}

    </header>
  )
}
