import { map, Observable } from 'rxjs';
import { Transaction } from './transaction.model';
import { inject, Injectable } from '@angular/core';
import { TransactionApiService } from '../../data/transaction/transaction-api.service';

@Injectable({ providedIn: 'root' })
export class TransactionRepository {
	private readonly apiService = inject(TransactionApiService);

	public getAll(): Observable<Transaction[]> {
		return this.apiService.getTransactions().pipe(
			map((transactionDays) =>
				transactionDays.days
					// flatten the data so we only get one transaction array
					.flatMap((day) => day.transactions)
					.map((transaction) => ({
						...transaction,
						// convert here every transaction to the EUR currency
						// expecting currencyRate to be there for every non-euro transaction
						amount:
							transaction.currencyCode === 'USD' && transaction.currencyRate
								? transaction.amount * transaction.currencyRate
								: transaction.amount,
						currency: 'EUR',
						// as flattened ids are not unique anymore, the timestamp is used as the new unique id
						id: transaction.timestamp,
					}))
					.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
			),
		);
	}

	// as the id, the timestamp should be used
	public getById(id: string): Observable<Transaction | undefined> {
		return this.getAll().pipe(
			map((transactions) => transactions.find((transaction) => transaction.id === id)),
		);
	}
}
