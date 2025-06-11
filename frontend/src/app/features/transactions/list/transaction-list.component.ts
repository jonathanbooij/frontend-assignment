import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDay } from '../../../domain/transaction/transaction.model';
import { TransactionRepository } from '../../../domain/transaction/transaction.repository';
import { Router } from '@angular/router';

@Component({
	selector: 'app-transactions-list',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './transaction-list.component.html',
	styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
	transactionDays$!: Observable<TransactionDay[]>;
	private readonly repository = inject(TransactionRepository);
	private readonly router = inject(Router);

	public ngOnInit(): void {
		this.transactionDays$ = this.repository.getAll();
	}

	public openDetail(dayId: string, transactionId: number) {
		this.router.navigate(['/transactions', dayId, transactionId]);
	}
}
