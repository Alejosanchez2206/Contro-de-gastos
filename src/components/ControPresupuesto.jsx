import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Swal from 'sweetalert2';
import { formatearCantidad } from '../helpers';


export default function ControPresupuesto({
    presupuesto,
    gastos,
    setValidarGastoDisponible,
    setGastos,
    setPresupuesto,
    setIsValidPresupuesto
}) {
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        // Cacular el porcentaje gastado 

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible)
        setValidarGastoDisponible(totalDisponible)
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);

    }, [gastos])


    const hangleReset = () => {
        /* const resultado = confirm('¿Deseas reiniciar tu presupuesto?')
        if(resultado) {
          
        } */
        Swal.fire({
            title: '¿Deseas reiniciar tu presupuesto?',
            icon : 'info',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
            width : '32em'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setGastos([])
                setPresupuesto([])
                setIsValidPresupuesto(false)
            } 
          })
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: '#0e264e',
                        trailColor: '#F5F5F5',
                        textColor: '#0e264e',
                    })}
                    value={porcentaje}
                    text={`${porcentaje} % Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className='reset-app'
                    type='button'
                    onClick={hangleReset}
                >
                    Resetear presupuesto
                </button>
                <p>
                    <span>Presupuesto : </span> {formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span>Disponibles : </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastados : </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}
