import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class TransformDatePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body' || !value) {
      throw new BadRequestException('Bad request exception');
    }

    if (typeof value !== 'string') {
      return 'error';
    }

    const date = value.split('/').map((el) => parseInt(el, 10));

    console.log(date);

    console.log('Month');
    console.log(new Date(date[2], date[1], date[0]).getDay());

    const dateValue = new Date(date[2], date[1] - 1, date[0]);

    return `${dateValue.getFullYear()}-${dateValue.getMonth() + 1}-${dateValue.getDate()}`;
  }
}
