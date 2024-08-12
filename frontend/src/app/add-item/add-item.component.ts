import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
   
  itemForm: FormGroup;

  constructor ( private router: Router,
     private fb: FormBuilder,
     private apiservice: ApiService)
     {
      this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      created_time: ['', Validators.required],
    });
  }


  onSubmit(): void {
    if (this.itemForm.valid) {
      this.apiservice.addItem(this.itemForm.value).subscribe(response => {
        //console.log('Item added successfully', response);
        if(response){
          swal.fire({
            title: 'Item Added Successfully!',
            icon: 'success',
            timer:4000
          })
        }
        // redirect to list page
        this.router.navigate(['/admin'])
      },
      error => {
        console.error('Error adding item', error);
      }
    );}
    else {
      this.itemForm.markAllAsTouched();  
      swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        timer: 4000
      });
    }
  }

  backToAdmin(event:any){
    this.router.navigate(['/admin'])
  }
}
