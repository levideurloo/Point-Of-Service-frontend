<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

interface ProductInterface {
  title?: string;
  stock?: number;
}

@Component
export default class Product extends Vue {
    @Prop({ required: true })
    protected readonly product!: ProductInterface;
}
</script>

<template>
  <div>

  </div>
</template>

