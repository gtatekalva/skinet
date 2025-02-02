import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import {MatCard} from '@angular/material/card';
import { Pagination } from '../../shared/models/pagination';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from "@angular/material/dialog";
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/ShopParams';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard,
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient);
  private shopSerice = inject(ShopService);
  title = 'Skinet';
  products?: Pagination<Product>;
  pagination!: Pagination<Product>;
  pageSizeOptions = [5,10,15,20];

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low-High', value: 'priceAsc'},
    {name: 'Price: High-Low', value: 'priceDesc'},
  ]

  shopParams = new ShopParams();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop(){    
    this.getProducts();
  }

  getProducts(){
    this.shopSerice.getProducts(this.shopParams
    ).subscribe({
      next: response => { 
          this.pagination = response.value;
          this.products = response.value;
          console.log(response);
        },
      error: error => console.log(error)
    })
  }

  onSearchChange(){
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  handlePageEvent(event: PageEvent){
    this.shopParams.pageNumber = event.pageIndex+1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

  onSortChange(event: MatSelectionListChange){
    const selectedOption = event.options[0];
    if(selectedOption){
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }
  }


  openFiltersDialog(){
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      disableClose: true,  
      autoFocus: true,   
      minWidth :'500px',
      data : {
        selectBrands : this.shopParams.brands, 
        selectTypes : this.shopParams.types, 
      }
    });

    dialogRef.afterClosed().subscribe({
      next : results =>{
        if(results)
        {
          console.log(results);
          this.shopParams.brands = results.selectBrands;
          this.shopParams.types = results.selectTypes;
          this.shopParams.pageNumber = 1;

          // this.shopSerice.getProducts( this.selectBrands, this.selectTypes).subscribe({
          //   next: response => { 
          //       this.pagination = response.value;
          //       this.products = response.value.data;
          //      // console.log(response);
          //     },
          //   error: error => console.log(error)
          // })

          this.getProducts();
        }
      }
    });
  }





}
