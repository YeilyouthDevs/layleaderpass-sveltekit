<script lang="ts">
	import Division from '$lib/components/Division/Division.svelte';
</script>

<Division name="로그인" clazz="max-w-96 p-4">
	<div class="flex flex-col justify-items-center gap-2">
		<div class="flex flex-col">
			<label class="text-sm" for="email">이메일</label>
			<input id="email" type="email" />
		</div>
		<div class="flex flex-col">
			<label class="block text-sm" for="email">비밀번호</label>
			<input id="password" type="password" />
		</div>

		<hr class="my-2" />
		<button class="btn btn-primary w-full">로그인</button>
		<div class="flex gap-2">
			<button class="btn btn-success w-full">회원가입</button>
			<button class="btn btn-secondary w-full">계정찾기</button>
		</div>
	</div>
</Division>

<style>
</style>
