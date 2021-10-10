import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
// import { alert } from '../utils/Constants'

const swal = withReactContent(Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-secondary text-white btn-rounded rounded shadow-sm px-4 py-1 mr-2',
        cancelButton: 'btn btn-dark btn-rounded rounded shadow-sm px-4 py-1',

    },
    buttonsStyling: false
}))

const dialog = {

    showSuccessToast(title = "Save.", timer = 1500, onClose = () => {
    }) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title,
            onClose
        })
    },

    showDialogConfirm({
        message = "",
        onClose = () => {
        },
        onConfirm = () => {
        },
        cancelButtonText = "NO",
        confirmButtonText = "YES",
        title,
    }) {
        swal.fire({
            icon: 'question',
            title,
            text: message,
            onClose,
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText,
            preConfirm: onConfirm,
            showLoaderOnConfirm: true,
            allowOutsideClick: false
        })
    },

    showDialogFail({
        message = "",
        onClose = () => {
        },
        showConfirmButton = true,
        confirmButtonText = "OK",
        title
    }) {
        swal.fire({
            icon: 'error',
            title,
            text: message,
            onClose,
            confirmButtonText,
            showConfirmButton,
            timer: showConfirmButton ? undefined : 1500,
            allowOutsideClick: showConfirmButton ? false : true
        })
    },

    showDialogWarning({
        message = "",
        onClose = () => {
        },
        showConfirmButton = true,
        confirmButtonText = "OK",
        title,
    }) {
        swal.fire({
            icon: 'warning',
            title,
            text: message,
            onClose,
            confirmButtonText,
            showConfirmButton,
            timer: showConfirmButton ? undefined : 1500,
            allowOutsideClick: showConfirmButton ? false : true
        })
    },

    showDialogInfo({
        message = "",
        onClose = () => {
        },
        showConfirmButton = true,
        confirmButtonText = "OK",
        title,
    }) {
        swal.fire({
            icon: 'info',
            title,
            text: message,
            onClose,
            confirmButtonText,
            showConfirmButton,
            timer: showConfirmButton ? undefined : 1500,
            allowOutsideClick: showConfirmButton ? false : true
        })
    },

    showDialogSuccess({
        message = "",
        onClose = () => {
        },
        showConfirmButton = true,
        confirmButtonText = "OK",
        title,
    }) {
        swal.fire({
            icon: 'success',
            title,
            text: message,
            onClose,
            confirmButtonText,
            showConfirmButton,
            timer: showConfirmButton ? undefined : 2000,
            allowOutsideClick: showConfirmButton ? false : true
        })
    },

    showDialogAddCartSuccess({
        message = "",
        onClose = () => {
        },
        showConfirmButton = true,
        confirmButtonText = "OK",
        title,
    }) {
        swal.fire({
            html: <div className="d-flex flex-column align-items-center justify-content-center">
                <lottie-player src="/static/animates/add-cart.json" background="transparent" speed="1" style={{ width: 150, height: 150 }} loop autoplay ></lottie-player>
                <div className="text-center mt-1 mb-3 text-16">{message}</div>
            </div>,
            title,
            text: message,
            onClose,
            confirmButtonText,
            showConfirmButton,
            timer: showConfirmButton ? undefined : 2000,
            allowOutsideClick: showConfirmButton ? false : true
        })
    },
    showDialogLoginRequire({
        message = "",
        onClose = () => {
        },
        onConfirm = () => {
        },
        cancelButtonText = "NO",
        confirmButtonText = "YES",
        title,
    }) {
        swal.fire({
            html: <div className="d-flex flex-column align-items-center justify-content-center">
                <lottie-player src="/static/animates/password-wrong.json" background="transparent" speed="1" style={{ width: 150, height: 150 }} loop autoplay ></lottie-player>
                <div className="text-center mt-1 mb-3 text-16">{message}</div>
            </div>,
            title,
            text: message,
            onClose,
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText,
            preConfirm: onConfirm,
            showLoaderOnConfirm: true,
            allowOutsideClick: true
        })
    },
    showModal({
        html = <div></div>,
        title = "",
        onClose = () => {
        },
        onConfirm = () => {
        },
        cancelButtonText = "Cancel",
        confirmButtonText = "OK",
        width

    }) {
        swal.fire({
            html,
            title,
            onClose,
            preConfirm: onConfirm,
            confirmButtonText,
            cancelButtonText,
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-danger mr-2',
                cancelButton: 'btn btn-dark',
                popup: 'swal-wide',
            },
            width
        })
    },

    showOriginalModal({
        html = <div></div>,
        title = "",
        onClose = () => {
        },
        onConfirm = () => {
        },
        cancelButtonText = "Cancel",
        confirmButtonText = "OK",
        showCancelButton = true,
        showConfirmButton = true
    }) {
        swal.fire({
            html,
            title,
            onClose,
            preConfirm: onConfirm,
            confirmButtonText,
            cancelButtonText,
            showCancelButton,
            showConfirmButton
        })
    },

    close() {
        swal.close()
    },

    showTextInput({
        title = "",
        cancelButtonText = "Cancel",
        confirmButtonText = "Add",
        defaultText = "",
        message = ""
    }) {
        return swal.fire({
            title,
            inputValue: defaultText,
            confirmButtonText,
            cancelButtonText,
            showCancelButton: true,
            input: 'text',
            text: message
        })
    },

    showLoading(title = "กำลังบันทึก", description = "") {

        return swal.fire({
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            html: <div className="mt-3 mb-3"><BeatLoader size={15} color={'#da5230'} /> <div className="text-12 text-center">{description}</div></div>,
            title,
        })
    },

    textInput({
        title = "", onConfirm = () => {
        }, onClose = () => {
        }
    }) {
        return swal.fire({
            title,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            preConfirm: onConfirm,
            onClose
        })
    },

    ajax({
        title = "", onConfirm = () => {
        }, inputType = "text", message = ""
    }) {
        return swal.fire({
            title,
            text: message,
            input: inputType,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            showLoaderOnConfirm: true,
            confirmButtonText: 'Submit',
            preConfirm: (text) => onConfirm(text),
            allowOutsideClick: false
        })
    }
}

export { dialog }