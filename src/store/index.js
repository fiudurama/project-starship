import Vue from 'vue';
import Vuex from 'vuex';
import { BLOCK_HEIGHT } from '@/constants';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		blocks: [],
		oldBlocks: [],
		maxShift: 0,
		leadBlock: '',
		windowWidth: 0,
		availableHeight: 0,
		errorMessage: '',
	},
	getters: {
		getBlocks: state => state.blocks,
		getOldBlocks: state => state.oldBlocks,
		getBlock: state => id => state.blocks.find(block => block.id === id),
		getLeadId: state => state.leadBlock,
		getMaxShift: state => state.maxShift,
		getWindowWidth: state => state.windowWidth,
		getErrorMessage: state => state.errorMessage,
	},
	mutations: {
		updateBlocks(state, payload) {
			//Сделал так, чтобы не тянуть lodash
			state.oldBlocks = JSON.parse(JSON.stringify(state.blocks));

			if (!state.blocks.length) {
				for (let i = 0; i < payload; i++) {
					Vue.set(state.blocks, i, {id: i + 1, title: i + 1, shift: 0});
				}
			} else if (payload > state.blocks.length) {
				const len = state.blocks.length;

				for (let i = len; i < payload; i++) {
					Vue.set(state.blocks, i, {id: i + 1, title: i + 1, shift: 0});
				}
			} else if (payload < state.blocks.length) {
				state.blocks.splice(payload, state.blocks.length - payload);
			}
		},
		updateBlockItem(state, [id, shift]) {
			//Сделал так, чтобы не тянуть lodash
			state.oldBlocks = JSON.parse(JSON.stringify(state.blocks));

			const block = state.blocks.find(block => block.id === id);
			Vue.set(block, 'shift', shift);
		},
		updateMaxShift(state, payload) {
			Vue.set(state, 'maxShift', payload);
		},
		updateLeadBlock(state, id) {
			const block = state.blocks.find(block => block.id === id);

			if (block) {
				//Сделал так, чтобы не тянуть lodash
				state.oldBlocks = JSON.parse(JSON.stringify(state.blocks));

				const leadBlockShift = +block.shift;

				if (leadBlockShift > BLOCK_HEIGHT / 2) {
					state.blocks.forEach(block => {
						if (+block.shift > leadBlockShift) {
							block.shift = leadBlockShift - BLOCK_HEIGHT / 2;
						}
					})
				} else {
					state.blocks.filter(block => block.id !== id).forEach(block => block.shift = 0);
				}

				Vue.set(state, 'leadBlock', block.id);
			}
		},
		setWindowWidth(state, payload) {
			Vue.set(state, 'windowWidth', payload);
		},
		resetShift(state, id) {
			state.blocks.find(block => block.id === id).shift = 0;
		},
		setErrorMessage(state, payload) {
			Vue.set(state, 'errorMessage', payload);
		}
	}
});
