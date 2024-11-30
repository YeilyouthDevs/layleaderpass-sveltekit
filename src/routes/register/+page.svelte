<!-- route/register/+page.svelte -->
<script lang="ts">
	import Division from '$lib/components/Division/Division.svelte';
</script>

<Division name="회원가입" clazz="max-w-96 p-4">
	<div class="flex flex-col justify-items-center gap-2">
		<div class="flex flex-col">
			<label class="text-sm" for="email">이메일</label>
			<input class="input" id="email" type="email" />
			<small>이메일 인증이 필요하므로 정확하게 입력해주세요.</small>
			<button class="btn btn-secondary mt-2">중복확인</button>
		</div>
		<div class="flex flex-col">
			<label class="block text-sm" for="password">비밀번호</label>
			<input class="input" id="password" type="password" />
		</div>
		<div class="flex flex-col">
			<label class="block text-sm" for="password-check">비밀번호 확인</label>
			<input class="input" id="password-check" type="password" />
		</div>
		<hr class="my-2" />
		<div class="flex flex-col">
			<label class="text-sm" for="email">인증번호</label>
			<input class="input" id="email" type="email" />
			<small>인증번호 전송 버튼을 눌러주세요.</small>
			<div class="flex gap-1">
				<button class="btn btn-secondary mt-2 w-full">인증번호 전송</button>
				<button class="btn btn-primary mt-2 w-full">확인</button>
			</div>
		</div>
		<hr class="my-2" />
		<div class="flex flex-col">
			<label class="block text-sm" for="name">이름</label>
			<input class="input" id="name" />
		</div>
		<div class="flex flex-col">
			<label class="block text-sm" for="phone">연락처</label>
			<input class="input" id="phone" type="number" />
		</div>
		<div class="flex justify-between gap-2">
			<div class="flex w-28 flex-col">
				<label class="block text-sm" for="birth-year">생년</label>
				<input class="input" id="birth-year" type="number" />
			</div>
			<div class="flex w-24 flex-col">
				<label class="block text-sm" for="birth-month">월</label>
				<input class="input" id="birth-month" type="number" />
			</div>
			<div class="flex w-24 flex-col">
				<label class="block text-sm" for="birth-day">일</label>
				<input class="input" id="birth-day" type="number" />
			</div>
		</div>
		<hr class="my-2" />
		<button class="btn btn-primary w-full">완료</button>
	</div>
</Division>

<style>
</style>
