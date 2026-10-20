import Boton from '../../atoms/Boton/index.js';
import Dialogo from '../Dialogo/index.js';

const DialogoVictoria = ({ resultado, onRevisar, onMenu }) => (
  <Dialogo
    onCerrar={onRevisar}
    titulo={resultado.titulo}
    variante={resultado.tipo === 'victoria' ? 'victoria' : 'rendicion'}
  >
    <p className="dialogo-mensaje">{resultado.mensaje}</p>
    <div className="dialogo-acciones">
      <Boton className="dialogo-boton" onClick={onRevisar}>
        Revisar partida
      </Boton>
      <Boton className="dialogo-boton" onClick={onMenu}>
        Menú principal
      </Boton>
    </div>
    <p className="dialogo-id">ID de partida: {resultado.idPartida ?? 'No disponible'}</p>
  </Dialogo>
);

export default DialogoVictoria;
