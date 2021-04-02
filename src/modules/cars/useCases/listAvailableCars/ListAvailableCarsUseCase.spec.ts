import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

beforeEach(() => {
  inMemoryCarsRepository = new InMemoryCarsRepository();
  listAvailableCarsUseCase = new ListAvailableCarsUseCase(
    inMemoryCarsRepository
  );
});

describe("List Cars", () => {
  it("Should be able to list all available cars", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "AUDI A5",
      fine_amount: 600,
      description: "Veloz e sagaz",
      daily_rate: 150,
      category_id: "500c04d4-cd63-4c83-bf4d-6c8fd4ad3934",
      brand: "BMW",
      license_plate: "BYE_AMR",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "AUDI A5",
      fine_amount: 600,
      description: "Veloz e sagaz",
      daily_rate: 150,
      category_id: "500c04d4-cd63-4c83-bf4d-6c8fd4ad3934",
      brand: "BMW",
      license_plate: "BYE_AMR",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "teste",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "AUDI A5",
      fine_amount: 600,
      description: "Veloz e sagaz",
      daily_rate: 150,
      category_id: "500c04d4-cd63-4c83-bf4d-6c8fd4ad3934",
      brand: "BMW",
      license_plate: "BYE_AMS",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "teste",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "AUDI A5",
      fine_amount: 600,
      description: "Veloz e sagaz",
      daily_rate: 150,
      category_id: "500c04d4-cd63-4c83-bf4d-6c8fd4ad3934",
      brand: "BMW",
      license_plate: "BYE_AMS",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "500c04d4-cd63-4c83-bf4d-6c8fd4ad3934",
    });

    expect(cars).toEqual([car]);
  });
});
