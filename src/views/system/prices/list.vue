<!--suppress ALL -->
<template>
  <d2-container class="page">
    <div class="list-container">
      <do-list flex-box="1"  :listParams="listParams"/>
    </div>
  </d2-container>
</template>

<script>
  import doList from './components/do-list'
  export default {
    name: 'prices-list',
    components: {
      doList
    },
    data () {
      return {
        filename: __filename,
        listParams:{
          type:2
        }
      }
    },
    methods: {

    },
  }
</script>

<style lang="scss" scoped>

</style>
