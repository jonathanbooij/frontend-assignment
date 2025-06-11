import { map, Observable } from 'rxjs';
import { Transaction, TransactionDay } from './transaction.model';
import { inject, Injectable } from '@angular/core';
import { TransactionApiService } from '../../data/transaction/transaction-api.service';
@Injectable({ providedIn: 'root' })
export class TransactionRepository {
	private readonly apiService = inject(TransactionApiService);

	public getAll(): Observable<TransactionDay[]> {
		return this.apiService.getTransactions().pipe(
			map((transactionDays) =>
				transactionDays.days.map((transactionDay) => {
					return {
						...transactionDay,
						transactions: transactionDay.transactions
							.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
							.map((transaction) => ({
								...transaction,
								// convert here every transaction to the EUR currency
								// expecting currencyRate to be there for every non-euro transaction
								amount:
									transaction.currencyCode === 'USD' && transaction.currencyRate
										? transaction.amount * transaction.currencyRate
										: transaction.amount,
								currency: 'EUR',
							})),
					};
				}),
			),
		);
	}

	// as the id, the timestamp should be used
	public getById(dayId: string, transactionId: number): Observable<Transaction | undefined> {
		return this.getAll().pipe(
			map((transactionDays) => {
				const transactionDay = transactionDays.find(
					(transactionDay) => transactionDay.id === dayId,
				);

				if (!transactionDay) {
					return undefined;
				}

				return transactionDay.transactions.find((transaction) => transaction.id == transactionId);
			}),
		);
	}
}
