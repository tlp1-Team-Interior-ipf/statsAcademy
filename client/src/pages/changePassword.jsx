import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const navigate = useNavigate();

  const cambiarContrasenia = async (event) => {

    event.preventDefault();

    const token = new URLSearchParams(window.location.search).get("token");

    if (pass !== confirmPass) {
        swal({
          title: "Error",
          text: "Las contraseñas no coinciden",
          icon: "error",
          timer: 2000,
          buttons: false,
        });
        return;
      }

    if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(pass)) {
    swal({
        title: "Error",
        text: "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula y un número",
        icon: "error",
        timer: 2000,
        buttons: false,
    });
    return;
    }

    try {
      const response = await fetch(`http://localhost:3000/recuperacion/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: pass }),
      });

      const data = await response.json();
      console.log("datos de envio: ", data) 

      if (response.status === 200) {
        swal({
            title: "¡Contraseña actualizada!",
            text: "Puedes iniciar sesión con tu nueva contraseña.",
            icon: "success",
            timer: 2000,
            buttons: false,
        });
        navigate('/login');
      } else {
        swal({
            title: "Error",
            text: data.message || "No fue posible actualizar la contraseña.",
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

                <h3 style={{textAlign: 'center'}}>Escriba su nueva contraseñas</h3>
                
                <form style={{display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'relative', top: '50px'}}>
                    <input 
                        type="password" 
                        value={pass} 
                        onChange={e => setPass(e.target.value)} 
                        className="form-control form-control-lg" 
                        placeholder="Ingrese su nueva contraseña" /> <hr />
                    <input 
                        type="password" 
                        value={confirmPass}
                        className="form-control form-control-lg" 
                        onChange={e => setConfirmPass(e.target.value)}
                        placeholder="Repita su nueva contraseña" /> <hr />
                    <button 
                        onClick={cambiarContrasenia} 
                        className="btn btn-success"
                        style={{borderRadius: 5, padding: 10, width: '600px', position: 'relative', top: '-20px'}}>Cambiar
                    </button>  
                </form>  

            </div>          
        </>
    )
}