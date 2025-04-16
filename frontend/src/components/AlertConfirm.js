import Swal from 'sweetalert2';

const AlertConfirm = async ({ title = 'Are you sure?', text = 'You won\'t be able to revert this!' }) => {
    const result = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!',
        cancelButtonText: 'Cancel',
    });

    return result.isConfirmed;
};

export default AlertConfirm;
