
import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

export default function Modal({
    setModal,
    animarModal,
    setAnimationModal,
    guardarGasto,
    gastoEditar,
    validarGastoDisponible,
    setGastoEditar
}) {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState()
    const [id, setId] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    }, [])

    const handleOcultar = () => {
        setAnimationModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorio')
            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return
        }

        if(cantidad <= 0 ){
            setMensaje(`Cantidad no valido`)
            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return
        }

        if (Object.keys(gastoEditar).length > 0) {
            if (cantidad > (validarGastoDisponible + gastoEditar.cantidad)) {
                setMensaje('Excede tu presupuesto disponible')
                setTimeout(() => {
                    setMensaje('')
                }, 3000)
                return
            }
        } else {
            if (cantidad > validarGastoDisponible) {
                setMensaje('Excede tu presupuesto disponible')
                setTimeout(() => {
                    setMensaje('')
                }, 3000)
                return
            }
        }


        guardarGasto({ nombre, cantidad, categoria, id, fecha })


    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt='Cerrar modal'
                    onClick={handleOcultar}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                <legend>{gastoEditar.id ? 'Editar gasto' : 'Nuevo gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="Cantidad">Cantidad</label>
                    <input
                        id="Cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value=''>Selecionar</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='gastos'>Gastos varios</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='casa'>Casa</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>
                </div>

                <input
                    type='submit'
                    value={gastoEditar.id ? 'Guardar cambios' : 'Añadir gasto'}
                />


            </form>
        </div>
    )
}
