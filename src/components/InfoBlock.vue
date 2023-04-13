<template>
	<div class="info-block">
		<p class="info-block__text">{{ text }}</p>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: 'InfoBlock',
	data() {
		return {
			text: '',
		}
	},
	computed: {
		...mapGetters({
			blocks: 'getBlocks',
			oldBlocks: 'getOldBlocks',
			leadBlockId: 'getLeadId',
			errorMessage: 'getErrorMessage',
		})
	},
	watch: {
		blocks: {
			handler(newVal) {
				if (this.oldBlocks.length && newVal.length === this.oldBlocks.length) {
					const diffs = newVal.map((value, i) => this.differences(value, this.oldBlocks[i]));
					const [newValue, oldValue, id] = diffs.filter(value => value !== -1).flat();

					this.text = `У блока ${id} изменилось смещение с ${oldValue} на ${newValue}`;
				} else if (this.oldBlocks.length && this.oldBlocks.length > newVal.length) {
					const elems = this.oldBlocks.slice(newVal.length).map(block => block.title).join(', ');

					this.text = `Элементы ${elems} были удалены`;
				} else if (this.oldBlocks.length && this.oldBlocks.length < newVal.length) {
					const elems = newVal.slice(this.oldBlocks.length).map(block => block.title).join(', ');

					this.text = `Элементы ${elems} были добавлены`;
				}
			},
			deep: true
		},
		leadBlockId(newVal, oldVal) {
			this.text = 'Изменен ведущий блок';

			if (!oldVal) {
				this.text += ` на ${newVal}`;
			} else {
				this.text += ` с ${oldVal} на ${newVal}`;
			}
		},
		errorMessage(newVal) {
			this.text = newVal;
		}
	},
	methods: {
		differences(newValue, oldValue) {
			let keyFound = -1;

			Object.entries(newValue).forEach(([key, value], _, arr) => {
				if(newValue[key] !== oldValue[key]){
					return keyFound = [value, oldValue[key], arr[0][1]];
				}
			});

			return keyFound;
		}
	}
}
</script>

<style>
.info-block {
	max-width: 200px;
	width: 100%;
	padding: 10px;
	border: 1px solid #000;
}
</style>
