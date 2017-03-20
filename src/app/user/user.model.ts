import { uuid } from '../util/uuid';

/**
 * A User represents an agent that sends messages
 */
export class User {
  id: string;

  constructor(public name: string,
              public avatarSrc: string) {
    this.id = uuid();
  }
}
