<template>
  <div class="comments">
    <h2>评论</h2>
    <a :href="`https://github.com/${$config.username}/${$config.repository}/issues${$route.params.number ? '/' + $route.params.number : ''}`" target="_blank" rel="noopener noreferrer">在 GitHub 上查看和发表评论</a>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
