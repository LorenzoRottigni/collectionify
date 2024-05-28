import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';
  import { CollectionBreadcrumb } from './breadcrumb';
  
  @Entity()
  export class Collection {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    slug: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column()
    description: string;
  
    @Column()
    position: number;
  
    @Column({ nullable: true })
    languageCode?: string;
  
    @ManyToOne(() => Collection, collection => collection.children, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parent?: Collection;
  
    @Column({ nullable: true })
    parentId?: number;
  
    @OneToMany(() => Collection, collection => collection.parent)
    children: Collection[];
  
    @OneToMany(() => CollectionBreadcrumb, breadcrumb => breadcrumb.collection)
    breadcrumbs: CollectionBreadcrumb[];
  
    @Column('jsonb')
    filters: any[];
  }
  