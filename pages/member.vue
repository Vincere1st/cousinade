<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-sheet>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                >
                  <span>{{ member.lastname }}</span>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <span>{{ member.firstname }}</span>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

const member = {
  lastname: 'name1',
  firstname: 'firstname1'
}

</script>

<style scoped>

</style>
