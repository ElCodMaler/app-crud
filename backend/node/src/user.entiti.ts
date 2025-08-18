import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 100 }) // Forma alternativa explícita
  name!: string;

  @Column('varchar') // Tipo explícito
  password!: string;

  @Column('varchar', { length: 20 })
  phone!: string;

  @Column('varchar', { length: 100, unique: true })
  email!: string;

  @Column('varchar', { length: 200, nullable: true })
  address?: string;

  @Column('boolean', { default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}