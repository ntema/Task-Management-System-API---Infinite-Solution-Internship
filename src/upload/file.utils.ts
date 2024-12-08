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
  callback(null, true);
};
