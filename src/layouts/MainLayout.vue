<template>
  <q-layout class='bg-grey-1'>
    <q-header class='text-white' elevated height-hint='61.59' style='background: #24292e'>
      <q-toolbar class='q-py-sm q-px-md'>
        <q-btn :icon='fabGithub' :ripple='false' class='q-mr-sm' color='white' dense flat no-caps round size='19px' />

        <q-select
          ref='search' v-model='text' :options='filteredOptions' :stack-label='false' class='GL__toolbar-select' color='black'
          dark
          dense hide-selected label='Search or jump to...'
          standout style='width: 300px' use-input
          @filter='filter'
        >

          <template v-slot:append>
            <img src='https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg'>
          </template>

          <template v-slot:no-option>
            <q-item>
              <q-item-section>
                <div class='text-center'>
                  <q-spinner-pie
                    color='grey-5'
                    size='24px'
                  />
                </div>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option='scope'>
            <q-item
              class='GL__select-GL__menu-link'
              v-bind='scope.itemProps'
            >
              <q-item-section side>
                <q-icon name='collections_bookmark' />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html='scope.opt.label' />
              </q-item-section>
              <q-item-section :class="{ 'default-type': !scope.opt.type }" side>
                <q-btn class='bg-grey-1 q-px-sm' dense no-caps outline size='12px' text-color='blue-grey-5'>
                  {{ scope.opt.type || 'Jump to' }}
                  <q-icon name='subdirectory_arrow_left' size='14px' />
                </q-btn>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div v-if='$q.screen.gt.sm'
             class='GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap'>
          <a class='text-white' href='javascript:void(0)'>
            Pull requests
          </a>
          <a class='text-white' href='javascript:void(0)'>
            Issues
          </a>
          <a class='text-white' href='javascript:void(0)'>
            Marketplace
          </a>
          <a class='text-white' href='javascript:void(0)'>
            Explore
          </a>
        </div>

        <q-space />

        <div class='q-pl-sm q-gutter-sm row items-center no-wrap'>
          <q-btn v-if='$q.screen.gt.xs' dense flat icon='notifications' round size='sm' />
          <q-btn v-if='$q.screen.gt.xs' dense flat>
            <div class='row items-center no-wrap'>
              <q-icon name='add' size='20px' />
              <q-icon name='arrow_drop_down' size='16px' style='margin-left: -2px' />
            </div>
            <q-menu auto-close>
              <q-list dense style='min-width: 100px'>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>New repository</q-item-section>
                </q-item>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>Import repository</q-item-section>
                </q-item>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>New gist</q-item-section>
                </q-item>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>New organization</q-item-section>
                </q-item>
                <q-separator />
                <q-item-label header>This repository</q-item-label>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>New issue</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn dense flat no-wrap>
            <q-avatar rounded size='20px'>
              <img src='https://cdn.quasar.dev/img/avatar3.jpg'>
            </q-avatar>
            <q-icon name='arrow_drop_down' size='16px' />

            <q-menu auto-close>
              <q-list dense>
                <q-item class='GL__menu-link-signed-in'>
                  <q-item-section>
                    <div>Signed in as <strong>Mary</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item class='GL__menu-link-status' clickable>
                  <q-item-section>
                    <div>
                      <q-icon color='blue-9' name='tag_faces' size='18px' />
                      Set your status
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>Your profile</q-item-section>
                </q-item>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>Your repositories</q-item-section>
                </q-item>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>Your projects</q-item-section>
                </q-item>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>Your stars</q-item-section>
                </q-item>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>Your gists</q-item-section>
                </q-item>
                <q-separator />
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>Help</q-item-section>
                </q-item>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item class='GL__menu-link' clickable>
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class='bg-dark'>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
  import { fabGithub } from '@quasar/extras/fontawesome-v6';
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class MainLayout extends Vue {
    protected text: string = '';
    protected options: [] = [];
    protected filteredOptions: [] = [];
    protected search: string = '';
    protected fabGithub = fabGithub;
  }
</script>
