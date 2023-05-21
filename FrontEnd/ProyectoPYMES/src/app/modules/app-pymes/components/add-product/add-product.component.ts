import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/Product';
import { UploadFileService } from 'src/app/shared/services/UploadFileService';
import { Global } from 'src/app/shared/constants/Global';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  public title: string;
  public product: Product;
  public status: string;
  public filesToUpload: Array<File>;
  public savedProduct: Product;
  public url = Global.url;
  public selecionado?: any;
  constructor(
    private _productService: ProductService,
    private _UploadFileService: UploadFileService
  ) {
    this.title = 'Crear Producto';
    this.product = new Product(
      '',
      '',
      '',
      0,
      '',
      0,
      true,
      new Date(),
      new Date(),
      ''
    );
    this.status = '';
    this.filesToUpload = new Array<File>();
    this.savedProduct = new Product(
      '',
      '',
      '',
      0,
      '',
      0,
      true,
      new Date(),
      new Date(),
      ''
    );
  }
  ngOnInit(): void {}
  onSubmit(productForm: any) {
    this._productService.registerProduct(this.product).subscribe((response) => {
      if (response) {
        //Subir la imagen
        if (this.filesToUpload.length >= 1) {
          this._UploadFileService
            .makeFileRequest(
              `${Global.url}UploadImagen/${response.PRODUCT._id}`,
              [],
              this.filesToUpload,
              'image'
            )
            .then((result: any) => {
              this.savedProduct = result.productUpdated;
            });
        }
        this.status = 'Success';
      } else {
        this.status = 'Failed';
      }
      productForm.reset();
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
