import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNevoGastos from './img/nuevo-gasto.svg'

function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimationModal] = useState(false)
  const [validarGastoDisponible, setValidarGastoDisponible] = useState(0)
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados , setGastosFiltrados] = useState([])


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])


  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])


  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0
    if (presupuestoLs > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimationModal(true)
    }, 500)
  }


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimationModal(true)
      }, 500)
    }
  }, [gastoEditar])

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //actualizar
      const gastosActualizar = gastos.map(gastosState => gastosState.id === gasto.id ? gasto : gastosState)
      setGastos(gastosActualizar)
    } else {
      //Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }


    setAnimationModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const eliminarGastos = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setGastos = {setGastos}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setValidarGastoDisponible={setValidarGastoDisponible}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGastos={eliminarGastos}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNevoGastos}
              alt='Icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && <Modal
        gastoEditar={gastoEditar}
        setModal={setModal}
        animarModal={animarModal}
        setAnimationModal={setAnimationModal}
        guardarGasto={guardarGasto}
        validarGastoDisponible={validarGastoDisponible}
        setGastoEditar={setGastoEditar}
      />}

    </div>
  )
}

export default App
