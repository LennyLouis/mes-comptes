<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { get } from 'svelte/store';

	type Expense = {
		name: string;
		description: string;
		price: number;
		currency: string;
		date: Date;
		paidBy: string;
		category: string;
	};

	type Category = {
		_id: string;
		name: string;
		description: string;
		status: string;
		color: string;
	};

	let categories: Category[] = [];
	let expensesByCategory: Record<string, Expense[]> = {};
	let selectedExpense: Expense | null = null; // To store the selected expense for the modal

	// Function to open the modal and set the selected expense
	function openModal(expense: Expense) {
		selectedExpense = expense;
	}

	// Function to get the category object from the category id
	function getCategory(categoryId: string) {
		return categories.find((cat) => cat._id === categoryId);
	}

	onMount(async () => {
		try {
			// Fetch categories
			const { data: fetchedCategories } = await axios.get<Category[]>(
				'http://localhost:3000/categories/'
			);
			categories = fetchedCategories;

			// Fetch expenses
			const { data: fetchedExpenses } = await axios.get<Expense[]>(
				'http://localhost:3000/expenses/'
			);
			expensesByCategory = fetchedExpenses.reduce((acc, expense) => {
				if (!acc[expense.category]) {
					acc[expense.category] = [];
				}
				acc[expense.category].push(expense);
				return acc;
			}, {} as Record<string, Expense[]>);
		} catch (error) {
			console.error(error);
		}
	});
</script>

<div class="container mx-auto p-4">
	<div class="flex flex-wrap -mx-2">
		{#each Object.keys(expensesByCategory) as category, index}
			<div class="w-1/3 px-2 mb-4">
				<div class="overflow-y-auto h-[calc(50vh-2rem)] border rounded p-2">
					<table class="min-w-full bg-white">
						<caption class="text-xl font-bold mb-2">{getCategory(category)?.name}</caption>
						<thead>
							<tr>
								<th class="py-2 px-4 border-b">Name</th>
								<th class="py-2 px-4 border-b">Description</th>
								<th class="py-2 px-4 border-b">Price</th>
								<th class="py-2 px-4 border-b" />
							</tr>
						</thead>
						<tbody>
							{#each expensesByCategory[category] as expense}
								<tr>
									<td class="py-2 px-4 border-b">{expense.name}</td>
									<td class="py-2 px-4 border-b">{expense.description}</td>
									<!-- if the currecy is placed before the price place it before the price else place it after -->
									{#if expense.currency === '$'}
										<td class="py-2 px-4 border-b">{expense.currency}{expense.price.toFixed(2)}</td>
									{:else}
										<td class="py-2 px-4 border-b">{expense.price.toFixed(2)} {expense.currency}</td
										>
									{/if}
									<td class="py-2 px-4 border-b">
										<button
											class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
											on:click={() => openModal(expense)}
										>
											Modify
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			{#if (index + 1) % 3 === 0}
				<div style="clear:both;" />
			{/if}
		{/each}
	</div>
</div>

<!-- Modal for editing expense -->
{#if selectedExpense !== null}
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div class="modal-bg absolute inset-0 bg-gray-900 opacity-50 z-10" />
		<div class="modal-content bg-white w-1/2 p-4 rounded-lg shadow-lg z-20">
			<!-- Add your modal content and form here, pre-filled with selectedExpense data -->
			<h2 class="text-2xl font-semibold mb-4">Edit Expense</h2>
			<form>
				<!-- Your form fields go here -->
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
				>
					Save Changes
				</button>
			</form>
			<button
				class="mt-4 text-gray-600 hover:text-gray-800"
				on:click={() => (selectedExpense = null)}
			>
				Close
			</button>
		</div>
	</div>
{/if}
