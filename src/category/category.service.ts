import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: {
          name: dto.name,
          description: dto.description,
          parent_id: dto.parent_id ? Number(dto.parent_id) : null,
          icon: dto.icon,
        },
        include: { parent: true, children: true },
      });
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new BadRequestException('Invalid parent_id (category not found)');
      }
      console.error('❌ Create Category Error:', error);
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany({
        include: { parent: true, children: true },
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      console.error('❌ FindAll Category Error:', error);
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: { parent: true, children: true },
      });
      if (!category) throw new NotFoundException('Category not found');
      return category;
    } catch (error) {
      console.error('❌ FindOne Category Error:', error);
      throw new InternalServerErrorException('Failed to fetch category');
    }
  }

  async update(id: number, dto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.description && { description: dto.description }),
          ...(dto.parent_id && { parent_id: Number(dto.parent_id) }),
          ...(dto.icon && { icon: dto.icon }),
        },
        include: { parent: true, children: true },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Category not found');
      }
      console.error('❌ Update Category Error:', error);
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Category not found');
      }
      console.error('❌ Delete Category Error:', error);
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
