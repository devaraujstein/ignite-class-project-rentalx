import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private specification: Repository<Specification>;

  constructor() {
    this.specification = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.specification.create({
      name,
      description,
    });

    await this.specification.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specification.findOne({ name });

    return specification;
  }
}

export { SpecificationsRepository };
