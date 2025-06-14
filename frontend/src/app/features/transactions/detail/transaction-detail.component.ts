import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionRepository } from '../../../domain/transaction/transaction.repository';
import { Transaction } from '../../../domain/transaction/transaction.model';
import { Observable, switchMap } from 'rxjs';

@Component({
	selector: 'app-transactions-detail',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './transaction-detail.component.html',
	styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
	transaction$!: Observable<Transaction | undefined>;
	private readonly repository = inject(TransactionRepository);
	private readonly route = inject(ActivatedRoute);
	private readonly router = inject(Router);

	public ngOnInit(): void {
		this.transaction$ = this.route.paramMap.pipe(
			switchMap((params) => {
				const dayId = params.get('dayId') ?? 'no dayId param found';
				const transactionId = params.get('transactionId') ?? 'no transactionId param found';

				return this.repository.getById(dayId, parseInt(transactionId));
			}),
		);
	}

	public goBack() {
		this.router.navigate(['']);
	}
}
