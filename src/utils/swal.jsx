import Swal from "sweetalert2";

export const swal = ({type, message}) => {
    switch (type) {
        case 'success':
            return Swal.fire({
                icon: "success",
                title: "¡Perfecto!",
                text: message,
                confirmButtonText: "Aceptar",
                timer: 5000,
                timerProgressBar: true,
            })
        case 'warning':
            return Swal.fire({
                icon: "warning",
                title: "¡Atención!",
                text: message,
                confirmButtonText: "Aceptar",
                timer: 7000,
                timerProgressBar: true,
            })
        case 'error':
            return Swal.fire({
                icon: "error",
                title: "¡Error!",
                text: message,
                confirmButtonText: "Aceptar",
                timer: 5000,
                timerProgressBar: true,
            })
        default:
            return null;
    }
}