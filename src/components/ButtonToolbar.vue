<template>
  <div class="column items-start">
    <features-tool />
    <!-- <processing-tool /> -->
    <layers-tool />
  </div>
</template>

TODO: enlever les éléments commenté. #testing

<script>
import FeaturesTool from './widgets/FeaturesTool.vue'
//import ProcessingTool from './widgets/ProcessingTool.vue'
import LayersTool from './widgets/LayersTool.vue'

export default {
  components: {
    FeaturesTool,
    //ProcessingTool,
    LayersTool
  },
  name: "ButtonToolbar",
}
</script>
