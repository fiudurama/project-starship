<template>
	<main class="content-controls content__controls">
		<div class="content-controls__item">
			<input
				ref="countControl"
				@keyup.enter="countHandler($event.target.value)"
				placeholder="Количество блоков"
				type="text"
			>
			<ul
				v-if="blocks.length"
				class="count-controls"
			>
				<li
					v-for="block in blocks"
					:key="`input${block.id}`"
					class="count-controls__item"
				>
					<ShiftControlsInput
						:block="block"
					/>
				</li>
			</ul>
		</div>
		<div class="content-controls__item">
			<input
				@keyup.enter="shiftHandler($event.target.value)"
				@blur="shiftHandler($event.target.value)"
				:value="maxShift"
				placeholder="Максимальное смещение"
				type="text"
			>
		</div>
		<div class="content-controls__item">
			<input
				@keyup.enter="setLeadBlock($event.target.value)"
				@blur="setLeadBlock($event.target.value)"
				:value="leadId"
				placeholder="Лидирующий блок"
				type="text">
		</div>
	</main>
</template>

<script>
	import ShiftControlsInput from '@/components/ShiftControlsInput';
	import {mapGetters} from 'vuex';
	import {BLOCK_WIDTH, GAP} from '@/constants';

	export default {
		name: 'ControlsBlock',
		components: {ShiftControlsInput},
		computed: {
			...mapGetters({
				blocks: 'getBlocks',
				maxShift: 'getMaxShift',
				windowWidth: 'getWindowWidth',
				leadId: 'getLeadId',
			}),
		},
		created() {
			this.$store.commit('setWindowWidth', window.innerWidth);
		},
		methods: {
			countHandler(n) {
				if (n * BLOCK_WIDTH + (n - 1) * GAP < this.windowWidth) {
					this.$store.commit('updateBlocks', +n)
					this.$refs.countControl.value = '';
				}
			},
			shiftHandler(shift) {
				if (+shift >= 0) {
					this.$store.commit('updateMaxShift', +shift)
				}
			},
			setLeadBlock(id) {
				this.$store.commit('updateLeadBlock', Number(id))
			},
		},
	}
</script>

<style scoped>

</style>
