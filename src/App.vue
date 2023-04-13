<template>
	<div id="app">
		<section class="content">
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
			<aside class="content__info"></aside>
		</section>
		<footer class="footer">
			<ul
				v-if="blocks.length"
				class="blocks"
			>
				<li
					v-for="block in blocks"
					:key="`block${block.id}`"
					:style="{'bottom': `${block.shift}px`}"
					class="blocks__item"
				>
					{{ block.title }}
				</li>
			</ul>
		</footer>
		<div
			:style="{'bottom': `${maxShift}px`}"
			class="shift-boundaries"
		></div>
	</div>
</template>

<script>
	import ShiftControlsInput from '@/components/ShiftControlsInput';
	import {mapGetters} from 'vuex';
	import { GAP, BLOCK_WIDTH } from '@/constants';

	export default {
		name: 'App',
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
					const blocks = Array.from({length: n}, (_, i) => ({id: i + 1, title: i + 1, shift: 0}));
					this.$store.commit('updateBlocks', blocks)
					this.$refs.countControl.value = '';
				}
			},
			shiftHandler(shift) {
				if (shift >= 0) {
					this.$store.commit('updateMaxShift', shift)
				}
			},
			setLeadBlock(id) {
				this.$store.commit('updateLeadBlock', Number(id))
			}
		},
	}
</script>

<style>
	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		padding: 10px;
	}

	.count-controls {
		margin-bottom: 0;
		list-style: none;
	}

	.count-controls__item + .count-controls__item {
		margin-top: 10px;
	}

	.footer {
		position: absolute;
		bottom: 10px;
	}

	.blocks {
		display: flex;
		margin: 0;
		padding: 0;
		gap: 10px;
		list-style: none;
	}

	.blocks__item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 150px;
		height: 100px;
		border: 10px solid yellow;
	}

	.content-controls {
		display: flex;
		gap: 10px;
	}

	.shift-boundaries {
		position: absolute;
		left: 10px;
		right: 10px;
		height: 1px;
		background-color: #000000;
	}
</style>
