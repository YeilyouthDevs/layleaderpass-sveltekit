<!-- route/register/+page.svelte -->
<script lang="ts">
	import Division from '$lib/components/Division/Division.svelte';
	import { RegisterRequest } from './request.svelte';
	import { RegisterValidation } from './validation.svelte';

	let binds = $state({
		email: '',
		password: '',
		passwordCheck: '',
		verifyCode: '',
		name: '',
		phone: '',
		birthday: ''
	});

	let states = $state({
		emailConfirmed: false,
		verifyCompleted: false
	});

	let messages = $state({
		email: '',
		password: '',
		passwordCheck: '',
		verifyCode: '',
		name: '',
		phone: '',
		birthday: ''
	});

	const v = new RegisterValidation(binds, states, messages);
	const r = new RegisterRequest(binds, states, messages);

	$inspect(binds);
	$inspect(messages);
</script>

<Division name="회원가입" contentClass="max-w-96 p-4">
	<div class="flex flex-col justify-items-center gap-2">
		<div class="flex flex-col">
			<label for="email">이메일</label>
			<input
				class="input"
				id="email"
				type="email"
				bind:value={binds.email}
				oninput={() => v.email()}
				disabled={states.emailConfirmed}
			/>
			<small>이메일 인증이 필요하므로 정확하게 입력해주세요.</small>
			{@html messages.email}

			{#if !states.emailConfirmed}
				<button class="btn btn-secondary mt-2" onclick={() => r.checkEmailDuplicate()}
					>중복확인</button
				>
			{:else}
				<button
					class="btn btn-secondary mt-2"
					onclick={() => {
						binds.verifyCode = '';
						messages.email = '';
						messages.verifyCode = '';
						states.emailConfirmed = false;
						states.verifyCompleted = false;
					}}>다른이메일 사용</button
				>
			{/if}
		</div>
		<hr class="my-2" />
		<div class="flex flex-col">
			<label for="verify-code">인증코드</label>
			<input
				class="input"
				id="verify-code"
				type="email"
				bind:value={binds.verifyCode}
				disabled={states.verifyCompleted}
			/>
			<small>메일로 보내드리는 인증코드를 입력해주세요.</small>
			{@html messages.verifyCode}
			{#if !states.verifyCompleted}
				<div class="flex gap-1">
					<button
						class="btn btn-secondary mt-2 w-full"
						disabled={!states.emailConfirmed}
						onclick={() => r.sendVerifyCode()}>인증코드 전송</button
					>
					<button
						class="btn btn-primary mt-2 w-full"
						disabled={!states.emailConfirmed}
						onclick={() => r.checkVerifyCode()}>확인</button
					>
				</div>
			{/if}
		</div>
		<hr class="my-2" />
		<div class="flex flex-col">
			<label for="password">비밀번호</label>
			<input
				class="input"
				id="password"
				type="password"
				bind:value={binds.password}
				oninput={() => {
					v.password();
					v.passwordCheck();
				}}
			/>
			<small>비밀번호는 영문 + 숫자 조합 8자 이상이어야 합니다.</small>
			{@html messages.password}
		</div>
		<div class="flex flex-col">
			<label for="password-check">비밀번호 확인</label>
			<input
				class="input"
				id="password-check"
				type="password"
				bind:value={binds.passwordCheck}
				oninput={() => v.passwordCheck()}
			/>
			{@html messages.passwordCheck}
		</div>
		<div class="flex flex-col">
			<label for="name">이름</label>
			<input class="input" id="name" bind:value={binds.name} oninput={() => v.name()} />
			{@html messages.name}
		</div>
		<div class="flex flex-col">
			<label for="phone">연락처</label>
			<input class="input" id="phone" bind:value={binds.phone} oninput={() => v.phone()} />
			<small>예) 01012345678</small>
			{@html messages.phone}
		</div>
		<div class="flex flex-col">
			<label for="birthday">생년월일</label>
			<input class="input" id="birthday" bind:value={binds.birthday} oninput={() => v.birthday()} />
			<small>예) 19980527</small>
			{@html messages.birthday}
		</div>
		<hr class="my-2" />
		<button class="btn btn-secondary w-full">개인정보처리지침•이용약관</button>
		<button class="btn btn-primary w-full" onclick={() => r.submit(v)}>약관동의 및 가입완료</button>
	</div>
</Division>

<style>
</style>
