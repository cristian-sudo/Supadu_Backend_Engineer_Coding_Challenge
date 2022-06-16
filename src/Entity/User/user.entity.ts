import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  private readonly id!: number;

  @Column()
  private firstName: string;

  @Column()
  private lastName: string;

  @Column({ unique: true })
  private email: string;

  @Column()
  private created: Date;

  public constructor(
    email: string,
    firstName: string,
    lastName: string,
    created = new Date(),
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.created = created;
  }

  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(value: string): void {
    this.firstName = value;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(value: string): void {
    this.lastName = value;
  }

  getCreated():Date {
    return this.created;
  }

  setCreated(date:Date) {
    this.created = date;
  }
}
