import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-commonview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commonview.component.html',
  styleUrl: './commonview.component.css'
})
export class CommonviewComponent {

  @ViewChild('dynamicTemplate') tempRef!: TemplateRef<any>;
  @Input() modalRef?: BsModalRef;
  product: any;

  constructor(private modalService: BsModalService) { }
  ngOnInit() {
    this.product = {
      name: 'Product A',
      description: 'This is a great product.',
      price: 99.99,
      stock: 20,
      category: 'Electronics'
    };
  }
  saveProductChanges() {
    // Logic to save the changes (e.g., API call)
    console.log('Product changes saved');
  }

}
