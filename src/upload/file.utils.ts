import { BadRequestException } from '@nestjs/common';

export const fileNameEditor = (
  req,
  file: any,
  callback: (error: any, filename: any) => void,
) => {
  const newFileName = 'whatever' + file.originalname;
  callback(null, newFileName);
};

export const imageFileFilter = (
  req: Request,
  file: any,
  callback: (error: any, valid: boolean) => void,
) => {
  // if (
  //   !file.originalName ||
  //   !file.originalName.match(/\.(jpg'|jpeg|png|gif|svg|webp)$/)
  // ) {
  //   console.log(true, file);
  //   return callback(
  //     new BadRequestException('file must be of type jpg|jpeg|png|gif|svg|webp'),
  //     false,
  //   );
  // }
  callback(null, true);
};
