import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const Password = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

  const enviarCorreo = async (event) => {

    swal({
        title: "Enviando...",
        text: "Espere un momento por favor.",
        icon: "info",
        timer: 2000,
        buttons: false,
      });

    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/recuperacion/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("datos de envio: ", data) 

      if (response.status === 200) {
        swal({
            title: "¡Correo enviado!",
            text: "Serás redirigido a la página de inicio.",
            icon: "success",
            timer: 3000,
            buttons: false,
          });
          setEmail('');
          navigate('/login');
      } else {

        swal({
            title: "Error",
            text: "No fue posible enviar el correo",
            icon: "error",
            timer: 2000,
            buttons: false,
          });

      }
    } catch (error) {
        swal({
            title: "Error",
            text: "Error al intentar contactar con el servidor",
            icon: "error",
            timer: 2000,
            buttons: false,
          });
    }
  };
    
    return(
        <>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative', top: '200px'}}>

                <h3 style={{textAlign: 'center'}}>Enviaremos un enlace a tu correo electrónico para que cambies tu contraseña</h3>
                
                <form style={{display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative', top: '50px'}}>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="form-control form-control-lg" 
                        placeholder="Ingrese su correo" /> <hr />
                    <button 
                        className="btn btn-success"
                        onClick={enviarCorreo} 
                        style={{borderRadius: 5, padding: 10, width: '600px', position: 'relative', top: '-20px'}}>Enviar
                    </button>  
                </form>  

            </div>          
        </>
    )
}