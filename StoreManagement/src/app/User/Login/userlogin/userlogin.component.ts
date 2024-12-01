import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginModel } from '../../../StoreEntity/LoginModel';
import { AuthenticationService } from '../../../CommonServices/authentication.service';
import { CommonService } from '../../../CommonServices/common.service';

@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent {
  UserLoginForm!: FormGroup;
  isResetPass: boolean = false;;

  constructor(private formBuilder: FormBuilder, private authServ: AuthenticationService, private comServ: CommonService) {
    this.UserLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confpass: ['', Validators.required]
    })
  }

  ProcessToLogin(btnAction: any) {
    const loginInfo: LoginModel = {
      username: this.UserLoginForm.get('username')?.value,
      password: this.UserLoginForm.get('password')?.value,
      confPass: this.UserLoginForm.get('confpass')?.value,
      action: btnAction
    }
    this.authServ.ProcessToLogin(loginInfo).subscribe({
      next: (authResult) => {
        if (authResult.toUpperCase() == 'ISLOGIN') {
          this.comServ.ToastMessage(true, "Please reset your password.", 'SUCCESS', 'Change your password').then(() => {
            this.isResetPass = true;
          }).catch((error) => {
            alert(error);
          });
        }
        else if (authResult.toUpperCase() == 'ISRESPASS') {
          this.comServ.ToastMessage(true, "Your password is reset successfully..!", 'SUCCESS', 'PASSWORD CHANGED').then(() => {
            this.isResetPass = true;
          }).catch((error) => {
            alert(error);
          });
        }
        else {
          this.comServ.ToastMessage(true, "To proceed, please create an account by signing up.", 'ERROR', 'Account Not Found').then(() => {
          }).catch((error) => {
            alert(error);
          });
        }
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });

  }
}
