<script lang="ts">
	import { goto } from '$app/navigation';
	import Division from '$lib/components/Division/Division.svelte';
	import { onMount, type Snippet } from 'svelte';
	import { pageAnimation } from '$lib/stores/page-animation.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import { alert } from '$lib/stores/alert.svelte';

	let { children }: { children: Snippet } = $props();

	let dataLoadList = [
		{ name: '(선택 없음)', value: 'null' },
		{ name: '사용자', value: 'user' },
		{ name: '훈련', value: 'training' }
	];

	// --- Mock Data ---

	let attributes = $state<{ name: string; value: string }[]>([
		{ name: '(선택 없음)', value: 'null' },
		{ name: '이름', value: 'name' },
		{ name: '생년월일', value: 'birthday' },
		{ name: '연락처', value: 'phone' }
	]);

	//------------------

	let bindDataLoad = $state();
	let filterModal: Modal | undefined = $state();

	type ConditionType = 'equal' | 'bigger' | 'smaller' | 'between';
	type SortDirectionType = 'asc' | 'desc';

	interface BaseFilter {
		by: string;
	}

	interface SortFilter extends BaseFilter {
		direction: SortDirectionType;
	}

	interface ConditionFilter extends BaseFilter {
		condition: ConditionType;
		x1: string;
		x1Boundary?: boolean;
		x2?: string;
		x2Boundary?: boolean;
	}

	let sortFilters: SortFilter[] = $state([]);
	let conditionFilters: ConditionFilter[] = $state([]);

	let bindSearchBy = $state('null');
	let bindSearchCondition = $state<ConditionType>('equal');
	let bindX1Value = $state('');
	let bindX1Boundry = $state(false);
	let bindX2Value = $state('');
	let bindX2Boundry = $state(false);
	let bindSortBy = $state('null');
	let bindSortDirection = $state<SortDirectionType>('asc');

	let selectedSortFilter = $state<SortFilter>();
	let selectedConditionFilter = $state<ConditionFilter>();

	function addFilter<T extends BaseFilter>(filterArr: T[], arg: T, options?: { validation: () => boolean }) {
		const attr = attributes.find((item) => item.value === arg.by);
		
		console.log(attr);

		if (!attr || attr.value === 'null') {
			alert.show({ content: '기준을 선택해야 합니다.' })
			return;
		};

		if (options?.validation?.() === false) {
			return;
		}

		const index = filterArr.findIndex((item) => item.by === attr.name);

		const newFilter = {
			...arg,
			by: attr.name
		};

		if (index !== -1) {
			filterArr[index] = newFilter;
		} else {
			filterArr.push(newFilter);
		}
	}

	function addSortFilter() {
		const args: SortFilter = {
			by: bindSortBy,
			direction: bindSortDirection
		};

		addFilter(sortFilters, args);
	}

	function addConditionFilter() {

		const args: ConditionFilter = {
			by: bindSearchBy,
			condition: bindSearchCondition,
			x1: bindX1Value,
			x1Boundary: bindX1Boundry,
			x2: bindX2Value,
			x2Boundary: bindX2Boundry
		};

		addFilter(conditionFilters, args, {
			validation: () => {
				if (!bindX1Value || (bindSearchCondition === 'between' && !bindX2Value)) {
					alert.show({
						content: 'x 값을 입력해야 합니다.'
					})
					return false;
				}

				return true;
			}
		});
	}

	function onClickConditionFilter(filter: ConditionFilter) {
		if (selectedConditionFilter === filter) {
			selectedConditionFilter = undefined;
			return;
		}

		const attr = attributes.find((item) => item.name === filter.by);

		if (attr) {
			selectedConditionFilter = filter;
			bindSearchBy = attr.value;
			bindSearchCondition = filter.condition;
			bindX1Value = filter.x1;
			bindX1Boundry = filter.x1Boundary || false;
			bindX2Value = filter.x2 || '';
			bindX2Boundry = filter.x2Boundary || false;
		}
	}

	function onClickSortFilter(filter: SortFilter) {
		if (selectedSortFilter === filter) {
			selectedSortFilter = undefined;
			return;
		}

		const attr = attributes.find((item) => item.name === filter.by);

		if (attr) {
			selectedSortFilter = filter;
			bindSortBy = attr.value;
			bindSortDirection = filter.direction;
		}
	}

	$effect(() => {
		if (bindDataLoad !== 'null') {
			goto(`/admin-setting/${bindDataLoad}`, { replaceState: true });
		} else {
			goto('/admin-setting', { replaceState: true });
		}
	});

	onMount(() => {
		setTimeout(() => {
			pageAnimation.stop();
		}, 500);

		return () => {
			pageAnimation.start();
		};
	});
