import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { TransformDatePipe } from 'src/commons/pipes/transform-date/transform-date.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({
    summary: 'Creates a new user',
  })
  @Post()
  create(
    @Body('birth_date', TransformDatePipe) birthDate: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    createUserDto.birth_date = birthDate;
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'FindAll users',
    description:
      'Design firstly to admins to see all users and manage them, but in the feature I want that all users interact with each other and this will be an important feature',
  })
  @Get()
  findAll(@Query('offset') offset: number, @Query('limit') limit: number) {
    return this.userService.findAll({ offset, limit });
  }

  @ApiOperation({
    summary: 'Find only one user',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update one existent user',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete one user',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
