import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

const mockBadgeModel={
  create: jest.fn().mockImplementation(dto => ({
    _id: new mongoose.Types.ObjectId(), ...dto
  })),
  findOneAndUpdate: jest.fn().mockImplementation(({_id:id}, updateDto) => ({
    _id:new mongoose.Types.ObjectId(id),
    ...updateDto
  })),
  findByIdAndRemove: jest.fn().mockImplementation(({_id:id}) => (
    {
      exec: () => ({
        _id: new mongoose.Types.ObjectId(id)
      })
    }
  )),
  findOne: jest.fn().mockImplementation(({_id:id}) => (
    {
        exec: () => ({
          _id: new mongoose.Types.ObjectId(id),
          name: "go vegan",
          description: "post 10 vegan recipes",
          requirements: [
          {type:"vegan", amount: 10}
          ]
        })
    }
  ))
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
  });
  it('should update a badge', async() => {
    const updateBadgeDto: UpdateBadgeDto = {
      name: "go vegan",
      description: "post 10 vegan recipes",
      requirements: [
          {type:"vegan", amount: 10}
      ]
    }
    const id = '63f35d53ec12f2bb28f3e993';
    expect(await service.update(id,updateBadgeDto)).toMatchObject({
      _id: new mongoose.Types.ObjectId(id)
    })
  });
  it('should delete a badge', async() => {
    const id = '63f35d53ec12f2bb28f3e993';
    expect(await service.remove(id)).toMatchObject({
      _id: new mongoose.Types.ObjectId(id)
    })
  });
  it('should find one badge', async() => {
    const badgeId = '63f35d53ec12f2bb28f3e993';
    expect(await service.findOne(badgeId)).toMatchObject({
      _id: new mongoose.Types.ObjectId(badgeId)
    })
  })
});
