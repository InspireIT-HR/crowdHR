import { toast } from "react-toastify";
import swal from "sweetalert";

export const showError = (errorMessage) => {
  swal({
    title: 'Error',
    text: errorMessage,
    icon: 'error'
  })
  // toast.error(errorMessage, {
  //   position: 'top-right',
  //   autoClose: 5000,
  //   hideProgressBar: true,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: false,
  //   progress: undefined,
  // });
}