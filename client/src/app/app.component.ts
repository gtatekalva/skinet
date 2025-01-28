import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
 
  baseURL = "https://localhost:5001/api/"
  private http = inject(HttpClient);
  title = 'Skinet';
  products: Product[] = [];

  //this.products = response.data ,

  ngOnInit(): void {
    this.http.get<any>(this.baseURL + 'products').subscribe({
      next: response =>   {
        console.log('Full Response:', response.value.data);
        this.products = response.value.data; // Extract the product array
      },
      error: err => console.error('Error fetching products:', err),
      complete: () => console.log('Products fetched successfully')
    });
  }
  
}
