export interface Transaction {
	// as flattened ids are not unique anymore, the timestamp is used as the new unique id,
	// which then becomes a string instead of a number
	id: number;
	timestamp: string;
	amount: number;
	currencyCode: 'EUR' | 'USD';
	currencyRate?: number;
	description: string;
	// optional, 1 instance in the data where otherParty is not present
	otherParty?: {
		name: string;
		iban: string;
	};
}

export interface TransactionDay {
	id: string;
	transactions: Transaction[];
}

export interface TransactionDays {
	days: TransactionDay[];
}
