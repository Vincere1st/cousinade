<template>
  <v-expansion-panels variant="accordion">
    <v-expansion-panel>
      <v-expansion-panel-title>
        Cousins:
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <template v-if="members.length > 0">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Nom
                </th>
                <th class="text-left">
                  Prénom
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="member in members"
                :key="member.name"
              >
                <td>{{ member.lastname }}</td>
                <td>{{ member.firstname }}</td>
                <td>
                  <v-btn
                    variant="text"
                    icon="mdi-eye"
                    @click.stop="show"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </template>
        <template v-else>
          <v-row
            justify="center"
            class="my-2"
          >
            Aucune donnée
          </v-row>
        </template>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
const members = [
  {
    lastname: 'name1',
    firstname: 'firstname1'
  },
  {
    lastname: 'name2',
    firstname: 'firstname2'
  }
]

const show = () => {
  console.log('show member')
}

</script>

<style scoped>

</style>
