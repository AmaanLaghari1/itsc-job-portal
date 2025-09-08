import Swal from 'sweetalert2';

const Alert = ({ status, text }) => {
    Swal.fire({
        icon: status ? 'success' : 'error', // Correct way to set icon
        title: status ? 'Success!' : 'Error!',
        text: text,
        showConfirmButton: false,
        timer: 3000, // Auto-close after 3 seconds
    });

    return null; // No need to return JSX
};

export default Alert;
