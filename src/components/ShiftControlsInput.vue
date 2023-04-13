<template>
	<input
		ref="shiftHandler"
		@keyup.enter="shiftHandler"
		@blur="shiftHandler"
		:placeholder="`Смещение блока ${block.title}`"
		:value="shiftValue"
		type="number"
	>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { BLOCK_HEIGHT, GAP } from '@/constants';

	export default {
        name: 'ShiftControlsInput',
		props: {
			block: {
				type: Object,
				default: () => ({}),
			}
		},
		computed: {
			...mapGetters({
				maxShift: 'getMaxShift',
				leadBlockId: 'getLeadId',
			}),
			shiftValue() {
				return this.$store.getters.getBlock(this.block.id).shift
			}
		},
		methods: {
			shiftHandler() {
				if (+this.$refs.shiftHandler.value + BLOCK_HEIGHT + GAP < +this.maxShift) {
					if (this.leadBlockId && +this.leadBlockId !== this.block.id) {
						const leadBlockShift = this.$store.getters.getBlock(+this.leadBlockId).shift;

						if (leadBlockShift >= +this.$refs.shiftHandler.value + 50) {
							this.$store.commit('updateBlockItem', [this.block.id, +this.$refs.shiftHandler.value])
						} else {
							this.$refs.shiftHandler.value = '';
						}
					} else {
						this.$store.commit('updateBlockItem', [this.block.id, +this.$refs.shiftHandler.value])
					}
				} else {
					this.$store.commit('resetShift', this.block.id);
					this.$refs.shiftHandler.value = '';
					this.$refs.shiftHandler.blur();
				}
			},
		},
    }
</script>

<style scoped>

</style>
