import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class productModelService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    
  }

  async getAll(): Promise<Product[]> {
    return await this.productModel.find({}).exec()
  }

  async getById(id: string): Promise<Product> {
    return await this.productModel.findById(id)
  }

  async create(product: CreateProductDto): Promise<Product> {
    
    const prod = await this.productModel.create(product)
    return prod

  }
  async remove(id: string): Promise<Product> {
    
    return await this.productModel.findByIdAndRemove(id)

  }
  async update(id:string,product: UpdateProductDto): Promise<Product> {
    
    return await this.productModel.findByIdAndUpdate(id,product,{new:true})

  }


}





