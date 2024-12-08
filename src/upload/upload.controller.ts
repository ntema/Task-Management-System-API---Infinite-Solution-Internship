import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FILE_UPLOAD_DIR } from './constants';
import { fileNameEditor, imageFileFilter } from './file.utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFieDto } from './dto/upload.dto';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: fileNameEditor,
        //  filename : () => {},
        destination: FILE_UPLOAD_DIR,
      }),
      limits: {
        fileSize: 10000 * 10000 * 10,
      },
      fileFilter: imageFileFilter,
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFieDto,
  ) {
    return {
      filename: file.filename,
      size: file.fieldname,
      dto,
    }
  }
}

