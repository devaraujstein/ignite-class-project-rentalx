import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: InMemoryCarsRepository;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 400,
      brand: "Brand Car",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car if license plate already exists", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description1",
        daily_rate: 100,
        license_plate: "ABC-12345",
        fine_amount: 400,
        brand: "Brand Car",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description2",
        daily_rate: 100,
        license_plate: "ABC-12345",
        fine_amount: 400,
        brand: "Brand Car",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description2",
      daily_rate: 100,
      license_plate: "ABCD-12345",
      fine_amount: 400,
      brand: "Brand Car",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
