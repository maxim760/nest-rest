import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  HttpStatus,
  Post,
  Put,
  Delete,
  Body,
  Redirect,
  HttpCode,
  Header,
} from '@nestjs/common';

import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productModelService } from './products.service';
import { Product } from './schemas/product.schema';


@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: productModelService) {
    
  }
  

  // @Redirect("https://google.com", 301)
  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll()
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productsService.getById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header("Cache-control", "none")
  create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.create(product)
  }

  @Delete(":id")
  remove(@Param("id") id:string): Promise<Product> {
    return this.productsService.remove(id)
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() product: UpdateProductDto, @Res() res:Response): Promise<Product> {
    return this.productsService.update(id, product)
  }


}
