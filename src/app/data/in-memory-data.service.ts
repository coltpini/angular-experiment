import { InMemoryDbService } from 'angular-in-memory-web-api';
import { FLIES } from './mock-fly-data'

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = FLIES;
    return {heroes};
  }
}
