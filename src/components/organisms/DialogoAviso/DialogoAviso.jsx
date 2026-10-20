import Boton from '../../atoms/Boton/index.js';
import Dialogo from '../Dialogo/index.js';

const DialogoAviso = ({ titulo, mensaje, acciones, onCerrar }) => (
  <Dialogo onCerrar={onCerrar} titulo={titulo} variante="rendicion">
    {mensaje && <p className="dialogo-mensaje">{mensaje}</p>}
    <div className="dialogo-acciones">
      {acciones.map(({ etiqueta, onClick }) => (
        <Boton className="dialogo-boton" key={etiqueta} onClick={onClick}>
          {etiqueta}
        </Boton>
      ))}
    </div>
  </Dialogo>
);

export default DialogoAviso;
