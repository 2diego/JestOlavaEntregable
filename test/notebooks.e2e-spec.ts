/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { NotebooksModule } from '../src/notebooks/notebooks.module';
import { Notebook } from '../src/notebooks/entities/notebook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('notebooks (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Notebook],
          synchronize: true,
        }),
        NotebooksModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/notebooks (GET)', () => {
    return request(app.getHttpServer())
      .get('/notebooks')
      .expect(200)
      .expect([]);
  });

  it('/notebooks (POST)', () => {
    return request(app.getHttpServer())
      .post('/notebooks')
      .send({
        title: 'HP',
        content: 'sin wifi',
      })
      .expect(201);
  });
});
