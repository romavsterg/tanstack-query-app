import type { Id, ISODateString } from '../../../shared/types/global';

export interface Product {
	id: Id;
	name: string;
	price: number;

	isPublic: boolean;

	ownerId: Id;

	createdAt: ISODateString;
	updatedAt: ISODateString;
}
