<script lang="ts">
	import { goto } from '$app/navigation';
	import Division from '$lib/components/Division/Division.svelte';
	import { LoginRequest } from './request.svelte';
	
	let binds = $state({
		email: '',
		password: '',
	});

	const r = new LoginRequest(binds, null, null);

</script>

<Division name="로그인" contentClass="max-w-96 p-4">
	<div class="flex flex-col justify-items-center gap-2">
		<div class="flex flex-col">
			<label class="text-sm" for="email">이메일</label>
			<input id="email" type="email" bind:value={binds.email} />
		</div>
		<div class="flex flex-col">
			<label class="block text-sm" for="email">비밀번호</label>
			<input id="password" type="password" bind:value={binds.password} onkeydown={(e) => (e.key === 'Enter') ? r.login() : null} />
		</div>

		<hr class="my-2" />
		<button class="btn btn-primary w-full" onclick={() => r.login()}>로그인</button>
		<div class="flex gap-2">
			<button class="btn btn-success w-full" onclick={() => goto('/register')}>회원가입</button>
			<button class="btn btn-secondary w-full">계정찾기</button>
		</div>
	</div>
</Division>

<style>
</style>
