/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';

describe('NotebooksService', () => {
  let service: NotebooksService;

  const mockedFindAllValue: Promise<Notebook[]> = Promise.resolve([]);
  const mockedCreateValue: Promise<Notebook> = Promise.resolve(new Notebook());

  const mockNotebookRepository = { //Como en el servicio se inyecta el repo de TypeORM, hay que mockearlo
    find: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue(mockedCreateValue),
    save: jest.fn().mockResolvedValue(mockedCreateValue),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotebooksService,
        {
          provide: getRepositoryToken(Notebook),
          useValue: mockNotebookRepository,
        },
      ],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // deberian ser asincronicas o por estar mockeadas no es necesario?
  it('deberia devolver todas las notebooks', () => 
  {
    expect(service.findAll()).toEqual(mockedFindAllValue);
  });

  it('deberia crear una notebook', () => {
    const dto: CreateNotebookDto = { title: 'Test title', content: 'test content' }; // simular body
    expect(service.create(dto)).toEqual(mockedCreateValue);
  });

});
