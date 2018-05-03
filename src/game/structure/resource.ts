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
    cooldown_duration: ms) {

    this.resource = resource;
    this.harvest_size = harvest_size;
    this.cooldown = new Cooldown(cooldown_duration);
  }

  beginCooldown = (): void => {
    this.cooldown.begin();
  }

  update = (time_elapsed: ms): void => {
    this.cooldown.update(time_elapsed);
  }

  canHarvest = (): boolean => {
    return !this.cooldown.isActive();
  }

  cooldownFractionRemaining = (): number => {
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