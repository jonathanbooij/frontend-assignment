import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDays } from '../../domain/transaction/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionApiService {
	private readonly http = inject(HttpClient);
	private readonly endpoint = '/api/transactions';

	public getTransactions(): Observable<TransactionDays> {
		return this.http.get<TransactionDays>(this.endpoint);
	}
}
