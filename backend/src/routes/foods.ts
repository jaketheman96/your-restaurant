import express from 'express';
import FoodController from '../api/controllers/food.controller';
import TokenValidator from '../middlewares/tokenValidator';

const foodRouter = express.Router();

foodRouter.get('/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new FoodController(req, res, next).getAllFoods()
)

foodRouter.get('/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new FoodController(req, res, next).getFoodById()
)

foodRouter.post('/',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new FoodController(req, res, next).createFood()
)

foodRouter.put('/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new FoodController(req, res, next).updateFood()
)

foodRouter.delete('/:id',
  (req, res, next) => new TokenValidator(req, res, next).validator(),
  (req, res, next) => new FoodController(req, res, next).deleteFood()
)

export default foodRouter;