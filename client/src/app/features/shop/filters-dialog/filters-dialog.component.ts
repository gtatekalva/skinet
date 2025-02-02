import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatDivider } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [
    MatDivider,
    MatListOption,
    MatSelectionList,
    MatButton,
    FormsModule
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent implements OnInit {
  //shopService = Inject(ShopService);
  baseUrl = 'https://localhost:5001/api/'
  //private http = Inject(HttpClient);
  types: string[] = [];
  brands: string[] = [];

  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  selectBrands: string[] = this.data.selectBrands;
  selectTypes: string[] = this.data.selectTypes;

  constructor(private http: HttpClient ) { }

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.http.get(this.baseUrl + 'products/brands').subscribe({
      next: (res: any) => {
          this.brands = res;
      }
    });

    this.http.get(this.baseUrl + 'products/types').subscribe({
      next: (res: any) => {
          this.types = res;
      }
    });
  }

  applyFilter(){
    this.dialogRef.close({
      
      selectBrands : this.selectBrands,
      selectTypes: this.selectTypes 
    });
  }
}

