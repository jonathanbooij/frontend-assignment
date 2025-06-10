import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../../domain/transaction/transaction.model';
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
	transactions$!: Observable<Transaction[]>;
	private readonly repository = inject(TransactionRepository);
	private readonly router = inject(Router);

	public ngOnInit(): void {
		this.transactions$ = this.repository.getAll();
	}

	public openDetail(id: string) {
		this.router.navigate(['/transactions', id]);
	}
}
