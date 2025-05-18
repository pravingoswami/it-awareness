import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function showAlert({
  title,
  text,
  icon = 'success',
  confirmButtonText = 'OK',
  theme = 'light',
}: {
  title: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText?: string;
  theme?: 'light' | 'dark';
}) {
  MySwal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    background: theme === 'dark' ? '#181c24' : '#fff',
    color: theme === 'dark' ? '#fff' : '#1B254B',
    customClass: {
      popup: theme === 'dark' ? 'swal2-dark' : '',
      confirmButton: theme === 'dark' ? 'swal2-confirm-dark' : '',
    },
  });
}