</script>

<Division name="관리자설정">
	<div class="flex flex-col gap-2 md:w-80">
		<div>
			<label class="text-secondary text-sm" for="data-list">데이터 목록</label>
			<select class="w-full text-center" id="data-list" bind:value={bindDataLoad}>
				{#each dataLoadList as item}
					<option value={item.value}>{item.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex gap-2">
			<button class="btn btn-secondary w-full text-sm" onclick={() => filterModal?.show()}
				>필터 설정</button
			>
			<button class="btn btn-primary w-full text-sm">검색</button>
		</div>
	</div>
	<div>
		{@render children()}
	</div>
</Division>

<Modal title="필터 설정" bind:this={filterModal}>
	{#snippet content()}
		<div class="flex flex-col gap-2">
			<div>
				<p class="text-secondary text-sm">검색 필터</p>
				<div class="border-light scrollbar flex gap-1.5 overflow-x-auto border-2 p-2">
					{#each conditionFilters as filter}
						{@render ConditionFilter(filter, () => onClickConditionFilter(filter))}
					{:else}
						<p class="text-sm w-full text-center text-zinc-400 dark:text-zinc-500">없음</p>
					{/each}
				</div>
			</div>
			<div class="flex items-end gap-2">
				<div class="flex-grow">
					<label class="text-secondary text-sm" for="search-by">검색 기준</label>
					<select class="w-full" id="search-by" bind:value={bindSearchBy}>
						{#each attributes as attr}
							<option value={attr.value}>{attr.name}</option>
						{/each}
					</select>
				</div>
				<div class="w-26">
					<label class="text-secondary text-sm" for="search-condition">검색 조건</label>
					<select class="w-full" id="search-condition" bind:value={bindSearchCondition}>
						<option value="equal">x = ?</option>
						<option value="bigger">x {'>'} ?</option>
						<option value="smaller">x {'<'} ?</option>
						<option value="between">x₁ {'<'} ? {'<'} x₂</option>
					</select>
				</div>
				<button class="btn btn-secondary h-10 w-20 text-sm" onclick={addConditionFilter}
					>{selectedConditionFilter ? '수정' : '추가'}</button
				>
			</div>
			<div>
				{#if bindSearchCondition === 'between'}
					<div class="flex items-center gap-3">
						<div>
							<label class="text-secondary text-sm" for="arg-x1">x₁</label>
							<input class="w-full" id="arg-x1" bind:value={bindX1Value} />
							<div>
								<input type="checkbox" id="arg-x1-boundry-include" bind:checked={bindX1Boundry} />
								<label class="text-sm leading-10" for="arg-x1-boundry-include">경계값 포함</label>
							</div>
						</div>
						<p class="mb-4 text-nowrap leading-10">
							{bindX1Boundry ? '≤' : '<'} ? {bindX2Boundry ? '≤' : '<'}
						</p>
						<div>
							<label class="text-secondary text-sm" for="arg-x2">x₂</label>
							<input class="w-full" id="arg-x2" bind:value={bindX2Value} />
							<div>
								<input type="checkbox" id="arg-x2-boundry-include" bind:checked={bindX2Boundry} />
								<label class="text-sm leading-10" for="arg-x2-boundry-include">경계값 포함</label>
							</div>
						</div>
					</div>
				{:else}
					<div class="flex items-center gap-5">
						<div>
							<label class="text-secondary text-sm" for="arg-x">x</label>
							<input class="w-full" id="arg-x" bind:value={bindX1Value} />
							<div>
								{#if bindSearchCondition !== 'equal'}
									<input type="checkbox" id="arg-x-boundry-include" bind:checked={bindX1Boundry} />
									<label class="text-sm leading-10" for="arg-x-boundry-include">경계값 포함</label>
								{:else}
									<input
										class="zzzz"
										type="checkbox"
										id="arg-x-include"
										bind:checked={bindX1Boundry}
									/>
									<label class="text-sm leading-10" for="arg-x-include">포함</label>
								{/if}
							</div>
						</div>
						<div class="mb-4 flex gap-2 leading-10">
							{#if bindSearchCondition === 'equal'}
								{#if bindX1Boundry}
									<p class="text-nowrap text-xs leading-10">을(를) 포함하는</p>
								{:else}
									<p>=</p>
								{/if}
							{:else if bindSearchCondition === 'bigger'}
								<p>{bindX1Boundry ? '≥' : '>'}</p>
							{:else if bindSearchCondition === 'smaller'}
								<p>{bindX1Boundry ? '≤' : '<'}</p>
							{/if}
							<p>?</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="hr my-4"></div>
		<div class="flex flex-col gap-2">
			<div>
				<p class="text-secondary text-sm">정렬 필터</p>
				<div class="border-light scrollbar flex gap-1.5 overflow-x-auto border-2 p-2">
					{#each sortFilters as filter}
						{@render SortFilter(filter, () => onClickSortFilter(filter))}
					{:else}
						<p class="text-sm w-full text-center text-zinc-400 dark:text-zinc-500">없음</p>
					{/each}
				</div>
			</div>
			<div class="flex items-end gap-2">
				<div>
					<label class="text-secondary text-sm" for="sort-by">정렬 기준</label>
					<select class="w-full" id="sort-by" bind:value={bindSortBy}>
						{#each attributes as attr}
							<option value={attr.value}>{attr.name}</option>
						{/each}
					</select>
				</div>
				<div>
					<label class="text-secondary text-sm" for="sort-direction">정렬 순서</label>
					<select class="w-full" id="sort-direction" bind:value={bindSortDirection}>
						<option value="asc">오름차순 ↑</option>
						<option value="desc">내림차순 ↓</option>
					</select>
				</div>
				<button class="btn btn-secondary h-10 w-20 text-sm" onclick={addSortFilter}>{selectedSortFilter ? '수정' : '추가'}</button>
			</div>
		</div>
	{/snippet}
</Modal>

{#snippet SortFilter(filter: SortFilter, onClick?: CallableFunction)}
	<button class="flex items-center justify-items-center gap-1 filter" onclick={() => onClick?.()}
			class:filter-selected={selectedSortFilter === filter}
		>
		<p class="by">{filter.by}</p>
		<p>{filter.direction === 'asc' ? '↑' : '↓'}</p>
	</button>
{/snippet}

{#snippet ConditionFilter(filter: ConditionFilter, onClick?: CallableFunction)}
	<button
		class="flex flex-col justify-center filter"
		onclick={() => onClick?.()}
		class:filter-selected={selectedConditionFilter === filter}
	>
		<p class="by">{filter.by}</p>
		<div class="condition">
			<p>{filter.x1}</p>
			<p class="text-nowrap">
				{#if filter.condition === 'equal'}
					{#if filter.x1Boundary === true}
						<span style="font-size: 0.5rem;">을(를) 포함하는</span>
					{:else}
						<span>=</span>
					{/if}
					<span>?</span>
				{:else if filter.condition === 'between'}
					<span>{filter.x1Boundary === true ? '≤' : '<'} ?</span>

					{#if filter.x2}
						<span>{filter.x2Boundary === true ? '≤' : '<'}</span>
						<span>{filter.x2}</span>
					{/if}
				{:else if filter.condition === 'bigger'}
					<span>{filter.x1Boundary === true ? '≤' : '<'} ?</span>
				{:else if filter.condition === 'smaller'}
					<span>{filter.x1Boundary === true ? '≥' : '>'} ?</span>
				{/if}
			</p>
		</div>
	</button>
{/snippet}

<style lang="postcss">
	.filter {
		@apply p-1 px-1.5;
		@apply border-2 border-zinc-400;
		@apply bg-amber-200 bg-opacity-30 dark:bg-amber-300 dark:bg-opacity-40;
		@apply rounded-sm;
		@apply transition-colors duration-75;

		p,
		span {
			@apply text-zinc-900 dark:text-zinc-200;
			@apply text-nowrap text-sm;
		}

		.by {
			@apply text-nowrap font-bold;
		}

		.condition {
			@apply flex gap-1;
			@apply border-t border-zinc-500 dark:border-zinc-300;
		}
	}

	.filter-selected {
		@apply border-amber-500 ;
	}
</style>
