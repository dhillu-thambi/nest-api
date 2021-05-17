import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { VitalsController } from './vitals.controller';
import { VitalsRepository } from './vitals.respository';
import { VitalsService } from './vitals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VitalsRepository]),
    AuthModule,
  ],
  controllers: [VitalsController],
  providers: [VitalsService]
})
export class VitalsModule {}
