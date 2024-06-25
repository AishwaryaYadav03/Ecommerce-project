import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined | product[]
  productMessage:undefined |string
  icon=faTrash;
  editIcon=faEdit;
  constructor(private product:ProductService){}

  ngOnInit():void{
    this.list()

}

 deleteProduct(id:number){
  console.warn(id);

  this.product.deleteProduct(id).subscribe((result)=>{
    if(result){
      this.productMessage="Product is deleted"
      this.list()

       this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList=result;
      if(result){
        this.productList=result;
      }
      
  })
    }
  })
  setTimeout(() =>{
    this.productMessage=undefined
  },3000);
  
 }

 list(){
  this.product.productList().subscribe((result)=>{
    console.warn(result);
    this.productList=result;
    if(result){
      this.productList=result;
    }
    
})
 }
}
