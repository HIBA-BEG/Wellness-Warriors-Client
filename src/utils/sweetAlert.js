import Swal from 'sweetalert2';

export const showSuccessAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#2C5F2D',
    timer: 2000,
  });
};

export const showErrorAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#2C5F2D',
  });
};

export const showConfirmDialog = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2C5F2D',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed!',
    cancelButtonText: 'Cancel',
  });
};
