import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesService } from './recipes.service';


const mockRecipeModel={
  create: jest.fn().mockImplementation(dto => ({
    _id: new mongoose.Types.ObjectId(),
    ...dto
  })),
  findOneAndUpdate: jest.fn().mockImplementation(({_id: id}, updateDto) =>({
    _id: new mongoose.Types.ObjectId(id),
    ...updateDto
  })),
  findByIdAndRemove: jest.fn().mockImplementation(({_id:id})=>(
    {
      exec: () => ({
        _id: new mongoose.Types.ObjectId(id)
      })
    }
  )),
  findOne: jest.fn().mockImplementation(({_id:id})=>(
    {
      populate: () => ({
        exec: () => ({
          _id: new mongoose.Types.ObjectId(id),
          title: "gnocchi",
          description: "gnocchi",
          author: new mongoose.Types.ObjectId("63f32fd1a058ec7751d7da08"),
          ingredients: [
              {
                  ingredient: new mongoose.Types.ObjectId("63f33058a058ec7751d7da0b"),
                  qty: 300
              },
              {
                  ingredient: new mongoose.Types.ObjectId("63f33062a058ec7751d7da0d"),
                  qty: 300
              }
          ],
          time: 20,
          is_private: false,
          tags: [
              "vegana",
              "fácil",
              "desayuno"
          ],
          score:1

        })
      })
    }
  ))
}

describe('RecipesService', () => {
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService,
      {
        provide: getModelToken('Recipe'),
        useValue:mockRecipeModel
      }
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a recipe', async ()=>{
    const createRecipeDto: CreateRecipeDto = {
      title: "gnocchi",
      description: "gnocchi",
      author: new mongoose.Types.ObjectId("63f32fd1a058ec7751d7da08"),
      ingredients: [
          {
              ingredient: new mongoose.Types.ObjectId("63f33058a058ec7751d7da0b"),
              qty: 300
          },
          {
              ingredient: new mongoose.Types.ObjectId("63f33062a058ec7751d7da0d"),
              qty: 300
          }
      ],
      time: 20,
      is_private: false,
      tags: [
          "vegana",
          "fácil",
          "desayuno"
      ]
  }

  expect(await service.create(createRecipeDto)).toMatchObject({
    _id: expect.any(mongoose.Types.ObjectId),
    ...createRecipeDto
  })
  });


it('should update a recipe', async ()=>{
  const updateRecipeDto: UpdateRecipeDto = {
    title: "gnocchi",
      description: "gnocchi",
      author: new mongoose.Types.ObjectId("63f32fd1a058ec7751d7da08"),
      ingredients: [
          {
              ingredient: new mongoose.Types.ObjectId("63f33058a058ec7751d7da0b"),
              qty: 300
          },
          {
              ingredient: new mongoose.Types.ObjectId("63f33062a058ec7751d7da0d"),
              qty: 300
          }
      ],
      time: 20,
      is_private: false,
      tags: [
          "vegana",
          "fácil",
          "desayuno"
      ],
      score:1
  }
  const id = '63f32fd1a058ec7751d7da08';
  expect(await service.update(id,updateRecipeDto)).toMatchObject({
    _id: new mongoose.Types.ObjectId(id)
  })
})
it('should delete a recipe', async ()=>{
  const id = '63f32fd1a058ec7751d7da08';
  expect(await service.remove(id)).toMatchObject({
    _id: new mongoose.Types.ObjectId(id)
  })
});
it('should find one recipe', async ()=>{
  const recipeId = '63f32fd1a058ec7751d7da08';
  expect(await service.findOne(recipeId)).toMatchObject({
    _id:new mongoose.Types.ObjectId(recipeId)
  })
})
});