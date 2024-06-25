import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addproductMessage:string|undefined;
  constructor(private product:ProductService){}
  
  submit(data:product){  
    this.product.addProduct(data).subscribe((result)=>{
      if(result){
        this.addproductMessage="product is successfully added"
      }
      setTimeout(()=>this.addproductMessage=undefined,3000);
    });

    
  }

}
