import {Cooldown} from './cooldown';
import {ms} from './time';

class Resource {

  constructor(
    public name: string,
    public amount: number = 0) {
  }

}

class Harvester {

  resource: Resource;
  harvest_size: number;
  private cooldown: Cooldown;

  constructor(
    resource: Resource,
    harvest_size: number,
    cooldown_duration: Millis) {

    this.resource = resource;
    this.harvest_size = harvest_size;
    this.cooldown = new Cooldown(cooldown_duration);
  }

  update = (time_elasped_ms: number): void => {
    this.cooldown.update(time_elasped_ms);
  }

  canHarvest = (): boolean => {
    return !this.cooldown.isActive();
  }

  cooldownFractionLeft = (): number => {
    return this.cooldown.fractionLeft();
  }

  harvest = (): void => {
    if (!this.canHarvest()) {
      throw Error('Unable to harvest.');
    }
    this.resource.amount += this.harvest_size;
    this.cooldown.begin();
  }

}

export {Resource, Harvester};