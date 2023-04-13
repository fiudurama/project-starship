<template>
	<div id="app">
		<section class="content">
			<ControlsBlock />
			<aside class="content-info content__info">
				<button
					@click="toggleInfoBlockVisibility"
					class="content-info__btn"
				>Показать информацию</button>
				<keep-alive>
					<InfoBlock v-show="isInfoBlockVisible"/>
				</keep-alive>
			</aside>
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
	import {mapGetters} from 'vuex';
	import ControlsBlock from '@/components/ControlsBlock.vue';

	const InfoBlock = () => import(/* webpackChunkName: "info-block" */ './components/InfoBlock.vue');

	export default {
		name: 'App',
		components: {ControlsBlock, InfoBlock},
		data() {
			return {
				isInfoBlockVisible: false,
			}
		},
		computed: {
			...mapGetters({
				blocks: 'getBlocks',
				maxShift: 'getMaxShift',
			}),
		},
		methods: {
			toggleInfoBlockVisibility() {
				this.isInfoBlockVisible = !this.isInfoBlockVisible;
			},
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

	.content {
		display: flex;
		justify-content: space-between;
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
