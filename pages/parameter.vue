<template>
  <v-expansion-panels variant="accordion">
    <v-expansion-panel>
      <v-expansion-panel-title>
        Cousins:
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Famille
              </th>
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
              <td>{{ member.familly }}</td>
              <td>{{ member.name }}</td>
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
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
const members = [
  {
    familly: '1',
    name: 'name1',
    firstname: 'firstname1'
  },
  {
    familly: '2',
    name: 'name2',
    firstname: 'firstname2'
  }
]

const show = () => {
 console.log('show member')
}
</script>

<style scoped>

</style>