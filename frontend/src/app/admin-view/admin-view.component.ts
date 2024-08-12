import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})

export class AdminViewComponent {
    items:any = [];
    columns: any[] = [];
    editIndex: number | null = null;
    editItem: any = {};


   constructor(private router: Router,
        private apiservice: ApiService,
        private http : HttpClient){
        this.getItems(); //calling the function to access the item list api
    }
   
    backtohome(event:any){
      this.router.navigate(['/home'])
    }

    getItems(){
      this.apiservice.getItemList().subscribe((response: any)=>{
        this.items = response
        // console.log(this.items,'response');
         if (this.items.length > 0) {
          this.columns = Object.keys(this.items[0]);
        }
      })
    }

    onUpdate(item: any, index: number): void {
      this.editIndex = index;
      this.editItem = { ...item };
    }

    onEdit(item: any, index: number) {
      this.editIndex = index;
      this.editItem = { ...item };
    }

    onSave(index: number): void {
      const updatedItem = { ...this.editItem };
      const itemId = this.items[index].id; 
      this.items[index] = updatedItem;
      this.editIndex = null;

      this.apiservice.updateItem(itemId,updatedItem).subscribe(response => {
        // console.log('Item updated successfully:', response);
        if(response){
          Swal.fire({
            title: "Item updated successfully!",
            icon: "success",
            timer: 2000
          });
        }
      }, error => {
        console.error('Error updating item:', error);
      });
    }

  onDelete(id: number): void {
    this.apiservice.deleteItem(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Item deleted successfully!',
          icon: 'success',
          timer: 2000
        }).then(() => {
          this.getItems();});
      }
    })
  }

    // redirect to another component
    AddNewItem(event:any){
      this.router.navigate(['/add-item']);
    }




//   {
//     "id": 9,
//     "name": "hhhhhh",
//     "description": "This is a pearl jewellery",
//     "price": "19.99",
//     "quantity": 10,
//     "create_time": "2024-08-11T19:12:13.728518Z",
//     "update_time": "2024-08-11T19:12:13.728518Z"
// }
}
