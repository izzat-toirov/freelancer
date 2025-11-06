import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGigDto } from './dto/create-gig.dto';
import { UpdateGigDto } from './dto/update-gig.dto';
import { UserRole } from '@prisma/client'; 
import { Prisma } from '@prisma/client';

@Injectable()
export class GigsService {
  constructor(private prisma: PrismaService) {}

  private toDecimalString(value: number | undefined) {
    if (value === undefined || value === null) return undefined;
    return value.toString();
  }

  async create(createDto: CreateGigDto, authUser: { id: number; role: UserRole }) {
    try {
      if (!(authUser.role === UserRole.FREELANCER || authUser.role === UserRole.ADMIN || authUser.role === UserRole.SUPER_ADMIN)) {
        throw new HttpException('Only freelancers or admins can create gigs', HttpStatus.FORBIDDEN);
      }

      const user = await this.prisma.user.findUnique({ where: { id: authUser.id } });
      if (!user) throw new HttpException('Authenticated user not found', HttpStatus.NOT_FOUND);

      if (createDto.category_id) {
        const category = await this.prisma.category.findUnique({ where: { id: createDto.category_id } });
        if (!category) throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
      }

      const gig = await this.prisma.gig.create({
        data: {
          user_id: authUser.id,
          title: createDto.title,
          description: createDto.description,
          category_id: createDto.category_id ?? undefined,
          price_basic: this.toDecimalString(createDto.price_basic) as unknown as Prisma.Decimal,
          price_standard: this.toDecimalString(createDto.price_standard) as unknown as Prisma.Decimal,
          price_premium: this.toDecimalString(createDto.price_premium) as unknown as Prisma.Decimal,
          delivery_days: createDto.delivery_days,
          revisions: createDto.revisions ?? 0,
          thumbnail: createDto.thumbnail,
          // images: createDto.images ?? [],
        },
      });

      return gig;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({ message: 'Create gig failed', detail: error?.message ?? error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(query: { page?: number; perPage?: number; category_id?: number; search?: string }) {
    try {
      const page = query.page ?? 1;
      const perPage = query.perPage ?? 10;
      const skip = (page - 1) * perPage;

      const where: any = {};
      if (query.category_id) where.category_id = query.category_id;
      if (query.search) where.title = { contains: query.search, mode: 'insensitive' };

      const [items, total] = await Promise.all([
        this.prisma.gig.findMany({
          where,
          skip,
          take: perPage,
          orderBy: { created_at: 'desc' },
        }),
        this.prisma.gig.count({ where }),
      ]);

      return {
        meta: {
          total,
          page,
          perPage,
          totalPages: Math.ceil(total / perPage),
        },
        data: items,
      };
    } catch (error) {
      throw new HttpException({ message: 'Fetch gigs failed', detail: error?.message ?? error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const gig = await this.prisma.gig.findUnique({ where: { id } });
      if (!gig) throw new HttpException('Gig not found', HttpStatus.NOT_FOUND);
      return gig;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({ message: 'Fetch gig failed', detail: error?.message ?? error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateDto: UpdateGigDto, authUser: { id: number; role: UserRole }) {
    try {
      const gig = await this.prisma.gig.findUnique({ where: { id } });
      if (!gig) throw new HttpException('Gig not found', HttpStatus.NOT_FOUND);

      if (!(authUser.id === gig.user_id || authUser.role === UserRole.ADMIN || authUser.role === UserRole.SUPER_ADMIN)) {
        throw new HttpException('Not authorized to update this gig', HttpStatus.FORBIDDEN);
      }

      if (updateDto.category_id) {
        const category = await this.prisma.category.findUnique({ where: { id: updateDto.category_id } });
        if (!category) throw new HttpException('Category not found', HttpStatus.BAD_REQUEST);
      }

      const updated = await this.prisma.gig.update({
        where: { id },
        data: {
          title: updateDto.title ?? undefined,
          description: updateDto.description ?? undefined,
          category_id: updateDto.category_id ?? undefined,
          price_basic: updateDto.price_basic ? this.toDecimalString(updateDto.price_basic) as unknown as Prisma.Decimal : undefined,
          price_standard: updateDto.price_standard ? this.toDecimalString(updateDto.price_standard) as unknown as Prisma.Decimal : undefined,
          price_premium: updateDto.price_premium ? this.toDecimalString(updateDto.price_premium) as unknown as Prisma.Decimal : undefined,
          delivery_days: updateDto.delivery_days ?? undefined,
          revisions: updateDto.revisions ?? undefined,
          thumbnail: updateDto.thumbnail ?? undefined,
          // images: updateDto.images ?? undefined,
        },
      });

      return updated;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({ message: 'Update gig failed', detail: error?.message ?? error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number, authUser: { id: number; role: UserRole }) {
    try {
      const gig = await this.prisma.gig.findUnique({ where: { id } });
      if (!gig) throw new HttpException('Gig not found', HttpStatus.NOT_FOUND);

      if (!(authUser.id === gig.user_id || authUser.role === UserRole.ADMIN || authUser.role === UserRole.SUPER_ADMIN)) {
        throw new HttpException('Not authorized to delete this gig', HttpStatus.FORBIDDEN);
      }

      await this.prisma.gig.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({ message: 'Delete gig failed', detail: error?.message ?? error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
