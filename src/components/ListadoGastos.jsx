import Gastos from "./Gastos"

export default function ListadoGastos({
  gastos,
  setGastoEditar,
  eliminarGastos,
  gastosFiltrados,
  filtro
}) {
  return (
    <div className="listado-gastos  contenedor">

      {
        filtro ? (
          <>
           <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos'}</h2>
            {gastosFiltrados.map(gasto => (
              <Gastos
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGastos={eliminarGastos}
              />
            ))}
          </>

        ) : (
          <>
            <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>
            {gastos.map(gasto => (
              <Gastos
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGastos={eliminarGastos}
              />
            ))}
          </>

        )
      }


    </div>
  )
}
