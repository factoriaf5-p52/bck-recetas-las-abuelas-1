import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge.dto';

const mockBadgeModel={
  create: jest.fn().mockImplementation(dto => ({
    _id: new mongoose.Types.ObjectId(), ...dto
  }))
}

describe('BadgesService', () => {
  let service: BadgesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BadgesService, 
      {
        provide: getModelToken('Badge'),
        useValue:mockBadgeModel
      }], 
    }).compile();

    service = module.get<BadgesService>(BadgesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new badge', async () => {
    const createBadgeDto =     {
        
      name: "go vegan",
      description: "post 10 vegan recipes",
      requirements: [
          {type:"vegan", amount: 10}
      ]
      }

    expect(await service.create(createBadgeDto)).toMatchObject({
      _id: expect.any(mongoose.Types.ObjectId), ...createBadgeDto
    })
  })
});
