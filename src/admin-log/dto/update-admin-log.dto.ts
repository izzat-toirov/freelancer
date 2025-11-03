import { PartialType } from '@nestjs/swagger';
import { CreateAdminLogDto } from './create-admin-log.dto';

export class UpdateAdminLogDto extends PartialType(CreateAdminLogDto) {}
