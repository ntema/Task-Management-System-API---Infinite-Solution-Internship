import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOAD_DIR } from './constants';

@Module({
  imports:[MulterModule.register({
    dest:FILE_UPLOAD_DIR,
    limits:{
      fieldSize: 10000 * 10000 * 100,
    },
  })],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
