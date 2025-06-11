import { Routes } from '@angular/router';
import { TransactionListComponent } from './features/transactions/list/transaction-list.component';
import { TransactionDetailComponent } from './features/transactions/detail/transaction-detail.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'transactions', pathMatch: 'full' },
	{ path: 'transactions', component: TransactionListComponent },
	{ path: 'transactions/:dayId/:transactionId', component: TransactionDetailComponent },
	{ path: '**', redirectTo: 'transactions' },
];
