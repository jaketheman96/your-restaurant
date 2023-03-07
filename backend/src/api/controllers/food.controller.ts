import { NextFunction, Request, Response } from "express";
import statusCode from "../../utils/statusCode";
import FoodService from "../services/food.service";

class FoodController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private foodService: FoodService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this.foodService = new FoodService();
  }

  async getAllFoods(): Promise<Response> {
    const response = await this.foodService.getAllFoods();
    return this._res.status(statusCode.OK).json(response);
  }

  async getFoodById(): Promise<Response> {
    const { id } = this._req.params
    const response = await this.foodService.getFoodById(Number(id));
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'Food not found!' });
    return this._res.status(statusCode.OK).json(response);
  }

  async createFood(): Promise<Response> {
    const { body } = this._req;
    await this.foodService.createFood(body);
    return this._res.status(statusCode.CREATED).json({ message: 'Food created!' });
  }

  async updateFood(): Promise<Response> {
    const { body, params: { id } } = this._req
    const response = await this.foodService.updateFood(body, Number(id));
    if (response === 404) return this._res.status(statusCode.NOT_FOUND)
      .json({ message: 'No such food with this id!' });
    return this._res.status(statusCode.OK).json({ message: 'Food updated!' });
  }
}

export default FoodController;