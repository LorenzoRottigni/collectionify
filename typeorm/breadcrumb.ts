import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Collection } from './collection.entity'; // Assuming Collection entity exists

@Entity('collection_breadcrumbs') // Customize table name if needed
export class CollectionBreadcrumb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { array: true })
  name: string[];

  @Column('varchar')
  slug: string;

  @Column('int')
  collectionId: number;

  @ManyToOne(() => Collection, (collection) => collection.breadcrumbs)
  collection: Collection;
}