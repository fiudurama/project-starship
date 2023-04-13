import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		blocks: [],
		maxShift: 0,
		leadBlock: '',
		windowWidth: 0,
		availableHeight: 0,
	},
	getters: {
		getBlocks: state => state.blocks,
		getBlock: state => id => state.blocks.find(block => block.id === id),
		getMaxShift: state => state.maxShift,
		getWindowWidth: state => state.windowWidth,
		getLeadId: state => state.leadBlock,
	},
	mutations: {
		updateBlocks(state, payload) {
			state.blocks = payload;
		},
		updateBlockItem(state, [id, shift]) {
			const block = state.blocks.find(block => block.id === id);
			block.shift = shift;
		},
		updateMaxShift(state, payload) {
			state.maxShift = payload;
		},
		updateLeadBlock(state, id) {
			const block = state.blocks.find(block => block.id === id);

			if (block) {
				const leadBlockShift = +block.shift;

				if (leadBlockShift > 50) {
					state.blocks.forEach(block => {
						if (+block.shift > leadBlockShift) {
							block.shift = leadBlockShift - 50;
						}
					})
				} else {
					state.blocks.filter(block => block.id !== id).forEach(block => block.shift = 0)
				}

				state.leadBlock = block.id
			}
		},
		setWindowWidth(state, payload) {
			state.windowWidth = payload;
		},
		resetShift(state, id) {
			state.blocks.find(block => block.id === id).shift = 0;
		}
	}
});
