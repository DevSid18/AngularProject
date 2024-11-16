import { Injectable, Renderer2, TemplateRef,RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { 
  }

  ToastMessage(
    isToast: boolean = false, message: string, action: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let buttons: boolean = false;
      let position: any = 'top';
      let timer: any = 1500;
      let icon: any;
      let title: any;

      switch (action.toLowerCase()) {
        case 'success':
          icon = 'success';
          title = 'Congrats';
          break;
        case 'error':
          icon = 'error';
          title = 'Oops';
          break;
        // case 'delete':
        //   buttons = true;
        //   position = 'center';
        //   timer = 3000;
        //   title = "Are you sure?";
        //   icon = "warning";
        //   break;
      }
      if (action.toLowerCase() == 'success' || action.toLowerCase() == 'error') {
        const Toast = Swal.mixin({
          toast: isToast,
          position: position,
          showConfirmButton: buttons,
          timer: timer,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: icon,
          title: title,
          text: message
        }).then(() => {
          resolve(true);
        }).catch((error) => {
          reject(error);
        });
      }
      else if (action.toLowerCase() == 'delete') {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            }).then(() => {
              resolve(true);
            }).catch((error) => {
              reject(error);
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error"
            }).then(() => {
              resolve(false);
            }).catch((error) => {
              reject(error);
            });
          }
        });
      }
    })
  }

  ModalOpen(tempRef: TemplateRef<any>) {
    //this.modalService.show(tempRef);
  }

}
