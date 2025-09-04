/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';

describe('NotebooksController', () => {
  let controller: NotebooksController;
  let service: NotebooksService;

  const mockedFindAllValue: Promise<Notebook[]> = Promise.resolve([]);
  const mockedCreateValue: Promise<Notebook> = Promise.resolve(new Notebook());
  
  // un solo mock de servicio con un metodo para cada servicio
  const mockNotebooksService = {
    findAll: jest.fn().mockResolvedValue(mockedFindAllValue),
    create: jest.fn().mockResolvedValue(mockedCreateValue),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [NotebooksService],
    })
    .overrideProvider(NotebooksService)
    .useValue(mockNotebooksService)
    .compile();

    controller = module.get<NotebooksController>(NotebooksController);
    service = module.get<NotebooksService>(NotebooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('findAll usando spyOn', () => {
    it('deberia devolver todas las notebooks', () => {
      const result = mockedFindAllValue;
      const findAllSpy = jest.spyOn(service, 'findAll');
      findAllSpy.mockImplementation(() => result)
      expect(controller.findAll()).toEqual(result);
      findAllSpy.mockRestore();
    });
  });

  describe('create usando spyOn', () => {
    it('deberia crear una notebook', () => {
      const dto: CreateNotebookDto = { title: 'Test title', content: 'test content' }; // simular body
      const result = mockedCreateValue;
      const createSpy = jest.spyOn(service, 'create');
      createSpy.mockImplementation(() => result);
      expect(controller.create(dto)).toEqual(result);
      createSpy.mockRestore();
    });
  });

});