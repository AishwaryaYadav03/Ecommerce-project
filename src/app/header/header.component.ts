import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { json } from 'node:stream/consumers';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   menuType:String="default"
   sellerName:string=''
   searchResult:undefined |product[]
   userName:string="";
   cartItem=0;
   
  constructor(private route:Router ,private product:ProductService){}

  ngOnInit():void{
   
    this.route.events.subscribe((val:any)=>{
     if(val.url){
      console.warn(val.url);
      
      if(localStorage.getItem('seller') && val.url.includes('seller')){
        console.warn("is seller area");
        this.menuType='seller'
        if(localStorage.getItem('seller')){
          let sellerStore=localStorage.getItem('seller');
          let sellerData=sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
        }
        

      } else if(localStorage.getItem('user')){
        let userStore=localStorage.getItem('user');
        let userData=userStore && JSON.parse(userStore);
        this.userName=userData.name;
        this.menuType='user';
      }else{
        console.warn("outside seller");
        this.menuType='default'
        
      }
     }
      
    })

    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItem=JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItem=items.length
    })
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }


  searchProduct(query:KeyboardEvent){
    if(query){
      const element=query.target as HTMLInputElement;
      
      this.product.searchProducts(element.value).subscribe((result)=>{
        
        if(result.length>5){
          result.length=5
        }
      
        this.searchResult=result;
      })
      
    }
    
  }
  hideSearch(){
    this.searchResult=undefined
  }
  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id]);
  }
  submitSearch(val:string){
   
    this.route.navigate([`search/${val}`])
    
  }
}
